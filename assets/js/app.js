/* ============================================================
   PolitíCat NM — app.js
   Front-end behavior for the "Ask PolitíCat" demo.

   >>> THIS IS A MOCKUP <<<
   Answers are canned (see ANSWERS below). To go live, replace
   the body of getAnswer() with a fetch() to your backend.
   See the clearly-marked block at the bottom of this file.
   ============================================================ */

/* ---------- Canned sample answers (demo only) ----------
   Each entry: k = trigger keywords, a = plain-language answer,
   s = official NM source to "verify it yourself."
   Facts checked against sos.nm.gov and nmlegis.gov (June 2026). */
const ANSWERS = [
  {
    k: ["secretary of state", "secretary"],
    a: "The New Mexico Secretary of State is the state's chief elections officer. They oversee how elections are run, maintain official business and campaign-finance records, and certify election results statewide. Think of them as the referee for elections and the keeper of a lot of public records — not someone who picks winners.",
    s: "New Mexico Secretary of State — sos.nm.gov"
  },
  {
    k: ["absentee", "mail ballot", "mail-in", "vote by mail"],
    a: "In New Mexico, any registered voter can request an absentee (mail) ballot — you don't need an excuse. You request it from your county clerk or at NMVote.org, they mail it to you, you fill it out, sign the official envelope, and return it by mail or to a drop-off location before the deadline. The signature on the envelope is how your vote gets verified.",
    s: "Request a ballot — NMVote.org"
  },
  {
    k: ["register", "registration", "sign up to vote"],
    a: "You can register to vote in New Mexico online at NMVote.org, at your county clerk's office, at the MVD when you get a license, or by paper form. You need to be a U.S. citizen, a New Mexico resident, and 18 by the next election. New Mexico also offers same-day registration during early voting and on Election Day, so you can register and vote in one trip.",
    s: "NM Online Voter Registration — NMVote.org"
  },
  {
    k: ["county clerk", "clerk"],
    a: "Your county clerk is the local official who actually runs elections in your county — registering voters, sending absentee ballots, staffing polling places, and counting votes. They also keep many public records like property deeds, marriage licenses, and meeting records. When something is 'local' about voting, the clerk is usually who you talk to.",
    s: "Find your county clerk — sos.nm.gov"
  },
  {
    k: ["public record", "records", "open records"],
    a: "Public records are documents created by government bodies that the public has a right to see — budgets, contracts, meeting minutes, emails, permits, and more. In New Mexico, the Inspection of Public Records Act (IPRA) gives you the right to request them. You send a written request to the agency, and they generally have a set number of days to respond.",
    s: "NM IPRA — nmag.gov"
  },
  {
    k: ["right", "rights", "voter rights", "intimidat"],
    a: "As a New Mexico voter you have the right to: register if eligible, get a provisional ballot if there's a question about your status, vote if you're in line when polls close, ask for help if you have a disability or language need, and a private ballot. If anyone tries to stop or intimidate you, that's against the law — report it to your county clerk or the Secretary of State.",
    s: "Voter rights — sos.nm.gov"
  },
  {
    k: ["early voting", "vote early", "early vote"],
    a: "New Mexico lets you vote before Election Day. Early voting starts at your county clerk's office a few weeks out, then expands to more locations closer to the election. It's a great way to skip Election Day lines — and during early voting you can even register and vote the same day. Check your dates and locations at NMVote.org.",
    s: "Early voting dates — NMVote.org"
  },
  {
    k: ["same day", "same-day", "register and vote"],
    a: "Yes. New Mexico has same-day registration, so you can register (or update your registration) and cast your ballot in the same visit — during the early voting period and on Election Day. Bring an ID and proof of where you live, like a current document with your name and address. Details are at NMVote.org.",
    s: "Same-day registration — NMVote.org"
  },
  {
    k: ["id", "identification", "do i need id"],
    a: "For most New Mexico voters, you don't need to show photo ID at the polls if you're already registered — you state your name, address, and year of birth. First-time voters who registered by mail without verification, or people using same-day registration, may need to show an ID or a document proving where you live. When in doubt, bring an ID.",
    s: "Voter ID rules — sos.nm.gov"
  },
  {
    k: ["pre-register", "preregister", "16", "17", "under 18", "too young"],
    a: "You can pre-register to vote in New Mexico at 16. You won't be able to vote until you're 18, but pre-registering means your registration is ready to go automatically once you're old enough — so you don't miss your first election. It's the easiest way for young New Mexicans to get in the system early.",
    s: "Pre-registration — NMVote.org"
  },
  {
    k: ["polling place", "where do i vote", "voting location", "where to vote"],
    a: "Your polling place is where you cast your ballot in person. In New Mexico many counties use vote centers, which means you can vote at any open location in your county — not just one assigned spot. Look up your locations, hours, and a sample ballot by entering your address at NMVote.org.",
    s: "Find your polling place — NMVote.org"
  },
  {
    k: ["provisional", "provisional ballot"],
    a: "A provisional ballot is a backup ballot you can cast if there's a question about your registration — like your name isn't on the list or you forgot required ID. Your vote is sealed and set aside, then counted once officials confirm you were eligible. It's a safety net so no eligible voter gets turned away.",
    s: "Provisional ballots — sos.nm.gov"
  },
  {
    k: ["primary", "general election", "difference between", "primary vs"],
    a: "A primary election is where each party's voters pick who will represent that party in the fall. The general election is where everyone chooses among those finalists to decide who actually wins the office. In New Mexico's 2026 cycle, the primary is June 2 and the general is November 3.",
    s: "Election calendar — sos.nm.gov"
  },
  {
    k: ["when is the election", "election date", "2026 election", "next election"],
    a: "New Mexico's 2026 Primary Election is Tuesday, June 2, 2026, and the General Election is Tuesday, November 3, 2026. Registration deadlines, early voting windows, and your personalized sample ballot are all on NMVote.org. Mark the dates — every level of government from city council to Congress can be on the ballot.",
    s: "2026 election dates — sos.nm.gov"
  },
  {
    k: ["how are votes counted", "are machines safe", "voting machine", "count my vote", "rigged"],
    a: "In New Mexico, votes are recorded on paper ballots you can see, then scanned by tabulators that are tested before each election. The paper ballots are kept, so results can be audited and recounted by hand. After every election the state runs post-election audits to confirm the machine counts match the paper. That paper trail is the backbone of the system.",
    s: "Election security — sos.nm.gov"
  },
  {
    k: ["legislature", "legislators", "house of representatives", "senate", "how laws are made"],
    a: "New Mexico has a 'citizen legislature' — 70 Representatives (2-year terms) and 42 Senators (4-year terms) who are not paid a salary, just a daily expense rate. They meet in Santa Fe every January: 60 days in even years, 30 days in odd years. Because they're regular people with regular jobs, your voice can actually reach them.",
    s: "NM Legislature — nmlegis.gov"
  },
  {
    k: ["bill become", "bill becomes a law", "how a bill", "make a law", "pass a law"],
    a: "A bill starts as an idea a legislator introduces. It gets assigned to committees that study and amend it, then both the House and Senate vote on it. If both chambers pass the same version, it goes to the Governor, who can sign it or veto it. In New Mexico, a new law usually takes effect 90 days after the session ends, unless lawmakers vote to make it sooner.",
    s: "How a bill becomes law — nmlegis.gov"
  },
  {
    k: ["governor", "what does the governor"],
    a: "The Governor is New Mexico's chief executive — they propose a state budget, sign or veto bills passed by the Legislature, lead state agencies, and can call special legislative sessions. They're elected statewide every four years. The Lieutenant Governor backs them up and presides over the state Senate.",
    s: "Office of the Governor — governor.nm.gov"
  },
  {
    k: ["who represents me", "my district", "my legislator", "my representative", "find my rep"],
    a: "Every New Mexican is represented by people at several levels: a state Representative and state Senator in Santa Fe, members of Congress in Washington, plus local officials like county commissioners and city council. Enter your address at NMVote.org or the Legislature's site to see exactly who represents your district and how to reach them.",
    s: "Find your legislators — nmlegis.gov"
  },
  {
    k: ["local government", "city government", "county government", "city council", "commission"],
    a: "Local government handles the stuff you touch every day — roads, parks, water, zoning, police and fire, and local budgets. In New Mexico that's your city or town council and your county commission, usually meeting in public sessions you can attend. Local races are small enough that a handful of votes can decide them.",
    s: "NM local government — nmcounties.org"
  },
  {
    k: ["three branches", "branches of government", "separation of powers"],
    a: "New Mexico's government has three branches, just like the federal one: the Legislature (makes laws), the Executive led by the Governor (carries out laws), and the Judiciary (the courts, which interpret laws). Splitting power three ways keeps any one part from getting too strong — that's the 'checks and balances' idea.",
    s: "NM Constitution — sos.nm.gov"
  },
  {
    k: ["ipra request", "request records", "how do i request", "freedom of information"],
    a: "To get public records in New Mexico, send a written IPRA request to the agency that holds them — a letter or email naming the records you want and how to reach you. They generally must respond within a few days and provide the records within a set window. You don't have to say why you want them; access is your right.",
    s: "IPRA guide — nmag.gov"
  },
  {
    k: ["contact", "contact my", "reach my official", "email my representative", "call my"],
    a: "Contacting your elected officials is easier than people think. Look up your state legislators at nmlegis.gov for their email and phone, or your city and county officials on their local sites. A short, specific message — who you are, where you live, and what you care about — genuinely gets read, especially in a citizen legislature like New Mexico's.",
    s: "Contact your legislators — nmlegis.gov"
  },
  {
    k: ["get involved", "young people", "youth", "students", "volunteer", "how can i help"],
    a: "You don't have to wait until you're 18. Young New Mexicans can pre-register at 16, work as a paid election poll worker, attend public council and school-board meetings, volunteer for causes or candidates, or just learn how local decisions get made. Civic power isn't only voting — it's showing up where decisions happen.",
    s: "Get involved — NMVote.org"
  },
  {
    k: ["zia", "curiosity", "why a cat", "what is politicat", "who is don gato"],
    a: "PolitíCat is built on one idea: Curiosity > Politics. Don Gato Cívico is a curious New Mexico cat — a little skeptical, allergic to spin — who explains how government actually works in plain language, then points you to the official source so you can decide for yourself. The Zia sun in the logo is New Mexico's state symbol of unity and belonging.",
    s: "About PolitíCat — politicatnm.org"
  },

  /* ---- Civic Substrate–backed topics (data layer) ----
     These questions are about live NM data (registration counts,
     party totals, turnout, county figures). The DEMO answers are
     deliberately source-first and state NO unverified numbers.
     In production, PolitíCat reads the figure + report date from
     the Civic Substrate API and fills it in here. */
  {
    k: ["registered voters", "how many registered", "total voters", "voter registration totals", "how many people are registered", "voters in new mexico", "registered in new mexico"],
    a: "New Mexico publishes official statewide voter registration totals every single month through the Secretary of State. The exact current count — and how it breaks down by party and county — comes straight from those monthly reports. (In the live version I read the latest figure from our Civic Substrate data layer and show it here with the report's date so you can verify it.)",
    s: "NM Voter Registration Statistics — sos.nm.gov"
  },
  {
    k: ["how many democrats", "how many republicans", "how many independents", "party affiliation", "democrat", "republican", "independent", "dts", "declined to state", "registered democrat", "registered republican", "major party"],
    a: "In New Mexico you can register as a Democrat, Republican, Libertarian, another party, or with no party at all — often shown as 'DTS,' meaning Declined To State. The Secretary of State publishes the exact totals for each, statewide and county-by-county, in a report every month. (Live PolitíCat pulls the latest numbers from Civic Substrate and cites the report date — it never guesses.)",
    s: "Party registration totals — sos.nm.gov"
  },
  {
    k: ["my county", "bernalillo", "albuquerque", "doña ana", "dona ana", "las cruces", "santa fe", "sandoval", "rio rancho", "san juan", "farmington", "county compare", "in my county", "county turnout", "compare to the rest"],
    a: "Most of what people care about is local. New Mexico breaks voter registration down across all 33 counties — so you can see the numbers for Bernalillo (Albuquerque), Doña Ana (Las Cruces), Santa Fe, Sandoval (Rio Rancho), San Juan (Farmington), and everywhere else. (Live PolitíCat reads your county's latest figures from Civic Substrate and explains how it stacks up against the rest of the state.)",
    s: "County registration data — sos.nm.gov"
  },
  {
    k: ["turnout", "how many voted", "how many people voted", "voter turnout", "did people vote", "participation", "highest turnout", "lowest turnout"],
    a: "Turnout is the share of registered voters who actually cast a ballot. New Mexico posts official turnout and past results — down to the precinct, going back to the year 2000 — in its online election data tool. (Live PolitíCat reads turnout from Civic Substrate so it can tell you how your county compares and whether participation is rising or falling.)",
    s: "NM election results & turnout — electionstats.sos.nm.gov"
  },
  {
    k: ["more people registering", "changing party", "changed party", "party trends", "switching parties", "young voters participating", "registration trends", "are young voters", "registering more"],
    a: "Whether more people are registering with one party, or changing their affiliation, is something you can actually measure — by comparing the Secretary of State's monthly registration reports over time. (Live PolitíCat reads that month-over-month history from Civic Substrate and explains the trend in plain language, always with the source dates attached.)",
    s: "Monthly registration reports — sos.nm.gov"
  },
  {
    k: ["offices on", "on my ballot", "what offices", "who is on the ballot", "what's on the ballot", "whats on the ballot", "sample ballot", "races on"],
    a: "What's on your ballot depends on where you live and which election it is. In 2026, New Mexico voters can decide races from U.S. Congress and statewide offices all the way down to the state Legislature, county offices, and judges. The fastest way to see YOUR exact ballot is to enter your address for a personalized sample ballot at NMVote.org.",
    s: "Your sample ballot — NMVote.org"
  }
];

