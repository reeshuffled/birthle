const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let CELEBRITIES = [];

// ── Build day/year datalists ─────────────────────────────────────
(function () {
  const dl = document.getElementById('day-dl');
  for (let d = 1; d <= 31; d++) {
    const o = document.createElement('option');
    o.value = String(d);
    dl.appendChild(o);
  }

  const yl = document.getElementById('year-dl');
  for (let y = 2024; y >= 1400; y--) {
    const o = document.createElement('option');
    o.value = String(y);
    yl.appendChild(o);
  }
})();

// ── Zodiac ───────────────────────────────────────────────────────
function getZodiac(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sym: '♈', name: 'Aries' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sym: '♉', name: 'Taurus' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sym: '♊', name: 'Gemini' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sym: '♋', name: 'Cancer' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sym: '♌', name: 'Leo' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sym: '♍', name: 'Virgo' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sym: '♎', name: 'Libra' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sym: '♏', name: 'Scorpio' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sym: '♐', name: 'Sagittarius' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sym: '♑', name: 'Capricorn' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sym: '♒', name: 'Aquarius' };
  return { sym: '♓', name: 'Pisces' };
}

// ── Storage ──────────────────────────────────────────────────────
const STORAGE_STATS   = 'birthle_stats';
const STORAGE_HISTORY = 'birthle_history';

function defaultStats() {
  return { played: 0, won: 0, currentStreak: 0, maxStreak: 0, distribution: {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0} };
}

function loadStats() {
  try { return JSON.parse(localStorage.getItem(STORAGE_STATS)) || defaultStats(); }
  catch { return defaultStats(); }
}

function saveStats(s) { localStorage.setItem(STORAGE_STATS, JSON.stringify(s)); }

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || {}; }
  catch { return {}; }
}

function saveHistory(h) { localStorage.setItem(STORAGE_HISTORY, JSON.stringify(h)); }

// ── Game state ───────────────────────────────────────────────────
let celeb, answer, guesses = [], gameOver = false, dayNum;

async function init() {
  CELEBRITIES = await fetch('data/celebrities.json').then(r => r.json());

  dayNum = Math.floor(Date.now() / 86400000);
  celeb  = CELEBRITIES[dayNum % CELEBRITIES.length];
  const [y, m, d] = celeb.birthday.split('-').map(Number);
  answer = { year: y, month: m, day: d };

  document.getElementById('celeb-name').textContent = celeb.name;
  fetchImage();

  const history = loadHistory();
  const todayRecord = history[dayNum];
  if (todayRecord) {
    guesses  = todayRecord.guessData;
    gameOver = true;
    renderGrid();
    document.getElementById('input-area').style.display = 'none';
    showResult(todayRecord.won);
  } else {
    renderGrid();
  }
}

