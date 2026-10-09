"use client";

import React from "react";
import { ShieldCheck, Terminal, Cpu, Globe, Lock, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenVerification: () => void;
  language: "en" | "ta";
  onToggleLanguage: () => void;
}

export function Navbar({ onOpenVerification, language, onToggleLanguage }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-canvas-deep/85 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-btn bg-surface-2 border border-border strong:border-border-strong group">
            <div className="absolute inset-0 bg-signal-ai/10 rounded-btn blur-sm" />
            <Terminal className="w-4 h-4 text-signal-ai relative z-10 transition-transform duration-enter group-hover:scale-110" />
            {/* Pulse beacon */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-pill bg-signal-growth opacity-75"></span>
              <span className="relative inline-flex rounded-pill h-2.5 w-2.5 bg-signal-growth"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-tight text-ink-primary text-base">
                NEURAL COMMERCE
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded-micro bg-signal-commerce-soft text-signal-commerce border border-signal-commerce/20">
                COMMAND
              </span>
            </div>
            <span className="text-micro text-ink-muted uppercase tracking-wider font-mono">
              MSME OS // v2.4 IND
            </span>
          </div>
        </div>

        {/* Live Telemetry Status Center */}
        <div className="hidden md:flex items-center gap-6 text-telemetry font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded-micro bg-surface-1 border border-border">
            <span className="w-1.5 h-1.5 rounded-pill bg-signal-growth animate-pulse" />
            <span className="text-ink-secondary">SYS_STATUS:</span>
            <span className="text-signal-growth">OPERATIONAL</span>
          </div>

          <div className="flex items-center gap-2 text-ink-tertiary">
            <Cpu className="w-3.5 h-3.5 text-signal-ai" />
            <span>LATENCY:</span>
            <span className="text-ink-primary tabular-data">14.2ms</span>
          </div>

          <div className="flex items-center gap-2 text-ink-tertiary">
            <span>NODES:</span>
            <span className="text-signal-commerce font-mono">BLR / MAA / BOM</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-btn bg-surface-1 hover:bg-surface-2 border border-border text-ink-secondary hover:text-ink-primary transition-colors text-xs font-mono"
            title="Switch Language (English / தமிழ்)"
          >
            <Globe className="w-3.5 h-3.5 text-signal-commerce" />
            <span className="font-medium">{language === "en" ? "EN" : "தமிழ்"}</span>
          </button>

          {/* Gated Access Button */}
          <button
            onClick={onOpenVerification}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-signal-ai hover:bg-signal-ai-hover text-white text-xs font-medium tracking-wide shadow-[0_0_20px_rgba(79,106,255,0.25)] transition-all duration-enter"
          >
            <Lock className="w-3.5 h-3.5 text-white/80 group-hover:rotate-12 transition-transform duration-enter" />
            <span>{language === "en" ? "GATED CLEARANCE" : "அனுமதி சரிபார்ப்பு"}</span>
            <span className="px-1.5 py-0.2 rounded-micro bg-white/20 text-[10px] font-mono">₹198/YR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
