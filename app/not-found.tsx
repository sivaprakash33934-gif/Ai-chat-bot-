import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 sm:px-10 py-16 selection:bg-ink selection:text-paper">
      <div className="w-full max-w-lg border border-hairline p-8 sm:p-12 bg-paper-elevated text-left">
        {/* Machine Status Eyebrow */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline font-mono text-[11px] text-ink-muted">
          <span className="uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" />
            404 // Trace Not Found
          </span>
          <span className="tabular-nums">REF-404-UNRESOLVED</span>
        </div>

        {/* Human Headline */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          This route has not been recorded in the ledger.
        </h1>

        <p className="mt-3 font-serif text-sm sm:text-base text-ink-muted leading-relaxed">
          The requested document, act, or operational resource does not exist within the active
          commercial perimeter. No side-effects were dispatched.
        </p>

        {/* Machine Telemetry Metadata Box */}
        <div className="mt-6 p-4 border border-hairline bg-paper font-mono text-xs text-ink-muted space-y-1">
          <div>
            <span className="text-ink-muted/60">error.code:</span>{' '}
            <span className="text-ink font-semibold">ROUTE_UNINDEXED</span>
          </div>
          <div>
            <span className="text-ink-muted/60">audit.state:</span>{' '}
            <span className="text-ink font-semibold">CLEAN (0 MUTATIONS)</span>
          </div>
          <div>
            <span className="text-ink-muted/60">gateway.authority:</span>{' '}
            <span className="text-ink font-semibold">SYNEX_ED25519_LOCAL</span>
          </div>
        </div>

        {/* Action Link Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-hairline">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-ink bg-ink text-paper px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Trace Ledger
          </Link>
          <Link
            href="/dashboard/today"
            className="inline-flex items-center justify-center border border-hairline bg-paper px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink hover:border-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            Control Center
          </Link>
        </div>
      </div>
    </div>
  );
}
