# New Mexico Civic Blueprint

Status: Citizen-product blueprint and reusable state template  
Last reviewed: 2026-08-15  
Repository: `MetaLex505/politicat-nm`

## 1. What this system is

PolitíCat is the citizen-facing explanation layer for New Mexico public records. Its purpose is to help ordinary people ask a civic question, see what the available records say, understand the limits, and verify the sources themselves.

PolitíCat does not tell people what to think. It turns public evidence into maps, timelines, comparisons, plain-language explanations, and next steps while keeping uncertainty visible.

The product relationship is:

```text
Official sources create and publish authoritative records.
Civic Substrate preserves, normalizes, connects, and versions public evidence.
Coracle gives professionals deeper inspection and research tools.
PolitíCat explains selected public information to citizens.
```

The canonical foundation is documented in the [Civic Substrate Operating Model](https://github.com/Imagulate-Labs/civic-substrate/blob/feature/property-tax-stack-v1/docs/CIVIC_SUBSTRATE_OPERATING_MODEL.md). PolitíCat should not duplicate or silently redefine that architecture.

### Citizen answer model

Every meaningful answer should include:

```text
question type
plain-language answer
evidence reviewed
source dates
official sources
limitations
contradicting records found
open questions
verification links
next records to check
```

Question types remain:

- **Fact:** answer directly from structured public records.
- **Trend:** show a dated series, comparison, or change.
- **Investigation:** show the evidence trail so far and what remains unknown.
- **Accountability:** separate the fact layer from explanations and interpretations.

## 2. What this system is not

PolitíCat is not:

- the New Mexico Secretary of State, a county clerk, or an official portal;
- a voter-registration, filing, licensing, or election-management system;
- a substitute for the original record;
- an accusation, endorsement, partisan persuasion, or automated verdict;
- proof that a public dataset is complete or current;
- a way to expose protected voter, employee, business, or personal information;
- legal advice;
- a promise that a future state employee workflow has already been designed; or
- authority to change a government record.

PolitíCat may explain public records and documented connections. It must not imply wrongdoing from an address match, donation, lobbying registration, contract, geographic proximity, or other lawful public event.

## 3. What exists today

This status is based on repository evidence as of 2026-08-15 and does not claim that every source is currently refreshed or deployed.

### PolitíCat repository

- A static New Mexico civic-education website with separate home, Ask, Explore, Learn, Trail, Community, About, and Admin surfaces.
- A records-first charter and durable evidence-response model.
- An Ask PolitíCat interface that is presently described in the repository as using canned/mock answers pending a live backend.
- A Civic Substrate county-snapshot API contract.
- New Mexico map-generation tooling and citizen-oriented visual assets.
- A trust rule requiring visible source links and "verify it yourself" behavior.

### Civic Substrate support already represented

- Read-only New Mexico query functions for voter-registration totals, counties, districts, trends, federal candidates, selected campaign-finance summaries, lobbyists, and coverage.
- New Mexico collectors and models spanning business entities, notaries, trademarks, campaign finance, lobbyists, voter information, charter schools, and other public datasets.
- Evidence, provenance, fingerprinting, and historical components that can support bounded citizen answers.

### Present limits

- The citizen site and the Civic Substrate query layer are not yet one complete production service.
- Available public data is not equivalent to the state's internal operational data.
- Dataset coverage, freshness, and history vary.
- PolitíCat cannot process official transactions or inspect protected employee workflows.
- A map, story, or explanation should not be labeled live until its source contract and refresh behavior are verified.

## 4. What comes next

### New Mexico citizen tools

| Tool | Citizen question | Evidence requirement |
| --- | --- | --- |
| Simple New Mexico maps | What is happening in my county or district? | Geographic unit, source, date, coverage, and missing areas. |
| What happened near me? | Which public changes were recorded nearby? | Opt-in location, bounded radius, event sources, and no causation claim. |
| Water and data-center tracker | What projects, permits, water records, or public decisions are visible? | Agency records, dates, geography, and explicit gaps. |
| Candidate and campaign-finance explainer | Who is running and what do filings report? | Candidate, committee, transaction, cycle, and source definitions. |
| Public-contract stories | Which awards and payments are publicly recorded? | Contract, vendor, agency, amount, date, and source record. |
| Business and lobbying summaries | What do registrations and disclosures show? | Exact filing records and connection method. |
| Legislative explanations | What did a bill do and what happened to it? | Bill text, actions, votes, dates, and legislative sources. |
| Local change notices | What changed since I last checked? | Opt-in watch, prior snapshot, new snapshot, and change-only language. |

Each tool moves through four states:

1. **Source identified** — authority and access method documented.
2. **Evidence contract implemented** — Civic Substrate returns bounded, testable data.
3. **Citizen explanation tested** — plain language, accessibility, limitations, and source links reviewed.
4. **Available** — deployed with monitored freshness and failure behavior.

### New Mexico as the first complete implementation

The blueprint must always show:

- what already exists;
- what is being built;
- which datasets are available;
- which datasets are missing or stale;
- what citizens can do now;
- what professionals can do in Coracle;
- what requires official state access; and
- what a future government portal could become.

### Reusable state template

| Shared nationally | Changes by state |
| --- | --- |
| Evidence and provenance model | Agency names and responsibilities |
| Entity and address graph | Available datasets and access methods |
| Historical tracking | Election and public-records laws |
| Map and timeline patterns | Filing formats and geographic units |
| Privacy classification framework | Disclosure, retention, and redaction rules |
| Citizen answer contract | Terminology, language, and workflows |
| Source-health reporting | Refresh schedules and portal constraints |
| Product status vocabulary | State-specific rollout order |

After New Mexico is complete, Arizona or Colorado should be a new configuration of collectors, rules, terminology, and branding—not a rewritten evidence system.

### Future official New Mexico portal

A future state portal could provide one consistent public front door while backend services are replaced gradually. The safe modernization pattern is:

1. map the existing environment;
2. connect Civic Substrate read-only;
3. build replacement services beside existing systems;
4. shadow and reconcile real events;
5. migrate one service at a time; and
6. preserve complete archives and rollback paths before retiring old components.

Potential layers would include official records, Civic Substrate, authorized employee tools, and public services. Civic Substrate would need a separately designed protected transactional layer before any module could become an official system of record.

This is a future architecture, not a claim about New Mexico's internal deficiencies. Final workflows require interviews and discovery with Secretary of State staff, county clerks, records officers, election officials, vendors, security teams, and system operators.

## 5. Completion checklist

### Foundation connection

- [ ] PolitíCat consumes versioned Civic Substrate contracts rather than database internals.
- [ ] Every response includes source, date, coverage, limitations, and open questions.
- [ ] Missing or stale data renders honestly instead of producing a synthetic answer.
- [ ] Public outputs contain only fields approved for public disclosure.

### Citizen experience

- [ ] Ask PolitíCat uses live, evidence-backed answers instead of canned responses.
- [ ] Maps identify their source, geographic unit, snapshot date, and unavailable areas.
- [ ] Timelines distinguish event dates from collection dates.
- [ ] Explanations are readable without specialist knowledge.
- [ ] Every material statement has a path to the underlying evidence.
- [ ] Accessibility and Spanish-language requirements are planned and tested with New Mexico residents.

### New Mexico rollout

- [ ] Data inventory shows available, partial, blocked, stale, and missing sources.
- [ ] Voter-information tools use aggregate public data and preserve privacy boundaries.
- [ ] Campaign-finance, lobbying, business, contract, water, project, and legislative tools each have bounded source contracts.
- [ ] Local change notices are opt-in and describe changes without risk or accusation language.
- [ ] Coracle handoff exists for questions requiring professional evidence inspection.

### Replication

- [ ] State-specific configuration is separate from national evidence logic.
- [ ] Agency, county, district, filing, terminology, law, privacy, and refresh rules are configurable.
- [ ] A second-state pilot reuses the same citizen answer and evidence contracts.

### Official-portal gate

- [ ] No internal workflow is presented as fact before authorized discovery.
- [ ] No transactional replacement is attempted without legal authority, security design, recovery testing, parallel operation, staff training, accessibility review, and formal acceptance.
- [ ] Existing official services remain operational until replacements are proven and reversible.

