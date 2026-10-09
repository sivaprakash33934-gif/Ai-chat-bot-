export type Role = "ops_lead" | "owner" | "viewer";

export interface TraceStep {
  step: string;
  status: "completed" | "gate_triggered" | "verified";
  timestamp: string;
  detail: string;
  metadata?: Record<string, string | number>;
}

export interface Lead {
  id: string;
  buyerName: string;
  company: string;
  gstin: string;
  intent: string;
  value: number;
  confidence: number;
  status: "pending_qualification" | "high_value" | "flagged" | "qualified";
  channel: "Website Chat" | "API Webhook" | "Web Form";
  timestamp: string;
  traceSteps: TraceStep[];
}

export interface ApprovalGate {
  id: string;
  recordId: string;
  buyerName: string;
  company: string;
  gstin: string;
  item: string;
  quantity: number;
  standardPrice: number;
  requestedPrice: number;
  discountPct: number;
  ruleCitation: string;
  floorMarginPct: number;
  status: "pending" | "approved" | "held";
  urgency: "high" | "medium" | "low";
  timestamp: string;
  decidedAt?: string;
  decidedBy?: string;
  notes?: string;
}

export interface HandoffTranscriptTurn {
  sender: "buyer" | "synex" | "agent";
  text: string;
  timestamp: string;
}

export interface Handoff {
  id: string;
  buyerName: string;
  company: string;
  gstin: string;
  issue: string;
  confidenceScore: number;
  whatTried: string[];
  whyFailed: string;
  status: "pending" | "claimed" | "resolved";
  claimedBy?: string;
  timestamp: string;
  source?: "widget" | "api" | "form";
  transcript: HandoffTranscriptTurn[];
}

export interface WidgetConversation {
  id: string;
  tenant: string;
  customer: string;
  messages: number;
  handoffs: boolean;
  actions: boolean;
  timestamp: string;
  channel: string;
  summary: string;
}

export interface CustomerMemoryBank {
  preferences: string[];
  constraints: string[];
  paymentTerms: string;
}

export interface CustomerTimelineEvent {
  id: string;
  type: "quote" | "approval" | "handoff" | "note";
  title: string;
  timestamp: string;
  detail: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  gstin: string;
  tier: "Tier 1" | "Tier 2" | "Enterprise";
  totalGmv: number;
  lastActive: string;
  status: "active" | "dormant" | "high_touch";
  memoryBank: CustomerMemoryBank;
  timeline: CustomerTimelineEvent[];
}

export interface KnowledgeSource {
  id: string;
  title: string;
  category: "Pricing" | "Compliance" | "Inventory" | "SLA";
  authority: "PRIMARY" | "SECONDARY";
  approvedBy: string;
  lastIndexed: string;
  lastVerified: string;
  version: string;
  status: "fresh" | "stale" | "conflict";
  summary: string;
  chunks: number;
}

export interface KnowledgeGap {
  id: string;
  query: string;
  frequency: number;
  lastAsked: string;
  suggestedAnswer: string;
}

export interface KnowledgeConflict {
  id: string;
  topic: string;
  sourceA: { name: string; claim: string; authority: "PRIMARY" | "SECONDARY" };
  sourceB: { name: string; claim: string; authority: "PRIMARY" | "SECONDARY" };
  status: "unresolved" | "resolved";
  chosenSource?: "sourceA" | "sourceB";
}

export interface Rule {
  id: string;
  name: string;
  scope: string;
  risk: "low" | "medium" | "high" | "restricted";
  thresholdValue: number;
  unit: string;
  marginFloor: number;
  status: "live" | "draft";
  lastModified: string;
  modifiedBy: string;
}

export interface OutcomeLedgerRow {
  id: string;
  category: string;
  volume: number;
  humanHoursSaved: number;
  autonomousGmv: number;
  accuracyPct: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "invited";
  lastLogin: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: Role;
  action: string;
  target: string;
  details: string;
}

/* =========================================================================
   FIXTURE DATA STORE (Single Source of Truth)
   ========================================================================= */

