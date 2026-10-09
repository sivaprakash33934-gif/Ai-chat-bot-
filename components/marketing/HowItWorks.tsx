const STAGES = [
  {
    num: "01",
    label: "KNOW",
    desc: "Ingests product inventory, real-time pricing, customer history, and credit terms directly from your systems.",
  },
  {
    num: "02",
    label: "UNDERSTAND",
    desc: "Parses customer intent, buyer commercial relationship, and contextual constraints in verified natural language.",
  },
  {
    num: "03",
    label: "REASON",
    desc: "Cross-checks margin floors, stock allocations, and tier limits against your configured business rules.",
  },
  {
    num: "04",
    label: "DECIDE",
    desc: "Calculates the transaction payload or halts execution if any risk threshold is exceeded.",
  },
  {
    num: "05",
    label: "ACT",
    desc: "Issues official quotations, reserves inventory units, or escalates to human leadership.",
  },
  {
    num: "06",
    label: "MEASURE",
    desc: "Verifies delivery accuracy, latency metrics, and order fulfillment outcomes against the audit ledger.",
  },
  {
    num: "07",
    label: "IMPROVE",
    desc: "Feeds verified ledger feedback into operational rule tuning without model hallucination.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-editorial">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            The Engine
          </p>
          <h2 className="mt-2 text-[28px] sm:text-[36px] font-semibold tracking-tight text-white leading-tight">
            Seven stages from inbound signal to verified outcome.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-slate-400">
            Every customer enquiry travels through a verifiable, double-entry pipeline.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0C101C]/80 p-2 sm:p-3 divide-y divide-white/[0.06] backdrop-blur-xl shadow-2xl">
          {STAGES.map((s) => (
            <div
              key={s.num}
              className="group flex flex-col gap-3 p-4 sm:p-5 rounded-xl transition-all duration-200 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="flex w-44 shrink-0 items-center gap-3">
                <span className="flex h-7 items-center rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 font-mono text-[11px] font-bold text-indigo-300">
                  {s.num}
                </span>
                <span className="font-mono text-[13px] font-bold tracking-wider text-white group-hover:text-indigo-200 transition-colors">
                  {s.label}
                </span>
              </div>
              <p className="flex-1 text-[14px] leading-relaxed text-slate-300">
                {s.desc}
              </p>
              <div className="hidden sm:flex items-center text-slate-500 font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                STAGE_READY
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
