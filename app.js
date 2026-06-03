const data = window.VOLUME_VIII_DATA || {};
const volumeHandoff = data.volumeHandoff || [];
const lanes = data.lanes || [];
const sourceLeads = data.sourceLeads || [];
const potentialDocuments = data.potentialDocuments || [];
const diaryReferences = data.diaryReferences || [];
const publicRecords = potentialDocuments.filter((item) => item.type === "Public Papers");
const libraryPlan = data.libraryPlan || [];
const gapTracker = data.gapTracker || [];
const sourcePools = data.sourcePools || [];
const sourceCopyLedger = data.sourceCopyLedger || [];
const persons = data.persons || [];
const references = data.sources || [];

const laneById = new Map(lanes.map((lane) => [lane.id, lane]));
const laneOrder = new Map(lanes.map((lane, index) => [lane.id, index]));
const priorityRank = new Map([
  ["Anchor", 1],
  ["Critical", 1],
  ["A", 1],
  ["High", 2],
  ["B", 2],
  ["Medium", 3],
  ["C", 3],
  ["Low", 4]
]);
const readinessBuckets = [
  {
    id: "review-copy",
    label: "Review copy",
    title: "Review-Copy Candidates",
    description: "Released memcons and State FOIA records with substantive text ready for close comparison against the source file.",
    empty: "No released review-copy candidates mapped yet."
  },
  {
    id: "public-anchor",
    label: "Public anchor",
    title: "Public Statement Anchors",
    description: "Public Papers items that fix public chronology and presidential framing, but should be paired with internal files before final selection.",
    empty: "No public anchors mapped yet."
  },
  {
    id: "formal-record",
    label: "Formal public record",
    title: "Treaty, Hearing, and Multilateral Records",
    description: "Congressional, NATO, and OSCE records that establish formal action, testimony, or treaty text for the editorial frame.",
    empty: "No formal public records mapped yet."
  },
  {
    id: "pull-lead",
    label: "Pull lead",
    title: "Pull Before Selection",
    description: "MDR and Clinton Digital Library source-path leads that should guide folder requests before being treated as documents.",
    empty: "No pull leads mapped yet."
  }
];
const readinessById = new Map(readinessBuckets.map((bucket) => [bucket.id, bucket]));

const state = {
  documents: { query: "", lane: "", type: "", priority: "", readiness: "", sort: "" },
  leads: { query: "", lane: "", institution: "", priority: "" },
  diary: { query: "", lane: "", year: "", eventType: "" },
  public: { query: "", year: "", lane: "" },
  library: { query: "", lane: "", priority: "" },
  gaps: { query: "", lane: "", priority: "", status: "" },
  people: { query: "", lane: "" }
};

const documentViewParams = {
  query: "docq",
  lane: "doclane",
  type: "doctype",
  priority: "docpriority",
  readiness: "docready",
  sort: "docsort"
};

const nodes = {
  stats: {
    documents: document.querySelector("#stat-documents"),
    public: document.querySelector("#stat-public"),
    leads: document.querySelector("#stat-leads"),
    gaps: document.querySelector("#stat-gaps"),
    people: document.querySelector("#stat-people"),
    pages: document.querySelector("#stat-pages")
  },
  workbenchRoot: document.querySelector("#workbench-root"),
  lanesRoot: document.querySelector("#lanes-root"),
  handoffRoot: document.querySelector("#handoff-root"),
  packetsRoot: document.querySelector("#packets-root"),
  outlinesRoot: document.querySelector("#outlines-root"),
  closeoutRoot: document.querySelector("#closeout-root"),
  assemblyRoot: document.querySelector("#assembly-root"),
  manuscriptsRoot: document.querySelector("#manuscripts-root"),
  clearanceRoot: document.querySelector("#clearance-root"),
  circulationRoot: document.querySelector("#circulation-root"),
  decisionsRoot: document.querySelector("#decisions-root"),
  apparatusRoot: document.querySelector("#apparatus-root"),
  concordanceRoot: document.querySelector("#concordance-root"),
  selectionRoot: document.querySelector("#selection-root"),
  sequenceRoot: document.querySelector("#sequence-root"),
  backtraceRoot: document.querySelector("#backtrace-root"),
  annotationsRoot: document.querySelector("#annotations-root"),
  coverageRoot: document.querySelector("#coverage-root"),
  qaRoot: document.querySelector("#qa-root"),
  stageGatesRoot: document.querySelector("#stage-gates-root"),
  requestsRoot: document.querySelector("#requests-root"),
  callSlipsRoot: document.querySelector("#call-slips-root"),
  agendaRoot: document.querySelector("#agenda-root"),
  actionsRoot: document.querySelector("#actions-root"),
  briefsRoot: document.querySelector("#briefs-root"),
  indexingRoot: document.querySelector("#indexing-root"),
  documentsRoot: document.querySelector("#documents-root"),
  documentSummary: document.querySelector("#document-summary"),
  documentSearch: document.querySelector("#document-search"),
  documentLaneFilter: document.querySelector("#document-lane-filter"),
  documentTypeFilter: document.querySelector("#document-type-filter"),
  documentPriorityFilter: document.querySelector("#document-priority-filter"),
  documentReadinessFilter: document.querySelector("#document-readiness-filter"),
  documentSort: document.querySelector("#document-sort"),
  clearDocumentFilters: document.querySelector("#clear-document-filters"),
  exportDocuments: document.querySelector("#export-documents"),
  copyDocuments: document.querySelector("#copy-documents"),
  downloadDocuments: document.querySelector("#download-documents"),
  copyDocumentView: document.querySelector("#copy-document-view"),
  copyOutlines: document.querySelector("#copy-outlines"),
  copyCloseout: document.querySelector("#copy-closeout"),
  copyAssembly: document.querySelector("#copy-assembly"),
  copyManuscripts: document.querySelector("#copy-manuscripts"),
  copyClearance: document.querySelector("#copy-clearance"),
  copyCirculation: document.querySelector("#copy-circulation"),
  copyDecisions: document.querySelector("#copy-decisions"),
  copyApparatus: document.querySelector("#copy-apparatus"),
  copySequence: document.querySelector("#copy-sequence"),
  copyBacktrace: document.querySelector("#copy-backtrace"),
  copyAnnotations: document.querySelector("#copy-annotations"),
  copyQa: document.querySelector("#copy-qa"),
  copyStageGates: document.querySelector("#copy-stage-gates"),
  copyCallSlips: document.querySelector("#copy-call-slips"),
  copyIndexing: document.querySelector("#copy-indexing"),
  leadsRoot: document.querySelector("#leads-root"),
  leadSummary: document.querySelector("#lead-summary"),
  leadSearch: document.querySelector("#lead-search"),
  leadLaneFilter: document.querySelector("#lead-lane-filter"),
  leadInstitutionFilter: document.querySelector("#lead-institution-filter"),
  leadPriorityFilter: document.querySelector("#lead-priority-filter"),
  clearLeadFilters: document.querySelector("#clear-lead-filters"),
  exportLeads: document.querySelector("#export-leads"),
  diaryRoot: document.querySelector("#diary-root"),
  diarySummary: document.querySelector("#diary-summary"),
  diarySearch: document.querySelector("#diary-search"),
  diaryLaneFilter: document.querySelector("#diary-lane-filter"),
  diaryYearFilter: document.querySelector("#diary-year-filter"),
  diaryEventFilter: document.querySelector("#diary-event-filter"),
  clearDiaryFilters: document.querySelector("#clear-diary-filters"),
  exportDiary: document.querySelector("#export-diary"),
  publicRoot: document.querySelector("#public-root"),
  publicSummary: document.querySelector("#public-summary"),
  publicSearch: document.querySelector("#public-search"),
  publicYearFilter: document.querySelector("#public-year-filter"),
  publicLaneFilter: document.querySelector("#public-lane-filter"),
  clearPublicFilters: document.querySelector("#clear-public-filters"),
  exportPublic: document.querySelector("#export-public"),
  libraryRoot: document.querySelector("#library-root"),
  librarySummary: document.querySelector("#library-summary"),
  librarySearch: document.querySelector("#library-search"),
  libraryLaneFilter: document.querySelector("#library-lane-filter"),
  libraryPriorityFilter: document.querySelector("#library-priority-filter"),
  clearLibraryFilters: document.querySelector("#clear-library-filters"),
  exportLibrary: document.querySelector("#export-library"),
  gapsRoot: document.querySelector("#gaps-root"),
  gapSummary: document.querySelector("#gap-summary"),
  gapSearch: document.querySelector("#gap-search"),
  gapLaneFilter: document.querySelector("#gap-lane-filter"),
  gapPriorityFilter: document.querySelector("#gap-priority-filter"),
  gapStatusFilter: document.querySelector("#gap-status-filter"),
  clearGapFilters: document.querySelector("#clear-gap-filters"),
  exportGaps: document.querySelector("#export-gaps"),
  sourcePoolsRoot: document.querySelector("#source-pools-root"),
  ledgerRoot: document.querySelector("#ledger-root"),
  peopleRoot: document.querySelector("#people-root"),
  personSummary: document.querySelector("#person-summary"),
  personSearch: document.querySelector("#person-search"),
  personLaneFilter: document.querySelector("#person-lane-filter"),
  clearPersonFilters: document.querySelector("#clear-person-filters"),
  exportPeople: document.querySelector("#export-people"),
  referencesRoot: document.querySelector("#references-root"),
  copyStatus: document.querySelector("#copy-status")
};

let copyStatusTimer;
let requestHighlightTimer;

function laneTitle(laneId) {
  return laneById.get(laneId)?.title || "Unassigned";
}

function laneNumber(laneId) {
  return laneById.get(laneId)?.number || "Lane";
}

function laneList(laneIds = []) {
  return laneIds.map((laneId) => laneTitle(laneId)).filter(Boolean).join("; ");
}

function byLaneThenDate(a, b) {
  return (
    (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) ||
    (a.date || "").localeCompare(b.date || "") ||
    (b.score || 0) - (a.score || 0) ||
    (a.title || "").localeCompare(b.title || "")
  );
}

function byDateThenLane(a, b) {
  return (
    (a.date || "").localeCompare(b.date || "") ||
    (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) ||
    (b.score || 0) - (a.score || 0) ||
    (a.title || "").localeCompare(b.title || "")
  );
}

function byPriorityThenDate(a, b) {
  return (
    priorityValue(a.priority) - priorityValue(b.priority) ||
    (a.date || "").localeCompare(b.date || "") ||
    (b.score || 0) - (a.score || 0) ||
    (a.title || "").localeCompare(b.title || "")
  );
}

function priorityValue(value) {
  return priorityRank.get(value) || 99;
}

function documentReadiness(item) {
  if (/released memcon|state foia/i.test(item.type || "")) return "review-copy";
  if (item.type === "Public Papers") return "public-anchor";
  if (/congressional|nato|osce/i.test(item.type || "")) return "formal-record";
  if (/source path|mdr/i.test(`${item.type} ${item.level}`)) return "pull-lead";
  return "review";
}

function readinessLabel(id) {
  return readinessById.get(id)?.label || "Review";
}

function readinessCounts(items) {
  return Object.fromEntries(readinessBuckets.map((bucket) => [bucket.id, items.filter((item) => documentReadiness(item) === bucket.id).length]));
}

function handoffsForLane(laneId) {
  return volumeHandoff.filter((handoff) => (handoff.volumeViiiLaneIds || []).includes(laneId));
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function addOptions(select, values, label) {
  if (!select) return;
  select.replaceChildren(new Option(label, ""), ...values.map((value) => new Option(value, value)));
}

function plural(count, singular, pluralValue = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralValue}`;
}

function formatDate(value) {
  if (!value) return "Undated";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function getYear(value) {
  return /^\d{4}/.test(value || "") ? value.slice(0, 4) : "";
}

function dateValue(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  return new Date(`${value}T00:00:00Z`);
}

function dayDistance(a, b) {
  const first = dateValue(a);
  const second = dateValue(b);
  if (!first || !second) return Number.POSITIVE_INFINITY;
  return Math.abs(first - second) / 86400000;
}

function textSpan(value) {
  const span = document.createElement("span");
  span.textContent = value;
  return span;
}

function linkButton(label, href, className = "link-button") {
  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = href;
  anchor.rel = "noreferrer";
  anchor.target = "_blank";
  anchor.textContent = label;
  return anchor;
}

function clipboardButton(label, text, message = "Copied") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "link-button";
  button.textContent = label;
  button.addEventListener("click", () => copyText(text, message));
  return button;
}

async function copyText(text, message) {
  window.__lastCopiedText = text;
  document.documentElement.dataset.lastCopiedText = text;
  document.documentElement.dataset.lastCopiedMessage = message;
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
    showCopyStatus(message);
  } catch {
    fallbackCopyText(text);
    showCopyStatus(message);
  }
}

function fallbackCopyText(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.append(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function showCopyStatus(message) {
  if (!nodes.copyStatus) return;
  nodes.copyStatus.textContent = message;
  nodes.copyStatus.dataset.visible = "true";
  clearTimeout(copyStatusTimer);
  copyStatusTimer = setTimeout(() => {
    if (nodes.copyStatus) nodes.copyStatus.dataset.visible = "false";
  }, 2200);
}

function noteLines(lines) {
  return lines.filter((line) => line || line === 0).map((line) => line.toString()).join("\n");
}

function documentNote(item) {
  return noteLines([
    `${formatDate(item.date)} - ${item.title}`,
    `Lane: ${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}`,
    `Type: ${item.type}`,
    `Readiness: ${readinessLabel(documentReadiness(item))}`,
    item.priority ? `Priority: ${item.priority}` : "",
    item.repository ? `Repository: ${item.repository}` : "",
    item.collection ? `Collection: ${item.collection}` : "",
    item.identifier ? `Identifier: ${item.identifier}` : "",
    item.pages ? `Pages: ${item.pages}` : "",
    item.summary ? `Summary: ${item.summary}` : "",
    item.sourceNote ? `Source note: ${item.sourceNote}` : "",
    item.url ? `Source URL: ${item.url}` : "",
    item.pdfUrl ? `Review PDF: ${item.pdfUrl}` : ""
  ]);
}

function chronologyHandoffNote(items) {
  const readinessSummary = readinessBuckets
    .map((bucket) => `${bucket.label}: ${items.filter((item) => documentReadiness(item) === bucket.id).length}`)
    .join("; ");
  const laneSummary = lanes
    .map((lane) => {
      const count = items.filter((item) => item.laneId === lane.id).length;
      return count ? `${lane.number} ${lane.title}: ${count}` : "";
    })
    .filter(Boolean)
    .join("; ");
  return noteLines([
    "Chronology of Declassified Documents - compiler handoff",
    `Visible records: ${items.length} of ${potentialDocuments.length}`,
    `Active filters: ${documentFilterSummary()}`,
    `Sort: ${documentSortLabel()}`,
    `Readiness: ${readinessSummary}`,
    laneSummary ? `Lanes: ${laneSummary}` : "Lanes: none visible",
    "Compiler moves:",
    ...chronologyHandoffMoves(items).map((move) => `- ${move}`),
    items.length ? "Visible chronology:" : "Visible chronology: no records match the current filters",
    ...items.map((item, index) => chronologyHandoffRecord(index + 1, item)),
    "Compiler check: use this as a working chronology handoff only; final FRUS selection still requires source-copy verification, citation review, clearance, and Office of the Historian reconciliation."
  ]);
}

function documentFilterSummary() {
  return [
    state.documents.query ? `search "${state.documents.query}"` : null,
    state.documents.lane ? `${laneNumber(state.documents.lane)} / ${laneTitle(state.documents.lane)}` : null,
    state.documents.type ? `type ${state.documents.type}` : null,
    state.documents.priority ? `priority ${state.documents.priority}` : null,
    state.documents.readiness ? `readiness ${readinessLabel(state.documents.readiness)}` : null
  ].filter(Boolean).join("; ") || "none";
}

function documentSortLabel() {
  const labels = {
    lane: "Lane grouped",
    priority: "Priority first"
  };
  return labels[state.documents.sort] || "Chronological";
}

function applyDocumentViewFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get(documentViewParams.query) || "";
  const lane = validSelectValue(nodes.documentLaneFilter, params.get(documentViewParams.lane) || "");
  const type = validSelectValue(nodes.documentTypeFilter, params.get(documentViewParams.type) || "");
  const priority = validSelectValue(nodes.documentPriorityFilter, params.get(documentViewParams.priority) || "");
  const readiness = validSelectValue(nodes.documentReadinessFilter, params.get(documentViewParams.readiness) || "");
  const sort = ["lane", "priority"].includes(params.get(documentViewParams.sort)) ? params.get(documentViewParams.sort) : "";

  state.documents = { query, lane, type, priority, readiness, sort };
  if (nodes.documentSearch) nodes.documentSearch.value = query;
  if (nodes.documentLaneFilter) nodes.documentLaneFilter.value = lane;
  if (nodes.documentTypeFilter) nodes.documentTypeFilter.value = type;
  if (nodes.documentPriorityFilter) nodes.documentPriorityFilter.value = priority;
  if (nodes.documentReadinessFilter) nodes.documentReadinessFilter.value = readiness;
  if (nodes.documentSort) nodes.documentSort.value = sort;
}

function validSelectValue(select, value) {
  if (!value) return "";
  if (!select) return "";
  return [...select.options].some((option) => option.value === value) ? value : "";
}

function documentViewUrl() {
  const url = new URL(window.location.href);
  for (const param of Object.values(documentViewParams)) url.searchParams.delete(param);
  const active = {
    [documentViewParams.query]: state.documents.query,
    [documentViewParams.lane]: state.documents.lane,
    [documentViewParams.type]: state.documents.type,
    [documentViewParams.priority]: state.documents.priority,
    [documentViewParams.readiness]: state.documents.readiness,
    [documentViewParams.sort]: state.documents.sort
  };
  for (const [param, value] of Object.entries(active)) {
    if (value) url.searchParams.set(param, value);
  }
  url.hash = "documents";
  return url.toString();
}

function chronologyHandoffMoves(items) {
  const counts = readinessCounts(items);
  return [
    counts["review-copy"] ? `${plural(counts["review-copy"], "review-copy record")} can be compared against source notes and provisional sequence decisions.` : "",
    counts["public-anchor"] ? `${plural(counts["public-anchor"], "public anchor")} should be backtraced to internal memoranda, briefing papers, cables, or Diary cues before final selection.` : "",
    counts["formal-record"] ? `${plural(counts["formal-record"], "formal record")} can anchor treaty, hearing, NATO, OSCE, or statutory chronology while internal records are pulled.` : "",
    counts["pull-lead"] ? `${plural(counts["pull-lead"], "pull lead")} still require item-level source text, page spans, and release-status verification.` : "",
    items.some((item) => diaryReferences.some((entry) => entry.laneId === item.laneId && dayDistance(entry.date, item.date) <= 21))
      ? "Use the Diary-to-Document Concordance for same-day and nearby Presidential Daily Diary calls/meetings."
      : "",
    items.some((item) => handoffsForLane(item.laneId).length)
      ? "Check Volume VII carry-forward notes before treating any 1997-2000 record as a new standalone chapter problem."
      : ""
  ].filter(Boolean);
}

function chronologyHandoffRecord(number, item) {
  const source = [item.repository, item.collection, item.identifier].filter(Boolean).join("; ") || item.level || item.sourceNote || "source path pending";
  const pages = item.pages || item.pageCount ? ` / ${item.pages || item.pageCount} pages` : "";
  const urls = [item.url ? `source ${item.url}` : "", item.pdfUrl ? `PDF ${item.pdfUrl}` : ""].filter(Boolean).join(" / ");
  return [
    `${number}. ${formatDate(item.date)} / ${laneNumber(item.laneId)} / ${readinessLabel(documentReadiness(item))} / ${item.priority || "priority pending"} / ${item.title}`,
    `   Source: ${source}${pages}`,
    item.summary ? `   Use: ${item.summary}` : "",
    urls ? `   Links: ${urls}` : ""
  ].filter(Boolean).join("\n");
}

function chronologyHandoffFilename() {
  const filters = [
    state.documents.query,
    state.documents.lane,
    state.documents.type,
    state.documents.priority,
    state.documents.readiness,
    state.documents.sort
  ]
    .filter(Boolean)
    .map(slugPart)
    .join("-");
  return `volume-viii-chronology-handoff${filters ? `-${filters}` : ""}.txt`;
}

function slugPart(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function leadNote(lead) {
  return noteLines([
    `${lead.title}`,
    `Lane: ${laneNumber(lead.laneId)} / ${laneTitle(lead.laneId)}`,
    lead.priority ? `Priority: ${lead.priority}` : "",
    lead.institution ? `Institution: ${lead.institution}` : "",
    lead.type ? `Type: ${lead.type}` : "",
    lead.identifier ? `Identifier: ${lead.identifier}` : "",
    lead.note ? `Note: ${lead.note}` : "",
    lead.url ? `URL: ${lead.url}` : ""
  ]);
}

function diaryNote(entry) {
  return noteLines([
    `${formatDate(entry.date)} - ${entry.title}`,
    `Lane: ${laneNumber(entry.laneId)} / ${laneTitle(entry.laneId)}`,
    entry.eventType ? `Event: ${entry.eventType}` : "",
    entry.time ? `Time: ${entry.time}` : "",
    entry.location ? `Location: ${entry.location}` : "",
    entry.diaryEntry ? `Diary entry: ${entry.diaryEntry}` : "",
    entry.volumeConnection ? `Volume connection: ${entry.volumeConnection}` : "",
    entry.pdfPacket ? `Packet: ${entry.pdfPacket}` : "",
    entry.url ? `Catalog URL: ${entry.url}` : "",
    entry.pdfUrl ? `PDF: ${entry.pdfUrl}` : ""
  ]);
}

function concordanceNote(entry, matches) {
  return noteLines([
    diaryNote(entry),
    matches.exact.length ? `Exact-day records: ${matches.exact.map((item) => item.title).join("; ")}` : "",
    matches.nearby.length
      ? `Nearby records: ${matches.nearby.map((item) => `${formatDate(item.date)} - ${item.title}`).join("; ")}`
      : "",
    matches.pull ? `Pull target: ${matches.pull.title}` : "",
    matches.gap ? `Open risk: ${matches.gap.title}` : ""
  ]);
}

function libraryNote(item) {
  return noteLines([
    `${item.title}`,
    `Lane: ${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}`,
    item.priority ? `Priority: ${item.priority}` : "",
    item.office ? `Office: ${item.office}` : "",
    item.sourcePart ? `Source part: ${item.sourcePart}` : "",
    item.targetFolders?.length ? `Target folders: ${item.targetFolders.join("; ")}` : "",
    item.visitGoal ? `Visit goal: ${item.visitGoal}` : "",
    item.whyItMatters ? `Why it matters: ${item.whyItMatters}` : "",
    item.onsiteActions?.length ? `On-site actions: ${item.onsiteActions.join("; ")}` : ""
  ]);
}

function gapNote(gap) {
  return noteLines([
    `${gap.title}`,
    `Lane: ${laneNumber(gap.laneId)} / ${laneTitle(gap.laneId)}`,
    gap.priority ? `Priority: ${gap.priority}` : "",
    gap.status ? `Status: ${gap.status}` : "",
    gap.evidence ? `Evidence: ${gap.evidence}` : "",
    gap.problem ? `Problem: ${gap.problem}` : "",
    gap.needed ? `Needed: ${gap.needed}` : "",
    gap.resolution ? `Resolution: ${gap.resolution}` : "",
    gap.remainingRisk ? `Remaining risk: ${gap.remainingRisk}` : "",
    gap.nextActions?.length ? `Next actions: ${gap.nextActions.join("; ")}` : ""
  ]);
}

function sourcePoolNote(pool) {
  return noteLines([
    `${pool.title}`,
    `Lane: ${laneNumber(pool.laneId)} / ${laneTitle(pool.laneId)}`,
    pool.priority ? `Priority: ${pool.priority}` : "",
    pool.institution ? `Institution: ${pool.institution}` : "",
    pool.coverage ? `Coverage: ${pool.coverage}` : "",
    pool.nextUse ? `Next use: ${pool.nextUse}` : "",
    pool.url ? `URL: ${pool.url}` : ""
  ]);
}

function sourceRequestNote(pool, leads, pulls, gaps) {
  return noteLines([
    `Priority ${pool.priority} / ${pool.title}`,
    pool.institution ? `Institution: ${pool.institution}` : "",
    `Lane: ${laneNumber(pool.laneId)} / ${laneTitle(pool.laneId)}`,
    pool.coverage ? `Coverage: ${pool.coverage}` : "",
    pool.nextUse ? `Next use: ${pool.nextUse}` : "",
    leads.length
      ? `Source leads: ${leads.map((lead) => `${lead.title} (${lead.identifier || lead.institution || "no identifier"})`).join("; ")}`
      : "",
    pulls.length
      ? `Pull targets: ${pulls.map((pull) => `${pull.title}: ${pull.visitGoal || pull.sourcePart || ""}`).join("; ")}`
      : "",
    gaps.length
      ? `Risk check: ${gaps.map((gap) => `${gap.priority} ${gap.title}: ${gap.remainingRisk || gap.needed || gap.problem}`).join("; ")}`
      : "",
    pool.url ? `URL: ${pool.url}` : ""
  ]);
}

function ledgerNote(entry) {
  return noteLines([
    `${entry.title}`,
    `Lane: ${laneNumber(entry.laneId)} / ${laneTitle(entry.laneId)}`,
    entry.status ? `Status: ${entry.status}` : "",
    entry.sourceClass ? `Source class: ${entry.sourceClass}` : "",
    entry.repositoryTrail ? `Repository trail: ${entry.repositoryTrail}` : "",
    entry.reviewCue ? `Review cue: ${entry.reviewCue}` : ""
  ]);
}

function textForSearch(item) {
  return [
    item.id,
    item.title,
    item.priorChapter,
    item.priorChapterId,
    item.name,
    item.role,
    item.office,
    item.institution,
    item.repository,
    item.collection,
    item.identifier,
    item.type,
    item.priority,
    readinessLabel(documentReadiness(item)),
    item.status,
    item.sourceClass,
    item.eventType,
    item.time,
    item.location,
    item.diaryEntry,
    item.volumeConnection,
    item.laneId,
    laneTitle(item.laneId),
    item.summary,
    item.note,
    item.sourceNote,
    item.continuity,
    item.newQuestion,
    item.sourceAction,
    item.resolution,
    item.remainingRisk,
    item.problem,
    item.evidence,
    item.needed,
    item.visitGoal,
    item.whyItMatters,
    item.coverage,
    item.nextUse,
    item.repositoryTrail,
    item.reviewCue,
    item.pdfPacket,
    (item.tags || []).join(" "),
    (item.topics || []).join(" "),
    (item.targetFolders || []).join(" "),
    (item.onsiteActions || []).join(" "),
    (item.nextActions || []).join(" "),
    (item.laneIds || []).map(laneTitle).join(" "),
    (item.volumeViiiLaneIds || []).map(laneTitle).join(" ")
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesQuery(item, query) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
  if (!terms.length) return true;
  const haystack = textForSearch(item);
  return terms.every((term) => haystack.includes(term));
}

function emptyMessage(message) {
  const paragraph = document.createElement("p");
  paragraph.className = "empty";
  paragraph.textContent = message;
  return paragraph;
}

function renderList(root, items, renderItem, emptyText) {
  if (!root) return;
  root.replaceChildren(...items.map(renderItem));
  if (!items.length) root.replaceChildren(emptyMessage(emptyText));
}

function setStats() {
  const pages = potentialDocuments.reduce((sum, item) => sum + (item.pageCount || 0), 0);
  nodes.stats.documents.textContent = potentialDocuments.length.toString();
  nodes.stats.public.textContent = publicRecords.length.toString();
  nodes.stats.leads.textContent = sourceLeads.length.toString();
  nodes.stats.gaps.textContent = gapTracker.length.toString();
  nodes.stats.people.textContent = persons.length.toString();
  nodes.stats.pages.textContent = pages.toString();
}

function renderWorkbench() {
  const releasedItems = potentialDocuments.filter((item) => /released|memcon|cable/i.test(`${item.type} ${item.level}`));
  const publicOnly = publicRecords.length;
  const highDiaryHits = diaryReferences.filter((entry) => entry.priority === "High");
  const critical = gapTracker.filter((gap) => gap.priority === "Critical");
  const highSourcePools = sourcePools.filter((pool) => pool.priority === "A");
  const lanesWithDocs = uniqueSorted(potentialDocuments.map((item) => item.laneId)).length;
  const cards = [
    metricCard("Planned official status", data.meta?.status || "Planned", "The page preserves source-map logic until the Office of the Historian publishes official document numbers."),
    metricCard("Item-level candidates", releasedItems.length, `${plural(publicOnly, "public anchor")} stay separate from released memcons, cables, and packet leads.`),
    metricCard("Lanes represented", lanesWithDocs, `${lanes.length} provisional lanes keep boundary cases visible.`),
    metricCard("Volume VII handoffs", volumeHandoff.length, "Every 1993-1996 chapter now has an explicit continuation path into the 1997-2000 lanes."),
    metricCard("Daily Diary hits", highDiaryHits.length, `${plural(diaryReferences.length, "call/meeting reference")} from the Presidential Daily Diary now tie calendar evidence to the volume lanes.`),
    metricCard("Priority source pools", highSourcePools.length, "Clinton Library, State FOIA, GovInfo, and NARA trails are kept as separate intake lanes."),
    metricCard("Critical mitigations", critical.length, "Each critical risk now has a visible source trail, mitigation note, and remaining-risk statement.")
  ];
  nodes.workbenchRoot.replaceChildren(...cards);
}

function metricCard(label, value, detail) {
  const card = document.createElement("article");
  card.className = "metric-card";
  const strong = document.createElement("strong");
  strong.textContent = value.toString();
  const span = document.createElement("span");
  span.textContent = label;
  const paragraph = document.createElement("p");
  paragraph.textContent = detail;
  card.append(strong, span, paragraph);
  return card;
}

function renderLanes() {
  renderList(
    nodes.lanesRoot,
    lanes,
    (lane) => {
      const docs = potentialDocuments.filter((item) => item.laneId === lane.id);
      const leads = sourceLeads.filter((item) => item.laneId === lane.id);
      const diary = diaryReferences.filter((item) => item.laneId === lane.id);
      const gaps = gapTracker.filter((item) => item.laneId === lane.id);
      const card = document.createElement("a");
      card.className = "lane-card";
      card.href = "#documents";
      card.dataset.lane = lane.id;

      const meta = document.createElement("p");
      meta.className = "lane-number";
      meta.textContent = `${lane.number} / ${lane.status}`;
      const title = document.createElement("h3");
      title.textContent = lane.title;
      const count = document.createElement("p");
      count.className = "lane-count";
      count.textContent = `${plural(docs.length, "candidate")} / ${plural(leads.length, "source lead")} / ${plural(diary.length, "diary hit")} / ${plural(gaps.length, "gap")}`;
      const summary = document.createElement("p");
      summary.textContent = lane.summary;
      const tags = tagList(lane.topics || []);
      const action = document.createElement("span");
      action.className = "card-action";
      action.textContent = "Filter chronology";

      card.append(meta, title, count, summary, tags, action);
      card.addEventListener("click", () => {
        state.documents.lane = lane.id;
        nodes.documentLaneFilter.value = lane.id;
        renderDocuments();
      });
      return card;
    },
    "No lanes loaded."
  );
}

function renderHandoff() {
  renderList(
    nodes.handoffRoot,
    volumeHandoff,
    (handoff) => {
      const card = document.createElement("article");
      card.className = "handoff-card";
      const meta = document.createElement("div");
      meta.className = "record-meta";
      meta.append(textSpan("Volume VII"), textSpan(handoff.priorChapter), textSpan(laneList(handoff.volumeViiiLaneIds)));
      const title = document.createElement("h3");
      title.textContent = `${handoff.priorChapter} continues here`;
      const continuity = document.createElement("p");
      continuity.textContent = handoff.continuity;
      const question = document.createElement("p");
      question.className = "handoff-question";
      question.textContent = handoff.newQuestion;
      const action = document.createElement("p");
      action.className = "source-note";
      action.textContent = handoff.sourceAction;
      card.append(meta, title, continuity, question, action, tagList(handoff.tags || []));
      return card;
    },
    "No Volume VII handoff records loaded."
  );
}

function renderPackets() {
  renderList(nodes.packetsRoot, lanes, packetCard, "No chapter packets loaded.");
}

function packetCard(lane) {
  const documents = potentialDocuments.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const diary = diaryReferences.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const leads = sourceLeads.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const pulls = libraryPlan
    .filter((item) => item.laneId === lane.id)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
  const gaps = gapTracker
    .filter((item) => item.laneId === lane.id)
    .sort(
      (a, b) =>
        priorityValue(a.priority) - priorityValue(b.priority) ||
        (a.status || "").localeCompare(b.status || "") ||
        a.title.localeCompare(b.title)
    );

  const card = document.createElement("article");
  card.className = "packet-card";

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(lane.number), textSpan(lane.status));

  const title = document.createElement("h3");
  title.textContent = lane.title;

  const summary = document.createElement("p");
  summary.textContent = lane.summary;

  const details = document.createElement("dl");
  details.className = "detail-grid packet-metrics";
  addDetail(details, "Records", documents.length);
  addDetail(details, "Diary", diary.length);
  addDetail(details, "Leads", leads.length);
  addDetail(details, "Gaps", gaps.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Chronology", () => showLaneDocuments(lane.id)));
  if (diary.length) actions.append(packetActionButton("Diary", () => showLaneDiary(lane.id)));
  if (pulls.length) actions.append(packetActionButton("Library", () => showLaneLibrary(lane.id)));
  if (gaps.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(lane.id)));
  actions.append(clipboardButton("Copy dossier", chapterDossierNote(lane, documents, diary, leads, pulls, gaps), "Dossier copied"));

  card.append(
    meta,
    title,
    summary,
    details,
    packetBlock(
      "Ready records",
      packetList(
        documents.slice(0, 3),
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${item.type} / ${item.priority}`,
        "No candidate records mapped yet."
      )
    ),
    packetBlock(
      "Calendar cues",
      packetList(
        diary.slice(0, 2),
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${item.eventType} / ${item.time || "time not listed"}`,
        "No Daily Diary cue mapped yet."
      )
    ),
    packetBlock(
      "Pull next",
      packetList(
        [...pulls.slice(0, 1), ...leads.slice(0, 1)].slice(0, 2),
        (item) => item.title,
        (item) => item.visitGoal || item.note || item.identifier || item.institution,
        "No pull target mapped yet."
      )
    ),
    packetBlock(
      "Watch gap",
      packetList(
        gaps.slice(0, 1),
        (item) => item.title,
        (item) => item.remainingRisk || item.needed || item.problem,
        "No open gap mapped yet."
      )
    ),
    actions
  );

  return card;
}

function chapterDossierNote(lane, documents, diary, leads, pulls, gaps) {
  const handoffs = handoffsForLane(lane.id);
  const sequence = selectionSequenceItems().filter((entry) => entry.item.laneId === lane.id);
  const pools = sourcePools
    .filter((pool) => pool.laneId === lane.id)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
  const people = persons
    .filter((person) => (person.laneIds || []).includes(lane.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  const counts = readinessCounts(documents);

  return noteLines([
    `${lane.number} / ${lane.title}`,
    `Status: ${lane.status}`,
    `Summary: ${lane.summary}`,
    `Readiness: ${counts["review-copy"]} review-copy; ${counts["public-anchor"]} public-anchor; ${counts["formal-record"]} formal-record; ${counts["pull-lead"]} pull-lead`,
    handoffs.length ? "Volume VII carryover:" : "",
    ...handoffs.map((handoff) => `- ${handoff.priorChapter}: ${handoff.newQuestion} Source action: ${handoff.sourceAction}`),
    sequence.length ? "Selection sequence:" : "",
    ...sequence.slice(0, 8).map((entry) => `- ${entry.number}. ${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.title}`),
    documents.length ? "Top chronology candidates:" : "",
    ...documents.slice(0, 8).map((item) => `- ${formatDate(item.date)} / ${readinessLabel(documentReadiness(item))} / ${item.title} / ${item.repository || item.collection || item.type}`),
    diary.length ? "Presidential Daily Diary cues:" : "",
    ...diary.slice(0, 6).map((entry) => `- ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${entry.title}: ${entry.volumeConnection}`),
    pulls.length ? "Library pull targets:" : "",
    ...pulls.slice(0, 6).map((pull) => `- ${pull.title}: ${pull.visitGoal || pull.sourcePart || pull.whyItMatters}`),
    leads.length ? "Source leads:" : "",
    ...leads.slice(0, 8).map((lead) => `- ${lead.title} (${lead.institution}): ${lead.note || lead.identifier || lead.type}${lead.url ? ` URL: ${lead.url}` : ""}`),
    pools.length ? "Request pools:" : "",
    ...pools.map((pool) => `- ${pool.title} (${pool.institution}): ${pool.coverage}; next use: ${pool.nextUse}${pool.url ? ` URL: ${pool.url}` : ""}`),
    gaps.length ? "Open risks and next actions:" : "",
    ...gaps.map((gap) => `- [${gap.priority}] ${gap.title}: ${gap.remainingRisk || gap.needed || gap.problem} Next: ${(gap.nextActions || []).join("; ")}`),
    people.length ? "People and offices:" : "",
    ...people.slice(0, 10).map((person) => `- ${person.name}: ${person.role}. ${person.note}`)
  ]);
}

function renderChapterOutlines() {
  renderList(nodes.outlinesRoot, chapterOutlineItems(), chapterOutlineCard, "No chapter outlines loaded.");
}

function chapterOutlineItems() {
  return lanes
    .filter((lane) => lane.id !== "volume-control")
    .map((lane) => {
      const documents = potentialDocuments.filter((item) => item.laneId === lane.id).sort(byDateThenLane);
      const sequence = selectionSequenceItems().filter((entry) => entry.item.laneId === lane.id);
      const publicAnchors = documents.filter((item) => documentReadiness(item) === "public-anchor").sort(byDateThenLane);
      const reviewCopies = documents.filter((item) => documentReadiness(item) === "review-copy").sort(byPriorityThenDate);
      const diary = diaryReferences.filter((entry) => entry.laneId === lane.id).sort(byDateThenLane);
      const pulls = libraryPlan
        .filter((item) => item.laneId === lane.id)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
      const gaps = gapTracker
        .filter((item) => item.laneId === lane.id)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
      const handoffs = handoffsForLane(lane.id);
      const people = persons.filter((person) => (person.laneIds || []).includes(lane.id)).sort((a, b) => a.name.localeCompare(b.name));
      const lead = sourceLeads.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate)[0];
      return { lane, documents, sequence, publicAnchors, reviewCopies, diary, pulls, gaps, handoffs, people, lead };
    });
}

function chapterOutlineCard(outline) {
  const { lane } = outline;
  const card = document.createElement("article");
  card.className = `outline-card priority-${outline.gaps[0]?.priority?.toLowerCase() || "medium"}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(lane.number), textSpan(lane.status), textSpan(plural(outline.sequence.length, "sequence row")));

  const title = document.createElement("h3");
  title.textContent = lane.title;

  const framing = document.createElement("p");
  framing.textContent = chapterThesis(outline);

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid outline-metrics";
  addDetail(metrics, "Records", outline.documents.length);
  addDetail(metrics, "Review", outline.reviewCopies.length);
  addDetail(metrics, "Public", outline.publicAnchors.length);
  addDetail(metrics, "Diary", outline.diary.length);
  addDetail(metrics, "Pulls", outline.pulls.length);
  addDetail(metrics, "People", outline.people.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Chronology", () => showLaneDocuments(lane.id)));
  if (outline.diary.length) actions.append(packetActionButton("Diary", () => showLaneDiary(lane.id)));
  if (outline.pulls.length) actions.append(packetActionButton("Call slips", () => scrollToSection("#call-slips")));
  if (outline.gaps.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(lane.id)));
  actions.append(clipboardButton("Copy outline", chapterOutlineNote(outline), "Outline copied"));

  card.append(
    meta,
    title,
    framing,
    metrics,
    packetBlock(
      "Volume VII entry point",
      packetList(
        outline.handoffs.slice(0, 3),
        (handoff) => handoff.priorChapter,
        (handoff) => handoff.newQuestion || handoff.continuity,
        "No explicit Volume VII handoff mapped yet."
      )
    ),
    packetBlock(
      "Opening document run",
      packetList(
        outlineRunItems(outline).slice(0, 5),
        (item) => item.title,
        (item) => item.detail,
        "No opening document run mapped yet."
      )
    ),
    packetBlock(
      "Drafting cautions",
      packetList(
        outlineRiskItems(outline),
        (item) => item.title,
        (item) => item.detail,
        "No drafting caution mapped yet."
      )
    ),
    actions
  );

  return card;
}

