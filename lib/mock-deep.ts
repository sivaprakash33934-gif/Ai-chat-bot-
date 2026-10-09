export interface Lead {
  id: string;
  domain: string;
  intent: "PRICE_CHECK" | "STOCK_CHECK" | "POLICY" | "BULK_ORDER" | "GENERAL";
  status: "ACTIVE" | "PENDING_REVIEW" | "QUALIFIED" | "DISQUALIFIED";
  value: number;
  valueFormatted: string;
  created: string;
  createdTimestamp: number;
  contact: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead_001",
    domain: "senthil-traders.in",
    intent: "BULK_ORDER",
    status: "PENDING_REVIEW",
    value: 249920,
    valueFormatted: "List value before discount: ₹2,84,000",
    created: "2026-10-05 09:14",
    createdTimestamp: 1791191062,
    contact: "Senthil Kumar (Director)",
  },
  {
    id: "lead_002",
    domain: "kavin-exports.com",
    intent: "PRICE_CHECK",
    status: "QUALIFIED",
    value: 145000,
    valueFormatted: "₹1,45,000",
    created: "2026-10-05 08:30",
    createdTimestamp: 1791188420,
    contact: "Kavin Raj (Procurement)",
  },
  {
    id: "lead_003",
    domain: "murugan-textiles.co",
    intent: "STOCK_CHECK",
    status: "ACTIVE",
    value: 92000,
    valueFormatted: "₹92,000",
    created: "2026-10-04 18:45",
    createdTimestamp: 1791138900,
    contact: "M. Murugan (Proprietor)",
  },
  {
    id: "lead_004",
    domain: "chennai-brassworks.in",
    intent: "BULK_ORDER",
    status: "PENDING_REVIEW",
    value: 410000,
    valueFormatted: "₹4,10,000",
    created: "2026-10-04 15:20",
    createdTimestamp: 1791126600,
    contact: "V. Anand (Ops Head)",
  },
  {
    id: "lead_005",
    domain: "madurai-fabrics.in",
    intent: "POLICY",
    status: "DISQUALIFIED",
    value: 18000,
    valueFormatted: "₹18,000",
    created: "2026-10-04 11:10",
    createdTimestamp: 1791111600,
    contact: "K. Sundaram (Partner)",
  },
  {
    id: "lead_006",
    domain: "coimbatore-tools.com",
    intent: "PRICE_CHECK",
    status: "ACTIVE",
    value: 65000,
    valueFormatted: "₹65,000",
    created: "2026-10-03 16:05",
    createdTimestamp: 1791042900,
    contact: "P. Rangarajan (Buyer)",
  },
];

export interface CustomerTimelineEntry {
  id: string;
  timestamp: string;
  actor: "MACHINE" | "HUMAN";
  actorName: string;
  type: "QUOTE_ISSUED" | "APPROVAL_GATED" | "HUMAN_NOTE" | "PAYMENT_RECEIVED" | "STOCK_RESERVED";
  voice: "mono" | "serif";
  content: string;
  delta?: string;
}

export interface CustomerDossier {
  id: string;
  name: string;
  gstin: string;
  tier: "Tier 1 — Enterprise" | "Tier 2 — Preferred Wholesale" | "Tier 3 — Standard";
  creditLimit: string;
  outstandingBalance: string;
  memoryBank: Array<{ key: string; value: string }>;
  timeline: CustomerTimelineEntry[];
  openItems: Array<{ id: string; title: string; risk: "HIGH" | "MEDIUM" | "LOW"; summary: string }>;
  nextBestAction: { title: string; recommendation: string; actionLabel: string };
}