async function fetchImage() {
  try {
    const res  = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(celeb.wiki)}`);
    const data = await res.json();
    if (data.thumbnail && data.thumbnail.source) {
      const img = document.getElementById('celeb-photo');
      img.onload = () => {
        img.classList.add('loaded');
        document.getElementById('photo-icon').classList.add('hidden');
      };
      img.src = data.thumbnail.source;
    }
  } catch (_) {}
}

// ── Input parsing / validation ───────────────────────────────────
function parseMonth(val) {
  if (!val.trim()) return null;
  const n = parseInt(val);
  if (!isNaN(n) && n >= 1 && n <= 12) return n;
  const idx = MONTHS.findIndex(m => m.toLowerCase().startsWith(val.trim().toLowerCase()));
  return idx >= 0 ? idx + 1 : null;
}

function daysInMonth(m, y) {
  return new Date(y, m, 0).getDate();
}

// ── Guess submission ─────────────────────────────────────────────
function submitGuess() {
  if (gameOver) return;

  const mVal = document.getElementById('m-inp').value;
  const dVal = document.getElementById('d-inp').value;
  const yVal = document.getElementById('y-inp').value;

  const month = parseMonth(mVal);
  const day   = parseInt(dVal);
  const year  = parseInt(yVal);

  let err = '';
  if (!month)                                err = 'Enter a valid month';
  else if (!day || day < 1 || day > 31)      err = 'Enter a day 1–31';
  else if (!year || year < 1 || year > 2025) err = 'Enter a valid year';
  else if (day > daysInMonth(month, year))
    err = `${MONTHS[month-1]} ${year} only has ${daysInMonth(month, year)} days`;

  if (err) { showErr(err); return; }

  document.getElementById('err').textContent = '';
  guesses.push({ month, day, year });

  const won = month === answer.month && day === answer.day && year === answer.year;
  if (won || guesses.length >= 6) {
    gameOver = true;

    const history = loadHistory();
    history[dayNum] = { celebName: celeb.name, won, numGuesses: guesses.length, guessData: guesses, answer };
    saveHistory(history);

    const stats = loadStats();
    stats.played++;
    if (won) {
      stats.won++;
      const key = String(guesses.length);
      stats.distribution[key] = (stats.distribution[key] || 0) + 1;
      const yesterday = history[dayNum - 1];
      stats.currentStreak = (yesterday && yesterday.won) ? stats.currentStreak + 1 : 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    } else {
      stats.currentStreak = 0;
    }
    saveStats(stats);
  }

  renderGrid();

  if (gameOver) {
    document.getElementById('input-area').style.display = 'none';
    showResult(won);
  } else {
    clearInputs();
    document.getElementById('m-inp').focus();
  }
}

function showErr(msg) {
  document.getElementById('err').textContent = msg;
  ['m-inp','d-inp','y-inp'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  });
}

function clearInputs() {
  ['m-inp','d-inp','y-inp'].forEach(id => document.getElementById(id).value = '');
}

// ── Render ───────────────────────────────────────────────────────
function renderGrid() {
  const container = document.getElementById('guesses');
  container.innerHTML = '';
  const ansZ = getZodiac(answer.month, answer.day);

  if (guesses.length > 0) {
    document.getElementById('col-headers').classList.add('visible');
  }

  for (let i = 0; i < guesses.length; i++) {
    const g = guesses[i];
    const z = getZodiac(g.month, g.day);
    const zMatch = z.sym === ansZ.sym;

    const row = document.createElement('div');
    row.className = 'guess-row';

    const zc = document.createElement('div');
    zc.className = `cell zodiac-cell ${zMatch ? 'zc-correct' : 'zc-wrong'}`;
    zc.title = z.name;
    zc.innerHTML = `<span class="zodiac-sym">${z.sym}</span><span class="zodiac-nm">${z.name}</span>`;
    row.appendChild(zc);

    row.appendChild(makeCell('Month', MONTHS[g.month-1].slice(0,3), cmp(g.month, answer.month)));
    row.appendChild(makeCell('Day',   String(g.day),                cmp(g.day,   answer.day)));
    row.appendChild(makeCell('Year',  String(g.year),               cmp(g.year,  answer.year)));

    container.appendChild(row);
  }

  if (!gameOver) {
    const counter = document.createElement('div');
    counter.className = 'guess-counter';
    counter.textContent = `Guess ${guesses.length + 1} of 6`;
    container.appendChild(counter);
  }
}

function cmp(g, a) {
  return g === a ? 'correct' : g < a ? 'low' : 'high';
}

function makeCell(label, value, result) {
  const c = document.createElement('div');
  c.className = `cell ${result}`;
  let arrow = '';
  if (result === 'low')       arrow = '<span class="cell-arrow">▶</span>';
  else if (result === 'high') arrow = '<span class="cell-arrow">◀</span>';
  else                        arrow = '<span class="cell-arrow">✓</span>';
  c.innerHTML = `<span class="cell-value">${value}</span>${arrow}`;
  return c;
}

// ── Countdown ────────────────────────────────────────────────────
let countdownInterval = null;

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  tickCountdown();
  countdownInterval = setInterval(tickCountdown, 1000);
}

function tickCountdown() {
  const el = document.getElementById('countdown-time');
  if (!el) { clearInterval(countdownInterval); return; }
  const ms   = (Math.floor(Date.now() / 86400000) + 1) * 86400000 - Date.now();
  const h    = Math.floor(ms / 3600000);
  const m    = Math.floor((ms % 3600000) / 60000);
  const s    = Math.floor((ms % 60000) / 1000);
  el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ── Result card ──────────────────────────────────────────────────
function showResult(won) {
  const wrap    = document.getElementById('result-wrap');
  const card    = document.getElementById('result-card');
  const title   = document.getElementById('result-title');
  const answer2 = document.getElementById('result-answer');
  const z = getZodiac(answer.month, answer.day);

  card.className    = `result-card ${won ? 'win' : 'lose'}`;
  title.textContent = won ? `Got it in ${guesses.length}!` : 'Better luck tomorrow!';
  answer2.textContent =
    `${celeb.name}'s birthday: ${MONTHS[answer.month-1]} ${answer.day}, ${answer.year}  ${z.sym} ${z.name}`;

  card.querySelectorAll('.result-stats, .result-dist, .result-countdown, .share-btn').forEach(el => el.remove());

  // Stats row
  const stats   = loadStats();
  const winPct  = stats.played ? Math.round((stats.won / stats.played) * 100) : 0;
  const statsEl = document.createElement('div');
  statsEl.className = 'result-stats';
  statsEl.innerHTML = `
    <div class="stat-box"><div class="stat-num">${stats.played}</div><div class="stat-lbl">Played</div></div>
    <div class="stat-box"><div class="stat-num">${winPct}</div><div class="stat-lbl">Win %</div></div>
    <div class="stat-box"><div class="stat-num">${stats.currentStreak}</div><div class="stat-lbl">Streak</div></div>
    <div class="stat-box"><div class="stat-num">${stats.maxStreak}</div><div class="stat-lbl">Best</div></div>
  `;
  card.appendChild(statsEl);

  // Guess distribution
  const distEl = document.createElement('div');
  distEl.className = 'result-dist';
  const maxVal = Math.max(1, ...Object.values(stats.distribution).map(Number));
  for (let i = 1; i <= 6; i++) {
    const val = Number(stats.distribution[String(i)] || 0);
    const pct = Math.round((val / maxVal) * 100);
    const highlight = won && guesses.length === i;
    const row = document.createElement('div');
    row.className = 'dist-row';
    row.innerHTML = `
      <span class="dist-label">${i}</span>
      <div class="dist-bar-wrap">
        <div class="dist-bar${highlight ? ' dist-bar-current' : ''}" style="width:${Math.max(pct, 7)}%">
          <span class="dist-count">${val}</span>
        </div>
      </div>
    `;
    distEl.appendChild(row);
  }
  card.appendChild(distEl);

  // Countdown
  const countdownEl = document.createElement('div');
  countdownEl.className = 'result-countdown';
  countdownEl.innerHTML = `<span class="countdown-lbl">Next Birthle in</span><span class="countdown-time" id="countdown-time"></span>`;
  card.appendChild(countdownEl);
  startCountdown();

  // Share button
  const shareBtn = document.createElement('button');
  shareBtn.className = 'share-btn';
  shareBtn.textContent = 'Share';
  shareBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(buildShareText(won)).then(() => {
      shareBtn.textContent = 'Copied!';
      setTimeout(() => { shareBtn.textContent = 'Share'; }, 2000);
    });
  });
  card.appendChild(shareBtn);

  wrap.classList.add('show');
}

