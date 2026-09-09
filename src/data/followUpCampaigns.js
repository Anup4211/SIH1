export const INITIAL_CAMPAIGNS = [
  {
    id: "CAMP-3M-Q2-24",
    name: "3-Month Post-Placement Pulse Survey (Q2 2024 Cohort)",
    cohort: "Q2 2024-25 (Jul - Sep 2024 Certified)",
    interval: "3-Month",
    totalEligible: 34500,
    deliveredCount: 32900,
    deliveryRate: 95.3,
    channels: {
      whatsapp: { sent: 28400, responses: 17890, rate: 63.0 },
      ivr: { sent: 18200, responses: 8190, rate: 45.0 },
      sms: { sent: 32900, responses: 7240, rate: 22.0 }
    },
    totalResponses: 23450,
    overallResponseRate: 68.0,
    nonResponders: 11050,
    assistedCallCenterActive: true,
    callCenterDispatchedCount: 6500,
    callCenterCompletedCount: 4800,
    status: "active",
    lastDispatchDate: "2024-12-08"
  },
  {
    id: "CAMP-6M-Q1-24",
    name: "6-Month Retention & Wage Audit (Q1 2024 Cohort)",
    cohort: "Q1 2024-25 (Apr - Jun 2024 Certified)",
    interval: "6-Month",
    totalEligible: 28900,
    deliveredCount: 26800,
    deliveryRate: 92.7,
    channels: {
      whatsapp: { sent: 23100, responses: 13860, rate: 60.0 },
      ivr: { sent: 14500, responses: 5940, rate: 41.0 },
      sms: { sent: 26800, responses: 4820, rate: 18.0 }
    },
    totalResponses: 17920,
    overallResponseRate: 62.0,
    nonResponders: 10980,
    assistedCallCenterActive: false,
    callCenterDispatchedCount: 0,
    callCenterCompletedCount: 0,
    status: "scheduled_assisted",
    lastDispatchDate: "2024-11-20"
  },
  {
    id: "CAMP-12M-Q3-23",
    name: "12-Month Longitudinal Impact & Progression Study",
    cohort: "Q3 2023-24 (Oct - Dec 2023 Certified)",
    interval: "12-Month",
    totalEligible: 22400,
    deliveredCount: 19800,
    deliveryRate: 88.4,
    channels: {
      whatsapp: { sent: 16900, responses: 9120, rate: 54.0 },
      ivr: { sent: 11200, responses: 3920, rate: 35.0 },
      sms: { sent: 19800, responses: 2770, rate: 14.0 }
    },
    totalResponses: 12320,
    overallResponseRate: 55.0,
    nonResponders: 10080,
    assistedCallCenterActive: true,
    callCenterDispatchedCount: 8200,
    callCenterCompletedCount: 7150,
    status: "active",
    lastDispatchDate: "2024-10-15"
  }
];

export const DATA_QUALITY_METRICS = {
  validConsentRate: 94.2,
  validConsentCount: 173560,
  employerVerifiedRate: 68.7,
  employerVerifiedCount: 67490,
  selfReportedOnlyRate: 31.3,
  selfReportedOnlyCount: 30750,
  dataCompletenessScore: 88.4,
  deduplicationIndex: 98.6,
  epfoUanLinkedRate: 61.2
};
