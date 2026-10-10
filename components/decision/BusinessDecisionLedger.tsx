"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Search,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { DecisionOutcome } from "@/components/decision/DecisionReceipt";

export interface DecisionEvent {
  id: string;
  timestamp: string;
  request: string;
  relevantRuleOrEvidence: string;
  outcome: DecisionOutcome;
  recordedOutcome: string;
  isSimulated: boolean;
  actor: string;
}

const SAMPLE_DECISION_EVENTS: DecisionEvent[] = [
  {
    id: "DEC-9912",
    timestamp: "14:28 IST",
    request: "Discount 12.0% requested on 2,500 units 6mm brass rod",
    relevantRuleOrEvidence: "Rule RL-01 · Exceeded 8.0% autonomous limit",
    outcome: "HELD",
    recordedOutcome: "Intercepted by Level 2 Permission Gate",
    isSimulated: true,
    actor: "Policy Ladder Engine",
  },
  {
    id: "DEC-9911",
    timestamp: "14:16 IST",
    request: "Quotation request for 400 units combed yarn 40s",
    relevantRuleOrEvidence: "Master Price List Q4 FY26 (PRIMARY) · Tier 2 rate ₹245",
    outcome: "ALLOWED",
    recordedOutcome: "Quotation QT-9410 dispatched via Website Chat",
    isSimulated: true,
    actor: "SYNEX AI Agent",
  },
  {
    id: "DEC-9910",
    timestamp: "13:59 IST",
    request: "Buyer requested Net-45 credit term billing",
    relevantRuleOrEvidence: "Credit Policy v3.1 (§4.3) · 30-day max without board sign-off",
    outcome: "NEEDS HUMAN",
    recordedOutcome: "Escalated to Ops Lead Queue (HF-108)",
    isSimulated: true,
    actor: "Exception Router",
  },
  {
    id: "DEC-9909",
    timestamp: "13:42 IST",
    request: "Request to override customer GSTIN tax exemption",
    relevantRuleOrEvidence: "Statutory Compliance Policy · Manual GST override prohibited",
    outcome: "BLOCKED",
    recordedOutcome: "Mutation blocked by Safety Guardrail",
    isSimulated: true,
    actor: "Compliance Gate",
  },
  {
    id: "DEC-9908",
    timestamp: "11:20 IST",
    request: "Inquiry on OEKO-TEX Standard 100 Class 1 dyes",
    relevantRuleOrEvidence: "No matching documentation in grounding index",
    outcome: "NEEDS HUMAN",
    recordedOutcome: "Logged to Knowledge-Gap Inbox (KG-01)",
    isSimulated: true,
    actor: "SYNEX Retrieval Engine",
  },
];

export function BusinessDecisionLedger() {
  const [events, setEvents] = useState<DecisionEvent[]>(SAMPLE_DECISION_EVENTS);
  const [filterOutcome, setFilterOutcome] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesOutcome =
        filterOutcome === "ALL" || ev.outcome === filterOutcome;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ev.id.toLowerCase().includes(q) ||
        ev.request.toLowerCase().includes(q) ||
        ev.relevantRuleOrEvidence.toLowerCase().includes(q) ||
        ev.recordedOutcome.toLowerCase().includes(q);

      return matchesOutcome && matchesSearch;
    });
  }, [events, filterOutcome, searchQuery]);

  const getOutcomeBadge = (outcome: DecisionOutcome) => {
    switch (outcome) {
      case "ALLOWED":
        return "border-success/40 bg-emerald-50 text-success";
      case "HELD":
        return "border-amber/40 bg-amber-tint text-amber";
      case "BLOCKED":
        return "border-error/40 bg-rose-50 text-error";
      case "NEEDS HUMAN":
        return "border-amber/50 bg-amber-tint text-amber";
    }
  };

  return (
    <div className="space-y-4">
      {/* Ledger Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>Governance</span>
            <span>·</span>
            <span>Decision Event Ledger</span>
          </div>
          <h3 className="font-serif text-[20px] font-semibold text-ink mt-0.5">
            Business Decision Ledger
          </h3>
          <p className="font-sans text-[13px] text-ink-muted">
            Chronological audit of autonomous recommendations, permission holds, and human handoffs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-muted">
            [SIMULATED REPLAY DATA]
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Outcome Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
          {(["ALL", "ALLOWED", "HELD", "BLOCKED", "NEEDS HUMAN"] as const).map(
            (o) => (
              <button
                key={o}
                type="button"
                onClick={() => setFilterOutcome(o)}
                className={`rounded border px-2.5 py-1 transition-colors ${
                  filterOutcome === o
                    ? "border-ink bg-ink text-paper font-semibold"
                    : "border-hairline bg-paper text-ink-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                {o}
              </button>
            )
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search decision events..."
            className="h-8 w-64 rounded border border-hairline bg-paper-elevated pl-8 pr-3 font-mono text-[11px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto border border-hairline bg-paper-elevated">
        <table className="w-full text-left border-collapse" aria-label="Business decision ledger table">
          <thead>
            <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <th scope="col" className="px-4 py-3 font-medium">Event &amp; Time</th>
              <th scope="col" className="px-4 py-3 font-medium">Business Inquiry</th>
              <th scope="col" className="px-4 py-3 font-medium">Evidence / Rule Evaluated</th>
              <th scope="col" className="px-4 py-3 font-medium">Decision</th>
              <th scope="col" className="px-4 py-3 font-medium">Action Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline font-sans text-[13px]">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-[12px] text-ink-muted">
                  No decision events matched your filter criteria.
                </td>
              </tr>
            ) : (
              filteredEvents.map((ev) => (
                <tr key={ev.id} className="transition-colors hover:bg-paper/60">
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px]">
                    <div className="font-semibold text-ink">{ev.id}</div>
                    <div className="text-ink-muted text-[10px]">{ev.timestamp}</div>
                    <div className="text-[9px] text-ink-faint mt-0.5">{ev.actor}</div>
                  </td>
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="font-medium text-ink leading-snug">{ev.request}</p>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink-muted max-w-xs">
                    <p className="leading-snug">{ev.relevantRuleOrEvidence}</p>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[10px]">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 font-semibold uppercase ${getOutcomeBadge(
                        ev.outcome
                      )}`}
                    >
                      {ev.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink leading-snug">
                    <span>{ev.recordedOutcome}</span>
                    {ev.isSimulated && (
                      <span className="ml-1 text-[9px] text-ink-muted">(simulated)</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
