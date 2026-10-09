export interface AttentionItem {
  id: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
  summary: string;
  action: string;
}

export const ATTENTION_QUEUE_ITEMS: AttentionItem[] = [
  {
    id: "att_001",
    timestamp: "09:14:22",
    severity: "high",
    summary: "GST mismatch on Invoice #INV-8841 (Senthil Traders)",
    action: "Review & Correct",
  },
  {
    id: "att_002",
    timestamp: "08:42:10",
    severity: "medium",
    summary: "Out-of-stock surge detected for SKU: BRASS-6MM-400",
    action: "Reorder Draft",
  },
];

export interface ApprovalItem {
  id: string;
  customer: string;
  action: string;
  requested: string;
  limit: string;
  rule: string;
  reason: string;
}

export const PENDING_APPROVALS: ApprovalItem[] = [
  {
    id: "apr_001",
    customer: "Senthil Traders (Tier 2)",
    action: "Issue Quotation",
    requested: "12% Discount",
    limit: "8% Max Auto-Approve",
    rule: "tiers.tier2.discount_max = 8%",
    reason: "Repeat buyer, 30-day terms, historical volume > ₹5,00,000.",
  },
];

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: "SYNEX" | "HUMAN";
  entity: string;
  debit: string;
  credit: string;
  status: "verified" | "pending";
}

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: "aud_001",
    timestamp: "2026-10-05 09:14:22",
    actor: "SYNEX",
    entity: "Quotation QT-4471",
    debit: "—",
    credit: "₹2,49,920",
    status: "verified",
  },
  {
    id: "aud_002",
    timestamp: "2026-10-05 09:14:25",
    actor: "SYNEX",
    entity: "CRM Opportunity OPP-19284",
    debit: "—",
    credit: "1 Lead",
    status: "verified",
  },
  {
    id: "aud_003",
    timestamp: "2026-10-05 09:15:01",
    actor: "HUMAN",
    entity: "Approval APR-001",
    debit: "1 Override",
    credit: "—",
    status: "pending",
  },
];
