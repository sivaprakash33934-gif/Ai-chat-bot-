"use client";

import React from "react";
import { ShieldCheck, UserCheck, BookOpen } from "lucide-react";
import { Citation } from "./types";
import { CitationChips } from "./CitationChips";
import { useReducedMotion } from "./ReducedMotionCheck";

interface EvidencePanelProps {
  citations?: Citation[];
  rulesApplied?: string[];
  customerContext?: string[];
}

export function EvidencePanel({
  citations,
  rulesApplied,
  customerContext,
}: EvidencePanelProps) {
  const prefersReducedMotion = useReducedMotion();

  const hasSources = citations && citations.length > 0;
  const hasRules = rulesApplied && rulesApplied.length > 0;
  const hasContext = customerContext && customerContext.length > 0;

  if (!hasSources && !hasRules && !hasContext) return null;

  return (
    <div
      role="region"
      aria-label="Decision evidence"
      className={`mt-2 rounded-[4px] border border-hairline bg-paper-elevated p-3 text-left space-y-3 ${
        prefersReducedMotion ? "" : "animate-fadeIn"
      }`}
    >
      <div className="flex items-center justify-between border-b border-hairline pb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold">
          Decision Evidence Ledger
        </span>
        <span className="font-mono text-[9px] text-ink-muted uppercase">
          Audit Reference
        </span>
      </div>

      {/* Group 1: Sources Used */}
      {hasSources && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted font-medium">
            <BookOpen className="h-3 w-3 text-ink" aria-hidden="true" />
            <span>SOURCES USED ({citations.length})</span>
          </div>
          <CitationChips citations={citations} />
        </div>
      )}

      {/* Group 2: Rules Applied */}
      {hasRules && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted font-medium">
            <ShieldCheck className="h-3 w-3 text-ink" aria-hidden="true" />
            <span>RULES APPLIED ({rulesApplied.length})</span>
          </div>
          <ul className="space-y-1 pl-1">
            {rulesApplied.map((rule, idx) => (
              <li
                key={idx}
                className="font-mono text-[11px] text-ink bg-paper border border-hairline px-2 py-1 rounded-[3px] flex items-center gap-1.5"
              >
                <span className="text-emerald-700 font-bold">✓</span>
                <span className="truncate">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Group 3: Customer Context */}
      {hasContext && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted font-medium">
            <UserCheck className="h-3 w-3 text-ink" aria-hidden="true" />
            <span>CUSTOMER CONTEXT CONSIDERED ({customerContext.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-1">
            {customerContext.map((ctx, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] text-ink bg-paper border border-hairline px-2 py-0.5 rounded-[3px]"
              >
                {ctx}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Invariant Footer */}
      <div className="border-t border-hairline pt-1.5">
        <p className="font-mono text-[10px] text-ink-muted italic leading-snug">
          Technical reasoning stays private. This shows only decision evidence.
        </p>
      </div>
    </div>
  );
}
