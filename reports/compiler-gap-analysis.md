# Compiler Gap Analysis

This page treats FRUS 1993-2000, Volume VIII as a planned volume. The current data is a source map, not an official document sequence.

## Addressed Gap Actions

| Lane | Gap | Mitigation now in the page | Remaining risk |
| --- | --- | --- | --- |
| Volume control | Do not treat public anchors as a published FRUS chronology | Planned status, item level, confidence, and source type stay visible; no document numbers are assigned. | Closes only when the Office of the Historian publishes the official volume. |
| START/ABM | Pair Helsinki, Cologne, and Moscow public statements with internal decision records | START/ABM/NMD source trail now combines Clinton Library folders, Strobe FOIA records, congressional anchors, NATO consultation, and public statements. | Defense Policy, State, JCS, OVP, and intelligence attachments still need item-level pulling. |
| CTBT | Reconstruct the Senate campaign, not only the defeat | Added Treaty Doc. 105-28, S. Hrg. 106-262, Clinton Library 2015-1095-F, Public Papers anchors, and the Mamedov cable. | Vote-count, science-adviser, stockpile-stewardship, and White House liaison records still need extraction. |

## High-Risk Follow-Ups

| Lane | Need | Mitigation now in the page |
| --- | --- | --- |
| ABM/NMD | Allied consultation records for NATO/NAC reaction and technical readiness review. | Added NATO Florence consultation, NMD Act anchor, and NAC Moscow-summit State FOIA cable. |
| South Asia | Talbott diplomacy, sanctions decisions, DC/PC records, and March 2000 trip files. | Existing South Asia MDR path now sits with Public Papers anchor, on-site pull plan, and Talbott search cues. |
| DPRK | Taepo Dong, Perry process, missile moratorium, and 2000 diplomacy source paths. | Added DPRK/ROK Clinton Digital Library collection, North Korea folder lead, source pool, and library pull plan. |
| CFE | Boundary control with Europe/NATO volumes and item-level CFE adaptation records. | Added OSCE CFE.DOC/1/99 and CFE.DOC/2/99 records plus explicit boundary rule. |
| CBW | Implementation files behind CWC/BWC public statements and Russian compliance issues. | Added Elisa Harris CWC files and Helms treaty-file leads with implementation-focused ledger note. |

## Deployment and QA

| Gap | Action |
| --- | --- |
| GitHub Pages was not enabled at the repository level. | Added `.github/workflows/pages.yml` for root-level Pages deployment from `main`; repository settings may still need Pages enabled for the first run. |
| Browser download verification is unavailable in the Codex in-app browser. | CSV export code remains browser-native and syntax-checked; export columns now include mitigation and remaining-risk fields. |
| Screenshot capture timed out in the in-app browser. | DOM/runtime verification remains the reliable QA gate until Pages is live enough for an external visual pass. |

## Rule of Thumb

Public Papers items are chronology anchors. Clinton Library folder-title lists are pull requests. State FOIA PDFs are released source copies that still need duplicate and release-folder checks. Released memcons are high-value review copies, but final notes should cite the original repository and release packet.