function buildShareText(won) {
  const ansZ = getZodiac(answer.month, answer.day);
  const emojiRow = g => {
    const zMatch = getZodiac(g.month, g.day).sym === ansZ.sym;
    const cell = r => r === 'correct' ? '🟩' : r === 'low' ? '➡️' : '⬅️';
    return [
      zMatch ? '🟢' : '🔴',
      cell(cmp(g.month, answer.month)),
      cell(cmp(g.day,   answer.day)),
      cell(cmp(g.year,  answer.year)),
    ].join('');
  };
  const lines = [
    `Birthle 🎂 — ${celeb.name}`,
    `${won ? guesses.length : 'X'}/6`,
    '',
    ...guesses.map(emojiRow),
  ];
  return lines.join('\n');
}

// ── Modal ────────────────────────────────────────────────────────
const backdrop = document.getElementById('modal-backdrop');
document.getElementById('help-btn').addEventListener('click', () => backdrop.classList.add('open'));
document.getElementById('modal-close').addEventListener('click', () => backdrop.classList.remove('open'));
backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });

// ── Events ───────────────────────────────────────────────────────
document.getElementById('guess-btn').addEventListener('click', submitGuess);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') backdrop.classList.remove('open');
  else if (e.key === 'Enter') submitGuess();
});

init();
