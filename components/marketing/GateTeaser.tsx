import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function GateTeaser() {
  return (
    <section id="gate" className="relative border-t border-white/[0.08] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-editorial">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber-400">
            Safety Invariant
          </p>
          <h2 className="mt-2 text-[28px] sm:text-[36px] font-semibold tracking-tight text-white leading-tight">
            The Gate.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-slate-400">
            Autonomous execution stops when commercial or legal risk exceeds your parameters.
          </p>
        </div>

        {/* The Gate Held/Approval Workflow Status Banner */}
        <div className="relative mt-12 rounded-2xl border border-white/[0.12] border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-500/[0.08] via-[#0E1322]/90 to-[#0A0D18]/90 p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-3.5 py-1.5 font-mono text-[12px] font-semibold tracking-wide text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              HELD — AWAITING AUTHORISATION
            </span>
            <span className="font-mono text-[12px] text-slate-400">
              Trace halted at Stage 04 (DECIDE)
            </span>
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.08] bg-black/60 p-4 font-mono text-[13px] text-slate-200 shadow-inner flex flex-wrap items-center gap-2">
            <span className="text-amber-400/90 font-medium">Rule Trigger: </span>
            <code className="text-emerald-400 font-semibold">
              approvals.discount.gt(8%) &rarr; role:sales_manager
            </code>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 border-y border-white/[0.08] py-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Consequence If Approved
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                Quotation QT-4471 issues immediately with 12% repeat-buyer discount. Stock reserved for 48 hours.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Consequence If Rejected
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                Standard catalog rate (8% cap) is returned to the buyer with an explanatory note on volume tiers.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-xl text-[15px] sm:text-[16px] font-medium leading-normal text-white">
              The trace does not continue until a human chooses. In production, that human is you.
            </p>
            <Link
              href="/login"
              className="flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-6 font-mono text-[12px] font-bold text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              LOGIN TO TEST THE GATE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
