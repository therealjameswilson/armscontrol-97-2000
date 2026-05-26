window.VOLUME_VIII_DATA = {
  meta: {
    volumeId: "frus1993-00v08",
    title: "FRUS 1993-2000, Volume VIII",
    subtitle: "Arms Control and Nonproliferation, 1997-2000",
    status: "Planned",
    officialUrl: "https://history.state.gov/historicaldocuments/frus1993-00v08",
    siblingUrl: "https://history.state.gov/historicaldocuments/frus1993-00v07",
    summary:
      "Compiler-facing source map for the planned second Clinton arms-control volume, with public anchors, archival leads, Presidential Daily Diary calendar evidence, item-level released records, and source-gap controls kept visibly separate."
  },
  volumeHandoff: [
    {
      id: "handoff-npt-ctbt",
      priorChapter: "NPT and CTBT",
      priorChapterId: "ctbt",
      volumeViiiLaneIds: ["ctbt", "nonproliferation-regimes"],
      continuity:
        "Volume VII carries the 1995 NPT indefinite extension, nuclear testing review, CTBT negotiation, and 1996 signature sequence.",
      newQuestion:
        "Volume VIII follows how the signed treaty moved into Senate transmission, the ratification campaign, the October 1999 defeat, and diplomatic aftercare.",
      sourceAction:
        "Keep Treaty Doc. 105-28, 2015-1095-F, S. Hrg. 106-262, the October 1999 Public Papers statements, and the Mamedov cable tied back to the Volume VII CTBT signature and NPT Article VI frame.",
      tags: ["CTBT", "NPT", "ratification", "Senate"]
    },
    {
      id: "handoff-strategic-arms",
      priorChapter: "Strategic Arms and Nuclear Security",
      priorChapterId: "strategic-arms",
      volumeViiiLaneIds: ["strategic-stability", "abm-nmd", "fissile-ctr"],
      continuity:
        "Volume VII tracks early Clinton strategic stability, missile systems, nuclear security, and post-Soviet weapons-reduction transparency.",
      newQuestion:
        "Volume VIII turns that foundation into the Helsinki, Cologne, Moscow, Okinawa, and New York sequence: START III, START II ratification politics, ABM/NMD pressure, early warning, and plutonium disposition.",
      sourceAction:
        "Pair public summit texts with Defense Policy folders, Strobe FOIA summit-prep records, Helsinki/Cologne memcons, and June 2000 Moscow source trails.",
      tags: ["START III", "strategic stability", "ABM", "plutonium"]
    },
    {
      id: "handoff-start-ii",
      priorChapter: "START II Ratification",
      priorChapterId: "start-ii",
      volumeViiiLaneIds: ["strategic-stability", "abm-nmd"],
      continuity:
        "Volume VII isolates U.S. Senate handling, Russian linkage, and the January 1996 ratification moment.",
      newQuestion:
        "Volume VIII keeps START II alive as a Russian Duma, ABM, and START III sequencing problem rather than treating it as completed business.",
      sourceAction:
        "Use Helsinki START III guidelines, START II Duma statements, START III/ABM PC folders, and ABM demarcation/NMD records as the continuation chain.",
      tags: ["START II", "Duma", "START III", "ABM"]
    },
    {
      id: "handoff-ctr-heu",
      priorChapter: "Cooperative Threat Reduction and HEU Agreement",
      priorChapterId: "ctr-heu",
      volumeViiiLaneIds: ["fissile-ctr"],
      continuity:
        "Volume VII covers Nunn-Lugar implementation, Ukraine denuclearization, HEU transparency, DOE/USEC/Minatom handling, and nuclear-materials security.",
      newQuestion:
        "Volume VIII should show implementation maturity: MPC&A, plutonium disposition, early-warning data exchange, launch notification, and Russia/Ukraine trip records.",
      sourceAction:
        "Keep June 2000 plutonium and Joint Center statements connected to DOE, DOD, USEC, Minatom, MPC&A, and trip-book pull targets.",
      tags: ["CTR", "HEU", "MPC&A", "plutonium"]
    },
    {
      id: "handoff-nonproliferation",
      priorChapter: "Nonproliferation Regimes",
      priorChapterId: "nonproliferation",
      volumeViiiLaneIds: ["nonproliferation-regimes", "regional-proliferation"],
      continuity:
        "Volume VII collects fissile material policy, MTCR, nuclear smuggling, export controls, and multilateral nonproliferation planning outside the NPT/CTBT chapter.",
      newQuestion:
        "Volume VIII should carry that regime logic into the 2000 NPT review cycle, Iran Nonproliferation Act, WMD emergency renewals, export-control sanctions, and regional case files.",
      sourceAction:
        "Keep NSC Nonproliferation, Gary Samore, subject-file, GovInfo, Congress.gov, and State FOIA paths visible as separate source classes.",
      tags: ["NPT review", "MTCR", "Iran", "export controls"]
    },
    {
      id: "handoff-counterproliferation",
      priorChapter: "Counterproliferation",
      priorChapterId: "counterproliferation",
      volumeViiiLaneIds: ["regional-proliferation", "abm-nmd", "cbw"],
      continuity:
        "Volume VII tracks PDD/NSC-18, the Defense Counterproliferation Initiative, WMD military planning, theater missile defense, biological defense, and intelligence support.",
      newQuestion:
        "Volume VIII should show how those concepts surfaced in NMD, South Asia sanctions and restraint diplomacy, DPRK missile diplomacy, CBW terrorism, and recurring WMD emergency reporting.",
      sourceAction:
        "Tag counterproliferation material separately from treaty diplomacy so theater missile defense, intelligence, military planning, and sanctions files do not disappear inside regional narratives.",
      tags: ["counterproliferation", "WMD", "NMD", "sanctions"]
    },
    {
      id: "handoff-regional",
      priorChapter: "Regional Proliferation Cases",
      priorChapterId: "regional",
      volumeViiiLaneIds: ["regional-proliferation"],
      continuity:
        "Volume VII starts with North Korea, former-Soviet leakage, China, the Middle East, South Asia, and other regional source paths.",
      newQuestion:
        "Volume VIII must rebalance the regional chapter around South Asia nuclear tests, DPRK Taepo Dong/Perry process/KEDO diplomacy, Iran, Iraq/UNSCOM, China technology transfer, and former-Soviet leakage.",
      sourceAction:
        "Keep DPRK collection leads, South Asia MDR 2006-0859-M, Talbott FOIA searches, Iran/China source paths, and trip-book pulls in one comparative lane.",
      tags: ["South Asia", "DPRK", "Iran", "China"]
    },
    {
      id: "handoff-cbw",
      priorChapter: "Chemical and Biological Weapons",
      priorChapterId: "cbw-conventional",
      volumeViiiLaneIds: ["cbw"],
      continuity:
        "Volume VII builds the CWC ratification, BWC strengthening, Australia Group, Aum Shinrikyo, UNSCOM, and CBW reporting base.",
      newQuestion:
        "Volume VIII should move from treaty passage to implementation: Russian CWC ratification, declarations, compliance, BWC protocol work, CBW terrorism, and legal/policy files.",
      sourceAction:
        "Use Elisa Harris CWC files, Helms treaty files, Legal Adviser and ACDA/State records, and Public Papers endpoint markers as separate evidence layers.",
      tags: ["CWC", "BWC", "CBW terrorism", "compliance"]
    },
    {
      id: "handoff-conventional-landmines",
      priorChapter: "Conventional Arms and Landmines",
      priorChapterId: "conventional-landmines",
      volumeViiiLaneIds: ["conventional-cfe"],
      continuity:
        "Volume VII turns landmines, CCW/Protocol II, conventional arms transfers, and export controls into a visible review lane.",
      newQuestion:
        "Volume VIII should preserve that lane while adding CFE adaptation, Istanbul final-act records, flank issues, NATO/Russia conventional-force questions, and continued landmine policy.",
      sourceAction:
        "Keep OSCE CFE records and Clinton Library CFE folders tied to arms-control content, while broader NATO enlargement remains a boundary note.",
      tags: ["CFE", "landmines", "CCW", "arms transfers"]
    }
  ],
  lanes: [
    {
      id: "volume-control",
      number: "Frame",
      title: "Volume Control",
      status: "Official frame",
      summary:
        "Keep the official planned status, Volume VII handoff, and overlap with Russia/F.S.U. source lanes visible before any item is promoted.",
      topics: ["FRUS status", "Volume VII handoff", "source boundaries"]
    },
    {
      id: "strategic-stability",
      number: "Chapter 1",
      title: "START III, START II, and Strategic Stability",
      status: "Core chapter",
      summary:
        "Follow the Helsinki, Cologne, Moscow, Okinawa, and New York strategic-stability sequence: START III guidelines, START II ratification politics, early warning, and Putin-era closing statements.",
      topics: ["START III", "START II", "strategic stability"]
    },
    {
      id: "ctbt",
      number: "Chapter 2",
      title: "CTBT Ratification and Test-Ban Diplomacy",
      status: "High risk",
      summary:
        "Track the treaty transmission, Senate campaign, October 1999 defeat, and Russian reaction through public statements, State FOIA records, and Clinton Library CTBT files.",
      topics: ["CTBT", "Senate", "Russia"]
    },
    {
      id: "abm-nmd",
      number: "Chapter 3",
      title: "ABM Treaty and National Missile Defense",
      status: "Core chapter",
      summary:
        "Hold the 1997 ABM demarcation, 1999 NMD legislation, Russian cooperative-defense proposals, 2000 ABM MOU handling, and summit negotiations in one review lane.",
      topics: ["ABM Treaty", "NMD", "missile defense"]
    },
    {
      id: "fissile-ctr",
      number: "Chapter 4",
      title: "Fissile Materials, Plutonium, and CTR",
      status: "Implementation lane",
      summary:
        "Map post-Soviet nuclear security, weapon-grade plutonium disposition, missile-launch notification, peaceful nuclear cooperation, and CTR implementation leads.",
      topics: ["plutonium", "CTR", "early warning"]
    },
    {
      id: "nonproliferation-regimes",
      number: "Chapter 5",
      title: "Nonproliferation Regimes and Export Controls",
      status: "Core chapter",
      summary:
        "Separate NPT review-cycle diplomacy, Iran nonproliferation legislation, MTCR/export controls, WMD emergency renewals, and ACDA/State source paths.",
      topics: ["NPT", "Iran Nonproliferation Act", "export controls"]
    },
    {
      id: "regional-proliferation",
      number: "Chapter 6",
      title: "Regional Proliferation Cases",
      status: "Balance watch",
      summary:
        "Balance South Asia nuclear testing, North Korea missile/nuclear diplomacy, Iran, Iraq/UNSCOM, China technology transfer, and former-Soviet leakage without letting any single case absorb the volume.",
      topics: ["South Asia", "North Korea", "Iran"]
    },
    {
      id: "cbw",
      number: "Chapter 7",
      title: "Chemical and Biological Weapons",
      status: "Treaty lane",
      summary:
        "Track CWC ratification and implementation, Russian chemical weapons declarations, BWC strengthening, CBW terrorism concerns, and Australia Group source paths.",
      topics: ["CWC", "BWC", "CBW terrorism"]
    },
    {
      id: "conventional-cfe",
      number: "Chapter 8",
      title: "CFE, Conventional Arms, and Landmines",
      status: "Boundary lane",
      summary:
        "Hold the CFE adaptation endgame, NATO/Russia conventional-force questions, landmine policy, and arms-transfer controls that should not be lost inside nuclear chapters.",
      topics: ["CFE", "landmines", "conventional arms"]
    }
  ],
  sourceLeads: [
    {
      id: "lead-official-volume",
      title: "Official FRUS Volume VIII page",
      laneId: "volume-control",
      institution: "Office of the Historian",
      type: "Volume anchor",
      priority: "Anchor",
      date: "1997-2000",
      identifier: "frus1993-00v08",
      url: "https://history.state.gov/historicaldocuments/frus1993-00v08",
      note:
        "Official title and status page for the planned volume. Use it as the public boundary for this assister.",
      tags: ["official", "planned", "volume"]
    },
    {
      id: "lead-clinton-subseries",
      title: "Clinton administration FRUS subseries",
      laneId: "volume-control",
      institution: "Office of the Historian",
      type: "Series boundary",
      priority: "Anchor",
      date: "1993-2000",
      identifier: "Clinton subseries",
      url: "https://history.state.gov/historicaldocuments/clinton",
      note:
        "Places Volume VIII beside Volume VII and other Clinton volumes, useful for deciding what belongs in adjacent Russia, Europe, South Asia, or Korea volumes.",
      tags: ["official", "boundary", "Clinton"]
    },
    {
      id: "lead-status-series",
      title: "Status of the Series entry",
      laneId: "volume-control",
      institution: "Office of the Historian",
      type: "Status anchor",
      priority: "Anchor",
      date: "current",
      identifier: "Planned",
      url: "https://history.state.gov/historicaldocuments/status-of-the-series",
      note:
        "The planned status means this site should expose source trails, risks, and candidate records rather than imply a published FRUS chronology.",
      tags: ["official", "status", "planned"]
    },
    {
      id: "lead-volume-vii",
      title: "FRUS Volume VII official page",
      laneId: "volume-control",
      institution: "Office of the Historian",
      type: "Handoff anchor",
      priority: "High",
      date: "1993-1996",
      identifier: "frus1993-00v07",
      url: "https://history.state.gov/historicaldocuments/frus1993-00v07",
      note:
        "Volume VII covers 1993-1996 and supplies the treaty-negotiation handoff for CTBT, CWC, START II, CTR, and regional cases continued here.",
      tags: ["Volume VII", "handoff", "1993-1996"]
    },
    {
      id: "lead-volume-vii-assister",
      title: "Volume VII arms-control assister handoff",
      laneId: "volume-control",
      institution: "GitHub Pages",
      type: "Assister handoff",
      priority: "High",
      date: "1993-1996",
      identifier: "Clinton-armscontrol-93-96",
      url: "https://therealjameswilson.github.io/Clinton-armscontrol-93-96/",
      note:
        "Companion source map for the first Clinton arms-control volume. Use its chapter map, gap analysis, public statement index, and Clinton Library pull plan as the explicit starting point for Volume VIII continuity.",
      tags: ["Volume VII", "handoff", "companion assister"]
    },
    {
      id: "lead-defense-policy",
      title: "Records of the NSC Defense Policy and Arms Control Office",
      laneId: "strategic-stability",
      institution: "National Archives Catalog",
      type: "Collection",
      priority: "High",
      date: "Clinton administration",
      identifier: "NAID 7386504",
      url: "https://catalog.archives.gov/id/7386504",
      note:
        "Parent collection for Robert Bell, Steven Andreasen, Anne Witkowsky, and later defense-policy files on START, ABM, NMD, CFE, CTBT, and landmines.",
      tags: ["NSC", "Defense Policy", "arms control"]
    },
    {
      id: "lead-nonproliferation-office",
      title: "Records of the NSC Nonproliferation and Export Controls Office",
      laneId: "nonproliferation-regimes",
      institution: "National Archives Catalog",
      type: "Collection",
      priority: "High",
      date: "Clinton administration",
      identifier: "NAID 7388773",
      url: "https://catalog.archives.gov/id/7388773",
      note:
        "Parent collection for nonproliferation and export-control records. Child series include subject files, Daniel Poneman, Gary Samore, and Steven Aoki files.",
      tags: ["NSC", "nonproliferation", "export controls"]
    },
    {
      id: "lead-gary-samore",
      title: "Gary Samore's Files",
      laneId: "regional-proliferation",
      institution: "National Archives Catalog",
      type: "Series",
      priority: "High",
      date: "1995-2001",
      identifier: "NAID 7585686",
      url: "https://catalog.archives.gov/id/7585686",
      note:
        "Likely high-yield bridge for late Clinton regional proliferation cases, especially Iran, DPRK, South Asia, China, and Russian leakage.",
      tags: ["Gary Samore", "regional", "1997-2000"]
    },
    {
      id: "lead-subject-files",
      title: "Nonproliferation and Export Controls Subject Files",
      laneId: "nonproliferation-regimes",
      institution: "National Archives Catalog",
      type: "Series",
      priority: "High",
      date: "1993-2001",
      identifier: "NAID 7585677",
      url: "https://catalog.archives.gov/id/7585677",
      note:
        "Subject-file lead for NPT, MTCR, export controls, nuclear smuggling, sanctions, and regional nonproliferation cases.",
      tags: ["subject files", "MTCR", "NPT"]
    },
    {
      id: "lead-ctbt-ratification",
      title: "Congressional Ratification of the Comprehensive Test Ban Treaty",
      laneId: "ctbt",
      institution: "Clinton Presidential Library",
      type: "Finding aid",
      priority: "High",
      date: "1997-1999",
      identifier: "2015-1095-F",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/congressional-ratification-comprehensive-test-ban-treaty-ctbt",
      note:
        "Direct CTBT ratification source path for Senate submission, White House handling, Andreasen provenance, and the 1999 defeat sequence.",
      tags: ["CTBT", "Senate", "2015-1095-F"]
    },
    {
      id: "lead-clinton-foreign-leaders",
      title: "Meetings and telephone calls with foreign leaders",
      laneId: "strategic-stability",
      institution: "Clinton Presidential Library",
      type: "Chronology",
      priority: "High",
      date: "1993-2001",
      identifier: "Foreign-leader chronology",
      url: "https://www.clintonlibrary.gov/research/meetings-and-telephone-calls-foreign-leaders",
      note:
        "Control source for leader meetings and calls. This site uses it to separate released memcon/telcon text from chronology-only contacts.",
      tags: ["leader chronology", "Clinton Library", "control"]
    },
    {
      id: "lead-yeltsin-release",
      title: "Declassified documents concerning Russian President Boris Yeltsin",
      laneId: "strategic-stability",
      institution: "Clinton Presidential Library",
      type: "MDR packet",
      priority: "High",
      date: "1997-1999",
      identifier: "2015-0782-M-2",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      note:
        "Released Helsinki, Cologne, and late Yeltsin-channel records. Use companion PDFs only as review copies; cite the Clinton Library release in final notes.",
      tags: ["Yeltsin", "memcon", "telcon"]
    },
    {
      id: "lead-strobe-foia",
      title: "Strobe Talbott FOIA release manifest",
      laneId: "abm-nmd",
      institution: "Department of State FOIA Library",
      type: "FOIA source pool",
      priority: "High",
      date: "1997-2000",
      identifier: "F-2017-13804",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html",
      note:
        "State Department release pool for Talbott, Mamedov, CFE, CTBT, NMD, ABM, and South Asia records. Document IDs can repeat across release folders, so retain PDF URLs.",
      tags: ["State FOIA", "Talbott", "ABM", "CTBT"]
    },
    {
      id: "lead-public-papers",
      title: "Public Papers of the Presidents: William J. Clinton",
      laneId: "volume-control",
      institution: "GovInfo",
      type: "Public record corpus",
      priority: "High",
      date: "1997-2000",
      identifier: "PPP",
      url: "https://www.govinfo.gov/app/collection/ppp/president-42_Clinton%2C%20William%20J.",
      note:
        "Public milestones, treaty statements, and signing messages. Useful for chronology and public-line checks, not a substitute for internal decision records.",
      tags: ["GovInfo", "Public Papers", "public line"]
    },
    {
      id: "lead-south-asia-mdr",
      title: "Declassified documents concerning South Asia",
      laneId: "regional-proliferation",
      institution: "Clinton Digital Library",
      type: "MDR source path",
      priority: "High",
      date: "1997-04-14",
      identifier: "2006-0859-M",
      url: "https://clinton.presidentiallibraries.us/items/show/100535",
      note:
        "Deputies Committee packet with agendas, discussion paper, and summary of conclusions on the framework of U.S. policy toward South Asia.",
      tags: ["South Asia", "India", "Pakistan", "DC"]
    },
    {
      id: "lead-cfe-folders",
      title: "CFE adaptation and implementation folder-title runs",
      laneId: "conventional-cfe",
      institution: "Clinton Presidential Library",
      type: "Folder-title lead",
      priority: "High",
      date: "1997-2000",
      identifier: "2013-0185-M, Part 1",
      url: "https://www.clintonlibrary.gov/research/foia/mandatory-declassification-review/presidential-records-management-files",
      note:
        "Defense Policy folder-title rows expose CFE adaptation, HLTF, JCG, congressional report, flank, and Istanbul summit source trails.",
      tags: ["CFE", "2013-0185-M", "Witkowsky"]
    },
    {
      id: "lead-clinton-guide",
      title: "Guide to textual holdings, Clinton Presidential Library",
      laneId: "volume-control",
      institution: "Clinton Presidential Library",
      type: "Office guide",
      priority: "High",
      date: "2020",
      identifier: "Textual holdings guide",
      url: "https://www.clintonlibrary.gov/sites/default/files/documents/research/clinton-library-guide-holdings-2020-no-sf-cf.pdf",
      note:
        "Defines NSC offices and staff responsibilities for Defense Policy and Arms Control, Nonproliferation and Export Controls, Intelligence Programs, Legal Advisor, and Records Management.",
      tags: ["office guide", "Clinton Library", "NSC"]
    },
    {
      id: "lead-ctbt-treaty-document",
      title: "Senate Treaty Document 105-28",
      laneId: "ctbt",
      institution: "Congress.gov",
      type: "Treaty document",
      priority: "High",
      date: "1997-09-23",
      identifier: "Treaty Doc. 105-28",
      url: "https://www.congress.gov/treaty-document/105th-congress/28/document-text",
      note:
        "Congressional anchor for the CTBT submission, treaty text, transmittal letter, State submittal letter, and verification materials.",
      tags: ["CTBT", "Treaty Doc. 105-28", "Senate"]
    },
    {
      id: "lead-ctbt-final-review",
      title: "Final Review of the CTBT hearing",
      laneId: "ctbt",
      institution: "Congress.gov",
      type: "Senate hearing",
      priority: "High",
      date: "1999-10-07",
      identifier: "S. Hrg. 106-262",
      url: "https://www.congress.gov/event/106th-congress/senate-event/LC19462/text",
      note:
        "Senate Foreign Relations hearing anchor for the ratification endgame and stockpile stewardship/verifiability debate immediately before the failed vote.",
      tags: ["CTBT", "hearing", "Senate Foreign Relations"]
    },
    {
      id: "lead-nmd-act-congress",
      title: "National Missile Defense Act of 1999",
      laneId: "abm-nmd",
      institution: "Congress.gov",
      type: "Statutory anchor",
      priority: "High",
      date: "1999-07-22",
      identifier: "H.R.4 / Public Law 106-38",
      url: "https://www.congress.gov/bill/106th-congress/house-bill/4",
      note:
        "Legislative anchor for NMD policy. Use with the signing statement, PRD-31 files, and NATO/Russia consultation records.",
      tags: ["NMD", "Congress", "ABM"]
    },
    {
      id: "lead-nato-nmd-consultation",
      title: "NATO consultation record for NMD and ABM",
      laneId: "abm-nmd",
      institution: "NATO",
      type: "Ministerial transcript",
      priority: "High",
      date: "2000-05-24",
      identifier: "NATO transcript, Florence ministerial",
      url: "https://www.nato.int/en/news-and-events/events/transcripts/2000/05/24/statement",
      note:
        "Official allied-consultation marker noting U.S. limited NMD testing, consultation with allies and Moscow, ABM Treaty commitment, and deployment criteria.",
      tags: ["NATO", "NMD", "ABM", "allied consultation"]
    },
    {
      id: "lead-dprk-collection",
      title: "DPRK and ROK NSC collection",
      laneId: "regional-proliferation",
      institution: "Clinton Digital Library",
      type: "Collection",
      priority: "High",
      date: "1994-2000",
      identifier: "2009-0528-F Segment 2",
      url: "https://clinton.presidentiallibraries.us/collections/show/182",
      note:
        "Primary late-Clinton Korea source pool for Agreed Framework implementation, KEDO, North Korea nuclear program, missile/WMD files, and 1999-2000 Korea folders.",
      tags: ["DPRK", "KEDO", "missile diplomacy"]
    },
    {
      id: "lead-dprk-north-korea-item",
      title: "North Korea item from National Security Advisor files",
      laneId: "regional-proliferation",
      institution: "Clinton Digital Library",
      type: "Folder-level item",
      priority: "High",
      date: "2000",
      identifier: "2009-0528-F Segment 1 / Box 12",
      url: "https://clinton.presidentiallibraries.us/items/show/72959",
      note:
        "Folder-level source path from National Security Advisor/Mara Rudman provenance for late-Clinton North Korea coverage.",
      tags: ["DPRK", "Mara Rudman", "North Korea"]
    },
    {
      id: "lead-osce-cfe-adaptation",
      title: "Agreement on Adaptation of the CFE Treaty",
      laneId: "conventional-cfe",
      institution: "OSCE",
      type: "Treaty record",
      priority: "High",
      date: "1999-11-19",
      identifier: "CFE.DOC/1/99",
      url: "https://www.osce.org/library/14108",
      note:
        "Official CFE adaptation record from the Istanbul Summit. Use as the public treaty endpoint while Clinton Library folders supply U.S. policy formation.",
      tags: ["CFE", "OSCE", "Istanbul"]
    },
    {
      id: "lead-osce-cfe-final-act",
      title: "Final Act of the CFE States Parties Conference",
      laneId: "conventional-cfe",
      institution: "OSCE",
      type: "Treaty record",
      priority: "High",
      date: "1999-11-19",
      identifier: "CFE.DOC/2/99",
      url: "https://www.osce.org/library/14114",
      note:
        "Official final-act record adopted at signature of the CFE adaptation agreement during the OSCE Istanbul Summit.",
      tags: ["CFE", "Final Act", "Istanbul"]
    },
    {
      id: "lead-cbw-elisa-harris",
      title: "Elisa Harris CWC files",
      laneId: "cbw",
      institution: "Clinton Digital Library",
      type: "Collection finding aid",
      priority: "High",
      date: "1993-2001",
      identifier: "2016-0158-F Segment 1",
      url: "https://clinton.presidentiallibraries.us/items/show/57270",
      note:
        "NSC Nonproliferation and Export Controls source path for CWC correspondence, memoranda, reports, briefings, meeting materials, emails, and notes.",
      tags: ["CWC", "Elisa Harris", "CBW"]
    },
    {
      id: "lead-cbw-helms",
      title: "Senator Jesse Helms collection treaty files",
      laneId: "cbw",
      institution: "Clinton Digital Library",
      type: "Collection finding aid",
      priority: "Medium",
      date: "1997-1999",
      identifier: "2006-1363-F Segment 3",
      url: "https://clinton.presidentiallibraries.us/items/show/94685",
      note:
        "Supplemental treaty-politics source path for CWC and CTBT acceptance/passage records involving the Senate side of arms-control diplomacy.",
      tags: ["CWC", "CTBT", "Senate"]
    },
    {
      id: "lead-pdd-searchable",
      title: "Presidential Daily Diary searchable collection",
      laneId: "volume-control",
      institution: "Clinton Presidential Library",
      type: "Daily Diary source guide",
      priority: "High",
      date: "1993-2000",
      identifier: "Presidential Daily Diary / Ellen McCathran",
      url: "https://www.clintonlibrary.gov/research/daily-diary",
      note:
        "Searchable diary layer and source guide for President Clinton's daily meetings, phone calls, travel, events, locations, topics when available, participants, and links to source material.",
      tags: ["Daily Diary", "calendar evidence", "calls", "meetings"]
    },
    {
      id: "lead-pdd-2010-0083-f",
      title: "Presidential Daily Diary hardcopy sample packets",
      laneId: "volume-control",
      institution: "National Archives / Clinton Presidential Library",
      type: "FOIA sample packets",
      priority: "High",
      date: "1997-2000",
      identifier: "2010-0083-F",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      note:
        "Hardcopy Daily Diary sample-date FOIA packets. The searched packets expose calls and meetings that anchor South Asia, CTBT, DPRK, CFE, and U.S.-Russia strategic-stability lanes.",
      tags: ["2010-0083-F", "Daily Diary", "FOIA", "calendar evidence"]
    }
  ],
  potentialDocuments: [
    {
      id: "doc-helsinki-morning",
      laneId: "strategic-stability",
      date: "1997-03-21",
      title: "Helsinki morning meeting with President Boris Yeltsin",
      type: "Released memcon",
      priority: "High",
      level: "item-level review copy",
      confidence: "High",
      score: 94,
      repository: "Clinton Presidential Library",
      collection: "MDR release 2015-0782-M-2",
      identifier: "2015-0782-M-2, pp. 105-115",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      pdfUrl: "https://therealjameswilson.github.io/Clinton-Russia-High-Level/public/documents/1997-03-21-memcon-helsinki-morning.pdf",
      pages: "11 actual conversation pages",
      pageCount: 11,
      summary:
        "Core leader-level source for the Helsinki summit, where START III parameters, NATO/Russia architecture, ABM questions, and summit management converge.",
      sourceNote:
        "Source: Clinton Library, Meetings and Telephone Calls with Foreign Leaders, master chronology; release packet 2015-0782-M-2, pages 105-115.",
      tags: ["Helsinki", "START III", "Yeltsin"]
    },
    {
      id: "doc-helsinki-lunch",
      laneId: "strategic-stability",
      date: "1997-03-21",
      title: "Helsinki working lunch with President Boris Yeltsin",
      type: "Released memcon",
      priority: "High",
      level: "item-level review copy",
      confidence: "High",
      score: 90,
      repository: "Clinton Presidential Library",
      collection: "MDR release 2015-0782-M-2",
      identifier: "2015-0782-M-2, pp. 116-123",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      pdfUrl: "https://therealjameswilson.github.io/Clinton-Russia-High-Level/public/documents/1997-03-21-memcon-helsinki-working-lunch.pdf",
      pages: "8 actual conversation pages",
      pageCount: 8,
      summary:
        "Continuation of the Helsinki leader exchange, useful for reconstructing what was settled in public joint statements and what remained in negotiation.",
      sourceNote:
        "Source: Clinton Library, Meetings and Telephone Calls with Foreign Leaders, master chronology; release packet 2015-0782-M-2, pages 116-123.",
      tags: ["Helsinki", "Yeltsin", "leader meeting"]
    },
    {
      id: "doc-helsinki-afternoon",
      laneId: "abm-nmd",
      date: "1997-03-21",
      title: "Helsinki afternoon meeting with President Boris Yeltsin",
      type: "Released memcon",
      priority: "High",
      level: "item-level review copy",
      confidence: "High",
      score: 88,
      repository: "Clinton Presidential Library",
      collection: "MDR release 2015-0782-M-2",
      identifier: "2015-0782-M-2, pp. 124-127",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      pdfUrl: "https://therealjameswilson.github.io/Clinton-Russia-High-Level/public/documents/1997-03-21-memcon-helsinki-afternoon.pdf",
      pages: "4 actual conversation pages",
      pageCount: 4,
      summary:
        "Shorter leader session after the public Helsinki package. Keep with ABM/NMD and NATO/Russia side agreements when selecting.",
      sourceNote:
        "Source: Clinton Library, Meetings and Telephone Calls with Foreign Leaders, master chronology; release packet 2015-0782-M-2, pages 124-127.",
      tags: ["Helsinki", "ABM", "Yeltsin"]
    },
    {
      id: "doc-helsinki-private-dinner",
      laneId: "strategic-stability",
      date: "1997-03-21",
      title: "Helsinki private dinner with President Boris Yeltsin",
      type: "Released memcon",
      priority: "High",
      level: "item-level review copy",
      confidence: "High",
      score: 86,
      repository: "Clinton Presidential Library",
      collection: "MDR release 2015-0782-M-2",
      identifier: "2015-0782-M-2, pp. 128-133",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      pdfUrl: "https://therealjameswilson.github.io/Clinton-Russia-High-Level/public/documents/1997-03-21-memcon-helsinki-private-dinner.pdf",
      pages: "6 actual conversation pages",
      pageCount: 6,
      summary:
        "Closing Helsinki conversation. Use to check whether public joint statements reflected private commitments and unresolved tradeoffs.",
      sourceNote:
        "Source: Clinton Library, Meetings and Telephone Calls with Foreign Leaders, master chronology; release packet 2015-0782-M-2, pages 128-133.",
      tags: ["Helsinki", "private dinner", "Yeltsin"]
    },
    {
      id: "pub-start-iii-parameters",
      laneId: "strategic-stability",
      date: "1997-03-21",
      title: "Russia-United States Joint Statement on Parameters on Future Reduction in Nuclear Forces",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 84,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1997-book1-doc-pg340",
      url: "https://www.govinfo.gov/app/details/PPP-1997-book1/PPP-1997-book1-doc-pg340",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1997-book1/pdf/PPP-1997-book1-doc-pg340.pdf",
      pages: "pp. 340-341",
      pageCount: 2,
      summary:
        "Public Helsinki endpoint for START III parameters and the future-reductions framework.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1997, Book I, pp. 340-341.",
      tags: ["START III", "Helsinki", "Public Papers"]
    },
    {
      id: "pub-abm-helsinki",
      laneId: "abm-nmd",
      date: "1997-03-21",
      title: "Russia-United States Joint Statement Concerning the Anti-Ballistic Missile Treaty",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 84,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1997-book1-doc-pg341",
      url: "https://www.govinfo.gov/app/details/PPP-1997-book1/PPP-1997-book1-doc-pg341",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1997-book1/pdf/PPP-1997-book1-doc-pg341.pdf",
      pages: "pp. 341-342",
      pageCount: 2,
      summary:
        "Public Helsinki ABM statement. Pair with internal demarcation, TMD, and later NMD records before selection.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1997, Book I, pp. 341-342.",
      tags: ["ABM Treaty", "Helsinki", "TMD"]
    },
    {
      id: "pub-cw-helsinki",
      laneId: "cbw",
      date: "1997-03-21",
      title: "Russia-United States Joint Statement on Chemical Weapons",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 76,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1997-book1-doc-pg342",
      url: "https://www.govinfo.gov/app/details/PPP-1997-book1/PPP-1997-book1-doc-pg342",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1997-book1/pdf/PPP-1997-book1-doc-pg342.pdf",
      pages: "pp. 342-343",
      pageCount: 2,
      summary:
        "Public chemical-weapons statement from the Helsinki package; should be paired with CWC ratification and Russian declaration files.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1997, Book I, pp. 342-343.",
      tags: ["CWC", "chemical weapons", "Russia"]
    },
    {
      id: "pub-cwc-russia-ratification",
      laneId: "cbw",
      date: "1997-11-05",
      title: "Statement on Russian Ratification of the Chemical Weapons Convention",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 80,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1997-book2-doc-pg1503",
      url: "https://www.govinfo.gov/app/details/PPP-1997-book2/PPP-1997-book2-doc-pg1503",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1997-book2/pdf/PPP-1997-book2-doc-pg1503.pdf",
      pages: "p. 1503",
      pageCount: 1,
      summary:
        "Public marker for Russian CWC ratification. Use to locate State, ACDA, NSC, and Senate implementation records.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1997, Book II, p. 1503.",
      tags: ["CWC", "Russia", "ratification"]
    },
    {
      id: "pub-south-asia-tests",
      laneId: "regional-proliferation",
      date: "1998-06-03",
      title: "Remarks on Action Against Nuclear Proliferation in South Asia and MFN Trade Status for China",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 86,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1998-book1-doc-pg870",
      url: "https://www.govinfo.gov/app/details/PPP-1998-book1/PPP-1998-book1-doc-pg870",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1998-book1/pdf/PPP-1998-book1-doc-pg870.pdf",
      pages: "pp. 870-871",
      pageCount: 2,
      summary:
        "Public line after Indian and Pakistani nuclear tests. Pair with Talbott, State, NSC, and South Asia DC records.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1998, Book I, pp. 870-871.",
      tags: ["South Asia", "India", "Pakistan"]
    },
    {
      id: "doc-south-asia-mdr",
      laneId: "regional-proliferation",
      date: "1997-04-14",
      title: "Declassified documents concerning South Asia",
      type: "MDR source path",
      priority: "High",
      level: "packet lead",
      confidence: "Review",
      score: 72,
      repository: "Clinton Digital Library",
      collection: "Mandatory Declassification Review list",
      identifier: "2006-0859-M",
      url: "https://clinton.presidentiallibraries.us/items/show/100535",
      pages: "Packet lead",
      pageCount: 0,
      summary:
        "Deputies Committee source path for South Asia policy framework before the 1998 tests and the Talbott-Jaswant Singh dialogue.",
      sourceNote:
        "Source-path lead: Clinton Digital Library item 100535, MDR 2006-0859-M.",
      tags: ["South Asia", "DC", "India", "Pakistan"]
    },
    {
      id: "pub-missile-prolif-sanctions",
      laneId: "nonproliferation-regimes",
      date: "1998-06-23",
      title: "Message returning legislation on missile proliferation sanctions",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 72,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1998-book1-doc-pg1027-2",
      url: "https://www.govinfo.gov/app/details/PPP-1998-book1/PPP-1998-book1-doc-pg1027-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1998-book1/pdf/PPP-1998-book1-doc-pg1027-2.pdf",
      pages: "pp. 1027-1029",
      pageCount: 3,
      summary:
        "Public presidential message on missile proliferation sanctions; useful for the export-control and sanctions lane.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1998, Book I, pp. 1027-1029.",
      tags: ["missile proliferation", "sanctions", "export controls"]
    },
    {
      id: "pub-early-warning",
      laneId: "fissile-ctr",
      date: "1998-09-02",
      title: "Joint Statement on the Exchange of Information on Missile Launches and Early Warning",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 80,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1998-book2-doc-pg1502-2",
      url: "https://www.govinfo.gov/app/details/PPP-1998-book2/PPP-1998-book2-doc-pg1502-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1998-book2/pdf/PPP-1998-book2-doc-pg1502-2.pdf",
      pages: "pp. 1502-1503",
      pageCount: 2,
      summary:
        "Public Moscow-summit lead for missile launch notification and early-warning data exchange.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1998, Book II, pp. 1502-1503.",
      tags: ["early warning", "missile launches", "Russia"]
    },
    {
      id: "doc-yavlinsky-nmd",
      laneId: "abm-nmd",
      date: "1999-03-17",
      title: "Yavlinsky claims Yeltsin ordering study of cooperative U.S.-Russia NMD concept",
      type: "State FOIA cable",
      priority: "High",
      level: "released State cable",
      confidence: "High",
      score: 82,
      repository: "Department of State FOIA Library",
      collection: "Strobe Talbott FOIA, F-2017-13804",
      identifier: "C06770352",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html",
      pdfUrl: "https://foia.state.gov/DOCUMENTS/FOIA_L_Apr2021_C/F-2017-13804/DOC_0C06770352/C06770352.pdf",
      pages: "2-page cable",
      pageCount: 2,
      summary:
        "Released Moscow cable on a Russian cooperative missile-defense proposal, directly useful for the NMD/ABM negotiation lane.",
      sourceNote:
        "Source: Department of State FOIA Library, Strobe Talbott FOIA case F-2017-13804, document C06770352.",
      tags: ["NMD", "ABM", "Yavlinsky", "Yeltsin"]
    },
    {
      id: "pub-nmd-legislation",
      laneId: "abm-nmd",
      date: "1999-03-17",
      title: "Statement on National Missile Defense Legislation",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 78,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book1-doc-pg397",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book1/PPP-1999-book1-doc-pg397",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book1/pdf/PPP-1999-book1-doc-pg397.pdf",
      pages: "pp. 397-398",
      pageCount: 2,
      summary:
        "Public Clinton position on NMD legislation before the July signing statement.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book I, pp. 397-398.",
      tags: ["NMD", "legislation", "Public Papers"]
    },
    {
      id: "doc-cologne-memcon",
      laneId: "strategic-stability",
      date: "1999-06-20",
      title: "Meeting with President Boris Yeltsin in Cologne",
      type: "Released memcon",
      priority: "High",
      level: "item-level review copy",
      confidence: "High",
      score: 92,
      repository: "Clinton Presidential Library",
      collection: "MDR release 2015-0782-M-2",
      identifier: "2015-0782-M-2, pp. 497-505",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0",
      pdfUrl: "https://therealjameswilson.github.io/Clinton-Russia-High-Level/public/documents/1999-06-20-memcon-77.pdf",
      pages: "9 actual conversation pages",
      pageCount: 9,
      summary:
        "Released leader meeting matching the public Cologne strategic-offensive/defensive arms statement.",
      sourceNote:
        "Source: Clinton Library, Meetings and Telephone Calls with Foreign Leaders, master chronology; release packet 2015-0782-M-2, pages 497-505.",
      tags: ["Cologne", "START III", "Yeltsin"]
    },
    {
      id: "pub-cologne-strategic",
      laneId: "strategic-stability",
      date: "1999-06-20",
      title: "Joint Statement Concerning Strategic Offensive and Defensive Arms",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 84,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book1-doc-pg976",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book1/PPP-1999-book1-doc-pg976",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book1/pdf/PPP-1999-book1-doc-pg976.pdf",
      pages: "pp. 976-977",
      pageCount: 2,
      summary:
        "Public Cologne statement linking START III, ABM, and strategic stability after the leader meeting.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book I, pp. 976-977.",
      tags: ["Cologne", "START III", "ABM"]
    },
    {
      id: "pub-ctbt-july-1999",
      laneId: "ctbt",
      date: "1999-07-20",
      title: "Remarks on the Comprehensive Nuclear-Test-Ban Treaty",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 76,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book2-doc-pg1264",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book2/PPP-1999-book2-doc-pg1264",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book2/pdf/PPP-1999-book2-doc-pg1264.pdf",
      pages: "pp. 1264-1266",
      pageCount: 3,
      summary:
        "Public CTBT ratification campaign marker from July 1999.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book II, pp. 1264-1266.",
      tags: ["CTBT", "ratification", "1999"]
    },
    {
      id: "pub-nmd-act",
      laneId: "abm-nmd",
      date: "1999-07-22",
      title: "Statement on Signing the National Missile Defense Act of 1999",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 82,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book2-doc-pg1304-3",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book2/PPP-1999-book2-doc-pg1304-3",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book2/pdf/PPP-1999-book2-doc-pg1304-3.pdf",
      pages: "pp. 1304-1305",
      pageCount: 2,
      summary:
        "Public signing statement for the NMD Act. Pair with NSC, Defense, State, and Russian-channel records.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book II, pp. 1304-1305.",
      tags: ["NMD Act", "missile defense", "ABM"]
    },
    {
      id: "pub-ctbt-oct-1999",
      laneId: "ctbt",
      date: "1999-10-13",
      title: "Remarks on Senate Action on the Comprehensive Nuclear-Test-Ban Treaty",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 88,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book2-doc-pg1768",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book2/PPP-1999-book2-doc-pg1768",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book2/pdf/PPP-1999-book2-doc-pg1768.pdf",
      pages: "pp. 1768-1769",
      pageCount: 2,
      summary:
        "Public response to the Senate defeat of CTBT. Use with Senate records and Russian diplomatic reaction.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book II, pp. 1768-1769.",
      tags: ["CTBT", "Senate defeat", "1999"]
    },
    {
      id: "doc-mamedov-ctbt",
      laneId: "ctbt",
      date: "1999-10-15",
      title: "Mamedov on CTBT defeat, bilateral way ahead",
      type: "State FOIA cable",
      priority: "High",
      level: "released State cable",
      confidence: "High",
      score: 86,
      repository: "Department of State FOIA Library",
      collection: "Strobe Talbott FOIA, F-2017-13804",
      identifier: "C06814742",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html",
      pdfUrl: "https://foia.state.gov/DOCUMENTS/FOIA_L_Apr2021_C/F-2017-13804/DOC_0C06814742/C06814742.pdf",
      pages: "Released cable",
      pageCount: 0,
      summary:
        "Immediate Russian diplomatic reaction to the U.S. Senate CTBT defeat and a high-value bridge into the late-1999 arms-control channel.",
      sourceNote:
        "Source: Department of State FOIA Library, Strobe Talbott FOIA case F-2017-13804, document C06814742.",
      tags: ["CTBT", "Mamedov", "Talbott", "Russia"]
    },
    {
      id: "pub-wmd-report-1999",
      laneId: "nonproliferation-regimes",
      date: "1999-11-10",
      title: "Message to the Congress Reporting on the Proliferation of Weapons of Mass Destruction",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 74,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-1999-book2-doc-pg2050",
      url: "https://www.govinfo.gov/app/details/PPP-1999-book2/PPP-1999-book2-doc-pg2050",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-1999-book2/pdf/PPP-1999-book2-doc-pg2050.pdf",
      pages: "pp. 2050-2057",
      pageCount: 8,
      summary:
        "Annual public reporting anchor for WMD proliferation, sanctions, and emergency authorities.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 1999, Book II, pp. 2050-2057.",
      tags: ["WMD", "sanctions", "Congress"]
    },
    {
      id: "pub-npt-30",
      laneId: "nonproliferation-regimes",
      date: "2000-03-06",
      title: "Statement Commemorating the 30th Anniversary of the Nuclear Non-Proliferation Treaty",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 72,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg392-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg392-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg392-2.pdf",
      pages: "pp. 392-393",
      pageCount: 2,
      summary:
        "Public NPT review-cycle anchor for the 2000 Review Conference environment.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, pp. 392-393.",
      tags: ["NPT", "Review Conference", "2000"]
    },
    {
      id: "pub-iran-nonprolif-act",
      laneId: "nonproliferation-regimes",
      date: "2000-03-14",
      title: "Statement on Signing the Iran Nonproliferation Act of 2000",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 80,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg462-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg462-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg462-2.pdf",
      pages: "p. 462",
      pageCount: 1,
      summary:
        "Public signing statement for a central late-Clinton sanctions/export-control statute.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, p. 462.",
      tags: ["Iran", "nonproliferation", "sanctions"]
    },
    {
      id: "pub-abm-mou-letter",
      laneId: "abm-nmd",
      date: "2000-03-17",
      title: "Letter to Congressional Leaders on the Memorandum of Understanding Relating to the ABM Treaty",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 78,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg487",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg487",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg487.pdf",
      pages: "pp. 487-488",
      pageCount: 2,
      summary:
        "Public congressional transmission record for ABM Treaty MOU handling.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, pp. 487-488.",
      tags: ["ABM Treaty", "Congress", "MOU"]
    },
    {
      id: "pub-start-ii-duma",
      laneId: "strategic-stability",
      date: "2000-04-14",
      title: "Statement on Russian State Duma Action on the START II Treaty",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 80,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg716-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg716-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg716-2.pdf",
      pages: "p. 716",
      pageCount: 1,
      summary:
        "Public endpoint for Russian Duma ratification action on START II and transition into START III/ABM bargaining.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, p. 716.",
      tags: ["START II", "Duma", "Russia"]
    },
    {
      id: "pub-ctbt-duma",
      laneId: "ctbt",
      date: "2000-04-21",
      title: "Statement on Russian State Duma Action on the Comprehensive Nuclear-Test-Ban Treaty",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 74,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg757",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg757",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg757.pdf",
      pages: "p. 757",
      pageCount: 1,
      summary:
        "Public statement after Russian Duma CTBT action, useful as a post-defeat contrast to U.S. Senate handling.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, p. 757.",
      tags: ["CTBT", "Duma", "Russia"]
    },
    {
      id: "doc-eve-putin-summit",
      laneId: "abm-nmd",
      date: "2000-05-15",
      title: "U.S.-Russian relations on the eve of the first Clinton-Putin summit",
      type: "State FOIA briefing",
      priority: "High",
      level: "released State record",
      confidence: "High",
      score: 80,
      repository: "Department of State FOIA Library",
      collection: "Strobe Talbott FOIA, F-2017-13804",
      identifier: "C09000042",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html",
      pdfUrl: "https://foia.state.gov/DOCUMENTS/FOIA_L_Mar2025/FL-2017-13804/DOC_0C09000042/C09000042.pdf",
      pages: "Released briefing paper",
      pageCount: 0,
      summary:
        "Summit-prep lead for the Clinton-Putin transition, with ABM/NMD and strategic-stability issues in the foreground.",
      sourceNote:
        "Source: Department of State FOIA Library, Strobe Talbott FOIA case F-2017-13804, document C09000042.",
      tags: ["Putin", "NMD", "summit prep"]
    },
    {
      id: "pub-plutonium-disposition",
      laneId: "fissile-ctr",
      date: "2000-06-04",
      title: "Joint Statement Concerning Management and Disposition of Excess Weapon-Grade Plutonium",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 82,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg1075",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg1075",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg1075.pdf",
      pages: "p. 1075",
      pageCount: 1,
      summary:
        "Public Moscow-summit statement on excess weapon-grade plutonium disposition and related cooperation.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, p. 1075.",
      tags: ["plutonium", "Moscow", "Putin"]
    },
    {
      id: "pub-principles-strategic-stability",
      laneId: "strategic-stability",
      date: "2000-06-04",
      title: "Russia-United States Joint Statement on Principles of Strategic Stability",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 86,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg1076",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg1076",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg1076.pdf",
      pages: "pp. 1076-1077",
      pageCount: 2,
      summary:
        "Central Moscow 2000 statement for the closing Clinton-Putin strategic-stability lane.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, pp. 1076-1077.",
      tags: ["strategic stability", "Putin", "Moscow"]
    },
    {
      id: "pub-joint-center",
      laneId: "fissile-ctr",
      date: "2000-06-04",
      title: "Memorandum of Agreement on a Joint Center for Early Warning Systems Data Exchange",
      type: "Public Papers",
      priority: "High",
      level: "published primary source",
      confidence: "High",
      score: 84,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book1-doc-pg1077",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book1/PPP-2000-book1-doc-pg1077",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book1/pdf/PPP-2000-book1-doc-pg1077.pdf",
      pages: "pp. 1077-1080",
      pageCount: 4,
      summary:
        "Public text for joint early-warning data exchange and missile-launch notification arrangements.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book I, pp. 1077-1080.",
      tags: ["early warning", "missile launch", "Joint Center"]
    },
    {
      id: "doc-nac-moscow-summit",
      laneId: "abm-nmd",
      date: "2000-06-08",
      title: "Deputy Secretary briefs the NAC on Moscow summit",
      type: "State FOIA cable",
      priority: "High",
      level: "released State cable",
      confidence: "High",
      score: 82,
      repository: "Department of State FOIA Library",
      collection: "Strobe Talbott FOIA, F-2017-13804",
      identifier: "C09000063",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html",
      pdfUrl: "https://foia.state.gov/DOCUMENTS/FOIA_L_July2022/FL-2017-13804/DOC_0C09000063/C09000063.pdf",
      pages: "Released cable",
      pageCount: 0,
      summary:
        "NAC briefing cable focusing on National Missile Defense and the ABM Treaty after the Moscow summit.",
      sourceNote:
        "Source: Department of State FOIA Library, Strobe Talbott FOIA case F-2017-13804, document C09000063, July 2022 release folder.",
      tags: ["NMD", "ABM", "NATO", "Moscow summit"]
    },
    {
      id: "pub-strategic-cooperation",
      laneId: "strategic-stability",
      date: "2000-07-21",
      title: "Russia-United States Joint Statement on Cooperation on Strategic Stability",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 76,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book2-doc-pg1443-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book2/PPP-2000-book2-doc-pg1443-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book2/pdf/PPP-2000-book2-doc-pg1443-2.pdf",
      pages: "pp. 1443-1444",
      pageCount: 2,
      summary:
        "Okinawa/G-8 period follow-up public statement on strategic stability cooperation.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book II, pp. 1443-1444.",
      tags: ["strategic stability", "Okinawa", "Russia"]
    },
    {
      id: "pub-ssci",
      laneId: "strategic-stability",
      date: "2000-09-06",
      title: "Strategic Stability Cooperation Initiative Between the United States and Russian Federation",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 76,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book2-doc-pg1760-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book2/PPP-2000-book2-doc-pg1760-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book2/pdf/PPP-2000-book2-doc-pg1760-2.pdf",
      pages: "pp. 1760-1762",
      pageCount: 3,
      summary:
        "Late-Clinton public strategic-stability follow-up, useful as a closing marker for the volume.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000, Book II, pp. 1760-1762.",
      tags: ["strategic stability", "2000", "Russia"]
    },
    {
      id: "pub-wmd-report-2000",
      laneId: "nonproliferation-regimes",
      date: "2000-11-09",
      title: "Letter to Congressional Leaders on the National Emergency Regarding WMD Proliferation",
      type: "Public Papers",
      priority: "Medium",
      level: "published primary source",
      confidence: "High",
      score: 72,
      repository: "GovInfo",
      collection: "Public Papers of the Presidents",
      identifier: "PPP-2000-book3-doc-pg2507-2",
      url: "https://www.govinfo.gov/app/details/PPP-2000-book3/PPP-2000-book3-doc-pg2507-2",
      pdfUrl: "https://www.govinfo.gov/content/pkg/PPP-2000-book3/pdf/PPP-2000-book3-doc-pg2507-2.pdf",
      pages: "pp. 2507-2516",
      pageCount: 10,
      summary:
        "End-of-administration public WMD emergency and sanctions report.",
      sourceNote:
        "Source: Public Papers of the Presidents of the United States: William J. Clinton, 2000-2001, Book III, pp. 2507-2516.",
      tags: ["WMD", "sanctions", "2000"]
    },
    {
      id: "cong-ctbt-treaty-document",
      laneId: "ctbt",
      date: "1997-09-23",
      title: "Comprehensive Nuclear Test-Ban Treaty submission to the Senate",
      type: "Congressional source",
      priority: "High",
      level: "published treaty document",
      confidence: "High",
      score: 82,
      repository: "Congress.gov",
      collection: "Senate Treaty Documents",
      identifier: "Treaty Doc. 105-28",
      url: "https://www.congress.gov/treaty-document/105th-congress/28/document-text",
      pages: "Treaty document text",
      pageCount: 0,
      summary:
        "CTBT submission package with treaty text, transmittal material, and administration rationale. Use as the congressional starting point for the ratification lane.",
      sourceNote:
        "Source: Congress.gov, Treaty Document 105-28.",
      tags: ["CTBT", "Treaty Doc. 105-28", "Senate"]
    },
    {
      id: "cong-ctbt-final-review",
      laneId: "ctbt",
      date: "1999-10-07",
      title: "Final Review of the Comprehensive Nuclear Test Ban Treaty hearing",
      type: "Congressional source",
      priority: "High",
      level: "published hearing",
      confidence: "High",
      score: 84,
      repository: "Congress.gov",
      collection: "Senate Foreign Relations Committee hearings",
      identifier: "S. Hrg. 106-262",
      url: "https://www.congress.gov/event/106th-congress/senate-event/LC19462/text",
      pages: "Hearing text",
      pageCount: 0,
      summary:
        "Senate Foreign Relations hearing immediately before the CTBT vote, useful for verifiability, stockpile stewardship, and ratification strategy arguments.",
      sourceNote:
        "Source: Congress.gov, Senate event LC19462, Final Review of the Comprehensive Nuclear Test Ban Treaty.",
      tags: ["CTBT", "Senate", "ratification"]
    },
    {
      id: "cong-nmd-act-1999",
      laneId: "abm-nmd",
      date: "1999-07-22",
      title: "National Missile Defense Act of 1999",
      type: "Congressional source",
      priority: "High",
      level: "statutory anchor",
      confidence: "High",
      score: 82,
      repository: "Congress.gov",
      collection: "106th Congress legislation",
      identifier: "H.R.4 / Public Law 106-38",
      url: "https://www.congress.gov/bill/106th-congress/house-bill/4",
      pages: "Bill and public-law record",
      pageCount: 0,
      summary:
        "Statutory anchor for NMD deployment policy. Pair with the signing statement, PRD-31, Russian reaction, and allied consultation records.",
      sourceNote:
        "Source: Congress.gov, H.R.4, 106th Congress.",
      tags: ["NMD", "ABM", "Congress"]
    },
    {
      id: "nato-nmd-florence",
      laneId: "abm-nmd",
      date: "2000-05-24",
      title: "Statement at the NATO North Atlantic Council on NMD consultation",
      type: "NATO transcript",
      priority: "High",
      level: "published allied consultation marker",
      confidence: "High",
      score: 78,
      repository: "NATO",
      collection: "Official NATO transcript",
      identifier: "Florence ministerial statement",
      url: "https://www.nato.int/en/news-and-events/events/transcripts/2000/05/24/statement",
      pages: "Transcript",
      pageCount: 0,
      summary:
        "Allied consultation marker for the U.S. NMD testing program, deployment criteria, ABM Treaty consultations, and the Moscow channel before the June 2000 summit.",
      sourceNote:
        "Source: NATO, statement to the North Atlantic Council, Florence, May 24, 2000.",
      tags: ["NATO", "NMD", "ABM", "consultation"]
    },
    {
      id: "cdl-dprk-collection",
      laneId: "regional-proliferation",
      date: "1998-08-31",
      title: "North Korea missile and nuclear diplomacy source pool",
      type: "Clinton Digital Library source path",
      priority: "High",
      level: "collection-level source path",
      confidence: "Review",
      score: 76,
      repository: "Clinton Digital Library",
      collection: "DPRK and ROK collection, 2009-0528-F Segment 2",
      identifier: "Collection 182",
      url: "https://clinton.presidentiallibraries.us/collections/show/182",
      pages: "Collection source path",
      pageCount: 0,
      summary:
        "Collection-level source path for Taepo Dong, Agreed Framework implementation, KEDO, North Korean missile/WMD files, and 1999-2000 Korea records.",
      sourceNote:
        "Source-path lead: Clinton Digital Library DPRK and ROK collection, 2009-0528-F Segment 2.",
      tags: ["DPRK", "Taepo Dong", "KEDO", "missiles"]
    },
    {
      id: "cdl-north-korea-2000-folder",
      laneId: "regional-proliferation",
      date: "2000",
      title: "North Korea folder from National Security Advisor files",
      type: "Clinton Digital Library source path",
      priority: "High",
      level: "folder-level source path",
      confidence: "Review",
      score: 76,
      repository: "Clinton Digital Library",
      collection: "National Security Advisor files, 2009-0528-F Segment 1",
      identifier: "Box 12 / Item 72959",
      url: "https://clinton.presidentiallibraries.us/items/show/72959",
      pages: "Folder-level item",
      pageCount: 0,
      summary:
        "Folder-level lead for late-Clinton North Korea policy from the National Security Advisor files. Use to separate missile diplomacy from broader Korea summit material.",
      sourceNote:
        "Source-path lead: Clinton Digital Library item 72959.",
      tags: ["DPRK", "North Korea", "Mara Rudman"]
    },
    {
      id: "osce-cfe-adaptation",
      laneId: "conventional-cfe",
      date: "1999-11-19",
      title: "Agreement on Adaptation of the Treaty on Conventional Armed Forces in Europe",
      type: "OSCE treaty record",
      priority: "High",
      level: "published treaty record",
      confidence: "High",
      score: 82,
      repository: "OSCE",
      collection: "OSCE library",
      identifier: "CFE.DOC/1/99",
      url: "https://www.osce.org/library/14108",
      pages: "Treaty record",
      pageCount: 0,
      summary:
        "Official Istanbul adaptation agreement. Use as the public treaty endpoint while the CFE lane pulls Clinton Library internal endgame records.",
      sourceNote:
        "Source: OSCE, Agreement on Adaptation of the CFE Treaty, CFE.DOC/1/99.",
      tags: ["CFE", "OSCE", "Istanbul"]
    },
    {
      id: "osce-cfe-final-act",
      laneId: "conventional-cfe",
      date: "1999-11-19",
      title: "Final Act of the Conference of the States Parties to the CFE Treaty",
      type: "OSCE treaty record",
      priority: "High",
      level: "published treaty record",
      confidence: "High",
      score: 80,
      repository: "OSCE",
      collection: "OSCE library",
      identifier: "CFE.DOC/2/99",
      url: "https://www.osce.org/library/14114",
      pages: "Final Act",
      pageCount: 0,
      summary:
        "Official final-act record adopted at signature of the CFE adaptation agreement. Keeps the CFE boundary tied to arms-control content.",
      sourceNote:
        "Source: OSCE, CFE Final Act, CFE.DOC/2/99.",
      tags: ["CFE", "Final Act", "Istanbul"]
    },
    {
      id: "cdl-cbw-elisa-harris",
      laneId: "cbw",
      date: "1997-2000",
      title: "Elisa Harris CWC implementation files",
      type: "Clinton Digital Library source path",
      priority: "High",
      level: "collection-level source path",
      confidence: "Review",
      score: 74,
      repository: "Clinton Digital Library",
      collection: "Elisa Harris CWC files, 2016-0158-F Segment 1",
      identifier: "Item 57270",
      url: "https://clinton.presidentiallibraries.us/items/show/57270",
      pages: "Collection source path",
      pageCount: 0,
      summary:
        "NSC Nonproliferation source path for CWC correspondence, memoranda, reports, briefings, meeting materials, emails, and notes.",
      sourceNote:
        "Source-path lead: Clinton Digital Library item 57270, Elisa Harris files.",
      tags: ["CWC", "CBW", "Elisa Harris"]
    },
    {
      id: "cdl-helms-treaty-files",
      laneId: "cbw",
      date: "1997-1999",
      title: "Senator Jesse Helms treaty files for CWC and CTBT",
      type: "Clinton Digital Library source path",
      priority: "Medium",
      level: "collection-level source path",
      confidence: "Review",
      score: 68,
      repository: "Clinton Digital Library",
      collection: "Senator Jesse Helms material, 2006-1363-F Segment 3",
      identifier: "Item 94685",
      url: "https://clinton.presidentiallibraries.us/items/show/94685",
      pages: "Collection source path",
      pageCount: 0,
      summary:
        "Supplemental Senate-side treaty-politics source path for CWC and CTBT passage/acceptance material.",
      sourceNote:
        "Source-path lead: Clinton Digital Library item 94685.",
      tags: ["CWC", "CTBT", "Helms", "Senate"]
    }
  ],
  diaryReferences: [
    {
      id: "pdd-1998-05-22-sharif-call",
      laneId: "regional-proliferation",
      date: "1998-05-22",
      title: "Conference call with Prime Minister Nawaz Sharif",
      eventType: "Foreign leader call",
      priority: "High",
      time: "12:56-1:17 p.m.",
      location: "Naval Academy Sailing Center, Annapolis, Maryland",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 006, CP/CF 1985",
      pdfPacket: "2010-0083-F Box 002 PDF 006",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-006-2015.pdf",
      diaryEntry:
        "The diary records a conference call with Pakistani Prime Minister Nawaz Sharif, Jason Greer of NSC Near East and South Asian Affairs, Bonnie Glick of NSC Defense Policy, and Situation Room staff.",
      volumeConnection:
        "Use as a calendar cue for the immediate South Asia nuclear-test response and the sanctions/restraint lane; pair with Talbott, State, and NSC South Asia files.",
      tags: ["South Asia", "Pakistan", "Sharif", "nuclear tests"]
    },
    {
      id: "pdd-1998-06-03-south-asia-statement",
      laneId: "regional-proliferation",
      date: "1998-06-03",
      title: "Briefing and statement on nuclear proliferation in South Asia",
      eventType: "Policy briefing",
      priority: "High",
      time: "10:05-10:15 a.m.",
      location: "The White House, Washington, D.C.",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 006, CP/CF 1985",
      pdfPacket: "2010-0083-F Box 002 PDF 006",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-006-2015.pdf",
      diaryEntry:
        "The diary shows a pre-statement briefing with Albright, Berger, Steinberg, Begala, Fuerth, and others, followed by a Rose Garden statement on action against nuclear proliferation in South Asia.",
      volumeConnection:
        "Tie this to the Public Papers anchor and backtrace the internal sanctions, export-control, and strategic-restraint decision papers.",
      tags: ["South Asia", "India", "Pakistan", "nuclear proliferation"]
    },
    {
      id: "pdd-1998-08-21-sharif-attempt",
      laneId: "regional-proliferation",
      date: "1998-08-21",
      title: "Attempted telephone call to Prime Minister Nawaz Sharif",
      eventType: "Attempted call",
      priority: "Medium",
      time: "8:43 a.m.",
      location: "The White House, Washington, D.C.",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 007, CP/CF 1985",
      pdfPacket: "2010-0083-F Box 002 PDF 007",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-007-2015.pdf",
      diaryEntry:
        "The diary records that Clinton telephoned Prime Minister Sharif and that the call was not completed after morning Berger contacts.",
      volumeConnection:
        "Keep as a call-trail marker only until State/NSC records establish the subject; useful for screening Pakistan restraint and crisis-diplomacy folders.",
      tags: ["Pakistan", "Sharif", "South Asia", "call trail"]
    },
    {
      id: "pdd-1998-09-02-moscow-yeltsin",
      laneId: "strategic-stability",
      date: "1998-09-02",
      title: "Moscow meeting and common-security signing with President Boris Yeltsin",
      eventType: "Leader meeting",
      priority: "High",
      time: "10:12 a.m.-2:05 p.m.",
      location: "Kremlin and Spaso House, Moscow, Russia",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 007, CP/CF 1985",
      pdfPacket: "2010-0083-F Box 002 PDF 007",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-007-2015.pdf",
      diaryEntry:
        "The diary records a pre-meeting briefing with Albright, Talbott, Berger, and Steinberg; an 10:50-11:50 a.m. meeting with Yeltsin; a signing ceremony for common-security documents; and follow-up meetings with Talbott/Berger and Duma/regional leaders.",
      volumeConnection:
        "Anchors the post-Helsinki strategic-stability line between the 1997 Volume VII handoff and the 1999-2000 START/ABM/NMD sequence.",
      tags: ["Yeltsin", "Moscow", "strategic stability", "START"]
    },
    {
      id: "pdd-1999-05-20-perry-dprk",
      laneId: "regional-proliferation",
      date: "1999-05-20",
      title: "Meeting with William Perry, North Korea policy coordinator",
      eventType: "Policy meeting",
      priority: "High",
      time: "10:56-11:07 a.m.",
      location: "The White House, Washington, D.C.",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 010, CP/CF 1986",
      pdfPacket: "2010-0083-F Box 002 PDF 010",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-010-2015.pdf",
      diaryEntry:
        "The diary lists a meeting with William J. Perry as Special Advisor to the President and Secretary of State and U.S. North Korea Policy Coordinator, with Podesta, Berger, and NSC Asian Affairs director Kenneth Lieberthal.",
      volumeConnection:
        "Use as a firm calendar cue for the Perry process and DPRK missile/nuclear diplomacy source pull.",
      tags: ["DPRK", "North Korea", "Perry process", "missiles"]
    },
    {
      id: "pdd-1999-06-20-cologne-yeltsin",
      laneId: "strategic-stability",
      date: "1999-06-20",
      title: "Cologne briefing, luncheon, and U.S.-Russian meeting",
      eventType: "Leader meeting",
      priority: "High",
      time: "12:09-2:03 p.m.",
      location: "Hyatt Regency and Renaissance Hotel, Cologne, Germany",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 010, CP/CF 1986",
      pdfPacket: "2010-0083-F Box 002 PDF 010",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-010-2015.pdf",
      diaryEntry:
        "The diary records a briefing/luncheon with Albright, Talbott, Berger, Steinberg, Pascual, and others before a 1:01-2:03 p.m. meeting with U.S. and Russian officials including Yeltsin, Mamedov, and Prikhodko.",
      volumeConnection:
        "Cross-reference with the Cologne memcon and public strategic-stability texts before selecting START III, ABM, and Russian-reaction documents.",
      tags: ["Yeltsin", "Cologne", "START III", "ABM"]
    },
    {
      id: "pdd-1999-10-06-ctbt-meeting",
      laneId: "ctbt",
      date: "1999-10-06",
      title: "CTBT statement and State Dining Room meeting",
      eventType: "Treaty meeting",
      priority: "High",
      time: "12:10-4:06 p.m.",
      location: "The White House, Washington, D.C.",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 012, CP/CF 1986",
      pdfPacket: "2010-0083-F Box 002 PDF 012",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-012-2015.pdf",
      diaryEntry:
        "The diary places a CTBT press statement at 12:10-12:15 p.m., a briefing with Berger, Podesta, and legislative affairs at 2:54-3:05 p.m., and a State Dining Room CTBT meeting at 3:07-4:06 p.m. with John Glenn and scientific/military validators listed in the appendix.",
      volumeConnection:
        "This is a high-value Senate-ratification campaign marker; pair with Treaty Doc. 105-28, S. Hrg. 106-262, 2015-1095-F files, and the October 13 defeat.",
      tags: ["CTBT", "Senate", "ratification", "John Glenn"]
    },
    {
      id: "pdd-1999-11-18-istanbul-yeltsin",
      laneId: "conventional-cfe",
      date: "1999-11-18",
      title: "OSCE Istanbul briefing and meeting with Russian officials",
      eventType: "Summit meeting",
      priority: "High",
      time: "11:17 a.m.-12:37 p.m.",
      location: "Ciragan Palace, Istanbul, Turkey",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 002, PDF 012, CP/CF 1986",
      pdfPacket: "2010-0083-F Box 002 PDF 012",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_002/42-t-7262157-20100083F-002-012-2015.pdf",
      diaryEntry:
        "The diary records OSCE Summit attendance, an 11:17-11:28 a.m. briefing with Berger, Albright, Sestanovich, Pascual, Steinberg, and Blinken, then an 11:31 a.m.-12:17 p.m. meeting with Russian officials after greeting Yeltsin.",
      volumeConnection:
        "Use with the Istanbul CFE adaptation agreement and final act, while treating broader OSCE/NATO context as boundary material.",
      tags: ["CFE", "OSCE", "Istanbul", "Yeltsin"]
    },
    {
      id: "pdd-2000-03-07-vajpayee-call",
      laneId: "regional-proliferation",
      date: "2000-03-07",
      title: "Conference call with Prime Minister Atal Bihari Vajpayee",
      eventType: "Foreign leader call",
      priority: "High",
      time: "11:54 a.m.-12:01 p.m.",
      location: "The White House, Washington, D.C.",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 003, PDF 002, CP/CF 1987",
      pdfPacket: "2010-0083-F Box 003 PDF 002",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_003/42-t-7262157-20100083F-003-002-2015.pdf",
      diaryEntry:
        "The diary records a conference call with Prime Minister Vajpayee, Berger, Podesta, Bradtke, and Bayley during the March 2000 South Asia trip-planning window.",
      volumeConnection:
        "Tie to South Asia trip books, strategic-restraint diplomacy, CTBT/NPT pressure, and post-test India policy.",
      tags: ["India", "Vajpayee", "South Asia", "strategic restraint"]
    },
    {
      id: "pdd-2000-06-08-japan-korea",
      laneId: "regional-proliferation",
      date: "2000-06-08",
      title: "Japan and South Korea meetings after the Moscow summit",
      eventType: "Allied consultation",
      priority: "High",
      time: "12:14-12:39 p.m.; 5:19-5:45 p.m.",
      location: "Akasaka State Guest House and Okura Hotel, Tokyo, Japan",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 003, PDF 004, CP/CF 1987",
      pdfPacket: "2010-0083-F Box 003 PDF 004",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_003/42-t-7262157-20100083F-003-004-2015.pdf",
      diaryEntry:
        "The diary records a U.S.-Japanese meeting with Prime Minister Yoshiro Mori and a later U.S.-South Korean meeting with President Kim Dae-jung, Foreign Minister Lee Joung-Binn, and National Security Adviser Hwang Won-Tak, with Berger and Lieberthal in the U.S. party.",
      volumeConnection:
        "Useful for DPRK missile/nuclear diplomacy and NMD/allied-consultation screening after the June 2000 Moscow strategic-stability package.",
      tags: ["DPRK", "Japan", "South Korea", "Kim Dae-jung"]
    },
    {
      id: "pdd-2000-07-21-okinawa-putin",
      laneId: "strategic-stability",
      date: "2000-07-21",
      title: "Okinawa foreign policy briefing and meeting with President Vladimir Putin",
      eventType: "Leader meeting",
      priority: "High",
      time: "2:28-2:43 p.m.; 6:16-7:51 p.m.",
      location: "Ana Manza Beach Hotel and Busena Terrace Hotel, Okinawa, Japan",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 003, PDF 003, CP/CF 1987",
      pdfPacket: "2010-0083-F Box 003 PDF 003",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_003/42-t-7262157-20100083F-003-003-2015.pdf",
      diaryEntry:
        "The diary records a foreign policy briefing on the upcoming meeting with Russian officials, a greeting with Putin at 6:16 p.m., and a meeting with Putin that ran until 7:51 p.m.",
      volumeConnection:
        "Use as the calendar bridge from the June Moscow summit to the September New York strategic-stability cooperation initiative.",
      tags: ["Putin", "Okinawa", "strategic stability", "ABM"]
    },
    {
      id: "pdd-2000-09-06-putin-signing",
      laneId: "strategic-stability",
      date: "2000-09-06",
      title: "New York meeting with Putin and strategic-stability signing",
      eventType: "Leader meeting",
      priority: "High",
      time: "10:55 a.m.-12:34 p.m.",
      location: "Waldorf Astoria Hotel, New York, New York",
      repository: "National Archives / Clinton Presidential Library",
      collection: "Presidential Daily Diary hardcopy sample, 2010-0083-F",
      identifier: "Box 003, PDF 003, CP/CF 1987",
      pdfPacket: "2010-0083-F Box 003 PDF 003",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22",
      pdfUrl:
        "https://nara-media.s3.amazonaws.com/presidential-libraries/clinton/foia/2010-0083-F/2010-0083-F-PDF/Box_003/42-t-7262157-20100083F-003-003-2015.pdf",
      diaryEntry:
        "The diary records a 10:55-11:22 a.m. Russia briefing with Albright, Berger, Holbrooke, Sestanovich, Bradtke, and Medish; an 11:29 a.m.-12:26 p.m. meeting with Putin, Talbott, and Prikhodko; and a signing ceremony for the Strategic Stability Cooperation Initiative between the United States and Russia.",
      volumeConnection:
        "High-value endpoint for START/ABM/NMD, strategic stability, and the transition from Yeltsin to Putin source trails.",
      tags: ["Putin", "strategic stability", "ABM", "New York"]
    }
  ],
  libraryPlan: [
    {
      id: "library-control-2013-0185",
      laneId: "volume-control",
      priority: "Control",
      title: "2013-0185-M folder-title lists",
      office: "Clinton Presidential Library / NSC Access Management",
      sourcePart: "Parts 1-4",
      targetFolders: ["Defense Policy", "Records Management", "Staff Director", "Legal Advisor"],
      visitGoal:
        "Use the folder-title lists as the call-slip map and preserve exact folder titles, OA/ID numbers, restriction codes, and page ranges.",
      whyItMatters:
        "The lists are not final document selections, but they expose the pull sequence needed before a compiler can locate internal decision records.",
      onsiteActions: [
        "Ask staff how current call slips map 2013-0185-M folder rows to boxes and accessions.",
        "Separate 1997-2000 folders from Volume VII handoff folders before bulk requests.",
        "Photograph folder covers and withdrawal sheets before item-level triage."
      ]
    },
    {
      id: "library-start-abm",
      laneId: "strategic-stability",
      priority: "A",
      title: "START III, ABM, and Helsinki/Cologne/Moscow source trail",
      office: "Defense Policy / Robert Bell and Steven Andreasen",
      sourcePart: "Part 1",
      targetFolders: [
        "START Helsinki/START III Guidelines (1997)",
        "START III/ABM PC Meeting, October-December 1998",
        "START III/RVs, October-December 1997",
        "START III 2000",
        "START III/ABM Grand Bargains?"
      ],
      visitGoal:
        "Pull START III and ABM folders that bracket the released Helsinki and Cologne memcons.",
      whyItMatters:
        "The public joint statements are thin without the interagency papers that shaped START III limits, ABM successor-state questions, and negotiating instructions.",
      onsiteActions: [
        "Start with START Helsinki/START III Guidelines and START III/ABM PC Meeting folders.",
        "Pair each internal paper with the corresponding public statement date.",
        "Mark whether the file is negotiation guidance, Hill strategy, Russian reaction, or briefing material."
      ]
    },
    {
      id: "library-nmd",
      laneId: "abm-nmd",
      priority: "A",
      title: "NMD/ABM 2000 and PRD-31 ballistic missile defense",
      office: "Defense Policy / Steven Andreasen and Robert Bell",
      sourcePart: "Part 1",
      targetFolders: [
        "NMD/ABM 2000 POTUS Trip to Ukraine/Russia 2000",
        "PRD-31 Ballistic Missile Defense & ABM Treaty, August-",
        "Russia's Attitude Toward US National Missile Defense"
      ],
      visitGoal:
        "Locate the policy papers behind the NMD Act, the March 2000 ABM MOU letter, the Moscow summit package, and September 2000 deployment decision.",
      whyItMatters:
        "This is the highest-risk interpretive chapter because public claims, Russian warnings, congressional pressure, and technical readiness diverged.",
      onsiteActions: [
        "Prioritize folders that name both NMD and ABM.",
        "Log any OVP, Defense, JCS, State, or intelligence attachments separately.",
        "Cross-check with Strobe Talbott FOIA documents C06770352, C09000042, and C09000063."
      ]
    },
    {
      id: "library-ctbt",
      laneId: "ctbt",
      priority: "A",
      title: "CTBT ratification campaign and Senate defeat",
      office: "Defense Policy / Steven Andreasen; Records Management; Speechwriting",
      sourcePart: "Parts 1, 3, and 4",
      targetFolders: [
        "Congressional Ratification of the Comprehensive Test Ban Treaty",
        "CTB-EIF",
        "CTB-PRC",
        "CTBT speechwriting and rollout folders"
      ],
      visitGoal:
        "Move from public Clinton statements to the internal ratification plan, vote count, scientific stewardship argument, and Russian reaction.",
      whyItMatters:
        "The Senate defeat is a central Volume VIII event and needs more than public speeches.",
      onsiteActions: [
        "Pull the 2015-1095-F CTBT finding aid items first.",
        "Capture any Senate whip-count, science-adviser, stockpile-stewardship, and Russian-reaction materials.",
        "Compare the October 13 public statement with the October 15 Mamedov cable."
      ]
    },
    {
      id: "library-south-asia",
      laneId: "regional-proliferation",
      priority: "A",
      title: "South Asia nuclear testing and strategic restraint",
      office: "Records Management; Near East and South Asian Affairs; Nonproliferation",
      sourcePart: "Parts 2 and 3",
      targetFolders: [
        "PC Meeting on South Asia, June 24, 1996",
        "DC Meeting on South Asia Nonproliferation, April 3, 1995",
        "POTUS Trip to India & Bangladesh, March 19-25, 2000",
        "POTUS Stop in Pakistan During South Asia"
      ],
      visitGoal:
        "Build the internal record for India/Pakistan nuclear tests, sanctions, Talbott diplomacy, and Clinton's March 2000 South Asia trip.",
      whyItMatters:
        "The regional chapter can become anecdotal unless it has DC/PC notes, State cables, and trip records around the nuclear and missile questions.",
      onsiteActions: [
        "Screen 2006-0859-M before broad trip-book pulls.",
        "Separate nuclear-test response from Kashmir and democracy material.",
        "Flag Talbott-Jaswant Singh dialogue references for State FOIA follow-up."
      ]
    },
    {
      id: "library-dprk",
      laneId: "regional-proliferation",
      priority: "A",
      title: "DPRK missile and nuclear diplomacy, 1998-2000",
      office: "Nonproliferation and Export Controls; Asian Affairs; National Security Advisor files",
      sourcePart: "DPRK/ROK collections and 2009-0528-F segments",
      targetFolders: [
        "Taepo Dong and North Korean missile launch folders",
        "Perry process and North Korea policy review",
        "KEDO and Agreed Framework implementation",
        "Albright trip and 2000 North Korea diplomacy"
      ],
      visitGoal:
        "Build an item-level lane for Taepo Dong, Perry review, missile moratorium diplomacy, KEDO, and late-Clinton North Korea contacts.",
      whyItMatters:
        "Without DPRK material, the regional-proliferation lane overweights South Asia and misses the major 1998-2000 missile diplomacy arc.",
      onsiteActions: [
        "Use Clinton Digital Library DPRK/ROK collection IDs as call-slip seeds.",
        "Separate nuclear-reactor/KEDO implementation from missile moratorium and export-control diplomacy.",
        "Backtrace Albright-trip and Perry-process public records to NSC and State source files."
      ]
    },
    {
      id: "library-cfe",
      laneId: "conventional-cfe",
      priority: "A",
      title: "CFE adaptation and Istanbul endgame",
      office: "Defense Policy / Anne Witkowsky, Robert Bell, Hans Binnendijk",
      sourcePart: "Part 1",
      targetFolders: [
        "CFE-Istanbul Summit Documents",
        "CFE Adaptation, July-September 1999",
        "CFE-October/November Endgame",
        "CFE Congressional Report 2000",
        "CFE Adaptation, January 2000"
      ],
      visitGoal:
        "Trace the CFE adaptation endgame, flank questions, NATO consultations, and ratification reporting.",
      whyItMatters:
        "CFE belongs in the conventional lane and should not be swallowed by the NATO or Russia volume boundaries.",
      onsiteActions: [
        "Pull the Istanbul and October/November endgame folders first.",
        "Capture HLTF/JCG references and country ceiling papers.",
        "Cross-check with OSCE public documents after archival review."
      ]
    },
    {
      id: "library-cbw",
      laneId: "cbw",
      priority: "B",
      title: "CWC, BWC, chemical demilitarization, and CBW terrorism",
      office: "Defense Policy; Legal Advisor; Nonproliferation and Export Controls",
      sourcePart: "Parts 1 and 3",
      targetFolders: [
        "CWC ratification and implementation folders",
        "Chemical Weapons Demilitarization",
        "BWC protocol and Ad Hoc Group folders",
        "CBW terrorism export-control files"
      ],
      visitGoal:
        "Pair the public CWC/Russia statements with internal implementation, verification, and Russian compliance files.",
      whyItMatters:
        "CBW is treaty-heavy but source-fragile; legal and implementation files are often more valuable than speeches.",
      onsiteActions: [
        "Prioritize policy and legal files before speechwriting backtrace.",
        "Record whether folders concern U.S. ratification, Russian ratification, implementation, or compliance.",
        "Keep BWC strengthening separate from CWC implementation."
      ]
    },
    {
      id: "library-fissile",
      laneId: "fissile-ctr",
      priority: "B",
      title: "Plutonium disposition, HEU, and nuclear-materials security",
      office: "Defense Policy; DOE-facing NSC files; Records Management",
      sourcePart: "Parts 1 and 3",
      targetFolders: [
        "Nuclear Summit MPC&A",
        "PDD-47 nuclear scientific and technical cooperation with Russia",
        "Plutonium disposition and early warning records",
        "Ukraine/Russia trip material, June 2000"
      ],
      visitGoal:
        "Find implementation records behind public plutonium, early-warning, and CTR statements.",
      whyItMatters:
        "Public summit texts need DOE, DOD, USEC, Minatom, and MPC&A support to become a credible source sequence.",
      onsiteActions: [
        "Identify DOE and Defense attachments before item-level selection.",
        "Record whether a file concerns plutonium, HEU, launch notification, or MPC&A.",
        "Compare June 2000 public statements with trip briefing books."
      ]
    }
  ],
  gapTracker: [
    {
      id: "gap-planned-volume",
      laneId: "volume-control",
      priority: "Critical",
      status: "Guardrail added",
      title: "Do not treat public anchors as a published FRUS chronology",
      evidence:
        "The Office of the Historian lists Volume VIII as planned, so there are no official document numbers or editorial selections.",
      problem:
        "Public statements and released memcons can look definitive if the site does not visibly mark them as candidates and source leads.",
      needed:
        "Keep item level, confidence, source type, and compiler-risk metadata on every card.",
      resolution:
        "The interface now labels the volume as planned, keeps source type and item level visible, separates Public Papers from released records and source paths, and exports the metadata needed to preserve that distinction.",
      remainingRisk:
        "Only an official Office of the Historian publication can close the chronology risk; until then, document numbers must remain absent.",
      nextActions: [
        "Preserve the official planned status in the hero and source notes.",
        "Mark released memcons, public statements, folder-title leads, and FOIA records distinctly.",
        "Add document numbers only after official publication."
      ]
    },
    {
      id: "gap-start-abm-internal",
      laneId: "strategic-stability",
      priority: "Critical",
      status: "Source plan added",
      title: "Pair Helsinki, Cologne, and Moscow public statements with internal decision records",
      evidence:
        "Released leader memcons and public joint statements identify key dates, but they do not expose the full U.S. negotiating position.",
      problem:
        "A chapter built only from public joint statements would understate interagency debate over START III, ABM, NMD, and Duma ratification strategy.",
      needed:
        "Defense Policy, State, JCS, OVP, and intelligence attachments from Clinton Library and State FOIA.",
      resolution:
        "Added congressional, NATO, OSCE, Strobe FOIA, Presidential Daily Diary, and Clinton Library pull-plan rows that triangulate START/ABM/NMD public statements against internal-source locations.",
      remainingRisk:
        "This remains a source-acquisition gap until the Defense Policy folders and attached interagency papers are pulled and itemized.",
      nextActions: [
        "Pull START III/ABM PC Meeting, START Helsinki, and START III 2000 folders.",
        "Cross-check C09000042 and C09000063 with June 2000 public statements.",
        "Mark whether each selected record is U.S. position, Russian reaction, or allied consultation."
      ]
    },
    {
      id: "gap-ctbt-senate",
      laneId: "ctbt",
      priority: "Critical",
      status: "Source plan added",
      title: "Reconstruct the CTBT Senate campaign, not only the defeat",
      evidence:
        "The current public layer has several October 1999 statements and a Russian reaction cable.",
      problem:
        "The compiler needs the preceding vote strategy, science and stockpile-stewardship argument, Senate contacts, and post-defeat diplomatic cleanup.",
      needed:
        "2015-1095-F CTBT ratification files, congressional records, Senate committee material, and State/Russian reaction cables.",
      resolution:
        "Added Treaty Document 105-28, the October 1999 Senate Foreign Relations final-review hearing, the Clinton Library CTBT finding aid, Presidential Daily Diary meeting markers, Public Papers markers, and the Mamedov reaction cable as a ratification-chain source map.",
      remainingRisk:
        "The Senate strategy gap is not closed until vote-count, science-adviser, stockpile-stewardship, and White House liaison records are extracted from the archival files.",
      nextActions: [
        "Screen the Clinton Library CTBT ratification finding aid.",
        "Add Senate Treaty Document and Congressional Record rows with exact pages.",
        "Pair the October 13 public remarks with Mamedov's October 15 cable."
      ]
    },
    {
      id: "gap-nmd-abm-allied",
      laneId: "abm-nmd",
      priority: "High",
      status: "Source plan added",
      title: "Add allied consultation records for NMD/ABM",
      evidence:
        "Strobe FOIA has a NAC briefing after the Moscow summit and a Yavlinsky NMD cable, but the allied consultation trail is still thin.",
      problem:
        "The ABM/NMD chapter needs NATO and allied reaction, not only U.S.-Russia bilateral records.",
      needed:
        "NAC, NATO, State EUR, Defense, and OVP consultation records tied to 1999-2000 NMD decisions.",
      resolution:
        "Added NATO Florence ministerial consultation, the NMD Act congressional anchor, and the NAC Moscow-summit State FOIA cable to the ABM/NMD lane.",
      remainingRisk:
        "NATO public/transcript records do not replace State EUR, Defense, OVP, and embassy cables; those still need item-level extraction.",
      nextActions: [
        "Search Strobe FOIA for NAC, NMD, ABM, and theater missile defense.",
        "Pull NMD/ABM 2000 trip folders and PRD-31 files.",
        "Separate allied consultation from technical readiness reviews."
      ]
    },
    {
      id: "gap-south-asia",
      laneId: "regional-proliferation",
      priority: "High",
      status: "Source plan added",
      title: "Build the South Asia nuclear-test record beyond public remarks",
      evidence:
        "The June 3, 1998 Public Papers item and 2006-0859-M source path are strong locators, but not a complete policy record.",
      problem:
        "The India/Pakistan chapter needs sanctions decisions, Talbott diplomacy, DC/PC records, intelligence assessments, and March 2000 trip files.",
      needed:
        "State cables, NSC South Asia files, Talbott records, and trip briefing books with nuclear and missile sections identified.",
      resolution:
        "The South Asia lane now links Daily Diary Sharif and Vajpayee call markers, the June 1998 public statement, Clinton Digital Library MDR 2006-0859-M, the on-site pull plan, and Talbott FOIA search terms for strategic-restraint diplomacy.",
      remainingRisk:
        "The source map still needs item-level sanctions, DC/PC, intelligence, and Talbott-Jaswant Singh records before document selection.",
      nextActions: [
        "Screen 2006-0859-M for exact documents and attachments.",
        "Search Talbott FOIA for strategic restraint, fissile material, Jaswant Singh, and Pakistan.",
        "Pull March 2000 South Asia trip books only after nuclear folders are identified."
      ]
    },
    {
      id: "gap-dprk-balance",
      laneId: "regional-proliferation",
      priority: "High",
      status: "Source plan added",
      title: "Add DPRK missile and nuclear diplomacy for 1998-2000",
      evidence:
        "Volume VII source work already had DPRK-heavy 1993-1994 file units, but Volume VIII needs Taepo Dong, Perry process, missile moratorium, and 2000 diplomacy.",
      problem:
        "DPRK coverage will otherwise stop at the Agreed Framework handoff and miss the late-Clinton missile diplomacy.",
      needed:
        "State EAP, NSC Nonproliferation, Perry process, Albright trip, and KEDO implementation records.",
      resolution:
        "Added Presidential Daily Diary Perry, Japan, and South Korea meeting markers plus Clinton Digital Library DPRK/ROK collection leads and a late-Clinton North Korea folder lead so Taepo Dong, Perry process, KEDO, missile moratorium, and 2000 diplomacy have a source path.",
      remainingRisk:
        "The DPRK lane is still collection-level until individual folders and cables are screened for nuclear versus missile diplomacy.",
      nextActions: [
        "Search NARA/Clinton Library for Perry process, Taepo Dong, missile moratorium, and DPRK.",
        "Separate nuclear-reactor implementation from missile diplomacy.",
        "Use public statements only as chronology checks."
      ]
    },
    {
      id: "gap-cfe-boundary",
      laneId: "conventional-cfe",
      priority: "Medium",
      status: "Boundary rule added",
      title: "Control CFE boundary with Europe/NATO volumes",
      evidence:
        "CFE adaptation belongs to European security but also sits inside arms-control subject matter.",
      problem:
        "Without explicit boundary notes, CFE can drift into NATO enlargement pages or disappear from the arms-control volume.",
      needed:
        "A clear rule: include CFE adaptation, arms-control guidance, and ratification records; leave broader NATO enlargement to European security volumes.",
      resolution:
        "Added the Daily Diary Istanbul/Yeltsin meeting marker, OSCE CFE adaptation and final-act records, and kept the Clinton Library CFE pull plan scoped to adaptation, HLTF/JCG, flank, congressional report, and Istanbul endgame files.",
      remainingRisk:
        "Boundary discipline still depends on tagging archival items as arms-control content versus broader NATO process content during pull review.",
      nextActions: [
        "Pull CFE-Istanbul and CFE-October/November Endgame folders.",
        "Tag CFE records by arms-control content versus NATO process content.",
        "Retain boundary notes on all CFE cards."
      ]
    },
    {
      id: "gap-cbw-implementation",
      laneId: "cbw",
      priority: "Medium",
      status: "Source plan added",
      title: "Move CBW from treaty headlines to implementation records",
      evidence:
        "Public statements identify CWC Russian ratification and chemical weapons commitments.",
      problem:
        "The chapter still needs ACDA, State, Legal Advisor, and NSC implementation files, especially for verification, declarations, compliance, and BWC strengthening.",
      needed:
        "Legal and policy records that distinguish CWC ratification, implementation, BWC protocol work, and CBW terrorism.",
      resolution:
        "Added Elisa Harris CWC collection material and Helms treaty-file leads alongside existing CWC public markers, so CBW now has implementation and Senate-side source trails.",
      remainingRisk:
        "Actual closure requires item-level CWC declarations/compliance, BWC protocol, Legal Adviser, ACDA, State, and NSC implementation records.",
      nextActions: [
        "Pull legal and Defense Policy CWC/BWC folders before speechwriting.",
        "Record Russian compliance and declaration issues separately.",
        "Use public statements as endpoint markers, not the main source base."
      ]
    }
  ],
  sourcePools: [
    {
      id: "pool-clinton-library-defense",
      laneId: "strategic-stability",
      priority: "A",
      title: "NSC Defense Policy and Arms Control files",
      institution: "Clinton Presidential Library / NARA",
      coverage: "START III, ABM, NMD, CFE, CTBT, landmines, CWC",
      nextUse: "Primary on-site pull lane for most internal decision records.",
      url: "https://catalog.archives.gov/id/7386504"
    },
    {
      id: "pool-clinton-library-np",
      laneId: "nonproliferation-regimes",
      priority: "A",
      title: "NSC Nonproliferation and Export Controls files",
      institution: "Clinton Presidential Library / NARA",
      coverage: "NPT, MTCR, export controls, Iran, DPRK, South Asia, China, WMD sanctions",
      nextUse: "Core source pool for regional and regime chapters.",
      url: "https://catalog.archives.gov/id/7388773"
    },
    {
      id: "pool-strobe",
      laneId: "abm-nmd",
      priority: "A",
      title: "Strobe Talbott FOIA manifest",
      institution: "Department of State FOIA Library",
      coverage: "START III, ABM/NMD, CTBT defeat, CFE, South Asia, Russia consultations",
      nextUse: "Search for document-level cables and memos that complement Clinton Library folder titles.",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html"
    },
    {
      id: "pool-ppp",
      laneId: "volume-control",
      priority: "A",
      title: "Public Papers of the Presidents",
      institution: "GovInfo",
      coverage: "Public statements, signing messages, joint statements, and public chronology.",
      nextUse: "Anchor public dates and policy language, then backtrace to internal records.",
      url: "https://www.govinfo.gov/app/collection/ppp/president-42_Clinton%2C%20William%20J."
    },
    {
      id: "pool-pdd",
      laneId: "volume-control",
      priority: "A",
      title: "Presidential Daily Diary",
      institution: "Clinton Presidential Library / National Archives",
      coverage: "President-level calls, meetings, briefings, travel, topics, participants, and sample hardcopy diary packets.",
      nextUse: "Use to verify candidate dates and identify participant lists before pulling memcons, briefing papers, and cables.",
      url: "https://www.clintonlibrary.gov/research/daily-diary"
    },
    {
      id: "pool-cdl",
      laneId: "regional-proliferation",
      priority: "B",
      title: "Clinton Digital Library MDR packets",
      institution: "Clinton Digital Library",
      coverage: "South Asia, Iran, China, North Korea, Russian leaders, and trip files.",
      nextUse: "Packet-level locator pool before an on-site pull.",
      url: "https://clinton.presidentiallibraries.us/"
    },
    {
      id: "pool-congress",
      laneId: "ctbt",
      priority: "B",
      title: "Congress.gov treaty and debate records",
      institution: "Congress.gov",
      coverage: "CTBT, ABM MOU, CWC, START II, sanctions legislation, NMD Act.",
      nextUse: "Legislative and treaty context for Senate conditions and floor action.",
      url: "https://www.congress.gov/"
    },
    {
      id: "pool-nato-osce",
      laneId: "conventional-cfe",
      priority: "B",
      title: "NATO and OSCE consultation/treaty records",
      institution: "NATO / OSCE",
      coverage: "NMD allied consultations, CFE adaptation, Istanbul final act, and public allied treaty endpoints.",
      nextUse: "Boundary and public-allied context before selecting internal U.S. decision records.",
      url: "https://www.osce.org/library"
    },
    {
      id: "pool-dprk-cdl",
      laneId: "regional-proliferation",
      priority: "B",
      title: "Clinton Digital Library DPRK and ROK files",
      institution: "Clinton Digital Library",
      coverage: "Taepo Dong, KEDO, North Korea missile/WMD files, Perry process, Albright trip, and 2000 diplomacy.",
      nextUse: "Seed an item-level DPRK lane before broader State EAP and NSC pulls.",
      url: "https://clinton.presidentiallibraries.us/collections/show/182"
    },
    {
      id: "pool-state-foia",
      laneId: "regional-proliferation",
      priority: "B",
      title: "State Department FOIA Virtual Reading Room",
      institution: "Department of State",
      coverage: "Cables and briefing memoranda across regional proliferation, NMD, CFE, and Talbott diplomacy.",
      nextUse: "Search exact terms after Clinton Library folders identify dates and participants.",
      url: "https://foia.state.gov/searchapp/Search/SubmitSimpleQuery"
    },
    {
      id: "pool-nara-scout",
      laneId: "volume-control",
      priority: "C",
      title: "NARA Catalog and NARA Scout",
      institution: "National Archives",
      coverage: "Collection, series, file-unit, and digitized-item discovery.",
      nextUse: "Use for collection discovery; do not promote file-unit hits without item boundaries.",
      url: "https://catalog.archives.gov/"
    }
  ],
  sourceCopyLedger: [
    {
      id: "ledger-helsinki",
      title: "Helsinki leader memcons",
      laneId: "strategic-stability",
      status: "Review copy ready",
      sourceClass: "Released Clinton Library MDR packet",
      repositoryTrail:
        "Clinton Library foreign-leader chronology and MDR release 2015-0782-M-2; companion PDFs extracted on Clinton-Russia-High-Level.",
      reviewCue:
        "Use companion PDFs for review, then cite Clinton Library release packet and page spans in final source notes."
    },
    {
      id: "ledger-cologne",
      title: "Cologne Clinton-Yeltsin memcon",
      laneId: "strategic-stability",
      status: "Review copy ready",
      sourceClass: "Released Clinton Library MDR packet",
      repositoryTrail:
        "Release packet 2015-0782-M-2 plus related packet 2014-0546-M-Release-A noted in source audit.",
      reviewCue:
        "Duplicate packet pages were excluded in the companion page; verify against original release before final selection."
    },
    {
      id: "ledger-ctbt-public",
      title: "CTBT public statement cluster",
      laneId: "ctbt",
      status: "Public anchors",
      sourceClass: "GovInfo Public Papers",
      repositoryTrail:
        "1999 Book II Public Papers items for July 20, October 4, October 6, and October 13.",
      reviewCue:
        "Use to anchor chronology and public arguments; pair with 2015-1095-F and Senate records."
    },
    {
      id: "ledger-strobe-foia",
      title: "State FOIA Strobe/Talbott records",
      laneId: "abm-nmd",
      status: "PDF URLs retained",
      sourceClass: "State FOIA release copies",
      repositoryTrail:
        "F-2017-13804 release folders; repeated document IDs require exact PDF URL preservation.",
      reviewCue:
        "Record release folder and document ID together; do not collapse duplicate IDs from different monthly releases."
    },
    {
      id: "ledger-folder-titles",
      title: "2013-0185-M folder-title rows",
      laneId: "volume-control",
      status: "Collection-only leads",
      sourceClass: "Clinton Library folder-title lists",
      repositoryTrail:
        "Mandatory declassification review folder-title lists, Parts 1-4.",
      reviewCue:
        "Do not cite as documents; use as pull requests for folder covers, withdrawal sheets, and item-level records."
    },
    {
      id: "ledger-public-papers",
      title: "GovInfo Public Papers PDFs",
      laneId: "volume-control",
      status: "Public source stable",
      sourceClass: "Published public record",
      repositoryTrail:
        "GovInfo PPP package/access IDs and PDF links.",
      reviewCue:
        "Keep public statements in their own layer so they do not inflate the private source count."
    },
    {
      id: "ledger-presidential-daily-diary",
      title: "Presidential Daily Diary calls and meetings",
      laneId: "volume-control",
      status: "Search layer added",
      sourceClass: "Clinton Library/NARA Daily Diary records",
      repositoryTrail:
        "Clinton Library Daily Diary source guide, NARA Catalog search for 2010-0083-F, and hardcopy sample PDFs from Boxes 002-003.",
      reviewCue:
        "Use the diary as calendar and participant evidence; promote a substantive document only after a memcon, briefing paper, cable, or source file gives content."
    },
    {
      id: "ledger-congressional",
      title: "Congressional treaty, hearing, and statutory anchors",
      laneId: "ctbt",
      status: "Public source stable",
      sourceClass: "Congress.gov records",
      repositoryTrail:
        "Treaty Doc. 105-28, S. Hrg. 106-262, H.R.4/Public Law 106-38, and related Senate action pages.",
      reviewCue:
        "Use as public congressional anchors; pair with White House liaison, vote-count, and interagency files before selection."
    },
    {
      id: "ledger-nato-osce",
      title: "NATO and OSCE public treaty/consultation records",
      laneId: "conventional-cfe",
      status: "Boundary controls added",
      sourceClass: "Official international-organization records",
      repositoryTrail:
        "NATO ministerial transcript for NMD consultation; OSCE CFE.DOC/1/99 and CFE.DOC/2/99 for Istanbul CFE adaptation.",
      reviewCue:
        "Use as public-allied context and treaty endpoints; do not let them replace internal U.S. guidance and negotiation records."
    },
    {
      id: "ledger-cdl-source-paths",
      title: "Clinton Digital Library source paths",
      laneId: "regional-proliferation",
      status: "Pull seeds added",
      sourceClass: "Collection and folder-level source paths",
      repositoryTrail:
        "DPRK/ROK collection, North Korea folder item, South Asia MDR, Elisa Harris CWC files, and Helms treaty-file leads.",
      reviewCue:
        "Treat as call-slip and screening starts, not final document copies, until the relevant folders are pulled and itemized."
    }
  ],
  persons: [
    {
      name: "William J. Clinton",
      role: "President of the United States",
      laneIds: ["strategic-stability", "ctbt", "abm-nmd", "regional-proliferation"],
      note: "Principal decision maker in public statements and leader records."
    },
    {
      name: "Boris Yeltsin",
      role: "President of Russia",
      laneIds: ["strategic-stability", "abm-nmd", "cbw"],
      note: "Key counterpart for Helsinki, Cologne, and late-1999 arms-control diplomacy."
    },
    {
      name: "Vladimir Putin",
      role: "President of Russia",
      laneIds: ["strategic-stability", "abm-nmd", "fissile-ctr"],
      note: "Counterpart for the June 2000 Moscow summit and late Clinton strategic-stability package."
    },
    {
      name: "Strobe Talbott",
      role: "Deputy Secretary of State",
      laneIds: ["abm-nmd", "strategic-stability", "regional-proliferation", "conventional-cfe"],
      note: "State channel for Russia, South Asia, CTBT aftermath, and CFE/NMD diplomacy."
    },
    {
      name: "Madeleine Albright",
      role: "Secretary of State",
      laneIds: ["regional-proliferation", "strategic-stability", "ctbt"],
      note: "Cabinet-level diplomacy across Russia, South Asia, North Korea, and CTBT."
    },
    {
      name: "Samuel R. Berger",
      role: "Assistant to the President for National Security Affairs",
      laneIds: ["volume-control", "abm-nmd", "regional-proliferation"],
      note: "NSC lead for White House policy coordination in the second Clinton term."
    },
    {
      name: "Robert Bell",
      role: "NSC Defense Policy and Arms Control",
      laneIds: ["strategic-stability", "abm-nmd", "conventional-cfe", "cbw"],
      note: "Core Clinton Library source creator for Defense Policy and Arms Control files."
    },
    {
      name: "Steven Andreasen",
      role: "NSC Defense Policy and Arms Control",
      laneIds: ["ctbt", "abm-nmd", "strategic-stability"],
      note: "High-value staff-file creator for CTBT, ABM/NMD, and START records."
    },
    {
      name: "Gary Samore",
      role: "NSC Nonproliferation and Export Controls",
      laneIds: ["regional-proliferation", "nonproliferation-regimes"],
      note: "Key nonproliferation official for late Clinton regional cases."
    },
    {
      name: "Daniel Poneman",
      role: "NSC Nonproliferation and Export Controls",
      laneIds: ["nonproliferation-regimes", "regional-proliferation"],
      note: "Handoff source creator from early Clinton nonproliferation policy into later files."
    },
    {
      name: "Anne Witkowsky",
      role: "NSC Defense Policy and Arms Control",
      laneIds: ["conventional-cfe"],
      note: "High-yield CFE adaptation and conventional-force source creator."
    },
    {
      name: "Hans Binnendijk",
      role: "NSC Defense Policy and Arms Control",
      laneIds: ["conventional-cfe", "abm-nmd"],
      note: "Late Clinton defense-policy files include CFE and NMD/ABM material."
    },
    {
      name: "John Holum",
      role: "ACDA Director / Senior Arms Control official",
      laneIds: ["ctbt", "nonproliferation-regimes", "cbw"],
      note: "Important for CTBT, CWC, and nonproliferation implementation records."
    },
    {
      name: "Igor Ivanov",
      role: "Russian Foreign Minister",
      laneIds: ["strategic-stability", "abm-nmd", "ctbt"],
      note: "Russian diplomatic counterpart in the late Yeltsin and early Putin period."
    },
    {
      name: "Georgiy Mamedov",
      role: "Russian Deputy Foreign Minister",
      laneIds: ["ctbt", "strategic-stability", "conventional-cfe"],
      note: "Appears in CTBT and arms-control reaction cables."
    },
    {
      name: "Jaswant Singh",
      role: "Indian External Affairs Minister",
      laneIds: ["regional-proliferation"],
      note: "Central counterpart in the post-1998 South Asia strategic restraint dialogue."
    },
    {
      name: "Atal Bihari Vajpayee",
      role: "Prime Minister of India",
      laneIds: ["regional-proliferation"],
      note: "Presidential Daily Diary call marker for March 2000 South Asia strategic-restraint and trip diplomacy."
    },
    {
      name: "Nawaz Sharif",
      role: "Prime Minister of Pakistan",
      laneIds: ["regional-proliferation"],
      note: "Pakistani leader during the 1998 nuclear tests and Kargil crisis."
    },
    {
      name: "Kim Dae-jung",
      role: "President of South Korea",
      laneIds: ["regional-proliferation"],
      note: "Key allied leader for North Korea policy and the Perry process context."
    },
    {
      name: "William J. Perry",
      role: "Former Secretary of Defense / North Korea policy coordinator",
      laneIds: ["regional-proliferation"],
      note: "Namesake for the late-1990s DPRK policy review and missile/nuclear diplomacy."
    },
    {
      name: "Elisa D. Harris",
      role: "NSC Nonproliferation and Export Controls",
      laneIds: ["cbw", "nonproliferation-regimes"],
      note: "Source creator for CWC implementation files and CBW policy records."
    },
    {
      name: "Jesse Helms",
      role: "Chairman, Senate Foreign Relations Committee",
      laneIds: ["ctbt", "cbw"],
      note: "Senate-side treaty politics source path for CTBT and CWC records."
    }
  ],
  sources: [
    {
      label: "Official Volume VIII page",
      url: "https://history.state.gov/historicaldocuments/frus1993-00v08"
    },
    {
      label: "Volume VII arms-control assister",
      url: "https://therealjameswilson.github.io/Clinton-armscontrol-93-96/"
    },
    {
      label: "FRUS Status of the Series",
      url: "https://history.state.gov/historicaldocuments/status-of-the-series"
    },
    {
      label: "Clinton Library textual holdings guide",
      url: "https://www.clintonlibrary.gov/sites/default/files/documents/research/clinton-library-guide-holdings-2020-no-sf-cf.pdf"
    },
    {
      label: "Clinton Library foreign-leader meetings and calls",
      url: "https://www.clintonlibrary.gov/research/meetings-and-telephone-calls-foreign-leaders"
    },
    {
      label: "Clinton Library Presidential Daily Diary",
      url: "https://www.clintonlibrary.gov/research/daily-diary"
    },
    {
      label: "NARA Catalog search for 2010-0083-F",
      url: "https://catalog.archives.gov/search?collectionIdentifier=WJC*&q=%222010-0083-F%22"
    },
    {
      label: "Clinton Library Yeltsin release 2015-0782-M-2",
      url: "https://www.clintonlibrary.gov/research/archives/finding-aids/declassified-documents-concerning-russian-president-boris-yeltsin-0"
    },
    {
      label: "GovInfo Public Papers collection",
      url: "https://www.govinfo.gov/app/collection/ppp/president-42_Clinton%2C%20William%20J."
    },
    {
      label: "State FOIA Strobe Talbott manifest",
      url: "https://therealjameswilson.github.io/strobe-talbott-foia/manifest.html"
    },
    {
      label: "NARA Catalog",
      url: "https://catalog.archives.gov/"
    },
    {
      label: "Congress.gov CTBT Treaty Document 105-28",
      url: "https://www.congress.gov/treaty-document/105th-congress/28/document-text"
    },
    {
      label: "Congress.gov CTBT final review hearing",
      url: "https://www.congress.gov/event/106th-congress/senate-event/LC19462/text"
    },
    {
      label: "NATO NMD consultation transcript",
      url: "https://www.nato.int/en/news-and-events/events/transcripts/2000/05/24/statement"
    },
    {
      label: "OSCE CFE adaptation agreement",
      url: "https://www.osce.org/library/14108"
    },
    {
      label: "Clinton Digital Library DPRK and ROK collection",
      url: "https://clinton.presidentiallibraries.us/collections/show/182"
    },
    {
      label: "Clinton Digital Library Elisa Harris CWC files",
      url: "https://clinton.presidentiallibraries.us/items/show/57270"
    }
  ]
};
