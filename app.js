const data = window.VOLUME_VIII_DATA || {};
const lanes = data.lanes || [];
const sourceLeads = data.sourceLeads || [];
const potentialDocuments = data.potentialDocuments || [];
const publicRecords = potentialDocuments.filter((item) => item.type === "Public Papers");
const libraryPlan = data.libraryPlan || [];
const gapTracker = data.gapTracker || [];
const sourcePools = data.sourcePools || [];
const sourceCopyLedger = data.sourceCopyLedger || [];
const persons = data.persons || [];
const references = data.sources || [];

const laneById = new Map(lanes.map((lane) => [lane.id, lane]));
const laneOrder = new Map(lanes.map((lane, index) => [lane.id, index]));

const state = {
  documents: { query: "", lane: "", type: "", priority: "" },
  leads: { query: "", lane: "", institution: "", priority: "" },
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
  documentsRoot: document.querySelector("#documents-root"),
  documentSummary: document.querySelector("#document-summary"),
  documentSearch: document.querySelector("#document-search"),
  documentLaneFilter: document.querySelector("#document-lane-filter"),
  documentTypeFilter: document.querySelector("#document-type-filter"),
  documentPriorityFilter: document.querySelector("#document-priority-filter"),
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
  referencesRoot: document.querySelector("#references-root")
};

function laneTitle(laneId) {
  return laneById.get(laneId)?.title || "Unassigned";
}

function laneNumber(laneId) {
  return laneById.get(laneId)?.number || "Lane";
}

function byLaneThenDate(a, b) {
  return (
    (laneOrder.get(a.laneId) ?? 99) - (laneOrder.get(b.laneId) ?? 99) ||
    (a.date || "").localeCompare(b.date || "") ||
    (b.score || 0) - (a.score || 0) ||
    (a.title || "").localeCompare(b.title || "")
  );
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

function textForSearch(item) {
  return [
    item.id,
    item.title,
    item.name,
    item.role,
    item.office,
    item.institution,
    item.repository,
    item.collection,
    item.identifier,
    item.type,
    item.priority,
    item.status,
    item.sourceClass,
    item.laneId,
    laneTitle(item.laneId),
    item.summary,
    item.note,
    item.sourceNote,
    item.problem,
    item.evidence,
    item.needed,
    item.visitGoal,
    item.whyItMatters,
    item.coverage,
    item.nextUse,
    item.repositoryTrail,
    item.reviewCue,
    (item.tags || []).join(" "),
    (item.topics || []).join(" "),
    (item.targetFolders || []).join(" "),
    (item.onsiteActions || []).join(" "),
    (item.nextActions || []).join(" "),
    (item.laneIds || []).map(laneTitle).join(" ")
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
  nodes.stats.gaps.textContent = gapTracker.filter((gap) => gap.status !== "Closed").length.toString();
  nodes.stats.people.textContent = persons.length.toString();
  nodes.stats.pages.textContent = pages.toString();
}

function renderWorkbench() {
  const releasedItems = potentialDocuments.filter((item) => /released|memcon|cable/i.test(`${item.type} ${item.level}`));
  const publicOnly = publicRecords.length;
  const critical = gapTracker.filter((gap) => gap.priority === "Critical");
  const highSourcePools = sourcePools.filter((pool) => pool.priority === "A");
  const lanesWithDocs = uniqueSorted(potentialDocuments.map((item) => item.laneId)).length;
  const cards = [
    metricCard("Planned official status", data.meta?.status || "Planned", "The page preserves source-map logic until the Office of the Historian publishes official document numbers."),
    metricCard("Item-level candidates", releasedItems.length, `${plural(publicOnly, "public anchor")} stay separate from released memcons, cables, and packet leads.`),
    metricCard("Lanes represented", lanesWithDocs, `${lanes.length} provisional lanes keep boundary cases visible.`),
    metricCard("Priority source pools", highSourcePools.length, "Clinton Library, State FOIA, GovInfo, and NARA trails are kept as separate intake lanes."),
    metricCard("Critical gaps", critical.length, "Open risks drive the next on-site and FOIA review pass.")
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
      count.textContent = `${plural(docs.length, "candidate")} / ${plural(leads.length, "source lead")} / ${plural(gaps.length, "gap")}`;
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
      return true;
    })
    .sort(byLaneThenDate);
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
  meta.append(textSpan(formatDate(item.date)), textSpan(laneNumber(item.laneId)), textSpan(item.type), textSpan(item.priority));
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
  card.append(meta, title, note, details, tagList(lead.tags || []), actions);
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
  const actions = orderedList(item.onsiteActions || []);
  card.append(meta, title, office, goal, why, folders, actions);
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
  card.append(meta, title, evidence, problem, needed, orderedList(gap.nextActions || []));
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
      card.append(meta, title, trail, cue);
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
  addOptions(nodes.leadInstitutionFilter, uniqueSorted(sourceLeads.map((item) => item.institution)), "All institutions");
  addOptions(nodes.leadPriorityFilter, uniqueSorted(sourceLeads.map((item) => item.priority)), "All priorities");
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
  nodes.clearDocumentFilters?.addEventListener("click", () => {
    resetGroup("documents", [
      nodes.documentSearch,
      nodes.documentLaneFilter,
      nodes.documentTypeFilter,
      nodes.documentPriorityFilter
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
  renderDocuments();
  renderLeads();
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
