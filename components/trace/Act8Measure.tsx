import React from 'react';
import {
  ACT_LABELS,
  SAMPLE_PERIOD_FOOTNOTE,
  SAMPLE_PERIOD_LABEL,
  SIMULATED_REPLAY_CHIP,
} from '@/lib/content-contract';
import { CounterBadge } from '@/components/motion/CounterBadge';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

const LEDGER_DATA = [
  { period: 'Week 36 (Sep 01 - 07)', conversations: 312, actions: 894, computeCost: '₹131.04', quotations: 184, valueCommitted: '₹18,40,200', handoffs: 18, netMargin: '33.8%' },
  { period: 'Week 37 (Sep 08 - 14)', conversations: 384, actions: 1102, computeCost: '₹161.28', quotations: 228, valueCommitted: '₹24,19,000', handoffs: 22, netMargin: '34.2%' },
  { period: 'Week 38 (Sep 15 - 21)', conversations: 348, actions: 986, computeCost: '₹146.16', quotations: 204, valueCommitted: '₹21,80,400', handoffs: 19, netMargin: '34.0%' },
  { period: 'Week 39 (Sep 22 - 28)', conversations: 384, actions: 1130, computeCost: '₹161.28', quotations: 236, valueCommitted: '₹26,12,000', handoffs: 25, netMargin: '34.6%' },
];

export function Act8Measure() {
  return (
    <section id="act-8" aria-labelledby="act-8-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[8]}</span>
      </div>

      <h2 id="act-8-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        The Ledger
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-8">
        Strict double-entry bookkeeping applied to automated business transactions:
        every compute rupee spent maps to an auditable operational outcome.
      </p>

      {/* Double-Entry Ledger Table */}
      <div className="border border-hairline bg-paper overflow-x-auto">
        <div className="px-4 py-3 border-b border-hairline bg-paper-elevated flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted">
          <span>Operational Balance Sheet</span>
          <span className="text-amber font-semibold">[DEMO] {SAMPLE_PERIOD_LABEL}</span>
        </div>

        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-hairline bg-paper text-ink-faint text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Period</th>
              <th className="py-2.5 px-3 text-right">Inbound</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
              <th className="py-2.5 px-3 text-right">Compute Cost</th>
              <th className="py-2.5 px-3 text-right">Quotes</th>
              <th className="py-2.5 px-3 text-right">Committed Value</th>
              <th className="py-2.5 px-3 text-right">Handoffs</th>
              <th className="py-2.5 px-3 text-right">Net Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-ink">
            {LEDGER_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-paper-elevated">
                <td className="py-2 px-3 font-medium text-ink">{row.period}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{row.conversations}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{row.actions}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{row.computeCost}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink font-medium">{row.quotations}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink font-semibold">{row.valueCommitted}</td>
                <td className="py-2 px-3 text-right tabular-nums text-ink-muted">{row.handoffs}</td>
                <td className="py-2 px-3 text-right tabular-nums text-success font-medium">{row.netMargin}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-hairline border-b-[3px] border-b-ink bg-paper-elevated font-semibold text-ink">
              <td className="py-3 px-3 uppercase text-[11px]">{SAMPLE_PERIOD_LABEL} [DEMO]</td>
              <td className="py-3 px-3 text-right tabular-nums">1,428</td>
              <td className="py-3 px-3 text-right tabular-nums">4,112</td>
              <td className="py-3 px-3 text-right tabular-nums">₹599.76</td>
              <td className="py-3 px-3 text-right tabular-nums">852</td>
              <td className="py-3 px-3 text-right tabular-nums">₹90,51,600</td>
              <td className="py-3 px-3 text-right tabular-nums">84</td>
              <td className="py-3 px-3 text-right tabular-nums text-success">34.2% Avg</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-2 font-mono text-[10px] text-ink-faint">
        * {SAMPLE_PERIOD_FOOTNOTE}
      </p>

      {/* Stat Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 font-mono text-xs">
        <div className="border border-hairline p-3 bg-paper">
          <span className="block text-[10px] text-ink-faint uppercase">Conversations [DEMO]</span>
          <CounterBadge value={1428} className="text-xl font-bold text-ink" />
        </div>
        <div className="border border-hairline p-3 bg-paper">
          <span className="block text-[10px] text-ink-faint uppercase">Actions [DEMO]</span>
          <CounterBadge value={4112} className="text-xl font-bold text-ink" />
        </div>
        <div className="border border-hairline p-3 bg-paper">
          <span className="block text-[10px] text-ink-faint uppercase">Handoffs [DEMO]</span>
          <CounterBadge value={84} className="text-xl font-bold text-ink" />
        </div>
        <div className="border border-hairline p-3 bg-paper">
          <span className="block text-[10px] text-ink-faint uppercase">Compute Yield [DEMO]</span>
          <CounterBadge value={150.9} suffix="x" decimals={1} className="text-xl font-bold text-success" />
        </div>
      </div>
    </section>
  );
}
