'use client';

import React, { useState } from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP } from '@/lib/content-contract';

const PAUSED_SIMULATION: Record<number, number> = {
  5: 24, 6: 18, 7: 12, 8: 7, 9: 5, 10: 4, 11: 3, 12: 2, 13: 1, 14: 1, 15: 0,
};

export function Act4Reason() {
  const [discountLimit, setDiscountLimit] = useState<number>(8);
  const pausedCount = PAUSED_SIMULATION[discountLimit] ?? 7;
  const isGateTriggered = 12.0 > discountLimit;

  return (
    <section id="act-4" aria-labelledby="act-4-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[4]}</span>
      </div>

      <h2 id="act-4-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        Policy Evaluation
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-8">
        Reasoning is a chain of deterministic gates, not LLM guesswork. Every parameter is checked
        against hard limits before a single rupee or inventory unit is committed.
      </p>

      {/* Source Authority Revalidation Note */}
      <div className="border border-hairline bg-paper p-3 mb-6 font-mono text-xs text-ink flex items-center justify-between">
        <span className="text-ink-muted">Authority Verification:</span>
        <span className="font-medium text-ink">Source authority check: TIER-RATE-CARDS.XLSX (PRIMARY) selected per knowledge priority; price revalidated before commitment.</span>
      </div>

      {/* Interactive Rule Preview Slider */}
      <div className="border border-hairline bg-paper-elevated p-4 mb-6 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-hairline pb-2 mb-3">
          <span className="uppercase text-ink font-semibold tracking-wider text-[11px]">Policy Simulation · discount_max</span>
          <span className="text-ink-muted text-[11px]">Current Floor: <strong className="text-ink tabular-nums">{discountLimit}.0%</strong></span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-ink-faint">5%</span>
            <input
              type="range" min="5" max="15" step="1" value={discountLimit}
              onChange={(e) => setDiscountLimit(Number(e.target.value))}
              aria-label="Max Discount Threshold"
              className="w-full h-1.5 bg-paper border border-hairline accent-ink cursor-pointer"
            />
            <span className="text-[11px] text-ink-faint">15%</span>
          </div>
          <p className="text-[11px] text-ink">
            At <strong className="tabular-nums">{discountLimit}%</strong>, SYNEX pauses <strong className="tabular-nums">{pausedCount}</strong> of 100 sample orders.
          </p>
        </div>
      </div>

      {/* Vertical Rule Execution Ladder */}
      <div className="border border-hairline bg-paper divide-y divide-hairline font-mono text-xs">
        {/* Rule 01 */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper-elevated">
          <div>
            <span className="text-ink-faint text-[10px] uppercase">Rule 01 // </span>
            <code className="text-ink font-semibold">stock.available(6MM-BRS-FTG) &gt;= 400</code>
            <p className="text-ink-muted text-[11px] mt-0.5">Depot 4 physical: 1,280 units · Min buffer: 200 units.</p>
          </div>
          <span className="px-2 py-0.5 border border-success text-success text-[10px] uppercase font-bold self-start sm:self-auto">PASS</span>
        </div>

        {/* Rule 02 */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper-elevated">
          <div>
            <span className="text-ink-faint text-[10px] uppercase">Rule 02 // </span>
            <code className="text-ink font-semibold">account.credit_standing == APPROVED</code>
            <p className="text-ink-muted text-[11px] mt-0.5">Limit: ₹5,00,000 · Overdue: ₹0 · Net-30 verified.</p>
          </div>
          <span className="px-2 py-0.5 border border-success text-success text-[10px] uppercase font-bold self-start sm:self-auto">PASS</span>
        </div>

        {/* Rule 03 */}
        <div className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isGateTriggered ? 'border-l-4 border-l-amber bg-amber-tint' : 'border-l-4 border-l-success bg-paper-elevated'}`}>
          <div>
            <span className={`text-[10px] font-bold uppercase ${isGateTriggered ? 'text-amber' : 'text-success'}`}>Rule 03 · The Hinge // </span>
            <code className={`font-bold ${isGateTriggered ? 'text-amber' : 'text-ink'}`}>request.discount(12.0%) &gt; policy.max_autonomous({discountLimit}.0%)</code>
            <p className="text-ink text-[11px] font-medium mt-0.5">Requested 12.0% (₹2,49,920). Max autonomous limit: {discountLimit}.0%.</p>
          </div>
          <span className={`px-2 py-0.5 border text-[10px] uppercase font-bold self-start sm:self-auto ${isGateTriggered ? 'border-amber text-amber bg-paper' : 'border-success text-success bg-paper'}`}>
            {isGateTriggered ? 'HALT · GATE TRIGGERED' : 'PASS · WITHIN POLICY'}
          </span>
        </div>

        {/* Rule 04: Margin Safeguard */}
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper">
          <div>
            <span className="text-ink-faint text-[10px] uppercase">Rule 04 // </span>
            <code className="text-ink-muted">margin.floor(quote) &gt;= 28.0%</code>
            <p className="text-ink-faint text-[11px] mt-0.5">Evaluation deferred pending executive authorization at Act 5 Permission Gate.</p>
          </div>
          <span className="px-2 py-0.5 border border-hairline text-ink-muted text-[10px] uppercase font-semibold self-start sm:self-auto">PENDING</span>
        </div>
      </div>

      {/* AST Disclosure */}
      <details className="group mt-6 border border-hairline bg-paper p-4 font-mono text-xs">
        <summary className="flex cursor-pointer items-center justify-between uppercase text-ink-muted hover:text-ink">
          <span>[+] Show the Trace: Policy Engine AST &amp; Evaluation Log</span>
          <span className="text-[10px]">§16.4 AUDIT</span>
        </summary>
        <div className="mt-4 pt-3 border-t border-hairline space-y-2 text-[11px] text-ink-muted">
          <p>AST Evaluation Time: 1.2ms · Deterministic rule compiler pass</p>
          <p>Rule Tree Hash: <code>0x7f4a...92b1</code> · Cryptographic pre-check state</p>
        </div>
      </details>
    </section>
  );
}
