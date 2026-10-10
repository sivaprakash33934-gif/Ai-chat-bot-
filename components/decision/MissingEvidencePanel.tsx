"use client";

import React from "react";
import {
  HelpCircle,
  FileSearch,
  BookOpen,
  UserCheck,
  PauseCircle,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";

export interface MissingEvidencePanelProps {
  question: string;
  missingInformation: string[];
  checkedSources?: { title: string; id: string; status: string }[];
  onAddKnowledge?: () => void;
  onAskHuman?: () => void;
  onHoldAction?: () => void;
  isDemo?: boolean;
}

export function MissingEvidencePanel({
  question,
  missingInformation,
  checkedSources = [],
  onAddKnowledge,
  onAskHuman,
  onHoldAction,
  isDemo = true,
}: MissingEvidencePanelProps) {
  return (
    <div
      role="region"
      aria-label="Missing Evidence & Uncertainty Safety State"
      className="border border-hairline border-l-4 border-l-amber bg-paper-elevated p-5 text-ink space-y-4"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-[17px] font-semibold text-ink">
            Deliberate Safety Halt — Insufficient Evidence
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isDemo && (
            <span className="border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] text-ink-muted">
              [SIMULATED REPLAY]
            </span>
          )}
          <span className="border border-amber/30 bg-amber-tint px-2 py-0.5 font-mono text-[10px] uppercase font-semibold text-amber">
            Evidence Sufficiency Check Active
          </span>
        </div>
      </div>

      {/* Explanation Banner */}
      <p className="font-sans text-[13px] text-ink-muted leading-relaxed">
        SYNEX was asked a business question for which verified source documentation is incomplete.
        Rather than estimating, approximating, or guessing, the assistant held the request and
        documented the missing data points below.
      </p>

      {/* Inquired Question */}
      <div className="border border-hairline bg-paper p-3 space-y-1">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          Unanswered Business Inquiry
        </span>
        <p className="font-serif text-[14px] font-medium text-ink">
          &ldquo;{question}&rdquo;
        </p>
      </div>

      {/* Missing Information Points */}
      <div className="space-y-2">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          Required Data Points Not Grounded in Approved Corpus
        </span>
        <ul className="space-y-1.5 font-mono text-[11px]">
          {missingInformation.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 border border-hairline bg-paper p-2 text-ink"
            >
              <span className="text-amber font-bold">!</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Checked Documents Lineage */}
      {checkedSources.length > 0 && (
        <div className="space-y-2">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Sources Inspected (No Match or Outdated)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            {checkedSources.map((src, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border border-hairline bg-paper p-2 text-ink"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <FileSearch className="h-3 w-3 text-ink-muted shrink-0" aria-hidden="true" />
                  <span className="truncate">{src.title}</span>
                </div>
                <span className="text-[10px] text-ink-muted shrink-0 ml-2">
                  [{src.status}]
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operator Recommended Actions */}
      <div className="border-t border-hairline pt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-ink-faint">
          Operator Next Steps:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {onHoldAction && (
            <button
              type="button"
              onClick={onHoldAction}
              className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-3 py-1 font-mono text-[11px] text-ink hover:border-ink/40 transition-colors"
            >
              <PauseCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Hold Transaction</span>
            </button>
          )}
          {onAskHuman && (
            <button
              type="button"
              onClick={onAskHuman}
              className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-3 py-1 font-mono text-[11px] text-ink hover:border-ink/40 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Escalate to Human</span>
            </button>
          )}
          {onAddKnowledge && (
            <button
              type="button"
              onClick={onAddKnowledge}
              className="inline-flex items-center gap-1.5 rounded border border-ink bg-ink px-3 py-1 font-mono text-[11px] font-semibold text-paper hover:bg-ink/90 transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Add Document Grounding</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