export const INITIAL_LEADS: Lead[] = [
  {
    id: "LD-8941",
    buyerName: "Kavin Rajan",
    company: "Kavin Agro Mills",
    gstin: "33AAAAA0000A1Z5",
    intent: "Bulk procurement of Grade-A Cotton (2,500 bales)",
    value: 12500000,
    confidence: 0.94,
    status: "high_value",
    channel: "Website Chat",
    timestamp: "12 mins ago",
    traceSteps: [
      { step: "Ingest", status: "completed", timestamp: "14:28:10", detail: "Inbound payload verified via Website Chat webhook" },
      { step: "Entity Verification", status: "completed", timestamp: "14:28:11", detail: "GSTIN 33AAAAA0000A1Z5 matched in active customer registry" },
      { step: "Policy Check", status: "gate_triggered", timestamp: "14:28:12", detail: "Volume 2,500 bales breaches autonomous limit (max 1,000)" },
      { step: "Ledger Commitment", status: "verified", timestamp: "14:28:13", detail: "Permission gate PG-2041 instantiated" },
    ],
  },
  {
    id: "LD-8942",
    buyerName: "Murugan Selvam",
    company: "Murugan Spinning Works",
    gstin: "33AABCM1234F1Z8",
    intent: "Price check on Combed Yarn 40s (500 kg)",
    value: 175000,
    confidence: 0.98,
    status: "qualified",
    channel: "Website Chat",
    timestamp: "24 mins ago",
    traceSteps: [
      { step: "Ingest", status: "completed", timestamp: "14:16:04", detail: "Inbound price check parsed" },
      { step: "Knowledge Lookup", status: "completed", timestamp: "14:16:05", detail: "Rate card v24.2: Combed Yarn 40s @ ₹350/kg" },
      { step: "Autonomous Quote", status: "verified", timestamp: "14:16:06", detail: "Quotation QT-9410 dispatched via Website Chat" },
    ],
  },
  {
    id: "LD-8943",
    buyerName: "Anand Sundaram",
    company: "Sundaram Garments Ltd",
    gstin: "33AAECS5678K1ZG",
    intent: "Custom dye lot spec with 45-day deferred credit",
    value: 4800000,
    confidence: 0.72,
    status: "flagged",
    channel: "Web Form",
    timestamp: "41 mins ago",
    traceSteps: [
      { step: "Ingest", status: "completed", timestamp: "13:59:22", detail: "RFQ submitted via Web Portal" },
      { step: "Policy Check", status: "gate_triggered", timestamp: "13:59:23", detail: "Credit term 45 days exceeds max policy (30 days)" },
      { step: "Escalation", status: "verified", timestamp: "13:59:24", detail: "Handoff dossier HF-108 routed to human queue" },
    ],
  },
  {
    id: "LD-8944",
    buyerName: "Praveen Kumar",
    company: "Sri Balaji Weaving Unit",
    gstin: "33AAGCB9876P1Z3",
    intent: "Inquiry on Organic Linen Slub fabric stock availability",
    value: 620000,
    confidence: 0.88,
    status: "pending_qualification",
    channel: "Website Chat",
    timestamp: "1 hr ago",
    traceSteps: [
      { step: "Ingest", status: "completed", timestamp: "13:30:11", detail: "Website chat inquiry parsed via sovereign NLP" },
      { step: "Catalog Match", status: "completed", timestamp: "13:30:13", detail: "SKU LIN-SLB-04 identified; inventory 1,200m available" },
      { step: "Sample Request", status: "verified", timestamp: "13:30:15", detail: "Sample dispatch address collected" },
    ],
  },
  {
    id: "LD-8945",
    buyerName: "Dinesh Karthik",
    company: "Karthik Textiles Coimbatore",
    gstin: "33AAEFK4321D1ZN",
    intent: "Repeat order for 1,000m Raw Silk Sheer",
    value: 890000,
    confidence: 0.99,
    status: "qualified",
    channel: "API Webhook",
    timestamp: "2 hrs ago",
    traceSteps: [
      { step: "Ingest", status: "completed", timestamp: "12:45:00", detail: "B2B ERP integration webhook received" },
      { step: "Contract Check", status: "completed", timestamp: "12:45:01", detail: "Master Sales Agreement MSA-88 active" },
      { step: "Auto Execution", status: "verified", timestamp: "12:45:02", detail: "Proforma invoice generated and committed to ERP" },
    ],
  },
];

export const INITIAL_APPROVALS: ApprovalGate[] = [
  {
    id: "PG-2041",
    recordId: "QT-9021",
    buyerName: "Kavin Rajan",
    company: "Kavin Agro Mills",
    gstin: "33AAAAA0000A1Z5",
    item: "Grade-A Cotton Bales (2,500 bales)",
    quantity: 2500,
    standardPrice: 5000,
    requestedPrice: 4400,
    discountPct: 12.0,
    ruleCitation: "Policy §4.2: Maximum autonomous discount capped at 8.0%. Requested 12.0% requires Ops Lead authorization.",
    floorMarginPct: 28.0,
    status: "pending",
    urgency: "high",
    timestamp: "12 mins ago",
  },
  {
    id: "PG-2042",
    recordId: "QT-9022",
    buyerName: "Vijay Raman",
    company: "Raman Silk Emporium",
    gstin: "33AABCR7890H1ZY",
    item: "Mulberry Silk Filature 20/22D (300 kg)",
    quantity: 300,
    standardPrice: 4200,
    requestedPrice: 3800,
    discountPct: 9.5,
    ruleCitation: "Policy §4.2: Maximum autonomous discount capped at 8.0%. Requested 9.5% requires Ops Lead authorization.",
    floorMarginPct: 28.0,
    status: "pending",
    urgency: "medium",
    timestamp: "35 mins ago",
  },
  {
    id: "PG-2043",
    recordId: "QT-9023",
    buyerName: "Meenakshi Sundar",
    company: "Madurai Handlooms Co-op",
    gstin: "33AAACM3456L1ZQ",
    item: "Zari Border Jacquard Saris (500 units)",
    quantity: 500,
    standardPrice: 2800,
    requestedPrice: 2600,
    discountPct: 7.1,
    ruleCitation: "Policy §6.1: Credit period exemption requested (60 days vs standard 30 days).",
    floorMarginPct: 32.0,
    status: "pending",
    urgency: "low",
    timestamp: "2 hrs ago",
  },
];

