# PolitíCat Homepage & Features Handoff — v1 (FOR APPROVAL)

Status: **DRAFT — no product code changes until the operator approves this document.**
Prepared 2026-08-19 by the implementation side (this repo), reconciling the Aug 18 homepage mockup
(`mockup_homepage-dark.png`), the Aug 19 counter-review, the whitepaper canons, and the
Civic Substrate decision register (D-001–D-006, `CIVIC_EXPLORER_BLUEPRINT_v1.md`).

Verified against the repo at `8f125c1`: the old homepage heading is still live, the 2.3 MB logo is
still the site icon, the Pulse follow buttons are styled but unwired, and the PolitíCat spelling is
already consistent site-wide (no unaccented instances in visible copy).

---

## 0. Register corrections to the counter-review (canonical vocabulary)

Two items in the Aug 19 review drifted from the decision register and are **corrected here**;
the register wins unless the operator amends it explicitly.

1. **CONTESTED is not a story-lifecycle stage.** Per D-001 (as amended, substrate `c83ba67`):
   lifecycle = `UPCOMING / ACTIVE / COMPLETED / UNRESOLVED`; **contest is a separate overlay**
   (`NONE FOUND / CONTESTED / RESOLVED / UNKNOWN`). Disagreement in the world never changes what
   the record shows. The trail.html legend already renders this correctly.
2. **`CLAIMED` is not an evidence state.** Evidence = `VERIFIED / DEGRADED / UNKNOWN / REFUSED`
   (D-001). "Claimed" is a *lane* in the water-dossier five-lane model
   (claimed → in agreements → filed → observed → unknown), not a chip. `UNKNOWN` stays.
3. The five label families that may appear in UI (all already live on trail.html):
   - **Claim type:** RECORD / READING / PROJECTION / POSITION
   - **Evidence:** VERIFIED / DEGRADED / UNKNOWN / REFUSED
   - **Story lifecycle:** UPCOMING / ACTIVE / COMPLETED / UNRESOLVED
   - **Contest overlay:** NONE FOUND / CONTESTED / RESOLVED / UNKNOWN
   - **Coverage:** LIVE / WATCHING / PLANNED / PAUSED / GAP  ·  **Activity:** NEW DOCUMENT / STORY UPDATED / SOURCE ALERT

---

## 1. Route map

| Route | Job | Status |
|---|---|---|
| `/` (index.html) | Civic front door: previews + routes, holds nothing itself | REBUILD per §2 |
| `/map` (map.html) | Full 33-county workspace, layers | LIVE |
| `/ask` (ask.html) | Full Don Gato conversation | LIVE (canned answers) |
| `/pulse` (pulse.html) | Complete feed + future custom alerts | LIVE (preview) |
| `/learn`, `/trail`, `/elections`, `/ballot`, `/community`, `/about`, `/civic-explorer` | as today | LIVE |
| `/my-nm` (my-nm.html) | Private browser-first civic home | BUILD (§6) |
| `/bills` (bills.html) | Bill tracker + **Session Ledger** (one home for both) | BUILD (§7, §10) — *route name needs approval* |
| `/meetings` (meetings.html) | Meetings pilot (legislative calendars only at first) | BUILD (§8) — *route name needs approval* |

Homepage cards route: Map preview→`/map` · Quick Ask→`/ask` · 3 Pulse stories→`/pulse` ·
Track a bill→`/bills` · Attend a meeting→`/meetings` · Set up my civic home→`/my-nm`.

## 2. Homepage rebuild (design target: `mockup_homepage-dark.png`)

Order of sections, approved wording:

1. **Nav:** C-glyph + PolitíCat NM wordmark · existing nav items · theme toggle (§4) · `Ask Don Gato` CTA.
2. **Hero (dark):** chip `NEW MEXICO'S CIVIC FRONT DOOR` · H1 `Ask questions. Find the trail.` ·
   `Curiosity > Politics` · sub `Find your county. Understand what changed. Know what you can do next.` ·
   CTAs `Set up my civic home` (→ /my-nm) + `Explore all 33 counties` (→ /map).
