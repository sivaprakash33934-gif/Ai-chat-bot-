"use client";

import React, { useState, useEffect } from "react";
import { Activity, ArrowUpRight, TrendingUp, RefreshCw, Layers, Shield, Zap, Bell, CheckCircle } from "lucide-react";

export function TelemetryDeck() {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-canvas-deep border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow mb-2">QUANTITATIVE TELEMETRY // ASPEN MATRIX</div>
            <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight">
              Live Industrial Telemetry & MSME Ledger Flow
            </h2>
          </div>

          <div className="flex items-center gap-3 text-telemetry font-mono text-ink-tertiary">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-micro bg-surface-2 border border-border">
              <span className="w-1.5 h-1.5 rounded-pill bg-signal-growth animate-pulse" />
              <span>SYNC_CYCLE: 2.8s</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-micro bg-surface-2 border border-border">
              <RefreshCw className="w-3 h-3 text-signal-ai animate-spin" style={{ animationDuration: "6s" }} />
              <span>STREAM: 4,129 OPS/SEC</span>
            </span>
          </div>
        </div>

        {/* Telemetry 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Tile 1: GSTIN & E-Way Automated Sync */}
          <div className="p-5 rounded-panel bg-surface-1 border border-border hover:border-border-strong transition-all duration-enter relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-signal-ai/5 rounded-full blur-xl group-hover:bg-signal-ai/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-mono text-ink-muted uppercase">GSTR-1 / 3B NEURAL AUDIT</span>
              <span className="px-1.5 py-0.5 rounded-micro bg-signal-growth/10 border border-signal-growth/20 text-signal-growth font-mono text-[10px]">
                100% MATCH
              </span>
            </div>

            <div className="text-2xl font-bold font-mono text-ink-primary tabular-data mb-1 flex items-baseline gap-2">
              <span>₹14,82,340</span>
              <span className="text-xs text-signal-growth flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +18.4%
              </span>
            </div>

            <p className="text-subtext text-ink-tertiary mb-4">
              Reconciled across 428 invoices. E-way bill auto-generated for 3 inter-state consignments.
            </p>

            <div className="pt-3 border-t border-border flex items-center justify-between text-telemetry font-mono text-ink-muted">
              <span>ITC ELIGIBILITY:</span>
              <span className="text-ink-primary tabular-data">₹1,94,210 [AUTO-TAGGED]</span>
            </div>
          </div>

          {/* Tile 2: WhatsApp Conversational Commerce */}
          <div className="p-5 rounded-panel bg-surface-1 border border-border hover:border-border-strong transition-all duration-enter relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-signal-commerce/5 rounded-full blur-xl group-hover:bg-signal-commerce/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-mono text-ink-muted uppercase">WHATSAPP COMMERCE ENGINE</span>
              <span className="px-1.5 py-0.5 rounded-micro bg-signal-commerce/15 border border-signal-commerce/30 text-signal-commerce font-mono text-[10px]">
                TAMIL / EN
              </span>
            </div>

            <div className="text-2xl font-bold font-mono text-ink-primary tabular-data mb-1 flex items-baseline gap-2">
              <span>184 ORDERS</span>
              <span className="text-xs text-signal-commerce">0 MANUAL CALLS</span>
            </div>

            <p className="text-subtext text-ink-tertiary mb-4">
              Autonomous catalog bot accepted 184 wholesale purchase intents via WhatsApp audio/text.
            </p>

            <div className="pt-3 border-t border-border flex items-center justify-between text-telemetry font-mono text-ink-muted">
              <span>CONVERSION VELOCITY:</span>
              <span className="text-signal-commerce tabular-data">89.2% COMPLETION</span>
            </div>
          </div>

          {/* Tile 3: UPI Velocity & Predictive Cashflow */}
          <div className="p-5 rounded-panel bg-surface-1 border border-border hover:border-border-strong transition-all duration-enter relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-signal-growth/5 rounded-full blur-xl group-hover:bg-signal-growth/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-mono text-ink-muted uppercase">PREDICTIVE CASHFLOW VELOCITY</span>
              <span className="px-1.5 py-0.5 rounded-micro bg-signal-growth/10 border border-signal-growth/20 text-signal-growth font-mono text-[10px]">
                T+0 SETTLED
              </span>
            </div>

            <div className="text-2xl font-bold font-mono text-ink-primary tabular-data mb-1 flex items-baseline gap-2">
              <span>₹4,92,100</span>
              <span className="text-xs text-signal-growth">32 D-DAYS BUFFER</span>
            </div>

            <p className="text-subtext text-ink-tertiary mb-4">
              Realtime UPI QR reconciliation against vendor debts. Zero bounced cheques or working capital crunch.
            </p>

            <div className="pt-3 border-t border-border flex items-center justify-between text-telemetry font-mono text-ink-muted">
              <span>RUNWAY FORECAST:</span>
              <span className="text-ink-primary tabular-data">OPTIMAL (+44 DAYS)</span>
            </div>
          </div>

          {/* Tile 4: Inventory Depletion Neural Trigger */}
          <div className="p-5 rounded-panel bg-surface-1 border border-border hover:border-border-strong transition-all duration-enter relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-signal-ai/5 rounded-full blur-xl group-hover:bg-signal-ai/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-micro font-mono text-ink-muted uppercase">INVENTORY DEPLETION MATRIX</span>
              <span className="px-1.5 py-0.5 rounded-micro bg-signal-ai/10 border border-signal-ai/20 text-signal-ai font-mono text-[10px]">
                AUTO-PO SENT
              </span>
            </div>

            <div className="text-2xl font-bold font-mono text-ink-primary tabular-data mb-1 flex items-baseline gap-2">
              <span>98.6%</span>
              <span className="text-xs text-ink-secondary">STOCK ACCURACY</span>
            </div>

            <p className="text-subtext text-ink-tertiary mb-4">
              SKU #4801 (Sivakasi Raw Pulp 120GSM) replenished before 72hr critical stockout window.
            </p>

            <div className="pt-3 border-t border-border flex items-center justify-between text-telemetry font-mono text-ink-muted">
              <span>PO TRIGGER:</span>
              <span className="text-signal-growth tabular-data">DISPATCH CONFIRMED</span>
            </div>
          </div>
        </div>

        {/* Live Streaming Industrial Telemetry Feed (Sharplink Obsidian Bar) */}
        <div className="p-4 rounded-card bg-surface-2 border border-border font-mono text-telemetry flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-signal-commerce">
              <Activity className="w-4 h-4 text-signal-commerce animate-pulse" />
              <span className="font-semibold">EVENT_BUS:</span>
            </div>
            <div className="text-ink-secondary text-xs truncate max-w-xl">
              {ticker % 3 === 0 && (
                <span>[INVOICE_INGEST] Invoice #NCC-2024-9401 auto-verified with GSTN portal // Hash 0x9f1a...c43</span>
              )}
              {ticker % 3 === 1 && (
                <span>[WHATSAPP_TX] Salem Handloom Cluster order #492 confirmed via audio recognition (Tamil)</span>
              )}
              {ticker % 3 === 2 && (
                <span>[UPI_SETTLE] HDFC Bank webhook: ₹42,500 credited via UPI-ID: krishnatraders@okaxis</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-ink-tertiary text-xs shrink-0">
            <span>MEM: 34.2MB</span>
            <span>ENCRYPT: AES-GCM-256</span>
            <span className="text-signal-growth">NODE: CHENNAI-01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