const FALLBACK = {
  a: "Good question — that's exactly the kind of thing I'm built to explain. In the live version, I'd break this down in plain language and point you to the official New Mexico source so you can verify it yourself. (This is a demo: try voting, registration, early voting, absentee ballots, the Legislature, how a bill becomes law, your rights, voter registration numbers, your county's data, or how young people can get involved.)",
  s: "Official NM sources — sos.nm.gov"
};

/* ============================================================
   CivicSubstrate data layer — live county-level intelligence
   ------------------------------------------------------------
   PolitíCat is the public, plain-language face (an "Atrium") of
   the CivicSubstrate data engine. These snapshot files are the
   read-only JSON output of:
       python cli.py politicat-nm <subcommand> --json
   Each carries source, source_date, and confidence so every
   number can be verified. PolitíCat NEVER invents figures: if a
   snapshot's confidence is "no_data", we quietly fall back to
   pointing at the official source instead of guessing.
   ============================================================ */
const CIVIC = { totals: null, counties: null, trend: null };

async function loadCivicData() {
  const files = {
    totals:   'assets/data/voter_totals.json',
    counties: 'assets/data/voter_counties.json',
    trend:    'assets/data/voter_trend.json'
  };
  await Promise.all(Object.entries(files).map(async ([key, url]) => {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) CIVIC[key] = await res.json();
    } catch (_) { /* file:// or offline — stay null, fall back to canned answers */ }
  }));
}

