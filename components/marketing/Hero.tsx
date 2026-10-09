import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="relative px-6 py-16 md:px-12 md:py-24 lg:py-28">
      <div className="mx-auto max-w-editorial">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow-inner">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>TRACE #SX-4471 · PILOT TENANT · 2026-09-14 21:41 IST</span>
        </div>

        {/* Semantic single H1 for page */}
        <h1 className="sr-only">
          SYNEX: AI that acts on your business and proves every step
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <blockquote className="text-[clamp(1.9rem,1.1rem+3.2vw,3.75rem)] font-medium leading-[1.18] tracking-tight text-white">
              &ldquo;Do you have 400 units of the 6mm brass fitting, and
              what&apos;s your best price for a repeat buyer?&rdquo;
            </blockquote>
            <cite className="mt-4 block font-mono text-[13px] text-slate-400 not-italic">
              — inbound website enquiry, 21:41
            </cite>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate-300">
              The AI checked stock, verified credit terms, and held quotation
              issuance for human approval in 6.2 seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/login"
                className="group flex min-h-[46px] items-center gap-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 font-mono text-[13px] font-semibold text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] transition-all hover:from-indigo-400 hover:to-indigo-500 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Open the Control Center
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how"
                className="font-mono text-[13px] text-slate-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                See how it works &darr;
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            {/* The Simulated Execution Metrics Card */}
            <div className="relative rounded-2xl border border-white/[0.12] bg-[#0E1322]/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                    Execution Trace
                  </span>
                </div>
                <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  SIMULATED
                </span>
              </div>

              <div className="mt-4 divide-y divide-white/[0.06] font-mono text-[13px]">
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400">Reasoning Steps</span>
                  <span className="font-medium text-slate-200">11 verified stages</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400">Execution Latency</span>
                  <span className="tabular text-slate-200">6.2s total</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400">List Value</span>
                  <span className="tabular font-semibold text-emerald-400">List value before discount: ₹2,84,000</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400">Risk Assessment</span>
                  <span className="font-semibold text-amber-400">HIGH (Discount &gt; 8%)</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400">Final Action</span>
                  <span className="font-medium text-indigo-300">Gated &rarr; Approved by human</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[11px] text-slate-500">
                <span>Recorded in Audit Ledger</span>
                <span className="text-slate-400">Hash: 0x8f2d...41a</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