export const CUSTOMER_DOSSIERS: Record<string, CustomerDossier> = {
  "senthil-traders": {
    id: "senthil-traders",
    name: "Senthil Traders",
    gstin: "33AABCS1429B1Z8",
    tier: "Tier 2 — Preferred Wholesale",
    creditLimit: "₹10,00,000 (30-day terms)",
    outstandingBalance: "₹2,14,500",
    memoryBank: [
      { key: "Preferred Freight", value: "TVS Logistics — Direct hub delivery" },
      { key: "Payment History", value: "Average 18 days settlement (historical zero defaults)" },
      { key: "Packaging Mandate", value: "Double corrugated export wrapping for brass SKUs" },
      { key: "Key Decision Maker", value: "Mr. Senthil Kumar (prefers phone authorization for orders > ₹3L)" },
    ],
    timeline: [
      {
        id: "t_01",
        timestamp: "2026-10-05 09:14:22",
        actor: "MACHINE",
        actorName: "SYNEX Core",
        type: "APPROVAL_GATED",
        voice: "mono",
        content: "Rule Trigger: approvals.discount.gt(8%) → Discount 12% held for sales_manager.",
        delta: "Hold",
      },
      {
        id: "t_02",
        timestamp: "2026-10-05 09:10:05",
        actor: "MACHINE",
        actorName: "SYNEX Core",
        type: "STOCK_RESERVED",
        voice: "mono",
        content: "Stock reserved: 400 units of SKU BRASS-6MM-400 at Central Hub.",
        delta: "400 SKUs",
      },
      {
        id: "t_03",
        timestamp: "2026-10-02 16:30:00",
        actor: "HUMAN",
        actorName: "Priya (Ops Lead)",
        type: "HUMAN_NOTE",
        voice: "serif",
        content: "Buyer called confirming Q4 volume commitment of 2,000 units across brass lines.",
      },
      {
        id: "t_04",
        timestamp: "2026-09-28 11:20:14",
        actor: "MACHINE",
        actorName: "SYNEX Ledger",
        type: "PAYMENT_RECEIVED",
        voice: "mono",
        content: "RTGS transfer settled for Invoice #INV-8120.",
        delta: "+₹3,40,000",
      },
    ],
    openItems: [
      {
        id: "oi_1",
        title: "Quotation QT-4471 Authorization",
        risk: "HIGH",
        summary: "12% discount requested on 400 units BRASS-6MM-400.",
      },
      {
        id: "oi_2",
        title: "GST Reconciliation Pending",
        risk: "MEDIUM",
        summary: "Quarterly e-way bill match discrepancy on dispatch #DP-991.",
      },
    ],
    nextBestAction: {
      title: "Authorize Quotation QT-4471",
      recommendation: "Approve 12% discount. Buyer credit score 98/100 and Q4 commitment covers margin concession.",
      actionLabel: "Go to Approval Gate",
    },
  },
  "kavin-exports": {
    id: "kavin-exports",
    name: "Kavin Exports",
    gstin: "33AAECK5521C1Z4",
    tier: "Tier 1 — Enterprise",
    creditLimit: "₹25,00,000 (45-day terms)",
    outstandingBalance: "₹6,80,000",
    memoryBank: [
      { key: "Container Port", value: "Tuticorin Port Container Terminal (VOCP)" },
      { key: "Inspection Requirement", value: "Pre-shipment mill certificate mandatory" },
    ],
    timeline: [
      {
        id: "ke_01",
        timestamp: "2026-10-05 08:30:10",
        actor: "MACHINE",
        actorName: "SYNEX Core",
        type: "QUOTE_ISSUED",
        voice: "mono",
        content: "Quotation issued for 1,200 units standard fasteners under agreed matrix.",
        delta: "₹1,45,000",
      },
    ],
    openItems: [],
    nextBestAction: {
      title: "Quarterly Volume Review",
      recommendation: "Target 15% increase in stainless hardware lines for Q1.",
      actionLabel: "Schedule Briefing",
    },
  },
  "murugan-textiles": {
    id: "murugan-textiles",
    name: "Murugan Textiles",
    gstin: "33AABPM8820M1Z2",
    tier: "Tier 2 — Preferred Wholesale",
    creditLimit: "₹5,00,000 (15-day terms)",
    outstandingBalance: "₹42,000",
    memoryBank: [{ key: "Direct Route", value: "Erode warehouse drop" }],
    timeline: [
      {
        id: "mt_01",
        timestamp: "2026-10-04 18:45:00",
        actor: "MACHINE",
        actorName: "SYNEX Core",
        type: "STOCK_RESERVED",
        voice: "mono",
        content: "Hold placed on 20 bales cotton yarn Grade A.",
        delta: "20 Bales",
      },
    ],
    openItems: [],
    nextBestAction: {
      title: "Invoice Dispatch",
      recommendation: "Awaiting transport waybill generation.",
      actionLabel: "Verify Dispatch",
    },
  },
  "cst_001": {
    id: "cst_001",
    name: "Chennai Brassworks",
    gstin: "33AABCC9901A1Z9",
    tier: "Tier 2 — Preferred Wholesale",
    creditLimit: "₹12,00,000",
    outstandingBalance: "₹3,10,000",
    memoryBank: [{ key: "Quality Spec", value: "IS 319 Grade 1 certified rods" }],
    timeline: [],
    openItems: [],
    nextBestAction: {
      title: "Follow-up Call",
      recommendation: "Confirm delivery slot for Wednesday morning.",
      actionLabel: "Log Follow-up",
    },
  },
  "cst_002": {
    id: "cst_002",
    name: "Madurai Fabrics",
    gstin: "33AABCM1102B1Z7",
    tier: "Tier 3 — Standard",
    creditLimit: "₹2,00,000 (Advance only)",
    outstandingBalance: "₹0",
    memoryBank: [{ key: "Terms", value: "100% advance RTGS before cutting" }],
    timeline: [],
    openItems: [],
    nextBestAction: {
      title: "Account Activation",
      recommendation: "Collect verified GST certificate copy.",
      actionLabel: "Request KYC",
    },
  },
};