/* NM has 33 counties. Most people say a city name, not a county —
   so map the big ones back to their county. "Albuquerque" → Bernalillo. */
const CITY_TO_COUNTY = {
  'albuquerque': 'Bernalillo', 'abq': 'Bernalillo', 'rio rancho': 'Sandoval',
  'las cruces': 'Doña Ana', 'santa fe': 'Santa Fe', 'roswell': 'Chaves',
  'farmington': 'San Juan', 'hobbs': 'Lea', 'clovis': 'Curry',
  'carlsbad': 'Eddy', 'gallup': 'McKinley', 'alamogordo': 'Otero',
  'los lunas': 'Valencia', 'las vegas': 'San Miguel', 'deming': 'Luna',
  'silver city': 'Grant', 'española': 'Rio Arriba', 'espanola': 'Rio Arriba',
  'taos': 'Taos', 'socorro': 'Socorro', 'ruidoso': 'Lincoln',
  'los alamos': 'Los Alamos', 'grants': 'Cibola', 'portales': 'Roosevelt'
};
const NM_COUNTIES = ['Bernalillo','Catron','Chaves','Cibola','Colfax','Curry','De Baca',
  'Doña Ana','Eddy','Grant','Guadalupe','Harding','Hidalgo','Lea','Lincoln','Los Alamos',
  'Luna','McKinley','Mora','Otero','Quay','Rio Arriba','Roosevelt','Sandoval','San Juan',
  'San Miguel','Santa Fe','Sierra','Socorro','Taos','Torrance','Union','Valencia'];

