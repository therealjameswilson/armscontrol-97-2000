# FRUS 1993-2000, Volume VIII Assist

Static compiler-facing assister page for the planned FRUS volume:

**Foreign Relations of the United States, 1993-2000, Volume VIII, Arms Control and Nonproliferation, 1997-2000**

Official volume anchor:
<https://history.state.gov/historicaldocuments/frus1993-00v08>

## What It Includes

- Provisional compiler lanes for START/strategic stability, CTBT, ABM/NMD, fissile materials, nonproliferation regimes, regional proliferation, CBW, and CFE/conventional arms.
- Searchable/exportable declassified-document chronology, now placed first on the page with chronological, lane-grouped, and priority sort modes.
- Chapter packet cards that crosswalk each Volume VIII lane to its top chronology candidates, Presidential Daily Diary cues, pull targets, remaining gap, and copy-ready chapter dossier.
- Diary-to-document concordance linking Presidential Daily Diary calls and meetings to exact-day records, nearby public/source anchors, pull targets, and open risks.
- Document readiness board and chronology filter separating review copies, public anchors, formal public records, and pull-before-selection leads.
- Provisional document selection sequence ordering review-copy, formal-record, and pull-lead candidates with nearby public, Diary, pull, and gap context.
- Chapter coverage matrix comparing readiness buckets, Diary cues, and open gaps across every provisional lane with click-through filters.
- Source request queue that turns source pools into copyable repository/pull request packets with linked leads, library targets, and risk checks.
- Repository visit and search agenda grouping source pools, source leads, and pull-plan items into actionable workstreams by repository/institution.
- First-pass action queue that tells the compiler the next move for each lane, including Volume VII carryover, top records, source moves, and copy-ready action notes.
- Compiler briefing pack with copy-ready status, archive pull, selection, Daily Diary, and boundary/gap memos.
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