export interface RuleItem {
  id: string;
  name: string;
  scope: string;
  condition: string;
  effect: string;
  riskTier: "HIGH" | "MEDIUM" | "LOW";
  authorizedRole: string;
  lastChanged: string;
  currentValue: number;
  unit: string;
  min: number;
  max: number;
}

export const BUSINESS_RULES: RuleItem[] = [
  {
    id: "rule_discount_t2",
    name: "Tier 2 Max Auto-Discount",
    scope: "commercial.pricing.tier2",
    condition: "requested_discount > threshold",
    effect: "gate_for_human_approval(role:sales_manager)",
    riskTier: "HIGH",
    authorizedRole: "Commercial Director, Ops Lead",
    lastChanged: "Priya (Ops Lead) · 2026-09-15",
    currentValue: 8,
    unit: "%",
    min: 0,
    max: 25,
  },
  {
    id: "rule_credit_limit_check",
    name: "Credit Exposure Hard Ceiling",
    scope: "finance.credit.exposure",
    condition: "current_balance + order_value > credit_limit",
    effect: "block_order_drafting_and_alert_finance()",
    riskTier: "HIGH",
    authorizedRole: "Chief Financial Officer",
    lastChanged: "R. Narayanan (CFO) · 2026-08-01",
    currentValue: 100,
    unit: "%",
    min: 80,
    max: 120,
  },
  {
    id: "rule_stock_buffer",
    name: "Emergency Inventory Reserve",
    scope: "inventory.reservation.buffer",
    condition: "available_stock - order_qty < reserve_units",
    effect: "gate_for_human_approval(role:inventory_head)",
    riskTier: "MEDIUM",
    authorizedRole: "Inventory Head",
    lastChanged: "K. Mohan · 2026-09-20",
    currentValue: 50,
    unit: "units",
    min: 10,
    max: 200,
  },
];

export interface RuleSimulationResult {
  ruleId: string;
  testedValue: number;
  affectedCount: number;
  autoApprovedCount: number;
  heldCount: number;
  revenueImpact: string;
  summaryText: string;
}

