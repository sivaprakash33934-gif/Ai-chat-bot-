import React from 'react';
import {
  ACT_LABELS,
  EMBEDDING_MODEL_SPEC,
  SECURITY_AUDIT_CAPTION,
  SIMULATED_REPLAY_CHIP,
} from '@/lib/content-contract';

const SOURCES = [
  {
    id: 'src-1',
    docName: 'CATALOG-2026-V4.PDF',
    chunkId: 'CHUNK #4412',
    similarity: '0.941',
    sourceType: 'INVENTORY CATALOG',
    retrievedSentence: '6mm Brass Compression Fitting, Heavy Duty Hex Body, Grade CuZn39Pb3, Thread BSPP 1/4".',
    contextText: 'Tolerance standard IS-319. Packed in cartons of 100 units. Compatible with standard pneumatic instrumentation.',
  },
  {
    id: 'src-2',
    docName: 'TIER-RATE-CARDS.XLSX',
    chunkId: 'CHUNK #0819',
    similarity: '0.887',
    sourceType: 'COMMERCIAL POLICY',
    retrievedSentence: 'Tier 2 Wholesale: Baseline discount 8.0% at MOQ 250 units.',
    contextText: 'Maximum autonomous margin concession: 8.0%. Quotations exceeding 8.0% discount require Level 2 executive approval.',
  },
  {
    id: 'src-3',
    docName: 'CREDIT-TERMS-SENTHIL.MD',
    chunkId: 'CHUNK #0104',
    similarity: '0.912',
    sourceType: 'CUSTOMER RECORD',
    retrievedSentence: 'Senthil Traders: Verified repeat commercial account, Net-30 approved, FY25 volume: ₹14.2L.',
    contextText: 'Account verified since 2021. GSTIN: 33AAAAA0000A1Z5. Credit limit: ₹5,00,000. Outstanding balance: ₹0.',
  },
];

import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act1Know() {
  return (
    <section id="act-1" aria-labelledby="act-1-heading" className="relative w-full py-16 border-b border-hairline scroll-mt-24">
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-4">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[1]}</span>
      </div>

      <h2 id="act-1-heading" className="font-serif text-2xl sm:text-3xl text-ink tracking-tight mb-3">
        The Grounding Ledger
      </h2>
      <p className="font-serif text-base text-ink-muted max-w-3xl mb-10">
        Grounding is not an embedding search. It is an evidentiary audit. Before formulating any reply,
        the engine isolates authoritative enterprise records and proves source lineage.
      </p>

      {/* 3 Source Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SOURCES.map((src, idx) => (
          <StaticFirstReveal key={src.id} delay={idx * 0.08} className="h-full">
            <div className="border border-hairline bg-paper p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 font-mono text-[11px]">
                  <span className="text-ink font-semibold">{src.docName}</span>
                  <span className="text-ink-muted">{src.chunkId}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="text-[10px] uppercase text-ink-faint tracking-wider">{src.sourceType}</span>
                  <span className="text-ink font-medium tabular-nums">Cosine: {src.similarity}</span>
                </div>
                <blockquote className="border-l-2 border-ink pl-3 py-1 my-3 bg-paper-elevated font-mono text-xs text-ink leading-relaxed">
                  &ldquo;{src.retrievedSentence}&rdquo;
                </blockquote>
                <p className="font-serif text-xs leading-relaxed text-ink-muted">{src.contextText}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-hairline font-mono text-[10px] text-ink-faint flex items-center justify-between">
                <span>SHA-256 (simulated) [DEMO]</span>
                <span>INDEX: SY-CORP-V1</span>
              </div>
            </div>
          </StaticFirstReveal>
        ))}
      </div>

      {/* Native "Show the Trace" Disclosure */}
      <details className="group mt-8 border border-hairline bg-paper p-5">
        <summary className="flex cursor-pointer items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted list-none select-none hover:text-ink focus:outline-none">
          <span className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-faint group-open:hidden">[+]</span>
            <span className="font-mono text-xs text-ink-faint hidden group-open:inline">[-]</span>
            <span>Show the Trace: Grounding Telemetry &amp; RAG Parameters</span>
          </span>
          <span className="font-mono text-[10px] text-ink-faint">§14.3 AUDIT</span>
        </summary>
        <div className="mt-5 pt-4 border-t border-hairline font-mono text-xs space-y-3 text-ink">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Embedding Model</span>
              <span className="text-ink font-medium">bge-large-en-v1.5</span>
              <span className="block text-[10px] text-ink-muted tabular-nums">1,024 dimensions</span>
            </div>
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Retrieval Top-K</span>
              <span className="text-ink font-medium tabular-nums">K = 3</span>
              <span className="block text-[10px] text-ink-muted tabular-nums">From 18 candidate chunks</span>
            </div>
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Similarity Cutoff</span>
              <span className="text-ink font-medium tabular-nums">&ge; 0.780</span>
              <span className="block text-[10px] text-ink-muted tabular-nums">Min observed: 0.887</span>
            </div>
            <div className="border border-hairline p-3">
              <span className="block text-[10px] text-ink-faint uppercase">Rerank Latency</span>
              <span className="text-ink font-medium tabular-nums">42.1ms</span>
              <span className="block text-[10px] text-ink-muted">Cross-encoder validation</span>
            </div>
          </div>
          <div className="p-3 bg-paper-elevated border border-hairline text-[11px] text-ink-muted space-y-1">
            <div>
              <span className="font-semibold text-ink uppercase">Model Engine:</span>{' '}
              <span>{EMBEDDING_MODEL_SPEC}</span>
            </div>
            <div>
              <span className="font-semibold text-ink uppercase">Tenant Partition:</span>{' '}
              <code>tenant:pilot-tenant:production:corpus-41a</code> · Zero cross-tenant index contamination verified.
            </div>
            <p className="text-[10px] text-amber italic pt-1">{SECURITY_AUDIT_CAPTION}</p>
          </div>
        </div>
      </details>
    </section>
  );
}
