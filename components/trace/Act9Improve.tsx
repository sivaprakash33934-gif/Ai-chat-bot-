'use client';

import React, { useState } from 'react';
import { ACT_LABELS, SIMULATED_REPLAY_CHIP } from '@/lib/content-contract';

export function Act9Improve() {
  const [resolvedGap, setResolvedGap] = useState(false);
  const [selectedCanonical, setSelectedCanonical] = useState<'A' | 'B' | null>(null);

  return (
    <section id="act-9" aria-labelledby="act-9-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[9]}</span>
      </div>

      <h2 id="act-9-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        Knowledge Gaps &amp; Evaluation
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-8">
        It finds its own blind spots and asks you to fix them. Rather than hallucinating plausible
        answers to ambiguous inquiries, the engine isolates unmapped queries and flags contradictory records.
      </p>

      {/* 3 Core Continuous Improvement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Item 1: Unmapped Knowledge Gap */}
        <div className="border border-hairline bg-paper p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 font-mono text-[11px]">
              <span className="text-ink font-semibold uppercase tracking-wider">01 // Unmapped Gap</span>
              <span className="text-ink-faint">CLUSTER: LOGISTICS</span>
            </div>
            <p className="font-mono text-xs text-ink font-medium bg-paper-elevated p-3 border border-hairline mb-3">
              &ldquo;Do you offer same-day dispatch to Bhiwandi logistics cluster?&rdquo;
            </p>
            <div className="space-y-1.5 font-mono text-[11px] text-ink-muted">
              <div className="flex justify-between"><span>Frequency:</span><span className="text-ink font-semibold">14 inquiries [DEMO]</span></div>
              <div className="flex justify-between"><span>Grounding:</span><span className="text-ink font-semibold uppercase">UNMAPPED</span></div>
              <p className="font-serif text-xs text-ink-muted pt-1">Zero matching policy in handbook. Handoff triggered.</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline">
            <button
              type="button" onClick={() => setResolvedGap(true)} disabled={resolvedGap}
              className={`w-full py-2 px-3 font-mono text-xs uppercase tracking-wider border transition-colors ${
                resolvedGap ? 'border-success text-success bg-paper-elevated' : 'border-ink text-ink hover:bg-ink hover:text-paper'
              }`}
            >
              {resolvedGap ? 'Rule Mapped: Bhiwandi Added ✓' : 'Map Rule / Ingest Document'}
            </button>
          </div>
        </div>

        {/* Item 2: Contradiction & Conflict Resolution on 8MM-BRS-FTG */}
        <div className="border border-hairline bg-paper p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 font-mono text-[11px]">
              <span className="text-ink font-semibold uppercase tracking-wider">02 // Corpus Conflict</span>
              <span className="text-amber font-semibold">SKU: 8MM-BRS-FTG</span>
            </div>
            <p className="font-serif text-xs text-ink-muted mb-3">
              Two indexed records disagree on baseline rate for 8mm fittings (demo SKU 6mm has zero conflicts):
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCanonical('A')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCanonical('A'); } }}
                aria-pressed={selectedCanonical === 'A'}
                className={`p-2.5 border cursor-pointer transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
                  selectedCanonical === 'A' ? 'border-ink bg-paper-elevated font-semibold' : 'border-hairline hover:bg-paper-elevated text-ink-muted'
                }`}
              >
                <div className="flex justify-between text-[10px] text-ink-faint"><span>PRICE-LIST-JUL26.PDF (Doc A)</span><span>CHUNK #0912</span></div>
                <div className="text-ink text-xs mt-1">Rate: <span className="tabular-nums font-bold">₹680.00</span> / unit</div>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCanonical('B')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCanonical('B'); } }}
                aria-pressed={selectedCanonical === 'B'}
                className={`p-2.5 border cursor-pointer transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${
                  selectedCanonical === 'B' ? 'border-ink bg-paper-elevated font-semibold' : 'border-hairline hover:bg-paper-elevated text-ink-muted'
                }`}
              >
                <div className="flex justify-between text-[10px] text-ink-faint"><span>DISPATCH-MEMO-AUG26.MD (Doc B)</span><span>CHUNK #0041</span></div>
                <div className="text-ink text-xs mt-1">Rate: <span className="tabular-nums font-bold">₹710.00</span> / unit</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline font-mono text-xs">
            <span className="block text-[10px] text-ink-faint uppercase mb-1">Conflict State</span>
            <span className="text-ink text-[11px] block">
              {selectedCanonical
                ? `Authority: Doc ${selectedCanonical} selected → Rate revalidated (${selectedCanonical === 'A' ? '₹680' : '₹710'}) → Quote cleared for dispatch ✓`
                : 'STATUS: CONFLICT FOUND · QUOTE HELD (Select Doc A or B to resolve)'}
            </span>
          </div>
        </div>

        {/* Item 3: Golden Evaluation Benchmark */}
        <div className="border border-hairline bg-paper p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 font-mono text-[11px]">
              <span className="text-ink font-semibold uppercase tracking-wider">03 // Continuous Eval</span>
              <span className="text-ink-faint">BENCHMARK: V1.4</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="block text-[10px] text-ink-faint uppercase">Golden Test Set</span>
                <span className="text-sm font-semibold text-ink tabular-nums">240 Test Cases [DEMO]</span>
              </div>
              <div className="border-t border-hairline pt-2">
                <span className="block text-[10px] text-ink-faint uppercase">Pass Accuracy Floor</span>
                <span className="text-sm font-semibold text-success tabular-nums">99.4% [DEMO]</span>
              </div>
              <div className="border-t border-hairline pt-2">
                <span className="block text-[10px] text-ink-faint uppercase">Hallucination Frequency</span>
                <span className="text-sm font-semibold text-ink tabular-nums">&lt; 0.1% [DEMO]</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-hairline font-mono text-[10px] text-ink-faint">
            Evaluations execute on PR commit before weights or rules update.
          </div>
        </div>
      </div>
    </section>
  );
}