function chapterThesis(outline) {
  const handoff = outline.handoffs[0]?.newQuestion || outline.lane.summary;
  const firstDate = outline.documents[0]?.date ? formatDate(outline.documents[0].date) : "the opening file";
  const lastDate = outline.documents.at(-1)?.date ? formatDate(outline.documents.at(-1).date) : "the closing file";
  return `${outline.lane.summary} Draft this chapter as the ${firstDate} to ${lastDate} continuation of the Volume VII problem: ${handoff}`;
}

function outlineRunItems(outline) {
  return outline.sequence.length
    ? outline.sequence.map((entry) => ({
        title: `${entry.number}. ${entry.item.title}`,
        detail: `${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.repository || entry.item.type}`
      }))
    : outline.documents.slice(0, 6).map((item) => ({
        title: item.title,
        detail: `${formatDate(item.date)} / ${readinessLabel(documentReadiness(item))} / ${item.repository || item.type}`
      }));
}

function outlineRiskItems(outline) {
  return [
    outline.publicAnchors.length > outline.reviewCopies.length
      ? {
          title: "Public/internal balance",
          detail: `${outline.publicAnchors.length} public anchors vs. ${outline.reviewCopies.length} review-copy records.`
        }
      : null,
    outline.gaps[0]
      ? {
          title: `${outline.gaps[0].priority} gap: ${outline.gaps[0].title}`,
          detail: outline.gaps[0].remainingRisk || outline.gaps[0].needed || outline.gaps[0].problem
        }
      : null,
    outline.pulls[0]
      ? {
          title: `Source pull: ${outline.pulls[0].title}`,
          detail: outline.pulls[0].visitGoal || outline.pulls[0].whyItMatters || outline.pulls[0].sourcePart
        }
      : null,
    outline.diary[0]
      ? {
          title: `Calendar cue: ${outline.diary[0].title}`,
          detail: `${formatDate(outline.diary[0].date)} / ${outline.diary[0].time || "time not listed"}`
        }
      : null
  ].filter(Boolean).slice(0, 4);
}

function chapterOutlineNote(outline) {
  return noteLines([
    `${outline.lane.number} / ${outline.lane.title} drafting outline`,
    `Status: ${outline.lane.status}`,
    `Thesis: ${chapterThesis(outline)}`,
    outline.handoffs.length ? "Volume VII entry point:" : "",
    ...outline.handoffs.map((handoff) => `- ${handoff.priorChapter}: ${handoff.continuity} New Volume VIII question: ${handoff.newQuestion}`),
    outline.sequence.length ? "Provisional document run:" : "",
    ...outline.sequence.map((entry) => `- ${entry.number}. ${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.title}`),
    outline.diary.length ? "Presidential Daily Diary anchors:" : "",
    ...outline.diary.slice(0, 5).map((entry) => `- ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${entry.title}: ${entry.volumeConnection}`),
    outline.pulls.length ? "Archive call-slip/source base:" : "",
    ...outline.pulls.slice(0, 5).map((pull) => `- ${pull.title}: ${pull.visitGoal || pull.whyItMatters || pull.sourcePart}`),
    outline.people.length ? "People/offices to keep visible:" : "",
    ...outline.people.slice(0, 8).map((person) => `- ${person.name}: ${person.role}`),
    outline.gaps.length ? "Drafting risks:" : "",
    ...outline.gaps.map((gap) => `- [${gap.priority}] ${gap.title}: ${gap.remainingRisk || gap.needed || gap.problem}`),
    "Compiler check: confirm this outline against the final source pull, avoid public-anchor over-selection, and keep adjacent FRUS volume boundaries explicit."
  ]);
}

function chapterOutlinesNote(outlines) {
  return noteLines([
    "Chapter drafting outlines",
    `${outlines.length} substantive chapter outlines tie Volume VII handoff questions to Volume VIII chronology, Diary cues, source pulls, people, and risks.`,
    ...outlines.map((outline) => `${outline.lane.number}. ${outline.lane.title}: ${chapterThesis(outline)}`)
  ]);
}

function renderCloseoutBoard() {
  renderList(nodes.closeoutRoot, closeoutItems(), closeoutCard, "No chapter closeout checks loaded.");
}

function closeoutItems() {
  const sequence = selectionSequenceItems();
  const annotations = annotationItems();
  const slips = callSlipItems();
  const statusRank = new Map([
    ["Not draft-ready", 1],
    ["Needs polish", 2],
    ["Draft-ready", 3]
  ]);

  return lanes
    .filter((lane) => lane.id !== "volume-control")
    .map((lane) => {
      const documents = potentialDocuments.filter((item) => item.laneId === lane.id).sort(byDateThenLane);
      const counts = readinessCounts(documents);
      const laneSequence = sequence.filter((entry) => entry.item.laneId === lane.id);
      const laneAnnotations = annotations.filter((entry) => entry.item.laneId === lane.id);
      const citationFixes = laneAnnotations.filter((entry) => entry.missing.length);
      const diary = diaryReferences.filter((entry) => entry.laneId === lane.id).sort(byDateThenLane);
      const handoffs = handoffsForLane(lane.id);
      const peopleForLane = persons.filter((person) => (person.laneIds || []).includes(lane.id)).sort((a, b) => a.name.localeCompare(b.name));
      const pulls = libraryPlan
        .filter((item) => item.laneId === lane.id)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
      const leads = sourceLeads.filter((lead) => lead.laneId === lane.id).sort(byPriorityThenDate);
      const laneSlips = slips.filter((slip) => slip.pull.laneId === lane.id);
      const gaps = gapTracker
        .filter((gap) => gap.laneId === lane.id)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
      const highGaps = gaps.filter((gap) => priorityValue(gap.priority) <= 2);
      const publicAnchors = documents.filter((item) => documentReadiness(item) === "public-anchor");
      const checks = [
        closeoutCheck("Chronology candidates", documents.length > 0, `${plural(documents.length, "candidate")} mapped to the chapter lane.`),
        closeoutCheck("Provisional sequence", laneSequence.length > 0, laneSequence.length ? `${plural(laneSequence.length, "sequence row")} ready for ordering.` : "Promote at least one record into the provisional selection sequence."),
        closeoutCheck("Review-copy text", counts["review-copy"] > 0, counts["review-copy"] ? `${plural(counts["review-copy"], "review-copy record")} available.` : "Pull or identify released internal text before final selection."),
        closeoutCheck("Citation fields", laneSequence.length > 0 && citationFixes.length === 0, citationFixes.length ? `${plural(citationFixes.length, "candidate")} still need citation fixes.` : laneSequence.length ? "No citation fixes flagged on sequence candidates." : "Sequence candidates must exist before citation closeout."),
        closeoutCheck("Diary cue", diary.length > 0, diary.length ? `${plural(diary.length, "Presidential Daily Diary cue")} mapped.` : "Add or rule out pertinent calls and meetings."),
        closeoutCheck("Volume VII handoff", handoffs.length > 0, handoffs.length ? `${plural(handoffs.length, "1993-1996 carryover")} mapped.` : "Confirm the prior-volume chapter boundary."),
        closeoutCheck("People/offices", peopleForLane.length > 0, peopleForLane.length ? `${plural(peopleForLane.length, "person/office", "people/offices")} indexed.` : "Map decisionmakers, offices, and recurring participants."),
        closeoutCheck("Source route", pulls.length + leads.length + laneSlips.length > 0, `${plural(pulls.length, "pull plan")}, ${plural(leads.length, "source lead")}, ${plural(laneSlips.length, "call slip")} mapped.`),
        closeoutCheck("Call-slip coverage", !pulls.length || laneSlips.length >= pulls.length, pulls.length ? `${laneSlips.length}/${pulls.length} pull-plan items have generated slips.` : "No folder-level pull plan requires a slip yet."),
        closeoutCheck("Public backtrace", !publicAnchors.length || counts["review-copy"] > 0 || pulls.length > 0 || leads.length > 0, publicAnchors.length ? `${plural(publicAnchors.length, "public anchor")} paired with ${plural(counts["review-copy"], "review copy")} and ${plural(pulls.length + leads.length, "source route")}.` : "No public anchors need backtrace."),
        closeoutCheck("High-risk gaps", highGaps.length === 0, highGaps.length ? `${plural(highGaps.length, "critical/high gap")} remains open.` : "No critical/high gaps mapped.")
      ];
      const remaining = checks.filter((check) => !check.done);
      const status = remaining.length ? (remaining.length <= 2 ? "Needs polish" : "Not draft-ready") : "Draft-ready";
      return { lane, documents, counts, sequence: laneSequence, annotations: laneAnnotations, citationFixes, diary, handoffs, peopleForLane, pulls, leads, slips: laneSlips, gaps, highGaps, checks, remaining, status };
    })
    .sort(
      (a, b) =>
        (statusRank.get(a.status) ?? 99) - (statusRank.get(b.status) ?? 99) ||
        b.remaining.length - a.remaining.length ||
        (laneOrder.get(a.lane.id) ?? 99) - (laneOrder.get(b.lane.id) ?? 99)
    );
}

function closeoutCheck(label, done, detail) {
  return { label, done, detail };
}

