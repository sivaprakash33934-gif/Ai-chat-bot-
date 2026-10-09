import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'V1 Boundaries & Limits — SYNEX',
  description: 'What SYNEX V1 does not do, and a live counter-trace of graceful failure.',
};

interface BoundaryItem {
  feature: string;
  status: string;
  rationale: string;
  alternative: string;
}

const BOUNDARIES: BoundaryItem[] = [
  {
    feature: 'Unsupervised WhatsApp Chatbots',
    status: 'NOT SUPPORTED IN V1',
    rationale: 'Open-ended chat invites conversational drift, hallucinated commitments, and un-audited promises.',
    alternative: 'SYNEX only ingests structured inquiries into verified commercial schemas.',
  },
  {
    feature: 'Outbound Voice Agents & Telephony',
    status: 'EXCLUDED BY DESIGN',
    rationale: 'Acoustic latency and conversational interruptions produce unacceptable commercial liability.',
    alternative: 'High-throughput text channels with verifiable cryptographic delivery receipts.',
  },
  {
    feature: 'Native iOS / Android Mobile Apps',
    status: 'NOT IN V1',
    rationale: 'Mobile app store approvals delay hotfixes and break self-hosted internal network constraints.',
    alternative: 'Responsive, zero-install web application optimized for desktop and mobile browsers.',
  },
  {
    feature: 'Generative Marketing Creative & Images',
    status: 'NON-GOAL',
    rationale: 'SYNEX is a deterministic commerce ledger, not a generative content studio.',
    alternative: 'Integrate existing DAM / CDN links into outbound quote attachments.',
  },
  {
    feature: 'Model Weight Fine-Tuning (LoRA / SFT)',
    status: 'ZERO WEIGHT TRAINING',
    rationale: 'Baking customer proprietary data into model weights causes permanent data leakage risks.',
    alternative: 'Strict in-context RAG grounding over your internal SQL and document perimeter.',
  },
  {
    feature: 'Autonomous Cash Disbursements / Refunds',
    status: 'HARD CEILING (₹0)',
    rationale: 'Releasing funds without dual-key human authorization violates enterprise treasury invariants.',
    alternative: 'The machine halts and prepares an approval dossier for the operations lead.',
  },
];

