import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, ShieldCheck, Compass } from 'lucide-react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';

export const metadata: Metadata = {
  title: 'About SYNEX — The Thesis & Chain of Custody',
  description:
    'Why SYNEX was built: replacing open-ended chat hallucination with deterministic commercial custody and Indian DPDP sovereignty.',
};

export default function AboutPage() {
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
            <BookOpen className="h-3.5 w-3.5" />
            <span>The Thesis // Architectural Statement</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink balance-heading">
            We didn&rsquo;t build a chatbot. We built a chain of custody.
          </h1>
          <p className="mt-4 font-serif text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl pretty-body">
            The commercial enterprise does not suffer from a lack of conversational prose. It
            suffers from a systemic breakdown in verification, double-entry margin reconciliation,
            and regulatory data sovereignty.
          </p>
        </header>

        {/* Essay Section 1: The Measurement Trust Wound */}
        <article className="space-y-6 font-serif text-base sm:text-lg text-ink leading-relaxed border-b border-hairline pb-12 mb-12 pretty-body">
          <h2 className="text-xl sm:text-2xl font-semibold text-ink">
            The Measurement Trust Wound in Enterprise AI
          </h2>
          <p className="text-ink-muted">
            Between 2023 and 2025, enterprise software was flooded with conversational &ldquo;copilots&rdquo;
            and customer support bots. Most failed the same fundamental test: <em className="text-ink">reproducibility</em>.
            When an AI quotes ₹710 per unit instead of ₹760, who signed off on the margin hit? When an
            unsupervised bot promises net-90 payment terms to an unrated buyer over web chat, which
            database committed that liability?
          </p>
          <p className="text-ink-muted">
            In business-to-business commerce, words are legally binding representations. Generating
            plausible text is trivial; establishing a cryptographic audit trail that proves why an
            autonomous decision was made, against which exact price sheet, and under whose authority
            is the actual engineering problem.
          </p>
          <p className="text-ink-muted">
            SYNEX was built from a single realization: <strong className="text-ink font-semibold">autonomous action requires double-entry accounting</strong>.
            If every database mutation, webhook dispatch, and quotation PDF cannot be tied back to an
            unbroken trace of evidence, it should never execute autonomously.
          </p>
        </article>

        {/* Essay Section 2: Data Sovereignty & DPDP */}
        <article className="space-y-6 font-serif text-base sm:text-lg text-ink leading-relaxed border-b border-hairline pb-12 mb-12 pretty-body">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span>DPDP Act Compliance &amp; Hardware Sovereignty</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-ink">
            Why We Refuse Third-Party Model Training
          </h2>
          <p className="text-ink-muted">
            Under India&rsquo;s Digital Personal Data Protection (DPDP) framework and global corporate
            governance standards, customer pricing schedules, wholesale margins, and credit histories
            are high-liability assets. Shipping this data to third-party model providers to &ldquo;fine-tune&rdquo;
            black-box weights guarantees information leakage across tenants.
          </p>
          <p className="text-ink-muted">
            SYNEX operates under a zero-weight-modification architecture. Your ERP catalog, your price
            rules, and your transaction histories remain quarantined on your hardware. Inference is
            performed via strict in-context retrieval, and all decision sign-offs are stamped with
            local Ed25519 cryptographic keys.
          </p>
        </article>

        {/* Section 3: The 7-Stage Loop Manifesto */}
        <section className="mb-14 scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink pb-2 border-b border-hairline mb-6">
            <Layers className="h-3.5 w-3.5" />
            <span>The 7-Stage Closed-Loop Invariant</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">01 // INGEST</span>
              <p className="mt-1 font-semibold text-ink">Verifiable Ingestion Boundary</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                Inquiries arrive only through authenticated channels with source provenance and timestamps.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">02 // GROUND</span>
              <p className="mt-1 font-semibold text-ink">Evidence-Linked Retrieval</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                Every factual claim links directly to a document chunk hash with cosine similarity &gt;0.82.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">03 // PARSE</span>
              <p className="mt-1 font-semibold text-ink">Deterministic Entity Deconstruction</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                Natural language decomposes into immutable commercial primitives: SKU, Quantity, Tier, Payment.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">04 // REASON</span>
              <p className="mt-1 font-semibold text-ink">Linear Rule Evaluation</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                No probabilistic drift. Every threshold comparison is evaluated against codified enterprise invariants.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">05 // GATE</span>
              <p className="mt-1 font-semibold text-ink">Dual-Key Permission Halt</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                When policy boundaries are exceeded, autonomous execution halts until physical operator signature.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper">
              <span className="text-[10px] uppercase text-ink-muted">06 // EXECUTE</span>
              <p className="mt-1 font-semibold text-ink">Idempotent Side-Effects</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                ERP syncs, stock reservations, and quote generation execute with automated retry and fault isolation.
              </p>
            </div>

            <div className="border border-hairline p-4 bg-paper sm:col-span-2">
              <span className="text-[10px] uppercase text-ink-muted">07 // RECONCILE</span>
              <p className="mt-1 font-semibold text-ink">Double-Entry Economic Settlement</p>
              <p className="mt-2 text-ink-muted font-serif text-xs">
                Realized gross margins are calculated against baseline wholesale cost and permanently sealed into the audit log.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: The Horizon Block (Future Roadmap) */}
        <section className="border border-hairline p-6 sm:p-8 bg-paper-elevated scroll-mt-24">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted pb-3 mb-4 border-b border-hairline">
            <Compass className="h-3.5 w-3.5" />
            <span>The Horizon // Beyond V1 Architecture</span>
          </div>

          <h3 className="font-serif text-2xl font-semibold text-ink mb-3 balance-heading">
            What Comes Next (Roadmap Target Specifications)
          </h3>
          <p className="font-serif text-sm sm:text-base text-ink-muted leading-relaxed mb-6 pretty-body">
            V1 is deliberately constrained to prove deterministic custody in wholesale commerce.
            The following initiatives represent active research milestones under development for V2:
          </p>

          <ul className="space-y-4 font-mono text-xs text-ink">
            <li className="flex items-start gap-3">
              <span className="px-1.5 py-0.5 border border-hairline bg-paper text-[10px] text-ink-muted">
                R-01
              </span>
              <div>
                <strong className="text-ink">On-Premises FPGA &amp; ASIC Acceleration:</strong>{' '}
                <span className="text-ink-muted font-serif text-sm block mt-0.5">
                  Targeting &lt;45ms end-to-end trace latency on low-wattage edge appliance hardware.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="px-1.5 py-0.5 border border-hairline bg-paper text-[10px] text-ink-muted">
                R-02
              </span>
              <div>
                <strong className="text-ink">Multi-Facility Inventory Arbitrage:</strong>{' '}
                <span className="text-ink-muted font-serif text-sm block mt-0.5">
                  Dynamic warehouse routing across multi-state GST jurisdictions based on tax and freight differentials.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="px-1.5 py-0.5 border border-hairline bg-paper text-[10px] text-ink-muted">
                R-03
              </span>
              <div>
                <strong className="text-ink">Zero-Knowledge Supplier Benchmarks:</strong>{' '}
                <span className="text-ink-muted font-serif text-sm block mt-0.5">
                  Privacy-preserving cross-tenant pricing validation without exposing counterparties or volume secrets.
                </span>
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t border-hairline font-mono text-[11px] text-ink-muted">
            Notice: Features listed in The Horizon are architectural milestones and are not contractual
            commitments for V1 production releases.
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