function closeoutCard(item) {
  const card = document.createElement("article");
  card.className = `closeout-card status-${closeoutStatusClass(item.status)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(item.lane.number), textSpan(item.status), textSpan(plural(item.remaining.length, "open check")));

  const title = document.createElement("h3");
  title.textContent = item.lane.title;

  const summary = document.createElement("p");
  summary.textContent = `${item.checks.length - item.remaining.length}/${item.checks.length} closeout checks pass. ${closeoutNextMove(item)}`;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid closeout-metrics";
  addDetail(metrics, "Closed", `${item.checks.length - item.remaining.length}/${item.checks.length}`);
  addDetail(metrics, "Review", item.counts["review-copy"] || 0);
  addDetail(metrics, "Sequence", item.sequence.length);
  addDetail(metrics, "Diary", item.diary.length);
  addDetail(metrics, "Slips", item.slips.length);
  addDetail(metrics, "High gaps", item.highGaps.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Outline", () => scrollToSection("#outlines")));
  if (item.documents.length) actions.append(packetActionButton("Chronology", () => showLaneDocuments(item.lane.id)));
  if (item.annotations.length) actions.append(packetActionButton("Annotate", () => scrollToSection("#annotations")));
  if (item.slips.length) actions.append(packetActionButton("Call slips", () => scrollToSection("#call-slips")));
  if (item.gaps.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(item.lane.id)));
  actions.append(clipboardButton("Copy closeout", closeoutNote(item), "Closeout copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Remaining work",
      packetList(
        item.remaining,
        (check) => check.label,
        (check) => check.detail,
        "All closeout checks pass."
      )
    ),
    packetBlock(
      "Passed checks",
      packetList(
        item.checks.filter((check) => check.done).slice(0, 6),
        (check) => check.label,
        (check) => check.detail,
        "No closeout checks have passed yet."
      )
    ),
    packetBlock(
      "Closeout route",
      packetList(
        closeoutRouteItems(item),
        (route) => route.title,
        (route) => route.detail,
        "No route items mapped yet."
      )
    ),
    actions
  );

  return card;
}

function closeoutStatusClass(status) {
  return status.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function closeoutNextMove(item) {
  if (!item.remaining.length) return "Ready for first-pass chapter drafting after final source verification.";
  const first = item.remaining[0];
  return `Next closeout move: ${first.label.toLowerCase()} - ${first.detail}`;
}

function closeoutRouteItems(item) {
  return [
    item.highGaps[0]
      ? {
          title: `Resolve ${item.highGaps[0].priority} gap: ${item.highGaps[0].title}`,
          detail: item.highGaps[0].remainingRisk || item.highGaps[0].needed || item.highGaps[0].problem || "Gap tracker item mapped."
        }
      : null,
    item.citationFixes[0]
      ? {
          title: `Fix citation: ${item.citationFixes[0].item.title}`,
          detail: `${item.citationFixes[0].missing.map((check) => check.label).join(", ")} missing.`
        }
      : null,
    item.slips[0]
      ? {
          title: `Call slip ${item.slips[0].number}: ${item.slips[0].folder}`,
          detail: item.slips[0].pull.visitGoal || item.slips[0].pull.whyItMatters || item.slips[0].pull.sourcePart || "Folder-level pull target."
        }
      : null,
    item.pulls[0]
      ? {
          title: `Pull: ${item.pulls[0].title}`,
          detail: item.pulls[0].visitGoal || item.pulls[0].whyItMatters || item.pulls[0].sourcePart || "Archive pull target."
        }
      : null,
    item.sequence[0]
      ? {
          title: `Sequence start: ${item.sequence[0].item.title}`,
          detail: `${formatDate(item.sequence[0].item.date)} / ${readinessLabel(documentReadiness(item.sequence[0].item))}.`
        }
      : null,
    item.diary[0]
      ? {
          title: `Diary check: ${item.diary[0].title}`,
          detail: `${formatDate(item.diary[0].date)} / ${item.diary[0].time || "time not listed"} / ${item.diary[0].eventType || "calendar cue"}.`
        }
      : null
  ].filter(Boolean).slice(0, 5);
}

function closeoutNote(item) {
  return noteLines([
    `${item.lane.number} / ${item.lane.title} chapter closeout`,
    `Status: ${item.status}`,
    `Checks closed: ${item.checks.length - item.remaining.length}/${item.checks.length}`,
    `Next move: ${item.remaining[0]?.label || "Final source verification"}${item.remaining[0] ? ` - ${item.remaining[0].detail}` : ""}`,
    item.remaining.length ? "Remaining checks:" : "Remaining checks: none",
    ...item.remaining.map((check) => `- ${check.label}: ${check.detail}`),
    "Passed checks:",
    ...item.checks.filter((check) => check.done).map((check) => `- ${check.label}: ${check.detail}`),
    item.sequence.length ? "Provisional sequence:" : "",
    ...item.sequence.slice(0, 6).map((entry) => `- ${entry.number}. ${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.title}`),
    item.citationFixes.length ? "Citation fixes:" : "",
    ...item.citationFixes.map((entry) => `- ${entry.item.title}: missing ${entry.missing.map((check) => check.label).join(", ")}`),
    item.highGaps.length ? "Critical/high gaps:" : "",
    ...item.highGaps.map((gap) => `- [${gap.priority}] ${gap.title}: ${gap.remainingRisk || gap.needed || gap.problem}`),
    item.diary.length ? "Presidential Daily Diary cues:" : "",
    ...item.diary.slice(0, 5).map((entry) => `- ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${entry.title}: ${entry.volumeConnection}`),
    item.handoffs.length ? "Volume VII carryover:" : "",
    ...item.handoffs.map((handoff) => `- ${handoff.priorChapter}: ${handoff.newQuestion}`),
    item.pulls.length || item.slips.length ? "Source and call-slip route:" : "",
    ...item.pulls.slice(0, 4).map((pull) => `- Pull: ${pull.title}: ${pull.visitGoal || pull.whyItMatters || pull.sourcePart}`),
    ...item.slips.slice(0, 4).map((slip) => `- Slip ${slip.number}: ${slip.folder} (${slip.priority})`),
    item.peopleForLane.length ? "People/offices:" : "",
    ...item.peopleForLane.slice(0, 8).map((person) => `- ${person.name}: ${person.role}`),
    "Compiler check: do not mark this chapter draft-ready until sequence, source text, citation, Diary, handoff, people, and high-risk gap checks all pass."
  ]);
}

function closeoutBoardNote(items) {
  const draftReady = items.filter((item) => item.status === "Draft-ready").length;
  const needsPolish = items.filter((item) => item.status === "Needs polish").length;
  const notReady = items.filter((item) => item.status === "Not draft-ready").length;
  return noteLines([
    "Chapter closeout board",
    `${items.length} substantive chapters scored from chronology, sequence, annotation, Daily Diary, Volume VII handoff, source-route, call-slip, people, and gap signals.`,
    `Status counts: ${draftReady} draft-ready; ${needsPolish} needs polish; ${notReady} not draft-ready.`,
    ...items.map((item) => `${item.lane.number}. ${item.lane.title}: ${item.status}; ${item.checks.length - item.remaining.length}/${item.checks.length} checks closed; remaining: ${item.remaining.map((check) => check.label).join(", ") || "none"}`)
  ]);
}

function renderChapterAssembly() {
  renderList(nodes.assemblyRoot, chapterAssemblyItems(), chapterAssemblyCard, "No chapter assembly packets loaded.");
}

function chapterAssemblyItems() {
  const outlinesByLane = new Map(chapterOutlineItems().map((outline) => [outline.lane.id, outline]));
  return closeoutItems()
    .map((closeout) => {
      const laneId = closeout.lane.id;
      const outline = outlinesByLane.get(laneId);
      const ledgers = sourceCopyLedger.filter((entry) => entry.laneId === laneId);
      const pools = sourcePools
        .filter((pool) => pool.laneId === laneId)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
      const run = closeout.sequence.length
        ? closeout.sequence
        : closeout.documents.slice(0, 6).map((item, index) => ({ number: index + 1, item, context: selectionSequenceContext(item) }));
      return {
        ...closeout,
        outline,
        ledgers,
        pools,
        run,
        assemblyStatus: chapterAssemblyStatus(closeout)
      };
    })
    .sort((a, b) => (laneOrder.get(a.lane.id) ?? 99) - (laneOrder.get(b.lane.id) ?? 99));
}

function chapterAssemblyStatus(item) {
  if (item.status === "Draft-ready") return "Ready to draft";
  if (item.status === "Needs polish") return "Assemble with cautions";
  return "Research before draft";
}

function chapterAssemblyCard(packet) {
  const card = document.createElement("article");
  card.className = `assembly-card status-${closeoutStatusClass(packet.status)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(packet.lane.number), textSpan(packet.assemblyStatus), textSpan(plural(packet.run.length, "run item")));

  const title = document.createElement("h3");
  title.textContent = packet.lane.title;

  const summary = document.createElement("p");
  summary.textContent = `${chapterThesis(packet.outline || packet)} ${packet.remaining.length ? `${plural(packet.remaining.length, "closeout check")} still need attention before final drafting.` : "The packet is ready for first-pass chapter drafting and source-note review."}`;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid assembly-metrics";
  addDetail(metrics, "Run", packet.run.length);
  addDetail(metrics, "Review", packet.counts["review-copy"] || 0);
  addDetail(metrics, "Diary", packet.diary.length);
  addDetail(metrics, "Slips", packet.slips.length);
  addDetail(metrics, "Sources", packet.pulls.length + packet.leads.length + packet.pools.length);
  addDetail(metrics, "Fixes", packet.citationFixes.length + packet.highGaps.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Outline", () => scrollToSection("#outlines")));
  actions.append(packetActionButton("Closeout", () => scrollToSection("#closeout")));
  if (packet.run.length) actions.append(packetActionButton("Sequence", () => scrollToSection("#sequence")));
  if (packet.citationFixes.length || packet.annotations.length) actions.append(packetActionButton("Annotate", () => scrollToSection("#annotations")));
  if (packet.pulls.length || packet.leads.length || packet.pools.length) actions.append(packetActionButton("Sources", () => showLaneLeads(packet.lane.id)));
  actions.append(clipboardButton("Copy packet", chapterAssemblyNote(packet), "Draft packet copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Chapter spine",
      packetList(
        chapterAssemblySpine(packet),
        (item) => item.title,
        (item) => item.detail,
        "No chapter spine mapped yet."
      )
    ),
    packetBlock(
      "Source note base",
      packetList(
        chapterAssemblySourceItems(packet),
        (item) => item.title,
        (item) => item.detail,
        "No source-note base mapped yet."
      )
    ),
    packetBlock(
      "Annotation watch",
      packetList(
        chapterAssemblyAnnotationItems(packet),
        (item) => item.title,
        (item) => item.detail,
        "No annotation watch items mapped yet."
      )
    ),
    packetBlock(
      "Closeout cautions",
      packetList(
        packet.remaining.slice(0, 6),
        (check) => check.label,
        (check) => check.detail,
        "No closeout cautions remain."
      )
    ),
    actions
  );

  return card;
}

function chapterAssemblySpine(packet) {
  return [
    packet.handoffs[0]
      ? {
          title: `Volume VII bridge: ${packet.handoffs[0].priorChapter}`,
          detail: packet.handoffs[0].newQuestion || packet.handoffs[0].continuity
        }
      : null,
    ...packet.run.slice(0, 5).map((entry) => ({
      title: `${entry.number}. ${entry.item.title}`,
      detail: `${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.repository || entry.item.collection || entry.item.type}`
    })),
    packet.diary[0]
      ? {
          title: `Calendar anchor: ${packet.diary[0].title}`,
          detail: `${formatDate(packet.diary[0].date)} / ${packet.diary[0].time || "time not listed"} / ${packet.diary[0].volumeConnection}`
        }
      : null
  ].filter(Boolean).slice(0, 7);
}

function chapterAssemblySourceItems(packet) {
  return [
    ...packet.ledgers.slice(0, 2).map((entry) => ({
      title: `Ledger: ${entry.title}`,
      detail: `${entry.status} / ${entry.sourceClass}. ${entry.reviewCue || entry.repositoryTrail || ""}`
    })),
    ...packet.pulls.slice(0, 2).map((pull) => ({
      title: `Pull: ${pull.title}`,
      detail: pull.visitGoal || pull.whyItMatters || pull.sourcePart || "Archive pull target."
    })),
    ...packet.slips.slice(0, 2).map((slip) => ({
      title: `Call slip ${slip.number}: ${slip.folder}`,
      detail: `${slip.priority} / ${slip.pull.office || slip.pull.sourcePart || "repository slip"}`
    })),
    ...packet.leads.slice(0, 2).map((lead) => ({
      title: `Lead: ${lead.title}`,
      detail: lead.identifier || lead.note || lead.institution || "Source lead mapped."
    })),
    ...packet.pools.slice(0, 1).map((pool) => ({
      title: `Pool: ${pool.title}`,
      detail: pool.nextUse || pool.coverage || pool.institution || "Source pool mapped."
    }))
  ].slice(0, 7);
}

function chapterAssemblyAnnotationItems(packet) {
  return [
    ...packet.citationFixes.slice(0, 3).map((entry) => ({
      title: `Citation fix: ${entry.item.title}`,
      detail: `Missing ${entry.missing.map((check) => check.label).join(", ")}.`
    })),
    ...packet.peopleForLane.slice(0, 4).map((person) => ({
      title: `Person/office: ${person.name}`,
      detail: person.role
    })),
    ...packet.highGaps.slice(0, 3).map((gap) => ({
      title: `${gap.priority} gap: ${gap.title}`,
      detail: gap.remainingRisk || gap.needed || gap.problem || "Gap tracker item mapped."
    }))
  ].slice(0, 8);
}

function chapterAssemblyNote(packet) {
  return noteLines([
    `${packet.lane.number} / ${packet.lane.title} draft packet`,
    `Assembly status: ${packet.assemblyStatus}`,
    `Closeout status: ${packet.status} (${packet.checks.length - packet.remaining.length}/${packet.checks.length} checks closed)`,
    `Thesis: ${chapterThesis(packet.outline || packet)}`,
    packet.handoffs.length ? "Volume VII bridge:" : "",
    ...packet.handoffs.map((handoff) => `- ${handoff.priorChapter}: ${handoff.newQuestion}`),
    packet.run.length ? "Chapter document run:" : "",
    ...packet.run.map((entry) => `- ${entry.number}. ${formatDate(entry.item.date)} / ${readinessLabel(documentReadiness(entry.item))} / ${entry.item.title} / ${entry.item.repository || entry.item.collection || entry.item.type}`),
    packet.diary.length ? "Presidential Daily Diary anchors:" : "",
    ...packet.diary.slice(0, 6).map((entry) => `- ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${entry.title}: ${entry.volumeConnection}`),
    "Source note base:",
    ...chapterAssemblySourceItems(packet).map((item) => `- ${item.title}: ${item.detail}`),
    packet.citationFixes.length ? "Citation fixes before draft circulation:" : "",
    ...packet.citationFixes.map((entry) => `- ${entry.item.title}: missing ${entry.missing.map((check) => check.label).join(", ")}`),
    packet.peopleForLane.length ? "People/offices to annotate:" : "",
    ...packet.peopleForLane.slice(0, 10).map((person) => `- ${person.name}: ${person.role}`),
    packet.remaining.length ? "Closeout cautions:" : "Closeout cautions: none",
    ...packet.remaining.map((check) => `- ${check.label}: ${check.detail}`),
    "Compiler use: paste this packet into the chapter working file, then replace public/source-path anchors with verified internal records as the archive pull closes."
  ]);
}

function chapterAssemblyBoardNote(items) {
  return noteLines([
    "Chapter draft packet builder",
    `${items.length} chapter packets bundle outlines, closeout status, document runs, Daily Diary anchors, source-note base, call slips, citation fixes, people, and remaining cautions.`,
    ...items.map((item) => `${item.lane.number}. ${item.lane.title}: ${item.assemblyStatus}; run ${item.run.length}; review ${item.counts["review-copy"] || 0}; Diary ${item.diary.length}; slips ${item.slips.length}; cautions ${item.remaining.length}`)
  ]);
}

function packetBlock(title, content) {
  const section = document.createElement("section");
  section.className = "packet-block";
  const heading = document.createElement("h4");
  heading.textContent = title;
  section.append(heading, content);
  return section;
}

function packetList(items, primary, secondary, emptyText) {
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "packet-empty";
    empty.textContent = emptyText;
    return empty;
  }
  const list = document.createElement("ul");
  list.className = "packet-list";
  for (const item of items) {
    const entry = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = primary(item);
    const detail = document.createElement("span");
    detail.textContent = secondary(item);
    entry.append(title, detail);
    list.append(entry);
  }
  return list;
}

function packetActionButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "link-button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function showLaneDocuments(laneId) {
  resetGroup("documents", [
    nodes.documentSearch,
    nodes.documentLaneFilter,
    nodes.documentTypeFilter,
    nodes.documentPriorityFilter,
    nodes.documentReadinessFilter,
    nodes.documentSort
  ]);
  state.documents.lane = laneId;
  if (nodes.documentLaneFilter) nodes.documentLaneFilter.value = laneId;
  renderDocuments();
  scrollToSection("#documents");
}

function showLaneLeads(laneId) {
  resetGroup("leads", [nodes.leadSearch, nodes.leadLaneFilter, nodes.leadInstitutionFilter, nodes.leadPriorityFilter]);
  state.leads.lane = laneId;
  if (nodes.leadLaneFilter) nodes.leadLaneFilter.value = laneId;
  renderLeads();
  scrollToSection("#sources");
}

function showLaneDiary(laneId) {
  resetGroup("diary", [nodes.diarySearch, nodes.diaryLaneFilter, nodes.diaryYearFilter, nodes.diaryEventFilter]);
  state.diary.lane = laneId;
  if (nodes.diaryLaneFilter) nodes.diaryLaneFilter.value = laneId;
  renderDiaryReferences();
  scrollToSection("#diary");
}

function showLaneLibrary(laneId) {
  resetGroup("library", [nodes.librarySearch, nodes.libraryLaneFilter, nodes.libraryPriorityFilter]);
  state.library.lane = laneId;
  if (nodes.libraryLaneFilter) nodes.libraryLaneFilter.value = laneId;
  renderLibrary();
  scrollToSection("#library");
}

function showLaneGaps(laneId) {
  resetGroup("gaps", [nodes.gapSearch, nodes.gapLaneFilter, nodes.gapPriorityFilter, nodes.gapStatusFilter]);
  state.gaps.lane = laneId;
  if (nodes.gapLaneFilter) nodes.gapLaneFilter.value = laneId;
  renderGaps();
  scrollToSection("#gaps");
}

function showLaneRequests(laneId) {
  scrollToSection("#requests");
  const requestCards = document.querySelectorAll("#requests-root .request-card");
  for (const card of requestCards) card.dataset.highlighted = "false";
  for (const card of requestCards) {
    if (card.dataset.lane === laneId) card.dataset.highlighted = "true";
  }
  clearTimeout(requestHighlightTimer);
  requestHighlightTimer = setTimeout(() => {
    for (const card of requestCards) card.dataset.highlighted = "false";
  }, 2800);
}

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSelectionBoard() {
  renderList(nodes.selectionRoot, readinessBuckets, selectionCard, "No selection readiness buckets loaded.");
}

function selectionCard(bucket) {
  const items = potentialDocuments
    .filter((item) => documentReadiness(item) === bucket.id)
    .sort(byPriorityThenDate);
  const lanesRepresented = uniqueSorted(items.map((item) => laneTitle(item.laneId))).length;
  const topScore = items.reduce((max, item) => Math.max(max, item.score || 0), 0);

  const card = document.createElement("article");
  card.className = `selection-card readiness-${bucket.id}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(bucket.label), textSpan(plural(items.length, "record")));

  const title = document.createElement("h3");
  title.textContent = bucket.title;

  const description = document.createElement("p");
  description.textContent = bucket.description;

  const details = document.createElement("dl");
  details.className = "detail-grid selection-metrics";
  addDetail(details, "Lanes", lanesRepresented);
  addDetail(details, "Top score", topScore || "Review");

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(packetActionButton("Filter chronology", () => showReadinessDocuments(bucket.id)));
  actions.append(clipboardButton("Copy shortlist", selectionNote(bucket, items), "Shortlist copied"));

  card.append(
    meta,
    title,
    description,
    details,
    packetBlock(
      "Top records",
      packetList(
        items.slice(0, 5),
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${laneNumber(item.laneId)} / ${item.priority} / score ${item.score || "review"}`,
        bucket.empty
      )
    ),
    actions
  );

  return card;
}

function selectionNote(bucket, items) {
  return noteLines([
    `${bucket.title} (${plural(items.length, "record")})`,
    bucket.description,
    ...items.slice(0, 12).map(
      (item) =>
        `- ${formatDate(item.date)} | ${laneNumber(item.laneId)} | ${item.priority} | ${item.type} | ${item.title} | ${item.repository || ""} ${item.identifier || ""}`.trim()
    )
  ]);
}

function renderSelectionSequence() {
  if (!nodes.sequenceRoot) return;
  const entries = selectionSequenceItems();
  const wrapper = document.createElement("div");
  wrapper.className = "sequence-table-wrap";
  const table = document.createElement("table");
  table.className = "sequence-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (const label of ["No.", "Date", "Lane", "Readiness", "Candidate", "Context", "Copy"]) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label;
    headerRow.append(th);
  }
  thead.append(headerRow);

  const tbody = document.createElement("tbody");
  for (const entry of entries) tbody.append(sequenceRow(entry));

  table.append(thead, tbody);
  wrapper.append(table);
  nodes.sequenceRoot.replaceChildren(wrapper);
}

function selectionSequenceItems() {
  return potentialDocuments
    .filter((item) => ["review-copy", "formal-record", "pull-lead"].includes(documentReadiness(item)))
    .sort(byDateThenLane)
    .map((item, index) => ({
      number: index + 1,
      item,
      context: selectionSequenceContext(item)
    }));
}

