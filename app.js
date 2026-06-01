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
  concordanceRoot: document.querySelector("#concordance-root"),
  selectionRoot: document.querySelector("#selection-root"),
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
    nodes.documentSort
  ]);
  state.documents.lane = laneId;
  if (nodes.documentLaneFilter) nodes.documentLaneFilter.value = laneId;
  renderDocuments();
  scrollToSection("#documents");
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
  renderConcordance();
  renderSelectionBoard();
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
bindEvents();
renderAll();
