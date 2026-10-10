"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Key,
} from "lucide-react";

export type DecisionOutcome = "ALLOWED" | "HELD" | "BLOCKED" | "NEEDS HUMAN";

export interface DecisionSourceEvidence {
  documentTitle: string;
  documentId: string;
  authority?: "PRIMARY" | "SECONDARY";
  lastVerified?: string;
  excerpt?: string;
}

export interface DecisionReceiptProps {
  id?: string;
  timestamp?: string;
  question: string;
  evidence?: DecisionSourceEvidence[];
  ruleCitation?: string;
  ruleFloor?: string;
  outcome: DecisionOutcome;
  requiredApproval?: string;
  proposedAction?: string;
  actionStatus?: string;
  unresolvedUncertainty?: string;
  isDemo?: boolean;
  defaultExpanded?: boolean;
}

export function DecisionReceipt({
  id = "DEC-9021",
  timestamp = "Today, 14:28 IST",
  question,
  evidence = [],
  ruleCitation,
  ruleFloor,
  outcome,
  requiredApproval,
  proposedAction,
  actionStatus,
  unresolvedUncertainty,
  isDemo = true,
  defaultExpanded = false,
}: DecisionReceiptProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const outcomeColors: Record<
    DecisionOutcome,
    { border: string; bg: string; text: string; icon: React.ReactNode }
  > = {
    ALLOWED: {
      border: "border-success/40",
      bg: "bg-emerald-50",
      text: "text-success",
      icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    HELD: {
      border: "border-amber/40",
      bg: "bg-amber-tint",
      text: "text-amber",
      icon: <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    BLOCKED: {
      border: "border-error/40",
      bg: "bg-rose-50",
      text: "text-error",
      icon: <XCircle className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    "NEEDS HUMAN": {
      border: "border-amber/50",
      bg: "bg-amber-tint",
      text: "text-amber",
      icon: <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />,
    },
  };

  const currentTheme = outcomeColors[outcome] || outcomeColors["NEEDS HUMAN"];

  return (
    <div
      role="region"
      aria-label={`Decision Receipt ${id}`}
      className="border border-hairline bg-paper-elevated text-ink"
    >
      {/* Top Ledger Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline p-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
          <span className="font-semibold text-ink uppercase tracking-wider">
            Decision Receipt
          </span>
          <span className="text-ink-muted">·</span>
          <span className="text-ink-muted">ID: {id}</span>
          {isDemo && (
            <span className="border border-hairline bg-paper px-1.5 py-0.2 text-[10px] text-ink-muted">
              [DEMO]
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-ink-muted">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>{timestamp}</span>
          </span>
          <span
            className={`flex items-center gap-1 border px-2 py-0.5 font-semibold text-[10px] uppercase tracking-wider ${currentTheme.border} ${currentTheme.bg} ${currentTheme.text}`}
          >
            {currentTheme.icon}
            <span>{outcome}</span>
          </span>
        </div>
      </div>

      {/* Main Request Summary */}
      <div className="p-3.5 space-y-2">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Inquiry / Request
          </span>
          <p className="font-serif text-[14px] text-ink leading-snug mt-0.5">
            &ldquo;{question}&rdquo;
          </p>
        </div>

        {/* Compact Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-t border-hairline pt-2.5 font-mono text-[11px]">
          <div>
            <span className="block text-[10px] uppercase text-ink-faint">Rule Evaluated</span>
            <span className="text-ink font-medium truncate block">
              {ruleCitation || "Not available"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-ink-faint">Approval Requirement</span>
            <span className="text-ink font-medium truncate block">
              {requiredApproval || "Autonomous execution permitted"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-ink-faint">Action State</span>
            <span className="text-ink font-medium truncate block">
              {actionStatus || proposedAction || "None requested"}
            </span>
          </div>
        </div>

        {/* Expandable Evidence View Toggle */}
        <div className="pt-2 border-t border-hairline flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="flex items-center gap-1 font-mono text-[11px] text-ink hover:text-ink-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <span>{isExpanded ? "Hide Evidence & Grounding" : "Show Evidence & Grounding"}</span>
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <span className="font-mono text-[10px] text-ink-muted">
            {evidence.length} Grounding Source{evidence.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Expanded Grounding Ledger */}
      {isExpanded && (
        <div className="border-t border-hairline bg-paper p-3.5 space-y-3 font-sans text-[12px]">
          {/* Evidence Sources */}
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint mb-1.5">
              Verified Source Lineage
            </span>
            {evidence.length === 0 ? (
              <p className="font-mono text-[11px] text-ink-muted italic">
                No verified source documents available for this decision.
              </p>
            ) : (
              <div className="space-y-2">
                {evidence.map((src, idx) => (
                  <div
                    key={idx}
                    className="border border-hairline bg-paper-elevated p-2.5 space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 font-medium text-ink">
                        <span>{src.documentTitle}</span>
                        <span className="text-ink-faint">({src.documentId})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {src.authority && (
                          <span
                            className={`px-1.5 py-0.2 uppercase font-semibold ${
                              src.authority === "PRIMARY"
                                ? "bg-ink text-paper"
                                : "border border-hairline bg-paper text-ink-muted"
                            }`}
                          >
                            {src.authority}
                          </span>
                        )}
                        {src.lastVerified && (
                          <span className="text-ink-muted">Verified: {src.lastVerified}</span>
                        )}
                      </div>
                    </div>
                    {src.excerpt && (
                      <p className="font-mono text-[11px] text-ink-muted italic leading-relaxed pt-1">
                        &ldquo;{src.excerpt}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hard Policy & Floor Rule */}
          {(ruleCitation || ruleFloor) && (
            <div className="border border-hairline bg-paper-elevated p-2.5 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 font-semibold uppercase text-ink text-[10px] mb-1">
                <ShieldCheck className="h-3 w-3 text-ink" aria-hidden="true" />
                <span>Policy Evaluation Rule</span>
              </div>
              <div className="text-ink">{ruleCitation || "Standard Operating Policy"}</div>
              {ruleFloor && (
                <div className="text-ink-muted text-[10px] mt-0.5">
                  Hard floor constraints: {ruleFloor}
                </div>
              )}
            </div>
          )}

          {/* Missing Evidence / Uncertainty Warning if any */}
          {unresolvedUncertainty && (
            <div className="border border-amber/40 bg-amber-tint p-2.5 font-mono text-[11px] text-amber space-y-1">
              <div className="flex items-center gap-1.5 font-semibold uppercase text-[10px]">
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                <span>Missing Evidence / Safety Boundary</span>
              </div>
              <p className="text-ink leading-relaxed">{unresolvedUncertainty}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
