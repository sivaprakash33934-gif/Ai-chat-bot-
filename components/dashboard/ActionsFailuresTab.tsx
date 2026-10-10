"use client";

import React, { useState } from "react";
import { AlertCircle, RotateCcw, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ToolExecution } from "@/lib/fixtures";
import { ActionLifecycle } from "@/components/action/ActionLifecycle";

interface ActionsFailuresTabProps {
  executions: ToolExecution[];
  onRetry: (id: string) => void;
}

export function ActionsFailuresTab({ executions, onRetry }: ActionsFailuresTabProps) {
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const failures = executions.filter((e) => e.status === "failed" || e.status === "unknown");

  const handleRetryClick = (id: string) => {
    setRetryingId(id);
    setTimeout(() => {
      onRetry(id);
      setRetryingId(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber" />
          <h2 className="font-serif text-[18px] font-semibold text-ink">Action Failure Center</h2>
        </div>
        <span className="font-mono text-[11px] text-amber font-semibold">
          {failures.length} Require Review
        </span>
      </div>

      <div className="border-l-4 border-l-amber border border-hairline bg-paper-elevated p-4">
        <div className="font-mono text-[11px] uppercase tracking-wider text-amber font-semibold">
          Deterministic Safety Invariant Active
        </div>
        <p className="mt-1 font-sans text-[13px] text-ink-muted">
          When an external API call times out or a rule limit is breached, AI halts immediately without guessing.
          Review the cause below or test a simulated retry.
        </p>
      </div>

      {failures.length === 0 ? (
        <div className="border border-hairline bg-paper p-8 text-center font-sans text-sm text-ink-muted">
          All action executions are operating normally. Zero failures recorded.
        </div>
      ) : (
        <div className="space-y-4">
          {failures.map((item) => (
            <div key={item.id} className="border border-hairline bg-paper-elevated p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[16px] font-semibold text-ink">{item.toolName}</span>
                    <span className="font-mono text-[11px] text-ink-muted">({item.id})</span>
                  </div>
                  <div className="font-mono text-[11px] text-ink-faint">
                    Actor: {item.actor} · {item.timestamp} · Latency: {item.durationMs}ms
                  </div>
                </div>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] uppercase font-semibold ${
                    item.status === "failed"
                      ? "border-error/30 bg-error-surface text-error"
                      : "border-amber/30 bg-amber-tint text-amber"
                  }`}
                >
                  {item.status === "failed" ? "Safety Halt (Failed)" : "Indeterminate (Unknown)"}
                </span>
              </div>

              {/* Error Reason */}
              <div className="border border-hairline bg-paper p-3 space-y-1">
                <span className="block font-mono text-[10px] uppercase text-ink-faint">Reported Error:</span>
                <p className="font-mono text-[12px] text-ink font-medium leading-relaxed">
                  {item.errorMessage || "Execution terminated unexpectedly."}
                </p>
              </div>

              {/* Parameters Attempted */}
              <div className="space-y-1">
                <span className="block font-mono text-[10px] uppercase text-ink-faint">Parameters Sent:</span>
                <pre className="rounded border border-hairline bg-paper p-2.5 font-mono text-[11px] text-ink-muted overflow-x-auto">
                  {JSON.stringify(item.parameters, null, 2)}
                </pre>
              </div>

              {/* Action Lifecycle Control Flow */}
              <div className="pt-2">
                <ActionLifecycle
                  actionId={item.id}
                  actionTitle={item.toolName}
                  targetSystem={item.toolSlug === "erp_webhook" ? "SAP ECC / S4HANA Gateway" : "Internal CRM Gateway"}
                  currentState={item.status === "failed" ? "FAILED" : "RETRY AVAILABLE"}
                  nextResponsibleRole="Operations Lead (Level 2)"
                  requiredApproval="Manual Recovery Sign-off"
                  timestamp={item.timestamp}
                  onRetry={() => handleRetryClick(item.id)}
                  onHold={() => alert(`[DEMO] Action ${item.id} placed in hold inspection queue.`)}
                />
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-hairline">
                <div className="font-mono text-[11px] text-ink-muted">
                  Result Checksum: <code>{item.resultHash}</code>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRetryClick(item.id)}
                    disabled={retryingId === item.id}
                    className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink/50"
                  >
                    <RotateCcw className={`h-3 w-3 ${retryingId === item.id ? "animate-spin" : ""}`} />
                    <span>{retryingId === item.id ? "Retrying..." : "[DEMO] Retry Action"}</span>
                  </button>
                  <a
                    href="/dashboard/queue?tab=handoffs"
                    className="inline-flex items-center gap-1.5 rounded border border-ink bg-ink px-3 py-1.5 font-mono text-[11px] font-semibold text-paper hover:bg-ink/90"
                  >
                    <span>View in Queue</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
