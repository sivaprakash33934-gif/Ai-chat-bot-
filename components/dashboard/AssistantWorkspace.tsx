"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  AlertTriangle,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Sliders,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  PanelRightClose,
  PanelRightOpen,
  Info,
} from "lucide-react";
import { DecisionReceipt, DecisionOutcome, DecisionSourceEvidence } from "@/components/decision/DecisionReceipt";
import { HonestyBadge } from "@/components/dashboard/ui";

/* =========================================================================
   TYPES & DATA MODELS
   ========================================================================= */

export type SourceFreshness = "Fresh" | "Stale" | "Unknown";
export type DecisionState = "INFORMATIONAL" | "HELD" | "NEEDS HUMAN";

export interface EvidenceSourceItem {
  title: string;
  id: string;
  freshness: SourceFreshness;
  authority?: "PRIMARY" | "SECONDARY";
  lastVerified?: string;
  excerpt?: string;
}

export interface QuickActionDef {
  id: string;
  label: string;
  description: string;
  replyText: string;
  receiptOutcome?: DecisionOutcome;
}

export interface AssistantEvidenceContext {
  decisionState: DecisionState;
  ruleCitation: string;
  ruleFloor?: string;
  sources: EvidenceSourceItem[];
  uncertainty: string;
  suggestedNextSteps: string[];
  decisionReceiptId?: string;
  quickActions?: QuickActionDef[];
}

export interface AssistantMessage {
  id: string;
  sender: "user" | "synex";
  text: string;
  timestamp: string;
  isDemo?: boolean;
  evidenceContext?: AssistantEvidenceContext;
}

export interface AssistantConversation {
  id: string;
  title: string;
  timestamp: string;
  snippet: string;
  messages: AssistantMessage[];
}

/* =========================================================================
   SEEDED DEMO CONVERSATIONS
   ========================================================================= */