function selectionSequenceContext(item) {
  const publicAnchors = publicRecords
    .filter((anchor) => anchor.laneId === item.laneId && dayDistance(anchor.date, item.date) <= 21)
    .sort((a, b) => dayDistance(a.date, item.date) - dayDistance(b.date, item.date) || byPriorityThenDate(a, b))
    .slice(0, 2);
  const diary = diaryReferences
    .filter((entry) => entry.laneId === item.laneId && dayDistance(entry.date, item.date) <= 21)
    .sort((a, b) => dayDistance(a.date, item.date) - dayDistance(b.date, item.date) || byPriorityThenDate(a, b))
    .slice(0, 2);
  const pull = libraryPlan
    .filter((target) => target.laneId === item.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
  const gap = gapTracker
    .filter((risk) => risk.laneId === item.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
  return { publicAnchors, diary, pull, gap };
}

function sequenceRow(entry) {
  const { item, context } = entry;
  const row = document.createElement("tr");

  const number = document.createElement("th");
  number.scope = "row";
  number.className = "sequence-number";
  number.textContent = entry.number.toString().padStart(2, "0");
  row.append(number);

  row.append(sequenceCell(formatDate(item.date)));
  row.append(sequenceCell(laneNumber(item.laneId)));
  row.append(sequenceCell(readinessLabel(documentReadiness(item))));

  const candidate = document.createElement("td");
  candidate.className = "sequence-candidate";
  const title = document.createElement("strong");
  title.textContent = item.title;
  const meta = document.createElement("span");
  meta.textContent = `${item.type} / ${item.repository || item.collection || item.level || "source mapped"}`;
  candidate.append(title, meta);
  row.append(candidate);

  const contextCell = document.createElement("td");
  contextCell.append(sequenceContextList(entry));
  row.append(contextCell);

  const copy = document.createElement("td");
  copy.append(clipboardButton("Copy", sequenceCandidateNote(entry), "Sequence row copied"));
  row.append(copy);

  return row;
}

function sequenceCell(value) {
  const cell = document.createElement("td");
  cell.textContent = value || "";
  return cell;
}

function sequenceContextList(entry) {
  const { context } = entry;
  const lines = [
    context.publicAnchors.length ? `Public: ${context.publicAnchors.map((item) => item.title).join("; ")}` : "",
    context.diary.length ? `Diary: ${context.diary.map((item) => `${formatDate(item.date)} ${item.title}`).join("; ")}` : "",
    context.pull ? `Pull: ${context.pull.title}` : "",
    context.gap ? `Risk: ${context.gap.title}` : ""
  ].filter(Boolean);

  if (!lines.length) {
    const empty = document.createElement("p");
    empty.className = "packet-empty";
    empty.textContent = "No nearby context mapped.";
    return empty;
  }

  const list = document.createElement("ul");
  list.className = "sequence-context-list";
  for (const line of lines) {
    const item = document.createElement("li");
    item.textContent = line;
    list.append(item);
  }
  return list;
}

function sequenceCandidateNote(entry) {
  const { item, context } = entry;
  return noteLines([
    `Provisional sequence ${entry.number}: ${formatDate(item.date)} - ${item.title}`,
    `Lane: ${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}`,
    `Readiness: ${readinessLabel(documentReadiness(item))}`,
    `Type: ${item.type}`,
    item.repository ? `Repository: ${item.repository}` : "",
    item.collection ? `Collection: ${item.collection}` : "",
    item.identifier ? `Identifier: ${item.identifier}` : "",
    item.summary ? `Selection reason: ${item.summary}` : "",
    context.publicAnchors.length ? `Nearby public anchors: ${context.publicAnchors.map((anchor) => `${formatDate(anchor.date)} - ${anchor.title}`).join("; ")}` : "",
    context.diary.length ? `Nearby diary cues: ${context.diary.map((entryItem) => `${formatDate(entryItem.date)} - ${entryItem.title}`).join("; ")}` : "",
    context.pull ? `Pull target: ${context.pull.title}` : "",
    context.gap ? `Open risk: ${context.gap.title}` : "",
    item.url ? `Source URL: ${item.url}` : "",
    item.pdfUrl ? `Review PDF: ${item.pdfUrl}` : ""
  ]);
}

function selectionSequenceNote(entries) {
  return noteLines([
    "Provisional document selection sequence",
    `${entries.length} review-copy, formal-record, and pull-lead candidates are ordered chronologically for first-pass editorial review.`,
    ...entries.map((entry) => {
      const { item } = entry;
      return `${entry.number}. ${formatDate(item.date)} / ${laneNumber(item.laneId)} / ${readinessLabel(documentReadiness(item))} / ${item.title}`;
    })
  ]);
}

function renderBacktraceBoard() {
  renderList(nodes.backtraceRoot, publicBacktraceItems(), backtraceCard, "No public anchors loaded.");
}

function publicBacktraceItems() {
  return [...publicRecords].sort(byDateThenLane).map((anchor) => ({
    anchor,
    matches: publicBacktraceMatches(anchor)
  }));
}

function publicBacktraceMatches(anchor) {
  const internal = potentialDocuments
    .filter(
      (item) =>
        item.id !== anchor.id &&
        item.laneId === anchor.laneId &&
        documentReadiness(item) !== "public-anchor" &&
        dayDistance(item.date, anchor.date) <= 45
    )
    .sort((a, b) => dayDistance(a.date, anchor.date) - dayDistance(b.date, anchor.date) || byPriorityThenDate(a, b))
    .slice(0, 3);
  const diary = diaryReferences
    .filter((entry) => entry.laneId === anchor.laneId && dayDistance(entry.date, anchor.date) <= 30)
    .sort((a, b) => dayDistance(a.date, anchor.date) - dayDistance(b.date, anchor.date) || byPriorityThenDate(a, b))
    .slice(0, 2);
  const pull = libraryPlan
    .filter((item) => item.laneId === anchor.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
  const lead = sourceLeads
    .filter((item) => item.laneId === anchor.laneId)
    .sort(byPriorityThenDate)[0];
  const gap = gapTracker
    .filter((item) => item.laneId === anchor.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
  return { internal, diary, pull, lead, gap };
}

function backtraceCard(trace) {
  const { anchor, matches } = trace;
  const card = document.createElement("article");
  card.className = "backtrace-card";

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(formatDate(anchor.date)), textSpan(laneNumber(anchor.laneId)), textSpan(anchor.priority || readinessLabel(documentReadiness(anchor))));

  const title = document.createElement("h3");
  title.textContent = anchor.title;

  const summary = document.createElement("p");
  summary.textContent = anchor.summary || anchor.sourceNote || "Public statement anchor requiring an internal source pair.";

  const details = document.createElement("dl");
  details.className = "detail-grid backtrace-metrics";
  addDetail(details, "Type", readinessLabel(documentReadiness(anchor)));
  addDetail(details, "Source", anchor.repository || anchor.collection || "GovInfo");
  addDetail(details, "Pages", anchor.pages || anchor.pageCount || "Open");
  addDetail(details, "Score", anchor.score || "Review");

  const routeItems = [
    ...matches.diary.map((entry) => ({
      title: `Diary: ${entry.title}`,
      detail: `${formatDate(entry.date)} / ${entry.eventType || "calendar cue"} / ${entry.time || "time not listed"}`
    })),
    matches.pull
      ? {
          title: `Pull: ${matches.pull.title}`,
          detail: matches.pull.visitGoal || matches.pull.sourcePart || matches.pull.whyItMatters || "Pull target mapped"
        }
      : null,
    matches.lead
      ? {
          title: `Lead: ${matches.lead.title}`,
          detail: matches.lead.identifier || matches.lead.note || matches.lead.institution || "Source lead mapped"
        }
      : null,
    matches.gap
      ? {
          title: `Risk: ${matches.gap.title}`,
          detail: matches.gap.remainingRisk || matches.gap.needed || matches.gap.problem || "Gap tracker item mapped"
        }
      : null
  ].filter(Boolean);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  if (anchor.url) actions.append(linkButton("Source", anchor.url));
  if (anchor.pdfUrl) actions.append(linkButton("PDF", anchor.pdfUrl));
  actions.append(packetActionButton("Chronology", () => showLaneDocuments(anchor.laneId)));
  if (matches.pull) actions.append(packetActionButton("Library", () => showLaneLibrary(anchor.laneId)));
  if (matches.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(anchor.laneId)));
  actions.append(clipboardButton("Copy trace", publicTraceNote(trace), "Trace copied"));

  card.append(
    meta,
    title,
    summary,
    details,
    packetBlock(
      "Internal/source pairs",
      packetList(
        matches.internal,
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${readinessLabel(documentReadiness(item))} / ${item.repository || item.collection || item.type}`,
        "No nearby internal or formal source pair mapped yet."
      )
    ),
    packetBlock(
      "Calendar/source route",
      packetList(
        routeItems,
        (item) => item.title,
        (item) => item.detail,
        "No Diary, pull, lead, or gap route mapped yet."
      )
    ),
    actions
  );

  return card;
}

function publicTraceNote(trace) {
  const { anchor, matches } = trace;
  return noteLines([
    `Public anchor: ${formatDate(anchor.date)} - ${anchor.title}`,
    `Lane: ${laneNumber(anchor.laneId)} / ${laneTitle(anchor.laneId)}`,
    `Type: ${anchor.type}`,
    anchor.repository ? `Repository: ${anchor.repository}` : "",
    anchor.collection ? `Collection: ${anchor.collection}` : "",
    anchor.identifier ? `Identifier: ${anchor.identifier}` : "",
    anchor.pages ? `Pages: ${anchor.pages}` : "",
    anchor.summary ? `Summary: ${anchor.summary}` : "",
    anchor.sourceNote ? `Source note: ${anchor.sourceNote}` : "",
    matches.internal.length
      ? `Internal/source pairs: ${matches.internal.map((item) => `${formatDate(item.date)} - ${item.title} (${readinessLabel(documentReadiness(item))})`).join("; ")}`
      : "Internal/source pairs: needs internal pair",
    matches.diary.length
      ? `Diary cues: ${matches.diary.map((entry) => `${formatDate(entry.date)} - ${entry.title}`).join("; ")}`
      : "",
    matches.pull ? `Pull target: ${matches.pull.title}` : "",
    matches.lead ? `Source lead: ${matches.lead.title}${matches.lead.identifier ? ` / ${matches.lead.identifier}` : ""}` : "",
    matches.gap ? `Open risk: ${matches.gap.title} - ${matches.gap.remainingRisk || matches.gap.needed || matches.gap.problem || ""}` : "",
    anchor.url ? `Source URL: ${anchor.url}` : "",
    anchor.pdfUrl ? `PDF: ${anchor.pdfUrl}` : ""
  ]);
}

function publicBacktraceNote(traces) {
  return noteLines([
    "Public anchor backtrace board",
    `${traces.length} Public Papers anchors mapped to internal/source routes.`,
    ...traces.map((trace, index) => {
      const { anchor, matches } = trace;
      const route = matches.internal[0]?.title || matches.pull?.title || matches.lead?.title || "needs internal pair";
      return `${index + 1}. ${formatDate(anchor.date)} / ${laneNumber(anchor.laneId)} / ${anchor.title} -> ${route}`;
    })
  ]);
}

function renderAnnotationQueue() {
  renderList(nodes.annotationsRoot, annotationItems(), annotationCard, "No annotation queue candidates loaded.");
}

function annotationItems() {
  return selectionSequenceItems().map((entry) => {
    const checks = citationChecks(entry.item);
    const missing = checks.filter((check) => !check.present);
    const people = annotationPeople(entry.item);
    const leads = sourceLeads.filter((lead) => lead.laneId === entry.item.laneId).sort(byPriorityThenDate).slice(0, 2);
    const pull = libraryPlan
      .filter((item) => item.laneId === entry.item.laneId)
      .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
    const gap = gapTracker
      .filter((item) => item.laneId === entry.item.laneId)
      .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
    return {
      ...entry,
      checks,
      missing,
      people,
      leads,
      pull,
      gap,
      stage: annotationStage(entry.item, missing, people, entry.context, gap),
      priority: annotationPriority(entry.item, missing, people, entry.context, gap)
    };
  });
}

function citationChecks(item) {
  const checks = [
    { label: "Repository", value: item.repository },
    { label: "Collection", value: item.collection },
    { label: "Identifier", value: item.identifier },
    { label: "Pages", value: item.pages || item.pageCount },
    { label: "Source note", value: item.sourceNote },
    { label: "Source URL", value: item.url }
  ];
  if (documentReadiness(item) !== "pull-lead") checks.push({ label: "PDF/review copy", value: item.pdfUrl });
  return checks.map((check) => ({
    ...check,
    present: Boolean(check.value || check.value === 0)
  }));
}

function annotationPeople(item) {
  const exact = persons.filter((person) => personMentioned(item, person)).sort((a, b) => a.name.localeCompare(b.name));
  const laneMatches = persons
    .filter((person) => (person.laneIds || []).includes(item.laneId) && !exact.includes(person))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...exact, ...laneMatches].slice(0, 5);
}

function annotationStage(item, missing, people, context, gap) {
  if (documentReadiness(item) === "pull-lead") return "Pull before annotate";
  if (missing.length) return "Citation fix";
  if (gap && priorityValue(gap.priority) <= 2) return "Risk review";
  if (!people.length || (!context.diary.length && !context.publicAnchors.length)) return "Annotation check";
  return "Draft-ready";
}

function annotationPriority(item, missing, people, context, gap) {
  if (documentReadiness(item) === "pull-lead" || missing.length >= 2) return "High";
  if (gap && priorityValue(gap.priority) <= 2) return gap.priority;
  if (!people.length || (!context.diary.length && !context.publicAnchors.length)) return "Medium";
  return "Low";
}

function annotationCard(entry) {
  const { item, context } = entry;
  const card = document.createElement("article");
  card.className = `annotation-card priority-${(entry.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(entry.number.toString().padStart(2, "0")), textSpan(formatDate(item.date)), textSpan(laneNumber(item.laneId)), textSpan(entry.stage));

  const title = document.createElement("h3");
  title.textContent = item.title;

  const summary = document.createElement("p");
  summary.textContent = item.summary || "Selection candidate requiring citation and annotation review.";

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid annotation-metrics";
  addDetail(metrics, "Readiness", readinessLabel(documentReadiness(item)));
  addDetail(metrics, "Citation", `${entry.checks.length - entry.missing.length}/${entry.checks.length}`);
  addDetail(metrics, "People", entry.people.length);
  addDetail(metrics, "Diary", context.diary.length);
  addDetail(metrics, "Public", context.publicAnchors.length);
  addDetail(metrics, "Risk", entry.gap?.priority || "None");

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  if (item.url) actions.append(linkButton("Source", item.url));
  if (item.pdfUrl) actions.append(linkButton("PDF", item.pdfUrl));
  actions.append(packetActionButton("Chronology", () => showLaneDocuments(item.laneId)));
  if (context.diary.length) actions.append(packetActionButton("Diary", () => showLaneDiary(item.laneId)));
  if (context.publicAnchors.length) actions.append(packetActionButton("Backtrace", () => scrollToSection("#backtrace")));
  if (entry.people.length) actions.append(packetActionButton("People", () => showPersonProfile(entry.people[0].name)));
  if (entry.pull) actions.append(packetActionButton("Library", () => showLaneLibrary(item.laneId)));
  if (entry.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(item.laneId)));
  actions.append(clipboardButton("Copy annotation", annotationNote(entry), "Annotation copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Citation fields",
      packetList(
        entry.checks,
        (check) => `${check.present ? "OK" : "Missing"}: ${check.label}`,
        (check) => (check.present ? check.value : "Add before final citation."),
        "No citation fields checked."
      )
    ),
    packetBlock(
      "People and date checks",
      packetList(
        annotationTargetItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No people, Diary, or public-anchor checks mapped yet."
      )
    ),
    packetBlock(
      "Source route",
      packetList(
        annotationRouteItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No pull, lead, or gap route mapped yet."
      )
    ),
    actions
  );

  return card;
}

function annotationTargetItems(entry) {
  return [
    ...entry.people.map((person) => ({ title: `Person: ${person.name}`, detail: person.role })),
    ...entry.context.diary.map((diary) => ({
      title: `Diary: ${diary.title}`,
      detail: `${formatDate(diary.date)} / ${diary.time || "time not listed"} / ${diary.eventType || "calendar cue"}`
    })),
    ...entry.context.publicAnchors.map((anchor) => ({
      title: `Public: ${anchor.title}`,
      detail: `${formatDate(anchor.date)} / ${anchor.repository || anchor.collection || "public record"}`
    }))
  ].slice(0, 8);
}

function annotationRouteItems(entry) {
  return [
    entry.pull
      ? {
          title: `Pull: ${entry.pull.title}`,
          detail: entry.pull.visitGoal || entry.pull.sourcePart || entry.pull.whyItMatters || "Pull target mapped"
        }
      : null,
    ...entry.leads.map((lead) => ({
      title: `Lead: ${lead.title}`,
      detail: lead.identifier || lead.note || lead.institution || "Source lead mapped"
    })),
    entry.gap
      ? {
          title: `Gap: ${entry.gap.title}`,
          detail: entry.gap.remainingRisk || entry.gap.needed || entry.gap.problem || "Gap tracker item mapped"
        }
      : null
  ].filter(Boolean);
}

function annotationNote(entry) {
  const { item, context } = entry;
  return noteLines([
    `Annotation prep ${entry.number}: ${formatDate(item.date)} - ${item.title}`,
    `Lane: ${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}`,
    `Stage: ${entry.stage}`,
    `Readiness: ${readinessLabel(documentReadiness(item))}`,
    `Citation completeness: ${entry.checks.length - entry.missing.length}/${entry.checks.length}`,
    entry.missing.length ? `Missing citation fields: ${entry.missing.map((check) => check.label).join("; ")}` : "Missing citation fields: none",
    item.repository ? `Repository: ${item.repository}` : "",
    item.collection ? `Collection: ${item.collection}` : "",
    item.identifier ? `Identifier: ${item.identifier}` : "",
    item.pages ? `Pages: ${item.pages}` : "",
    item.sourceNote ? `Source note: ${item.sourceNote}` : "",
    item.summary ? `Selection reason: ${item.summary}` : "",
    entry.people.length ? `People/offices to verify: ${entry.people.map((person) => `${person.name} (${person.role})`).join("; ")}` : "",
    context.diary.length ? `Diary cues: ${context.diary.map((diary) => `${formatDate(diary.date)} - ${diary.title}`).join("; ")}` : "",
    context.publicAnchors.length ? `Public anchors: ${context.publicAnchors.map((anchor) => `${formatDate(anchor.date)} - ${anchor.title}`).join("; ")}` : "",
    entry.pull ? `Pull target: ${entry.pull.title}` : "",
    entry.leads.length ? `Source leads: ${entry.leads.map((lead) => `${lead.title}${lead.identifier ? ` / ${lead.identifier}` : ""}`).join("; ")}` : "",
    entry.gap ? `Open risk: ${entry.gap.title} - ${entry.gap.remainingRisk || entry.gap.needed || entry.gap.problem || ""}` : "",
    item.url ? `Source URL: ${item.url}` : "",
    item.pdfUrl ? `PDF/review copy: ${item.pdfUrl}` : "",
    "Compiler check: confirm citation form, classification/release status, participant names, editorial annotation hooks, and whether the record remains in sequence."
  ]);
}

function annotationQueueNote(entries) {
  const missingCount = entries.filter((entry) => entry.missing.length).length;
  const pullCount = entries.filter((entry) => documentReadiness(entry.item) === "pull-lead").length;
  return noteLines([
    "Annotation and citation queue",
    `${entries.length} provisional sequence candidates; ${missingCount} need citation-field fixes; ${pullCount} are pull-before-annotation leads.`,
    ...entries.map((entry) => {
      const missing = entry.missing.length ? `missing ${entry.missing.map((check) => check.label).join(", ")}` : "citation ready";
      return `${entry.number}. ${formatDate(entry.item.date)} / ${laneNumber(entry.item.laneId)} / ${entry.stage} / ${entry.item.title} / ${missing}`;
    })
  ]);
}

function renderDocumentManuscripts() {
  renderList(nodes.manuscriptsRoot, documentManuscriptItems(), documentManuscriptCard, "No document manuscript stubs loaded.");
}

function documentManuscriptItems() {
  return annotationItems().map((entry) => {
    const item = entry.item;
    const ledgers = sourceCopyLedger.filter((ledger) => ledger.laneId === item.laneId);
    const pool = sourcePools
      .filter((sourcePool) => sourcePool.laneId === item.laneId)
      .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
    const readiness = documentReadiness(item);
    const sourceReady = readiness !== "pull-lead" && !entry.missing.length;
    const stage = sourceReady && entry.stage === "Draft-ready" ? "Manuscript-ready" : sourceReady ? "Apparatus check" : entry.stage;
    return { ...entry, ledgers, pool, readiness, sourceReady, manuscriptStage: stage };
  });
}

function documentManuscriptCard(entry) {
  const { item, context } = entry;
  const card = document.createElement("article");
  card.className = `manuscript-card priority-${(entry.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`Doc ${entry.number.toString().padStart(2, "0")}`), textSpan(formatDate(item.date)), textSpan(laneNumber(item.laneId)), textSpan(entry.manuscriptStage));

  const title = document.createElement("h3");
  title.textContent = manuscriptTitle(entry);

  const summary = document.createElement("p");
  summary.textContent = `${readinessLabel(entry.readiness)} candidate for ${laneTitle(item.laneId)}. ${item.summary || "Use this stub as the working manuscript shell pending final source verification."}`;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid manuscript-metrics";
  addDetail(metrics, "Readiness", readinessLabel(entry.readiness));
  addDetail(metrics, "Citation", `${entry.checks.length - entry.missing.length}/${entry.checks.length}`);
  addDetail(metrics, "People", entry.people.length);
  addDetail(metrics, "Diary", context.diary.length);
  addDetail(metrics, "Public", context.publicAnchors.length);
  addDetail(metrics, "Risk", entry.gap?.priority || "None");

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Chronology", () => showLaneDocuments(item.laneId)));
  actions.append(packetActionButton("Sequence", () => scrollToSection("#sequence")));
  actions.append(packetActionButton("Annotate", () => scrollToSection("#annotations")));
  if (entry.pull) actions.append(packetActionButton("Library", () => showLaneLibrary(item.laneId)));
  if (entry.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(item.laneId)));
  actions.append(clipboardButton("Copy stub", documentManuscriptNote(entry), "Manuscript stub copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Manuscript head",
      packetList(
        manuscriptHeadItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No manuscript heading fields mapped yet."
      )
    ),
    packetBlock(
      "Working source note",
      packetList(
        manuscriptSourceNoteItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No source note fields mapped yet."
      )
    ),
    packetBlock(
      "Editorial apparatus",
      packetList(
        manuscriptApparatusItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No editorial apparatus prompts mapped yet."
      )
    ),
    packetBlock(
      "Before circulation",
      packetList(
        manuscriptCautionItems(entry),
        (target) => target.title,
        (target) => target.detail,
        "No pre-circulation cautions remain."
      )
    ),
    actions
  );

  return card;
}

function manuscriptTitle(entry) {
  return `Provisional Document ${entry.number}: ${entry.item.title}`;
}

function manuscriptHeadItems(entry) {
  const item = entry.item;
  return [
    { title: "Document heading", detail: manuscriptTitle(entry) },
    { title: "Date line", detail: formatDate(item.date) },
    { title: "Chapter lane", detail: `${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}` },
    { title: "Document type", detail: item.type || "Type pending" },
    { title: "Selection reason", detail: item.summary || "Add selection rationale before draft circulation." }
  ];
}

function manuscriptSourceNoteItems(entry) {
  const item = entry.item;
  return [
    { title: "Working source note", detail: workingSourceNote(entry) },
    item.repository ? { title: "Repository", detail: item.repository } : null,
    item.collection ? { title: "Collection", detail: item.collection } : null,
    item.identifier ? { title: "Identifier", detail: item.identifier } : null,
    item.pages || item.pageCount ? { title: "Pages", detail: item.pages || item.pageCount } : null,
    item.pdfUrl ? { title: "Review copy", detail: item.pdfUrl } : null,
    entry.ledgers[0]
      ? {
          title: `Ledger: ${entry.ledgers[0].title}`,
          detail: entry.ledgers[0].reviewCue || entry.ledgers[0].repositoryTrail || entry.ledgers[0].sourceClass
        }
      : null
  ].filter(Boolean).slice(0, 7);
}

function manuscriptApparatusItems(entry) {
  return [
    ...entry.people.slice(0, 4).map((person) => ({ title: `Person/office: ${person.name}`, detail: person.role })),
    ...entry.context.diary.slice(0, 3).map((diary) => ({
      title: `Diary cue: ${diary.title}`,
      detail: `${formatDate(diary.date)} / ${diary.time || "time not listed"} / ${diary.volumeConnection || diary.eventType || "calendar cue"}`
    })),
    ...entry.context.publicAnchors.slice(0, 2).map((anchor) => ({
      title: `Public anchor: ${anchor.title}`,
      detail: `${formatDate(anchor.date)} / ${anchor.repository || anchor.collection || "public record"}`
    }))
  ].slice(0, 8);
}

function manuscriptCautionItems(entry) {
  return [
    ...entry.missing.map((check) => ({ title: `Missing citation: ${check.label}`, detail: "Add before source-note circulation." })),
    entry.readiness === "pull-lead"
      ? {
          title: "Pull before selection",
          detail: entry.pull?.visitGoal || entry.pull?.whyItMatters || entry.pull?.sourcePart || "Verify item-level text before treating as a manuscript document."
        }
      : null,
    entry.gap
      ? {
          title: `${entry.gap.priority} gap: ${entry.gap.title}`,
          detail: entry.gap.remainingRisk || entry.gap.needed || entry.gap.problem || "Gap tracker item mapped."
        }
      : null,
    entry.pool
      ? {
          title: `Source pool: ${entry.pool.title}`,
          detail: entry.pool.nextUse || entry.pool.coverage || entry.pool.institution || "Source pool mapped."
        }
      : null
  ].filter(Boolean).slice(0, 8);
}

function workingSourceNote(entry) {
  const item = entry.item;
  const fields = [
    item.repository,
    item.collection,
    item.identifier,
    item.pages ? `pp. ${item.pages}` : item.pageCount ? `${item.pageCount} pages` : "",
    item.sourceNote
  ].filter(Boolean);
  if (!fields.length) return "Working source note pending item-level citation fields.";
  return fields.join("; ");
}

function documentManuscriptNote(entry) {
  const item = entry.item;
  return noteLines([
    manuscriptTitle(entry),
    `Date: ${formatDate(item.date)}`,
    `Chapter lane: ${laneNumber(item.laneId)} / ${laneTitle(item.laneId)}`,
    `Manuscript stage: ${entry.manuscriptStage}`,
    `Readiness: ${readinessLabel(entry.readiness)}`,
    `Working source note: ${workingSourceNote(entry)}`,
    item.repository ? `Repository: ${item.repository}` : "",
    item.collection ? `Collection: ${item.collection}` : "",
    item.identifier ? `Identifier: ${item.identifier}` : "",
    item.pages ? `Pages: ${item.pages}` : "",
    item.pdfUrl ? `Review copy/PDF: ${item.pdfUrl}` : "",
    item.url ? `Source URL: ${item.url}` : "",
    item.summary ? `Selection reason: ${item.summary}` : "",
    "Editorial apparatus:",
    ...manuscriptApparatusItems(entry).map((target) => `- ${target.title}: ${target.detail}`),
    entry.missing.length ? "Citation fixes:" : "Citation fixes: none",
    ...entry.missing.map((check) => `- ${check.label}: add before source-note circulation.`),
    manuscriptCautionItems(entry).length ? "Before circulation:" : "Before circulation: no additional caution flagged",
    ...manuscriptCautionItems(entry).map((target) => `- ${target.title}: ${target.detail}`),
    "Draft body placeholder: insert verified document text or prepare extract/summary only after source-copy and clearance review.",
    "Compiler check: provisional number only; confirm official numbering, classification line, source note, participants, annotation hooks, and whether this item remains in the final FRUS sequence."
  ]);
}

function documentManuscriptBoardNote(entries) {
  const ready = entries.filter((entry) => entry.manuscriptStage === "Manuscript-ready").length;
  const pulls = entries.filter((entry) => entry.readiness === "pull-lead").length;
  const fixes = entries.filter((entry) => entry.missing.length).length;
  return noteLines([
    "Document manuscript builder",
    `${entries.length} provisional manuscript stubs from the document selection sequence; ${ready} manuscript-ready, ${fixes} need citation fixes, ${pulls} require pull-before-selection.`,
    ...entries.map((entry) => `${entry.number}. ${formatDate(entry.item.date)} / ${laneNumber(entry.item.laneId)} / ${entry.manuscriptStage} / ${entry.item.title}`)
  ]);
}

function renderClearanceRouter() {
  renderList(nodes.clearanceRoot, clearanceItems(), clearanceCard, "No clearance routing items loaded.");
}

function clearanceItems() {
  return documentManuscriptItems().map((entry) => {
    const routes = clearanceRoutes(entry);
    const blockers = clearanceBlockers(entry);
    const sourceHandling = clearanceSourceHandling(entry);
    const status = clearanceStatus(entry, blockers);
    return { ...entry, routes, blockers, sourceHandling, clearanceStatus: status };
  });
}

function clearanceRoutes(entry) {
  const common = [
    {
      title: "Office of the Historian",
      detail: "Final FRUS selection, source-note form, annotation readiness, and volume-boundary control."
    },
    {
      title: "Clinton Library/NARA",
      detail: "Source-copy trail, release packet, folder pull, withdrawal-sheet, and page-span verification."
    }
  ];
  const byLane = {
    "strategic-stability": [
      { title: "NSC Defense Policy and Arms Control", detail: "START, ABM, early-warning, and summit-prep equities." },
      { title: "Department of State EUR/Talbott channel", detail: "Russia diplomacy, leader-meeting memoranda, and Strobe Talbott source trails." },
      { title: "Defense/Joint Staff", detail: "Strategic-force, missile-defense, and military-planning equities." }
    ],
    ctbt: [
      { title: "State/ACDA arms-control offices", detail: "CTBT negotiation, ratification, and treaty-policy equities." },
      { title: "Department of Energy/Nuclear weapons complex", detail: "Stockpile stewardship, testing, and verification equities." },
      { title: "Congressional/Senate record check", detail: "Ratification record, public statements, and Senate action anchors." }
    ],
    "abm-nmd": [
      { title: "NSC Defense Policy", detail: "ABM/NMD policy, allied consultation, and presidential decision equities." },
      { title: "Defense/Missile defense offices", detail: "NMD program, deployment, and technical-policy equities." },
      { title: "Department of State EUR and PM", detail: "Russia, NATO, and arms-control consultation equities." }
    ],
    "fissile-ctr": [
      { title: "Department of Energy", detail: "Plutonium disposition, HEU/CTR, and nuclear-material security equities." },
      { title: "NSC Nonproliferation", detail: "Fissile-material, CTR, and Russia/F.S.U. policy coordination." },
      { title: "Department of Defense/CTR", detail: "Cooperative Threat Reduction implementation and program equities." }
    ],
    "nonproliferation-regimes": [
      { title: "NSC Nonproliferation", detail: "NPT, MTCR, export-control, and multilateral regime policy coordination." },
      { title: "State Nonproliferation/ACDA", detail: "Treaty-regime, export-control, and diplomatic implementation equities." },
      { title: "Commerce/Justice check if export controls appear", detail: "Export-control enforcement and statutory-record cross-check." }
    ],
    "regional-proliferation": [
      { title: "State regional bureaus", detail: "South Asia, DPRK, Iran, Iraq, China, and regional diplomatic equities." },
      { title: "NSC Nonproliferation and regional directorates", detail: "Regional crisis coordination, missile diplomacy, and proliferation response." },
      { title: "Intelligence community review prompt", detail: "Use only as an equity flag where cables, assessments, or source-sensitive references appear." }
    ],
    cbw: [
      { title: "State/ACDA CBW offices", detail: "CWC/BWC implementation, verification, and treaty-policy equities." },
      { title: "NSC Nonproliferation", detail: "CBW terrorism, treaty implementation, and interagency coordination." },
      { title: "Defense/Health agencies if implementation details appear", detail: "Use as a routing prompt for operational, destruction, or preparedness material." }
    ],
    "conventional-cfe": [
      { title: "State EUR/PM", detail: "CFE adaptation, NATO/Russia, arms transfers, and conventional-force equities." },
      { title: "Defense/Joint Staff", detail: "Conventional-force, NATO, and military posture equities." },
      { title: "NATO/OSCE public-record check", detail: "Public treaty endpoints and allied consultation anchors." }
    ]
  };
  return [...common, ...(byLane[entry.item.laneId] || [])];
}

function clearanceBlockers(entry) {
  return [
    entry.readiness === "pull-lead"
      ? {
          title: "Do not circulate as manuscript yet",
          detail: "This is a pull-before-selection lead; first verify item-level text, source copy, pages, and release status."
        }
      : null,
    ...entry.missing.map((check) => ({
      title: `Citation blocker: ${check.label}`,
      detail: "Resolve before routing a source note."
    })),
    entry.gap && priorityValue(entry.gap.priority) <= 2
      ? {
          title: `${entry.gap.priority} gap: ${entry.gap.title}`,
          detail: entry.gap.remainingRisk || entry.gap.needed || entry.gap.problem || "High-priority gap mapped."
        }
      : null,
    documentReadiness(entry.item) === "public-anchor"
      ? {
          title: "Public anchor only",
          detail: "Backtrace to internal records before treating as a private-document manuscript."
        }
      : null
  ].filter(Boolean);
}

function clearanceSourceHandling(entry) {
  return [
    { title: "Readiness", detail: readinessLabel(entry.readiness) },
    { title: "Working source note", detail: workingSourceNote(entry) },
    entry.item.pdfUrl ? { title: "Review copy/PDF", detail: entry.item.pdfUrl } : null,
    entry.item.sourceNote ? { title: "Source note cue", detail: entry.item.sourceNote } : null,
    entry.ledgers[0]
      ? {
          title: `Ledger: ${entry.ledgers[0].title}`,
          detail: entry.ledgers[0].reviewCue || entry.ledgers[0].repositoryTrail || entry.ledgers[0].sourceClass
        }
      : null,
    entry.pull
      ? {
          title: `Pull target: ${entry.pull.title}`,
          detail: entry.pull.visitGoal || entry.pull.whyItMatters || entry.pull.sourcePart || "Pull target mapped."
        }
      : null
  ].filter(Boolean).slice(0, 6);
}

function clearanceStatus(entry, blockers) {
  if (entry.readiness === "pull-lead") return "Hold for pull";
  if (blockers.length) return "Route with cautions";
  if (entry.manuscriptStage === "Manuscript-ready") return "Ready for equity review";
  return "Apparatus check";
}

function clearanceCard(entry) {
  const card = document.createElement("article");
  card.className = `clearance-card status-${closeoutStatusClass(entry.clearanceStatus)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`Doc ${entry.number.toString().padStart(2, "0")}`), textSpan(entry.clearanceStatus), textSpan(laneNumber(entry.item.laneId)));

  const title = document.createElement("h3");
  title.textContent = entry.item.title;

  const summary = document.createElement("p");
  summary.textContent = `${entry.routes.length} likely equity routes and ${plural(entry.blockers.length, "blocker")} for this provisional manuscript.`;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid clearance-metrics";
  addDetail(metrics, "Routes", entry.routes.length);
  addDetail(metrics, "Blockers", entry.blockers.length);
  addDetail(metrics, "Citation", `${entry.checks.length - entry.missing.length}/${entry.checks.length}`);
  addDetail(metrics, "Diary", entry.context.diary.length);
  addDetail(metrics, "Risk", entry.gap?.priority || "None");
  addDetail(metrics, "Readiness", readinessLabel(entry.readiness));

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Manuscript", () => scrollToSection("#manuscripts")));
  actions.append(packetActionButton("Annotate", () => scrollToSection("#annotations")));
  if (entry.pull) actions.append(packetActionButton("Library", () => showLaneLibrary(entry.item.laneId)));
  if (entry.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(entry.item.laneId)));
  actions.append(clipboardButton("Copy routing", clearanceNote(entry), "Routing copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Likely equities",
      packetList(
        entry.routes,
        (route) => route.title,
        (route) => route.detail,
        "No equity routes mapped yet."
      )
    ),
    packetBlock(
      "Source handling",
      packetList(
        entry.sourceHandling,
        (item) => item.title,
        (item) => item.detail,
        "No source handling cues mapped yet."
      )
    ),
    packetBlock(
      "Blockers",
      packetList(
        entry.blockers,
        (blocker) => blocker.title,
        (blocker) => blocker.detail,
        "No routing blockers flagged."
      )
    ),
    actions
  );

  return card;
}

function clearanceNote(entry) {
  return noteLines([
    `Clearance routing - provisional document ${entry.number}: ${entry.item.title}`,
    `Date: ${formatDate(entry.item.date)}`,
    `Lane: ${laneNumber(entry.item.laneId)} / ${laneTitle(entry.item.laneId)}`,
    `Status: ${entry.clearanceStatus}`,
    `Readiness: ${readinessLabel(entry.readiness)}`,
    "Likely equities:",
    ...entry.routes.map((route) => `- ${route.title}: ${route.detail}`),
    "Source handling:",
    ...entry.sourceHandling.map((item) => `- ${item.title}: ${item.detail}`),
    entry.blockers.length ? "Blockers before circulation:" : "Blockers before circulation: none flagged",
    ...entry.blockers.map((blocker) => `- ${blocker.title}: ${blocker.detail}`),
    entry.context.diary.length ? "Diary cues:" : "",
    ...entry.context.diary.slice(0, 4).map((diary) => `- ${formatDate(diary.date)} / ${diary.time || "time not listed"} / ${diary.title}`),
    "Compiler check: this is a routing prompt, not an official clearance determination; confirm final equity routing with the Office of the Historian process."
  ]);
}

function clearanceBoardNote(items) {
  const hold = items.filter((item) => item.clearanceStatus === "Hold for pull").length;
  const caution = items.filter((item) => item.clearanceStatus === "Route with cautions").length;
  const ready = items.filter((item) => item.clearanceStatus === "Ready for equity review").length;
  return noteLines([
    "Clearance routing matrix",
    `${items.length} provisional manuscript records; ${ready} ready for equity review, ${caution} route with cautions, ${hold} hold for pull.`,
    ...items.map((item) => `${item.number}. ${formatDate(item.item.date)} / ${laneNumber(item.item.laneId)} / ${item.clearanceStatus} / routes: ${item.routes.map((route) => route.title).join("; ")}`)
  ]);
}

function renderCirculationBatches() {
  renderList(nodes.circulationRoot, circulationBatchItems(), circulationBatchCard, "No circulation batches loaded.");
}

function circulationBatchItems() {
  const routed = clearanceItems();
  return lanes
    .filter((lane) => lane.id !== "volume-control")
    .map((lane) => {
      const items = routed.filter((entry) => entry.item.laneId === lane.id);
      const ready = items.filter((entry) => entry.clearanceStatus === "Ready for equity review");
      const caution = items.filter((entry) => entry.clearanceStatus === "Route with cautions" || entry.clearanceStatus === "Apparatus check");
      const hold = items.filter((entry) => entry.clearanceStatus === "Hold for pull");
      const blockers = items.flatMap((entry) => entry.blockers.map((blocker) => ({ ...blocker, entry })));
      const routes = uniqueRouteItems(items.flatMap((entry) => entry.routes));
      const status = circulationBatchStatus(items, ready, caution, hold);
      return { lane, items, ready, caution, hold, blockers, routes, status };
    });
}

function circulationBatchStatus(items, ready, caution, hold) {
  if (!items.length) return "No packet";
  if (ready.length && (caution.length || hold.length)) return "Ready subset";
  if (ready.length === items.length) return "Ready to circulate";
  if (hold.length === items.length) return "Hold for pulls";
  if (caution.length) return "Route with cautions";
  return "Apparatus check";
}

function uniqueRouteItems(routes) {
  const seen = new Map();
  for (const route of routes) {
    if (!seen.has(route.title)) seen.set(route.title, route);
  }
  return [...seen.values()];
}

function circulationBatchCard(batch) {
  const card = document.createElement("article");
  card.className = `circulation-card status-${closeoutStatusClass(batch.status)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(batch.lane.number), textSpan(batch.status), textSpan(plural(batch.items.length, "document")));

  const title = document.createElement("h3");
  title.textContent = batch.lane.title;

  const summary = document.createElement("p");
  summary.textContent = circulationBatchSummary(batch);

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid circulation-metrics";
  addDetail(metrics, "Docs", batch.items.length);
  addDetail(metrics, "Ready", batch.ready.length);
  addDetail(metrics, "Cautions", batch.caution.length);
  addDetail(metrics, "Holds", batch.hold.length);
  addDetail(metrics, "Routes", batch.routes.length);
  addDetail(metrics, "Blockers", batch.blockers.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Clearance", () => scrollToSection("#clearance")));
  actions.append(packetActionButton("Manuscripts", () => scrollToSection("#manuscripts")));
  if (batch.items.length) actions.append(packetActionButton("Sequence", () => scrollToSection("#sequence")));
  if (batch.blockers.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(batch.lane.id)));
  actions.append(clipboardButton("Copy batch", circulationBatchNote(batch), "Batch copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Cover memo frame",
      packetList(
        circulationCoverItems(batch),
        (item) => item.title,
        (item) => item.detail,
        "No cover memo fields mapped yet."
      )
    ),
    packetBlock(
      "Documents in packet",
      packetList(
        batch.items.slice(0, 8),
        (entry) => `Doc ${entry.number}: ${entry.item.title}`,
        (entry) => `${formatDate(entry.item.date)} / ${entry.clearanceStatus} / ${readinessLabel(entry.readiness)}`,
        "No provisional manuscript documents mapped for this chapter."
      )
    ),
    packetBlock(
      "Likely equity routes",
      packetList(
        batch.routes.slice(0, 8),
        (route) => route.title,
        (route) => route.detail,
        "No equity routes mapped yet."
      )
    ),
    packetBlock(
      "Blockers before circulation",
      packetList(
        batch.blockers.slice(0, 8),
        (blocker) => `Doc ${blocker.entry.number}: ${blocker.title}`,
        (blocker) => blocker.detail,
        "No batch blockers flagged."
      )
    ),
    actions
  );

  return card;
}

function circulationBatchSummary(batch) {
  if (!batch.items.length) return "No provisional manuscript records are ready for this chapter lane yet; use the sequence, source requests, and closeout boards before drafting a circulation packet.";
  if (batch.status === "Ready to circulate") return "All provisional manuscript records in this lane have no routing blockers flagged and can be reviewed as one circulation packet.";
  if (batch.status === "Ready subset") return `${plural(batch.ready.length, "document")} can circulate as a ready subset while ${plural(batch.caution.length + batch.hold.length, "document")} remain held or caution-marked.`;
  if (batch.status === "Hold for pulls") return "Every mapped manuscript record in this lane is still a pull-before-selection item; keep this out of circulation until source text is verified.";
  return `${plural(batch.items.length, "document")} are mapped, but caution or apparatus checks remain before the batch should be represented as ready.`;
}

function circulationCoverItems(batch) {
  return [
    { title: "Subject", detail: `${batch.lane.title} circulation packet` },
    { title: "Scope", detail: batch.items.length ? `${plural(batch.items.length, "provisional document")} from ${batch.items[0] ? formatDate(batch.items[0].item.date) : "opening date"} through ${batch.items.at(-1) ? formatDate(batch.items.at(-1).item.date) : "closing date"}.` : "No provisional documents selected yet." },
    { title: "Status line", detail: batch.status },
    { title: "Ready subset", detail: batch.ready.length ? batch.ready.map((entry) => `Doc ${entry.number}`).join(", ") : "No ready subset yet." },
    { title: "Held/caution records", detail: batch.caution.length || batch.hold.length ? [...batch.caution, ...batch.hold].map((entry) => `Doc ${entry.number} (${entry.clearanceStatus})`).join(", ") : "None flagged." },
    { title: "Compiler instruction", detail: "Attach manuscript stubs, source-note base, routing notes, and unresolved blocker list before circulation." }
  ];
}

function circulationBatchNote(batch) {
  return noteLines([
    `${batch.lane.number} / ${batch.lane.title} circulation batch`,
    `Batch status: ${batch.status}`,
    `Documents: ${batch.items.length}; ready: ${batch.ready.length}; cautions: ${batch.caution.length}; holds: ${batch.hold.length}; blockers: ${batch.blockers.length}`,
    "Cover memo frame:",
    ...circulationCoverItems(batch).map((item) => `- ${item.title}: ${item.detail}`),
    batch.items.length ? "Documents in packet:" : "Documents in packet: none",
    ...batch.items.map((entry) => `- Doc ${entry.number}: ${formatDate(entry.item.date)} / ${entry.clearanceStatus} / ${entry.item.title}`),
    batch.routes.length ? "Likely equity routes:" : "",
    ...batch.routes.map((route) => `- ${route.title}: ${route.detail}`),
    batch.blockers.length ? "Blockers before circulation:" : "Blockers before circulation: none flagged",
    ...batch.blockers.map((blocker) => `- Doc ${blocker.entry.number} / ${blocker.title}: ${blocker.detail}`),
    "Compiler check: circulate only after source-copy verification, source-note review, and Office of the Historian confirmation of the appropriate equity route."
  ]);
}

function circulationBoardNote(batches) {
  const ready = batches.filter((batch) => batch.status === "Ready to circulate").length;
  const subset = batches.filter((batch) => batch.status === "Ready subset").length;
  const empty = batches.filter((batch) => batch.status === "No packet").length;
  return noteLines([
    "Circulation batch planner",
    `${batches.length} chapter lanes; ${ready} ready to circulate, ${subset} ready subset, ${empty} no packet yet.`,
    ...batches.map((batch) => `${batch.lane.number}. ${batch.lane.title}: ${batch.status}; docs ${batch.items.length}; ready ${batch.ready.length}; blockers ${batch.blockers.length}`)
  ]);
}

function renderDecisionLedger() {
  renderList(nodes.decisionsRoot, decisionItems(), decisionCard, "No document decisions loaded.");
}

function decisionItems() {
  return clearanceItems().map((entry) => {
    const decision = decisionStatus(entry);
    const rationale = decisionRationale(entry, decision);
    const replacement = decisionReplacement(entry, decision);
    const proof = decisionProofItems(entry);
    return { ...entry, decision, rationale, replacement, proof };
  });
}

function decisionStatus(entry) {
  if (entry.readiness === "pull-lead") return "Hold for pull";
  if (entry.readiness === "formal-record") return entry.blockers.length ? "Formal anchor with cautions" : "Formal anchor";
  if (entry.clearanceStatus === "Ready for equity review") return "Select provisionally";
  if (entry.missing.length) return "Source-note fix before select";
  if (entry.blockers.length) return "Select with cautions";
  return "Select provisionally";
}

function decisionRationale(entry, decision) {
  const item = entry.item;
  if (decision === "Hold for pull") return entry.pull?.visitGoal || item.summary || "Folder/source path is useful, but item-level text must be verified before selection.";
  if (decision === "Formal anchor" || decision === "Formal anchor with cautions") return item.summary || "Useful formal/public record for chronology and treaty context; pair with internal records where possible.";
  if (decision === "Source-note fix before select") return `Substantive candidate, but source-note fields are incomplete: ${entry.missing.map((check) => check.label).join(", ")}.`;
  if (decision === "Select with cautions") return entry.blockers[0]?.detail || item.summary || "Substantive candidate with clearance or source caution still attached.";
  return item.summary || "Substantive candidate with review-copy or formal source path mapped into the provisional sequence.";
}

function decisionReplacement(entry, decision) {
  if (decision === "Hold for pull") return entry.pull?.title ? `Pull and itemize ${entry.pull.title}; replace this lead with verified document text if available.` : "Replace with verified item-level text after source pull.";
  if (entry.blockers.length) return "Resolve blockers or replace with a nearby review-copy/internal source from the same lane.";
  if (entry.context.publicAnchors.length) return `Use nearby public anchor only as chronology support: ${entry.context.publicAnchors[0].title}.`;
  if (entry.context.diary.length) return `Diary can support date/participant annotation: ${entry.context.diary[0].title}.`;
  return "No replacement trigger flagged; keep under review as sequence balance changes.";
}

function decisionProofItems(entry) {
  return [
    { title: "Sequence position", detail: `Provisional document ${entry.number}` },
    { title: "Readiness", detail: readinessLabel(entry.readiness) },
    { title: "Source note", detail: workingSourceNote(entry) },
    entry.item.pdfUrl ? { title: "Review copy", detail: entry.item.pdfUrl } : null,
    entry.context.diary[0]
      ? {
          title: `Diary cue: ${entry.context.diary[0].title}`,
          detail: `${formatDate(entry.context.diary[0].date)} / ${entry.context.diary[0].time || "time not listed"}`
        }
      : null,
    entry.context.publicAnchors[0]
      ? {
          title: `Public anchor: ${entry.context.publicAnchors[0].title}`,
          detail: formatDate(entry.context.publicAnchors[0].date)
        }
      : null
  ].filter(Boolean).slice(0, 6);
}

function decisionCard(entry) {
  const card = document.createElement("article");
  card.className = `decision-card status-${closeoutStatusClass(entry.decision)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`Doc ${entry.number.toString().padStart(2, "0")}`), textSpan(entry.decision), textSpan(laneNumber(entry.item.laneId)));

  const title = document.createElement("h3");
  title.textContent = entry.item.title;

  const summary = document.createElement("p");
  summary.textContent = entry.rationale;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid decision-metrics";
  addDetail(metrics, "Readiness", readinessLabel(entry.readiness));
  addDetail(metrics, "Citation", `${entry.checks.length - entry.missing.length}/${entry.checks.length}`);
  addDetail(metrics, "Blockers", entry.blockers.length);
  addDetail(metrics, "Diary", entry.context.diary.length);
  addDetail(metrics, "Public", entry.context.publicAnchors.length);
  addDetail(metrics, "Routes", entry.routes.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Sequence", () => scrollToSection("#sequence")));
  actions.append(packetActionButton("Manuscript", () => scrollToSection("#manuscripts")));
  actions.append(packetActionButton("Clearance", () => scrollToSection("#clearance")));
  if (entry.pull) actions.append(packetActionButton("Library", () => showLaneLibrary(entry.item.laneId)));
  if (entry.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(entry.item.laneId)));
  actions.append(clipboardButton("Copy decision", decisionNote(entry), "Decision copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Decision basis",
      packetList(
        decisionBasisItems(entry),
        (item) => item.title,
        (item) => item.detail,
        "No decision basis mapped yet."
      )
    ),
    packetBlock(
      "Proof trail",
      packetList(
        entry.proof,
        (item) => item.title,
        (item) => item.detail,
        "No proof trail mapped yet."
      )
    ),
    packetBlock(
      "Replacement trigger",
      packetList(
        [{ title: entry.decision, detail: entry.replacement }],
        (item) => item.title,
        (item) => item.detail,
        "No replacement trigger mapped."
      )
    ),
    actions
  );

  return card;
}

function decisionBasisItems(entry) {
  return [
    { title: "Selection rationale", detail: entry.rationale },
    { title: "Decision", detail: entry.decision },
    { title: "Chapter lane", detail: `${laneNumber(entry.item.laneId)} / ${laneTitle(entry.item.laneId)}` },
    { title: "Clearance status", detail: entry.clearanceStatus },
    entry.blockers.length ? { title: "Open blocker", detail: `${entry.blockers[0].title}: ${entry.blockers[0].detail}` } : null
  ].filter(Boolean);
}

function decisionNote(entry) {
  return noteLines([
    `Selection decision - provisional document ${entry.number}: ${entry.item.title}`,
    `Date: ${formatDate(entry.item.date)}`,
    `Lane: ${laneNumber(entry.item.laneId)} / ${laneTitle(entry.item.laneId)}`,
    `Decision: ${entry.decision}`,
    `Rationale: ${entry.rationale}`,
    `Readiness: ${readinessLabel(entry.readiness)}`,
    `Clearance status: ${entry.clearanceStatus}`,
    `Working source note: ${workingSourceNote(entry)}`,
    entry.blockers.length ? "Blockers:" : "Blockers: none flagged",
    ...entry.blockers.map((blocker) => `- ${blocker.title}: ${blocker.detail}`),
    "Proof trail:",
    ...entry.proof.map((item) => `- ${item.title}: ${item.detail}`),
    `Replacement trigger: ${entry.replacement}`,
    "Compiler check: keep this rationale provisional until final source pull, document balance, clearance, and Office of the Historian selection review are complete."
  ]);
}

function decisionBoardNote(entries) {
  const counts = uniqueSorted(entries.map((entry) => entry.decision)).map((decision) => `${decision}: ${entries.filter((entry) => entry.decision === decision).length}`);
  return noteLines([
    "Document decision ledger",
    `${entries.length} provisional document decisions from the selection sequence.`,
    `Decision counts: ${counts.join("; ")}`,
    ...entries.map((entry) => `${entry.number}. ${formatDate(entry.item.date)} / ${laneNumber(entry.item.laneId)} / ${entry.decision} / ${entry.item.title}`)
  ]);
}

function renderApparatusPack() {
  renderList(nodes.apparatusRoot, apparatusItems(), apparatusCard, "No editorial apparatus packs loaded.");
}

function apparatusItems() {
  return decisionItems().map((entry) => {
    const hooks = apparatusHookItems(entry);
    const sourceChecks = apparatusSourceCheckItems(entry);
    const indexTerms = apparatusIndexTerms(entry);
    const cautions = apparatusCautionItems(entry, hooks);
    const status = apparatusStatus(entry, hooks, cautions);
    return { ...entry, hooks, sourceChecks, indexTerms, cautions, apparatusStatus: status };
  });
}

function apparatusStatus(entry, hooks, cautions) {
  const decision = (entry.decision || "").toLowerCase();
  if (entry.decision === "Hold for pull" || entry.readiness === "pull-lead") return "Hold for source text";
  if (entry.missing.length) return "Source-note fix";
  if (entry.blockers.length || decision.includes("caution") || !hooks.length) return "Annotation caution";
  return "Ready for apparatus";
}

function apparatusHookItems(entry) {
  const handoffs = handoffsForLane(entry.item.laneId).slice(0, 2);
  return [
    ...entry.people.slice(0, 4).map((person) => ({ title: `Person/office: ${person.name}`, detail: person.role })),
    ...entry.context.diary.slice(0, 3).map((diary) => ({
      title: `Presidential Daily Diary: ${diary.title}`,
      detail: `${formatDate(diary.date)} / ${diary.time || "time not listed"} / ${diary.volumeConnection || diary.eventType || "calendar cue"}`
    })),
    ...entry.context.publicAnchors.slice(0, 2).map((anchor) => ({
      title: `Public chronology: ${anchor.title}`,
      detail: `${formatDate(anchor.date)} / ${anchor.repository || anchor.collection || "public record"}`
    })),
    ...handoffs.map((handoff) => ({
      title: `Volume VII carry-forward: ${handoff.priorChapter}`,
      detail: handoff.newQuestion || handoff.continuity || handoff.sourceAction
    })),
    entry.routes[0] ? { title: `Equity route: ${entry.routes[0].title}`, detail: entry.routes[0].detail } : null
  ].filter(Boolean).slice(0, 10);
}

function apparatusSourceCheckItems(entry) {
  return [
    { title: "Working source note", detail: workingSourceNote(entry) },
    { title: "Citation completeness", detail: `${entry.checks.length - entry.missing.length}/${entry.checks.length} fields present` },
    entry.missing.length ? { title: "Missing citation fields", detail: entry.missing.map((check) => check.label).join("; ") } : { title: "Missing citation fields", detail: "None flagged." },
    entry.item.pdfUrl ? { title: "Review copy/PDF", detail: entry.item.pdfUrl } : null,
    entry.item.url ? { title: "Source URL", detail: entry.item.url } : null,
    entry.ledgers[0]
      ? {
          title: `Source-copy ledger: ${entry.ledgers[0].title}`,
          detail: entry.ledgers[0].reviewCue || entry.ledgers[0].repositoryTrail || entry.ledgers[0].sourceClass || "Ledger item mapped."
        }
      : null,
    entry.sourceHandling?.[0] ? { title: entry.sourceHandling[0].title, detail: entry.sourceHandling[0].detail } : null,
    entry.pull
      ? {
          title: `Pull target: ${entry.pull.title}`,
          detail: entry.pull.visitGoal || entry.pull.whyItMatters || entry.pull.sourcePart || "Verify item-level text before selection."
        }
      : null
  ].filter(Boolean).slice(0, 8);
}

function apparatusIndexTerms(entry) {
  const lane = laneById.get(entry.item.laneId);
  return uniqueSorted([
    ...entry.people.map((person) => person.name),
    laneTitle(entry.item.laneId),
    ...(lane?.topics || []),
    ...(entry.item.tags || []),
    ...(handoffsForLane(entry.item.laneId).flatMap((handoff) => handoff.tags || []))
  ]).slice(0, 12);
}

function apparatusCautionItems(entry, hooks) {
  return [
    ...entry.blockers.map((blocker) => ({ title: blocker.title, detail: blocker.detail })),
    ...entry.missing.map((check) => ({ title: `Source-note fix: ${check.label}`, detail: "Add before apparatus or circulation review." })),
    entry.readiness === "pull-lead"
      ? {
          title: "Pull before apparatus",
          detail: entry.pull?.visitGoal || entry.pull?.whyItMatters || entry.pull?.sourcePart || "Verify item-level text before drafting annotation apparatus."
        }
      : null,
    !hooks.length
      ? {
          title: "Annotation hook gap",
          detail: "Add at least one people, Diary, public chronology, or Volume VII carry-forward hook before treating this as apparatus-ready."
        }
      : null,
    entry.gap
      ? {
          title: `${entry.gap.priority} gap: ${entry.gap.title}`,
          detail: entry.gap.remainingRisk || entry.gap.needed || entry.gap.problem || "Gap tracker item mapped."
        }
      : null,
    { title: "Replacement trigger", detail: entry.replacement }
  ].filter(Boolean).slice(0, 8);
}

function apparatusCard(entry) {
  const card = document.createElement("article");
  card.className = `apparatus-card status-${closeoutStatusClass(entry.apparatusStatus)}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`Doc ${entry.number.toString().padStart(2, "0")}`), textSpan(entry.apparatusStatus), textSpan(laneNumber(entry.item.laneId)));

  const title = document.createElement("h3");
  title.textContent = entry.item.title;

  const summary = document.createElement("p");
  summary.textContent = `${plural(entry.hooks.length, "annotation hook")} and ${plural(entry.indexTerms.length, "index term")} bundled for a ${entry.decision.toLowerCase()} decision.`;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid apparatus-metrics";
  addDetail(metrics, "Hooks", entry.hooks.length);
  addDetail(metrics, "Index", entry.indexTerms.length);
  addDetail(metrics, "Citation", `${entry.checks.length - entry.missing.length}/${entry.checks.length}`);
  addDetail(metrics, "Diary", entry.context.diary.length);
  addDetail(metrics, "Public", entry.context.publicAnchors.length);
  addDetail(metrics, "Cautions", entry.cautions.length);

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Sequence", () => scrollToSection("#sequence")));
  actions.append(packetActionButton("Manuscript", () => scrollToSection("#manuscripts")));
  actions.append(packetActionButton("Decisions", () => scrollToSection("#decisions")));
  if (entry.people.length) actions.append(packetActionButton("People", () => showPersonProfile(entry.people[0].name)));
  if (entry.context.diary.length) actions.append(packetActionButton("Diary", () => showLaneDiary(entry.item.laneId)));
  actions.append(clipboardButton("Copy apparatus", apparatusNote(entry), "Apparatus copied"));

  card.append(
    meta,
    title,
    summary,
    metrics,
    packetBlock(
      "Annotation hooks",
      packetList(
        entry.hooks,
        (item) => item.title,
        (item) => item.detail,
        "No annotation hooks mapped yet."
      )
    ),
    packetBlock(
      "Source-note checks",
      packetList(
        entry.sourceChecks,
        (item) => item.title,
        (item) => item.detail,
        "No source-note checks mapped yet."
      )
    ),
    packetBlock(
      "Index terms",
      packetList(
        entry.indexTerms.map((term) => ({ title: term, detail: "Candidate index/subject heading." })),
        (item) => item.title,
        (item) => item.detail,
        "No candidate index terms mapped yet."
      )
    ),
    packetBlock(
      "Cautions",
      packetList(
        entry.cautions,
        (item) => item.title,
        (item) => item.detail,
        "No apparatus cautions flagged."
      )
    ),
    actions
  );

  return card;
}

function apparatusNote(entry) {
  return noteLines([
    `Document apparatus pack ${entry.number}: ${entry.item.title}`,
    `Date: ${formatDate(entry.item.date)}`,
    `Lane: ${laneNumber(entry.item.laneId)} / ${laneTitle(entry.item.laneId)}`,
    `Selection decision: ${entry.decision}`,
    `Apparatus status: ${entry.apparatusStatus}`,
    `Working source note: ${workingSourceNote(entry)}`,
    "Annotation hooks:",
    ...entry.hooks.map((hook) => `- ${hook.title}: ${hook.detail}`),
    "Source-note checks:",
    ...entry.sourceChecks.map((check) => `- ${check.title}: ${check.detail}`),
    entry.indexTerms.length ? `Index terms: ${entry.indexTerms.join("; ")}` : "Index terms: none mapped",
    entry.cautions.length ? "Cautions:" : "Cautions: none flagged",
    ...entry.cautions.map((caution) => `- ${caution.title}: ${caution.detail}`),
    "Apparatus handoff: attach this note to the manuscript stub so people/offices, Daily Diary cues, Volume VII carry-forward themes, public chronology, source-note checks, and index terms travel together.",
    "Compiler check: verify final citation form, official FRUS numbering, annotation scope, clearance route, and whether the record remains selected."
  ]);
}

function apparatusBoardNote(entries) {
  const counts = uniqueSorted(entries.map((entry) => entry.apparatusStatus)).map((status) => `${status}: ${entries.filter((entry) => entry.apparatusStatus === status).length}`);
  return noteLines([
    "Editorial apparatus pack",
    `${entries.length} provisional document apparatus packs generated from the decision ledger.`,
    `Status counts: ${counts.join("; ")}`,
    ...entries.map((entry) => `${entry.number}. ${formatDate(entry.item.date)} / ${laneNumber(entry.item.laneId)} / ${entry.apparatusStatus} / hooks ${entry.hooks.length} / cautions ${entry.cautions.length} / ${entry.item.title}`)
  ]);
}

function showReadinessDocuments(readiness) {
  resetGroup("documents", [
    nodes.documentSearch,
    nodes.documentLaneFilter,
    nodes.documentTypeFilter,
    nodes.documentPriorityFilter,
    nodes.documentReadinessFilter,
    nodes.documentSort
  ]);
  state.documents.readiness = readiness;
  state.documents.sort = "priority";
  if (nodes.documentReadinessFilter) nodes.documentReadinessFilter.value = readiness;
  if (nodes.documentSort) nodes.documentSort.value = "priority";
  renderDocuments();
  scrollToSection("#documents");
}

function showCoverageDocuments(laneId, readiness = "") {
  resetGroup("documents", [
    nodes.documentSearch,
    nodes.documentLaneFilter,
    nodes.documentTypeFilter,
    nodes.documentPriorityFilter,
    nodes.documentReadinessFilter,
    nodes.documentSort
  ]);
  state.documents.lane = laneId;
  state.documents.readiness = readiness;
  state.documents.sort = readiness ? "priority" : "";
  if (nodes.documentLaneFilter) nodes.documentLaneFilter.value = laneId;
  if (nodes.documentReadinessFilter) nodes.documentReadinessFilter.value = readiness;
  if (nodes.documentSort) nodes.documentSort.value = state.documents.sort;
  renderDocuments();
  scrollToSection("#documents");
}

function renderCoverageMatrix() {
  if (!nodes.coverageRoot) return;
  const wrapper = document.createElement("div");
  wrapper.className = "coverage-table-wrap";
  const table = document.createElement("table");
  table.className = "coverage-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (const label of ["Chapter", "Review", "Public", "Formal", "Pull", "Diary", "Gaps", "Copy"]) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = label;
    headerRow.append(th);
  }
  thead.append(headerRow);

  const tbody = document.createElement("tbody");
  for (const lane of lanes) {
    const row = coverageRow(lane);
    tbody.append(row);
  }

  table.append(thead, tbody);
  wrapper.append(table);
  nodes.coverageRoot.replaceChildren(wrapper);
}

function coverageRow(lane) {
  const documents = potentialDocuments.filter((item) => item.laneId === lane.id);
  const counts = readinessCounts(documents);
  const diary = diaryReferences.filter((item) => item.laneId === lane.id);
  const gaps = gapTracker.filter((item) => item.laneId === lane.id);
  const criticalGaps = gaps.filter((item) => ["Critical", "High"].includes(item.priority));

  const row = document.createElement("tr");
  row.append(coverageChapterCell(lane));
  row.append(coverageCountCell(counts["review-copy"], "Review-copy records", () => showCoverageDocuments(lane.id, "review-copy")));
  row.append(coverageCountCell(counts["public-anchor"], "Public anchors", () => showCoverageDocuments(lane.id, "public-anchor")));
  row.append(coverageCountCell(counts["formal-record"], "Formal public records", () => showCoverageDocuments(lane.id, "formal-record")));
  row.append(coverageCountCell(counts["pull-lead"], "Pull leads", () => showCoverageDocuments(lane.id, "pull-lead")));
  row.append(coverageCountCell(diary.length, "Diary cues", () => showLaneDiary(lane.id)));
  row.append(coverageCountCell(criticalGaps.length || gaps.length, criticalGaps.length ? "Critical/high gaps" : "Gaps", () => showLaneGaps(lane.id)));

  const copy = document.createElement("td");
  copy.append(clipboardButton("Copy", coverageNote(lane, documents, diary, gaps, counts), "Coverage row copied"));
  row.append(copy);
  return row;
}

function coverageChapterCell(lane) {
  const cell = document.createElement("th");
  cell.scope = "row";
  const title = document.createElement("strong");
  title.textContent = lane.title;
  const meta = document.createElement("span");
  meta.textContent = `${lane.number} / ${lane.status}`;
  cell.append(title, meta);
  return cell;
}

function coverageCountCell(count, label, onClick) {
  const cell = document.createElement("td");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "coverage-count";
  button.disabled = count === 0;
  button.textContent = count.toString();
  button.setAttribute("aria-label", `${label}: ${count}`);
  button.addEventListener("click", onClick);
  cell.append(button);
  return cell;
}

function coverageNote(lane, documents, diary, gaps, counts) {
  return noteLines([
    `${lane.number} / ${lane.title}`,
    `Status: ${lane.status}`,
    `Summary: ${lane.summary}`,
    `Review copies: ${counts["review-copy"]}`,
    `Public anchors: ${counts["public-anchor"]}`,
    `Formal public records: ${counts["formal-record"]}`,
    `Pull leads: ${counts["pull-lead"]}`,
    `Diary cues: ${diary.length}`,
    `Open gaps: ${gaps.length}`,
    documents.length ? `Top records: ${documents.sort(byPriorityThenDate).slice(0, 5).map((item) => item.title).join("; ")}` : "",
    gaps.length ? `First gap: ${gaps.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0].title}` : ""
  ]);
}

function renderCompilerQa() {
  renderList(nodes.qaRoot, compilerQaItems(), qaCard, "No compiler QA items loaded.");
}

function compilerQaItems() {
  const items = [];
  for (const lane of lanes) {
    const documents = potentialDocuments.filter((item) => item.laneId === lane.id);
    const counts = readinessCounts(documents);
    const sequence = selectionSequenceItems().filter((entry) => entry.item.laneId === lane.id);
    const diary = diaryReferences.filter((entry) => entry.laneId === lane.id);
    const leads = sourceLeads.filter((lead) => lead.laneId === lane.id);
    const pulls = libraryPlan.filter((pull) => pull.laneId === lane.id);
    const pools = sourcePools.filter((pool) => pool.laneId === lane.id);
    const gaps = gapTracker.filter((gap) => gap.laneId === lane.id);
    const handoffs = handoffsForLane(lane.id);
    const peopleForLane = persons.filter((person) => (person.laneIds || []).includes(lane.id));

    if (lane.id === "volume-control") {
      items.push(qaItem(lane, "Critical", "Guard official status", "Keep the planned-volume warning visible and avoid document numbers until the official volume is published.", "Official page is planned; public anchors and released items are not a FRUS document list.", ["briefs", "gaps"]));
    } else {
      if (counts["review-copy"] === 0) {
        items.push(qaItem(lane, "Critical", "No review-copy record yet", "Pull internal text before treating the chapter sequence as document-ready.", `${documents.length} mapped records, but none are released memcon or State FOIA review-copy text.`, ["library", "sources", "requests"]));
      }
      if (!sequence.length) {
        items.push(qaItem(lane, "High", "No provisional sequence row", "Promote at least one review-copy, formal-record, or pull-lead candidate into the selection sequence.", `${counts["public-anchor"]} public anchors and ${documents.length} mapped records need an internal or formal candidate.`, ["documents", "selection", "sequence"]));
      }
      if (!diary.length) {
        items.push(qaItem(lane, "Medium", "No Presidential Daily Diary cue", "Run a Daily Diary name/date pass for participant and calendar confirmation.", "No mapped call or meeting cue currently anchors this lane.", ["diary", "concordance"]));
      }
      if (!pulls.length && !leads.length && !pools.length) {
        items.push(qaItem(lane, "High", "No source acquisition path", "Add at least one source lead, repository pool, or on-site pull target before final selection.", "The lane has no mapped lead/pool/pull item to guide file acquisition.", ["agenda", "sources", "library"]));
      }
      if (!handoffs.length) {
        items.push(qaItem(lane, "Medium", "No Volume VII carryover", "Confirm whether the 1993-1996 volume has a predecessor chapter or boundary note for this lane.", "No explicit Volume VII handoff record is mapped.", ["handoff"]));
      }
      if (!peopleForLane.length) {
        items.push(qaItem(lane, "Low", "No people/offices mapped", "Add principal offices and staff names to support indexing, source requests, and participant checks.", "No roster entries are currently assigned to this lane.", ["people"]));
      }
      if (!gaps.length) {
        items.push(qaItem(lane, "Low", "No explicit gap control", "Confirm there is no remaining editorial risk before closing the chapter packet.", "The gap tracker has no open or closed control item for this lane.", ["gaps"]));
      }
    }

    if (counts["public-anchor"] > counts["review-copy"] && counts["review-copy"] < 2) {
      items.push(qaItem(lane, "Medium", "Public anchors outweigh internal text", "Backtrace public statements to internal memoranda, briefing papers, or cables.", `${counts["public-anchor"]} public anchors vs. ${counts["review-copy"]} review-copy records.`, ["documents", "library", "requests"]));
    }
  }

  return items.sort((a, b) => priorityValue(a.severity) - priorityValue(b.severity) || (laneOrder.get(a.lane.id) ?? 99) - (laneOrder.get(b.lane.id) ?? 99) || a.title.localeCompare(b.title));
}

function qaItem(lane, severity, title, action, evidence, targets) {
  return { id: `${lane.id}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, lane, severity, title, action, evidence, targets };
}

