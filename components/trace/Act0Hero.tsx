import React from 'react';
import Link from 'next/link';
import {
  ACT_LABELS,
  DEMO_NOTICE,
  HERO_COPY,
  MONEY,
  SIMULATED_REPLAY_CHIP,
} from '@/lib/content-contract';

import { StaticFirstReveal } from '@/components/motion/StaticFirstReveal';

export function Act0Hero() {
  return (
    <section
      id="act-0"
      aria-labelledby="act-0-heading"
      className="relative w-full pt-16 pb-20 border-b border-hairline scroll-mt-24"
    >
      {/* Machine Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted pb-6">
        <span className="inline-block px-1.5 py-0.5 border border-amber bg-amber-tint text-amber text-[10px] font-semibold">
          {SIMULATED_REPLAY_CHIP}
        </span>
        <span>{ACT_LABELS[0]}</span>
        <span>·</span>
        <span>TRACE #SX-4471 · PILOT TENANT · 2026-09-14 21:41 IST</span>
      </div>

      {/* Business-Value First Hero H1 */}
      <h1
        id="act-0-heading"
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.12] mb-5 max-w-4xl balance-heading"
      >
        {HERO_COPY.h1}
      </h1>

      {/* Subtitle */}
      <p className="font-serif text-base sm:text-lg text-ink-muted max-w-3xl leading-relaxed mb-8 pretty-body">
        {HERO_COPY.sub}
      </p>

      {/* Dual CTAs */}
      <div className="flex flex-wrap items-center gap-4 mb-8 font-mono text-xs">
        <Link
          href="/#act-1"
          className="px-5 py-3 border border-ink bg-ink text-paper hover:bg-ink-muted transition-colors font-semibold uppercase tracking-wider focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          {HERO_COPY.exploreCta} &darr;
        </Link>
        <Link
          href="/#act-11"
          className="px-5 py-3 border border-ink bg-paper text-ink hover:bg-paper-elevated transition-colors font-semibold uppercase tracking-wider focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          {HERO_COPY.pilotCta} &rarr;
        </Link>
      </div>

      {/* Visible Demo Transparency Notice Block Directly Under CTAs */}
      <div className="mb-10 max-w-4xl border border-hairline bg-paper-elevated p-4 font-mono text-xs leading-relaxed text-ink">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-amber mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
          <span>{SIMULATED_REPLAY_CHIP} Notice</span>
        </div>
        <p className="text-ink-muted leading-relaxed">{DEMO_NOTICE}</p>
      </div>

      {/* The Sentence (Human Inquiry Quote Card - Trace Artifact) */}
      <StaticFirstReveal delay={0.1}>
        <div className="my-6 max-w-4xl border border-hairline bg-paper p-6">
          <div className="font-mono text-[10px] uppercase text-ink-faint tracking-wider mb-2">
            Initial Trace Ingestion Artifact // Inbound Customer RFQ
          </div>
          <blockquote className="hanging-quote">
            <p className="font-serif text-xl sm:text-2xl text-ink leading-snug tracking-tight">
              &ldquo;Do you have 400 units of the 6mm brass fitting, and what&rsquo;s your best price for a repeat buyer?&rdquo;
            </p>
          </blockquote>
        </div>
      </StaticFirstReveal>

      {/* Trace Summary Card */}
      <StaticFirstReveal delay={0.2}>
        <div className="mt-8 max-w-3xl border border-hairline bg-transparent p-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
            <span className="uppercase tracking-widest text-ink-muted text-[10px]">
              Execution Telemetry Summary
            </span>
            <span className="px-2 py-0.5 border border-amber text-amber text-[10px] uppercase font-semibold">
              Status: Deterministic Replay
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:border-r border-hairline sm:pr-2">
              <span className="block text-[10px] text-ink-faint uppercase">Act Sequence</span>
              <span className="text-base text-ink font-medium">11 Steps</span>
            </div>

            <div className="sm:border-r border-hairline sm:pr-2">
              <span className="block text-[10px] text-ink-faint uppercase">Execution Latency</span>
              <span className="text-base text-ink font-medium">6.2s Total</span>
            </div>

            <div className="sm:border-r border-hairline sm:pr-2">
              <span className="block text-[10px] text-ink-faint uppercase">Price Ledger</span>
              <span className="text-xs text-ink font-medium">{MONEY.labels.heroList}</span>
            </div>

            <div>
              <span className="block text-[10px] text-ink-faint uppercase">Risk Tier</span>
              <span className="text-base text-amber font-semibold">HIGH (Tier 3)</span>
            </div>
          </div>
        </div>
      </StaticFirstReveal>
    </section>
  );
}
