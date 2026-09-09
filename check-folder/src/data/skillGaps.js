export const NON_PLACEMENT_REASONS = [
  {
    rank: 1,
    reason: "Wage offered below local living cost / expectation",
    marathi: "अपेक्षित वेतनापेक्षा कमी पगार",
    percentage: 31.8,
    count: 27350,
    cumulative: 31.8,
    category: "Economic",
    insight: "Reported mainly in Tier 2/3 candidates migrating to Mumbai/Pune where rent consumes >45% of salary."
  },
  {
    rank: 2,
    reason: "Location mismatch / no affordable safe accommodation",
    marathi: "कामाचे ठिकाण घरापासून दूर / सुरक्षित निवासाचा अभाव",
    percentage: 24.2,
    count: 20810,
    cumulative: 56.0,
    category: "Mobility",
    insight: "68% of women respondents cited refusal to relocate without verified working women hostels."
  },
  {
    rank: 3,
    reason: "Family / elder / childcare caretaking responsibilities",
    marathi: "कौटुंबिक व मुलांच्या संगोपनाची जबाबदारी",
    percentage: 15.6,
    count: 13410,
    cumulative: 71.6,
    category: "Social",
    insight: "Substantial drop-off among married women (ages 22-30) post 90 days of initial placement."
  },
  {
    rank: 4,
    reason: "Mismatch between institute equipment and modern factory floor",
    marathi: "प्रशिक्षणातील यंत्रे व कारखान्यातील आधुनिक तंत्रज्ञानात तफावत",
    percentage: 13.4,
    count: 11520,
    cumulative: 85.0,
    category: "Curriculum",
    insight: "Employers reject candidates during probation due to zero exposure to automated CNC/PLC panels."
  },
  {
    rank: 5,
    reason: "Rotational night shifts & absence of late-night transport",
    marathi: "रात्रपाळी व रात्रीच्या प्रवासाची सोय नसणे",
    percentage: 8.5,
    count: 7310,
    cumulative: 93.5,
    category: "Working Conditions",
    insight: "Critical friction in MIDC areas (Bhosari, Ranjangaon, Chakan, Butibori)."
  },
  {
    rank: 6,
    reason: "Opted for higher education / MPSC & Talathi exam preparation",
    marathi: "उच्च शिक्षण किंवा स्पर्धा परीक्षांची तयारी",
    percentage: 6.5,
    count: 5590,
    cumulative: 100.0,
    category: "Career Choice",
    insight: "Temporary holding pattern observed among arts/commerce graduates taking skilling courses."
  }
];

export const EMERGING_SKILL_GAPS = [
  {
    sector: "Automotive & EV",
    tag: "EV Battery Management System (BMS)",
    demandIndex: 94,
    employerQuotes: "Technicians understand IC engine spark plugs well, but cannot run CAN-bus OBD diagnostics on lithium packs.",
    suggestedIntervention: "15-day modular add-on bridge module on High Voltage Safety & BMS."
  },
  {
    sector: "Solar & Renewables",
    tag: "Grid-tied Inverter Synchronization",
    demandIndex: 88,
    employerQuotes: "Can install mounting brackets easily, but struggle with net-metering synchronization and MSEDCL safety compliance.",
    suggestedIntervention: "MSEDCL accredited 5-day grid interconnect practical lab."
  },
  {
    sector: "Healthcare (GDA)",
    tag: "NABH Protocol & ICU Monitoring",
    demandIndex: 91,
    employerQuotes: "Bed-making and hygiene are fine, but reading automated digital syringe pumps and recording electronic health records is lagging.",
    suggestedIntervention: "Hospital simulation lab partnership in district civil hospitals."
  },
  {
    sector: "IT-ITeS & Services",
    tag: "Conversational Business English & CRM",
    demandIndex: 85,
    employerQuotes: "Technical aptitude is good, but hesitation on customer ticketing systems and phone etiquette leads to early attrition.",
    suggestedIntervention: "10-day vernacular-to-business English soft-skills lab."
  },
  {
    sector: "Retail & E-commerce",
    tag: "Handheld Terminal (HHT) & Inventory ERP",
    demandIndex: 79,
    employerQuotes: "Warehouse picking requires barcode scanning speed and stock reconciliation skills that conventional retail labs do not simulate.",
    suggestedIntervention: "Simulated warehouse picking and POS barcode station module."
  }
];
