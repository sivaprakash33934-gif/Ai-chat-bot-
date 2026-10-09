'use client';

import React, { useState } from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP } from '@/lib/content-contract';

const ACTION_LOG = [
  { subsystem: 'Policy Re-Check', action: 'margin.recalculate', referenceId: 'RULE-04', duration: '14ms', statusCode: '200', statusText: 'PASS' },
  { subsystem: 'CRM', action: 'opportunity.create', referenceId: 'OPP-19284', duration: '210ms', statusCode: '201', statusText: 'CREATED' },
  { subsystem: 'Inventory', action: 'stock.reserve', referenceId: 'RSV-7731', duration: '88ms', statusCode: '200', statusText: 'OK' },
  { subsystem: 'Documents', action: 'quotation.generate', referenceId: 'QT-4471.pdf', duration: '1.4s', statusCode: '200', statusText: 'OK' },
  { subsystem: 'Webhook', action: 'erp.sync', referenceId: '—', duration: '3.0s', statusCode: '504', statusText: 'GATEWAY_TIMEOUT', isError: true },
  { subsystem: 'Webhook', action: 'erp.sync (retry)', referenceId: 'EVT-9912', duration: '640ms', statusCode: '200', statusText: 'OK' },
  { subsystem: 'Notify', action: 'sales.manager', referenceId: '—', duration: '120ms', statusCode: '200', statusText: 'OK' },
];

export function Act6Act() {
  const [replaying, setReplaying] = useState(false);
  const [visibleRows, setVisibleRows] = useState<number>(ACTION_LOG.length);

  const handleReplay = () => {
    if (replaying) return;
    setReplaying(true);
    setVisibleRows(0);

    ACTION_LOG.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleRows(idx + 1);
        if (idx === ACTION_LOG.length - 1) {
          setReplaying(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <section id="act-6" aria-labelledby="act-6-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
            {SIMULATED_REPLAY_CHIP}
          </span>
          <span>{ACT_LABELS[6]}</span>
        </div>
        <button
          type="button"
          onClick={handleReplay}
          disabled={replaying}
          className="px-3 py-1 border border-ink text-ink text-[10px] uppercase font-semibold hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
        >
          {replaying ? 'Replaying trace...' : 'Replay demo trace ⟳'}
        </button>
      </div>

      <h2 id="act-6-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        The Action Log
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-6">
        Every autonomous action writes an irreversible record. Mutations execute through idempotent channels.
      </p>

      {/* Margin Re-Evaluation Step Before Execution */}
      <div className="border border-hairline bg-paper-elevated p-3.5 mb-6 font-mono text-xs text-ink space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-700">Margin recalculated post-approval: 34.2% ≥ 28.0% floor → PASS → execute.</span>
          <span className="text-[10px] uppercase text-ink-muted bg-paper border border-hairline px-1.5 py-0.5 rounded">Rule RL-04</span>
        </div>
        <p className="text-[11px] text-ink-muted">Approval of one rule never bypasses another. Policy floors remain inviolate.</p>
      </div>

      {/* High-Density Action Log Table */}
      <div className="border border-hairline bg-paper overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-hairline bg-paper-elevated text-ink-faint text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Subsystem</th>
              <th className="py-2.5 px-3">Action Payload</th>
              <th className="py-2.5 px-3">Entity Ref</th>
              <th className="py-2.5 px-3 text-right">Duration</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline text-ink">
            {ACTION_LOG.slice(0, visibleRows).map((row, idx) => (
              <tr key={idx} className={row.isError ? 'border-l-2 border-l-error bg-error-surface/40' : 'hover:bg-paper-elevated'}>
                <td className="py-2.5 px-3 font-semibold text-ink">{row.subsystem}</td>
                <td className="py-2.5 px-3 text-ink-muted"><code>{row.action}</code></td>
                <td className="py-2.5 px-3 text-ink font-medium">{row.referenceId}</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-ink-muted">{row.duration}</td>
                <td className="py-2.5 px-3 text-right font-semibold tabular-nums">
                  {row.isError ? (
                    <span className="text-error">{row.statusCode} {row.statusText} ✗</span>
                  ) : (
                    <span className="text-success">{row.statusCode} {row.statusText} ✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-serif text-sm italic text-ink-muted">
        The ERP webhook timed out. SYNEX retried it. That retry is in the log too — we don&rsquo;t hide the ones that fail.
      </p>

      {/* Native "Show the Trace" Disclosure */}
      <details className="group mt-6 border border-hairline bg-paper p-4 font-mono text-xs">
        <summary className="flex cursor-pointer items-center justify-between uppercase text-ink-muted hover:text-ink">
          <span>[+] Show the Trace: HTTP Idempotency Payload Shapes</span>
          <span className="text-[10px]">§18.2 TELEMETRY</span>
        </summary>
        <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-ink-muted space-y-1">
          <p>Idempotency Key: <code>idem_sx4471_erp_01</code> · Timeout: 3000ms · Retry: backoff 450ms jitter</p>
          <p>Payload hash locked prior to transmission. Duplicate execution physically rejected at database constraint.</p>
        </div>
      </details>
    </section>
  );
}
