"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { useSound } from "@/components/providers/SoundProvider";

const BENCHMARKS = [
  { label: "P99 Inference Latency", value: "< 78ms", sub: "Global edge execution" },
  { label: "Hallucination Rate", value: "0.000%", sub: "Strict attribute grounding" },
  { label: "Catalog Ingestion", value: "180 sec", sub: "Per 10,000 SKUs indexed" },
  { label: "Cart Value Uplift", value: "+31.4%", sub: "A/B benchmark average" },
];

export default function BenchmarkPills() {
  const { play } = useSound();

  return (
    <section id="benchmarks" className="py-12 border-y border-slate-200/90 bg-white" aria-label="System Performance Benchmarks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BENCHMARKS.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-[#6366F1]/40 transition group select-none min-h-[44px]"
                data-cursor="interactive"
                onMouseEnter={() => play("hover")}
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 group-hover:text-[#4F46E5] transition-colors">
                  {b.value}
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">{b.label}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">{b.sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
