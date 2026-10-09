import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function PricingNote() {
  return (
    <section id="pricing" className="relative border-t border-white/[0.08] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-editorial">
        <div className="relative rounded-2xl border border-white/[0.1] bg-[#0E1322]/80 p-8 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            Pricing Architecture
          </p>
          <h2 className="mt-2 text-[26px] sm:text-[34px] font-semibold tracking-tight text-white leading-tight">
            Transparent Infrastructure Economics
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-300">
            Capacity-based, not per-outcome. Your invoice doesn&apos;t grow when the AI gets better.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-mono text-[12px] font-bold uppercase tracking-wider text-white">
                  TENANT + CAPACITY PRICING
                </p>
                <p className="mt-1 text-[13px] text-slate-400">
                  Predictable operations by seat and volume limits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-mono text-[12px] font-bold uppercase tracking-wider text-white">
                  SELF-HOST INCLUDED
                </p>
                <p className="mt-1 text-[13px] text-slate-400">
                  Runs directly inside your cloud or internal servers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-mono text-[12px] font-bold uppercase tracking-wider text-white">
                  AUDIT LEDGER EXPORTABLE
                </p>
                <p className="mt-1 text-[13px] text-slate-400">
                  Complete trace and bookkeeping ledger export anytime.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-8">
            <Link
              href="/login"
              className="flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-6 font-mono text-[13px] font-bold text-slate-950 shadow-md transition-all hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Open the Control Center <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="font-mono text-[12px] text-slate-400">
              Pilot deployment starting at ₹198/year for registered MSMEs.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
