export const ACT_LABELS = [
  "Act 0 The Hero",
  "Act 1 Grounding & Ingestion",
  "Act 2 Extraction & Context",
  "Act 3 The Stakes",
  "Act 4 Policy Evaluation",
  "Act 5 Permission Gate",
  "Act 6 Action Log",
  "Act 7 Human Handoff",
  "Act 8 Operational Ledger",
  "Act 9 Knowledge Gaps & Evaluation",
  "Act 10 Deployment & Limits",
  "Act 11 Open a Trace",
] as const;

export type ActLabel = (typeof ACT_LABELS)[number];

export interface ActNavItem {
  id: string;
  actNumber: number;
  label: ActLabel;
  shortTitle: string;
}

export const ACT_NAV_ITEMS: ActNavItem[] = [
  { id: "act-0", actNumber: 0, label: "Act 0 The Hero", shortTitle: "The Hero" },
  { id: "act-1", actNumber: 1, label: "Act 1 Grounding & Ingestion", shortTitle: "Grounding & Ingestion" },
  { id: "act-2", actNumber: 2, label: "Act 2 Extraction & Context", shortTitle: "Extraction & Context" },
  { id: "act-3", actNumber: 3, label: "Act 3 The Stakes", shortTitle: "The Stakes" },
  { id: "act-4", actNumber: 4, label: "Act 4 Policy Evaluation", shortTitle: "Policy Evaluation" },
  { id: "act-5", actNumber: 5, label: "Act 5 Permission Gate", shortTitle: "Permission Gate" },
  { id: "act-6", actNumber: 6, label: "Act 6 Action Log", shortTitle: "Action Log" },
  { id: "act-7", actNumber: 7, label: "Act 7 Human Handoff", shortTitle: "Human Handoff" },
  { id: "act-8", actNumber: 8, label: "Act 8 Operational Ledger", shortTitle: "Operational Ledger" },
  { id: "act-9", actNumber: 9, label: "Act 9 Knowledge Gaps & Evaluation", shortTitle: "Knowledge Gaps & Evaluation" },
  { id: "act-10", actNumber: 10, label: "Act 10 Deployment & Limits", shortTitle: "Deployment & Limits" },
  { id: "act-11", actNumber: 11, label: "Act 11 Open a Trace", shortTitle: "Open a Trace" },
];

export const DEMO_NOTICE =
  "Interactive Product Demo — This trace uses synthetic customer data and simulated execution events. Live integrations, production metrics, and cryptographic attestations are not yet connected.";

export const TRACE_PLATE_CAPTION =
  "Simulated replay — synthetic customer data, no live ERP/CRM integration.";

export const SIMULATED_REPLAY_CHIP = "[SIMULATED REPLAY]";

export const HERO_COPY = {
  h1: "Every AI action. Grounded, permissioned, traceable.",
  sub: "SYNEX connects business knowledge, operating rules, and approved tools — so AI can resolve routine requests, take controlled action, and ask for human approval when a decision crosses a defined boundary.",
  exploreCta: "Explore simulated trace",
  pilotCta: "Request a pilot",
} as const;

export const THREE_STEP_OVERVIEW = [
  { step: "01", title: "Connect business knowledge", description: "Catalogs, rate sheets, inventory specs, and customer records isolated per tenant." },
  { step: "02", title: "Check rules & permissions", description: "Pricing thresholds, credit margins, and dual-key authorization gates." },
  { step: "03", title: "Execute approved actions or hand off to a human", description: "Deterministic mutations, ERP payloads, or serialized operator escalations." },
] as const;

export const INTEGRATION_STATUS = [
  { system: "Generic CRM REST adapter", status: "Configurable in V1", note: "Standard JSON REST endpoints with HMAC authentication" },
  { system: "Webhooks", status: "Configurable in V1", note: "Outbound signed HTTP POST with exponential retry queues" },
  { system: "SAP (ECC / S4HANA)", status: "Prototype adapter", note: "Simulated RFC & OData integration endpoints" },
  { system: "TallyPrime", status: "Prototype adapter", note: "XML interchange gateway for local company data" },
  { system: "Microsoft Dynamics", status: "Planned", note: "Targeted for V2 enterprise integration release" },
  { system: "WhatsApp / Instagram / Voice", status: "Not in V1 — see /limits", note: "Unsupervised conversational messaging is explicitly out of scope" },
] as const;