export const INITIAL_HANDOFFS: Handoff[] = [
  {
    id: "HF-108",
    buyerName: "Anand Sundaram",
    company: "Sundaram Garments Ltd",
    gstin: "33AAECS5678K1ZG",
    issue: "Buyer insists on 45-day deferred credit term with uncollateralized advance",
    confidenceScore: 0.68,
    whatTried: [
      "Quoted standard 30-day net terms per Credit Policy v3.1",
      "Offered 2% instant cash discount for 15-day settlement",
      "Offered split delivery milestone structure",
    ],
    whyFailed: "Buyer stated: 'We only work on 45-day cycle or we cancel tender.' Autonomous policy cannot exceed 30 days.",
    status: "pending",
    timestamp: "41 mins ago",
    transcript: [
      { sender: "buyer", text: "We need 5,000 meters of the 240 GSM organic twill by next Friday.", timestamp: "13:52:10" },
      { sender: "synex", text: "We have 6,200 meters available at ₹420/meter. Standard credit terms are 30 days net from dispatch.", timestamp: "13:52:15" },
      { sender: "buyer", text: "Our accounts department only processes 45-day credit. Can you approve 45 days?", timestamp: "13:54:02" },
      { sender: "synex", text: "I can offer a 2% early settlement discount for 15 days, or our standard 30-day term. For 45 days, let me connect you with our Operations Lead.", timestamp: "13:54:30" },
      { sender: "buyer", text: "Connect me then. We need this locked before 4 PM.", timestamp: "13:55:12" },
    ],
  },
  {
    id: "HF-109",
    buyerName: "Siddharth Rao",
    company: "Deccan Dyeing House",
    gstin: "33AADRD5555M1Z2",
    issue: "Non-standard chemical compliance certificate requested (OEKO-TEX Class 1)",
    confidenceScore: 0.74,
    whatTried: [
      "Searched product documentation for SKU DYE-NAV-01",
      "Found GOTS certification v6.0 on file",
    ],
    whyFailed: "Buyer specifically requires OEKO-TEX Eco-Passport certificate which is currently missing from Knowledge Base.",
    status: "pending",
    timestamp: "1 hr ago",
    source: "api",
    transcript: [
      { sender: "buyer", text: "Do you have OEKO-TEX Standard 100 Class 1 lab test reports for the navy dye lot?", timestamp: "13:10:04" },
      { sender: "synex", text: "We have GOTS 6.0 certified organic reports on file for batch #882. Would that meet your requirement?", timestamp: "13:10:20" },
      { sender: "buyer", text: "No, our EU brand auditor specifically requires OEKO-TEX Class 1 baby-safe certification.", timestamp: "13:11:45" },
    ],
  },
  {
    id: "HF-110",
    buyerName: "Priya Sundaram",
    company: "Precision Tools Coimbatore",
    gstin: "33AAECP1234J1Z8",
    issue: "Volume quote escalation for 400 units 6mm brass rod from website chat widget",
    confidenceScore: 0.82,
    whatTried: [
      "Quoted Tier 2 volume price ₹245/unit per Price List 2026",
      "Calculated surface freight estimate to Chennai (₹2,800)",
    ],
    whyFailed: "Customer requested expedited Net-30 underwriting and custom pallet dispatch.",
    status: "pending",
    timestamp: "10 mins ago",
    source: "widget",
    transcript: [
      { sender: "buyer", text: "What is the price for 400 units of 6mm brass rod?", timestamp: "10:14:02" },
      { sender: "synex", text: "Unit price is ₹245 (Tier 2 volume pricing, 250–500 units). Subtotal: ₹98,000 + 18% GST.", timestamp: "10:14:05" },
      { sender: "buyer", text: "Can you confirm freight to Chennai and talk to a human for Net-30 credit terms?", timestamp: "10:14:22" },
      { sender: "synex", text: "Connecting with Priya (Senior Operations Lead) now.", timestamp: "10:14:25" },
    ],
  },
];

