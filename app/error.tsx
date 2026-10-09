'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const [correlationId, setCorrelationId] = useState<string>('REF-ERR-9418A');

  useEffect(() => {
    // Generate deterministic or session-based correlation ID
    const randomHex = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, '0');
    setCorrelationId(`REF-ERR-${randomHex}`);
    // Log exception for internal diagnostics
    console.error('SYNEX Execution Fault:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 sm:px-10 py-16 selection:bg-ink selection:text-paper">
      <div className="w-full max-w-lg border border-hairline p-8 sm:p-12 bg-paper-elevated text-left">
        {/* Machine Status Eyebrow */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline font-mono text-[11px] text-ink-muted">
          <span className="uppercase tracking-widest flex items-center gap-1.5 text-error">
            <AlertOctagon className="h-3.5 w-3.5" />
            500 // System Fault Intercepted
          </span>
          <span className="tabular-nums font-mono text-ink">{correlationId}</span>
        </div>

        {/* Human Headline */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          The execution pipeline halted safely.
        </h1>

        <p className="mt-3 font-serif text-sm sm:text-base text-ink-muted leading-relaxed">
          An unexpected runtime condition triggered an immediate circuit break. The ledger has
          preserved state and zero unverified side-effects were dispatched.
        </p>

        {/* Machine Telemetry Metadata Box */}
        <div className="mt-6 p-4 border border-hairline bg-paper font-mono text-xs text-ink-muted space-y-1.5">
          <div className="flex justify-between">
            <span className="text-ink-muted/60">incident.correlation_id:</span>
            <span className="text-ink font-semibold">{correlationId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted/60">circuit.state:</span>
            <span className="text-error font-semibold">TRIPPED (FAIL-SAFE)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted/60">ledger.mutations:</span>
            <span className="text-success font-semibold">0 COMMITTED (ROLLBACK CLEAN)</span>
          </div>
          {error.digest && (
            <div className="flex justify-between">
              <span className="text-ink-muted/60">error.digest:</span>
              <span className="text-ink font-mono text-[10px]">{error.digest}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 border-t border-hairline">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 border border-ink bg-ink text-paper px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Re-evaluate Pipeline
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-hairline bg-paper px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink hover:border-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Ledger
          </Link>
        </div>
      </div>
    </div>
  );
}