export default function LimitsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper py-12 px-6 sm:px-10 md:px-16">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper font-mono text-xs focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="max-w-4xl mx-auto">
        {/* Navigation Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-ink transition-colors mb-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> &larr; Return to Trace Ledger
        </Link>

        {/* Header Block */}
        <header className="border-b border-hairline pb-8 mb-12">
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
            System Invariants &amp; Architectural Perimeter
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            The shortest page we&rsquo;ll ever write, and the most useful.
          </h1>
          <p className="mt-4 font-serif text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
            Most software vendors sell you their roadmap. We declare our boundaries upfront.
            Here is what SYNEX V1 refuses to do, and the exact proof of how our guardrails fail safely.
            Fully offline (air-gapped) deployment is available as a configured option, not the default.
          </p>
        </header>

        <main id="main-content" tabIndex={-1} className="focus:outline-none space-y-16">
          {/* Section 1: The Non-Goals Manifest Table */}
          <section aria-labelledby="boundaries-table-heading">
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-6">
              <h2
                id="boundaries-table-heading"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-ink"
              >
                01 // What V1 Does Not Do
              </h2>
              <span className="font-mono text-[10px] text-ink-faint">
                6 HARD INVARIANTS
              </span>
            </div>

            <div className="border border-hairline bg-paper divide-y divide-hairline">
              {BOUNDARIES.map((item, idx) => (
                <div key={idx} className="p-5 hover:bg-paper-elevated transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                    <span className="font-mono text-sm font-semibold text-ink">
                      {item.feature}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                      {item.status}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-ink-muted leading-relaxed">
                    {item.rationale}
                  </p>
                  <p className="font-mono text-[11px] text-ink-faint mt-2">
                    <span className="text-ink font-medium">Alternative: </span>
                    {item.alternative}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: THE COUNTER-TRACE (§41.1) */}
          <section
            aria-labelledby="counter-trace-heading"
            role="region"
            aria-label="Counter-Trace: Graceful Failure Replay"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3 mb-6">
              <h2
                id="counter-trace-heading"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-ink"
              >
                02 // The Counter-Trace: Proof of Graceful Failure
              </h2>
              <span className="font-mono text-[10px] text-error font-semibold uppercase">
                REPLAY: #SX-ERR-0912
              </span>
            </div>

            <p className="font-serif text-sm text-ink-muted mb-6 leading-relaxed">
              Enterprise skepticism is healthy. When an AI hits a channel restriction or an unpermitted financial operation,
              it must not guess or improvise. It must halt deterministically, write a tamper-evident audit record,
              and transfer authority. Here is a real replay of SYNEX stopping itself.
            </p>

            {/* Counter-Trace Card Container */}
            <div className="border border-hairline bg-paper p-6 sm:p-8 space-y-6">
              {/* Counter-Trace Superheader */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error" aria-hidden="true" />
                  <span className="font-semibold text-ink">TRACE #SX-ERR-0912</span>
                  <span className="text-ink-faint">· 2026-09-18 14:02:11 IST</span>
                </div>
                <span className="px-2 py-0.5 border border-error text-error text-[10px] uppercase font-bold bg-error-surface">
                  OUTCOME: EXECUTION HALTED (SAFETY LOCK)
                </span>
              </div>

              {/* Adversarial / Unsupported Input */}
              <div className="p-4 bg-paper-elevated border border-hairline">
                <span className="block font-mono text-[10px] text-ink-faint uppercase mb-1">
                  Inbound Raw Payload (Audio Note · Future Channel)
                </span>
                <p className="font-serif text-sm text-ink italic leading-relaxed">
                  &ldquo;Hey, need a full refund of ₹18,500 on order #ORD-4410 right away, the brass fittings were delayed.&rdquo;
                </p>
                <span className="block font-mono text-[10px] text-ink-faint mt-2">
                  Format: audio/ogg (Voice Note) · Duration: 4.8s · Size: 38.2 KB
                </span>
              </div>

              {/* Step-by-Step Execution ladder with Failure Highlights */}
              <div className="space-y-3 font-mono text-xs">
                {/* Step 1: Ingestion */}
                <div className="p-3 border border-hairline bg-paper-elevated flex items-start justify-between gap-4">
                  <div>
                    <span className="text-ink-faint uppercase text-[10px] block">Step 01 · Ingestion //</span>
                    <span className="text-ink font-medium">Channel identified: <code>AUDIO_NOTE_UNSUPPORTED</code></span>
                  </div>
                  <span className="text-ink font-medium tabular-nums text-[11px]">42ms</span>
                </div>

                {/* Step 2: Extraction */}
                <div className="p-3 border border-hairline bg-paper-elevated flex items-start justify-between gap-4">
                  <div>
                    <span className="text-ink-faint uppercase text-[10px] block">Step 02 · Extraction //</span>
                    <span className="text-ink font-medium">
                      Intent: <code>REFUND_REQUEST</code> · Target Order: <code>#ORD-4410</code> · Claim: <span className="tabular-nums">₹18,500</span>
                    </span>
                  </div>
                  <span className="text-ink font-medium tabular-nums text-[11px]">188ms</span>
                </div>

                {/* Step 3: FAIL (Channel Unsupported) */}
                <div className="p-3.5 border-l-4 border-l-error border border-hairline bg-error-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-ink">
                  <div>
                    <span className="text-error uppercase text-[10px] font-bold block">
                      Step 03 · Boundary Check · FAIL //
                    </span>
                    <code className="text-error font-bold">
                      channels.voice_inbound.allowed == false
                    </code>
                    <p className="text-[11px] text-ink-muted mt-1">
                      Voice notes are prohibited from autonomous conversational processing under Master Blueprint §41.1.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 border border-error text-error text-[10px] uppercase font-bold tracking-wider shrink-0 bg-paper">
                    HALT: CHANNEL_UNSUPPORTED
                  </span>
                </div>

                {/* Step 4: RESTRICTED (Financial Ceilings) */}
                <div className="p-3.5 border-l-4 border-l-error border border-hairline bg-error-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-ink">
                  <div>
                    <span className="text-error uppercase text-[10px] font-bold block">
                      Step 04 · Financial Invariant · RESTRICTED //
                    </span>
                    <code className="text-error font-bold">
                      actions.refund.max_autonomous == 0
                    </code>
                    <p className="text-[11px] text-ink-muted mt-1">
                      Hard Ceiling: Zero autonomous cash refunds allowed. Dual-key authorization required for cash releases.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 border border-error text-error text-[10px] uppercase font-bold tracking-wider shrink-0 bg-paper">
                    RESTRICTED: REFUND_CEILING
                  </span>
                </div>

                {/* Step 5: Safe Human Escalation */}
                <div className="p-3 border border-hairline bg-paper-elevated flex items-start justify-between gap-4">
                  <div>
                    <span className="text-success uppercase text-[10px] font-bold block">
                      Step 05 · Safe Fallback Routing //
                    </span>
                    <span className="text-ink font-medium">
                      Execution halted without database mutations. Escalation ticket <code>#ESC-9921</code> created for Priya.
                    </span>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Raw audio file and extracted claim serialized into Ops Lead queue. Customer acknowledged with standard delay notice.
                    </p>
                  </div>
                  <span className="text-success font-semibold text-[10px] uppercase shrink-0">
                    SAFE DISPATCH ✓
                  </span>
                </div>
              </div>

              {/* Bottom Cryptographic Attestation */}
              <div className="pt-4 border-t border-hairline font-mono text-[11px] text-ink-faint flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Tamper-evident record: <code>sha256:e9102c...3821a</code></span>
                <span>Disbursed: <strong className="text-ink tabular-nums">₹0.00</strong> (0 state mutations committed)</span>
              </div>
            </div>
          </section>

          {/* Section 3: Native "Show the Trace" Disclosure */}
          <details className="group border border-hairline bg-paper p-5">
            <summary className="flex cursor-pointer items-center justify-between font-mono text-xs uppercase tracking-wider text-ink-muted list-none select-none hover:text-ink focus:outline-none">
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink-faint group-open:hidden">[+]</span>
                <span className="font-mono text-xs text-ink-faint hidden group-open:inline">[-]</span>
                <span>Show the Trace: Failure Serialization &amp; Invariant Contracts</span>
              </span>
              <span className="font-mono text-[10px] text-ink-faint">§41.1 CONTRACT</span>
            </summary>

            <div className="mt-5 pt-4 border-t border-hairline font-mono text-xs space-y-3 text-ink">
              <div className="p-3 bg-paper-elevated border border-hairline overflow-x-auto">
                <pre className="text-[11px] text-ink-muted leading-relaxed">
{`{
  "trace_id": "SX-ERR-0912",
  "halt_reason": "INVARIANT_VIOLATION_CHANNEL_VOICE_AND_REFUND_CEILING",
  "attempted_action": "refund.disburse(order_id='ORD-4410', amount=18500)",
  "state_mutations_executed": [],
  "human_assignee": "role:ops_lead",
  "audit_block": "SEALED_WITH_ZERO_DISBURSEMENT"
}`}
                </pre>
              </div>
              <p className="text-[11px] text-ink-faint">
                The machine cannot negotiate or soften boundary failures. It executes the invariant and stops.
              </p>
            </div>
          </details>
        </main>

        {/* Page Footer */}
        <footer className="mt-20 pt-8 border-t border-hairline font-mono text-xs text-ink-muted flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span>&copy; SYNEX · Master Blueprint §41 Boundaries</span>
          <Link href="/" className="underline underline-offset-4 hover:text-ink text-ink">
            Return to Homepage Trace &rarr;
          </Link>
        </footer>
      </div>
    </div>
  );
}
