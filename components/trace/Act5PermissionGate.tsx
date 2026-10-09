'use client';

import React, { useState } from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP, MONEY } from '@/lib/content-contract';

type DecisionState = 'unresolved' | 'approving' | 'approved' | 'countered';

export function Act5PermissionGate() {
  const [decision, setDecision] = useState<DecisionState>('unresolved');
  const [marginStatus, setMarginStatus] = useState<'idle' | 'checking' | 'passed'>('idle');

  const handleSimulateApproval = () => {
    setDecision('approving');
    setMarginStatus('checking');
    setTimeout(() => {
      setDecision('approved');
      setMarginStatus('passed');
    }, 450);
  };

  const handleSimulateHold = () => {
    setDecision('countered');
    setMarginStatus('idle');
  };

  return (
    <section id="act-5" aria-labelledby="act-5-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[5]}</span>
        <span>·</span>
        <span>§21.1 Human Authority Intercept</span>
      </div>

      <h2 id="act-5-heading" className="font-serif text-2xl sm:text-3xl text-ink mb-8">
        The Permission Gate
      </h2>

      {/* Bordered Panel with 2px Amber Left Rule */}
      <div className="relative border border-hairline border-l-2 border-l-amber bg-paper p-6 sm:p-8">
        {/* Rubber Stamp Overlay */}
        {(decision === 'approved' || decision === 'countered') && (
          <div role="status" aria-live="assertive" className="absolute right-8 top-8 pointer-events-none select-none z-20 animate-stamp-land">
            <div className={`border-4 px-4 py-1 font-mono text-2xl sm:text-3xl font-extrabold uppercase tracking-widest -rotate-4 ${
              decision === 'approved' ? 'border-success text-success' : 'border-amber text-amber'
            }`}>
              {decision === 'approved' ? 'APPROVED (DEMO)' : 'HELD — COUNTER (DEMO)'}
            </div>
          </div>
        )}

        {/* Gate Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4 mb-6">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-amber font-mono text-[11px] font-medium uppercase text-amber">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse motion-reduce:animate-none" />
            HELD — AWAITING AUTHORISATION (DEMO)
          </span>
          <code className="font-mono text-xs text-ink-muted bg-ink/5 px-2 py-1">
            approvals.discount.gt(8%) &rarr; role:sales_manager
          </code>
        </div>

        {/* Ledger Incident Context */}
        <div className="font-mono text-xs text-ink-muted space-y-2 mb-8">
          <p><span className="text-ink-faint uppercase">Threshold Violation:</span> Customer requested 12.0% volume discount.</p>
          <p><span className="text-ink-faint uppercase">Autonomous Limit:</span> Policy permits up to 8.0% without executive authorization.</p>
        </div>

        {/* Honestly Named Interactive Triggers */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="button"
            onClick={handleSimulateApproval}
            className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
              decision === 'approved' || decision === 'approving' ? 'border-ink bg-ink text-paper' : 'border-ink text-ink hover:bg-ink/5'
            }`}
          >
            {decision === 'approving' ? 'Evaluating margin...' : 'Simulate approval (demo)'}
          </button>
          <button
            type="button"
            onClick={handleSimulateHold}
            className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
              decision === 'countered' ? 'border-ink bg-ink text-paper' : 'border-ink text-ink hover:bg-ink/5'
            }`}
          >
            Simulate hold (demo)
          </button>
        </div>

        {/* Deterministic State Flow: Margin Revalidation */}
        {marginStatus !== 'idle' && (
          <div className="mt-6 p-3 border border-hairline bg-paper-elevated font-mono text-xs" role="status" aria-live="polite">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="uppercase text-ink-muted font-medium">Independent Margin Evaluation:</span>
              <span className={marginStatus === 'passed' ? 'text-success font-semibold' : 'text-amber'}>
                {marginStatus === 'checking' ? 'REVALIDATING UNIT ECONOMICS...' : 'MARGIN FLOOR REVALIDATED: PASS (19.4% >= 18.0%) ✓'}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted">
              Discount approval does not bypass contribution margin safeguards. Margin verified before quotation generation.
            </p>
          </div>
        )}

        {/* Dynamic Branch Reveal */}
        {decision !== 'unresolved' && decision !== 'approving' && (
          <div className="mt-6 pt-6 border-t border-hairline font-mono text-xs text-ink">
            <span className="text-ink-muted block uppercase text-[10px] mb-2">
              Execution Log · Simulated Replay Branch
            </span>
            {decision === 'approved' ? (
              <p className="text-success">
                [SIMULATED DISPATCH] Exception approved by manager · Margin check passed. {MONEY.labels.approvedReplay}.
              </p>
            ) : (
              <p className="text-amber">
                [SIMULATED COUNTER] Policy held at 8.0%. {MONEY.labels.counterOffer} with Net-30 payment terms appended.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