3. **Map preview (center):** simplified interactive county outline (REAL geometry from `tools/nm-map`,
   not decorative); county tap → mini-popup (Officials / Elections / Public meetings links) → `Open full map →`.
4. **Ask Don Gato card (right):** portrait, `AI CIVIC GUIDE`, one input → submits to /ask.
   No fake "ONLINE" badge unless the live pipeline exists — label `PREVIEW` until then.
5. **Civic Pulse bar:** exactly three items, real ones only, each with its true source line.
   Approved sources wording: **“Sources: New Mexico Secretary of State · NMVote.org.”**
   **Never** "BallotReady" (the mock invented it; we have never used it).
6. **Parchment section:** `START HERE — What do you need today?` Six cards:
   - Find my officials → /map (county → officials) — LIVE
   - Prepare to vote → /elections — LIVE
   - Track a bill → /bills — **PLANNED chip** until §7 ships
   - Attend a meeting → /meetings — **PLANNED chip** until §8 ships
   - (plus Ask + My NM entries as design dictates)
   PLANNED state (design-target canon, whitepaper §3): visible, styled, honest —
   chip text `PLANNED — in build`, card links to the whitepaper roadmap anchor, never a dead click.
7. Retire the heading **“A Civic Platform, Not a Landing Page”** and its section (currently live on index).

## 3. Brand system install