export const TRUST_CONTROL_ITEMS = [
  { title: "Source evidence", subtitle: "Answers cite documents", detail: "Exact chunk hashes & cosine lineage" },
  { title: "Permission gates", subtitle: "High-risk needs approval", detail: "Dual-key supervisor authorization" },
  { title: "Action logs", subtitle: "Every execution recorded", detail: "Double-entry operational accounting" },
  { title: "Uncertainty handling", subtitle: '"I don\'t know" is a valid answer', detail: "Zero hallucination fallback policy" },
  { title: "Human approval", subtitle: "Handoff with full context", detail: "Serialized decision state preservation" },
] as const;

export const FOOTER_CLAIMS = [
  { claim: "No third-party trackers on this site", status: "true" },
  { claim: "Fonts self-hosted", status: "true" },
  { claim: "Page weight: 159 KB HTML · 110 KB First Load JS", status: "measured" },
  { claim: "Ed25519 Hardware HSM", status: "planned" },
  { claim: "Indian MSME Initiative", status: "planned" },
] as const;

export const SECURITY_AUDIT_CAPTION =
  "Illustrative audit metadata — cryptographic implementation pending.";

export const DEPLOYMENT_MODE_STATEMENT =
  "V1 default: fully local inference and embeddings on customer hardware (Ollama + BGE embeddings, CPU-only). Optional cloud model routes are a per-tenant configuration and are disclosed in the UI when enabled.";

export const SAMPLE_PERIOD_LABEL = "Four-week simulated sample (Sep 1-28)";
export const SAMPLE_PERIOD_FOOTNOTE =
  "Simulated fixture period; live periods will reflect actual tenant date ranges.";

export const EMBEDDING_MODEL_SPEC =
  "bge-large-en-v1.5 (1,024-dim, local BGE model via Ollama)";

export const TERMINOLOGY_GLOSSARY = [
  {
    term: "Self-Hosted",
    status: "DEFAULT (V1)",
    definition:
      "All services (Ollama, MySQL, Qdrant, SYNEX engine) execute within the customer's on-premises or private server infrastructure.",
  },
  {
    term: "VPC",
    status: "CONFIGURED OPTION",
    definition:
      "Dedicated virtual private cloud deployment with customer-managed network boundaries and isolated subnets.",
  },
  {
    term: "Zero-External-Calls",
    status: "CONFIGURED OPTION",
    definition:
      "Inference and embeddings execute without outbound network transit. Configured per tenant with local model weights.",
  },
  {
    term: "Air-Gapped",
    status: "CONFIGURED OPTION",
    definition:
      "Strict physical network isolation with no Internet connectivity. Requires preloaded local weights and container images.",
  },
] as const;

export const MONEY = {
  listValue: "₹2,84,000",
  quotedValue: "₹2,49,920",
  counterValue: "₹2,61,280",
  lostValue: "₹2,84,000",
  labels: {
    heroList: "List value before discount: ₹2,84,000",
    approvedReplay: "Quoted value after 12% discount: ₹2,49,920",
    counterOffer: "Counter value at 8%: ₹2,61,280",
    counterfactualLost: "Potential order value lost: ₹2,84,000 (illustrative, not a verified loss)",
  },
} as const;

export const COUNTERFACTUAL_TIMELINE = [
  { time: "Day 0 · 21:41 IST", label: "Inquiry received via web chat gateway", detail: "Buyer online & ready" },
  { time: "Day 1 · 09:15 IST", label: "Human sales manager review", detail: "+11h 34m delay" },
  { time: "Day 1 · 14:02 IST", label: "ERP stock verified & PDF quote sent", detail: "+4h 47m internal lag" },
  { time: "Day 1 · 21:58 IST", label: "Customer bought from competitor", detail: "Lost to latency" },
] as const;

