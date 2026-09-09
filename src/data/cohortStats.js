export const STATEWIDE_KPIS = {
  totalEnrolled: {
    value: 184250,
    formatted: "1,84,250",
    delta: "+11.8%",
    isPositive: true,
    subtext: "vs last quarter (Q2 FY24-25)",
    indicator: "Registered in MahaKaushalya MIS"
  },
  totalPlaced: {
    value: 98240,
    formatted: "98,240",
    delta: "+5.4%",
    isPositive: true,
    subtext: "53.3% formal placement rate",
    indicator: "Confirmed wage employment"
  },
  totalSelfEmployed: {
    value: 22610,
    formatted: "22,610",
    delta: "+8.2%",
    isPositive: true,
    subtext: "12.3% of total certified",
    indicator: "Udyam registered / verified nano-units"
  },
  inApprenticeship: {
    value: 18900,
    formatted: "18,900",
    delta: "+14.6%",
    isPositive: true,
    subtext: "10.3% in NAPS / NATS / MMYY",
    indicator: "Active contractual stipend rolls"
  },
  avgStartingWage: {
    value: 13850,
    formatted: "₹13,850",
    delta: "+7.1%",
    isPositive: true,
    subtext: "Monthly in-hand entry level",
    indicator: "Exceeds state minimum wage bench"
  },
  wageProgressionIndex: {
    value: 38.6,
    formatted: "+38.6%",
    delta: "+3.2%",
    isPositive: true,
    subtext: "Average wage growth at 12 months",
    indicator: "From ₹13.8k to ₹19.2k/mo"
  },
  retentionAtSixMonths: {
    value: 61.8,
    formatted: "61.8%",
    delta: "+2.5%",
    isPositive: true,
    subtext: "Trainees continuously employed",
    indicator: "Tracked across EPFO & micro-surveys"
  },
  activeProviders: {
    value: 412,
    formatted: "412",
    delta: "-8",
    isPositive: false,
    subtext: "18 de-empanelled for compliance",
    indicator: "Inspected & graded TP centers"
  }
};

export const FUNNEL_STAGES = [
  { stage: "Enrolment", label: "Trainees Enrolled", count: 184250, dropPct: 0, color: "#1e3a73" },
  { stage: "Completion", label: "Course Completed", count: 156800, dropPct: 14.9, color: "#0e7490" },
  { stage: "Certification", label: "Assessment Passed & Certified", count: 142500, dropPct: 9.1, color: "#0891b2" },
  { stage: "Placement Offer", label: "Job / Apprenticeship Offered", count: 114600, dropPct: 19.6, color: "#0284c7" },
  { stage: "Confirmed Placement", label: "Joined & Verified at 30 Days", count: 98240, dropPct: 14.3, color: "#10b981" },
  { stage: "6-Month Retention", label: "Sustained In Workforce (6M)", count: 60712, dropPct: 38.2, color: "#f59e0b" }
];

export const SCHEME_FUNNEL_BREAKDOWN = {
  all: [
    { name: "Enrolled", count: 184250 },
    { name: "Completed", count: 156800 },
    { name: "Certified", count: 142500 },
    { name: "Placed", count: 98240 },
    { name: "Retained (6M)", count: 60712 }
  ],
  mmyy: [
    { name: "Enrolled", count: 64200 },
    { name: "Completed", count: 57800 },
    { name: "Certified", count: 54100 },
    { name: "Placed", count: 42100 },
    { name: "Retained (6M)", count: 28600 }
  ],
  pmkvy: [
    { name: "Enrolled", count: 48900 },
    { name: "Completed", count: 40200 },
    { name: "Certified", count: 36800 },
    { name: "Placed", count: 22800 },
    { name: "Retained (6M)", count: 13400 }
  ],
  ddugky: [
    { name: "Enrolled", count: 28400 },
    { name: "Completed", count: 23100 },
    { name: "Certified", count: 20900 },
    { name: "Placed", count: 14500 },
    { name: "Retained (6M)", count: 8200 }
  ],
  state_iti: [
    { name: "Enrolled", count: 31200 },
    { name: "Completed", count: 26800 },
    { name: "Certified", count: 24200 },
    { name: "Placed", count: 17400 },
    { name: "Retained (6M)", count: 12100 }
  ],
  rpl: [
    { name: "Enrolled", count: 11550 },
    { name: "Completed", count: 8900 },
    { name: "Certified", count: 6500 },
    { name: "Placed", count: 1440 },
    { name: "Retained (6M)", count: -1 } // RPL focuses on self-employed/wage baseline uplift
  ]
};

export const RETENTION_CURVE = [
  { month: "Day 0", formalRetained: 100, selfEmpSustained: 100, overallBenchmark: 100 },
  { month: "Month 1", formalRetained: 89.4, selfEmpSustained: 92.1, overallBenchmark: 90.5 },
  { month: "Month 3", formalRetained: 74.2, selfEmpSustained: 83.5, overallBenchmark: 77.8 },
  { month: "Month 6", formalRetained: 61.8, selfEmpSustained: 72.4, overallBenchmark: 65.9 },
  { month: "Month 9", formalRetained: 54.1, selfEmpSustained: 66.8, overallBenchmark: 58.7 },
  { month: "Month 12", formalRetained: 49.6, selfEmpSustained: 61.2, overallBenchmark: 54.3 }
];

export const WAGE_PROGRESSION_DATA = [
  { month: "Entry (M0)", Automotive: 14800, Healthcare: 13200, IT_ITeS: 17500, Solar_Elec: 14200, Retail: 12500, StateAvg: 13850 },
  { month: "Month 3", Automotive: 15400, Healthcare: 13900, IT_ITeS: 18900, Solar_Elec: 15100, Retail: 12900, StateAvg: 14600 },
  { month: "Month 6", Automotive: 17200, Healthcare: 15400, IT_ITeS: 21200, Solar_Elec: 16800, Retail: 13800, StateAvg: 16200 },
  { month: "Month 9", Automotive: 18900, Healthcare: 16800, IT_ITeS: 23600, Solar_Elec: 18400, Retail: 14500, StateAvg: 17700 },
  { month: "Month 12", Automotive: 20800, Healthcare: 18400, IT_ITeS: 26200, Solar_Elec: 20500, Retail: 15600, StateAvg: 19200 }
];

export const SECTOR_PERFORMANCE = [
  { sector: "IT-ITeS & Digital", placedCount: 22400, rate: 71.2, avgWage: 17500, wageGrowth12M: 49.7, relevanceScore: 4.3 },
  { sector: "Automotive & EV", placedCount: 18900, rate: 68.4, avgWage: 14800, wageGrowth12M: 40.5, relevanceScore: 4.1 },
  { sector: "Solar & Electronics", placedCount: 14200, rate: 64.8, avgWage: 14200, wageGrowth12M: 44.3, relevanceScore: 4.2 },
  { sector: "Healthcare (GDA)", placedCount: 16100, rate: 66.5, avgWage: 13200, wageGrowth12M: 39.4, relevanceScore: 4.5 },
  { sector: "BFSI & Accounts", placedCount: 9800, rate: 58.2, avgWage: 14500, wageGrowth12M: 34.2, relevanceScore: 3.8 },
  { sector: "Retail & E-commerce", placedCount: 11200, rate: 49.6, avgWage: 12500, wageGrowth12M: 24.8, relevanceScore: 3.4 },
  { sector: "Apparel & Textiles", placedCount: 5640, rate: 46.1, avgWage: 11200, wageGrowth12M: 19.5, relevanceScore: 3.6 }
];
