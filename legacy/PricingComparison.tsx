"use client";

import React, { useState } from "react";
import { Check, X, ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";

interface PricingProps {
  onOpenVerification: () => void;
}

export function PricingComparison({ onOpenVerification }: PricingProps) {
  const [monthlyInvoices, setMonthlyInvoices] = useState<number>(350);

  // Calculate annual savings
  const traditionalCost = 99999;
  const platformCost = 198;
  const caManualHoursSaved = Math.round((monthlyInvoices * 12 * 0.08));
  const estimatedCashRecovery = Math.round(monthlyInvoices * 450);

  return (
    <section className="py-20 bg-canvas-elevated border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-2">RADICAL COST DEMOCRATIZATION // ₹198/YEAR</div>
          <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight mb-4">
            ₹99,999 Enterprise Cognitive Architecture. Subsidized at ₹198/Year.
          </h2>
          <p className="text-body-fluid text-ink-secondary">
            We believe India&apos;s 63 million MSMEs should not be priced out of top-tier artificial intelligence. Through sovereign infrastructure optimization, access is verified and subsidized for registered Indian enterprises.
          </p>
        </div>

        {/* Comparison Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {/* Legacy Enterprise Tier */}
          <div className="p-8 rounded-panel bg-surface-1 border border-border flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-micro font-mono text-ink-muted uppercase">LEGACY ENTERPRISE STACK</span>
                <span className="px-2 py-0.5 rounded-micro bg-signal-critical/10 text-signal-critical text-telemetry font-mono">
                  EXTORTIONATE PRICING
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2 font-mono">
                <span className="text-3xl font-bold text-ink-primary tabular-data">₹99,999</span>
                <span className="text-xs text-ink-muted">/ YEAR + IMPLEMENTATION</span>
              </div>
              <p className="text-subtext text-ink-tertiary mb-6">
                Bloated legacy ERPs requiring months of consultant onboarding, per-user seat penalties, and manual GST data exports.
              </p>

              <div className="space-y-3 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-3 text-ink-secondary">
                  <X className="w-4 h-4 text-signal-critical shrink-0" />
                  <span>₹25,000 extra for WhatsApp API connector</span>
                </div>
                <div className="flex items-center gap-3 text-ink-secondary">
                  <X className="w-4 h-4 text-signal-critical shrink-0" />
                  <span>Manual GSTR-2B invoice cross-matching</span>
                </div>
                <div className="flex items-center gap-3 text-ink-secondary">
                  <X className="w-4 h-4 text-signal-critical shrink-0" />
                  <span>Zero Indic regional language understanding</span>
                </div>
                <div className="flex items-center gap-3 text-ink-secondary">
                  <X className="w-4 h-4 text-signal-critical shrink-0" />
                  <span>No automated MSME Samadhaan legal recovery</span>
                </div>
                <div className="flex items-center gap-3 text-ink-secondary">
                  <X className="w-4 h-4 text-signal-critical shrink-0" />
                  <span>Requires dedicated IT staff to maintain servers</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div className="p-3 rounded-micro bg-surface-2 border border-border text-center text-telemetry font-mono text-ink-muted">
                TYPICAL MSME ADOPTION: &lt; 0.4%
              </div>
            </div>
          </div>

          {/* Neural Commerce Command Tier */}
          <div className="p-8 rounded-panel bg-surface-2 border-2 border-signal-commerce/50 shadow-[0_0_40px_rgba(245,158,11,0.08)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-signal-commerce text-canvas-deep font-mono font-bold text-[11px] rounded-bl-micro uppercase tracking-wider">
              VERIFIED MSME SUBSIDY
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-micro font-mono text-signal-commerce uppercase">NEURAL COMMERCE COMMAND</span>
                <span className="px-2 py-0.5 rounded-micro bg-signal-growth/15 text-signal-growth text-telemetry font-mono font-bold">
                  99.9% SAVINGS
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2 font-mono">
                <span className="text-4xl font-bold text-ink-primary tabular-data">₹198</span>
                <span className="text-xs text-signal-commerce font-bold">/ 365 FULL DAYS</span>
              </div>
              <p className="text-subtext text-ink-secondary mb-6">
                All features unlocked. Zero per-invoice caps, zero credit card trap, zero seat licensing. Gated exclusively for Indian MSME Udyam &amp; GSTIN holders.
              </p>

              <div className="space-y-3 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-3 text-ink-primary">
                  <Check className="w-4 h-4 text-signal-growth shrink-0" />
                  <span>Full WhatsApp Multilingual Commerce Engine</span>
                </div>
                <div className="flex items-center gap-3 text-ink-primary">
                  <Check className="w-4 h-4 text-signal-growth shrink-0" />
                  <span>Realtime GSTR-1, 2B, 3B automated reconciliation</span>
                </div>
                <div className="flex items-center gap-3 text-ink-primary">
                  <Check className="w-4 h-4 text-signal-growth shrink-0" />
                  <span>22 Indic languages (Tamil, Hindi, Marathi, etc.)</span>
                </div>
                <div className="flex items-center gap-3 text-ink-primary">
                  <Check className="w-4 h-4 text-signal-growth shrink-0" />
                  <span>Automated MSME Samadhaan delayed payment notices</span>
                </div>
                <div className="flex items-center gap-3 text-ink-primary">
                  <Check className="w-4 h-4 text-signal-growth shrink-0" />
                  <span>Zero-fee BharatQR dynamic settlement tracking</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenVerification}
                className="w-full py-3.5 rounded-btn bg-signal-commerce hover:bg-[#d98904] text-canvas-deep font-semibold text-sm flex items-center justify-center gap-2.5 transition-all duration-enter shadow-lg shadow-signal-commerce/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>UNLOCK FOR ₹198 VIA UDYAM CLEARANCE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive ROI Calculator for Indian Small Business */}
        <div className="max-w-4xl mx-auto p-6 rounded-panel-lg bg-surface-1 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border gap-2">
            <div>
              <span className="text-micro font-mono text-signal-commerce uppercase">INTERACTIVE ROI TELEMETRY</span>
              <h3 className="text-card font-display font-semibold text-ink-primary">
                Annual MSME Capital Efficiency Calculator
              </h3>
            </div>
            <div className="text-telemetry font-mono text-ink-tertiary">
              INVOICES / MONTH: <span className="text-signal-commerce font-bold text-sm">{monthlyInvoices}</span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-6">
            <input
              type="range"
              min="50"
              max="2500"
              step="25"
              value={monthlyInvoices}
              onChange={(e) => setMonthlyInvoices(Number(e.target.value))}
              className="w-full accent-signal-commerce bg-surface-3 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-telemetry font-mono text-ink-muted mt-2">
              <span>50 Invoices (Micro Kirana)</span>
              <span>1,000 Invoices (Textile/Auto Ancillary)</span>
              <span>2,500 Invoices (Mandi Wholesaler)</span>
            </div>
          </div>

          {/* Computed ROI Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-card bg-surface-2 border border-border text-center">
              <span className="text-micro text-ink-muted uppercase font-mono">ANNUAL DIRECT SAVING</span>
              <div className="text-xl font-bold font-mono text-signal-growth mt-1 tabular-data">
                ₹{((traditionalCost - platformCost)).toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-ink-tertiary">Software license cost delta</span>
            </div>

            <div className="p-4 rounded-card bg-surface-2 border border-border text-center">
              <span className="text-micro text-ink-muted uppercase font-mono">ACCOUNTING HOURS SAVED</span>
              <div className="text-xl font-bold font-mono text-signal-ai mt-1 tabular-data">
                {caManualHoursSaved} Hours / Year
              </div>
              <span className="text-[11px] text-ink-tertiary">Eliminates manual entry time</span>
            </div>

            <div className="p-4 rounded-card bg-surface-2 border border-border text-center">
              <span className="text-micro text-ink-muted uppercase font-mono">OVERDUE CASH RECOVERED</span>
              <div className="text-xl font-bold font-mono text-signal-commerce mt-1 tabular-data">
                ₹{estimatedCashRecovery.toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-ink-tertiary">Via automated 45-day notices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