- Assets (masters in the operator's art folder): `logo_c-glyph.png` (light), `logo_c-glyph-dark.png`,
  badge v2, wordmarks. Produce: favicon set (16/32/180/512 + .ico), og/twitter preview images
  (light + dark), optimized header/footer marks (SVG if traceable, else ≤40 KB PNGs).
- Replace `politicat-logo.png` (2.3 MB) everywhere; keep the old file until all references move.
- **Zia audit (blocking):** the badge-v2 bolo medallion and the red/tan cap in
  `character_serval-suits.png` still carry Zia-style suns. **Regenerate before these assets enter
  the repo.** Audit every art master for the symbol before install; record the audit result here.
- Spelling: verified consistent (PolitíCat) — keep the accent in all new copy.

## 4. Theme toggle — DECISION NEEDED

Recommendation (both threads agree): **one site-wide toggle**, not homepage-only.
Scope: dark = homepage default; light = Learn/Trail/reading pages default; toggle persists in
localStorage; both palettes ship in `styles.css` as token sets. This is a real system-work item
(every component gets both skins) — sequenced with the homepage rebuild, shipped page-by-page.

## 5. Receipt system (no VERIFIED without a receipt)

- **Receipt object:** `{id, claim, evidence_state, source_name, source_url, retrieved_date,
  coverage_date, artifact:{bytes, sha256}, limitations}` — aligns with the substrate ClaimObject
  (`CIVIC_EXPLORER_BLUEPRINT_v1.md`); PolitíCat consumes approved publication objects only (D-004).
- **Shared resolver:** one JS module (app.js) renders every chip from a receipt id; a chip with no
  receipt id cannot render `VERIFIED` (build-time rule + runtime guard).
- **Receipt drawer:** clicking any chip opens the receipt: claim, state, source link, dates,
  SHA-256, limitations. Existing hard-coded receipts (trail.html, civic-explorer.html) migrate
  into one `receipts.json` consumed by the resolver.

## 6. `/my-nm` v1 — private, browser-first

Stores in localStorage only: county/district, followed issues, watched bills, followed bodies,
chosen alert events. Explicit copy: “Saved only in this browser. Nothing is uploaded.”
Wire the existing Pulse follow buttons to these preferences (they currently do nothing).
**Voter-roll matching is explicitly out of scope** — any future matching requires separate consent,
stated purpose, retention/deletion rules, access controls, and legal review (member-data firewall,
whitepaper §3). Not part of v1 in any form.

## 7. Bill tracker minimum (`/bills`)

Per session: bill list; bill page with stage + timeline; sponsors & committees; scheduled hearings;
amendments/versions; recorded committee & floor votes; governor action; sources + receipts on every
fact; `WATCH` control (v1: writes the subscription into /my-nm local prefs; delivery comes with §9).
Three distinct events, never conflated: **passed one chamber ≠ passed the Legislature ≠ became law.**
Data source: nmlegis captures via scheduled substrate collection (prerequisite). Roll-call *names*
require capturing the roll-call documents — a named substrate collection target (tallies alone are
already in the HB 9 capture: House 40–29, Senate 24–15, verified).

## 8. Meetings pilot (`/meetings`)

One honest collection first: **NM legislative committee + floor calendars.** Fields: body, date/time,
location/remote link, agenda, related bills, changes/cancellations, source + last-checked.
Coverage statement on the page: legislative only; municipal/county/school meetings are **not**
collected yet (coverage chips, not implication).

## 9. PolitíCat Watch v1

Follow: bill / issue / county / district / committee / official / agency. Triggers: the 12-event
taxonomy (whitepaper roadmap). Delivery **v1 = Discord roles + opt-in email together** (operator's
Aug 19 preference; amends the earlier Discord-only-first line — approval confirms the amendment);
SMS only after consent + STOP handling. Immediate or digest. Dedup by (target, event, artifact hash).
Alert contract: what changed · when · why you received it · what happens next · source + receipt links.
Email requires the data-minimalism decision doc in the register **before** the first address is stored.

## 10. Session Ledger (lives at `/bills`)

Session-first organization (60-day odd years, 30-day even years, specials separate; 2026: Jan 20–Feb 19),
quarters secondary. Buckets: introduced / heard / passed House / passed Senate / passed both /
signed & chaptered / vetoed or pocket-vetoed / defeated by recorded vote / **no final action** —
rendered exactly: “No final vote occurred before the session ended. Individual floor-vote positions
are unavailable.” Votes show: yes/no/absent/excused by name, party at time of vote, breakdown,
threshold, exact bill version, roll-call document. Visuals: session funnel · outcome chart ·
weekly activity timeline · side-by-side party bars (never a pie) · “How my lawmakers voted” first ·
Watch button on everything.

## 11. Honesty fixes (immediate, ship with homepage)

- Pulse ticker: label every sample item `(sample)` inline, not just the banner.
- Pulse follow buttons: wire to /my-nm prefs (§6) or carry `PLANNED` until wired.
- HB 9 locked facts, applied everywhere with their evidence states:
  signed Feb 5 2026 (VERIFIED, capture on file) · complaint filed May 8 2026, case 1:26-cv-01471
  (**date not yet in custody → render DEGRADED until the docket is captured**) · reported effective
  May 20 2026 (DEGRADED until captured) · the May 13 “stipulated arrangement” stays dead.

## 12. Secondary backlog (after the order below)

Name + register the serval before Community · party explainer (plain language) · 10–12-question
educational alignment exercise · Community redesign around real activity · custom header art from
accurate state/county geometry · stable merch/QR destination (`politicatnm.org/data` is printed on
the hoodie QR patches — that route must exist before any merch ships).

## 13. Explicitly excluded from product (parking lot)

DNOX/DYNOX/terminal naming · signature-ring terminal logo · Floyd's storytelling belt ·
jewelry & charm collection · NFT funding collection. These live in a future brand/funding concept
doc only; nothing in navigation, nothing promised publicly.

## 14. Build order (as recommended and agreed)

**Homepage + branding → receipt-backed states → /my-nm → bill tracker → meetings pilot →
Watch alerts → Session Ledger analytics.** Substrate prerequisite running underneath: scheduled
collection (everything event-driven is a diff between two captures).

## 15. Approvals needed from the operator before code

- [ ] This document as the homepage/feature contract
- [ ] Route names: `/bills` (tracker + ledger together) and `/meetings`
- [ ] Theme toggle: site-wide (recommended) vs homepage-only
- [ ] Watch v1 channels: Discord + email together (amends Discord-first roadmap line)
- [ ] Vocabulary: confirm register stands (no `CLAIMED` state; CONTESTED stays an overlay)
- [ ] Serval character: name + role
- [ ] Regenerated Zia-free badge + cap art (blocking brand install)
