"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { useSound } from "@/components/providers/SoundProvider";

export interface CapabilityItem {
  title: string;
  desc: string;
  badge: string;
  metric: string;
  code: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    title: "Autonomous Search & Discovery",
    desc: "Transforms ambiguous natural language queries into exact SKU matches in under 40ms.",
    badge: "Vector Mesh",
    metric: "40ms Resolution",
    code: "MOD-01",
  },
  {
    title: "Zero-Hallucination Guardrails",
    desc: "Answers are grounded strictly in your ingested product attributes, specs, and live inventory.",
    badge: "Deterministic",
    metric: "0.000% Error",
    code: "MOD-02",
  },
  {
    title: "Real-Time Dynamic Pricing",
    desc: "Adjusts contextual promotions and bundle recommendations according to live stock velocity.",
    badge: "Live Engine",
    metric: "Real-Time",
    code: "MOD-03",
  },
  {
    title: "Multilingual Catalog Synapse",
    desc: "Instantly queries cross-border inventories in 48 languages with automatic currency mapping.",
    badge: "48 Locales",
    metric: "Sub-100ms",
    code: "MOD-04",
  },
  {
    title: "Visual Semantic Inference",
    desc: "Parses user-uploaded reference images against product attributes and color profiles.",
    badge: "Multimodal",
    metric: "1536-dim",
    code: "MOD-05",
  },
  {
    title: "Sizing & Fit Computation",
    desc: "Cross-references cut specifications and customer review vectors to reduce return rates.",
    badge: "Fit Engine",
    metric: "-28% Returns",
    code: "MOD-06",
  },
  {
    title: "Smart Agent Escalation",
    desc: "Hands over conversation context cleanly to human staff when edge cases exceed thresholds.",
    badge: "Zero Loss",
    metric: "Seamless",
    code: "MOD-07",
  },
  {
    title: "Unified Commerce Sync",
    desc: "Direct webhooks for Shopify Plus, BigCommerce, Commercelayer, and headless architectures.",
    badge: "Webhooks",
    metric: "180s Sync",
    code: "MOD-08",
  },
  {
    title: "Instant Cart & Order Actions",
    desc: "Executes checkout pre-fills, variant updates, and cart operations without page reloads.",
    badge: "Autonomous",
    metric: "1-Click API",
    code: "MOD-09",
  },
];

export default function CapabilityGrid() {
  const { play } = useSound();

  return (
    <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Autonomous AI Capabilities">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs font-semibold text-[#4F46E5] uppercase tracking-wider">
          Core Intelligence Modules
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
          Nine Autonomous Modules. One Synaptic Core.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          Engineered for high-volume enterprise catalogs requiring immediate response times and deterministic accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITIES.map((cap, idx) => (
          <ScrollReveal key={idx} delay={(idx % 3) * 0.08}>
            <div
              className="h-full p-7 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#6366F1]/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              data-cursor="interactive"
              onMouseEnter={() => play("hover")}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#4F46E5] border border-indigo-100">
                    {cap.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                    {cap.code}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-[#4F46E5] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {cap.desc}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {cap.metric}
                  </span>
                  <a
                    href="#architecture"
                    className="min-h-[44px] inline-flex items-center text-[#4F46E5] hover:text-[#4338CA] font-mono text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded px-1"
                    onClick={() => play("click")}
                  >
                    LEARN MORE →
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
