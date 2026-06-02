# FRUS 1993-2000, Volume VIII Assist

Static compiler-facing assister page for the planned FRUS volume:

**Foreign Relations of the United States, 1993-2000, Volume VIII, Arms Control and Nonproliferation, 1997-2000**

Official volume anchor:
<https://history.state.gov/historicaldocuments/frus1993-00v08>

## What It Includes

- Provisional compiler lanes for START/strategic stability, CTBT, ABM/NMD, fissile materials, nonproliferation regimes, regional proliferation, CBW, and CFE/conventional arms.
- Searchable/exportable declassified-document chronology, now placed first on the page with chronological, lane-grouped, and priority sort modes.
- Chapter packet cards that crosswalk each Volume VIII lane to its top chronology candidates, Presidential Daily Diary cues, pull targets, remaining gap, and copy-ready chapter dossier.
- Chapter drafting outlines tying Volume VII handoff questions to Volume VIII chronology, Diary cues, source pulls, people, and drafting risks.
- Chapter closeout board scoring each substantive chapter against sequence, review-copy, citation, Daily Diary, Volume VII handoff, people, source-route, call-slip, public-backtrace, and high-gap checks.
- Draft packet builder bundling each chapter's outline, closeout status, document run, Daily Diary anchors, source-note base, call slips, citation fixes, people/offices, and copy-ready assembly note.
- Document manuscript builder turning provisional sequence candidates into copy-ready FRUS-style working stubs with source-note fields, editorial apparatus prompts, Diary/public anchors, pull warnings, and pre-circulation cautions.
- Clearance routing matrix deriving likely equity offices, source-handling cues, citation blockers, pull holds, and copy-ready routing notes for each provisional manuscript stub.
- Circulation batch planner grouping routed manuscript stubs into chapter-lane packets with cover-memo frames, ready subsets, held records, likely equities, blockers, and copy-ready circulation notes.
- Document decision ledger recording provisional select/hold/formal-anchor judgments, rationale, proof trail, replacement triggers, and copy-ready selection notes for every sequence candidate.
- Editorial apparatus pack bundling annotation hooks, source-note checks, index terms, Daily Diary/public context, Volume VII carry-forward themes, blockers, and copy-ready apparatus handoff notes for every provisional document.
- Diary-to-document concordance linking Presidential Daily Diary calls and meetings to exact-day records, nearby public/source anchors, pull targets, and open risks.
- Document readiness board and chronology filter separating review copies, public anchors, formal public records, and pull-before-selection leads.
- Provisional document selection sequence ordering review-copy, formal-record, and pull-lead candidates with nearby public, Diary, pull, and gap context.
- Public anchor backtrace board pairing Public Papers items with nearby internal/source records, Presidential Daily Diary cues, pull targets, source leads, and gaps.
- Annotation and citation queue turning each provisional sequence candidate into copy-ready citation checks, people/date annotation targets, source routes, and remaining-risk notes.
- Chapter coverage matrix comparing readiness buckets, Diary cues, and open gaps across every provisional lane with click-through filters.
- Compiler QA checklist generated from readiness, sequence, Diary, source, handoff, people, and gap signals.
- FRUS production stage-gate board mapping the planned official status into planning, research, clearance, and publication guardrails.
- Source request queue that turns source pools into copyable repository/pull request packets with linked leads, library targets, and risk checks.
- Archive call-slip builder converting pull-plan folder targets into copy-ready repository slips with source context, on-site handling, and comparison records.
- Repository visit and search agenda grouping source pools, source leads, and pull-plan items into actionable workstreams by repository/institution.
- First-pass action queue that tells the compiler the next move for each lane, including Volume VII carryover, top records, source moves, and copy-ready action notes.
- Compiler briefing pack with copy-ready status, archive pull, selection, Daily Diary, and boundary/gap memos.
- Person and office indexing queue with copy-ready index notes, related lanes, likely records, Diary cues, and source leads.
- Copy-ready citation, diary, source-lead, pull-plan, gap, pool, and ledger notes directly from the review cards.
- Searchable/exportable source leads, Presidential Daily Diary references, Public Papers anchors, Clinton Library pull plan, gap tracker, and people roster.
- Volume VII handoff layer mapping every 1993-1996 arms-control chapter into its 1997-2000 continuation lane.
- Source-copy ledger separating public anchors, released review copies, State FOIA PDFs, and collection-only folder-title leads.
- Daily Diary call/meeting layer for Sharif, Vajpayee, Yeltsin, Putin, CTBT, DPRK/Perry, and allied Korea/Japan consultation cues.
- Gap mitigation layer for CTBT Senate records, START/ABM internal-source trails, NMD allied consultations, South Asia, DPRK, CFE boundary control, and CBW implementation.
- GitHub Pages workflow for root-level static deployment from `main`.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static server.

Validation:

```bash
node --check app.js
node --check data/volume-data.js
```

## Source Base

- Office of the Historian official volume page and status list.
- Clinton Presidential Library foreign-leader chronology, Presidential Daily Diary, MDR releases, and textual holdings guide.
- National Archives Catalog collection/series leads.
- GovInfo Public Papers of the Presidents.
- Department of State FOIA Library Strobe Talbott release records.
- Congress.gov treaty, hearing, statutory, and Senate action records.
- NATO and OSCE official consultation/treaty records.
- Clinton Digital Library DPRK, South Asia, CWC, and treaty-politics collection leads.
- Companion Volume VII assister: <https://therealjameswilson.github.io/Clinton-armscontrol-93-96/>
