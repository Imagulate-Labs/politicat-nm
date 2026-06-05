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
  }
];

const FALLBACK = {
  a: "Good question — that's exactly the kind of thing I'm built to explain. In the live version, I'd break this down in plain language and point you to the official New Mexico source so you can verify it yourself. (This is a demo: try voting, registration, early voting, absentee ballots, the Legislature, how a bill becomes law, your rights, or how young people can get involved.)",
  s: "Official NM sources — sos.nm.gov"
};

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
  c.innerHTML = escapeHtml(ans.a) +
    '<div class="src">🐾 <b>Verify it yourself:</b> ' + escapeHtml(ans.s) + '</div>';
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
  // ---- DEMO (canned) ----
  await new Promise(r => setTimeout(r, 1100));
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