function qaCard(item) {
  const card = document.createElement("article");
  card.className = `qa-card priority-${item.severity.toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(item.severity), textSpan(item.lane.number));

  const title = document.createElement("h3");
  title.textContent = item.title;

  const evidence = document.createElement("p");
  evidence.textContent = item.evidence;

  const action = document.createElement("p");
  action.className = "source-note";
  action.textContent = item.action;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  for (const target of item.targets) {
    actions.append(packetActionButton(qaTargetLabel(target), () => scrollToSection(`#${target}`)));
  }
  actions.append(clipboardButton("Copy QA", qaIssueNote(item), "QA item copied"));

  card.append(meta, title, evidence, action, actions);
  return card;
}

function qaTargetLabel(target) {
  const labels = {
    agenda: "Agenda",
    briefs: "Briefs",
    concordance: "Concordance",
    diary: "Diary",
    documents: "Chronology",
    gaps: "Gaps",
    handoff: "Handoff",
    library: "Library",
    people: "People",
    requests: "Requests",
    selection: "Selection",
    sequence: "Sequence",
    sources: "Source leads"
  };
  return labels[target] || target;
}

function qaIssueNote(item) {
  return noteLines([
    `[${item.severity}] ${item.lane.number} / ${item.lane.title}: ${item.title}`,
    `Evidence: ${item.evidence}`,
    `Action: ${item.action}`,
    `Open: ${item.targets.map(qaTargetLabel).join("; ")}`
  ]);
}

