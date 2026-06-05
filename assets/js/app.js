/* ============================================================
   PolitíCat NM — app.js
   Front-end behavior for the "Ask PolitíCat" demo.

   >>> THIS IS A MOCKUP <<<
   Answers are canned (see ANSWERS below). To go live, replace
   the body of getAnswer() with a fetch() to your backend.
   See the clearly-marked block at the bottom of this file.
   ============================================================ */

/* ---------- Canned sample answers (demo only) ---------- */
const ANSWERS = {
  "secretary of state": {
    a: "The New Mexico Secretary of State is the state's chief elections officer. They oversee how elections are run, maintain official business and campaign-finance records, and certify election results statewide. Think of them as the referee for elections and the keeper of a lot of public records — not someone who picks winners.",
    s: "New Mexico Secretary of State — sos.nm.gov"
  },
  "absentee": {
    a: "In New Mexico, any registered voter can request an absentee (mail) ballot — you don't need an excuse. You request it from your county clerk (online or by form), they mail it to you, you fill it out, sign the official envelope, and return it by mail or to a drop-off location before the deadline. The signature on the envelope is how your vote gets verified.",
    s: "Your county clerk + NM SOS — sos.nm.gov"
  },
  "register": {
    a: "You can register to vote in New Mexico online at the Secretary of State's site, at your county clerk's office, at the MVD when you get a license, or by paper form. You'll need to be a U.S. citizen, a New Mexico resident, and 18 by the next election (you can pre-register at 16). New Mexico also offers same-day registration during early voting and on Election Day.",
    s: "NM Online Voter Registration — sos.nm.gov"
  },
  "county clerk": {
    a: "Your county clerk is the local official who actually runs elections in your county — registering voters, sending absentee ballots, staffing polling places, and counting votes. They also keep many public records like property deeds, marriage licenses, and meeting records. When something is 'local' about voting, the clerk is usually who you talk to.",
    s: "Find your county clerk — nmcounties.org"
  },
  "public records": {
    a: "Public records are documents created by government bodies that the public has a right to see — budgets, contracts, meeting minutes, emails, permits, and more. In New Mexico, the Inspection of Public Records Act (IPRA) gives you the right to request them. You send a written request to the agency; they generally have a set number of days to respond.",
    s: "NM IPRA — nmag.gov"
  },
  "rights": {
    a: "As a New Mexico voter you have the right to: register if eligible, get a provisional ballot if there's a question about your status, vote if you're in line when polls close, ask for help if you have a disability or language need, and a private ballot. If anyone tries to stop or intimidate you, that's against the law — report it to your county clerk or the Secretary of State.",
    s: "Voter rights — sos.nm.gov"
  }
};

const FALLBACK = {
  a: "Good question — that's exactly the kind of thing I'm built to explain. In the live version, I'd break this down in plain language and point you to the official New Mexico source so you can verify it yourself. (This is a demo with a few sample answers: try voting, absentee ballots, the Secretary of State, county clerks, public records, or your voter rights.)",
  s: "Official NM sources — sos.nm.gov"
};

/* ---------- Keyword router (demo only) ---------- */
function matchAnswer(q) {
  const t = q.toLowerCase();
  if (t.includes("secretary")) return ANSWERS["secretary of state"];
  if (t.includes("absentee") || t.includes("mail ballot")) return ANSWERS["absentee"];
  if (t.includes("register") || t.includes("registration")) return ANSWERS["register"];
  if (t.includes("clerk")) return ANSWERS["county clerk"];
  if (t.includes("public record") || t.includes("records")) return ANSWERS["public records"];
  if (t.includes("right")) return ANSWERS["rights"];
  return FALLBACK;
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