const fmtNum = n => Number(n || 0).toLocaleString('en-US');
const pctOf = (n, total) => total ? (n / total * 100).toFixed(1) : '0.0';
const dataReady = snap => !!(snap && snap.confidence && snap.confidence !== 'no_data');

function findCountyName(t) {
  for (const c of NM_COUNTIES) {
    const name = c.toLowerCase();
    if (t.includes(name) || t.includes(name.replace('ñ', 'n'))) return c;
  }
  for (const [city, county] of Object.entries(CITY_TO_COUNTY)) {
    if (t.includes(city)) return county;
  }
  return null;
}

function countyRow(county) {
  if (!dataReady(CIVIC.counties)) return null;
  const rows = (CIVIC.counties.data && CIVIC.counties.data.counties) || [];
  const target = county.toLowerCase().replace('ñ', 'n');
  return rows.find(r => (r.county || '').toLowerCase().replace('ñ', 'n').includes(target)) || null;
}

function civicAns(a, snap) {
  return { a, s: snap.source, source: snap.source, source_date: snap.source_date, confidence: snap.confidence };
}

function countyAnswer(row, snap) {
  const total = row.total || (row.dem + row.rep + (row.lib || 0) + row.no_party + row.other);
  // NM SOS stopped breaking out Libertarian in 2026 (lib === null) — omit it then.
  const libPart = (row.lib != null) ? `${fmtNum(row.lib)} Libertarian, and ` : '';
  const a = `As of ${snap.source_date}, ${row.county} County had ${fmtNum(total)} registered voters: `
    + `${fmtNum(row.dem)} Democrat (${pctOf(row.dem, total)}%), `
    + `${fmtNum(row.rep)} Republican (${pctOf(row.rep, total)}%), `
    + `${fmtNum(row.no_party)} Decline to State (${pctOf(row.no_party, total)}%), `
    + `${libPart}${fmtNum(row.other)} Other.`;
  return civicAns(a, snap);
}