function compilerQaNote(items) {
  return noteLines([
    "Compiler QA checklist",
    `${items.length} generated QA items from readiness, sequence, Diary, source, handoff, people, and gap signals.`,
    ...items.map((item, index) => `${index + 1}. [${item.severity}] ${item.lane.number} / ${item.title}: ${item.action}`)
  ]);
}

function renderStageGates() {
  renderList(nodes.stageGatesRoot, stageGateItems(), stageGateCard, "No FRUS production stage gates loaded.");
}

function stageGateItems() {
  const sequence = selectionSequenceItems();
  const annotations = annotationItems();
  const qaItems = compilerQaItems();
  const highGaps = gapTracker.filter((gap) => priorityValue(gap.priority) <= 2);
  const missingAnnotations = annotations.filter((entry) => entry.missing.length);
  const pullAnnotations = annotations.filter((entry) => documentReadiness(entry.item) === "pull-lead");
  const officialVolumeUrl = "https://history.state.gov/historicaldocuments/frus1993-00v08";
  const statusUrl = "https://history.state.gov/historicaldocuments/status-of-the-series";

  return [
    {
      id: "planning",
      stage: "Planning",
      state: "Current official status",
      stateKey: "active",
      detail:
        "The Office of the Historian still lists Volume VIII as planned. This assister should expose source trails and candidate controls, not official document numbers.",
      next: "Keep the official-status warning visible and preserve candidate/source-lead labels until the volume moves beyond planned status.",
      metrics: [
        ["Official", data.meta?.status || "Planned"],
        ["Lanes", lanes.length],
        ["Handoffs", volumeHandoff.length],
        ["Checked", "Jun 2, 2026"]
      ],
      items: [
        { title: "Official volume page", detail: "Status note says the volume is Planned." },
        { title: "Status list", detail: "Volume VIII appears under Planned on the Status of the Series page." },
        { title: "Boundary", detail: `${volumeHandoff.length} Volume VII handoffs keep 1993-1996 continuity explicit.` }
      ],
      actions: [
        { label: "Official", href: officialVolumeUrl },
        { label: "Status", href: statusUrl },
        { label: "Handoff", target: "#handoff" }
      ]
    },
    {
      id: "research",
      stage: "Research",
      state: "Workbench-ready",
      stateKey: "ready",
      detail:
        "The research desk has enough mapped chronology, Diary, source, and annotation material to support archival pulling and first-pass selection work.",
      next: "Use the chronology, selection sequence, annotation queue, and source requests as the daily research workbench.",
      metrics: [
        ["Candidates", potentialDocuments.length],
        ["Sequence", sequence.length],
        ["Diary", diaryReferences.length],
        ["Leads", sourceLeads.length]
      ],
      items: [
        { title: "Chronology", detail: `${potentialDocuments.length} candidate/source-mapped records are searchable and exportable.` },
        { title: "Selection", detail: `${sequence.length} provisional rows have sequence, backtrace, and annotation context.` },
        { title: "Diary/source", detail: `${diaryReferences.length} Diary cues and ${sourceLeads.length} source leads are mapped into lanes.` }
      ],
      actions: [
        { label: "Chronology", target: "#documents" },
        { label: "Sequence", target: "#sequence" },
        { label: "Annotate", target: "#annotations" }
      ]
    },
    {
      id: "clearance",
      stage: "Clearance",
      state: "Not ready",
      stateKey: "blocked",
      detail:
        "The volume should not be treated as clearance-ready while high-priority gaps, pull-before-annotation leads, and citation-field fixes remain open.",
      next: "Close critical/high gaps, pull source-path leads, and resolve missing citation fields before any clearance-ready representation.",
      metrics: [
        ["High gaps", highGaps.length],
        ["Cite fixes", missingAnnotations.length],
        ["Pull leads", pullAnnotations.length],
        ["QA items", qaItems.length]
      ],
      items: [
        { title: "Critical/high gaps", detail: `${highGaps.length} critical/high gap controls still drive source acquisition.` },
        { title: "Citation fixes", detail: `${missingAnnotations.length} sequence candidates need citation-field completion.` },
        { title: "Pull leads", detail: `${pullAnnotations.length} sequence candidates remain pull-before-annotation leads.` }
      ],
      actions: [
        { label: "QA", target: "#qa" },
        { label: "Gaps", target: "#gaps" },
        { label: "Requests", target: "#requests" }
      ]
    },
    {
      id: "publication",
      stage: "Publication",
      state: "Locked by official release",
      stateKey: "locked",
      detail:
        "Publication work depends on an official FRUS release. The assister can prepare reconciliation notes, but it cannot create official document numbers or final chapter structure.",
      next: "When the official volume publishes, reconcile the candidate chronology against the official table of contents and replace provisional labels.",
      metrics: [
        ["Doc nums", "None"],
        ["Official TOC", "None"],
        ["Public anchors", publicRecords.length],
        ["Ledger", sourceCopyLedger.length]
      ],
      items: [
        { title: "No document numbers", detail: "Do not add official document numbers until the Office of the Historian publishes them." },
        { title: "Reconciliation path", detail: "Use the source-copy ledger and chronology exports to compare candidate rows with the official volume." },
        { title: "Public anchors", detail: `${publicRecords.length} Public Papers anchors remain chronology supports, not final FRUS selections.` }
      ],
      actions: [
        { label: "Ledger", target: "#ledger" },
        { label: "Public", target: "#public" },
        { label: "Official", href: officialVolumeUrl }
      ]
    }
  ];
}

function stageGateCard(gate) {
  const card = document.createElement("article");
  card.className = `stage-card stage-${gate.stateKey}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(gate.stage), textSpan(gate.state));

  const title = document.createElement("h3");
  title.textContent = `${gate.stage} Gate`;

  const detail = document.createElement("p");
  detail.textContent = gate.detail;

  const next = document.createElement("p");
  next.className = "source-note";
  next.textContent = gate.next;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid stage-metrics";
  for (const [label, value] of gate.metrics) addDetail(metrics, label, value);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  for (const action of gate.actions) {
    if (action.href) actions.append(linkButton(action.label, action.href));
    if (action.target) actions.append(packetActionButton(action.label, () => scrollToSection(action.target)));
  }
  actions.append(clipboardButton("Copy gate", stageGateNote(gate), "Stage gate copied"));

  card.append(
    meta,
    title,
    detail,
    next,
    metrics,
    packetBlock(
      "Evidence",
      packetList(
        gate.items,
        (item) => item.title,
        (item) => item.detail,
        "No stage evidence mapped yet."
      )
    ),
    actions
  );

  return card;
}

function stageGateNote(gate) {
  return noteLines([
    `${gate.stage} gate - ${gate.state}`,
    gate.detail,
    `Next step: ${gate.next}`,
    gate.metrics.length ? "Metrics:" : "",
    ...gate.metrics.map(([label, value]) => `- ${label}: ${value}`),
    gate.items.length ? "Evidence:" : "",
    ...gate.items.map((item) => `- ${item.title}: ${item.detail}`)
  ]);
}

function stageGateBoardNote(gates) {
  return noteLines([
    "FRUS production stage gates",
    "Official status checked Jun 2, 2026: Volume VIII remains planned.",
    ...gates.map((gate, index) => `${index + 1}. ${gate.stage}: ${gate.state} - ${gate.next}`)
  ]);
}

function renderRequestQueue() {
  const pools = [...sourcePools].sort(
    (a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99)
  );
  renderList(nodes.requestsRoot, pools, requestCard, "No source request pools loaded.");
}

function requestCard(pool) {
  const leads = sourceLeads.filter((item) => item.laneId === pool.laneId).sort(byPriorityThenDate).slice(0, 2);
  const pulls = libraryPlan
    .filter((item) => item.laneId === pool.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))
    .slice(0, 2);
  const gaps = gapTracker
    .filter((item) => item.laneId === pool.laneId)
    .sort(
      (a, b) =>
        priorityValue(a.priority) - priorityValue(b.priority) ||
        (a.status || "").localeCompare(b.status || "") ||
        a.title.localeCompare(b.title)
    )
    .slice(0, 1);

  const card = document.createElement("article");
  card.className = "request-card";
  card.dataset.lane = pool.laneId;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`Priority ${pool.priority}`), textSpan(laneNumber(pool.laneId)), textSpan(pool.institution));

  const title = document.createElement("h3");
  title.textContent = pool.title;

  const coverage = document.createElement("p");
  coverage.textContent = pool.coverage;

  const next = document.createElement("p");
  next.className = "source-note";
  next.textContent = pool.nextUse;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (pool.url) actions.append(linkButton("Open", pool.url));
  if (leads.length) actions.append(packetActionButton("Leads", () => showLaneLeads(pool.laneId)));
  if (pulls.length) actions.append(packetActionButton("Library", () => showLaneLibrary(pool.laneId)));
  if (gaps.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(pool.laneId)));
  actions.append(clipboardButton("Copy request", sourceRequestNote(pool, leads, pulls, gaps), "Request copied"));

  card.append(
    meta,
    title,
    coverage,
    next,
    packetBlock(
      "Source leads",
      packetList(
        leads,
        (lead) => lead.title,
        (lead) => lead.identifier || lead.institution || lead.type || "No identifier listed.",
        "No source leads mapped for this lane."
      )
    ),
    packetBlock(
      "Pull targets",
      packetList(
        pulls,
        (pull) => pull.title,
        (pull) => pull.visitGoal || pull.sourcePart || "No pull target note listed.",
        "No library pull target mapped for this lane."
      )
    ),
    packetBlock(
      "Risk check",
      packetList(
        gaps,
        (gap) => gap.title,
        (gap) => `${gap.priority} / ${gap.status || "status not listed"}`,
        "No open gap mapped for this lane."
      )
    ),
    actions
  );
  return card;
}

function renderCallSlips() {
  renderList(nodes.callSlipsRoot, callSlipItems(), callSlipCard, "No archive call slips loaded.");
}

function callSlipItems() {
  const slips = [];
  for (const pull of libraryPlan) {
    const folders = pull.targetFolders?.length ? pull.targetFolders : [pull.title];
    folders.forEach((folder, index) => {
      const laneDocuments = potentialDocuments.filter((item) => item.laneId === pull.laneId).sort(byPriorityThenDate);
      const leads = sourceLeads.filter((lead) => lead.laneId === pull.laneId).sort(byPriorityThenDate);
      const pool = sourcePools
        .filter((item) => item.laneId === pull.laneId)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
      const gap = gapTracker
        .filter((item) => item.laneId === pull.laneId)
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
      slips.push({
        id: `${pull.id}-${index}`,
        pull,
        folder,
        laneDocuments,
        leads,
        pool,
        gap,
        priority: callSlipPriority(pull, gap)
      });
    });
  }
  return slips
    .sort(
      (a, b) =>
        priorityValue(a.priority) - priorityValue(b.priority) ||
        (laneOrder.get(a.pull.laneId) ?? 99) - (laneOrder.get(b.pull.laneId) ?? 99) ||
        a.folder.localeCompare(b.folder)
    )
    .map((slip, index) => ({ ...slip, number: index + 1 }));
}

function callSlipPriority(pull, gap) {
  if (pull.priority === "Control") return "Critical";
  if (gap && priorityValue(gap.priority) <= 2) return gap.priority;
  if (pull.priority === "A") return "High";
  if (pull.priority === "B") return "Medium";
  return "Low";
}

function callSlipCard(slip) {
  const { pull } = slip;
  const card = document.createElement("article");
  card.className = `call-slip-card priority-${(slip.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(`#${slip.number.toString().padStart(2, "0")}`), textSpan(slip.priority), textSpan(laneNumber(pull.laneId)), textSpan(pull.sourcePart || "source part TBD"));

  const title = document.createElement("h3");
  title.textContent = slip.folder;

  const office = document.createElement("p");
  office.className = "office-line";
  office.textContent = pull.office;

  const goal = document.createElement("p");
  goal.textContent = pull.visitGoal || pull.whyItMatters || "Pull this folder for item-level screening.";

  const details = document.createElement("dl");
  details.className = "detail-grid call-slip-metrics";
  addDetail(details, "Lane", laneNumber(pull.laneId));
  addDetail(details, "Office", pull.office);
  addDetail(details, "Source", pull.sourcePart);
  addDetail(details, "Pool", slip.pool?.institution || "Unassigned");

  const actions = document.createElement("div");
  actions.className = "card-actions packet-actions";
  actions.append(packetActionButton("Library", () => showLaneLibrary(pull.laneId)));
  if (slip.leads.length) actions.append(packetActionButton("Leads", () => showLaneLeads(pull.laneId)));
  if (slip.laneDocuments.length) actions.append(packetActionButton("Chronology", () => showLaneDocuments(pull.laneId)));
  if (slip.gap) actions.append(packetActionButton("Gaps", () => showLaneGaps(pull.laneId)));
  actions.append(clipboardButton("Copy slip", callSlipNote(slip), "Call slip copied"));

  card.append(
    meta,
    title,
    office,
    goal,
    details,
    packetBlock(
      "Bring with slip",
      packetList(
        callSlipContext(slip),
        (item) => item.title,
        (item) => item.detail,
        "No context mapped yet."
      )
    ),
    packetBlock(
      "On-site handling",
      packetList(
        (pull.onsiteActions || []).map((action, index) => ({ title: `Step ${index + 1}`, detail: action })),
        (item) => item.title,
        (item) => item.detail,
        "No on-site action mapped yet."
      )
    ),
    actions
  );

  return card;
}

function callSlipContext(slip) {
  return [
    ...slip.laneDocuments.slice(0, 2).map((item) => ({
      title: item.title,
      detail: `${formatDate(item.date)} / ${readinessLabel(documentReadiness(item))} / ${item.repository || item.type}`
    })),
    ...slip.leads.slice(0, 1).map((lead) => ({
      title: `Lead: ${lead.title}`,
      detail: lead.identifier || lead.note || lead.institution || "Source lead mapped"
    })),
    slip.gap
      ? {
          title: `Risk: ${slip.gap.title}`,
          detail: slip.gap.remainingRisk || slip.gap.needed || slip.gap.problem || "Gap tracker item mapped"
        }
      : null
  ].filter(Boolean);
}

function callSlipNote(slip) {
  const { pull } = slip;
  return noteLines([
    `Archive call slip ${slip.number}: ${slip.folder}`,
    `Priority: ${slip.priority}`,
    `Lane: ${laneNumber(pull.laneId)} / ${laneTitle(pull.laneId)}`,
    `Office/source: ${pull.office}`,
    pull.sourcePart ? `Source part: ${pull.sourcePart}` : "",
    slip.pool ? `Repository pool: ${slip.pool.title} (${slip.pool.institution})` : "",
    slip.pool?.url ? `Repository URL: ${slip.pool.url}` : "",
    `Visit goal: ${pull.visitGoal || pull.whyItMatters || "Item-level screening"}`,
    pull.whyItMatters ? `Why it matters: ${pull.whyItMatters}` : "",
    pull.onsiteActions?.length ? "On-site handling:" : "",
    ...(pull.onsiteActions || []).map((action, index) => `${index + 1}. ${action}`),
    slip.laneDocuments.length ? "Candidate records to compare:" : "",
    ...slip.laneDocuments.slice(0, 4).map((item) => `- ${formatDate(item.date)} / ${item.title} (${readinessLabel(documentReadiness(item))})`),
    slip.leads.length ? "Source leads:" : "",
    ...slip.leads.slice(0, 3).map((lead) => `- ${lead.title}${lead.identifier ? ` / ${lead.identifier}` : ""}${lead.url ? ` / ${lead.url}` : ""}`),
    slip.gap ? `Open risk: ${slip.gap.title} - ${slip.gap.remainingRisk || slip.gap.needed || slip.gap.problem || ""}` : "",
    "Compiler check: record box/folder call number, withdrawal sheet, document date/title, classification/release status, pages, attachments, and whether copied/scanned."
  ]);
}

function callSlipQueueNote(slips) {
  return noteLines([
    "Archive call slip queue",
    `${slips.length} folder-level call slips generated from ${libraryPlan.length} pull-plan items.`,
    ...slips.map((slip) => `${slip.number}. [${slip.priority}] ${laneNumber(slip.pull.laneId)} / ${slip.folder} / ${slip.pull.office}`)
  ]);
}

function renderRepositoryAgenda() {
  renderList(nodes.agendaRoot, repositoryAgendaGroups(), agendaCard, "No repository agenda loaded.");
}

function repositoryAgendaGroups() {
  const definitions = [
    {
      id: "clinton-library",
      label: "On-site",
      title: "Clinton Library / NARA Pull Day",
      detail: "Bundle NSC office files, National Archives catalog trails, Daily Diary packets, and on-site pull-plan folders before drafting final document order.",
      patterns: ["clinton presidential library", "national archives", "nara"],
      includeLibraryPlan: true
    },
    {
      id: "digital-library",
      label: "MDR scan",
      title: "Clinton Digital Library MDR Scan",
      detail: "Run packet-level checks for South Asia, DPRK/ROK, CBW, and other released Clinton Digital Library material before requesting physical files.",
      patterns: ["clinton digital library"]
    },
    {
      id: "state-foia",
      label: "FOIA",
      title: "State FOIA and Strobe Talbott Search",
      detail: "Use the Talbott release manifest and State FOIA reading room to convert folder/date clues into cables, memos, and diplomatic context.",
      patterns: ["department of state", "foia", "strobe talbott"]
    },
    {
      id: "public-treaty",
      label: "Public record",
      title: "Congress.gov and GovInfo Control Scan",
      detail: "Lock treaty texts, hearings, public statements, statutes, and presidential language before pairing them with internal files.",
      patterns: ["congress.gov", "govinfo"]
    },
    {
      id: "multilateral",
      label: "Allied record",
      title: "NATO and OSCE Record Scan",
      detail: "Pull allied consultation and CFE endpoint records to keep NMD, ABM, and conventional-arms material within the right volume boundary.",
      patterns: ["nato", "osce"]
    },
    {
      id: "historian-control",
      label: "Control",
      title: "Historian Status and Companion Controls",
      detail: "Keep the planned-volume status, companion Volume VII handoff, and compiler network links visible as citation and boundary controls.",
      patterns: ["office of the historian", "github pages"]
    }
  ];

  return definitions
    .map((definition) => {
      const leads = sourceLeads.filter((item) => matchesAgendaDefinition(item, definition)).sort(byPriorityThenDate);
      const pools = sourcePools
        .filter((item) => matchesAgendaDefinition(item, definition))
        .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99));
      const pulls = definition.includeLibraryPlan
        ? [...libraryPlan].sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99))
        : [];
      const laneIds = uniqueSorted([...leads, ...pools, ...pulls].map((item) => item.laneId));
      const url = pools.find((item) => item.url)?.url || leads.find((item) => item.url)?.url || "";
      return { ...definition, leads, pools, pulls, laneIds, url };
    })
    .filter((agenda) => agenda.leads.length || agenda.pools.length || agenda.pulls.length);
}

function matchesAgendaDefinition(item, definition) {
  const haystack = [item.institution, item.repository, item.collection, item.office, item.sourcePart, item.title]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return definition.patterns.some((pattern) => haystack.includes(pattern));
}

function agendaCard(agenda) {
  const card = document.createElement("article");
  card.className = "agenda-card";

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(agenda.label), textSpan(plural(agenda.leads.length + agenda.pools.length + agenda.pulls.length, "item")), textSpan(`${agenda.laneIds.length} lanes`));

  const title = document.createElement("h3");
  title.textContent = agenda.title;

  const detail = document.createElement("p");
  detail.textContent = agenda.detail;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid agenda-metrics";
  addDetail(metrics, "Pools", agenda.pools.length);
  addDetail(metrics, "Leads", agenda.leads.length);
  addDetail(metrics, "Pulls", agenda.pulls.length);
  addDetail(metrics, "Lanes", agenda.laneIds.map(laneNumber).join("; "));

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (agenda.url) actions.append(linkButton("Open", agenda.url));
  if (agenda.pools.length) actions.append(packetActionButton("Requests", () => scrollToSection("#requests")));
  if (agenda.leads.length) actions.append(packetActionButton("Source leads", () => scrollToSection("#sources")));
  if (agenda.pulls.length) actions.append(packetActionButton("Library", () => scrollToSection("#library")));
  actions.append(clipboardButton("Copy agenda", repositoryAgendaNote(agenda), "Agenda copied"));

  card.append(
    meta,
    title,
    detail,
    metrics,
    packetBlock(
      "Open first",
      packetList(
        agendaOpenFirstItems(agenda),
        (item) => item.title,
        (item) => item.detail,
        "No agenda items mapped yet."
      )
    ),
    actions
  );
  return card;
}

function agendaOpenFirstItems(agenda) {
  return [
    ...agenda.pools.map((pool) => ({ title: pool.title, detail: `${pool.institution}: ${pool.nextUse || pool.coverage}` })),
    ...agenda.leads.map((lead) => ({ title: lead.title, detail: `${lead.institution}: ${lead.note || lead.identifier || lead.type}` })),
    ...agenda.pulls.map((pull) => ({ title: pull.title, detail: pull.visitGoal || pull.sourcePart || pull.whyItMatters }))
  ].slice(0, 6);
}

function repositoryAgendaNote(agenda) {
  return noteLines([
    `${agenda.title} (${agenda.label})`,
    agenda.detail,
    `Lanes: ${agenda.laneIds.map((laneId) => `${laneNumber(laneId)} / ${laneTitle(laneId)}`).join("; ")}`,
    agenda.pools.length ? "Source pools:" : "",
    ...agenda.pools.map((pool, index) => `${index + 1}. ${pool.title} (${pool.institution}) - ${pool.coverage}; next use: ${pool.nextUse}${pool.url ? `; URL: ${pool.url}` : ""}`),
    agenda.leads.length ? "Source leads:" : "",
    ...agenda.leads.map((lead, index) => `${index + 1}. ${lead.title} (${lead.institution}) - ${lead.identifier || lead.type || "no identifier"}; ${lead.note || ""}${lead.url ? `; URL: ${lead.url}` : ""}`),
    agenda.pulls.length ? "On-site pull targets:" : "",
    ...agenda.pulls.map((pull, index) => `${index + 1}. ${laneNumber(pull.laneId)} / ${pull.title}: ${pull.visitGoal || pull.sourcePart || pull.whyItMatters}`)
  ]);
}

