import { Citation, Clarify, ActionData, HandoffData } from "@/components/chat/types";

export interface CannedResponse {
  text: string;
  citations: Citation[];
  clarify?: Clarify;
  action?: ActionData;
  handoff?: HandoffData;
  isPermissionDenied?: boolean;
  rulesApplied?: string[];
  customerContext?: string[];
}

export function simulateActionOutcome(): {
  status: "succeeded" | "failed" | "unknown";
  errorMessage?: string;
} {
  const rand = Math.random();
  if (rand < 0.7) {
    return { status: "succeeded" };
  } else if (rand < 0.8) {
    return {
      status: "failed",
      errorMessage: "Action failed: CRM timeout after 5000ms (demo)",
    };
  } else {
    return {
      status: "unknown",
      errorMessage: "Action status unknown — cannot confirm success",
    };
  }
}

export function matchCannedResponse(query: string): CannedResponse {
  const q = query.toLowerCase().trim();

  // Addendum D: Permission Denied Route
  if (
    q.includes("delete my account") ||
    q.includes("delete account") ||
    q.includes("change pricing") ||
    q.includes("change price")
  ) {
    return {
      text: "This action requires Owner permission and cannot be executed in demo mode. Contact your admin.",
      citations: [],
      isPermissionDenied: true,
    };
  }

  // Action route: Create lead
  if (q.includes("create a lead") || q.includes("create lead")) {
    return {
      text: "I can prepare a verified lead record for our sales team. Please confirm the details below:",
      citations: [],
      action: {
        id: `act-${Date.now()}`,
        actionType: "create_lead",
        title: "Create CRM Commercial Lead",
        fields: [
          { label: "Contact", value: "Priya Sundaram" },
          { label: "Email", value: "priya@precisiontools.in" },
          { label: "Company", value: "Precision Tools Coimbatore" },
          { label: "Intent", value: "Bulk 6mm Brass Rod Supply" },
        ],
        status: "pending_confirmation",
        retryCount: 0,
      },
    };
  }

  // Action route: Book appointment
  if (q.includes("book an appointment") || q.includes("appointment") || q.includes("book")) {
    return {
      text: "I can schedule an operations consultation call for you. Please confirm the details below:",
      citations: [],
      action: {
        id: `act-${Date.now()}`,
        actionType: "book_appointment",
        title: "Schedule Operations Consultation",
        fields: [
          { label: "Account", value: "Commercial Account (Guest)" },
          { label: "Topic", value: "Volume Pricing & Net-30 Approval" },
          { label: "Slot", value: "Tomorrow, 11:30 AM IST" },
        ],
        status: "pending_confirmation",
        retryCount: 0,
      },
    };
  }

  // Handoff route
  if (q.includes("talk to a human") || q.includes("human") || q.includes("agent") || q.includes("person")) {
    return {
      text: "I've escalated your conversation directly to our operations desk. A human specialist is reviewing your context.",
      citations: [],
      handoff: {
        assignedTo: "Priya (Senior Operations Lead)",
        customer: "Commercial Buyer (Guest)",
        intent: "High-Touch Pricing & Sourcing Escalation",
        summary: [
          "Inquired regarding 400 units of 6mm brass rod",
          "Requested verified delivery freight timeline",
          "Requested human operator handoff",
        ],
        sources: ["PRICE-LIST-2026.pdf", "LOGISTICS-TARIFF-TN.pdf"],
      },
    };
  }

  // Price route
  if (q.includes("price") || q.includes("400") || q.includes("brass") || q.includes("cost") || q.includes("quote")) {
    return {
      text: "For 400 units of 6mm brass rod, your unit price is ₹245 (Tier 2 volume pricing for 250–500 units). Subtotal is ₹98,000 before logistics and GST (18%). Verified accounts qualify for Net-30 payment terms.",
      citations: [
        {
          source: "PRICE-LIST-2026.pdf",
          section: "Tier 2 Commercial Vol.",
          passage:
            "6mm Brass Rod (Grade C3604): 1–249 units @ ₹265/unit. 250–500 units (Tier 2) @ ₹245/unit. 500+ units (Tier 3) @ ₹228/unit. GST 18% extra.",
        },
        {
          source: "TERMS-CREDIT-POLICY.pdf",
          section: "§3.2 Payment Terms",
          passage:
            "Registered commercial accounts with verified GSTIN and positive credit history qualify for Net-30 billing cycle upon order dispatch.",
        },
      ],
      clarify: {
        question: "Which city should I calculate delivery for?",
        options: ["Chennai", "Mumbai", "Delhi", "Coimbatore"],
      },
      rulesApplied: [
        "Rule RL-01: Tier 2 volume discount ceiling (8.0%)",
        "Rule RL-03: Max credit terms (Net-30)",
      ],
      customerContext: [
        "Account: Precision Tools Coimbatore",
        "Order history: Tier 1 buyer",
        "Payment record: Zero default",
      ],
    };
  }

  // Clarify selection response (City delivery follow-up)
  if (q === "chennai" || q === "mumbai" || q === "delhi" || q === "coimbatore" || q.includes("delivery for")) {
    const city = q.charAt(0).toUpperCase() + q.slice(1);
    return {
      text: `Surface freight to ${city} is estimated at ₹2,800 with 2–3 business days transit from our Coimbatore warehouse. Estimated total with freight: ₹1,00,800 (+ 18% GST).`,
      citations: [
        {
          source: "LOGISTICS-TARIFF-TN.pdf",
          section: "Inter-State Surface Hubs",
          passage:
            "Standard pallet dispatch under 500kg to Tier 1 metro hubs: ₹2,800 flat base freight rate via VRL Logistics network.",
        },
      ],
      rulesApplied: ["Rule RL-05: Standard regional tariff matrix"],
      customerContext: [`Selected destination: ${city}`],
    };
  }

  // Stock route
  if (q.includes("stock") || q.includes("available") || q.includes("inventory")) {
    return {
      text: "6mm brass rods currently have 1,420 units in verified physical stock at the Coimbatore Central Warehouse. 1,200 units are available to promise immediately with 24-hour dispatch readiness.",
      citations: [
        {
          source: "WAREHOUSE-STOCK-FEED.json",
          section: "Location TN-COI-01",
          passage:
            "SKU BRASS-6MM-ROD: 1,420 units on physical hand. Reserved: 220 units. Available to promise: 1,200 units. Quality check verified Oct 7.",
        },
      ],
      rulesApplied: ["Rule RL-04: Grounding confidence threshold >85%"],
      customerContext: ["Warehouse zone: Coimbatore Central Depot"],
    };
  }

  // Order status route
  if (q.includes("order") || q.includes("where is") || q.includes("track") || q.includes("status")) {
    return {
      text: "Order #PO-88219 was handed over to VRL Surface Logistics on Oct 6. Tracking docket #VRL-99214 indicates current in-transit status with delivery scheduled today by 4:00 PM.",
      citations: [
        {
          source: "DISPATCH-LOG-OCT.csv",
          section: "Row 88219 (VRL)",
          passage:
            "Waybill #VRL-99214. Carrier: VRL Surface Logistics. Consignee: Coimbatore Fasteners. Status: Out for delivery.",
        },
      ],
      rulesApplied: ["Rule RL-02: Tracking retrieval bound to active customer GSTIN"],
      customerContext: ["Consignee: Coimbatore Fasteners", "Carrier: VRL Surface Logistics"],
    };
  }

  // Honest unknown fallback
  return {
    text: "I don't have verified info on that in this demo. Try a question about pricing, stock, or order status.",
    citations: [],
  };
}
