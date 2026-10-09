import React from "react";

interface SuggestedChipsProps {
  onSelect: (prompt: string) => void;
}

const CHIPS: string[] = [
  "Price for 400 units of 6mm brass?",
  "Is stock available today?",
  "Where is my order?",
  "Talk to a human",
];

export function SuggestedChips({ onSelect }: SuggestedChipsProps) {
  return (
    <div className="flex flex-col gap-1.5 pt-1" aria-label="Suggested questions">
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        Suggested prompts
      </span>
      <div className="flex flex-wrap gap-1.5">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSelect(chip)}
            className="rounded-[4px] border border-hairline bg-paper px-2.5 py-1.5 text-left font-sans text-[12px] text-ink transition-colors hover:border-ink/40 hover:bg-paper-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-1"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
