"use client";

import { useSound } from "@/components/providers/SoundProvider";

export default function FinalCta() {
  const { play } = useSound();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center" aria-label="Deploy Call to Action">
      <div className="p-10 sm:p-16 rounded-3xl bg-[#0B0F19] text-white relative overflow-hidden shadow-2xl">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <span className="font-mono text-xs text-[#10B981] uppercase tracking-widest font-semibold">
            Production Ready
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Deploy Autonomous Shopping in Minutes.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Experience sub-100ms reasoning across your entire inventory. Zero hallucination risk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#onboarding"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#4F46E5] text-white text-sm font-semibold hover:bg-[#4338CA] transition shadow-md shadow-[#4F46E5]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              data-cursor="cta"
              onClick={() => play("click")}
            >
              Start 3-Minute Ingestion
            </a>
            <a
              href="#demo"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              data-cursor="interactive"
              onClick={() => play("click")}
            >
              Test Stateless Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
