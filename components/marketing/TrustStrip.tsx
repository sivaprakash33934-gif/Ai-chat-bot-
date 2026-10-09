export function TrustStrip() {
  return (
    <section className="border-y border-white/[0.08] bg-[#0A0E18]/70 px-6 py-6 backdrop-blur-md md:px-12">
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] font-bold text-indigo-400">
            01 /
          </span>
          <p className="font-mono text-[12px] font-medium uppercase tracking-wider text-slate-200">
            RUNS ON YOUR SERVER
          </p>
        </div>

        <div className="flex items-center gap-3 sm:justify-center">
          <span className="font-mono text-[12px] font-bold text-indigo-400">
            02 /
          </span>
          <p className="font-mono text-[12px] font-medium uppercase tracking-wider text-slate-200">
            ACTS ONLY INSIDE YOUR RULES
          </p>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <span className="font-mono text-[12px] font-bold text-indigo-400">
            03 /
          </span>
          <p className="font-mono text-[12px] font-medium uppercase tracking-wider text-slate-200">
            EVERY ACTION LOGGED
          </p>
        </div>
      </div>
    </section>
  );
}
