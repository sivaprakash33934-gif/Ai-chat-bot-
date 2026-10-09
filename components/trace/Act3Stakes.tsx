import React from 'react';
import { ACT_LABELS, COUNTERFACTUAL_TIMELINE, MONEY } from '@/lib/content-contract';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act3Stakes() {
  return (
    <section
      id="act-3"
      aria-labelledby="act-3-heading"
      className="relative w-full bg-ink text-paper py-20 px-6 sm:px-12 my-12 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Machine Eyebrow with Story Header Chip */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-paper/70 mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-block px-1.5 py-0.5 border border-amber/40 bg-amber/10 text-amber text-[10px] font-semibold">
            [COUNTERFACTUAL — WITHOUT SYNEX]
          </span>
          <span className="text-paper/40">·</span>
          <span>{ACT_LABELS[3]}</span>
          <span className="text-paper/40">·</span>
          <span>Manual Baseline Analysis</span>
        </div>

        {/* Headline */}
        <h2
          id="act-3-heading"
          className="font-serif text-3xl sm:text-4xl text-paper leading-tight mb-4 max-w-2xl"
        >
          The money isn&rsquo;t lost in the sale. It&rsquo;s lost in the gap.
        </h2>

        <p className="font-mono text-xs text-paper/60 mb-10 max-w-2xl">
          Historical baseline trace illustrating what routinely occurs when commercial inquiries wait for manual morning triage.
        </p>

        {/* Day-Scale Ledger Entries with Dot Leaders */}
        <StaticFirstReveal delay={0.1}>
          <div className="border-t border-paper/15 pt-6 space-y-5 font-mono text-xs sm:text-sm">
          {COUNTERFACTUAL_TIMELINE.map((item, idx) => (
            <div key={idx} className="flex items-baseline justify-between gap-2">
              <span className={`shrink-0 font-semibold ${idx === 0 ? 'text-amber' : 'text-paper/60'}`}>
                {item.time}
              </span>
              <span className="text-paper/85 shrink-0">{item.label}</span>
              <span className="flex-1 border-b border-dotted border-paper/25 mx-2 relative top-[-4px]" aria-hidden="true" />
              <span className="text-paper/40 text-right shrink-0">{item.detail}</span>
            </div>
          ))}

          {/* Consequence Ledger Line with Exact Contract Label */}
          <div className="mt-8 pt-4 border-t border-paper/15 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-amber font-mono">
            <span className="font-semibold shrink-0">Day 1 · 21:58 IST (T+24h 17m)</span>
            <span className="flex-1 text-right font-semibold text-xs sm:text-sm">
              {MONEY.labels.counterfactualLost}
            </span>
          </div>
        </div>
        </StaticFirstReveal>
      </div>
    </section>
  );
}