function trendAnswer(snap) {
  const snaps = (snap.data && snap.data.snapshots) || [];
  if (snaps.length < 2) return civicAns(snap.answer || '', snap);
  const first = snaps[0], last = snaps[snaps.length - 1];
  const dir = n => n > 0 ? `up ${fmtNum(n)}` : n < 0 ? `down ${fmtNum(Math.abs(n))}` : 'unchanged';
  const a = `Between ${first.year_month} and ${last.year_month}, New Mexico's total registered voters went `
    + `${dir(last.total - first.total)} (from ${fmtNum(first.total)} to ${fmtNum(last.total)}). `
    + `Over that span: Democrats ${dir(last.dem - first.dem)}, Republicans ${dir(last.rep - first.rep)}, `
    + `and Decline-to-State ${dir(last.no_party - first.no_party)}.`;
  return civicAns(a, snap);
}

/* Returns a live, source-cited answer object, or null to fall
   through to the canned source-first answers. Only fires when a
   real snapshot is loaded — so the demo degrades gracefully. */
function matchCivicQuery(q) {
  const t = q.toLowerCase();
  const asksVoters = /(voter|registrat|registered|democrat|republican|independent|decline to state|party|how many)/.test(t);

  // 1. A specific county or city — the killer feature
  const county = findCountyName(t);
  if (county) {
    const row = countyRow(county);
    if (row && (row.total || row.dem || row.rep)) return countyAnswer(row, CIVIC.counties);
  }

  // 2. County comparison / ranking
  if (/(compare|which count|most voters|largest county|biggest county|rank|all counties|by county|county.*compar)/.test(t)) {
    if (dataReady(CIVIC.counties)) return civicAns(CIVIC.counties.answer, CIVIC.counties);
  }

  // 3. Trend over time
  if (asksVoters && /(trend|over time|increasing|decreasing|growing|shrinking|rising|falling|more people registering|year over year|changing|change over)/.test(t)) {
    if (dataReady(CIVIC.trend)) return trendAnswer(CIVIC.trend);
  }

  // 4. Statewide totals / party breakdown
  if (asksVoters && /(how many|total|statewide|new mexico|breakdown|democrat|republican|party)/.test(t)) {
    if (dataReady(CIVIC.totals)) return civicAns(CIVIC.totals.answer, CIVIC.totals);
  }

  return null;
}

/* ---------- Keyword router (demo only) ----------
   Scores each answer by how specifically its keywords match
   the question; longer phrase matches win over short ones. */
