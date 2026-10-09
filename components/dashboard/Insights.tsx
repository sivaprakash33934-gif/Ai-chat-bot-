"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { MetricCard } from "./ui";

export function Insights() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read range from URL or default to "30" (Addendum C)
  const rangeParam = (searchParams.get("range") as "7" | "30" | "90") || "30";
  const { outcomeLedger } = useDashboardStore();

  const handleRangeChange = (range: "7" | "30" | "90") => {
    router.push(`/dashboard/insights?range=${range}`);
  };

  // Scale factor based on range
  const multiplier = rangeParam === "7" ? 0.25 : rangeParam === "90" ? 3.0 : 1.0;

  // Scaled stat cards
  const stats = useMemo(() => {
    return {
      conversations: Math.round(1840 * multiplier).toLocaleString(),
      actions: Math.round(4634 * multiplier).toLocaleString(),
      outcomes: Math.round(4348 * multiplier).toLocaleString(),
      failures: Math.round(18 * multiplier),
    };
  }, [multiplier]);

  // Scaled ledger rows & computed totals
  const scaledLedger = useMemo(() => {
    return outcomeLedger.map((row) => ({
      ...row,
      volume: Math.round(row.volume * multiplier),
      humanHoursSaved: Math.round(row.humanHoursSaved * multiplier),
      autonomousGmv: row.autonomousGmv * multiplier,
    }));
  }, [outcomeLedger, multiplier]);

  const totals = useMemo(() => {
    const totalVolume = scaledLedger.reduce((sum, r) => sum + r.volume, 0);
    const totalHours = scaledLedger.reduce((sum, r) => sum + r.humanHoursSaved, 0);
    const totalGmv = scaledLedger.reduce((sum, r) => sum + r.autonomousGmv, 0);
    const avgAccuracy = (
      scaledLedger.reduce((sum, r) => sum + r.accuracyPct * r.volume, 0) /
      (totalVolume || 1)
    ).toFixed(1);

    return { totalVolume, totalHours, totalGmv, avgAccuracy };
  }, [scaledLedger]);

  return (
    <div className="space-y-10">
      {/* Header & Date Range Selector */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Insights
            </span>
            <span className="text-ink-muted">/</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
              Business Analytics
            </span>
          </div>
          <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
            Business Insights
          </h1>
          <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
            Clear report on time saved by AI, accuracy rates, and running costs.
          </p>
        </div>

        {/* Date Range Selector (Addendum C: persists in ?range=...) */}
        <div className="flex items-center gap-1 border border-hairline bg-paper p-1 rounded-sm">
          {(
            [
              { id: "7", label: "7 Days" },
              { id: "30", label: "30 Days" },
              { id: "90", label: "90 Days" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleRangeChange(item.id)}
              className={`px-3 py-1 font-mono text-[12px] transition-colors rounded-sm ${
                rangeParam === item.id
                  ? "bg-paper-elevated text-ink font-semibold shadow-none border border-hairline"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Computed Scaling Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Customer Conversations"
          value={stats.conversations}
          subvalue={`Last ${rangeParam} days`}
          indicator="neutral"
          isDemo={true}
        />
        <MetricCard
          label="Actions Taken by AI"
          value={stats.actions}
          subvalue="Handled automatically"
          indicator="positive"
          isDemo={true}
        />
        <MetricCard
          label="Business Results"
          value={stats.outcomes}
          subvalue="Quotes, invoices & dispatches"
          indicator="positive"
          isDemo={true}
        />
        <MetricCard
          label="Rules Blocked"
          value={stats.failures.toString()}
          subvalue="Stopped for human review"
          indicator={stats.failures > 0 ? "warning" : "positive"}
          isDemo={true}
        />
      </div>

      {/* Section 1: Business Results Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-ink" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Business Results
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            Each action counted once
          </span>
        </div>

        <div className="overflow-x-auto border border-hairline bg-paper-elevated">
          <table className="w-full text-left border-collapse" aria-label="Business results ledger">
            <thead>
              <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-5 py-3.5 font-medium">Category</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-right">Actions Completed</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-right">Hours Saved</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-right">Sales Made by AI</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-right">AI Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans text-[13px]">
              {scaledLedger.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-paper/60">
                  <td className="px-5 py-3.5 font-medium text-ink">
                    <div>{row.category}</div>
                    <span className="font-mono text-[10px] text-ink-muted">{row.id}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-right text-ink">
                    {row.volume.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-right text-ink">
                    {row.humanHoursSaved.toLocaleString()} hrs
                  </td>
                  <td className="px-5 py-3.5 font-mono text-right text-ink">
                    {row.autonomousGmv > 0
                      ? `₹${(row.autonomousGmv / 10000000).toFixed(2)} Cr`
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-right text-success font-medium">
                    {row.accuracyPct}%
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Computed Totals Row */}
            <tfoot>
              <tr className="border-t-2 border-hairline bg-paper font-mono text-[13px] font-bold text-ink">
                <td className="px-5 py-4">Total Results</td>
                <td className="px-5 py-4 text-right">{totals.totalVolume.toLocaleString()}</td>
                <td className="px-5 py-4 text-right">{totals.totalHours.toLocaleString()} hrs</td>
                <td className="px-5 py-4 text-right">₹{(totals.totalGmv / 10000000).toFixed(2)} Cr</td>
                <td className="px-5 py-4 text-right text-success">{totals.avgAccuracy}%</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mutual-Exclusivity Footnote (§12) */}
        <p className="font-mono text-[11px] text-ink-muted leading-relaxed">
          Each action counted once: Every transaction is tracked in only one category. Nothing is double-counted.
        </p>
      </section>

      {/* Section 2: AI Quality & AI Cost Blocks */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* AI Quality Block */}
        <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              <h3 className="font-serif text-[18px] font-semibold text-ink">
                AI Quality & Accuracy
              </h3>
            </div>
            <span className="rounded border border-hairline bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
              [DEMO]
            </span>
          </div>

          <div className="space-y-3 font-mono text-[13px]">
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Test Accuracy Score</span>
              <span className="flex items-center gap-1.5 font-bold text-success">
                <span>99.8%</span>
                <span className="rounded border border-hairline bg-paper px-1 py-0.2 text-[9px] font-normal text-ink-muted">[DEMO]</span>
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Answer Sources Verified</span>
              <span className="flex items-center gap-1.5 font-bold text-ink">
                <span>99.4%</span>
                <span className="rounded border border-hairline bg-paper px-1 py-0.2 text-[9px] font-normal text-ink-muted">[DEMO]</span>
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Made-up Answers</span>
              <span className="flex items-center gap-1.5 font-bold text-success">
                <span>0.0% (Zero)</span>
                <span className="rounded border border-hairline bg-paper px-1 py-0.2 text-[9px] font-normal text-ink-muted">[DEMO]</span>
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-ink-muted">Double-Check Verification</span>
              <span className="flex items-center gap-1.5 font-bold text-ink">
                <span>100.0%</span>
                <span className="rounded border border-hairline bg-paper px-1 py-0.2 text-[9px] font-normal text-ink-muted">[DEMO]</span>
              </span>
            </div>
          </div>
        </div>

        {/* AI Cost Block */}
        <div className="border border-hairline bg-paper-elevated p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-ink" />
              <h3 className="font-serif text-[18px] font-semibold text-ink">
                AI Running Costs
              </h3>
            </div>
            <span className="rounded border border-hairline bg-paper px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
              [DEMO]
            </span>
          </div>

          <div className="space-y-3 font-mono text-[13px]">
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Cost Per Conversation</span>
              <span className="font-bold text-ink">₹0.42</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Words Processed (Tokens)</span>
              <span className="font-bold text-ink">
                {(4.8 * multiplier).toFixed(1)}M words
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-hairline">
              <span className="text-ink-muted">Local AI Cost</span>
              <span className="font-bold text-ink">
                ₹{Math.round(2016 * multiplier).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-ink-muted">Return on Investment</span>
              <span className="font-bold text-success">142x Labor Savings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: AI Health & System Telemetry Block (B4) */}
      <section className="border border-hairline bg-paper-elevated p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ink" />
            <h3 className="font-serif text-[18px] font-semibold text-ink">
              AI Health &amp; Response Telemetry
            </h3>
          </div>
          <span className="rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-muted">
            [DEMO — awaiting live telemetry]
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="border border-hairline bg-paper p-3.5 space-y-1">
            <span className="text-[10px] uppercase text-ink-faint">Median Latency (P50)</span>
            <div className="text-lg font-bold text-ink tabular-nums">420ms</div>
            <p className="text-[11px] text-ink-muted font-sans">Under 1.0s target SLA</p>
          </div>

          <div className="border border-hairline bg-paper p-3.5 space-y-1">
            <span className="text-[10px] uppercase text-ink-faint">Tail Latency (P95)</span>
            <div className="text-lg font-bold text-ink tabular-nums">1.18s</div>
            <p className="text-[11px] text-ink-muted font-sans">95% of replies stream within 1.2s</p>
          </div>

          <div className="border border-hairline bg-paper p-3.5 space-y-1">
            <span className="text-[10px] uppercase text-ink-faint">Grounding Retrieval Hit Rate</span>
            <div className="text-lg font-bold text-success tabular-nums">94.6%</div>
            <p className="text-[11px] text-ink-muted font-sans">Verified vector matches &gt;0.82</p>
          </div>

          <div className="border border-hairline bg-paper p-3.5 space-y-1">
            <span className="text-[10px] uppercase text-ink-faint">Tool Failure Rate</span>
            <div className="text-lg font-bold text-ink tabular-nums">0.38%</div>
            <p className="text-[11px] text-ink-muted font-sans">2 transient network retries recorded</p>
          </div>
        </div>
      </section>
    </div>
  );
}