export const REPLAY_TIMELINE = [
  { step: "00", time: "21:41:00.040", stage: "Ingestion", actor: "Gateway", action: "Inbound enquiry received via Webhook", hash: "0x1a8f...90c2" },
  { step: "01", time: "21:41:00.210", stage: "Grounding", actor: "RAG Core", action: "Matched Catalog Chunk #4412 (Cosine: 0.941)", hash: "0x3b12...44f0" },
  { step: "02", time: "21:41:00.328", stage: "Extraction", actor: "Parser", action: "Extracted SKU: 6MM-BRS-FTG, Qty: 400, Account: Senthil", hash: "0x7e44...81a1" },
  { step: "03", time: "21:41:00.410", stage: "Stakes Review", actor: "Policy Pre-Check", action: "Identified high-velocity repeat buyer enquiry", hash: "0x9d02...11b4" },
  { step: "04", time: "21:41:00.412", stage: "Policy Evaluation", actor: "Policy Engine", action: "Stock verified (1,280); 12% discount exceeds 8% limit", hash: "0x2c81...009e" },
  { step: "05", time: "21:41:03.900", stage: "Permission Gate", actor: "Priya (Ops)", action: "Simulated human authority exception: 12% approved (demo)", hash: "0x5f99...63a8" },
  { step: "06", time: "21:41:04.540", stage: "Action Log", actor: "Dispatcher", action: "Margin re-evaluated (34.2% ≥ 28.0%); stock locked RSV-7731", hash: "0x8a33...21d7" },
  { step: "07", time: "21:41:04.660", stage: "Human Handoff", actor: "Orchestrator", action: "Generated serialized operational payload for audit log", hash: "0x4c20...99bb" },
  { step: "08", time: "21:41:05.100", stage: "Operational Ledger", actor: "Double-Entry", action: "Committed quote ₹2,49,920; 34.2% net margin yield", hash: "0x1e55...70a3" },
  { step: "09", time: "21:41:05.800", stage: "Knowledge Gaps", actor: "Evaluator", action: "Zero knowledge gaps on active SKU; golden test pass", hash: "0x6d11...38c9" },
  { step: "10", time: "21:41:06.240", stage: "Deployment & Limits", actor: "Cryptographic", action: "Simulated record sealed to internal ledger block", hash: "0x99a4...55f2" },
] as const;

export type ClaimVerification = "illustrative" | "verified";

export interface ClaimItem {
  id: string;
  category: string;
  claim: string;
  type: ClaimVerification;
  explanation: string;
}

export const CLAIMS: ClaimItem[] = [
  { id: "embedding_model", category: "AI Grounding", claim: "Cosine similarity 0.941 on BGE-large embeddings", type: "illustrative", explanation: "Synthetic cosine threshold demonstration." },
  { id: "pass_rate", category: "Evaluation", claim: "99.4% Golden test pass rate across 1,000 scenarios", type: "illustrative", explanation: "Simulated benchmark metric." },
  { id: "hallucination_rate", category: "Guardrails", claim: "< 0.1% Hallucination rate on grounded corpus", type: "illustrative", explanation: "Simulated benchmark metric." },
  { id: "cost", category: "Economics", claim: "₹0.42 Avg inference compute cost per resolved inquiry", type: "illustrative", explanation: "Estimated representative workload model." },
  { id: "tenant_isolation", category: "Security", claim: "Tenant isolation strictly bounded by schema and role gate", type: "verified", explanation: "Architecturally enforced in application code and RBAC." },
  { id: "sha256", category: "Integrity", claim: "Deterministic SHA-256 idempotency hash on all mutations", type: "verified", explanation: "Standard deterministic hashing function implemented in pipeline." },
  { id: "hsm", category: "Security", claim: "Ed25519 hardware security module (HSM) signature commit", type: "illustrative", explanation: "Synthetic demonstration signature; live HSM not attached." },
  { id: "merkle", category: "Integrity", claim: "Merkle tree root commit on SQLite ledger blocks", type: "illustrative", explanation: "Demonstration cryptographic structure." },
  { id: "sap", category: "Integration", claim: "Direct SAP ECC / S4HANA bidirectional ERP sync", type: "illustrative", explanation: "Simulated webhook payload and retry loop." },
  { id: "retry", category: "Resilience", claim: "Exponential retry queue with jitter on 504 gateway timeouts", type: "verified", explanation: "Deterministic client and retry loop behavior." },
  { id: "telemetry", category: "Observability", claim: "Double-entry operational accounting with audit log events", type: "verified", explanation: "Fully verified ledger audit state and logging." },
];