export const WIDGET_CONVERSATIONS: WidgetConversation[] = [
  {
    id: "WIDGET-001",
    tenant: "senthil-traders",
    customer: "Precision Tools Coimbatore",
    messages: 6,
    handoffs: true,
    actions: false,
    timestamp: "10 mins ago",
    channel: "Website Chat",
    summary: "Tier 2 volume pricing for 400 units 6mm brass rod. Escalated to Ops Lead.",
  },
  {
    id: "WIDGET-002",
    tenant: "senthil-traders",
    customer: "Murugan Auto Components",
    messages: 4,
    handoffs: false,
    actions: true,
    timestamp: "25 mins ago",
    channel: "Website Chat",
    summary: "Stock inquiry for 1,420 units. Verified lead generated for sales team.",
  },
  {
    id: "WIDGET-003",
    tenant: "senthil-traders",
    customer: "Apex Machine Works",
    messages: 3,
    handoffs: false,
    actions: false,
    timestamp: "45 mins ago",
    channel: "Website Chat",
    summary: "Order tracking for #PO-88219. Verified in-transit delivery scheduled today.",
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Kavin Rajan",
    company: "Kavin Agro Mills",
    gstin: "33AAAAA0000A1Z5",
    tier: "Enterprise",
    totalGmv: 48500000,
    lastActive: "12 mins ago",
    status: "high_touch",
    memoryBank: {
      preferences: [
        "Prefers bulk dispatch via Southern Express Freight",
        "Palletized delivery with moisture-proof wrapping",
        "Direct contact via phone primary, email for invoices",
      ],
      constraints: [
        "Strict warehouse unloading cutoff at 16:30 IST",
        "Mandatory mill test certificates with every lorry load",
      ],
      paymentTerms: "30 days net with 5% advance token",
    },
    timeline: [
      { id: "EV-01", type: "approval", title: "Permission Gate Triggered", timestamp: "14:28 IST", detail: "Requested 12% discount on 2,500 bales (PG-2041)" },
      { id: "EV-02", type: "quote", title: "Quotation Generated", timestamp: "10-06 11:30", detail: "Quotation QT-8890 for 1,000 bales @ ₹4,900" },
      { id: "EV-03", type: "note", title: "Credit Assessment", timestamp: "09-28 16:00", detail: "Ops Lead validated GST compliance & annual turnover > ₹15 Cr" },
    ],
  },
  {
    id: "CUST-002",
    name: "Murugan Selvam",
    company: "Murugan Spinning Works",
    gstin: "33AABCM1234F1Z8",
    tier: "Tier 1",
    totalGmv: 14200000,
    lastActive: "24 mins ago",
    status: "active",
    memoryBank: {
      preferences: ["Standard carton packaging (50kg spools)", "Payment via RTGS same-day"],
      constraints: ["No partial deliveries accepted"],
      paymentTerms: "15 days net",
    },
    timeline: [
      { id: "EV-04", type: "quote", title: "Autonomous Quote Delivered", timestamp: "14:16 IST", detail: "Quotation QT-9410 dispatched via Website Chat (500 kg Combed Yarn)" },
      { id: "EV-05", type: "quote", title: "Invoice Settled", timestamp: "10-02 10:15", detail: "Payment received for INV-9102 (₹2,40,000)" },
    ],
  },
  {
    id: "CUST-003",
    name: "Anand Sundaram",
    company: "Sundaram Garments Ltd",
    gstin: "33AAECS5678K1ZG",
    tier: "Enterprise",
    totalGmv: 62000000,
    lastActive: "41 mins ago",
    status: "high_touch",
    memoryBank: {
      preferences: ["Custom woven labels with barcode", "Inspection report signed by QA lead"],
      constraints: ["Strict 45-day billing cycle alignment"],
      paymentTerms: "45 days credit request under dispute",
    },
    timeline: [
      { id: "EV-06", type: "handoff", title: "Escalated to Ops Lead", timestamp: "13:59 IST", detail: "Handoff HF-108: Credit term disagreement" },
      { id: "EV-07", type: "quote", title: "Custom Dye Order Delivered", timestamp: "09-15 14:00", detail: "Delivered 10,000m Twill with zero defect rate" },
    ],
  },
];

export const INITIAL_KNOWLEDGE_SOURCES: KnowledgeSource[] = [
  {
    id: "KS-101",
    title: "Master Price List Q4 FY26 (Cotton & Yarns)",
    category: "Pricing",
    authority: "PRIMARY",
    approvedBy: "Finance Controller",
    lastIndexed: "Today, 08:30 IST",
    lastVerified: "Today, 09:00 IST",
    version: "v24.2",
    status: "fresh",
    summary: "Base rates, slab pricing, volume tiers, and freight allowances for South India distribution.",
    chunks: 48,
  },
  {
    id: "KS-102",
    title: "Credit Terms & Cash Discount Policy v3.1",
    category: "Compliance",
    authority: "PRIMARY",
    approvedBy: "VP Commercial",
    lastIndexed: "3 days ago",
    lastVerified: "3 days ago",
    version: "v3.1",
    status: "fresh",
    summary: "Standard 30-day term rules, 2% 15-day settlement incentives, and customer credit scoring criteria.",
    chunks: 24,
  },
  {
    id: "KS-103",
    title: "Warehouse Inventory Stock Feed (Tirupur Hub)",
    category: "Inventory",
    authority: "SECONDARY",
    approvedBy: "Logistics Lead",
    lastIndexed: "14 hours ago",
    lastVerified: "14 hours ago",
    version: "v12.0",
    status: "stale",
    summary: "Real-time stock ledger for Combed Yarn, Slub fabric, and Organic Twill.",
    chunks: 112,
  },
  {
    id: "KS-104",
    title: "Export Packing & Fumigation Guidelines",
    category: "Compliance",
    authority: "SECONDARY",
    approvedBy: "Quality Assurance",
    lastIndexed: "5 days ago",
    lastVerified: "5 days ago",
    version: "v1.4",
    status: "conflict",
    summary: "Conflicts with recent EU import packaging directive EU-2026/89.",
    chunks: 36,
  },
];

export const INITIAL_KNOWLEDGE_GAPS: KnowledgeGap[] = [
  {
    id: "KG-01",
    query: "Do you supply OEKO-TEX Standard 100 Class 1 certified organic dyes?",
    frequency: 18,
    lastAsked: "1 hr ago",
    suggestedAnswer: "Yes, our Tirupur dyeing partner holds OEKO-TEX Class 1 certificate #TP-8842 valid through Dec 2026.",
  },
  {
    id: "KG-02",
    query: "Can you offer deferred GST credit billing under SEZ zero-rated supply?",
    frequency: 11,
    lastAsked: "Yesterday",
    suggestedAnswer: "SEZ sales qualify for zero-rated supply against LUT submission with Form GST RFD-01 endorsement.",
  },
];