const SEEDED_CONVERSATIONS: AssistantConversation[] = [
  {
    id: "conv-margin-drop",
    title: "Why did margin drop this week?",
    timestamp: "Today, 10:42 AM",
    snippet: "Sample dataset shows margin pressure in discounting & delivery...",
    messages: [
      {
        id: "msg-1-u",
        sender: "user",
        text: "Why did margin drop this week?",
        timestamp: "10:42 AM",
      },
      {
        id: "msg-1-s",
        sender: "synex",
        text: "[DEMO] The sample dataset shows margin pressure in two areas: increased discounting and higher delivery costs. This is a demo explanation, not a live analysis of your business.",
        timestamp: "10:42 AM",
        isDemo: true,
        evidenceContext: {
          decisionState: "INFORMATIONAL",
          ruleCitation: "Margin Floor Policy · Rule M-04 (Min 14.5% Gross Margin)",
          ruleFloor: "Autonomous sales quote cap at 12% max discount without Ops Lead sign-off",
          sources: [
            {
              title: "Pricing Policy — Demo",
              id: "DOC-PRICING-2026",
              freshness: "Fresh",
              authority: "PRIMARY",
              lastVerified: "Oct 8, 2026",
              excerpt: "Standard dealer discount 8%. Maximum autonomous concession 12% for volume tier > 500 units.",
            },
            {
              title: "Delivery Cost Summary — Demo",
              id: "DOC-LOGISTICS-Q3",
              freshness: "Stale",
              authority: "SECONDARY",
              lastVerified: "Aug 15, 2026 (56 days ago)",
              excerpt: "Coimbatore to Chennai freight benchmark pegged at ₹42/km before fuel surcharge adjustment.",
            },
          ],
          uncertainty: "The sample does not establish whether the change is seasonal. No live ERP or accounting records were queried.",
          suggestedNextSteps: [
            "Review the flagged discount orders (7 orders exceeding standard dealer discount).",
            "Inspect the stale delivery-cost source (DOC-LOGISTICS-Q3 needs Q4 fuel surcharge sync).",
            "Prepare a summary for human review before adjusting customer quotations.",
          ],
          decisionReceiptId: "DEC-MARGIN-084",
          quickActions: [
            {
              id: "act-evidence",
              label: "Show evidence",
              description: "Expand verified evidence sources and rule floor parameters",
              replyText: "[DEMO] Verified sample evidence details:\n• Discount approvals sample: 7 flagged orders in Tamil Nadu corridor exceeding 10% concessions.\n• Delivery cost sample: 3 freight routes flagged above ₹48/km demo threshold.\n• Primary policy: DOC-PRICING-2026 (Fresh, verified Oct 8).\n• Secondary policy: DOC-LOGISTICS-Q3 (Stale, verified Aug 15).\nAll citations originate from demo fixture files.",
            },
            {
              id: "act-compare",
              label: "Compare with previous period",
              description: "Review counterfactual demo performance from prior week",
              replyText: "[DEMO] Comparative sample ledger analysis:\n• Prior week gross margin: 16.8% (sample baseline).\n• Current week sample gross margin: 13.9% (-290 bps).\n• Concession variance: +1.8% average discount given.\n• Logistics variance: +1.1% fuel surcharge impact.\nThis simulated comparison reflects local demo dataset only.",
            },
            {
              id: "act-summary",
              label: "Prepare review summary",
              description: "Draft human operator briefing with risk flags",
              replyText: "[DEMO] Summary prepared for Ops Lead review:\n1. 7 orders flagged for manual margin floor exception review.\n2. Logistics ledger source flagged stale (56 days since audit).\n3. Recommending temporary hold on auto-quotes above 10% discount until logistics rates update.\nStatus: Awaiting human operator confirmation.",
              receiptOutcome: "NEEDS HUMAN",
            },
          ],
        },
      },
    ],
  },
  {
    id: "conv-pending-approvals",
    title: "Review pending approvals",
    timestamp: "Yesterday, 4:15 PM",
    snippet: "3 customer quotation requests require Ops Lead sign-off...",
    messages: [
      {
        id: "msg-2-u",
        sender: "user",
        text: "Which actions need my approval?",
        timestamp: "4:15 PM",
      },
      {
        id: "msg-2-s",
        sender: "synex",
        text: "[DEMO] 3 customer quotation requests currently exceed autonomous limits and require manual Ops Lead authorization. Autonomous execution is held pursuant to Rule B-02.",
        timestamp: "4:15 PM",
        isDemo: true,
        evidenceContext: {
          decisionState: "NEEDS HUMAN",
          ruleCitation: "Commercial Concessions · Rule B-02 (High-Value Quotes > ₹50,000)",
          ruleFloor: "Any quotation with discount > 12% or total value > ₹1,00,000 mandates dual human sign-off",
          sources: [
            {
              title: "Delegation of Authority Matrix",
              id: "DOC-AUTH-MATRIX",
              freshness: "Fresh",
              authority: "PRIMARY",
              lastVerified: "Oct 9, 2026",
              excerpt: "Quotes above ₹50,000 with custom delivery commitments must be countersigned by Ops Lead or Owner.",
            },
          ],
          uncertainty: "Customer credit terms have not been validated against bank API or GSTIN portal.",
          suggestedNextSteps: [
            "Open Work Queue (/dashboard/queue) to inspect Order #ORD-8821.",
            "Verify customer advance payment history in Customer Directory (/dashboard/customers).",
            "Approve or reject quotation with explicit audit ledger reason.",
          ],
          decisionReceiptId: "DEC-APPROVAL-119",
          quickActions: [
            {
              id: "act-queue-link",
              label: "View Work Queue",
              description: "Inspect intercepted actions waiting in queue",
              replyText: "[DEMO] Navigating to Work Queue: 3 pending quotes (#ORD-8821, #ORD-8824, #ORD-8830) currently waiting in /dashboard/queue with status 'Waiting for You'.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "conv-stale-knowledge",
    title: "Find stale knowledge sources",
    timestamp: "Oct 8, 2:30 PM",
    snippet: "2 knowledge sources flagged older than 30 days...",
    messages: [
      {
        id: "msg-3-u",
        sender: "user",
        text: "What knowledge sources are stale?",
        timestamp: "2:30 PM",
      },
      {
        id: "msg-3-s",
        sender: "synex",
        text: "[DEMO] The Knowledge Freshness monitor flags 2 approved documents that have not been re-verified in over 30 days. These should be reviewed or re-indexed.",
        timestamp: "2:30 PM",
        isDemo: true,
        evidenceContext: {
          decisionState: "HELD",
          ruleCitation: "Knowledge Governance · Rule K-01 (30-Day Freshness SLA)",
          ruleFloor: "Documents over 45 days stale trigger autonomous answer demotion to SECONDARY authority",
          sources: [
            {
              title: "Delivery Cost Summary — Demo",
              id: "DOC-LOGISTICS-Q3",
              freshness: "Stale",
              authority: "SECONDARY",
              lastVerified: "Aug 15, 2026 (56 days ago)",
              excerpt: "Coimbatore to Chennai freight benchmark pegged at ₹42/km.",
            },
            {
              title: "Return & Restocking Guidelines",
              id: "DOC-RETURNS-V2",
              freshness: "Stale",
              authority: "SECONDARY",
              lastVerified: "Sep 2, 2026 (38 days ago)",
              excerpt: "Standard 7-day restocking window with 5% inspection deduction for opened boxes.",
            },
          ],
          uncertainty: "Automated crawl cannot verify supplier contracts that require signed PDF exhibits.",
          suggestedNextSteps: [
            "Upload updated freight schedule in Knowledge Base (/dashboard/knowledge).",
            "Confirm return window with warehouse manager.",
            "Re-run grounding validation pass.",
          ],
          decisionReceiptId: "DEC-KNOW-042",
        },
      },
    ],
  },
  {
    id: "conv-operational-risks",
    title: "Summarize today's operational risks",
    timestamp: "Oct 7, 9:00 AM",
    snippet: "Zero security breaches, 1 API timeout retry active...",
    messages: [
      {
        id: "msg-4-u",
        sender: "user",
        text: "Summarize today's operational risks.",
        timestamp: "9:00 AM",
      },
      {
        id: "msg-4-s",
        sender: "synex",
        text: "[DEMO] Daily operational risk audit: 0 policy violations, 1 webhook timeout currently in idempotent retry backoff, and 2 stale knowledge documents. System operating within controlled boundaries.",
        timestamp: "9:00 AM",
        isDemo: true,
        evidenceContext: {
          decisionState: "INFORMATIONAL",
          ruleCitation: "Operational Integrity Matrix · Daily Health Check",
          ruleFloor: "Idempotent retry limit: 3 attempts before escalating to Failure Center",
          sources: [
            {
              title: "Action Execution Log",
              id: "ACT-EXEC-DAILY",
              freshness: "Fresh",
              authority: "PRIMARY",
              lastVerified: "Today, 08:45 AM",
              excerpt: "Tool ERP.SyncInventory experienced 1 HTTP 504 timeout; exponential backoff active with jitter.",
            },
          ],
          uncertainty: "External warehouse webhook endpoint status is inferred from HTTP retry response codes.",
          suggestedNextSteps: [
            "Inspect Actions Failure Center (/dashboard/actions) if retry counter reaches 3.",
            "Review customer queue for delayed order status updates.",
          ],
          decisionReceiptId: "DEC-RISK-001",
        },
      },
    ],
  },
];

/* Suggestions cards for empty or active state */
const PROMPT_SUGGESTIONS = [
  {
    title: "Why did margin drop this week?",
    desc: "Inspect discounting spikes, freight rate changes, and stale logistics data.",
    query: "Why did margin drop this week?",
  },
  {
    title: "Which actions need my approval?",
    desc: "Check quotes and order exceptions that crossed autonomous caps.",
    query: "Which actions need my approval?",
  },
  {
    title: "What knowledge sources are stale?",
    desc: "Locate documents exceeding the 30-day freshness SLA.",
    query: "What knowledge sources are stale?",
  },
  {
    title: "Summarize today's operational risks.",
    desc: "Audit failed tool calls, webhook retries, and customer escalations.",
    query: "Summarize today's operational risks.",
  },
];

/* Fallback generator when query is not an exact match */
function generateDemoResponse(query: string): AssistantMessage {
  const q = query.toLowerCase().trim();

  if (q.includes("margin") || q.includes("profit") || q.includes("discount")) {
    return {
      id: `msg-${Date.now()}`,
      sender: "synex",
      text: "[DEMO] The sample dataset shows margin pressure in two areas: increased discounting and higher delivery costs. This is a demo explanation, not a live analysis of your business.",
      timestamp: "Just now",
      isDemo: true,
      evidenceContext: {
        decisionState: "INFORMATIONAL",
        ruleCitation: "Margin Floor Policy · Rule M-04 (Min 14.5% Gross Margin)",
        ruleFloor: "Autonomous sales quote cap at 12% max discount without Ops Lead sign-off",
        sources: [
          {
            title: "Pricing Policy — Demo",
            id: "DOC-PRICING-2026",
            freshness: "Fresh",
            authority: "PRIMARY",
            lastVerified: "Oct 8, 2026",
            excerpt: "Standard dealer discount 8%. Maximum autonomous concession 12% for volume tier > 500 units.",
          },
          {
            title: "Delivery Cost Summary — Demo",
            id: "DOC-LOGISTICS-Q3",
            freshness: "Stale",
            authority: "SECONDARY",
            lastVerified: "Aug 15, 2026 (56 days ago)",
            excerpt: "Coimbatore to Chennai freight benchmark pegged at ₹42/km before fuel surcharge adjustment.",
          },
        ],
        uncertainty: "The sample does not establish whether the change is seasonal. No live ERP or accounting records were queried.",
        suggestedNextSteps: [
          "Review the flagged discount orders (7 orders exceeding standard dealer discount).",
          "Inspect the stale delivery-cost source (DOC-LOGISTICS-Q3 needs Q4 fuel surcharge sync).",
          "Prepare a summary for human review before adjusting customer quotations.",
        ],
        decisionReceiptId: "DEC-MARGIN-084",
        quickActions: [
          {
            id: "qa-1",
            label: "Show evidence",
            description: "Show verified grounding lineage",
            replyText: "[DEMO] Verified sample evidence details:\n• Discount approvals sample: 7 flagged orders in Tamil Nadu corridor.\n• Delivery cost sample: 3 freight routes flagged above ₹48/km demo threshold.\n• Primary policy: DOC-PRICING-2026 (Fresh, verified Oct 8).",
          },
          {
            id: "qa-2",
            label: "Compare with previous period",
            description: "Compare against prior sample baseline",
            replyText: "[DEMO] Comparative sample ledger analysis:\n• Prior week gross margin: 16.8% (sample baseline).\n• Current week sample gross margin: 13.9% (-290 bps).",
          },
          {
            id: "qa-3",
            label: "Prepare review summary",
            description: "Draft human operator briefing with risk flags",
            replyText: "[DEMO] Summary prepared for Ops Lead review: 7 orders flagged for manual margin floor exception review. Status: Awaiting human operator confirmation.",
            receiptOutcome: "NEEDS HUMAN",
          },
        ],
      },
    };
  }

  if (q.includes("approval") || q.includes("queue") || q.includes("pending")) {
    return {
      id: `msg-${Date.now()}`,
      sender: "synex",
      text: "[DEMO] 3 customer quotation requests currently exceed autonomous limits and require manual Ops Lead authorization. Autonomous execution is held pursuant to Rule B-02.",
      timestamp: "Just now",
      isDemo: true,
      evidenceContext: {
        decisionState: "NEEDS HUMAN",
        ruleCitation: "Commercial Concessions · Rule B-02 (High-Value Quotes > ₹50,000)",
        ruleFloor: "Any quotation with discount > 12% or total value > ₹1,00,000 mandates dual human sign-off",
        sources: [
          {
            title: "Delegation of Authority Matrix",
            id: "DOC-AUTH-MATRIX",
            freshness: "Fresh",
            authority: "PRIMARY",
            lastVerified: "Oct 9, 2026",
            excerpt: "Quotes above ₹50,000 with custom delivery commitments must be countersigned by Ops Lead or Owner.",
          },
        ],
        uncertainty: "Customer credit terms have not been validated against bank API or GSTIN portal.",
        suggestedNextSteps: [
          "Open Work Queue (/dashboard/queue) to inspect Order #ORD-8821.",
          "Verify customer advance payment history in Customer Directory (/dashboard/customers).",
        ],
        decisionReceiptId: "DEC-APPROVAL-119",
      },
    };
  }

  if (q.includes("stale") || q.includes("knowledge") || q.includes("source")) {
    return {
      id: `msg-${Date.now()}`,
      sender: "synex",
      text: "[DEMO] The Knowledge Freshness monitor flags 2 approved documents that have not been re-verified in over 30 days. These should be reviewed or re-indexed.",
      timestamp: "Just now",
      isDemo: true,
      evidenceContext: {
        decisionState: "HELD",
        ruleCitation: "Knowledge Governance · Rule K-01 (30-Day Freshness SLA)",
        ruleFloor: "Documents over 45 days stale trigger autonomous answer demotion to SECONDARY authority",
        sources: [
          {
            title: "Delivery Cost Summary — Demo",
            id: "DOC-LOGISTICS-Q3",
            freshness: "Stale",
            authority: "SECONDARY",
            lastVerified: "Aug 15, 2026 (56 days ago)",
            excerpt: "Coimbatore to Chennai freight benchmark pegged at ₹42/km.",
          },
        ],
        uncertainty: "Automated crawl cannot verify supplier contracts that require signed PDF exhibits.",
        suggestedNextSteps: [
          "Upload updated freight schedule in Knowledge Base (/dashboard/knowledge).",
          "Re-run grounding validation pass.",
        ],
        decisionReceiptId: "DEC-KNOW-042",
      },
    };
  }

  if (q.includes("risk") || q.includes("today") || q.includes("audit")) {
    return {
      id: `msg-${Date.now()}`,
      sender: "synex",
      text: "[DEMO] Daily operational risk audit: 0 policy violations, 1 webhook timeout currently in idempotent retry backoff, and 2 stale knowledge documents. System operating within controlled boundaries.",
      timestamp: "Just now",
      isDemo: true,
      evidenceContext: {
        decisionState: "INFORMATIONAL",
        ruleCitation: "Operational Integrity Matrix · Daily Health Check",
        ruleFloor: "Idempotent retry limit: 3 attempts before escalating to Failure Center",
        sources: [
          {
            title: "Action Execution Log",
            id: "ACT-EXEC-DAILY",
            freshness: "Fresh",
            authority: "PRIMARY",
            lastVerified: "Today, 08:45 AM",
            excerpt: "Tool ERP.SyncInventory experienced 1 HTTP 504 timeout; exponential backoff active with jitter.",
          },
        ],
        uncertainty: "External warehouse webhook endpoint status is inferred from HTTP retry response codes.",
        suggestedNextSteps: [
          "Inspect Actions Failure Center (/dashboard/actions) if retry counter reaches 3.",
        ],
        decisionReceiptId: "DEC-RISK-001",
      },
    };
  }

  // Fallback for unseeded queries
  return {
    id: `msg-${Date.now()}`,
    sender: "synex",
    text: "[DEMO] This prototype does not have a prepared answer for that question. No live data or AI service was queried.",
    timestamp: "Just now",
    isDemo: true,
    evidenceContext: {
      decisionState: "HELD",
      ruleCitation: "Grounding Safety Boundary · Fallback Response",
      sources: [],
      uncertainty: "No matching record or approved grounding document found in local demo fixture. System held query rather than speculating.",
      suggestedNextSteps: [
        "Try asking about: 'Why did margin drop this week?', 'Review pending approvals', or 'What knowledge sources are stale?'",
        "Add new grounding documentation in Knowledge Base (/dashboard/knowledge).",
      ],
    },
  };
}

/* =========================================================================
   MAIN COMPONENT: SYNEX ASSISTANT WORKSPACE
   ========================================================================= */

export function AssistantWorkspace() {
  const [conversations, setConversations] = useState<AssistantConversation[]>(SEEDED_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>("conv-margin-drop");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>("msg-1-s");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(true);
  const [mobileContextDrawerOpen, setMobileContextDrawerOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputLabelId = useId();

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isTyping]);

  // Handle switching conversations
  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
    const target = conversations.find((c) => c.id === id);
    const lastSynexMsg = target?.messages.filter((m) => m.sender === "synex").slice(-1)[0];
    setSelectedMessageId(lastSynexMsg ? lastSynexMsg.id : null);
    setSidebarOpenMobile(false);
  };

  // Start new conversation
  const handleNewConversation = () => {
    const newId = `conv-new-${Date.now()}`;
    const newConv: AssistantConversation = {
      id: newId,
      title: "New Conversation",
      timestamp: "Just now",
      snippet: "No messages yet.",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setSelectedMessageId(null);
    setSidebarOpenMobile(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // Reset current conversation to initial state
  const handleResetConversation = () => {
    const defaultOne = SEEDED_CONVERSATIONS.find((c) => c.id === activeConvId);
    if (defaultOne) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConvId ? { ...defaultOne } : c))
      );
      setSelectedMessageId(defaultOne.messages.filter((m) => m.sender === "synex").slice(-1)[0]?.id || null);
    } else {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId ? { ...c, messages: [], snippet: "No messages yet." } : c
        )
      );
      setSelectedMessageId(null);
    }
  };

  // Send message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg: AssistantMessage = {
      id: `msg-${Date.now()}-u`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    // Update conversation with user message
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          const updatedTitle = c.messages.length === 0 ? text.slice(0, 36) : c.title;
          return {
            ...c,
            title: updatedTitle,
            snippet: text,
            messages: [...c.messages, userMsg],
          };
        }
        return c;
      })
    );

    setInputText("");
    setIsTyping(true);

    // Simulate controlled typing state (500ms)
    setTimeout(() => {
      const response = generateDemoResponse(text);
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              snippet: response.text.slice(0, 60),
              messages: [...c.messages, response],
            };
          }
          return c;
        })
      );
      setSelectedMessageId(response.id);
      setIsTyping(false);
    }, 600);
  };

  // Quick Action execution
  const handleQuickAction = (qa: QuickActionDef) => {
    const userMsg: AssistantMessage = {
      id: `msg-${Date.now()}-u`,
      sender: "user",
      text: qa.label,
      timestamp: "Just now",
    };

    const replyMsg: AssistantMessage = {
      id: `msg-${Date.now()}-s`,
      sender: "synex",
      text: qa.replyText,
      timestamp: "Just now",
      isDemo: true,
      evidenceContext: {
        decisionState: (qa.receiptOutcome as DecisionState) || "INFORMATIONAL",
        ruleCitation: "Quick Action Execution · Client Simulation",
        sources: [
          {
            title: "Simulated Action Ledger",
            id: "ACT-QUICK-LEDGER",
            freshness: "Fresh",
            authority: "PRIMARY",
            lastVerified: "Today, 10:45 AM",
            excerpt: qa.description,
          },
        ],
        uncertainty: "Simulated quick action response. No backend integration or external database mutation was performed.",
        suggestedNextSteps: ["Review output details.", "Return to main ledger if satisfied."],
      },
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...c.messages, userMsg, replyMsg],
            snippet: replyMsg.text.slice(0, 60),
          };
        }
        return c;
      })
    );

    setSelectedMessageId(replyMsg.id);
  };

  // Keyboard handling for textarea (Enter sends, Shift+Enter new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Find currently active message's evidence context
  const selectedMessage =
    activeConversation?.messages.find((m) => m.id === selectedMessageId) ||
    activeConversation?.messages.filter((m) => m.sender === "synex").slice(-1)[0] ||
    null;

  const currentContext = selectedMessage?.evidenceContext;

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col -m-4 md:-m-8 border border-hairline bg-paper text-ink overflow-hidden">
      {/* =========================================================================
         TOP WORKSPACE HEADER
         ========================================================================= */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-paper-elevated px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar trigger */}
          <button
            type="button"
            onClick={() => setSidebarOpenMobile((v) => !v)}
            aria-label="Toggle conversations list"
            className="md:hidden rounded border border-hairline bg-paper p-1.5 text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink font-semibold">
                SYNEX ASSISTANT
              </span>
              <span className="text-ink-muted">·</span>
              <span className="rounded border border-amber/40 bg-amber-tint px-1.5 py-0.2 font-mono text-[9px] uppercase font-bold text-amber">
                DEMO MODE
              </span>
            </div>
            <p className="hidden sm:block font-serif text-[13px] text-ink-muted">
              Business intelligence and controlled actions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <HonestyBadge />

          {/* Desktop Toggle for Context Panel */}
          <button
            type="button"
            onClick={() => setContextPanelOpen(!contextPanelOpen)}
            aria-label={contextPanelOpen ? "Collapse evidence context panel" : "Expand evidence context panel"}
            className="hidden lg:flex items-center gap-1.5 rounded border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-ink hover:border-ink/40 transition-colors"
            title="Toggle Right-Hand Evidence Drawer"
          >
            {contextPanelOpen ? (
              <>
                <PanelRightClose className="h-3.5 w-3.5 text-ink-muted" />
                <span>Hide Context</span>
              </>
            ) : (
              <>
                <PanelRightOpen className="h-3.5 w-3.5 text-ink-muted" />
                <span>Show Context</span>
              </>
            )}
          </button>

          {/* Mobile Context Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileContextDrawerOpen(true)}
            aria-label="View decision evidence context"
            className="lg:hidden flex items-center gap-1 rounded border border-hairline bg-paper px-2 py-1 font-mono text-[11px] text-ink hover:border-ink/40"
          >
            <FileText className="h-3.5 w-3.5 text-ink-muted" />
            <span>Context</span>
          </button>
        </div>
      </header>

      {/* Notice strip: No live AI or business systems */}
      <div className="border-b border-hairline bg-paper px-4 py-1.5 text-center font-mono text-[10px] text-ink-muted">
        Notice: Responses use simulated demo records and are not connected to live business systems, LLMs, or ERP databases.
      </div>

      {/* =========================================================================
         THREE-PANEL WORKSPACE BODY
         ========================================================================= */}
      <div className="flex flex-1 min-h-0 relative overflow-hidden">
        {/* -----------------------------------------------------------------------
           A. CONVERSATION SIDEBAR (Desktop sticky + Mobile overlay)
           ----------------------------------------------------------------------- */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72 transform bg-paper-elevated border-r border-hairline transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:z-0
            ${sidebarOpenMobile ? "translate-x-0 shadow-lg" : "-translate-x-full md:translate-x-0"}
            flex flex-col h-full shrink-0
          `}
          aria-label="Conversations sidebar"
        >
          {/* Sidebar Top: Title & New Conversation Button */}
          <div className="p-3.5 border-b border-hairline flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                Conversations
              </span>
              <span className="font-mono text-[10px] text-ink-muted">
                {conversations.length} Sessions
              </span>
            </div>
            <button
              type="button"
              onClick={handleNewConversation}
              className="flex items-center justify-center gap-2 rounded border border-ink bg-ink px-3 py-2 font-mono text-[12px] font-semibold text-paper hover:bg-ink/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>+ New conversation</span>
            </button>
          </div>

          {/* Conversation List */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-1" aria-label="Conversation history">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => handleSelectConversation(conv.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`w-full text-left p-2.5 rounded transition-colors group ${
                    isActive
                      ? "border border-hairline bg-paper text-ink font-medium shadow-none"
                      : "text-ink-muted hover:bg-paper/70 hover:text-ink border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-serif text-[13px] text-ink truncate group-hover:text-ink">
                      {conv.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-ink-muted mt-1">
                    <span className="truncate max-w-[170px]">{conv.snippet}</span>
                    <span className="shrink-0">{conv.timestamp.split(",")[0]}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer info */}
          <div className="p-3 border-t border-hairline font-mono text-[10px] text-ink-muted flex items-center justify-between">
            <span>Storage: Local State</span>
            <span>Version: V1</span>
          </div>
        </aside>

        {/* Mobile sidebar backdrop */}
        {sidebarOpenMobile && (
          <div
            className="fixed inset-0 z-30 bg-ink/30 md:hidden"
            onClick={() => setSidebarOpenMobile(false)}
            aria-hidden="true"
          />
        )}

        {/* -----------------------------------------------------------------------
           B. MAIN CONVERSATION AREA
           ----------------------------------------------------------------------- */}
        <main className="flex flex-1 flex-col min-w-0 bg-paper h-full overflow-hidden">
          {/* Scrollable Chat Feed */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {activeConversation.messages.length === 0 ? (
              /* EMPTY STATE */
              <div className="max-w-2xl mx-auto py-8 space-y-6">
                <div className="border border-hairline bg-paper-elevated p-6 text-center space-y-2">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-hairline bg-paper text-ink">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <h2 className="font-serif text-[22px] font-semibold text-ink">
                    What should we investigate?
                  </h2>
                  <p className="font-sans text-[14px] text-ink-muted max-w-md mx-auto">
                    Ask about business performance, policies, evidence, or pending actions.
                  </p>
                </div>

                {/* Four Suggestion Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROMPT_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(item.query)}
                      className="text-left border border-hairline bg-paper-elevated p-4 hover:border-ink/40 hover:bg-paper transition-colors group space-y-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[14px] font-medium text-ink group-hover:text-ink">
                          {item.title}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-ink-muted group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="font-sans text-[12px] text-ink-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ACTIVE MESSAGES STREAM */
              <div className="max-w-3xl mx-auto space-y-5">
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  const isSelected = selectedMessageId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                    >
                      {/* Identity & Timestamp Header */}
                      <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted px-1">
                        <span className="font-semibold uppercase tracking-wider text-ink">
                          {isUser ? "Operator" : "SYNEX"}
                        </span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                        {msg.isDemo && (
                          <span className="border border-hairline bg-paper px-1 py-0.2 text-[9px] text-ink-muted">
                            [DEMO]
                          </span>
                        )}
                      </div>

                      {/* Message Bubble / Ledger Block */}
                      <div
                        onClick={() => {
                          if (!isUser) {
                            setSelectedMessageId(msg.id);
                          }
                        }}
                        className={`
                          p-4 rounded-sm border max-w-[90%] md:max-w-[85%] text-left transition-colors
                          ${
                            isUser
                              ? "bg-paper-elevated border-hairline text-ink"
                              : isSelected
                              ? "bg-paper-elevated border-ink text-ink shadow-none"
                              : "bg-paper border-hairline text-ink hover:border-ink/40 cursor-pointer"
                          }
                        `}
                      >
                        <p className="font-sans text-[14px] text-ink leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>

                        {/* Inline context badge for assistant messages */}
                        {!isUser && msg.evidenceContext && (
                          <div className="mt-3 pt-2.5 border-t border-hairline flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                            <div className="flex items-center gap-2">
                              <span className="text-ink-muted uppercase">Decision State:</span>
                              <span
                                className={`px-1.5 py-0.2 font-semibold uppercase border ${
                                  msg.evidenceContext.decisionState === "INFORMATIONAL"
                                    ? "bg-success-surface text-success border-success/30"
                                    : msg.evidenceContext.decisionState === "HELD"
                                    ? "bg-amber-tint text-amber border-amber/30"
                                    : "bg-amber-tint text-amber border-amber/30"
                                }`}
                              >
                                {msg.evidenceContext.decisionState}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMessageId(msg.id);
                                if (window.innerWidth < 1024) {
                                  setMobileContextDrawerOpen(true);
                                }
                              }}
                              className="text-ink underline hover:text-ink-muted focus-visible:outline-none"
                            >
                              Inspect evidence ({msg.evidenceContext.sources.length} sources) →
                            </button>
                          </div>
                        )}

                        {/* Quick action triggers if present */}
                        {!isUser && msg.evidenceContext?.quickActions && (
                          <div className="mt-3 pt-2.5 border-t border-hairline space-y-1.5">
                            <span className="block font-mono text-[10px] uppercase text-ink-muted">
                              Suggested Interactive Actions (Demo):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.evidenceContext.quickActions.map((qa) => (
                                <button
                                  key={qa.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction(qa);
                                  }}
                                  className="inline-flex items-center gap-1 border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-ink hover:border-ink hover:bg-paper-elevated transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                                >
                                  <span>{qa.label}</span>
                                  <ArrowRight className="h-3 w-3 text-ink-muted" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Simulated typing state */}
                {isTyping && (
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted px-1">
                      <span className="font-semibold uppercase tracking-wider text-ink">SYNEX</span>
                      <span>·</span>
                      <span>Evaluating business evidence...</span>
                    </div>
                    <div className="p-3 border border-hairline bg-paper-elevated flex items-center gap-2 font-mono text-[11px] text-ink-muted">
                      <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
                      <span>Retrieving verified policy documents & checking rules...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* =====================================================================
             COMPOSER & INTERACTION DESIGN
             ===================================================================== */}
          <div className="border-t border-hairline bg-paper-elevated p-3 md:p-4 shrink-0">
            <div className="max-w-3xl mx-auto space-y-2">
              <label htmlFor={inputLabelId} className="sr-only">
                Ask SYNEX Assistant a business question
              </label>

              <div className="relative border border-hairline bg-paper focus-within:border-ink transition-colors">
                <textarea
                  id={inputLabelId}
                  ref={textareaRef}
                  rows={2}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about business performance, policies, evidence, or pending actions... (Enter to send, Shift+Enter for newline)"
                  className="w-full resize-none p-3 font-sans text-[13px] text-ink placeholder:text-ink-faint bg-transparent focus:outline-none"
                />

                <div className="flex items-center justify-between border-t border-hairline px-3 py-2 bg-paper-elevated/40">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ink-muted">
                      Demo responses only — no live AI connection
                    </span>
                    <button
                      type="button"
                      onClick={handleResetConversation}
                      className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-ink-muted hover:text-ink transition-colors"
                      title="Reset conversation to initial state"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset chat</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    aria-label="Send message to SYNEX Assistant"
                    className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 font-mono text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
                      inputText.trim() && !isTyping
                        ? "bg-ink text-paper hover:bg-ink/90 cursor-pointer"
                        : "bg-hairline text-ink-faint cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span>Send</span>
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* -----------------------------------------------------------------------
           C. CONTEXT & EVIDENCE PANEL (Desktop wide screen)
           ----------------------------------------------------------------------- */}
        {contextPanelOpen && (
          <aside
            className="hidden lg:flex w-84 xl:w-96 flex-col border-l border-hairline bg-paper-elevated h-full shrink-0 overflow-hidden"
            aria-label="Decision Context panel"
          >
            <div className="flex h-12 items-center justify-between border-b border-hairline px-4">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-ink-muted" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                  DECISION CONTEXT
                </span>
              </div>
              <span className="border border-hairline bg-paper px-1.5 py-0.2 font-mono text-[9px] text-ink-muted">
                INSPECTION
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <ContextPanelContent context={currentContext} />
            </div>
          </aside>
        )}

        {/* Mobile Context Drawer (<1024px) */}
        {mobileContextDrawerOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Decision context drawer"
          >
            <div
              className="fixed inset-0 bg-ink/30 transition-opacity"
              onClick={() => setMobileContextDrawerOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-10 w-full max-w-md bg-paper-elevated border-l border-hairline flex flex-col h-full shadow-xl">
              <div className="flex h-12 items-center justify-between border-b border-hairline px-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-ink-muted" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
                    DECISION CONTEXT
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileContextDrawerOpen(false)}
                  className="font-mono text-[11px] text-ink-muted hover:text-ink p-1"
                >
                  Close ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                <ContextPanelContent context={currentContext} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   INTERNAL HELPER: CONTEXT PANEL CONTENT
   ========================================================================= */

function ContextPanelContent({ context }: { context?: AssistantEvidenceContext }) {
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!context) {
    return (
      <div className="border border-hairline bg-paper p-5 text-center space-y-2">
        <Info className="h-5 w-5 mx-auto text-ink-muted" />
        <h4 className="font-serif text-[15px] font-semibold text-ink">
          Select an Assistant Message
        </h4>
        <p className="font-sans text-[12px] text-ink-muted leading-relaxed">
          Click any response from SYNEX in the chat stream to inspect its verified evidence sources, source freshness ratings, rule citations, and uncertainty boundaries.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans text-[12px]">
      {/* 1. Decision State Pill */}
      <div className="border border-hairline bg-paper p-3 space-y-1">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="uppercase text-ink-muted">Evaluation State</span>
          <span
            className={`px-2 py-0.5 font-semibold uppercase border ${
              context.decisionState === "INFORMATIONAL"
                ? "bg-success-surface text-success border-success/30"
                : context.decisionState === "HELD"
                ? "bg-amber-tint text-amber border-amber/30"
                : "bg-amber-tint text-amber border-amber/30"
            }`}
          >
            {context.decisionState}
          </span>
        </div>
        <p className="font-mono text-[11px] text-ink-muted pt-1">
          {context.decisionState === "INFORMATIONAL"
            ? "Explanation grounded in approved knowledge. No state mutation requested."
            : context.decisionState === "HELD"
            ? "Action or answer temporarily held pending additional source verification."
            : "Requires manual human intervention per business boundary rules."}
        </p>
      </div>

      {/* 2. Applicable Policy / Rule Citation */}
      <div className="border border-hairline bg-paper p-3 space-y-1.5 font-mono text-[11px]">
        <div className="flex items-center gap-1.5 uppercase font-semibold text-[10px] text-ink">
          <ShieldCheck className="h-3 w-3 text-ink" />
          <span>Applicable Business Rule</span>
        </div>
        <div className="text-ink font-medium">{context.ruleCitation}</div>
        {context.ruleFloor && (
          <div className="text-ink-muted text-[10px] pt-1 border-t border-hairline">
            Hard floor constraint: {context.ruleFloor}
          </div>
        )}
      </div>

      {/* 3. Evidence Sources & Freshness */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted">
          <span>Grounding Sources ({context.sources.length})</span>
          <span>Freshness SLA</span>
        </div>

        {context.sources.length === 0 ? (
          <div className="border border-hairline bg-paper p-3 font-mono text-[11px] text-ink-muted italic">
            No approved source documents found in local corpus.
          </div>
        ) : (
          <div className="space-y-2">
            {context.sources.map((src, idx) => {
              const freshnessStyle =
                src.freshness === "Fresh"
                  ? "bg-success-surface text-success border-success/30"
                  : src.freshness === "Stale"
                  ? "bg-amber-tint text-amber border-amber/30"
                  : "bg-paper text-ink-muted border-hairline";

              return (
                <div key={idx} className="border border-hairline bg-paper p-2.5 space-y-1.5">
                  <div className="flex items-start justify-between gap-2 font-mono text-[11px]">
                    <div className="truncate">
                      <div className="font-semibold text-ink truncate">{src.title}</div>
                      <div className="text-[10px] text-ink-faint">{src.id}</div>
                    </div>
                    <span className={`px-1.5 py-0.2 font-mono text-[9px] uppercase font-semibold border shrink-0 ${freshnessStyle}`}>
                      {src.freshness}
                    </span>
                  </div>

                  {src.excerpt && (
                    <p className="font-mono text-[10px] text-ink-muted italic border-t border-hairline pt-1">
                      &ldquo;{src.excerpt}&rdquo;
                    </p>
                  )}

                  {src.lastVerified && (
                    <div className="font-mono text-[9px] text-ink-faint flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span>Verified: {src.lastVerified}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. What Remains Uncertain */}
      <div className="border border-amber/30 bg-amber-tint p-3 font-mono text-[11px] space-y-1">
        <div className="flex items-center gap-1.5 font-semibold uppercase text-[10px] text-amber">
          <AlertTriangle className="h-3 w-3" />
          <span>What Remains Uncertain</span>
        </div>
        <p className="text-ink leading-relaxed text-[11px]">
          {context.uncertainty}
        </p>
      </div>

      {/* 5. Suggested Next Steps */}
      {context.suggestedNextSteps.length > 0 && (
        <div className="border border-hairline bg-paper p-3 space-y-2 font-mono text-[11px]">
          <span className="block font-semibold uppercase text-[10px] text-ink">
            Suggested Next Steps
          </span>
          <ul className="space-y-1 text-ink-muted">
            {context.suggestedNextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-ink font-bold">›</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Embedded Decision Receipt Toggle */}
      {context.decisionReceiptId && (
        <div className="border border-hairline bg-paper p-3 space-y-2">
          <button
            type="button"
            onClick={() => setReceiptOpen(!receiptOpen)}
            className="w-full flex items-center justify-between font-mono text-[11px] font-semibold text-ink hover:text-ink-muted transition-colors"
          >
            <span>View Demo Decision Receipt ({context.decisionReceiptId})</span>
            {receiptOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {receiptOpen && (
            <div className="pt-2 border-t border-hairline">
              <DecisionReceipt
                id={context.decisionReceiptId}
                question="Why did margin drop this week?"
                outcome={context.decisionState === "NEEDS HUMAN" ? "NEEDS HUMAN" : context.decisionState === "HELD" ? "HELD" : "ALLOWED"}
                ruleCitation={context.ruleCitation}
                ruleFloor={context.ruleFloor}
                evidence={context.sources.map((s) => ({
                  documentTitle: s.title,
                  documentId: s.id,
                  authority: s.authority,
                  lastVerified: s.lastVerified,
                  excerpt: s.excerpt,
                }))}
                unresolvedUncertainty={context.uncertainty}
                isDemo={true}
                defaultExpanded={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
