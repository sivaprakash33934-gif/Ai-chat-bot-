"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";

const TESTIMONIALS = [
  {
    quote: "Neural Commerce cut our catalog search abandonment by 44% in the first 30 days.",
    author: "Elena Rostova",
    role: "VP Digital, Apex Outfitter",
    stat: "44% Abandonment Drop",
  },
  {
    quote: "Sub-100ms inference with zero hallucinations. It is the only AI shopping engine our compliance team approved.",
    author: "Marcus Chen",
    role: "CTO, Kinetic Techwear",
    stat: "100% Grounded",
  },
  {
    quote: "Ingesting 40,000 SKUs took under 5 minutes. The autonomous cart add conversions speak for themselves.",
    author: "Sarah Jenkins",
    role: "Head of E-Commerce, Verdant Living",
    stat: "+31.4% AOV Uplift",
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="py-20 border-y border-slate-200/90 bg-white overflow-hidden" aria-label="Enterprise Proof">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Trusted by High-Growth Commerce Brands
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1}>
            <div className="h-full p-7 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between hover:border-[#6366F1]/40 transition">
              <div>
                <span className="font-mono text-xs font-bold text-[#4F46E5] block mb-3">
                  {t.stat}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60">
                <div className="font-bold text-slate-900 text-xs">{t.author}</div>
                <div className="text-[11px] font-mono text-slate-500">{t.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
