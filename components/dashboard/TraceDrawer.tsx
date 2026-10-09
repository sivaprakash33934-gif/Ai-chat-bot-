"use client";

import React, { useEffect, useRef } from "react";
import { X, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { GSTINDisplay } from "./ui";

export function TraceDrawer() {
  const { activeTraceLeadId, closeTrace, leads } = useDashboardStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const activeLead = leads.find((l) => l.id === activeTraceLeadId);

  useEffect(() => {
    if (activeTraceLeadId) {
      triggerRef.current = document.activeElement as HTMLElement;
      drawerRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeTrace();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        triggerRef.current?.focus();
      };
    }
  }, [activeTraceLeadId, closeTrace]);

  if (!activeTraceLeadId || !activeLead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="trace-title">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/30 transition-opacity"
        onClick={closeTrace}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          tabIndex={-1}
          className="w-screen max-w-md border-l border-hairline bg-paper-elevated p-6 shadow-none focus:outline-none flex flex-col justify-between"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  Action Steps
                </span>
                <h2 id="trace-title" className="font-serif text-[22px] font-semibold text-ink">
                  {activeLead.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeTrace}
                aria-label="Close trace drawer"
                className="rounded p-1 text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lead Metadata Dossier */}
            <div className="mt-5 space-y-3 border-b border-hairline pb-5">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-mono text-ink-muted">Company</span>
                <span className="font-medium text-ink">{activeLead.company}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-mono text-ink-muted">Buyer Contact</span>
                <span className="text-ink">{activeLead.buyerName}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-mono text-ink-muted">Tax ID (GSTIN)</span>
                <GSTINDisplay gstin={activeLead.gstin} />
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-mono text-ink-muted">Channel</span>
                <span className="font-mono text-ink">{activeLead.channel}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-mono text-ink-muted">AI Match Score</span>
                <span className="font-mono font-medium text-ink">
                  {Math.round(activeLead.confidence * 100)}%
                </span>
              </div>
            </div>

            {/* Pipeline Trace Steps */}
            <div className="mt-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-4">
                Step-by-Step History ({activeLead.traceSteps.length} Steps)
              </h3>

              <div className="space-y-4">
                {activeLead.traceSteps.map((step, idx) => (
                  <div key={idx} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      {step.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      )}
                      {step.status === "gate_triggered" && (
                        <AlertCircle className="h-4 w-4 text-amber shrink-0" />
                      )}
                      {step.status === "verified" && (
                        <ShieldCheck className="h-4 w-4 text-ink shrink-0" />
                      )}
                      {idx !== activeLead.traceSteps.length - 1 && (
                        <div className="w-[1px] flex-1 bg-hairline my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[12px] font-semibold text-ink">
                          {step.step}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 font-sans text-[12px] text-ink-muted leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="border-t border-hairline pt-4 flex items-center justify-between text-[11px] font-mono text-ink-muted">
            <span>Audit Check</span>
            <span className="text-success font-medium">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
