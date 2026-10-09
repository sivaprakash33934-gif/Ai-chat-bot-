"use client";

import React from "react";
import { Clarify } from "./types";

interface ClarifyChipsProps {
  clarify?: Clarify;
  onSelect: (option: string) => void;
}

export function ClarifyChips({ clarify, onSelect }: ClarifyChipsProps) {
  if (!clarify || clarify.options.length === 0) return null;

  return (
    <div className="mt-2.5 space-y-1.5 text-left" aria-label="Clarification options">
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted block">
        {clarify.question}
      </span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={clarify.question}>
        {clarify.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="rounded-[4px] border border-hairline bg-paper px-3 py-1.5 font-sans text-[12px] text-ink transition-colors hover:border-ink/50 hover:bg-paper-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