function matchAnswer(q) {
  const t = q.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const item of ANSWERS) {
    let score = 0;
    for (const kw of item.k) {
      if (t.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return best || FALLBACK;
}

/* ---------- UI wiring ---------- */
function quick(el) {
  document.getElementById('heroInput').value = el.textContent;
  askFromHero();
}
function askFromHero() {
  const v = document.getElementById('heroInput').value.trim();
  if (!v) return;
  askDemo(v);
}
let demoBusy = false;

function askDemo(q) {
  if (demoBusy) return;
  document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('demoInput').value = '';
  setTimeout(() => runDemo(q), 450);
}
function sendDemo() {
  if (demoBusy) return;
  const i = document.getElementById('demoInput');
  const v = i.value.trim();
  if (!v) return;
  i.value = '';
  runDemo(v);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

/* Verify It Yourself block. When an answer carries structured
   provenance (source table + snapshot date + confidence) we show
   the full receipt; otherwise the simple source line. */
function renderVerify(ans) {
  if (ans.source_date || ans.confidence) {
    const conf = (ans.confidence || '').replace('_', ' ');
    const badge = ans.confidence
      ? '<span class="conf conf-' + escapeHtml(ans.confidence) + '">' + escapeHtml(conf) + '</span>'
      : '';
    return '<div class="verify">'
      + '<div class="verify-h">🐾 Verify it yourself</div>'
      + '<div class="verify-row"><span>Source</span><b>' + escapeHtml(ans.source || ans.s) + '</b></div>'
      + (ans.source_date ? '<div class="verify-row"><span>Snapshot date</span><b>' + escapeHtml(ans.source_date) + '</b></div>' : '')
      + (ans.confidence ? '<div class="verify-row"><span>Confidence</span>' + badge + '</div>' : '')
      + '</div>';
  }
  return '<div class="src">🐾 <b>Verify it yourself:</b> ' + escapeHtml(ans.s) + '</div>';
}

async function runDemo(q) {
  if (demoBusy) return;
  demoBusy = true;

  const btn = document.getElementById('demoSend');
  const origLabel = btn ? btn.textContent : null;
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  const body = document.getElementById('demoBody');

  // user bubble
  const u = document.createElement('div');
  u.className = 'bubble user';
  u.textContent = q;
  body.appendChild(u);
  body.scrollTop = body.scrollHeight;

  // typing indicator
  const t = document.createElement('div');
  t.className = 'typing';
  t.innerHTML = '<span></span><span></span><span></span>';
  body.appendChild(t);
  body.scrollTop = body.scrollHeight;

  const ans = await getAnswer(q);

  t.remove();
  const c = document.createElement('div');
  c.className = 'bubble cat';
  c.innerHTML = escapeHtml(ans.a) + renderVerify(ans);
  body.appendChild(c);
  body.scrollTop = body.scrollHeight;

  if (btn) { btn.textContent = origLabel; btn.disabled = false; }
  demoBusy = false;
}

/* ============================================================
   getAnswer() — THE SWAP POINT
   ------------------------------------------------------------
   DEMO version: returns a canned answer after a short delay.

   TO GO LIVE: delete the demo body and uncomment the fetch
   version. Your backend should return { a: "...", s: "..." }
   where `a` is the plain-language answer and `s` is the
   official source string. Keeping the source field is the
   whole trust model — don't drop it.
   ============================================================ */
async function getAnswer(q) {
  // ---- DEMO (canned) + LIVE CivicSubstrate snapshots ----
  await new Promise(r => setTimeout(r, 1100));
  // Try the live data layer first (county/registration/trend questions).
  // Returns null unless a real snapshot is loaded, so the demo never breaks.
  const civic = matchCivicQuery(q);
  if (civic) return civic;
  return matchAnswer(q);

  // ---- LIVE (uncomment, delete the two lines above) ----
  // const res = await fetch('/api/ask', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ question: q })
  // });
  // if (!res.ok) {
  //   return { a: "Hmm, my whiskers twitched — something went wrong. Try again in a moment.", s: "Official NM sources — sos.nm.gov" };
  // }
  // return await res.json(); // expects { a: "...", s: "..." }
}

/* ---------- Startup: load CivicSubstrate snapshots ---------- */
loadCivicData();
