import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Handshake, Network, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';

export const metadata: Metadata = {
  title: 'Partners & Integrators — SYNEX',
  description:
    'Channel strategy and technical integration pathways for Systems Integrators, ERP Consultants, and Enterprise Agencies.',
};

export default function PartnersPage() {
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

        {/* Header Block */}
        <header className="border-b border-hairline pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
            <Handshake className="h-3.5 w-3.5" />
            <span>Channel Strategy // Systems Integrators &amp; Agencies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink balance-heading">
            Deploy sovereign AI for your clients. Keep the data on their metal.
          </h1>
          <p className="mt-4 font-serif text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl pretty-body">
            Enterprise clients are demanding commercial automation, but their CIOs and compliance
            boards strictly veto cloud solutions that exfiltrate ERP records to public AI providers.
            SYNEX is the audited, self-hosted engine you can deploy, integrate, and monetize.
          </p>
        </header>

        {/* Section 1: The Opportunity */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Network className="h-3.5 w-3.5" />
            <span>01 // The Modernization Opportunity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-serif text-sm sm:text-base text-ink leading-relaxed">
            <div className="border border-hairline p-5 bg-paper">
              <h3 className="font-mono text-xs font-semibold uppercase text-ink mb-2">
                What Your Clients Want
              </h3>
              <p className="text-ink-muted pretty-body">
                Immediate response times on high-volume B2B inquiries, automated stock reservations,
                and instant PDF quote generation without adding sales desk headcount.
              </p>
            </div>

            <div className="border border-hairline p-5 bg-paper">
              <h3 className="font-mono text-xs font-semibold uppercase text-ink mb-2">
                What Holds Them Back
              </h3>
              <p className="text-ink-muted pretty-body">
                Data sovereignty fear, DPDP Act regulatory scrutiny, margin leakage from unverified AI
                discounting, and fear of vendor lock-in with US hyperscalers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Partner Capabilities */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-4">
            <Cpu className="h-3.5 w-3.5" />
            <span>02 // Supported Integration Surfaces</span>
          </div>

          <ul className="space-y-4 font-mono text-xs text-ink">
            <li className="p-4 border border-hairline bg-paper flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-ink uppercase">Custom ERP Connectors</span>
                <p className="font-serif text-sm text-ink-muted mt-1 pretty-body">
                  Pre-built adapters for SAP ECC, S/4HANA, TallyPrime, Microsoft Dynamics Business
                  Central, and custom MySQL/Oracle commerce databases.
                </p>
              </div>
            </li>

            <li className="p-4 border border-hairline bg-paper flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-ink uppercase">Codified Policy Libraries</span>
                <p className="font-serif text-sm text-ink-muted mt-1 pretty-body">
                  Write bespoke margin boundaries, payment terms, and inventory reservation logic in
                  deterministic TypeScript rules that run in local micro-runtimes.
                </p>
              </div>
            </li>

            <li className="p-4 border border-hairline bg-paper flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-ink uppercase">Turnkey Appliance Packaging</span>
                <p className="font-serif text-sm text-ink-muted mt-1 pretty-body">
                  Deploy as a single Docker Compose topology or self-hosted Kubernetes Helm release
                  with zero outgoing internet dependencies.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 3: Engagement Protocol & Contact */}
        <section className="border border-hairline p-6 sm:p-8 bg-paper-elevated scroll-mt-24">
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
            <span className="font-mono text-xs font-semibold uppercase text-ink">
              03 // Partner Onboarding Protocol
            </span>
            <span className="font-mono text-[11px] text-ink-muted">Q4 2026 Cohort</span>
          </div>

          <p className="font-serif text-base sm:text-lg text-ink leading-relaxed mb-6 pretty-body">
            We partner with regional systems integrators who have direct relationships with
            manufacturing clusters, wholesale distributors, and industrial supply hubs.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/#act-11"
              className="inline-flex items-center justify-center gap-2 border border-ink bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink font-semibold"
            >
              Initiate Partner Verification
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 border border-hairline bg-paper px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink hover:border-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
            >
              Review Architecture Contract (/docs)
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