export const INITIAL_KNOWLEDGE_CONFLICTS: KnowledgeConflict[] = [
  {
    id: "KC-01",
    topic: "Maximum Credit Days for Tier-1 Co-ops",
    sourceA: {
      name: "Credit Policy v3.1 (§4.3)",
      claim: "Co-operatives qualify for standard 30-day terms with zero exceptions without board approval.",
      authority: "PRIMARY",
    },
    sourceB: {
      name: "Regional Sales Addendum TN-2026",
      claim: "Tamil Nadu Weavers Co-ops permitted 45-day billing against state government guarantee letters.",
      authority: "SECONDARY",
    },
    status: "unresolved",
  },
];

export const INITIAL_RULES: Rule[] = [
  {
    id: "RL-01",
    name: "Autonomous Maximum Discount Limit",
    scope: "Quotation Generation",
    risk: "high",
    thresholdValue: 8.0,
    unit: "%",
    marginFloor: 28.0,
    status: "live",
    lastModified: "04-10-2026 11:20",
    modifiedBy: "Senthil (Ops Lead)",
  },
  {
    id: "RL-02",
    name: "Autonomous Contract Volume Cap",
    scope: "Contract Commitment",
    risk: "high",
    thresholdValue: 1000,
    unit: "bales",
    marginFloor: 28.0,
    status: "live",
    lastModified: "02-10-2026 14:00",
    modifiedBy: "Senthil (Ops Lead)",
  },
  {
    id: "RL-03",
    name: "Maximum Autonomous Credit Period",
    scope: "Payment Policy",
    risk: "restricted",
    thresholdValue: 30,
    unit: "days",
    marginFloor: 28.0,
    status: "live",
    lastModified: "28-09-2026 10:15",
    modifiedBy: "Karthik (Owner)",
  },
  {
    id: "RL-04",
    name: "AI Confidence Autonomous Execution Floor",
    scope: "Model Guardrail",
    risk: "medium",
    thresholdValue: 85,
    unit: "%",
    marginFloor: 28.0,
    status: "live",
    lastModified: "01-10-2026 09:30",
    modifiedBy: "Senthil (Ops Lead)",
  },
  {
    id: "RL-05",
    name: "Automatic Sample Dispatch Approval",
    scope: "Samples & Dispatch",
    risk: "low",
    thresholdValue: 5000,
    unit: "₹",
    marginFloor: 28.0,
    status: "live",
    lastModified: "25-09-2026 16:45",
    modifiedBy: "Senthil (Ops Lead)",
  },
];

export const INITIAL_OUTCOME_LEDGER: OutcomeLedgerRow[] = [
  {
    id: "LED-01",
    category: "Autonomous Quote Generation",
    volume: 1420,
    humanHoursSaved: 118,
    autonomousGmv: 42800000,
    accuracyPct: 99.4,
  },
  {
    id: "LED-02",
    category: "GST & Entity Validation",
    volume: 2180,
    humanHoursSaved: 91,
    autonomousGmv: 0,
    accuracyPct: 100.0,
  },
  {
    id: "LED-03",
    category: "Inventory & Dispatch Commitments",
    volume: 840,
    humanHoursSaved: 68,
    autonomousGmv: 29400000,
    accuracyPct: 98.9,
  },
  {
    id: "LED-04",
    category: "Policy Gate Handoffs Managed",
    volume: 194,
    humanHoursSaved: 42,
    autonomousGmv: 18200000,
    accuracyPct: 97.8,
  },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "USR-01",
    name: "Senthil Kumar",
    email: "senthil@senthiltraders.com",
    role: "ops_lead",
    status: "active",
    lastLogin: "Active now",
  },
  {
    id: "USR-02",
    name: "Karthik Subramanian",
    email: "karthik@senthiltraders.com",
    role: "owner",
    status: "active",
    lastLogin: "2 hrs ago",
  },
  {
    id: "USR-03",
    name: "Divya Ramesh",
    email: "divya@auditpartners.in",
    role: "viewer",
    status: "active",
    lastLogin: "Yesterday",
  },
];

export const INITIAL_AUDIT_LOG: AuditEntry[] = [
  {
    id: "AUD-9912",
    timestamp: "14:28:13 IST",
    actor: "SYNEX Policy Engine",
    role: "ops_lead",
    action: "GATE_INSTANTIATED",
    target: "PG-2041",
    details: "Discount 12.0% requested on QT-9021; exceeded autonomous cap 8.0%.",
  },
  {
    id: "AUD-9911",
    timestamp: "14:16:06 IST",
    actor: "SYNEX Ingest Agent",
    role: "ops_lead",
    action: "QUOTE_DISPATCHED",
    target: "QT-9410",
    details: "Autonomous quotation delivered to Murugan Spinning Works via Website Chat.",
  },
  {
    id: "AUD-9910",
    timestamp: "13:59:24 IST",
    actor: "SYNEX Routing Agent",
    role: "ops_lead",
    action: "HANDOFF_ESCALATED",
    target: "HF-108",
    details: "Credit term conflict (45 days) escalated to Ops Lead queue.",
  },
  {
    id: "AUD-9909",
    timestamp: "11:20:00 IST",
    actor: "Senthil Kumar",
    role: "ops_lead",
    action: "RULE_UPDATED",
    target: "RL-01",
    details: "Autonomous max discount adjusted from 7.5% to 8.0%.",
  },
  {
    id: "AUD-9908",
    timestamp: "09:00:15 IST",
    actor: "System Sync",
    role: "owner",
    action: "PRICE_CARD_RELOADED",
    target: "KS-101",
    details: "Master Price List Q4 FY26 verified by Finance Controller.",
  },
];