function renderActionQueue() {
  const actions = lanes.map(compilerAction).sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.lane.id) ?? 99) - (laneOrder.get(b.lane.id) ?? 99));
  renderList(nodes.actionsRoot, actions, actionCard, "No compiler actions loaded.");
}

function compilerAction(lane) {
  const documents = potentialDocuments.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const counts = readinessCounts(documents);
  const diary = diaryReferences.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const leads = sourceLeads.filter((item) => item.laneId === lane.id).sort(byPriorityThenDate);
  const pulls = libraryPlan
    .filter((item) => item.laneId === lane.id)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
  const gaps = gapTracker
    .filter((item) => item.laneId === lane.id)
    .sort(
      (a, b) =>
        priorityValue(a.priority) - priorityValue(b.priority) ||
        (a.status || "").localeCompare(b.status || "") ||
        a.title.localeCompare(b.title)
    );
  const pools = sourcePools
    .filter((item) => item.laneId === lane.id)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title));
  const handoffs = handoffsForLane(lane.id);
  const urgentGap = gaps.find((gap) => ["Critical", "High"].includes(gap.priority)) || gaps[0];

  let priority = "Medium";
  let type = "Selection";
  let title = `Assemble first-pass packet for ${lane.title}`;
  let detail = `${plural(documents.length, "candidate")} and ${plural(handoffs.length, "Volume VII carryover")} are ready for chapter framing.`;
  let nextStep = documents[0] ? `Start with ${formatDate(documents[0].date)} - ${documents[0].title}.` : "Use the mapped source pool before drafting document order.";

  if (urgentGap && priorityValue(urgentGap.priority) <= 2) {
    priority = urgentGap.priority;
    type = "Gap";
    title = `Resolve ${urgentGap.title}`;
    detail = urgentGap.problem || urgentGap.evidence || urgentGap.needed || detail;
    nextStep = urgentGap.nextActions?.[0] || urgentGap.needed || urgentGap.resolution || urgentGap.remainingRisk || nextStep;
  } else if (lane.id !== "volume-control" && counts["review-copy"] === 0) {
    priority = "High";
    type = "Pull";
    title = `Pull internal records for ${lane.title}`;
    detail = `${plural(documents.length, "mapped record")} are public, formal, or source-path anchors, but none are review-copy text yet.`;
    nextStep = pulls[0]?.visitGoal || leads[0]?.note || pools[0]?.nextUse || "Use source requests before selecting final documents.";
  } else if (diary.length && documents.length) {
    priority = "High";
    type = "Diary";
    title = `Pair diary cues with ${lane.title} records`;
    detail = `${plural(diary.length, "Presidential Daily Diary cue")} can pin participants and sequence around the mapped documents.`;
    nextStep = `Start with ${formatDate(diary[0].date)} - ${diary[0].title}.`;
  } else if (counts["public-anchor"] > counts["review-copy"]) {
    priority = "Medium";
    type = "Public/Internal";
    title = `Backfill public anchors for ${lane.title}`;
    detail = `${plural(counts["public-anchor"], "public anchor")} outnumber released review-copy records.`;
    nextStep = pulls[0]?.visitGoal || leads[0]?.note || "Trace public dates back to internal memoranda, briefing papers, or cables.";
  } else if (pools.length || pulls.length || leads.length) {
    priority = "Medium";
    type = "Source";
    title = `Open source trail for ${lane.title}`;
    detail = pools[0]?.coverage || pulls[0]?.whyItMatters || leads[0]?.note || detail;
    nextStep = pools[0]?.nextUse || pulls[0]?.visitGoal || leads[0]?.note || nextStep;
  }

  return { lane, priority, type, title, detail, nextStep, documents, counts, diary, leads, pulls, gaps, pools, handoffs };
}

function actionCard(action) {
  const card = document.createElement("article");
  card.className = `action-card priority-${(action.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(action.priority), textSpan(action.lane.number), textSpan(action.type));

  const title = document.createElement("h3");
  title.textContent = action.title;

  const detail = document.createElement("p");
  detail.textContent = action.detail;

  const next = document.createElement("p");
  next.className = "source-note";
  next.textContent = action.nextStep;

  const metrics = document.createElement("dl");
  metrics.className = "detail-grid action-metrics";
  addDetail(metrics, "Review", action.counts["review-copy"]);
  addDetail(metrics, "Public", action.counts["public-anchor"]);
  addDetail(metrics, "Pull", action.counts["pull-lead"] + action.leads.length + action.pulls.length);
  addDetail(metrics, "Diary", action.diary.length);
  addDetail(metrics, "Gaps", action.gaps.length);

  const sourceMoves = [...action.pulls.slice(0, 1), ...action.leads.slice(0, 1), ...action.pools.slice(0, 1)].slice(0, 3);
  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (action.documents.length) actions.append(packetActionButton("Chronology", () => showLaneDocuments(action.lane.id)));
  if (action.diary.length) actions.append(packetActionButton("Diary", () => showLaneDiary(action.lane.id)));
  if (action.leads.length) actions.append(packetActionButton("Leads", () => showLaneLeads(action.lane.id)));
  if (action.pulls.length) actions.append(packetActionButton("Library", () => showLaneLibrary(action.lane.id)));
  if (action.pools.length) actions.append(packetActionButton("Requests", () => showLaneRequests(action.lane.id)));
  if (action.gaps.length) actions.append(packetActionButton("Gaps", () => showLaneGaps(action.lane.id)));
  actions.append(clipboardButton("Copy action", compilerActionNote(action), "Action copied"));

  card.append(
    meta,
    title,
    detail,
    next,
    metrics,
    packetBlock(
      "Top records",
      packetList(
        action.documents.slice(0, 2),
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${readinessLabel(documentReadiness(item))} / ${item.priority}`,
        "No chronology candidate mapped yet."
      )
    ),
    packetBlock(
      "Volume VII carryover",
      packetList(
        action.handoffs.slice(0, 2),
        (handoff) => handoff.priorChapter,
        (handoff) => handoff.newQuestion || handoff.continuity,
        "No explicit Volume VII carryover mapped yet."
      )
    ),
    packetBlock(
      "Source move",
      packetList(
        sourceMoves,
        (item) => item.title,
        (item) => item.visitGoal || item.note || item.nextUse || item.institution,
        "No source move mapped yet."
      )
    ),
    actions
  );
  return card;
}

function compilerActionNote(action) {
  return noteLines([
    `${action.priority} / ${action.title}`,
    `Lane: ${action.lane.number} / ${action.lane.title}`,
    `Type: ${action.type}`,
    `Reason: ${action.detail}`,
    `Next step: ${action.nextStep}`,
    `Readiness: ${action.counts["review-copy"]} review-copy; ${action.counts["public-anchor"]} public; ${action.counts["formal-record"]} formal; ${action.counts["pull-lead"]} pull-lead`,
    action.documents.length ? `Top records: ${action.documents.slice(0, 4).map((item) => `${formatDate(item.date)} - ${item.title}`).join("; ")}` : "",
    action.diary.length ? `Diary cues: ${action.diary.slice(0, 3).map((entry) => `${formatDate(entry.date)} - ${entry.title}`).join("; ")}` : "",
    action.handoffs.length ? `Volume VII carryover: ${action.handoffs.map((handoff) => `${handoff.priorChapter}: ${handoff.newQuestion}`).join("; ")}` : "",
    action.gaps.length ? `Gaps: ${action.gaps.map((gap) => `${gap.priority} ${gap.title}`).join("; ")}` : "",
    action.pulls.length ? `Library pulls: ${action.pulls.map((pull) => pull.title).join("; ")}` : "",
    action.leads.length ? `Source leads: ${action.leads.map((lead) => lead.title).join("; ")}` : "",
    action.pools.length ? `Request pools: ${action.pools.map((pool) => `${pool.title} (${pool.institution})`).join("; ")}` : ""
  ]);
}

function renderBriefingPack() {
  renderList(nodes.briefsRoot, compilerBriefs(), briefingCard, "No compiler briefs loaded.");
}

function compilerBriefs() {
  const actions = lanes.map(compilerAction).sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.lane.id) ?? 99) - (laneOrder.get(b.lane.id) ?? 99));
  const urgentActions = actions.filter((action) => priorityValue(action.priority) <= 2).slice(0, 6);
  const highPools = sourcePools
    .filter((pool) => pool.priority === "A")
    .sort((a, b) => (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) || a.title.localeCompare(b.title));
  const priorityPulls = [...libraryPlan].sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99)).slice(0, 6);
  const reviewDocs = potentialDocuments.filter((item) => documentReadiness(item) === "review-copy").sort(byPriorityThenDate);
  const publicAnchors = potentialDocuments.filter((item) => documentReadiness(item) === "public-anchor").sort(byPriorityThenDate);
  const formalRecords = potentialDocuments.filter((item) => documentReadiness(item) === "formal-record").sort(byPriorityThenDate);
  const pullLeads = potentialDocuments.filter((item) => documentReadiness(item) === "pull-lead").sort(byPriorityThenDate);
  const highDiary = [...diaryReferences].sort(byPriorityThenDate).slice(0, 8);
  const highGaps = gapTracker
    .filter((gap) => ["Critical", "High"].includes(gap.priority))
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99));
  const carryovers = [...volumeHandoff].sort((a, b) => a.priorChapter.localeCompare(b.priorChapter));

  return [
    {
      kind: "Status",
      title: "Weekly Compiler Status Brief",
      detail: `${plural(potentialDocuments.length, "candidate")} across ${plural(lanes.length, "lane")}, with chronology, source requests, action queue, and risk controls ready for review.`,
      count: plural(urgentActions.length, "priority action"),
      items: urgentActions.map((action) => ({
        title: `${action.priority} / ${action.lane.number}`,
        detail: `${action.title}: ${action.nextStep}`
      })),
      actions: [{ label: "Actions", target: "#actions" }],
      copyLabel: "Copy status",
      text: statusBriefNote(urgentActions)
    },
    {
      kind: "Pulls",
      title: "Archive and FOIA Pull Memo",
      detail: `${plural(highPools.length, "priority source pool")} and ${plural(priorityPulls.length, "pull-plan item")} define the next request package.`,
      count: plural(highPools.length + priorityPulls.length, "source move"),
      items: [
        ...highPools.map((pool) => ({ title: pool.title, detail: `${pool.institution}: ${pool.nextUse}` })),
        ...priorityPulls.map((pull) => ({ title: pull.title, detail: pull.visitGoal || pull.sourcePart || pull.whyItMatters }))
      ].slice(0, 8),
      actions: [
        { label: "Requests", target: "#requests" },
        { label: "Library", target: "#library" }
      ],
      copyLabel: "Copy pull memo",
      text: pullBriefNote(highPools, priorityPulls)
    },
    {
      kind: "Selection",
      title: "Document Selection Memo",
      detail: `${plural(reviewDocs.length, "review-copy record")} should be weighed against ${plural(publicAnchors.length, "public anchor")}, ${plural(formalRecords.length, "formal record")}, and ${plural(pullLeads.length, "pull lead")}.`,
      count: plural(reviewDocs.length, "review copy"),
      items: reviewDocs.slice(0, 8).map((item) => ({
        title: item.title,
        detail: `${formatDate(item.date)} / ${laneNumber(item.laneId)} / score ${item.score || "review"}`
      })),
      actions: [
        { label: "Chronology", target: "#documents" },
        { label: "Selection", target: "#selection" }
      ],
      copyLabel: "Copy selection",
      text: selectionBriefNote(reviewDocs, publicAnchors, formalRecords, pullLeads)
    },
    {
      kind: "Diary",
      title: "Presidential Daily Diary Memo",
      detail: `${plural(diaryReferences.length, "call/meeting cue")} can anchor participant lists, exact-day checks, and nearby document pulls.`,
      count: plural(highDiary.length, "top cue"),
      items: highDiary.map((entry) => ({
        title: entry.title,
        detail: `${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${laneNumber(entry.laneId)}`
      })),
      actions: [
        { label: "Concordance", target: "#concordance" },
        { label: "Diary", target: "#diary" }
      ],
      copyLabel: "Copy diary",
      text: diaryBriefNote(highDiary)
    },
    {
      kind: "Risks",
      title: "Boundary and Gap Memo",
      detail: `${plural(highGaps.length, "critical/high gap")} and ${plural(carryovers.length, "Volume VII carryover")} frame the editorial risk review.`,
      count: plural(highGaps.length, "priority gap"),
      items: [
        ...highGaps.map((gap) => ({ title: `${gap.priority} / ${gap.title}`, detail: gap.remainingRisk || gap.needed || gap.problem })),
        ...carryovers.map((handoff) => ({ title: handoff.priorChapter, detail: handoff.newQuestion }))
      ].slice(0, 9),
      actions: [
        { label: "Gaps", target: "#gaps" },
        { label: "Handoff", target: "#handoff" }
      ],
      copyLabel: "Copy risks",
      text: riskBriefNote(highGaps, carryovers)
    }
  ];
}

function briefingCard(brief) {
  const card = document.createElement("article");
  card.className = "briefing-card";

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(brief.kind), textSpan(brief.count));

  const title = document.createElement("h3");
  title.textContent = brief.title;

  const detail = document.createElement("p");
  detail.textContent = brief.detail;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  for (const action of brief.actions) {
    actions.append(packetActionButton(action.label, () => scrollToSection(action.target)));
  }
  actions.append(clipboardButton(brief.copyLabel, brief.text, "Brief copied"));

  card.append(
    meta,
    title,
    detail,
    packetBlock(
      "Use first",
      packetList(
        brief.items,
        (item) => item.title,
        (item) => item.detail,
        "No brief items mapped yet."
      )
    ),
    actions
  );
  return card;
}

function statusBriefNote(actions) {
  return noteLines([
    `${data.meta?.title || "FRUS Volume VIII"} compiler status brief`,
    data.meta?.subtitle || "",
    `Status: ${data.meta?.status || "Unknown"}`,
    `Counts: ${potentialDocuments.length} candidate records; ${sourceLeads.length} source leads; ${diaryReferences.length} Daily Diary cues; ${gapTracker.length} gap actions; ${volumeHandoff.length} Volume VII carryovers.`,
    actions.length ? "Priority actions:" : "",
    ...actions.map((action, index) => `${index + 1}. [${action.priority}] ${action.lane.number} / ${action.title}: ${action.nextStep}`)
  ]);
}

function pullBriefNote(pools, pulls) {
  return noteLines([
    "Archive and FOIA pull memo",
    pools.length ? "Priority source pools:" : "",
    ...pools.map((pool, index) => `${index + 1}. ${pool.title} (${pool.institution}) - ${pool.coverage}; next use: ${pool.nextUse}`),
    pulls.length ? "Pull-plan items:" : "",
    ...pulls.map((pull, index) => `${index + 1}. ${laneNumber(pull.laneId)} / ${pull.title}: ${pull.visitGoal || pull.sourcePart || pull.whyItMatters}`)
  ]);
}

function selectionBriefNote(reviewDocs, publicAnchors, formalRecords, pullLeads) {
  return noteLines([
    "Document selection memo",
    `Readiness: ${reviewDocs.length} review-copy; ${publicAnchors.length} public-anchor; ${formalRecords.length} formal-record; ${pullLeads.length} pull-lead.`,
    reviewDocs.length ? "Top review-copy records:" : "",
    ...reviewDocs.slice(0, 10).map((item, index) => `${index + 1}. ${formatDate(item.date)} / ${laneNumber(item.laneId)} / ${item.title} / ${item.repository || item.collection || item.type}`)
  ]);
}

function diaryBriefNote(entries) {
  return noteLines([
    "Presidential Daily Diary memo",
    `${diaryReferences.length} call/meeting cues are mapped to Volume VIII lanes.`,
    ...entries.map((entry, index) => `${index + 1}. ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${laneNumber(entry.laneId)} / ${entry.title}: ${entry.volumeConnection}`)
  ]);
}

function riskBriefNote(gaps, handoffs) {
  return noteLines([
    "Boundary and gap memo",
    gaps.length ? "Critical/high gaps:" : "",
    ...gaps.map((gap, index) => `${index + 1}. [${gap.priority}] ${laneNumber(gap.laneId)} / ${gap.title}: ${gap.remainingRisk || gap.needed || gap.problem}`),
    handoffs.length ? "Volume VII carryovers:" : "",
    ...handoffs.map((handoff, index) => `${index + 1}. ${handoff.priorChapter}: ${handoff.newQuestion}`)
  ]);
}

function renderIndexingQueue() {
  renderList(nodes.indexingRoot, indexingItems(), indexingCard, "No indexing queue loaded.");
}

function indexingItems() {
  return persons
    .map((person) => {
      const lanesForPerson = person.laneIds || [];
      const exactDocuments = potentialDocuments.filter((item) => personMentioned(item, person)).sort(byDateThenLane);
      const laneDocuments = potentialDocuments.filter((item) => lanesForPerson.includes(item.laneId)).sort(byPriorityThenDate);
      const exactDiary = diaryReferences.filter((entry) => personMentioned(entry, person)).sort(byDateThenLane);
      const laneDiary = diaryReferences.filter((entry) => lanesForPerson.includes(entry.laneId)).sort(byDateThenLane);
      const exactLeads = sourceLeads.filter((lead) => personMentioned(lead, person)).sort(byPriorityThenDate);
      const laneLeads = sourceLeads.filter((lead) => lanesForPerson.includes(lead.laneId)).sort(byPriorityThenDate);
      return { person, lanesForPerson, exactDocuments, laneDocuments, exactDiary, laneDiary, exactLeads, laneLeads };
    })
    .sort(
      (a, b) =>
        b.exactDocuments.length + b.exactDiary.length + b.exactLeads.length - (a.exactDocuments.length + a.exactDiary.length + a.exactLeads.length) ||
        a.person.name.localeCompare(b.person.name)
    );
}

function personMentioned(item, person) {
  const haystack = textForSearch(item);
  return personNeedles(person).some((needle) => haystack.includes(needle));
}

function personNeedles(person) {
  const full = person.name.toLowerCase();
  const parts = full.split(/\s+/).map((part) => part.replace(/[^a-z0-9-]/g, "")).filter(Boolean);
  const last = parts.at(-1) || full;
  return [full, last].filter((value, index, values) => value && values.indexOf(value) === index);
}

function indexingCard(item) {
  const { person } = item;
  const exactCount = item.exactDocuments.length + item.exactDiary.length + item.exactLeads.length;
  const card = document.createElement("article");
  card.className = "indexing-card";

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(plural(item.lanesForPerson.length, "lane")), textSpan(`${exactCount} direct hits`));

  const title = document.createElement("h3");
  title.textContent = person.name;

  const role = document.createElement("p");
  role.className = "office-line";
  role.textContent = person.role;

  const note = document.createElement("p");
  note.textContent = person.note;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(packetActionButton("People", () => showPersonProfile(person.name)));
  if (item.lanesForPerson[0]) actions.append(packetActionButton("Chronology", () => showLaneDocuments(item.lanesForPerson[0])));
  actions.append(clipboardButton("Copy index", indexNote(item), "Index note copied"));

  card.append(
    meta,
    title,
    role,
    note,
    tagList(item.lanesForPerson.map(laneTitle)),
    packetBlock(
      "Check records",
      packetList(
        (item.exactDocuments.length ? item.exactDocuments : item.laneDocuments).slice(0, 3),
        (record) => record.title,
        (record) => `${formatDate(record.date)} / ${laneNumber(record.laneId)} / ${readinessLabel(documentReadiness(record))}`,
        "No record context mapped yet."
      )
    ),
    packetBlock(
      "Diary and source cues",
      packetList(
        [
          ...(item.exactDiary.length ? item.exactDiary : item.laneDiary).slice(0, 2),
          ...(item.exactLeads.length ? item.exactLeads : item.laneLeads).slice(0, 1)
        ],
        (cue) => cue.title,
        (cue) => cue.time || cue.institution || cue.note || cue.identifier || laneNumber(cue.laneId),
        "No Diary or source cue mapped yet."
      )
    ),
    actions
  );
  return card;
}

function showPersonProfile(name) {
  resetGroup("people", [nodes.personSearch, nodes.personLaneFilter]);
  state.people.query = name;
  if (nodes.personSearch) nodes.personSearch.value = name;
  renderPeople();
  scrollToSection("#people");
}

function indexNote(item) {
  const { person } = item;
  return noteLines([
    `${person.name} - ${person.role}`,
    `Lanes: ${item.lanesForPerson.map((laneId) => `${laneNumber(laneId)} / ${laneTitle(laneId)}`).join("; ")}`,
    person.note ? `Index note: ${person.note}` : "",
    item.exactDocuments.length ? "Direct document mentions:" : "",
    ...item.exactDocuments.slice(0, 5).map((record) => `- ${formatDate(record.date)} / ${record.title}`),
    item.exactDiary.length ? "Direct Diary cues:" : "",
    ...item.exactDiary.slice(0, 5).map((entry) => `- ${formatDate(entry.date)} / ${entry.time || "time not listed"} / ${entry.title}`),
    item.exactLeads.length ? "Direct source leads:" : "",
    ...item.exactLeads.slice(0, 5).map((lead) => `- ${lead.title} (${lead.institution})`),
    !item.exactDocuments.length && item.laneDocuments.length ? "Lane record context:" : "",
    ...(!item.exactDocuments.length ? item.laneDocuments.slice(0, 5).map((record) => `- ${formatDate(record.date)} / ${record.title}`) : []),
    "Compiler check: confirm spelling, title, office, participant role, and whether this person belongs in the final index or source annotation."
  ]);
}

function indexingQueueNote(items) {
  return noteLines([
    "Person and office indexing queue",
    `${items.length} people/offices mapped to Volume VIII lanes.`,
    ...items.map((item, index) => `${index + 1}. ${item.person.name} - ${item.person.role}; lanes: ${item.lanesForPerson.map(laneNumber).join(", ")}; direct hits: ${item.exactDocuments.length + item.exactDiary.length + item.exactLeads.length}`)
  ]);
}

function renderConcordance() {
  renderList(
    nodes.concordanceRoot,
    [...diaryReferences].sort(byDateThenLane),
    concordanceCard,
    "No diary concordance records loaded."
  );
}

