const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const CELEBRITIES = [
  // Musicians
  { name: "Taylor Swift",        birthday: "1989-12-13", wiki: "Taylor_Swift" },
  { name: "Beyoncé",             birthday: "1981-09-04", wiki: "Beyoncé" },
  { name: "Lady Gaga",           birthday: "1986-03-28", wiki: "Lady_Gaga" },
  { name: "Adele",               birthday: "1988-05-05", wiki: "Adele" },
  { name: "Rihanna",             birthday: "1988-02-20", wiki: "Rihanna" },
  { name: "Katy Perry",          birthday: "1984-10-25", wiki: "Katy_Perry" },
  { name: "Ed Sheeran",          birthday: "1991-02-17", wiki: "Ed_Sheeran" },
  { name: "Drake",               birthday: "1986-10-24", wiki: "Drake_(musician)" },
  { name: "Justin Bieber",       birthday: "1994-03-01", wiki: "Justin_Bieber" },
  { name: "Ariana Grande",       birthday: "1993-06-26", wiki: "Ariana_Grande" },
  { name: "Billie Eilish",       birthday: "2001-12-18", wiki: "Billie_Eilish" },
  { name: "Harry Styles",        birthday: "1994-02-01", wiki: "Harry_Styles" },
  { name: "Dua Lipa",            birthday: "1995-08-22", wiki: "Dua_Lipa" },
  { name: "Bruno Mars",          birthday: "1985-10-08", wiki: "Bruno_Mars" },
  { name: "Justin Timberlake",   birthday: "1981-01-31", wiki: "Justin_Timberlake" },
  { name: "Eminem",              birthday: "1972-10-17", wiki: "Eminem" },
  { name: "Jay-Z",               birthday: "1969-12-04", wiki: "Jay-Z" },
  { name: "Kanye West",          birthday: "1977-06-08", wiki: "Kanye_West" },
  { name: "Nicki Minaj",         birthday: "1982-12-08", wiki: "Nicki_Minaj" },
  { name: "Cardi B",             birthday: "1992-10-11", wiki: "Cardi_B" },
  { name: "Post Malone",         birthday: "1995-07-04", wiki: "Post_Malone" },
  { name: "Selena Gomez",        birthday: "1992-07-22", wiki: "Selena_Gomez" },
  { name: "Madonna",             birthday: "1958-08-16", wiki: "Madonna" },
  { name: "Michael Jackson",     birthday: "1958-08-29", wiki: "Michael_Jackson" },
  { name: "Elvis Presley",       birthday: "1935-01-08", wiki: "Elvis_Presley" },
  { name: "David Bowie",         birthday: "1947-01-08", wiki: "David_Bowie" },
  { name: "Freddie Mercury",     birthday: "1946-09-05", wiki: "Freddie_Mercury" },
  { name: "John Lennon",         birthday: "1940-10-09", wiki: "John_Lennon" },
  { name: "Paul McCartney",      birthday: "1942-06-18", wiki: "Paul_McCartney" },
  { name: "Mick Jagger",         birthday: "1943-07-26", wiki: "Mick_Jagger" },
  { name: "Prince",              birthday: "1958-06-07", wiki: "Prince_(musician)" },
  { name: "Bob Dylan",           birthday: "1941-05-24", wiki: "Bob_Dylan" },
  { name: "Elton John",          birthday: "1947-03-25", wiki: "Elton_John" },
  { name: "Céline Dion",         birthday: "1968-03-30", wiki: "Céline_Dion" },
  { name: "Whitney Houston",     birthday: "1963-08-09", wiki: "Whitney_Houston" },
  { name: "Mariah Carey",        birthday: "1969-03-27", wiki: "Mariah_Carey" },
  { name: "Kendrick Lamar",      birthday: "1987-06-17", wiki: "Kendrick_Lamar" },
  { name: "The Weeknd",          birthday: "1990-02-16", wiki: "The_Weeknd" },
  { name: "Olivia Rodrigo",      birthday: "2003-02-20", wiki: "Olivia_Rodrigo" },
  { name: "Bad Bunny",           birthday: "1994-03-10", wiki: "Bad_Bunny" },
  { name: "Shakira",             birthday: "1977-02-02", wiki: "Shakira" },
  // Actors
  { name: "Tom Hanks",           birthday: "1956-07-09", wiki: "Tom_Hanks" },
  { name: "Meryl Streep",        birthday: "1949-06-22", wiki: "Meryl_Streep" },
  { name: "Angelina Jolie",      birthday: "1975-06-04", wiki: "Angelina_Jolie" },
  { name: "Brad Pitt",           birthday: "1963-12-18", wiki: "Brad_Pitt" },
  { name: "Jennifer Aniston",    birthday: "1969-02-11", wiki: "Jennifer_Aniston" },
  { name: "Will Smith",          birthday: "1968-09-25", wiki: "Will_Smith" },
  { name: "Dwayne Johnson",      birthday: "1972-05-02", wiki: "Dwayne_Johnson" },
  { name: "Robert Downey Jr.",   birthday: "1965-04-04", wiki: "Robert_Downey_Jr." },
  { name: "Johnny Depp",         birthday: "1963-06-09", wiki: "Johnny_Depp" },
  { name: "Emma Watson",         birthday: "1990-04-15", wiki: "Emma_Watson" },
  { name: "Chris Evans",         birthday: "1981-06-13", wiki: "Chris_Evans_(actor)" },
  { name: "Scarlett Johansson",  birthday: "1984-11-22", wiki: "Scarlett_Johansson" },
  { name: "Zendaya",             birthday: "1996-09-01", wiki: "Zendaya" },
  { name: "Leonardo DiCaprio",   birthday: "1974-11-11", wiki: "Leonardo_DiCaprio" },
  { name: "Julia Roberts",       birthday: "1967-10-28", wiki: "Julia_Roberts" },
  { name: "Denzel Washington",   birthday: "1954-12-28", wiki: "Denzel_Washington" },
  { name: "Morgan Freeman",      birthday: "1937-06-01", wiki: "Morgan_Freeman" },
  { name: "Marilyn Monroe",      birthday: "1926-06-01", wiki: "Marilyn_Monroe" },
  { name: "Audrey Hepburn",      birthday: "1929-05-04", wiki: "Audrey_Hepburn" },
  { name: "Ryan Reynolds",       birthday: "1976-10-23", wiki: "Ryan_Reynolds" },
  { name: "Margot Robbie",       birthday: "1990-07-02", wiki: "Margot_Robbie" },
  { name: "Jennifer Lawrence",   birthday: "1990-08-15", wiki: "Jennifer_Lawrence" },
  { name: "Ryan Gosling",        birthday: "1980-11-12", wiki: "Ryan_Gosling" },
  { name: "Chris Hemsworth",     birthday: "1983-08-11", wiki: "Chris_Hemsworth" },
  // Athletes
  { name: "Cristiano Ronaldo",   birthday: "1985-02-05", wiki: "Cristiano_Ronaldo" },
  { name: "Lionel Messi",        birthday: "1987-06-24", wiki: "Lionel_Messi" },
  { name: "LeBron James",        birthday: "1984-12-30", wiki: "LeBron_James" },
  { name: "Michael Jordan",      birthday: "1963-02-17", wiki: "Michael_Jordan" },
  { name: "Serena Williams",     birthday: "1981-09-26", wiki: "Serena_Williams" },
  { name: "Tiger Woods",         birthday: "1975-12-30", wiki: "Tiger_Woods" },
  { name: "Roger Federer",       birthday: "1981-08-08", wiki: "Roger_Federer" },
  { name: "Usain Bolt",          birthday: "1986-08-21", wiki: "Usain_Bolt" },
  { name: "Muhammad Ali",        birthday: "1942-01-17", wiki: "Muhammad_Ali" },
  { name: "Kobe Bryant",         birthday: "1978-08-23", wiki: "Kobe_Bryant" },
  { name: "Stephen Curry",       birthday: "1988-03-14", wiki: "Stephen_Curry" },
  { name: "Michael Phelps",      birthday: "1985-06-30", wiki: "Michael_Phelps" },
  { name: "Tom Brady",           birthday: "1977-08-03", wiki: "Tom_Brady" },
  { name: "Patrick Mahomes",     birthday: "1995-09-17", wiki: "Patrick_Mahomes" },
  { name: "Simone Biles",        birthday: "1997-03-14", wiki: "Simone_Biles" },
  // Leaders / historical
  { name: "Barack Obama",        birthday: "1961-08-04", wiki: "Barack_Obama" },
  { name: "Nelson Mandela",      birthday: "1918-07-18", wiki: "Nelson_Mandela" },
  { name: "Princess Diana",      birthday: "1961-07-01", wiki: "Diana,_Princess_of_Wales" },
  { name: "Queen Elizabeth II",  birthday: "1926-04-21", wiki: "Elizabeth_II" },
  { name: "Winston Churchill",   birthday: "1874-11-30", wiki: "Winston_Churchill" },
  { name: "Martin Luther King",  birthday: "1929-01-15", wiki: "Martin_Luther_King_Jr." },
  { name: "Mahatma Gandhi",      birthday: "1869-10-02", wiki: "Mahatma_Gandhi" },
  { name: "Napoleon Bonaparte",  birthday: "1769-08-15", wiki: "Napoleon" },
  { name: "Abraham Lincoln",     birthday: "1809-02-12", wiki: "Abraham_Lincoln" },
  { name: "George Washington",   birthday: "1732-02-22", wiki: "George_Washington" },
  { name: "William Shakespeare", birthday: "1564-04-23", wiki: "William_Shakespeare" },
  { name: "Leonardo da Vinci",   birthday: "1452-04-15", wiki: "Leonardo_da_Vinci" },
  { name: "Albert Einstein",     birthday: "1879-03-14", wiki: "Albert_Einstein" },
  { name: "Isaac Newton",        birthday: "1643-01-04", wiki: "Isaac_Newton" },
  { name: "Charles Darwin",      birthday: "1809-02-12", wiki: "Charles_Darwin" },
  { name: "Jane Austen",         birthday: "1775-12-16", wiki: "Jane_Austen" },
  { name: "Charles Dickens",     birthday: "1812-02-07", wiki: "Charles_Dickens" },
  // Tech / business
  { name: "Elon Musk",           birthday: "1971-06-28", wiki: "Elon_Musk" },
  { name: "Jeff Bezos",          birthday: "1964-01-12", wiki: "Jeff_Bezos" },
  { name: "Bill Gates",          birthday: "1955-10-28", wiki: "Bill_Gates" },
  { name: "Steve Jobs",          birthday: "1955-02-24", wiki: "Steve_Jobs" },
  { name: "Mark Zuckerberg",     birthday: "1984-05-14", wiki: "Mark_Zuckerberg" },
  { name: "Warren Buffett",      birthday: "1930-08-30", wiki: "Warren_Buffett" },
  { name: "Oprah Winfrey",       birthday: "1954-01-29", wiki: "Oprah_Winfrey" },
  { name: "Kim Kardashian",      birthday: "1980-10-21", wiki: "Kim_Kardashian" },
];

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

// ── Game state ───────────────────────────────────────────────────
let celeb, answer, guesses = [], gameOver = false;

function init() {
  const dayNum = Math.floor(Date.now() / 86400000);
  celeb  = CELEBRITIES[dayNum % CELEBRITIES.length];
  const [y, m, d] = celeb.birthday.split('-').map(Number);
  answer = { year: y, month: m, day: d };

  document.getElementById('celeb-name').textContent = celeb.name;
  fetchImage();
  renderGrid();
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
  if (won || guesses.length >= 6) gameOver = true;

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