/* =========================================================================
   CONVERSATIONS DIRECTORY (B1)
   ========================================================================= */
export interface ConversationMessage {
  sender: "customer" | "ai" | "agent";
  text: string;
  timestamp: string;
  citations?: string[];
  actionTaken?: string;
}

export interface ConversationRecord {
  id: string;
  customerName: string;
  company: string;
  gstin?: string;
  channel: "Website Chat" | "API Webhook" | "Web Form";
  status: "autonomous" | "handoff_pending" | "handoff_claimed" | "resolved";
  messageCount: number;
  timestamp: string;
  summary: string;
  citationsCount: number;
  actionsCount: number;
  transcript: ConversationMessage[];
}

export const CONVERSATIONS_DIRECTORY: ConversationRecord[] = [
  {
    id: "CNV-4011",
    customerName: "Priya Sundaram",
    company: "Precision Tools Coimbatore",
    gstin: "33AAECP1234J1Z8",
    channel: "Website Chat",
    status: "handoff_pending",
    messageCount: 6,
    timestamp: "10 mins ago",
    summary: "Tier 2 volume pricing for 400 units 6mm brass rod. Escalated for Net-30 credit approval.",
    citationsCount: 2,
    actionsCount: 1,
    transcript: [
      { sender: "customer", text: "Hello, we need 400 units of 6mm brass rod delivered to Coimbatore next Tuesday.", timestamp: "10:13:02" },
      { sender: "ai", text: "Welcome back, Precision Tools. Unit price is ₹245 (Tier 2 volume pricing, 250–500 units per Price List 2026). Subtotal: ₹98,000 + 18% GST.", timestamp: "10:13:08", citations: ["PRICE-LIST-2026.pdf · Tier 2 Volume"] },
      { sender: "customer", text: "Can you confirm freight to Chennai and talk to a human for Net-30 credit terms?", timestamp: "10:14:22" },
      { sender: "ai", text: "Surface freight estimate to Coimbatore is ₹2,800. Net-30 credit terms exceed autonomous limit (standard Net-15). Transferring this session to Priya (Operations Lead).", timestamp: "10:14:25", citations: ["FREIGHT-RATES-Q4.pdf · Zone South"], actionTaken: "Handoff dossier #HF-110 instantiated" },
    ],
  },
  {
    id: "CNV-4012",
    customerName: "Murugan Selvam",
    company: "Murugan Spinning Works",
    gstin: "33AABCM1234F1Z8",
    channel: "Website Chat",
    status: "resolved",
    messageCount: 4,
    timestamp: "24 mins ago",
    summary: "Price check on Combed Yarn 40s (500 kg). Autonomous quote QT-9410 dispatched.",
    citationsCount: 1,
    actionsCount: 1,
    transcript: [
      { sender: "customer", text: "Current rate for Combed Yarn 40s, 500 kg dispatch?", timestamp: "14:15:58" },
      { sender: "ai", text: "Rate card v24.2 indicates Combed Yarn 40s @ ₹350/kg. Total quotation: ₹1,75,000 + GST. Inventory in stock: 1,280 kg at Tirupur Depot.", timestamp: "14:16:04", citations: ["RATE-CARD-YARN-V24.pdf"] },
      { sender: "customer", text: "Please generate formal quotation PDF.", timestamp: "14:16:05" },
      { sender: "ai", text: "Quotation QT-9410 generated and delivered to your portal.", timestamp: "14:16:06", actionTaken: "Quotation QT-9410 dispatched" },
    ],
  },
  {
    id: "CNV-4013",
    customerName: "Apex Logistics Desk",
    company: "Apex Machine Works",
    gstin: "33AADCA9918M1ZF",
    channel: "Website Chat",
    status: "autonomous",
    messageCount: 3,
    timestamp: "45 mins ago",
    summary: "Order tracking for #PO-88219. Verified in-transit delivery scheduled today.",
    citationsCount: 1,
    actionsCount: 1,
    transcript: [
      { sender: "customer", text: "Tracking status for order PO-88219?", timestamp: "13:35:10" },
      { sender: "ai", text: "Order PO-88219 shipped via Southern Express Freight (LR #991028). In transit, estimated delivery today before 17:00 IST.", timestamp: "13:35:12", citations: ["DISPATCH-LOG-TODAY.db"], actionTaken: "Warehouse order lookup #PO-88219" },
      { sender: "customer", text: "Got it, thank you.", timestamp: "13:35:40" },
      { sender: "ai", text: "Glad to assist. Let us know if you need unloading assistance.", timestamp: "13:35:42" },
    ],
  },
  {
    id: "CNV-4014",
    customerName: "Kavin Rajan",
    company: "Kavin Agro Mills",
    gstin: "33AAAAA0000A1Z5",
    channel: "API Webhook",
    status: "handoff_claimed",
    messageCount: 5,
    timestamp: "1 hr ago",
    summary: "Bulk procurement of Grade-A Cotton (2,500 bales). Claimed by Senthil.",
    citationsCount: 1,
    actionsCount: 1,
    transcript: [
      { sender: "customer", text: "Placing inquiry for 2,500 bales Grade-A Cotton with 12% bulk rebate.", timestamp: "14:27:50" },
      { sender: "ai", text: "Volume of 2,500 bales exceeds autonomous limit (max 1,000 bales). Permission Gate PG-2041 triggered.", timestamp: "14:28:12", citations: ["POLICY-VOLUME-CAP.md"], actionTaken: "Permission gate PG-2041 instantiated" },
      { sender: "agent", text: "Hello Kavin, Senthil here. I have taken over your request and am reviewing the rebate with our mills.", timestamp: "14:32:00" },
    ],
  },
  {
    id: "CNV-4015",
    customerName: "Anand Sundaram",
    company: "Sundaram Garments Ltd",
    gstin: "33AAECS5678K1ZG",
    channel: "Web Form",
    status: "handoff_pending",
    messageCount: 3,
    timestamp: "2 hrs ago",
    summary: "Custom dye lot spec with 45-day deferred credit. Escalated to ops queue.",
    citationsCount: 1,
    actionsCount: 1,
    transcript: [
      { sender: "customer", text: "Inquiry for 1,200m custom navy dye lot. We require 45-day credit terms.", timestamp: "13:58:10" },
      { sender: "ai", text: "Credit terms of 45 days exceed company policy ceiling (30 days max). Handoff dossier HF-108 prepared for ops review.", timestamp: "13:59:24", citations: ["CREDIT-POLICY-V3.pdf"], actionTaken: "Handoff dossier HF-108 routed" },
    ],
  },
  {
    id: "CNV-4016",
    customerName: "Praveen Kumar",
    company: "Sri Balaji Weaving Unit",
    gstin: "33AAGCB9876P1Z3",
    channel: "Website Chat",
    status: "resolved",
    messageCount: 4,
    timestamp: "3 hrs ago",
    summary: "Organic Linen Slub fabric stock check and sample swatch dispatch request.",
    citationsCount: 2,
    actionsCount: 2,
    transcript: [
      { sender: "customer", text: "Is Organic Linen Slub SKU LIN-SLB-04 in stock?", timestamp: "13:29:40" },
      { sender: "ai", text: "Yes, 1,200m in stock at Coimbatore central warehouse @ ₹510/m.", timestamp: "13:30:13", citations: ["FABRIC-CATALOG-2026.pdf"] },
      { sender: "customer", text: "Can you send a sample swatch to our mill address?", timestamp: "13:30:14" },
      { sender: "ai", text: "Sample swatch dispatch approved under Rule RL-05 (Automatic Sample Dispatch < ₹5,000). Courier tracking will follow via email.", timestamp: "13:30:15", citations: ["SAMPLE-POLICY-V1.pdf"], actionTaken: "Sample dispatch #SMP-9102 authorized" },
    ],
  },
];

