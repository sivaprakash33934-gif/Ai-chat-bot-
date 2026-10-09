"use client";

import React, { useState } from "react";
import { Terminal, Play, CheckCircle2, AlertCircle, Copy, Sparkles, Send, RefreshCw } from "lucide-react";

const SAMPLE_COMMANDS = [
  "Analyze Tiruppur textile dispatch vs outstanding 45-day MSME receivables",
  "Auto-reconcile 418 UPI QR store transactions against GSTR-1 July ledger",
  "Generate Tamil voice broadcast for wholesale rice dealers offering 2% instant UPI cash discount",
  "Calculate working capital runway if diesel freight rates surge by 8%",
];

export function NeuralTerminal() {
  const [inputCommand, setInputCommand] = useState(SAMPLE_COMMANDS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<{
    query: string;
    timestamp: string;
    telemetry: string;
    findings: string[];
    actionTaken: string;
    financialImpact: string;
  }>({
    query: SAMPLE_COMMANDS[0],
    timestamp: "16:42:09 IST",
    telemetry: "LATENCY: 38ms // TOKENS: 412 // REASONING: LOCAL QUANTIZED INDIC-MISTRAL",
    findings: [
      "Detected 14 outstanding invoices totaling ₹8,42,000 exceeding 45 days (MSME Samadhaan Act Section 15 threshold).",
      "Identified Buyer GSTIN 33AAACD9218P1Z8 (Erode Garments Hub) with compound interest accrued at 3x RBI bank rate.",
      "Generated automated formal reminder with Section 16 interest penalty clause and 1-click UPI payment link.",
    ],
    actionTaken: "DISPATCHED WHATSAPP + GSTN NOTICE VIA SECURE COMMERCE GATEWAY",
    financialImpact: "ACCELERATED CASH INFLOW ESTIMATE: ₹5,12,000 WITHIN 72 HOURS",
  });

  const handleExecute = (cmd: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      let output;
      if (cmd.includes("reconcile")) {
        output = {
          query: cmd,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
          telemetry: "LATENCY: 29ms // TOKENS: 380 // VECTORS: 418 UPI HASHES MATCHED",
          findings: [
            "418 PhonePe/GPay QR transactions totaling ₹2,84,300 scanned from Store POS #01 & #02.",
            "414 transactions auto-matched with Point-of-Sale cash counter vouchers (99.04% precision).",
            "4 unmatched credits (₹1,450) automatically classified into 'Unidentified Customer Advance' ledger under GST Rule 36(4).",
          ],
          actionTaken: "GSTR-1 TABLE 4 & TABLE 7 READY FOR 1-CLICK GSTN UPLOAD",
          financialImpact: "SAVED 6 HOURS OF CHARTERED ACCOUNTANT MANUAL RECONCILIATION",
        };
      } else if (cmd.includes("Tamil") || cmd.includes("voice")) {
        output = {
          query: cmd,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
          telemetry: "LATENCY: 44ms // SYNTHESIS: NOTO TAMIL VOICE // DIALECT: MADURAI/THANJAVUR",
          findings: [
            "Generated audio script: 'அன்பார்ந்த வியாபாரிகளுக்கு, இன்று மாலைக்குள் UPI மூலம் பணம் செலுத்தும் மொத்த கொள்முதல்களுக்கு 2% உடனடி தள்ளுபடி வழங்கப்படும்.'",
            "Prepared personalized WhatsApp voice-note payloads for 42 verified wholesale grocer contacts.",
            "Dynamic QR codes generated with exact net discount values per merchant credit limit.",
          ],
          actionTaken: "SCHEDULED BROADCAST QUEUED VIA META CLOUD MSME API",
          financialImpact: "PROJECTED SAME-DAY LIQUIDITY RECOVERY: ₹3,80,000",
        };
      } else if (cmd.includes("runway") || cmd.includes("diesel")) {
        output = {
          query: cmd,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
          telemetry: "LATENCY: 22ms // MONTE CARLO SIMULATION: 1,000 ITERATIONS",
          findings: [
            "Freight cost share currently stands at 7.4% of COGS across interstate Tamil Nadu - Maharashtra corridors.",
            "An 8% surge will increase monthly transport burn by ₹38,400.",
            "Recommendation: Consolidate Tiruppur shipments to bi-weekly bulk loads via ONDC-verified logistics partner to negate 6.2% of surcharge.",
          ],
          actionTaken: "OPTIMIZED ROUTE LOGISTICS TABLE GENERATED",
          financialImpact: "NET MARGIN PRESERVATION: +₹32,100 / MONTH",
        };
      } else {
        output = {
          query: cmd,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
          telemetry: "LATENCY: 31ms // REASONING: HEURISTIC MSME SOLVER",
          findings: [
            "Queried local enterprise ledger with 256-bit isolation.",
            "Cross-referenced recent purchase registers and supplier credit scores.",
            "Formulated action blueprint optimized for Indian working capital cycles.",
          ],
          actionTaken: "ENTERPRISE POLICY ENFORCED",
          financialImpact: "EFFICIENCY GAIN RECORDED",
        };
      }
      setExecutionOutput(output);
      setIsProcessing(false);
    }, 450);
  };

  return (
    <section id="live-terminal" className="py-20 bg-canvas-elevated border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="eyebrow mb-2">AI COMMAND CENTER // WE-EVOLVE-IT CORE</div>
            <h2 className="text-section font-display font-semibold text-ink-primary tracking-tight">
              Sub-Second Autonomous Business Dispatch
            </h2>
          </div>
          <div className="text-subtext text-ink-secondary max-w-md">
            Execute complex tax audits, multilingual WhatsApp campaigns, and ledger reconciliations in plain Indian conversational language.
          </div>
        </div>

        {/* Quick Command Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          <span className="text-micro font-mono text-ink-muted uppercase whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-signal-commerce" /> PRESETS:
          </span>
          {SAMPLE_COMMANDS.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputCommand(cmd);
                handleExecute(cmd);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-micro bg-surface-1 hover:bg-surface-2 border border-border hover:border-border-strong text-ink-secondary hover:text-ink-primary whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>{cmd.slice(0, 38)}...</span>
            </button>
          ))}
        </div>

        {/* The Obsidian Terminal Panel */}
        <div className="rounded-panel-lg bg-surface-1 border border-border strong:border-border-strong shadow-2xl overflow-hidden relative">
          {/* Terminal Window Chrome */}
          <div className="px-5 py-3.5 bg-surface-2 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-pill bg-[#DC2626]/60" />
                <div className="w-2.5 h-2.5 rounded-pill bg-[#F59E0B]/60" />
                <div className="w-2.5 h-2.5 rounded-pill bg-[#10B981]/60" />
              </div>
              <div className="h-4 w-px bg-border mx-1" />
              <div className="flex items-center gap-2 text-telemetry font-mono text-ink-tertiary">
                <Terminal className="w-3.5 h-3.5 text-signal-ai" />
                <span>neural-command@msme-core-01:~#</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-telemetry font-mono">
              <span className="text-signal-commerce">ENC: RSA-4096</span>
              <span className="px-1.5 py-0.5 rounded-micro bg-signal-growth/15 text-signal-growth text-[10px]">
                ONLINE
              </span>
            </div>
          </div>

          {/* Interactive Command Input Bar */}
          <div className="p-4 bg-surface-2/40 border-b border-border flex items-center gap-3">
            <div className="text-signal-ai font-mono text-sm font-bold pl-2">❯</div>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExecute(inputCommand);
              }}
              placeholder="Enter MSME command (e.g. Audit GSTR-2B mismatches or forecast weekly cashflow)..."
              className="w-full bg-transparent text-ink-primary font-mono text-sm focus:outline-none placeholder:text-ink-muted selection:bg-signal-ai/30"
            />
            <button
              onClick={() => handleExecute(inputCommand)}
              disabled={isProcessing}
              className="px-4 py-2 rounded-btn bg-signal-ai hover:bg-signal-ai-hover disabled:opacity-50 text-white font-mono text-xs flex items-center gap-2 transition-all duration-enter shrink-0"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>INFERRING</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>EXECUTE</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Output Display */}
          <div className="p-6 font-mono text-xs space-y-4">
            {/* Command & Telemetry meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 text-telemetry text-ink-tertiary gap-2">
              <div className="flex items-center gap-2">
                <span className="text-signal-ai">REQUEST:</span>
                <span className="text-ink-primary font-medium">{executionOutput.query}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-ink-muted">{executionOutput.timestamp}</span>
                <span className="text-signal-commerce">{executionOutput.telemetry}</span>
              </div>
            </div>

            {/* Findings list */}
            <div>
              <div className="text-telemetry uppercase text-ink-muted tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-pill bg-signal-ai" />
                <span>NEURAL INFERENCE & REGULATORY TELEMETRY:</span>
              </div>
              <div className="space-y-2 pl-3 border-l-2 border-signal-ai/40">
                {executionOutput.findings.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-ink-secondary">
                    <span className="text-signal-ai shrink-0">▸</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action card & Financial impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-card bg-surface-2 border border-border flex flex-col gap-1">
                <span className="text-micro text-ink-muted uppercase">AUTONOMOUS DISPATCH STATUS</span>
                <span className="text-ink-primary font-bold text-xs flex items-center gap-1.5 text-signal-growth">
                  <CheckCircle2 className="w-4 h-4" /> {executionOutput.actionTaken}
                </span>
              </div>

              <div className="p-3.5 rounded-card bg-surface-2 border border-border flex flex-col gap-1">
                <span className="text-micro text-ink-muted uppercase">QUANTIFIABLE MSME IMPACT</span>
                <span className="text-signal-commerce font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> {executionOutput.financialImpact}
                </span>
              </div>
            </div>

            {/* Blinking Prompt Line */}
            <div className="pt-2 flex items-center gap-2 text-ink-muted font-mono text-telemetry">
              <span className="text-signal-growth">●</span>
              <span>Awaiting next command stream</span>
              <span className="w-2 h-4 bg-signal-ai animate-caret-blink inline-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
