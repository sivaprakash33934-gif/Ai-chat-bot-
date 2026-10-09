import React from 'react';
import {
  MONEY,
  REPLAY_TIMELINE,
  SECURITY_AUDIT_CAPTION,
  SIMULATED_REPLAY_CHIP,
  TRACE_PLATE_CAPTION,
} from '@/lib/content-contract';

import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function TracePlate() {
  return (
    <section id="trace-plate" aria-labelledby="trace-plate-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24 print:py-6 print:border-none">
      {/* Archival Print-Grade Plate Container */}
      <StaticFirstReveal delay={0.05}>
        <div className="relative border-2 border-ink p-6 sm:p-10 bg-paper-elevated print:bg-white print:border-black print:p-0">
        {/* Corner Crop Marks */}
        <span className="absolute -top-2.5 -left-2.5 font-mono text-xs text-ink-faint select-none print:hidden">+</span>
        <span className="absolute -top-2.5 -right-2.5 font-mono text-xs text-ink-faint select-none print:hidden">+</span>
        <span className="absolute -bottom-2.5 -left-2.5 font-mono text-xs text-ink-faint select-none print:hidden">+</span>
        <span className="absolute -bottom-2.5 -right-2.5 font-mono text-xs text-ink-faint select-none print:hidden">+</span>

        <div className="border border-hairline p-5 sm:p-6 print:border-black">
          {/* Formal Engraved Header */}
          <div className="text-center border-b border-hairline pb-4 mb-6 print:border-black">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[9px] font-semibold font-mono">
                {SIMULATED_REPLAY_CHIP}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink-faint">
                Acta Non Verba · Auditum Perpetuum
              </span>
            </div>
            <h2 id="trace-plate-heading" className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink uppercase">
              The Trace Plate
            </h2>
            <p className="font-mono text-xs text-amber mt-1 tracking-wider font-medium">
              {TRACE_PLATE_CAPTION}
            </p>
          </div>

          {/* Core Telemetry Specification Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-hairline pb-4 mb-6 font-mono text-xs print:border-black">
            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Transaction ID</span>
              <span className="text-ink font-semibold">TR-4471-SX [DEMO]</span>
            </div>
            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Customer Entity</span>
              <span className="text-ink font-semibold">Senthil Traders</span>
            </div>
            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Execution Latency</span>
              <span className="text-ink font-semibold tabular-nums">6.240s Total</span>
            </div>
            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Committed Rate</span>
              <span className="text-xs text-ink font-semibold tabular-nums">{MONEY.labels.approvedReplay}</span>
            </div>
          </div>

          {/* Chronological Seconds-Scale Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline bg-paper text-ink-faint text-[10px] uppercase tracking-wider print:border-black print:bg-white">
                  <th className="py-2 px-2.5">Step</th>
                  <th className="py-2 px-2.5">Timestamp</th>
                  <th className="py-2 px-2.5">Stage</th>
                  <th className="py-2 px-2.5">Actor</th>
                  <th className="py-2 px-2.5">Action Description</th>
                  <th className="py-2 px-2.5 text-right">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline text-ink print:divide-black">
                {REPLAY_TIMELINE.map((row) => (
                  <tr key={row.step} className="hover:bg-paper">
                    <td className="py-1.5 px-2.5 font-bold text-ink-faint tabular-nums">{row.step}</td>
                    <td className="py-1.5 px-2.5 tabular-nums text-ink-muted">{row.time}</td>
                    <td className="py-1.5 px-2.5 font-semibold text-ink">{row.stage}</td>
                    <td className="py-1.5 px-2.5 text-ink-muted">{row.actor}</td>
                    <td className="py-1.5 px-2.5 text-ink font-serif text-[12px]">{row.action}</td>
                    <td className="py-1.5 px-2.5 text-right text-ink-faint text-[10px] tabular-nums">{row.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cryptographic Attestation Footer */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t-2 border-ink print:border-black font-mono text-xs">
            <div className="text-[10px] text-ink-muted space-y-0.5">
              <span className="block text-ink font-semibold uppercase tracking-wider">Simulated Attestation Ledger</span>
              <p>Merkle Block Root: <code>0xa91c44019df0814bbce128f731a</code> [DEMO]</p>
              <p>Hardware Seal: <code>Ed25519-HSM-DEPO-4-KEY-991</code> [DEMO]</p>
              <p className="text-[9px] text-amber italic mt-1">{SECURITY_AUDIT_CAPTION}</p>
            </div>
            <div className="border border-ink px-3 py-1 text-center -rotate-1 select-none">
              <span className="block text-[8px] uppercase tracking-widest text-ink-muted">Verification Status</span>
              <span className="text-xs font-bold uppercase text-ink">APPROVED · DEMO REPLAY</span>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-hairline border-b-[2px] border-b-ink flex justify-between font-mono text-xs text-ink print:border-black">
            <span className="uppercase font-semibold">End of Simulated Trace Execution</span>
            <span>Final Settlement: <strong className="tabular-nums">₹2,49,920.00</strong></span>
          </div>
        </div>
      </div>
      </StaticFirstReveal>
    </section>
  );
}