/* =========================================================================
   ACTIONS & TOOLS (B2)
   ========================================================================= */
export interface ToolParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  risk: "low" | "medium" | "high" | "restricted";
  gatePolicy: "autonomous" | "permission_gated" | "prohibited";
  parameters: ToolParameter[];
  schemaVersion: string;
  rateLimit: string;
}

export interface ToolExecution {
  id: string;
  toolSlug: string;
  toolName: string;
  actor: "AI Agent" | "Priya (Ops Lead)" | "Senthil (Ops Lead)" | "System Sync";
  status: "succeeded" | "failed" | "executing" | "unknown";
  timestamp: string;
  durationMs: number;
  parameters: Record<string, string | number | boolean>;
  resultHash: string;
  errorMessage?: string;
  retryCount?: number;
}

export const INITIAL_TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: "TL-001",
    name: "CRM Create Lead",
    slug: "crm_create_lead",
    description: "Registers verified prospect inquiry into CRM database with GSTIN verification and intent score.",
    risk: "low",
    gatePolicy: "autonomous",
    parameters: [
      { name: "company", type: "string", required: true, description: "Customer enterprise legal entity name" },
      { name: "gstin", type: "string", required: true, description: "15-digit GSTIN tax identifier" },
      { name: "intent", type: "string", required: true, description: "Procurement requirement summary" },
      { name: "estimatedValue", type: "number", required: false, description: "Estimated transaction INR value" },
    ],
    schemaVersion: "v1.2.0",
    rateLimit: "120 req/min",
  },
  {
    id: "TL-002",
    name: "Support Ticket Escalation",
    slug: "support_ticket",
    description: "Serializes unresolvable inquiry context into a human handoff dossier for operations team.",
    risk: "low",
    gatePolicy: "autonomous",
    parameters: [
      { name: "issue", type: "string", required: true, description: "Summary of unresolvable commercial request" },
      { name: "urgency", type: "string", required: true, description: "high | medium | low" },
      { name: "transcriptId", type: "string", required: true, description: "Session transcript identifier" },
    ],
    schemaVersion: "v1.0.4",
    rateLimit: "60 req/min",
  },
  {
    id: "TL-003",
    name: "Generate Quotation",
    slug: "generate_quotation",
    description: "Computes unit pricing, applies margin boundaries, and generates cryptographically signed PDF quotation.",
    risk: "high",
    gatePolicy: "permission_gated",
    parameters: [
      { name: "sku", type: "string", required: true, description: "Standard catalog product SKU code" },
      { name: "quantity", type: "number", required: true, description: "Requested order units" },
      { name: "discountPct", type: "number", required: false, description: "Requested discount (max 8.0% autonomous)" },
      { name: "paymentTerms", type: "string", required: false, description: "Payment credit terms requested" },
    ],
    schemaVersion: "v2.1.0",
    rateLimit: "30 req/min",
  },
  {
    id: "TL-004",
    name: "Warehouse Order Lookup",
    slug: "warehouse_order_lookup",
    description: "Queries real-time ERP physical inventory, depot allocations, and active dispatch tracking numbers.",
    risk: "low",
    gatePolicy: "autonomous",
    parameters: [
      { name: "orderId", type: "string", required: false, description: "PO or Sales Order reference" },
      { name: "sku", type: "string", required: false, description: "Product SKU to query stock availability" },
    ],
    schemaVersion: "v1.4.1",
    rateLimit: "200 req/min",
  },
  {
    id: "TL-005",
    name: "ERP Webhook Dispatch",
    slug: "erp_webhook",
    description: "Dispatches authenticated JSON mutation payload to enterprise SAP/Dynamics ERP with HMAC signing.",
    risk: "medium",
    gatePolicy: "permission_gated",
    parameters: [
      { name: "endpoint", type: "string", required: true, description: "Registered webhook identifier" },
      { name: "payload", type: "string", required: true, description: "JSON payload string" },
    ],
    schemaVersion: "v1.1.0",
    rateLimit: "45 req/min",
  },
];

