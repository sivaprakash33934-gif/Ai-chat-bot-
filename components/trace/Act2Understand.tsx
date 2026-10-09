import React from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP } from '@/lib/content-contract';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act2Understand() {
  return (
    <section id="act-2" aria-labelledby="act-2-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[2]}</span>
      </div>

      <h2 id="act-2-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        The Parse
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-10">
        Natural language broken down into strict commercial bindings. The model does not summarize;
        it isolates typed variables against existing business schemas.
      </p>

      {/* 2-Column Visual Decomposition */}
      <StaticFirstReveal delay={0.08}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Entity Syntax Decomposition (7 Cols) */}
        <div className="lg:col-span-7 border border-hairline bg-paper p-6">
          <div className="flex items-center justify-between border-b border-hairline pb-3 mb-6 font-mono text-xs">
            <span className="uppercase text-ink-muted text-[10px] tracking-widest">Syntactic Decomposition</span>
            <span className="text-ink-faint text-[10px]">INBOUND PAYLOAD #4471</span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="block font-mono text-[10px] text-ink-faint uppercase mb-1">Raw Input Phrase</span>
              <p className="font-serif text-lg text-ink leading-relaxed">
                &ldquo;Do you have <mark className="bg-paper-elevated border border-ink text-ink font-mono text-sm px-1.5 py-0.5 rounded-sm not-italic">400 units</mark> of the <mark className="bg-paper-elevated border border-ink text-ink font-mono text-sm px-1.5 py-0.5 rounded-sm not-italic">6mm brass fitting</mark>, and what&rsquo;s your best price for a <mark className="bg-paper-elevated border border-ink text-ink font-mono text-sm px-1.5 py-0.5 rounded-sm not-italic">repeat buyer</mark>?&rdquo;
              </p>
            </div>

            <div className="border-t border-hairline pt-4 space-y-3 font-mono text-xs">
              <span className="block text-ink-faint uppercase text-[10px]">Extracted Variables</span>
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span className="text-ink-muted">target_sku:</span>
                <span className="font-semibold text-ink">6MM-BRS-FTG (IS-319 CuZn39Pb3)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span className="text-ink-muted">order_quantity:</span>
                <span className="font-semibold text-ink">400 units (4 × 100pk cartons)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span className="text-ink-muted">customer_intent:</span>
                <span className="font-semibold text-ink">REPEAT_BUYER_DISCOUNT</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-ink-muted">schema_validation:</span>
                <span className="text-success font-semibold">PASS (strict regex matched)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Context Card (5 Cols) */}
        <div className="lg:col-span-5 border border-hairline bg-paper-elevated p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono text-xs">
            <span className="uppercase text-ink-muted text-[10px] tracking-widest">Resolved Context</span>
            <span className="text-success text-[10px]">VERIFIED RECORD</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Matched Entity</span>
              <span className="text-sm font-semibold text-ink">Senthil Traders (Coimbatore)</span>
            </div>
            <div className="border-t border-hairline pt-2">
              <span className="block text-[10px] text-ink-faint uppercase">Commercial Credit Facility</span>
              <span className="text-ink">Net-30 Approved (Balance: ₹0)</span>
            </div>
            <div className="border-t border-hairline pt-2">
              <span className="block text-[10px] text-ink-faint uppercase">Fulfillment Depot</span>
              <span className="text-ink font-medium">Depot 4 (Sriperumbudur Hub)</span>
            </div>
          </div>
        </div>
      </div>
      </StaticFirstReveal>

      {/* Native "Show the Trace" Disclosure */}
      <details className="group mt-8 border border-hairline bg-paper p-5">
        <summary className="flex cursor-pointer items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted list-none select-none hover:text-ink focus:outline-none">
          <span className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-faint group-open:hidden">[+]</span>
            <span className="font-mono text-xs text-ink-faint hidden group-open:inline">[-]</span>
            <span>Show the Trace: Semantic AST &amp; Extraction Performance</span>
          </span>
          <span className="font-mono text-[10px] text-ink-faint">§15.1 AUDIT</span>
        </summary>
        <div className="mt-5 pt-4 border-t border-hairline font-mono text-xs space-y-3 text-ink">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Parse Latency</span>
              <span className="text-ink font-semibold tabular-nums">118ms</span>
              <span className="block text-[10px] text-ink-muted">Grammar extraction</span>
            </div>
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Entity Confidence</span>
              <span className="text-ink font-semibold tabular-nums">99.4% [DEMO]</span>
              <span className="block text-[10px] text-ink-muted">Simulated evaluation metric</span>
            </div>
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Deterministic Gate</span>
              <span className="text-ink font-semibold uppercase">Regex Checked</span>
              <span className="block text-[10px] text-ink-muted">Pattern [0-9]+[A-Z]+-[A-Z]+</span>
            </div>
          </div>
          <div className="p-3 bg-paper-elevated border border-hairline text-[11px] text-ink-muted">
            <span className="font-semibold text-ink uppercase">JSON Schema Signature:</span>{' '}
            <code>{`{"schema": "rfq.inbound.v2", "digest": "sha256:d8a2...31c", "strict": true}`}</code>
          </div>
        </div>
      </details>
    </section>
  );
}
