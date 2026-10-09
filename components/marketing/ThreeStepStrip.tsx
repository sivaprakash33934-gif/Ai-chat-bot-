import React from 'react';
import { THREE_STEP_OVERVIEW } from '@/lib/content-contract';

export function ThreeStepStrip() {
  return (
    <section
      aria-label="How SYNEX Works Overview"
      className="w-full border-b border-hairline bg-paper-elevated font-mono text-xs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
        {THREE_STEP_OVERVIEW.map((item) => (
          <div key={item.step} className="p-4 sm:p-5 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-ink text-sm sm:text-base tabular-nums">
                {item.step}
              </span>
              <span className="text-ink font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                {item.title}
              </span>
            </div>
            <p className="font-serif text-[13px] sm:text-xs text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