export const INITIAL_TOOL_EXECUTIONS: ToolExecution[] = [
  {
    id: "TX-8812",
    toolSlug: "generate_quotation",
    toolName: "Generate Quotation",
    actor: "AI Agent",
    status: "failed",
    timestamp: "12 mins ago",
    durationMs: 340,
    parameters: { sku: "6MM-BRS-FTG", quantity: 2500, discountPct: 12.0 },
    resultHash: "0x00000000",
    errorMessage: "Margin ceiling breached: 12.0% discount exceeds 8.0% autonomous limit under Rule RL-01.",
    retryCount: 0,
  },
  {
    id: "TX-8813",
    toolSlug: "erp_webhook",
    toolName: "ERP Webhook Dispatch",
    actor: "AI Agent",
    status: "unknown",
    timestamp: "28 mins ago",
    durationMs: 5004,
    parameters: { endpoint: "sap_so_create", payload: '{"order_ref": "PO-9912", "amount": 249920}' },
    resultHash: "0xunknown",
    errorMessage: "Gateway timeout 504 from ERP endpoint at 10.0.4.12: state indeterminate, safe retry held.",
    retryCount: 1,
  },
  {
    id: "TX-8814",
    toolSlug: "crm_create_lead",
    toolName: "CRM Create Lead",
    actor: "AI Agent",
    status: "succeeded",
    timestamp: "35 mins ago",
    durationMs: 142,
    parameters: { company: "Murugan Spinning Works", gstin: "33AABCM1234F1Z8", intent: "Combed Yarn 40s (500 kg)" },
    resultHash: "0x3a81cf2b99",
  },
  {
    id: "TX-8815",
    toolSlug: "warehouse_order_lookup",
    toolName: "Warehouse Order Lookup",
    actor: "AI Agent",
    status: "succeeded",
    timestamp: "45 mins ago",
    durationMs: 88,
    parameters: { orderId: "PO-88219" },
    resultHash: "0x99e4b71120",
  },
  {
    id: "TX-8816",
    toolSlug: "support_ticket",
    toolName: "Support Ticket Escalation",
    actor: "AI Agent",
    status: "succeeded",
    timestamp: "1 hr ago",
    durationMs: 210,
    parameters: { issue: "Non-standard OEKO-TEX certificate", urgency: "medium", transcriptId: "HF-109" },
    resultHash: "0x77c4819d44",
  },
  {
    id: "TX-8817",
    toolSlug: "generate_quotation",
    toolName: "Generate Quotation",
    actor: "Priya (Ops Lead)",
    status: "succeeded",
    timestamp: "1 hr 15 mins ago",
    durationMs: 420,
    parameters: { sku: "YRN-CMB-40", quantity: 500, discountPct: 0.0 },
    resultHash: "0x89ab41ce01",
  },
  {
    id: "TX-8818",
    toolSlug: "warehouse_order_lookup",
    toolName: "Warehouse Order Lookup",
    actor: "AI Agent",
    status: "executing",
    timestamp: "Just now",
    durationMs: 45,
    parameters: { sku: "LIN-SLB-04" },
    resultHash: "0xpending",
  },
];
