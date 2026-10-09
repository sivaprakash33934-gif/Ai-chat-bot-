"use client";

import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Citation } from "./types";

interface CitationChipsProps {
  citations?: Citation[];
}

export function CitationChips({ citations }: CitationChipsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-2 space-y-1.5 text-left" aria-label="Grounded citations">
      <div className="flex flex-wrap items-center gap-1.5">
        {citations.map((cite, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <button
              key={`${cite.source}-${idx}`}
              type="button"
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              aria-expanded={isExpanded}
              className={`inline-flex items-center gap-1 rounded-[4px] border px-2 py-1 font-mono text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                isExpanded
                  ? "border-ink bg-ink text-paper"
                  : "border-hairline bg-paper text-ink hover:border-ink/40"
              }`}
            >
              <FileText className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[240px]">
                SOURCE: {cite.source} · {cite.section}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-3 w-3 shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3 w-3 shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {expandedIndex !== null && citations[expandedIndex] && (
        <div className="rounded-[4px] border border-hairline bg-paper p-3 text-[12px] space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between font-mono text-[10px] text-ink-muted">
            <span>Verified Document Authority</span>
            <button
              type="button"
              onClick={() => setExpandedIndex(null)}
              className="text-ink underline hover:opacity-80"
            >
              Show less
            </button>
          </div>
          <p className="font-serif italic text-ink leading-relaxed">
            &ldquo;{citations[expandedIndex].passage}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
