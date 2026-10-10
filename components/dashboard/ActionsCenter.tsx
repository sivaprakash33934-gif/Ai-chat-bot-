"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Wrench, History, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { INITIAL_TOOL_DEFINITIONS, INITIAL_TOOL_EXECUTIONS, ToolExecution } from "@/lib/fixtures";
import { ActionsToolsTab } from "./ActionsToolsTab";
import { ActionsFailuresTab } from "./ActionsFailuresTab";
import { BusinessDecisionLedger } from "@/components/decision/BusinessDecisionLedger";

type ActionTab = "tools" | "executions" | "failures" | "ledger";

export function ActionsCenter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams.get("tab") as ActionTab) || "executions";

  const [executions, setExecutions] = useState<ToolExecution[]>(INITIAL_TOOL_EXECUTIONS);

  const handleTabChange = (tab: ActionTab) => {
    router.push(`/dashboard/actions?tab=${tab}`);
  };

  const handleRetry = (id: string) => {
    setExecutions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "succeeded", errorMessage: undefined } : e))
    );
  };

  const failureCount = executions.filter((e) => e.status === "failed" || e.status === "unknown").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-hairline pb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Control Center</span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">Action Engine</span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">Actions Center</h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
          Manage deterministic tool schemas, inspect live side-effect executions, and recover from failures.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-hairline">
        <nav className="-mb-px flex space-x-6" role="tablist" aria-label="Action tabs">
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "executions"}
            onClick={() => handleTabChange("executions")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "executions" ? "border-ink font-semibold text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            <History className="h-4 w-4" />
            <span>Recent Executions</span>
            <span className="rounded-full bg-paper border border-hairline px-2 py-0.2 font-mono text-[11px] text-ink-muted">
              {executions.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "tools"}
            onClick={() => handleTabChange("tools")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "tools" ? "border-ink font-semibold text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Tool Definitions</span>
            <span className="rounded-full bg-paper border border-hairline px-2 py-0.2 font-mono text-[11px] text-ink-muted">
              {INITIAL_TOOL_DEFINITIONS.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "failures"}
            onClick={() => handleTabChange("failures")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "failures" ? "border-ink font-semibold text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Failure Center</span>
            {failureCount > 0 && (
              <span className="rounded-full bg-amber-tint border border-amber/30 px-2 py-0.2 font-mono text-[11px] font-semibold text-amber">
                {failureCount}
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "ledger"}
            onClick={() => handleTabChange("ledger")}
            className={`flex items-center gap-2 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "ledger" ? "border-ink font-semibold text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            <History className="h-4 w-4" />
            <span>Decision Ledger</span>
          </button>
        </nav>
      </div>

      {/* Tab Panels */}
      {currentTab === "tools" && <ActionsToolsTab />}

      {currentTab === "ledger" && <BusinessDecisionLedger />}

      {currentTab === "executions" && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-hairline bg-paper-elevated">
            <table className="w-full text-left border-collapse" aria-label="Action executions table">
              <thead>
                <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  <th scope="col" className="px-5 py-3.5 font-medium">Time / ID</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Action Tool</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Actor</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Parameters</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3.5 font-medium text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline font-sans text-[13px]">
                {executions.map((e) => (
                  <tr key={e.id} className="transition-colors hover:bg-paper/60">
                    <td className="px-5 py-3.5 font-mono text-[11px] text-ink-muted">
                      <div>{e.timestamp}</div>
                      <div className="text-[9px] text-ink-faint">{e.id}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-ink">{e.toolName}</div>
                      <div className="font-mono text-[11px] text-ink-muted">{e.toolSlug}</div>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-ink">{e.actor}</td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-ink-muted max-w-xs truncate">
                      {JSON.stringify(e.parameters)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] uppercase font-semibold border ${
                          e.status === "succeeded"
                            ? "bg-success-surface text-success border-success/30"
                            : e.status === "executing"
                            ? "bg-paper text-ink border-hairline animate-pulse"
                            : "bg-error-surface text-error border-error/30"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[12px] text-ink text-right">{e.durationMs}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentTab === "failures" && <ActionsFailuresTab executions={executions} onRetry={handleRetry} />}
    </div>
  );
}
