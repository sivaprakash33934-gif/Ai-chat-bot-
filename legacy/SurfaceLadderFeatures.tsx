"use client";

import React from "react";
import { Database, Cpu, MessageSquareText, ShieldAlert, ArrowRight, Layers } from "lucide-react";

export function SurfaceLadderFeatures() {
  const ladderLayers = [
    {
      level: "SURFACE_01",
      hex: "#FFFFFF",
      bgClass: "bg-surface-1",
      borderClass: "border-border",
      title: "Encrypted MSME Data Lake",
      subtitle: "On-Premise & Sovereign Indian Cloud",
      icon: Database,
      accentColor: "text-signal-ai",
      glowBg: "bg-signal-ai/10",
      description:
        "Zero data scraping or public model exposure. All tally entries, customer phone numbers, and bank statements remain encrypted using hardware-backed AES-256 keys on Indian servers.",
      metrics: ["256-bit Hardware Keystore", "Tally & Marg ERP Direct Connector", "SOC-2 Tier IV Ready"],
    },
    {
      level: "SURFACE_02",
      hex: "#F7F8FA",
      bgClass: "bg-surface-2",
      borderClass: "border-border strong:border-border-strong",
      title: "Quantized Indic Neural Core",
      subtitle: "Sub-50ms Local Inference Engine",
      icon: Cpu,
      accentColor: "text-signal-commerce",
      glowBg: "bg-signal-commerce/10",
      description:
        "High-performance quantized neural networks tuned for 22 Indian regional languages and trade terminologies (Tamil, Hindi, Gujarati, Telugu). Understands regional bill slangs, mandi rates, and credit cycles.",
      metrics: ["22 Indic Dialects Supported", "38ms Mean Token Latency", "Offline Voice-to-Text Fallback"],
    },
    {
      level: "SURFACE_03",
      hex: "#F1F2F5",
      bgClass: "bg-surface-3",
      borderClass: "border-border-strong",
      title: "Autonomous Commerce Mesh",
      subtitle: "WhatsApp, ONDC, UPI & India Post Sync",
      icon: MessageSquareText,
      accentColor: "text-signal-growth",
      glowBg: "bg-signal-growth/10",
      description:
        "Directly converts incoming WhatsApp customer messages into verified sales orders, generates dynamic BharatQR codes, requests automated GST e-way bills, and dispatches courier tracking numbers without human friction.",
      metrics: ["WhatsApp Cloud MSME Integration", "Zero-Fee UPI QR Engine", "Automated E-Way Generation"],
    },
    {
      level: "SURFACE_04",
      hex: "#E8EAEF",
      bgClass: "bg-surface-4",
      borderClass: "border-border-strong",
      title: "Predictive Capital Copilot",
      subtitle: "Working Capital & MSME Samadhaan Protection",
      icon: ShieldAlert,
      accentColor: "text-signal-ai-hover",
      glowBg: "bg-signal-ai/20",
      description:
        "Monitors 45-day buyer payment windows mandated under Section 15 of MSME Development Act. Calculates compound penal interest automatically and generates legally enforceable recovery notices with 1-click filing.",
      metrics: ["MSME Samadhaan Legal Automation", "Cashflow Bankruptcy Predictor", "T+0 Working Capital Monitor"],
    },
  ];

  return (
    <section className="py-20 bg-canvas-deep border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow mb-2">SURFACE LADDER SYSTEM // LINEAR ARCHITECTURE</div>
            <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight">
              Four Tiers of Layered Cognitive Intelligence
            </h2>
          </div>
          <div className="text-subtext text-ink-secondary max-w-md">
            Built on a four-tier surface elevation ladder. From raw encrypted storage to autonomous capital defense.
          </div>
        </div>

        {/* 4 Surface Cards with visual depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ladderLayers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.level}
                className={`${layer.bgClass} ${layer.borderClass} border rounded-panel-lg p-6 flex flex-col justify-between transition-all duration-enter hover:translate-y-[-4px] hover:shadow-[0_12px_30px_rgba(16,24,40,0.08)] relative group`}
              >
                <div>
                  {/* Top bar with Surface token */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
                    <span className="text-micro font-mono uppercase tracking-widest text-ink-muted">
                      {layer.level}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-micro bg-canvas-deep border border-border text-ink-tertiary">
                      {layer.hex}
                    </span>
                  </div>

                  {/* Icon with glow */}
                  <div className="relative inline-flex p-3 rounded-btn bg-canvas-deep border border-border mb-4">
                    <div className={`absolute inset-0 ${layer.glowBg} rounded-btn blur-sm`} />
                    <Icon className={`w-5 h-5 ${layer.accentColor} relative z-10`} />
                  </div>

                  <h3 className="text-card font-display font-semibold text-ink-primary mb-1">
                    {layer.title}
                  </h3>
                  <div className="text-telemetry font-mono text-signal-commerce mb-3">
                    {layer.subtitle}
                  </div>

                  <p className="text-subtext text-ink-secondary mb-6 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                {/* Metrics bulleted list */}
                <div className="pt-4 border-t border-border/60 space-y-2">
                  {layer.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-telemetry font-mono text-ink-muted">
                      <span className="w-1 h-1 rounded-pill bg-ink-tertiary" />
                      <span className="text-ink-secondary text-[11px]">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
