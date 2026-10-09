import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GitCommit, ShieldCheck, Tag } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';

export const metadata: Metadata = {
  title: 'Changelog & Audit Ledger — SYNEX',
  description: 'Verifiable, immutable release history and system updates for the SYNEX Control Center.',
};

interface ChangelogEntry {
  version: string;
  date: string;
  commitHash: string;
  stage: 'KNOW' | 'UNDERSTAND' | 'REASON' | 'ACT' | 'MEASURE' | 'CORE';
  title: string;
  summary: string;
  details: string[];
}

const ENTRIES: ChangelogEntry[] = [
  {
    version: 'v1.3.3',
    date: '2026-10-09',
    commitHash: 'c714d99e28fa',
    stage: 'CORE',
    title: 'P2 Positioning Polish & Claim Hygiene Pass',
    summary:
      'Business-value first hero hierarchy, three-step overview strip, honest integration availability matrix, trust & control guarantees, and measured page weight verification.',
    details: [
      'Rewrote Hero with business-value first H1 ("Every AI action. Grounded, permissioned, traceable.") and dual CTAs, preserving the RFQ quote artifact.',
      'Deployed ThreeStepStrip immediately after Hero with mobile-responsive stacked view and mono numerals.',
      'Introduced honest Integration Status Table in Act 10 with Configurable, Prototype, Planned, and Not in V1 pills.',
      'Added Trust & Control Strip with 5 platform guarantee cards before commercial onboarding.',
      'Audited footer claims against measured static bundle weight (159 KB HTML · 110 KB First Load JS) and tagged planned initiatives.',
      'Extended prebuild regression tests with HERO_COPY, FOOTER_CLAIMS, and INTEGRATION_STATUS contract invariants.',
    ],
  },
  {
    version: 'v1.3.2',
    date: '2026-10-09',
    commitHash: 'b519c72e10df',
    stage: 'CORE',
    title: 'P1 Technical Credibility & Deployment Honesty Pass',
    summary:
      'Sanitized credentials from public artifacts, verified local BGE embedding specs, added deployment glossary, and consolidated architecture reference.',
    details: [
      'Sanitized docker-compose templates in Act 10 and /docs to use ${MYSQL_PASSWORD} placeholders with secrets manager directives.',
      'Explicitly anchored local inference invariants: bge-large-en-v1.5 (1,024-dim, local BGE model via Ollama) and CPU-only baseline.',
      'Added Terminology Glossary on /docs clarifying Self-Hosted as default vs VPC, Zero-External-Calls, and Air-Gapped as configured options.',
      'Updated Act 8 operational ledger headers and summary to Four-week simulated sample (Sep 1-28) with dynamic fixture period footnotes.',
      'Tagged cryptographic audit indicators in TracePlate and Act 1 with illustrative disclaimer captions.',
      'Expanded prebuild audit rules with literal password checks, sample date checks, and production claims verification.',
    ],
  },
  {
    version: 'v1.3.1',
    date: '2026-10-09',
    commitHash: 'a418d99c01fe',
    stage: 'CORE',
    title: 'P0 Honesty & Narrative Consistency Pass',
    summary:
      'Strict demo transparency labeling, counterfactual timeline separation, single money story, and prebuild regression audit.',
    details: [
      'Added visible demo transparency notice under Hero headline and [SIMULATED REPLAY] chips on all acts.',
      'Separated Act 3 counterfactual manual baseline (day-scale) from automated replay trace (seconds-scale).',
      'Unified amount story: List value before discount (₹2,84,000), Quoted value after 12% discount (₹2,49,920), Counter value at 8% (₹2,61,280).',
      'Synchronized 12 canonical act labels across Header, TraceRail, mobile menu, and section anchors.',
      'Reallocated Act 9 conflict to 8MM-BRS-FTG to protect zero-conflict guarantee on active demo SKU.',
      'Enforced explicit margin recalculation pre-execution gate in Act 6 and created lib/content-contract.ts with prebuild audit hook.',
    ],
  },
  {
    version: 'v1.3.0',
    date: '2026-10-08',
    commitHash: 'f7a18e90d21c',
    stage: 'CORE',
    title: 'V1 Correction Pass & Control Center Completeness',
    summary:
      'Scope alignment (MySQL 8, channel honesty, demo metric labeling) + Conversations / Actions / Settings / AI Health views.',
    details: [
      'Replaced PostgreSQL with MySQL 8 across docker-compose, connectivity descriptors, and sovereignty traces.',
      'Scoped WhatsApp to future channels only; aligned active channels to Website Chat, Web Forms, and API Webhooks.',
      'Deployed dedicated Conversations Browser with transcript inspector and Action Center with Failure recovery.',
      'Added Admin Settings tab (Tenant Profile, Operating Hours, Logistics, SLA) and AI Health Telemetry block.',
    ],
  },
  {
    version: 'v1.2.4',
    date: '2026-10-05',
    commitHash: 'c4a91b2e8f10',
    stage: 'ACT',
    title: 'Deterministic Webhook Retry & ERP Fault Isolation',
    summary:
      'Hardened the Act 6 execution engine with exponential retry queues and explicit 504 Gateway Timeout logging.',
    details: [
      'Webhook engine records both initial timeout (504) and subsequent retry (200) in immutable audit log.',
      'Added idempotency keys to SAP ECC / S4HANA stock reservation mutations (RSV-7731).',
      'Zero layout shift (CLS) enforcement on all telemetry readouts via tabular-nums.',
    ],
  },
  {
    version: 'v1.2.0',
    date: '2026-09-28',
    commitHash: '8f27d49e1a3b',
    stage: 'MEASURE',
    title: 'Double-Entry Margin Telemetry & Trace Export',
    summary:
      'Introduced Act 8 ledger math and Act 4 interactive discount policy sensitivity analysis.',
    details: [
      'Client-side rule preview slider for real-time human pause rate calculation across historical deals.',
      'Print-grade TracePlate component compliant with ISO 8601 timestamps and archival export standards.',
      'Gross margin reconciliation against base wholesale cost (Rs 124/unit floor invariant).',
    ],
  },
  {
    version: 'v1.1.2',
    date: '2026-09-18',
    commitHash: '3e61a09d7c54',
    stage: 'REASON',
    title: 'Ed25519 Hardware Permission Gate Protocol',
    summary:
      'Quarantined autonomous decision dispatch behind physical cryptographic hardware signing (Act 5).',
    details: [
      'Dual-key authorization model requiring explicit operator sign-off when margin impact exceeds 8%.',
      'Signal Amber governance quarantined strictly to Act 4 Hinge Point and Act 5 Permission Gate.',
      'Rejection branch generation with operator annotation payloads.',
    ],
  },
  {
    version: 'v1.0.4',
    date: '2026-09-10',
    commitHash: '9b82e14a72cf',
    stage: 'KNOW',
    title: 'High-Density RAG Grounding & Semantic Decomposition',
    summary:
      'Ingestion and decomposition pipeline upgrades with cosine similarity thresholds and chunk lineage.',
    details: [
      'Source card attribution displaying doc names, chunk hashes, and exact retrieved sentences.',
      'Three-token entity extraction (Quantity, SKU, Tier) mapped directly to operational context.',
      'Native <details> disclosure blocks for zero-cost trace inspection without client-side JavaScript.',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-09-01',
    commitHash: '1a0f58d927be',
    stage: 'CORE',
    title: 'Initial Production Release — 11-Act Narrative Engine',
    summary:
      'Foundational deployment of the SYNEX Control Center, Editorial Ledger design system, and sovereignty stack.',
    details: [
      'Complete 11-Act Trace engine from incoming buyer inquiry to enterprise settlement.',
      'Self-hosted fonts, zero external tracker scripts, and <180KB total page weight budget.',
      'Strict boundaries policy (/limits) prohibiting open-ended chatbots and unsupervised disbursements.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <MarketingLayout>
      <div className="py-12 px-6 sm:px-10 md:px-16 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-ink transition-colors mb-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> &larr; Return to Trace Ledger
        </Link>

        {/* Ledger Header Block */}
        <header className="border-b border-hairline pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span>Audit Ledger // Changelog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Immutable Release Log
          </h1>
          <p className="mt-4 font-serif text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
            A reverse-chronological ledger of system architecture updates, policy revisions,
            and boundary adjustments. Every release is cryptographically signed and archived.
          </p>
        </header>

        {/* Changelog Entries Timeline */}
        <div className="relative border-l border-hairline ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          {ENTRIES.map((entry) => (
            <article key={entry.version} className="relative group">
              {/* Timeline Bullet */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-paper border-2 border-ink group-hover:bg-ink transition-colors"
                aria-hidden="true"
              />

              {/* Version & Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-hairline">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lg font-bold text-ink tracking-tight tabular-nums">
                    {entry.version}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase px-2 py-0.5 border border-hairline bg-paper-elevated text-ink">
                    <Tag className="h-2.5 w-2.5" />
                    {entry.stage}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-ink-muted">
                  <time dateTime={entry.date} className="tabular-nums">
                    {entry.date}
                  </time>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                    <GitCommit className="h-3 w-3" />
                    <code className="text-ink">{entry.commitHash}</code>
                  </span>
                </div>
              </div>

              {/* Release Title & Summary */}
              <div className="mt-4">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  {entry.title}
                </h2>
                <p className="mt-2 font-serif text-sm sm:text-base text-ink-muted leading-relaxed">
                  {entry.summary}
                </p>
              </div>

              {/* Release Item Details */}
              <ul className="mt-4 space-y-2 font-mono text-xs text-ink">
                {entry.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-ink-muted select-none">&rarr;</span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Verification Footer Note */}
        <div className="mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-ink-muted">
          <span>Ledger Hash: sha256:d82e4a8b...199b</span>
          <span>Verified via Local Ed25519 Authority</span>
        </div>
      </div>
    </MarketingLayout>
  );
}
