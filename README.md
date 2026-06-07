# PolitíCat NM — Website

New Mexico's curious civic cat. *Curiosity > Politics.*

A nonpartisan civic-education homepage built around **Ask PolitíCat** — the
product — with **PolitíCat NM** as the brand and **Don Gato Cívico** as host.

## Charter

PolitíCat does not tell people what to think.

PolitíCat shows what records exist, what they say, and what is still unknown.

The product posture is records first, interpretation disciplined, uncertainty
visible. PolitíCat should answer according to the kind of question asked, not
flatten every civic question into the same generic response.

## Evidence response model

The durable response shape is:

```text
question_type
answer
evidence[]
source_date
limits
records_reviewed
official_sources
contradicting_records_found
open_questions
verify_urls[]
next_records_to_check[]
```

The public surface should measure the trail, not overstate the claim. Prefer
"Records Reviewed: 3" and "Open Questions: 2" over a broad label like
"Confidence: High" when the answer depends on incomplete or evolving records.

Question types:

- **FACT:** answer directly from structured public records.
- **TREND:** answer with a dated series, comparison, or change over time.
- **INVESTIGATION:** show the trail so far, what is still unknown, and the next records to check.
- **ACCOUNTABILITY:** separate the fact layer from the explanation layer.

---

## Run it

No build step. It's plain HTML/CSS/JS. Either:

**Option A — just open it**
Double-click `index.html`. (Works, but some browsers are fussy about local
file paths.)

**Option B — VS Code Live Server (recommended)**
1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

**Option C — any static server**
```bash
# from the project folder
python3 -m http.server 5173
# then visit http://localhost:5173
```

---

## Structure

```
politicat-site/
├── index.html              # the homepage (semantic sections, commented)
├── assets/
│   ├── css/styles.css      # all styling; palette tokens at the top
│   ├── js/app.js           # Ask PolitíCat demo logic + LIVE swap point
│   └── img/
│       ├── politicat-logo.png       # Don Gato circular logo
│       ├── politicat-banner.png     # wide banner (About section / social)
│       ├── politicat-cast.png       # full cast sheet (not on homepage yet)
│       └── politicat-brandsheet.png # reference: modes + palette
└── README.md
```

---

## Brand notes baked into the code

- **Brand vs. product:** PolitíCat = brand, Ask PolitíCat = product. The hero
  leads with the Ask box for this reason.
- **Palette:** tokens live at the top of `styles.css`. The official brand sheet
  lists `#0F4CAC` but every visual on it is **teal** — that hex is a typo.
  `--teal` is set to the teal you see. Change it in one place if needed.
- **Three modes** (Civic Professional / Research Mode / Town Hall) appear as the
  "Why PolitíCat" section. Same cat, three tones for three contexts.
- **Trust model:** every answer ends with a "Verify it yourself" source line.
  This is what keeps PolitíCat reading as a *guide*, not an authority. Keep it.
- **Noise Twins** (Chisme & Chueco) are deliberately **off** the homepage. Best
  used in a dedicated "how to spot misinformation" lesson where they're clearly
  the foil — not in the hero.

---

## Going live (Ask PolitíCat)

The Ask box is currently a **mockup** with canned answers. The swap point is
clearly marked in `assets/js/app.js` — the `getAnswer()` function. Replace the
canned return with a `fetch()` to your backend (the live version is already
written there, commented out). Your endpoint should return:

```json
{ "a": "plain-language answer", "s": "Official source — domain.gov" }
```

Do **not** drop the `s` (source) field — it's the trust mechanic.

---

## Suggested next steps

- [ ] Wire `getAnswer()` to a real backend (Anthropic API or your own).
- [ ] Optimize images (the PNGs are full-res; export web sizes / WebP).
- [ ] Add a dedicated **media-literacy** section featuring the Noise Twins.
- [ ] Add real Discord / TikTok / X links (placeholders are `href="#"`).
- [ ] Accessibility pass: focus states, reduced-motion, alt text review.
- [ ] Add `politicatnm.org` analytics + a privacy-respecting setup.

## Deployment

DNS and Cloudflare setup notes live in:

```text
DEPLOYMENT.md
```

## Civic Substrate contracts

County snapshot data contract:

```text
docs/CIVIC_SUBSTRATE_COUNTY_SNAPSHOT_API.md
```