function concordanceCard(entry) {
  const matches = concordanceMatches(entry);
  const card = document.createElement("article");
  card.className = `concordance-card priority-${(entry.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(formatDate(entry.date)), textSpan(laneNumber(entry.laneId)), textSpan(entry.eventType), textSpan(entry.priority));

  const title = document.createElement("h3");
  title.textContent = entry.title;

  const entryText = document.createElement("p");
  entryText.textContent = entry.diaryEntry;

  const details = document.createElement("dl");
  details.className = "detail-grid";
  addDetail(details, "Time", entry.time);
  addDetail(details, "Location", entry.location);
  addDetail(details, "Packet", entry.pdfPacket);

  const route = document.createElement("div");
  route.className = "concordance-route";
  if (matches.pull) route.append(routePill("Pull", matches.pull.title));
  if (matches.leads.length) route.append(routePill("Lead", matches.leads[0].title));
  if (matches.gap) route.append(routePill("Gap", matches.gap.title));

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (entry.url) actions.append(linkButton("Catalog", entry.url));
  if (entry.pdfUrl) actions.append(linkButton("PDF", entry.pdfUrl));
  actions.append(clipboardButton("Copy concordance", concordanceNote(entry, matches), "Concordance copied"));

  card.append(
    meta,
    title,
    entryText,
    details,
    packetBlock(
      "Exact-day records",
      packetList(
        matches.exact,
        (item) => item.title,
        (item) => `${item.type} / ${item.priority}`,
        "No exact-day record mapped yet."
      )
    ),
    packetBlock(
      "Nearby records",
      packetList(
        matches.nearby,
        (item) => item.title,
        (item) => `${formatDate(item.date)} / ${item.type} / ${item.priority}`,
        "No nearby record within 30 days in this lane."
      )
    ),
    route,
    actions
  );

  return card;
}

function concordanceMatches(entry) {
  const laneDocuments = potentialDocuments.filter((item) => item.laneId === entry.laneId);
  const exact = laneDocuments.filter((item) => item.date === entry.date).sort(byPriorityThenDate).slice(0, 3);
  const nearby = laneDocuments
    .filter((item) => item.date !== entry.date && dayDistance(item.date, entry.date) <= 30)
    .sort((a, b) => dayDistance(a.date, entry.date) - dayDistance(b.date, entry.date) || byPriorityThenDate(a, b))
    .slice(0, 3);
  const leads = sourceLeads.filter((item) => item.laneId === entry.laneId).sort(byPriorityThenDate).slice(0, 2);
  const pull = libraryPlan
    .filter((item) => item.laneId === entry.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];
  const gap = gapTracker
    .filter((item) => item.laneId === entry.laneId)
    .sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority) || a.title.localeCompare(b.title))[0];

  return { exact, nearby, leads, pull, gap };
}

function routePill(label, value) {
  const pill = document.createElement("p");
  pill.className = "route-pill";
  const strong = document.createElement("strong");
  strong.textContent = label;
  const span = document.createElement("span");
  span.textContent = value;
  pill.append(strong, span);
  return pill;
}

function tagList(values) {
  const list = document.createElement("div");
  list.className = "tag-list";
  for (const value of values.filter(Boolean).slice(0, 8)) {
    const span = document.createElement("span");
    span.textContent = value;
    list.append(span);
  }
  return list;
}

function filteredDocuments() {
  return potentialDocuments
    .filter((item) => {
      if (!matchesQuery(item, state.documents.query)) return false;
      if (state.documents.lane && item.laneId !== state.documents.lane) return false;
      if (state.documents.type && item.type !== state.documents.type) return false;
      if (state.documents.priority && item.priority !== state.documents.priority) return false;
      if (state.documents.readiness && documentReadiness(item) !== state.documents.readiness) return false;
      return true;
    })
    .sort(documentSortFunction());
}

function documentSortFunction() {
  if (state.documents.sort === "lane") return byLaneThenDate;
  if (state.documents.sort === "priority") return byPriorityThenDate;
  return byDateThenLane;
}

function renderDocuments() {
  const visible = filteredDocuments();
  nodes.documentSummary.textContent = `${plural(visible.length, "candidate")} visible from ${potentialDocuments.length} source-mapped records.`;
  renderList(nodes.documentsRoot, visible, documentCard, "No candidate records match the current filters.");
}

function documentCard(item) {
  const card = document.createElement("article");
  card.className = `record-card priority-${(item.priority || "").toLowerCase()}`;

  const header = document.createElement("header");
  const titleBlock = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(
    textSpan(formatDate(item.date)),
    textSpan(laneNumber(item.laneId)),
    textSpan(item.type),
    textSpan(item.priority),
    textSpan(readinessLabel(documentReadiness(item)))
  );
  const title = document.createElement("h3");
  title.textContent = item.title;
  titleBlock.append(meta, title);

  const score = document.createElement("strong");
  score.className = "score";
  score.textContent = item.score ? item.score.toString() : "Review";
  header.append(titleBlock, score);

  const summary = document.createElement("p");
  summary.textContent = item.summary || "";

  const details = document.createElement("dl");
  details.className = "detail-grid";
  addDetail(details, "Repository", item.repository);
  addDetail(details, "Collection", item.collection);
  addDetail(details, "Identifier", item.identifier);
  addDetail(details, "Level", item.level);
  addDetail(details, "Pages", item.pages);

  const note = document.createElement("p");
  note.className = "source-note";
  note.textContent = item.sourceNote || "";

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (item.url) actions.append(linkButton("Source", item.url));
  if (item.pdfUrl) actions.append(linkButton("PDF", item.pdfUrl));
  actions.append(clipboardButton("Copy cite", documentNote(item), "Citation copied"));

  card.append(header, summary, details, tagList(item.tags || []), note, actions);
  return card;
}

function addDetail(root, label, value) {
  if (!value && value !== 0) return;
  const wrapper = document.createElement("div");
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value.toString();
  wrapper.append(dt, dd);
  root.append(wrapper);
}

function filteredLeads() {
  return sourceLeads
    .filter((lead) => {
      if (!matchesQuery(lead, state.leads.query)) return false;
      if (state.leads.lane && lead.laneId !== state.leads.lane) return false;
      if (state.leads.institution && lead.institution !== state.leads.institution) return false;
      if (state.leads.priority && lead.priority !== state.leads.priority) return false;
      return true;
    })
    .sort(byLaneThenDate);
}

function renderLeads() {
  const visible = filteredLeads();
  nodes.leadSummary.textContent = `${plural(visible.length, "source lead")} visible from ${sourceLeads.length}.`;
  renderList(nodes.leadsRoot, visible, leadCard, "No source leads match the current filters.");
}

function leadCard(lead) {
  const card = document.createElement("article");
  card.className = "lead-card";
  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(lead.priority), textSpan(laneNumber(lead.laneId)), textSpan(lead.type), textSpan(lead.date));
  const title = document.createElement("h3");
  title.textContent = lead.title;
  const note = document.createElement("p");
  note.textContent = lead.note;
  const details = document.createElement("dl");
  details.className = "detail-grid";
  addDetail(details, "Institution", lead.institution);
  addDetail(details, "Identifier", lead.identifier);
  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (lead.url) actions.append(linkButton("Open", lead.url));
  actions.append(clipboardButton("Copy lead", leadNote(lead), "Lead copied"));
  card.append(meta, title, note, details, tagList(lead.tags || []), actions);
  return card;
}

function filteredDiary() {
  return diaryReferences
    .filter((entry) => {
      if (!matchesQuery(entry, state.diary.query)) return false;
      if (state.diary.lane && entry.laneId !== state.diary.lane) return false;
      if (state.diary.year && getYear(entry.date) !== state.diary.year) return false;
      if (state.diary.eventType && entry.eventType !== state.diary.eventType) return false;
      return true;
    })
    .sort(byLaneThenDate);
}

function renderDiaryReferences() {
  const visible = filteredDiary();
  nodes.diarySummary.textContent = `${plural(visible.length, "diary reference")} visible from ${diaryReferences.length} searched calls and meetings.`;
  renderList(nodes.diaryRoot, visible, diaryCard, "No diary references match the current filters.");
}

function diaryCard(entry) {
  const card = document.createElement("article");
  card.className = `diary-card priority-${(entry.priority || "").toLowerCase()}`;

  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(formatDate(entry.date)), textSpan(laneNumber(entry.laneId)), textSpan(entry.eventType), textSpan(entry.priority));

  const title = document.createElement("h3");
  title.textContent = entry.title;

  const entryText = document.createElement("p");
  entryText.textContent = entry.diaryEntry;

  const details = document.createElement("dl");
  details.className = "detail-grid";
  addDetail(details, "Time", entry.time);
  addDetail(details, "Location", entry.location);
  addDetail(details, "Packet", entry.pdfPacket);

  const connection = document.createElement("p");
  connection.className = "source-note";
  connection.textContent = entry.volumeConnection;

  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (entry.url) actions.append(linkButton("Catalog", entry.url));
  if (entry.pdfUrl) actions.append(linkButton("PDF", entry.pdfUrl));
  actions.append(clipboardButton("Copy diary", diaryNote(entry), "Diary note copied"));

  card.append(meta, title, entryText, details, tagList(entry.tags || []), connection, actions);
  return card;
}

function filteredPublic() {
  return publicRecords
    .filter((item) => {
      if (!matchesQuery(item, state.public.query)) return false;
      if (state.public.year && getYear(item.date) !== state.public.year) return false;
      if (state.public.lane && item.laneId !== state.public.lane) return false;
      return true;
    })
    .sort((a, b) => (a.date || "").localeCompare(b.date || "") || a.title.localeCompare(b.title));
}

function renderPublic() {
  const visible = filteredPublic();
  nodes.publicSummary.textContent = `${plural(visible.length, "public anchor")} visible from ${publicRecords.length}.`;
  renderList(nodes.publicRoot, visible, compactRecordCard, "No public records match the current filters.");
}

function compactRecordCard(item) {
  const card = document.createElement("article");
  card.className = "compact-card";
  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(formatDate(item.date)), textSpan(laneNumber(item.laneId)), textSpan(item.identifier));
  const title = document.createElement("h3");
  title.textContent = item.title;
  const note = document.createElement("p");
  note.textContent = item.summary;
  const actions = document.createElement("div");
  actions.className = "card-actions";
  if (item.url) actions.append(linkButton("GovInfo", item.url));
  if (item.pdfUrl) actions.append(linkButton("PDF", item.pdfUrl));
  actions.append(clipboardButton("Copy cite", documentNote(item), "Citation copied"));
  card.append(meta, title, note, actions);
  return card;
}

function filteredLibrary() {
  return libraryPlan
    .filter((item) => {
      if (!matchesQuery(item, state.library.query)) return false;
      if (state.library.lane && item.laneId !== state.library.lane) return false;
      if (state.library.priority && item.priority !== state.library.priority) return false;
      return true;
    })
    .sort((a, b) => (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) || a.title.localeCompare(b.title));
}

function renderLibrary() {
  const visible = filteredLibrary();
  nodes.librarySummary.textContent = `${plural(visible.length, "pull-plan item")} visible from ${libraryPlan.length}.`;
  renderList(nodes.libraryRoot, visible, libraryCard, "No library plan items match the current filters.");
}

function libraryCard(item) {
  const card = document.createElement("article");
  card.className = "library-card";
  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(item.priority), textSpan(laneNumber(item.laneId)), textSpan(item.sourcePart));
  const title = document.createElement("h3");
  title.textContent = item.title;
  const office = document.createElement("p");
  office.className = "office-line";
  office.textContent = item.office;
  const goal = document.createElement("p");
  goal.textContent = item.visitGoal;
  const why = document.createElement("p");
  why.className = "source-note";
  why.textContent = item.whyItMatters;
  const folders = tagList(item.targetFolders || []);
  const onsiteActions = orderedList(item.onsiteActions || []);
  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(clipboardButton("Copy pull", libraryNote(item), "Pull note copied"));
  card.append(meta, title, office, goal, why, folders, onsiteActions, actions);
  return card;
}

function orderedList(values) {
  const list = document.createElement("ol");
  list.className = "action-list";
  for (const value of values) {
    const item = document.createElement("li");
    item.textContent = value;
    list.append(item);
  }
  return list;
}

function filteredGaps() {
  const priorityRank = new Map([
    ["Critical", 1],
    ["High", 2],
    ["Medium", 3],
    ["Low", 4]
  ]);
  return gapTracker
    .filter((gap) => {
      if (!matchesQuery(gap, state.gaps.query)) return false;
      if (state.gaps.lane && gap.laneId !== state.gaps.lane) return false;
      if (state.gaps.priority && gap.priority !== state.gaps.priority) return false;
      if (state.gaps.status && gap.status !== state.gaps.status) return false;
      return true;
    })
    .sort(
      (a, b) =>
        (priorityRank.get(a.priority) || 99) - (priorityRank.get(b.priority) || 99) ||
        (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) ||
        a.title.localeCompare(b.title)
    );
}

function renderGaps() {
  const visible = filteredGaps();
  nodes.gapSummary.textContent = `${plural(visible.length, "gap")} visible from ${gapTracker.length} compiler risk items.`;
  renderList(nodes.gapsRoot, visible, gapCard, "No gap items match the current filters.");
}

function gapCard(gap) {
  const card = document.createElement("article");
  card.className = `gap-card priority-${(gap.priority || "").toLowerCase()}`;
  const meta = document.createElement("div");
  meta.className = "record-meta";
  meta.append(textSpan(gap.priority), textSpan(gap.status), textSpan(laneNumber(gap.laneId)));
  const title = document.createElement("h3");
  title.textContent = gap.title;
  const evidence = document.createElement("p");
  evidence.className = "gap-evidence";
  evidence.textContent = gap.evidence;
  const problem = document.createElement("p");
  problem.textContent = gap.problem;
  const needed = document.createElement("p");
  needed.className = "source-note";
  needed.textContent = gap.needed;
  const resolution = document.createElement("p");
  resolution.className = "gap-resolution";
  resolution.textContent = gap.resolution || "";
  const remaining = document.createElement("p");
  remaining.className = "remaining-risk";
  remaining.textContent = gap.remainingRisk || "";
  card.append(meta, title, evidence, problem, needed);
  if (gap.resolution) card.append(resolution);
  if (gap.remainingRisk) card.append(remaining);
  card.append(orderedList(gap.nextActions || []));
  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(clipboardButton("Copy gap", gapNote(gap), "Gap note copied"));
  card.append(actions);
  return card;
}

function renderSourcePools() {
  const pools = [...sourcePools].sort(
    (a, b) => a.priority.localeCompare(b.priority) || (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99)
  );
  renderList(
    nodes.sourcePoolsRoot,
    pools,
    (pool) => {
      const card = document.createElement("article");
      card.className = "pool-card";
      const meta = document.createElement("div");
      meta.className = "record-meta";
      meta.append(textSpan(`Priority ${pool.priority}`), textSpan(laneNumber(pool.laneId)), textSpan(pool.institution));
      const title = document.createElement("h3");
      title.textContent = pool.title;
      const coverage = document.createElement("p");
      coverage.textContent = pool.coverage;
      const next = document.createElement("p");
      next.className = "source-note";
      next.textContent = pool.nextUse;
      const actions = document.createElement("div");
      actions.className = "card-actions";
      if (pool.url) actions.append(linkButton("Open", pool.url));
      actions.append(clipboardButton("Copy pool", sourcePoolNote(pool), "Pool note copied"));
      card.append(meta, title, coverage, next, actions);
      return card;
    },
    "No source pools loaded."
  );
}

function renderLedger() {
  renderList(
    nodes.ledgerRoot,
    sourceCopyLedger,
    (entry) => {
      const card = document.createElement("article");
      card.className = "ledger-card";
      const meta = document.createElement("div");
      meta.className = "record-meta";
      meta.append(textSpan(entry.status), textSpan(laneNumber(entry.laneId)), textSpan(entry.sourceClass));
      const title = document.createElement("h3");
      title.textContent = entry.title;
      const trail = document.createElement("p");
      trail.textContent = entry.repositoryTrail;
      const cue = document.createElement("p");
      cue.className = "source-note";
      cue.textContent = entry.reviewCue;
      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.append(clipboardButton("Copy ledger", ledgerNote(entry), "Ledger note copied"));
      card.append(meta, title, trail, cue, actions);
      return card;
    },
    "No source-copy controls loaded."
  );
}

function filteredPeople() {
  return persons
    .filter((person) => {
      if (!matchesQuery(person, state.people.query)) return false;
      if (state.people.lane && !(person.laneIds || []).includes(state.people.lane)) return false;
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function renderPeople() {
  const visible = filteredPeople();
  nodes.personSummary.textContent = `${plural(visible.length, "person", "people")} visible from ${persons.length}.`;
  renderList(
    nodes.peopleRoot,
    visible,
    (person) => {
      const card = document.createElement("article");
      card.className = "person-card";
      const title = document.createElement("h3");
      title.textContent = person.name;
      const role = document.createElement("p");
      role.className = "office-line";
      role.textContent = person.role;
      const note = document.createElement("p");
      note.textContent = person.note;
      card.append(title, role, note, tagList((person.laneIds || []).map(laneTitle)));
      return card;
    },
    "No people match the current filters."
  );
}

function renderReferences() {
  renderList(
    nodes.referencesRoot,
    references,
    (source) => {
      const anchor = document.createElement("a");
      anchor.className = "reference-card";
      anchor.href = source.url;
      anchor.rel = "noreferrer";
      anchor.target = "_blank";
      anchor.textContent = source.label;
      return anchor;
    },
    "No references loaded."
  );
}

function setupFilters() {
  const laneOptions = lanes.map((lane) => [lane.title, lane.id]);
  const laneSelects = [
    [nodes.documentLaneFilter, "All lanes"],
    [nodes.leadLaneFilter, "All lanes"],
    [nodes.diaryLaneFilter, "All lanes"],
    [nodes.publicLaneFilter, "All lanes"],
    [nodes.libraryLaneFilter, "All lanes"],
    [nodes.gapLaneFilter, "All lanes"],
    [nodes.personLaneFilter, "All lanes"]
  ];
  for (const [select, label] of laneSelects) {
    if (!select) continue;
    select.replaceChildren(new Option(label, ""), ...laneOptions.map(([text, value]) => new Option(text, value)));
  }

  addOptions(nodes.documentTypeFilter, uniqueSorted(potentialDocuments.map((item) => item.type)), "All types");
  addOptions(nodes.documentPriorityFilter, uniqueSorted(potentialDocuments.map((item) => item.priority)), "All priorities");
  addOptions(nodes.documentReadinessFilter, readinessBuckets.map((bucket) => bucket.id), "All readiness");
  if (nodes.documentReadinessFilter) {
    for (const option of nodes.documentReadinessFilter.options) {
      if (option.value) option.textContent = readinessLabel(option.value);
    }
  }
  addOptions(nodes.leadInstitutionFilter, uniqueSorted(sourceLeads.map((item) => item.institution)), "All institutions");
  addOptions(nodes.leadPriorityFilter, uniqueSorted(sourceLeads.map((item) => item.priority)), "All priorities");
  addOptions(nodes.diaryYearFilter, uniqueSorted(diaryReferences.map((item) => getYear(item.date))), "All years");
  addOptions(nodes.diaryEventFilter, uniqueSorted(diaryReferences.map((item) => item.eventType)), "All event types");
  addOptions(nodes.publicYearFilter, uniqueSorted(publicRecords.map((item) => getYear(item.date))), "All years");
  addOptions(nodes.libraryPriorityFilter, uniqueSorted(libraryPlan.map((item) => item.priority)), "All priorities");
  addOptions(nodes.gapPriorityFilter, uniqueSorted(gapTracker.map((item) => item.priority)), "All priorities");
  addOptions(nodes.gapStatusFilter, uniqueSorted(gapTracker.map((item) => item.status)), "All statuses");
}

function bindEvents() {
  bindInput(nodes.documentSearch, (value) => {
    state.documents.query = value;
    renderDocuments();
  });
  bindSelect(nodes.documentLaneFilter, (value) => {
    state.documents.lane = value;
    renderDocuments();
  });
  bindSelect(nodes.documentTypeFilter, (value) => {
    state.documents.type = value;
    renderDocuments();
  });
  bindSelect(nodes.documentPriorityFilter, (value) => {
    state.documents.priority = value;
    renderDocuments();
  });
  bindSelect(nodes.documentReadinessFilter, (value) => {
    state.documents.readiness = value;
    renderDocuments();
  });
  bindSelect(nodes.documentSort, (value) => {
    state.documents.sort = value;
    renderDocuments();
  });
  nodes.clearDocumentFilters?.addEventListener("click", () => {
    resetGroup("documents", [
      nodes.documentSearch,
      nodes.documentLaneFilter,
      nodes.documentTypeFilter,
      nodes.documentPriorityFilter,
      nodes.documentReadinessFilter,
      nodes.documentSort
    ]);
    renderDocuments();
  });
  nodes.exportDocuments?.addEventListener("click", () => exportCsv("volume-viii-documents.csv", filteredDocuments(), documentColumns()));
  nodes.copyDocuments?.addEventListener("click", () => copyText(chronologyHandoffNote(filteredDocuments()), "Chronology handoff copied"));
  nodes.downloadDocuments?.addEventListener("click", () => downloadText(chronologyHandoffFilename(), chronologyHandoffNote(filteredDocuments())));
  nodes.copyDocumentView?.addEventListener("click", () => copyText(documentViewUrl(), "Chronology view link copied"));
  nodes.copyOutlines?.addEventListener("click", () => copyText(chapterOutlinesNote(chapterOutlineItems()), "Outlines copied"));
  nodes.copyCloseout?.addEventListener("click", () => copyText(closeoutBoardNote(closeoutItems()), "Closeout copied"));
  nodes.copyAssembly?.addEventListener("click", () => copyText(chapterAssemblyBoardNote(chapterAssemblyItems()), "Draft packets copied"));
  nodes.copyManuscripts?.addEventListener("click", () => copyText(documentManuscriptBoardNote(documentManuscriptItems()), "Manuscript stubs copied"));
  nodes.copyClearance?.addEventListener("click", () => copyText(clearanceBoardNote(clearanceItems()), "Clearance routing copied"));
  nodes.copyCirculation?.addEventListener("click", () => copyText(circulationBoardNote(circulationBatchItems()), "Circulation batches copied"));
  nodes.copyDecisions?.addEventListener("click", () => copyText(decisionBoardNote(decisionItems()), "Decisions copied"));
  nodes.copyApparatus?.addEventListener("click", () => copyText(apparatusBoardNote(apparatusItems()), "Apparatus copied"));
  nodes.copySequence?.addEventListener("click", () => copyText(selectionSequenceNote(selectionSequenceItems()), "Sequence copied"));
  nodes.copyBacktrace?.addEventListener("click", () => copyText(publicBacktraceNote(publicBacktraceItems()), "Backtrace copied"));
  nodes.copyAnnotations?.addEventListener("click", () => copyText(annotationQueueNote(annotationItems()), "Annotation queue copied"));
  nodes.copyQa?.addEventListener("click", () => copyText(compilerQaNote(compilerQaItems()), "QA copied"));
  nodes.copyStageGates?.addEventListener("click", () => copyText(stageGateBoardNote(stageGateItems()), "Stage gates copied"));
  nodes.copyCallSlips?.addEventListener("click", () => copyText(callSlipQueueNote(callSlipItems()), "Call slips copied"));
  nodes.copyIndexing?.addEventListener("click", () => copyText(indexingQueueNote(indexingItems()), "Index queue copied"));

  bindInput(nodes.leadSearch, (value) => {
    state.leads.query = value;
    renderLeads();
  });
  bindSelect(nodes.leadLaneFilter, (value) => {
    state.leads.lane = value;
    renderLeads();
  });
  bindSelect(nodes.leadInstitutionFilter, (value) => {
    state.leads.institution = value;
    renderLeads();
  });
  bindSelect(nodes.leadPriorityFilter, (value) => {
    state.leads.priority = value;
    renderLeads();
  });
  nodes.clearLeadFilters?.addEventListener("click", () => {
    resetGroup("leads", [nodes.leadSearch, nodes.leadLaneFilter, nodes.leadInstitutionFilter, nodes.leadPriorityFilter]);
    renderLeads();
  });
  nodes.exportLeads?.addEventListener("click", () => exportCsv("volume-viii-source-leads.csv", filteredLeads(), leadColumns()));

  bindInput(nodes.diarySearch, (value) => {
    state.diary.query = value;
    renderDiaryReferences();
  });
  bindSelect(nodes.diaryLaneFilter, (value) => {
    state.diary.lane = value;
    renderDiaryReferences();
  });
  bindSelect(nodes.diaryYearFilter, (value) => {
    state.diary.year = value;
    renderDiaryReferences();
  });
  bindSelect(nodes.diaryEventFilter, (value) => {
    state.diary.eventType = value;
    renderDiaryReferences();
  });
  nodes.clearDiaryFilters?.addEventListener("click", () => {
    resetGroup("diary", [nodes.diarySearch, nodes.diaryLaneFilter, nodes.diaryYearFilter, nodes.diaryEventFilter]);
    renderDiaryReferences();
  });
  nodes.exportDiary?.addEventListener("click", () => exportCsv("volume-viii-daily-diary.csv", filteredDiary(), diaryColumns()));

  bindInput(nodes.publicSearch, (value) => {
    state.public.query = value;
    renderPublic();
  });
  bindSelect(nodes.publicYearFilter, (value) => {
    state.public.year = value;
    renderPublic();
  });
  bindSelect(nodes.publicLaneFilter, (value) => {
    state.public.lane = value;
    renderPublic();
  });
  nodes.clearPublicFilters?.addEventListener("click", () => {
    resetGroup("public", [nodes.publicSearch, nodes.publicYearFilter, nodes.publicLaneFilter]);
    renderPublic();
  });
  nodes.exportPublic?.addEventListener("click", () => exportCsv("volume-viii-public-papers.csv", filteredPublic(), documentColumns()));

  bindInput(nodes.librarySearch, (value) => {
    state.library.query = value;
    renderLibrary();
  });
  bindSelect(nodes.libraryLaneFilter, (value) => {
    state.library.lane = value;
    renderLibrary();
  });
  bindSelect(nodes.libraryPriorityFilter, (value) => {
    state.library.priority = value;
    renderLibrary();
  });
  nodes.clearLibraryFilters?.addEventListener("click", () => {
    resetGroup("library", [nodes.librarySearch, nodes.libraryLaneFilter, nodes.libraryPriorityFilter]);
    renderLibrary();
  });
  nodes.exportLibrary?.addEventListener("click", () => exportCsv("volume-viii-library-plan.csv", filteredLibrary(), libraryColumns()));

  bindInput(nodes.gapSearch, (value) => {
    state.gaps.query = value;
    renderGaps();
  });
  bindSelect(nodes.gapLaneFilter, (value) => {
    state.gaps.lane = value;
    renderGaps();
  });
  bindSelect(nodes.gapPriorityFilter, (value) => {
    state.gaps.priority = value;
    renderGaps();
  });
  bindSelect(nodes.gapStatusFilter, (value) => {
    state.gaps.status = value;
    renderGaps();
  });
  nodes.clearGapFilters?.addEventListener("click", () => {
    resetGroup("gaps", [nodes.gapSearch, nodes.gapLaneFilter, nodes.gapPriorityFilter, nodes.gapStatusFilter]);
    renderGaps();
  });
  nodes.exportGaps?.addEventListener("click", () => exportCsv("volume-viii-gaps.csv", filteredGaps(), gapColumns()));

  bindInput(nodes.personSearch, (value) => {
    state.people.query = value;
    renderPeople();
  });
  bindSelect(nodes.personLaneFilter, (value) => {
    state.people.lane = value;
    renderPeople();
  });
  nodes.clearPersonFilters?.addEventListener("click", () => {
    resetGroup("people", [nodes.personSearch, nodes.personLaneFilter]);
    renderPeople();
  });
  nodes.exportPeople?.addEventListener("click", () => exportCsv("volume-viii-people.csv", filteredPeople(), personColumns()));
}

function bindInput(node, callback) {
  node?.addEventListener("input", (event) => callback(event.target.value));
}

function bindSelect(node, callback) {
  node?.addEventListener("change", (event) => callback(event.target.value));
}

function resetGroup(group, controls) {
  for (const key of Object.keys(state[group])) state[group][key] = "";
  for (const control of controls) {
    if (control) control.value = "";
  }
}

function documentColumns() {
  return [
    ["date", (item) => item.date],
    ["lane", (item) => laneTitle(item.laneId)],
    ["title", (item) => item.title],
    ["type", (item) => item.type],
    ["priority", (item) => item.priority],
    ["readiness", (item) => readinessLabel(documentReadiness(item))],
    ["score", (item) => item.score],
    ["repository", (item) => item.repository],
    ["collection", (item) => item.collection],
    ["identifier", (item) => item.identifier],
    ["pages", (item) => item.pages],
    ["summary", (item) => item.summary],
    ["url", (item) => item.url],
    ["pdfUrl", (item) => item.pdfUrl]
  ];
}

function leadColumns() {
  return [
    ["date", (item) => item.date],
    ["lane", (item) => laneTitle(item.laneId)],
    ["title", (item) => item.title],
    ["institution", (item) => item.institution],
    ["type", (item) => item.type],
    ["priority", (item) => item.priority],
    ["identifier", (item) => item.identifier],
    ["note", (item) => item.note],
    ["url", (item) => item.url]
  ];
}

function diaryColumns() {
  return [
    ["date", (item) => item.date],
    ["time", (item) => item.time],
    ["lane", (item) => laneTitle(item.laneId)],
    ["eventType", (item) => item.eventType],
    ["title", (item) => item.title],
    ["location", (item) => item.location],
    ["diaryEntry", (item) => item.diaryEntry],
    ["volumeConnection", (item) => item.volumeConnection],
    ["packet", (item) => item.pdfPacket],
    ["url", (item) => item.url],
    ["pdfUrl", (item) => item.pdfUrl]
  ];
}

function libraryColumns() {
  return [
    ["priority", (item) => item.priority],
    ["lane", (item) => laneTitle(item.laneId)],
    ["title", (item) => item.title],
    ["office", (item) => item.office],
    ["sourcePart", (item) => item.sourcePart],
    ["targetFolders", (item) => (item.targetFolders || []).join("; ")],
    ["visitGoal", (item) => item.visitGoal],
    ["whyItMatters", (item) => item.whyItMatters],
    ["onsiteActions", (item) => (item.onsiteActions || []).join("; ")]
  ];
}

function gapColumns() {
  return [
    ["priority", (item) => item.priority],
    ["status", (item) => item.status],
    ["lane", (item) => laneTitle(item.laneId)],
    ["title", (item) => item.title],
    ["evidence", (item) => item.evidence],
    ["problem", (item) => item.problem],
    ["needed", (item) => item.needed],
    ["resolution", (item) => item.resolution],
    ["remainingRisk", (item) => item.remainingRisk],
    ["nextActions", (item) => (item.nextActions || []).join("; ")]
  ];
}

function personColumns() {
  return [
    ["name", (item) => item.name],
    ["role", (item) => item.role],
    ["lanes", (item) => (item.laneIds || []).map(laneTitle).join("; ")],
    ["note", (item) => item.note]
  ];
}

function exportCsv(filename, rows, columns) {
  const header = columns.map(([label]) => label);
  const body = rows.map((row) => columns.map(([, accessor]) => csvValue(accessor(row))));
  const csv = [header.map(csvValue).join(","), ...body.map((line) => line.join(","))].join("\n");
  window.__lastCsvExport = { filename, rowCount: rows.length, csv };
  document.documentElement.dataset.lastExportFilename = filename;
  document.documentElement.dataset.lastExportRowCount = rows.length.toString();
  document.documentElement.dataset.lastExportColumns = header.join("|");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function downloadText(filename, text) {
  window.__lastTextDownload = { filename, text };
  document.documentElement.dataset.lastDownloadFilename = filename;
  document.documentElement.dataset.lastDownloadText = text;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function csvValue(value) {
  const text = value === undefined || value === null ? "" : value.toString();
  return `"${text.replace(/"/g, '""')}"`;
}

function renderAll() {
  setStats();
  renderWorkbench();
  renderLanes();
  renderHandoff();
  renderDocuments();
  renderPackets();
  renderChapterOutlines();
  renderCloseoutBoard();
  renderChapterAssembly();
  renderDocumentManuscripts();
  renderClearanceRouter();
  renderCirculationBatches();
  renderDecisionLedger();
  renderApparatusPack();
  renderConcordance();
  renderSelectionBoard();
  renderSelectionSequence();
  renderBacktraceBoard();
  renderAnnotationQueue();
  renderCoverageMatrix();
  renderCompilerQa();
  renderStageGates();
  renderRequestQueue();
  renderCallSlips();
  renderRepositoryAgenda();
  renderActionQueue();
  renderBriefingPack();
  renderIndexingQueue();
  renderLeads();
  renderDiaryReferences();
  renderPublic();
  renderLibrary();
  renderGaps();
  renderSourcePools();
  renderLedger();
  renderPeople();
  renderReferences();
}

setupFilters();
applyDocumentViewFromUrl();
bindEvents();
renderAll();
