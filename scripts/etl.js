#!/usr/bin/env node
// Usage:
//   node scripts/etl.js                     — verify all entries against Wikipedia
//   node scripts/etl.js --fix               — verify + auto-fix mismatches
//   node scripts/etl.js --add "Name"        — discover + add one person
//   node scripts/etl.js --file names.txt    — discover + add many from file

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, '../data/celebrities.json');
const WIKI_API  = 'https://en.wikipedia.org/w/api.php';

async function fetchWikitext(slug) {
  const url = new URL(WIKI_API);
  url.searchParams.set('action',    'query');
  url.searchParams.set('prop',      'revisions');
  url.searchParams.set('rvprop',    'content');
  url.searchParams.set('rvslots',   'main');
  url.searchParams.set('titles',    slug);
  url.searchParams.set('format',    'json');
  url.searchParams.set('redirects', '1');

  const res  = await fetch(url.toString(), { headers: { 'User-Agent': 'Birthle-ETL/1.0' } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  if (page.missing !== undefined) return null;
  return page.revisions[0].slots.main['*'];
}

function parseBirthDate(wikitext) {
  // {{birth date|1989|12|13}} / {{birth date and age|...}} / {{dob|...}}
  const tpl = wikitext.match(
    /\{\{[Bb]irth[_\- ]?(?:date(?:[_\- ]and[_\- ]age)?|[Dd]ob)\s*\|[^|]*?(\d{4})\s*\|\s*(\d{1,2})\s*\|\s*(\d{1,2})/
  );
  if (tpl) {
    const [, y, m, d] = tpl;
    return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  }

  // | birth_date = 1989-12-13
  const iso = wikitext.match(/\|\s*birth[_ ]date\s*=\s*(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];

  // {{birth year and age|1989}} — year only, skip
  return null;
}

async function searchWiki(name) {
  const url = new URL(WIKI_API);
  url.searchParams.set('action',   'query');
  url.searchParams.set('list',     'search');
  url.searchParams.set('srsearch', name);
  url.searchParams.set('srlimit',  '5');
  url.searchParams.set('format',   'json');

  const res  = await fetch(url.toString(), { headers: { 'User-Agent': 'Birthle-ETL/1.0' } });
  const data = await res.json();
  return data.query.search;
}

async function resolveNewEntry(name) {
  const results = await searchWiki(name);
  if (!results.length) return null;

  for (const result of results) {
    const slug     = result.title.replace(/ /g, '_');
    const wikitext = await fetchWikitext(slug);
    if (!wikitext) continue;

    const birthday = parseBirthDate(wikitext);
    if (!birthday) continue;

    return { name, birthday, wiki: slug };
  }
  return null;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const args         = process.argv.slice(2);
  const celebrities  = JSON.parse(readFileSync(DATA_PATH, 'utf8'));

  // ── Add single name ──────────────────────────────────────────────
  const addIdx = args.indexOf('--add');
  if (addIdx !== -1) {
    const name = args[addIdx + 1];
    if (!name) { console.error('--add requires a name'); process.exit(1); }

    console.log(`Searching: ${name}`);
    const entry = await resolveNewEntry(name);
    if (!entry) { console.error(`Could not resolve: ${name}`); process.exit(1); }

    const dup = celebrities.find(c =>
      c.wiki === entry.wiki || c.name.toLowerCase() === name.toLowerCase()
    );
    if (dup) {
      console.log(`Already exists: ${dup.name} (${dup.birthday})`);
      if (dup.birthday !== entry.birthday)
        console.log(`  Wikipedia says: ${entry.birthday} — run with --fix to update`);
    } else {
      celebrities.push(entry);
      writeFileSync(DATA_PATH, JSON.stringify(celebrities, null, 2));
      console.log(`Added: ${entry.name} | ${entry.birthday} | ${entry.wiki}`);
    }
    return;
  }

  // ── Add from file ────────────────────────────────────────────────
  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1) {
    const filePath = args[fileIdx + 1];
    if (!filePath) { console.error('--file requires a path'); process.exit(1); }

    const names  = readFileSync(filePath, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
    let added = 0;
    const failed = [];

    for (const name of names) {
      await sleep(400);
      process.stdout.write(`${name}... `);
      const entry = await resolveNewEntry(name);
      if (!entry) { process.stdout.write('FAILED\n'); failed.push(name); continue; }

      const dup = celebrities.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (dup) { process.stdout.write(`skip (exists)\n`); continue; }

      celebrities.push(entry);
      added++;
      process.stdout.write(`added (${entry.birthday})\n`);
    }

    writeFileSync(DATA_PATH, JSON.stringify(celebrities, null, 2));
    console.log(`\nAdded: ${added}  Failed: ${failed.length}`);
    if (failed.length) console.log('Failed:', failed);
    return;
  }

  // ── Verify all ───────────────────────────────────────────────────
  console.log(`Verifying ${celebrities.length} entries...\n`);
  let ok = 0;
  const mismatches = [];
  const unresolved = [];

  for (const celeb of celebrities) {
    await sleep(300);
    process.stdout.write(`  ${celeb.name}... `);

    const wikitext = await fetchWikitext(celeb.wiki);
    if (!wikitext) {
      process.stdout.write('NOT FOUND\n');
      unresolved.push(`${celeb.name} (wiki page missing)`);
      continue;
    }

    const wikiDate = parseBirthDate(wikitext);
    if (!wikiDate) {
      process.stdout.write('UNPARSEABLE\n');
      unresolved.push(`${celeb.name} (date not parsed)`);
      continue;
    }

    if (wikiDate !== celeb.birthday) {
      process.stdout.write(`MISMATCH stored=${celeb.birthday} wiki=${wikiDate}\n`);
      mismatches.push({ name: celeb.name, stored: celeb.birthday, wiki: wikiDate });
    } else {
      process.stdout.write('ok\n');
      ok++;
    }
  }

  console.log(`\n${'─'.repeat(40)}`);
  console.log(`OK: ${ok}/${celebrities.length}`);

  if (mismatches.length) {
    console.log(`\nMISMATCHES (${mismatches.length}):`);
    mismatches.forEach(m =>
      console.log(`  ${m.name}: stored=${m.stored}  wiki=${m.wiki}`)
    );
  }

  if (unresolved.length) {
    console.log(`\nUNRESOLVED (${unresolved.length}):`);
    unresolved.forEach(u => console.log(`  ${u}`));
  }

  if (args.includes('--fix') && mismatches.length) {
    mismatches.forEach(m => {
      const c = celebrities.find(c => c.name === m.name);
      if (c) c.birthday = m.wiki;
    });
    writeFileSync(DATA_PATH, JSON.stringify(celebrities, null, 2));
    console.log(`\nFixed ${mismatches.length} entries in ${DATA_PATH}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
