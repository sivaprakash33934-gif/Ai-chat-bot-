import React from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP, MONEY } from '@/lib/content-contract';
import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act7Handoff() {
  return (
    <section id="act-7" aria-labelledby="act-7-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[7]}</span>
      </div>

      <h2 id="act-7-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        Priya&rsquo;s Payload
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-8">
        When the machine halts, the human receives a decision, not a mess. The engine packages
        every relevant fact, boundary check, and unresolved commercial uncertainty into an instant dossier.
      </p>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4 font-serif text-ink leading-relaxed">
          <p className="text-base">
            Priya is the operations lead. She doesn&rsquo;t want to scroll through 40 unorganized chat messages,
            cross-reference three ERP spreadsheets, or verify whether Senthil paid his previous invoice.
          </p>
          <p className="text-sm text-ink-muted">
            She needs to know three exact things in four seconds: what the customer wants, what the rules
            allow, and why the algorithm stopped itself.
          </p>
          <div className="border-l-2 border-ink pl-4 py-1 text-xs text-ink font-mono">
            Average human review latency: <strong className="tabular-nums">8.4 seconds [DEMO]</strong>.<br />
            Context switching cost: zero.
          </div>
        </div>

        <StaticFirstReveal delay={0.1} className="lg:col-span-7">
          <div className="border border-hairline bg-paper p-5 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-hairline pb-3">
            <div>
              <span className="block font-semibold text-ink uppercase">Handoff to Priya (Ops Lead)</span>
              <span className="text-[11px] text-ink-faint">Session #SX-4471 · 21:41:03 IST</span>
            </div>
            <span className="px-2 py-0.5 border border-hairline bg-paper-elevated text-[10px] uppercase font-semibold text-ink">
              Priority: Commercial
            </span>
          </div>

          <div className="border-b border-hairline pb-3">
            <span className="block text-[10px] text-ink-faint uppercase mb-1">Inquiry Context</span>
            <p className="font-serif text-xs text-ink leading-relaxed">
              Senthil requested 400 units of 6mm brass fitting with an explicit 12.0% volume discount. Standard Net-30 payment terms verified.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="bg-paper-elevated border border-hairline p-3">
              <span className="block font-semibold text-ink text-[10px] uppercase mb-1">What AI Tried</span>
              <p className="text-ink-muted text-[11px]">Queried physical stock at Depot 4 (1,280 units). Verified zero overdue invoices. Standard policy ceiling: 8.0%.</p>
            </div>
            <div className="bg-paper-elevated border border-hairline p-3">
              <span className="block font-semibold text-ink text-[10px] uppercase mb-1">What AI Recommends</span>
              <p className="text-ink-muted text-[11px]">Option A: {MONEY.labels.counterOffer}.<br />Option B: {MONEY.labels.approvedReplay} given ₹14.2L FY25 volume.</p>
            </div>
            <div className="border-l-2 border-l-ink p-3 bg-paper border border-hairline">
              <span className="block font-bold text-ink text-[10px] uppercase mb-1">What AI is Unsure About</span>
              <p className="text-ink text-[11px]">Customer cited an alternative supplier offer. System lacks verified market spot-rate intelligence for Coimbatore cluster.</p>
            </div>
          </div>
        </div>
        </StaticFirstReveal>
      </div>

      <details className="group mt-6 border border-hairline bg-paper p-4 font-mono text-xs">
        <summary className="flex cursor-pointer items-center justify-between uppercase text-ink-muted hover:text-ink">
          <span>[+] Show the Trace: Handoff Context Serialization</span>
          <span className="text-[10px]">§19.1 SERIALIZE</span>
        </summary>
        <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-ink-muted space-y-1">
          <p>Handoff Token: <code>hnd_9921_priya_sx4471</code> · State Checksum: <code>sha256:4a02...bb18</code></p>
          <p>Session state is cryptographically signed upon transfer. Re-injection is idempotent.</p>
        </div>
      </details>
    </section>
  );
}
