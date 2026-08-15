# Decision Records (mirror)

Binding decisions for the Civic Substrate → PolitíCat pipeline live in the
**civic-substrate** repo at `docs/decisions/` — that repository is the permanent
coordinator. PolitíCat NM does not fork or redefine them.

Current records (2026-08-15):

- **D-001 — Evidence vocabulary.** Every published claim carries one status from
  `VERIFIED / DEGRADED / REFUSED / UNKNOWN` plus reason codes. No scores, no
  percentages, no free-form confidence. The `confidence: exact/approximate/no_data`
  field in this site's `assets/data/voter_*.json` (and the site's "Confidence"
  badge) maps to the ladder and is replaced at the next data refresh. The county
  snapshot contract in `docs/CIVIC_SUBSTRATE_COUNTY_SNAPSHOT_API.md` predates
  D-001 and will be rewritten against it before implementation.
- **D-002 — Artifact custody.** Append-only evidence history, content-addressed
  artifacts, supersession, tombstones; custody tiers incl. images/portraits
  (metadata + source reference by default — relevant to any future "faces" work).
- **D-003 — First citizen promise.** "How is my county changing?" — one-county
  pilot, voter-registration change first, end-to-end citizen-consumable under
  D-001/D-002 before scaling.