// Pure deterministic function over past 100 decisions
export function simulateRuleImpact(ruleId: string, newValue: number): RuleSimulationResult {
  if (ruleId === "rule_discount_t2") {
    // Baseline is 8%.
    const delta = newValue - 8;
    const affectedCount = Math.min(100, Math.max(0, 14 + delta * 3));
    const autoApprovedCount = Math.min(100, Math.max(0, 9 + delta * 2));
    const heldCount = Math.max(0, affectedCount - autoApprovedCount);
    const revenueImpact = delta >= 0 ? `+₹${(delta * 42000).toLocaleString("en-IN")}` : `-₹${(Math.abs(delta) * 38000).toLocaleString("en-IN")}`;

    return {
      ruleId,
      testedValue: newValue,
      affectedCount,
      autoApprovedCount,
      heldCount,
      revenueImpact,
      summaryText: `This change would have affected ${affectedCount} of the last 100 decisions. ${autoApprovedCount} would have auto-approved instead of waiting.`,
    };
  }

  return {
    ruleId,
    testedValue: newValue,
    affectedCount: 8,
    autoApprovedCount: 5,
    heldCount: 3,
    revenueImpact: "₹0",
    summaryText: `This change would have affected 8 of the last 100 decisions. 5 would have auto-approved instead of waiting.`,
  };
}

export interface HandoffPayload {
  escalationId: string;
  timestamp: string;
  customerName: string;
  domain: string;
  triggerRule: string;
  confidenceScore: string;
  transcript: Array<{ sender: "CUSTOMER" | "AI"; time: string; text: string; confidence?: string }>;
  whatAiTried: string[];
  whatAiRecommends: string;
  whatAiIsUnsureAbout: string;
}

export const MOCK_HANDOFF: HandoffPayload = {
  escalationId: "ESC-2026-994",
  timestamp: "2026-10-05 09:14:22 IST",
  customerName: "Senthil Traders",
  domain: "senthil-traders.in",
  triggerRule: "tiers.tier2.discount_max = 8%",
  confidenceScore: "74.8% (Borderline Gate Threshold)",
  transcript: [
    {
      sender: "CUSTOMER",
      time: "09:13:40",
      text: "We need 400 units of the 6mm brass fitting by next Thursday. What is your best bulk discount for an existing Tier 2 partner?",
    },
    {
      sender: "AI",
      time: "09:13:46",
      text: "Checking stock allocations across central warehouses for SKU: BRASS-6MM-400. Stock is available. Analyzing commercial terms for Senthil Traders.",
      confidence: "99.1%",
    },
    {
      sender: "CUSTOMER",
      time: "09:14:02",
      text: "Can we do 12% off list price? We have a repeat volume order scheduled for next month as well.",
    },
    {
      sender: "AI",
      time: "09:14:22",
      text: "I have calculated the quotation at ₹2,49,920 reflecting 12% discount (List value before discount: ₹2,84,000). However, as this exceeds the 8% automatic approval threshold for Tier 2 wholesale, I have routed this request to our operations lead for immediate verification.",
      confidence: "74.8%",
    },
  ],
  whatAiTried: [
    "Verified available inventory: 540 units in stock at Central Warehouse (exceeds 400 requirement).",
    "Checked buyer credit ledger: Outstanding balance ₹2,14,500 within ₹10,00,000 facility.",
    "Drafted provisional quotation QT-4471 with line item pricing @ ₹710/unit.",
    "Assessed gross margin: 12% discount yields 22.4% gross margin (exceeds 18% absolute floor).",
  ],
  whatAiRecommends:
    "Authorize the 12% discount for Senthil Traders. Historical settlement average is 18 days, repeat buyer volume is high, and 22.4% margin satisfies commercial policy.",
  whatAiIsUnsureAbout:
    "Whether the repeat volume promise for next month (additional 2,000 units) has been backed by a formal purchase intent or remains an informal verbal request.",
};
