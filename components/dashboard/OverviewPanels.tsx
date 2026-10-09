"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { WIDGET_CONVERSATIONS } from "@/lib/fixtures";
import { MetricCard, StatusBadge, EmptyState } from "./ui";

export function OverviewPanels() {
  const router = useRouter();
  const {
    leads,
    approvals,
    handoffs,
    auditLog,
    needsAttentionCount,
    openTrace,
  } = useDashboardStore();

  // Compute Total Lead Value
  const totalPipelineVal = leads.reduce((sum, l) => sum + l.value, 0);
  const formattedPipeline = `₹${(totalPipelineVal / 10000000).toFixed(2)} Cr`;

  // Filter pending attention items
  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const pendingHandoffs = handoffs.filter((h) => h.status === "pending");

  // Combined Waiting for You Queue sorted by urgency (high first)
  const attentionItems = [
    ...pendingApprovals.map((a) => ({
      id: a.id,
      recordId: a.recordId,
      type: "approval" as const,
      title: `Discount Approval: ${a.discountPct}% requested`,
      subtitle: `${a.company} · ${a.buyerName}`,
      urgency: a.urgency,
      timestamp: a.timestamp,
      detail: a.ruleCitation,
      targetTab: "approvals",
    })),
    ...pendingHandoffs.map((h) => ({
      id: h.id,
      recordId: h.id,
      type: "handoff" as const,
      title: `Escalated Conversation: ${h.issue}`,
      subtitle: `${h.company} · ${h.buyerName}`,
      urgency: (h.confidenceScore < 0.7 ? "high" : "medium") as "high" | "medium" | "low",
      timestamp: h.timestamp,
      detail: h.whyFailed,
      targetTab: "handoffs",
    })),
  ].sort((a, b) => {
    const weights = { high: 3, medium: 2, low: 1 };
    return weights[b.urgency] - weights[a.urgency];
  });

  // AI completed actions from activity log
  const autonomousActions = auditLog
    .filter(
      (entry) =>
        entry.action === "QUOTE_DISPATCHED" ||
        entry.action === "PRICE_CARD_RELOADED" ||
        entry.action.includes("GATE")
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Dashboard
          </span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Live Overview
          </span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
          Overview
        </h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted leading-relaxed">
          Live summary of your sales and AI actions. Review pending quotes or see what AI resolved.
        </p>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          label="Total Lead Value"
          value={formattedPipeline}
          subvalue={`${leads.length} leads in queue`}
          indicator="positive"
        />
        <MetricCard
          label="Waiting for You"
          value={needsAttentionCount.toString()}
          subvalue={
            needsAttentionCount > 0
              ? `${pendingApprovals.length} approvals, ${pendingHandoffs.length} escalated`
              : "All caught up"
          }
          indicator={needsAttentionCount > 0 ? "warning" : "positive"}
        />
        <MetricCard
          label="Handled by AI"
          value="93.8%"
          subvalue="48 of 51 customer requests solved"
          indicator="positive"
          isDemo={true}
        />
        <MetricCard
          label="Discounts Given"
          value="8.2%"
          subvalue="Within 28.0% minimum profit limit"
          indicator="neutral"
          isDemo={true}
        />
        <MetricCard
          label="Widget Conversations"
          value={WIDGET_CONVERSATIONS.length.toString()}
          subvalue="3 website sessions"
          indicator="positive"
          isDemo={true}
        />
      </div>

      {/* Two Column Grid: Waiting for You (Left) & Handled by AI (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Waiting for You (7 cols) */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber" />
              <h2 className="font-serif text-[18px] font-semibold text-ink">
                Waiting for You
              </h2>
            </div>
            <span className="font-mono text-[11px] text-ink-muted">
              {attentionItems.length} Pending
            </span>
          </div>

          {attentionItems.length === 0 ? (
            <EmptyState
              title="Nothing waiting for you right now."
              description="AI has answered all buyer requests within your business rules."
            />
          ) : (
            <div className="space-y-3">
              {attentionItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/dashboard/queue?tab=${item.targetTab}&id=${item.id}`)}
                  className="group relative cursor-pointer border border-hairline bg-paper-elevated p-4 transition-all hover:border-ink/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded-sm border ${
                            item.type === "approval"
                              ? "bg-amber-tint text-amber border-amber/30"
                              : "bg-error-surface text-error border-error/30"
                          }`}
                        >
                          {item.type === "approval" ? "Approval Needed" : "Escalated Conversation"}
                        </span>
                        <span className="font-mono text-[11px] text-ink-muted">
                          {item.recordId}
                        </span>
                      </div>
                      <h3 className="font-sans text-[14px] font-semibold text-ink group-hover:text-ink">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[12px] text-ink-muted">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] text-ink-faint block">
                        {item.timestamp}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
                        Review <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-hairline pt-2 text-[11px] font-mono text-ink-muted line-clamp-1">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Handled by AI (5 cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-success" />
              <h2 className="font-serif text-[18px] font-semibold text-ink">
                Handled by AI
              </h2>
            </div>
            <Link
              href="/dashboard/insights"
              className="font-mono text-[11px] text-ink-muted hover:text-ink"
            >
              Business Results →
            </Link>
          </div>

          <div className="border border-hairline bg-paper-elevated divide-y divide-hairline">
            {/* Website Widget autonomous interaction feed item */}
            <div className="p-3.5 space-y-1.5 bg-paper/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <span>Website Chat: SKU-BRASS-6MM Stock Check</span>
                </div>
                <span className="font-mono text-[10px] text-ink-muted">25 mins ago</span>
              </div>
              <p className="font-sans text-[12px] text-ink-muted leading-snug">
                Verified 1,420 units in Coimbatore warehouse and generated lead for sales team.
              </p>
              <div className="flex items-center justify-between pt-1 font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                <span>WIDGET-002 · Verified</span>
                <span className="text-ink">Channel: Website</span>
              </div>
            </div>

            {autonomousActions.map((action) => (
              <div key={action.id} className="p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    <span>{action.target}</span>
                  </div>
                  <span className="font-mono text-[10px] text-ink-muted">
                    {action.timestamp}
                  </span>
                </div>
                <p className="font-sans text-[12px] text-ink-muted leading-snug">
                  {action.details}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                    {action.id} · Verified
                  </span>
                  {action.target.startsWith("LD-") && (
                    <button
                      type="button"
                      onClick={() => openTrace(action.target)}
                      className="font-mono text-[10px] text-ink underline hover:opacity-80"
                    >
                      Trace
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
