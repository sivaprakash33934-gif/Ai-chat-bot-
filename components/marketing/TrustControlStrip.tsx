import React from 'react';
import { TRUST_CONTROL_ITEMS } from '@/lib/content-contract';

export function TrustControlStrip() {
  return (
    <section
      aria-label="Trust and Control Guarantees"
      className="w-full py-12 border-b border-hairline font-mono text-xs"
    >
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-ink-faint block">
          Platform Guarantees // Evidentiary &amp; Operational Controls
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {TRUST_CONTROL_ITEMS.map((card, idx) => (
          <div
            key={card.title}
            className={`border border-hairline bg-paper p-3.5 flex flex-col justify-between ${
              idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div>
              <span className="text-ink font-semibold block text-[11px] mb-0.5">
                {card.title}
              </span>
              <span className="text-[10px] text-amber font-mono block mb-2">
                ({card.subtitle})
              </span>
            </div>
            <p className="font-serif text-[11px] text-ink-muted leading-relaxed">
              {card.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
