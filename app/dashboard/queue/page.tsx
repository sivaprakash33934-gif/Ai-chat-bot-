"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Inbox, ShieldCheck, Headphones, Layers } from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { QueueLeads } from "@/components/dashboard/QueueLeads";
import { QueueApprovals } from "@/components/dashboard/QueueApprovals";
import { QueueHandoffs } from "@/components/dashboard/QueueHandoffs";

type QueueTab = "leads" | "approvals" | "handoffs";

function QueueContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = (searchParams.get("tab") as QueueTab) || "leads";
  const initialSelectedId = searchParams.get("id") || undefined;

  const {
    leads,
    pendingApprovalsCount,
    pendingHandoffsCount,
  } = useDashboardStore();

  const handleTabChange = (tab: QueueTab) => {
    router.push(`/dashboard/queue?tab=${tab}`);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Work Queue
          </span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Tasks
          </span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
          Work Queue
        </h1>
        <p className="mt-1 font-sans text-[14px] text-ink-muted">
          Review new leads, approve quotes, and take over escalated conversations.
        </p>
      </div>

      {/* Primary Tab Navigation */}
      <div className="border-b border-hairline">
        <nav
          className="-mb-px flex space-x-6"
          role="tablist"
          aria-label="Work Queue Sections"
        >
          {/* Tab 1: Leads */}
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "leads"}
            onClick={() => handleTabChange("leads")}
            className={`flex items-center gap-2.5 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "leads"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <Inbox className="h-4 w-4" />
            <span>Leads</span>
            <span
              className={`rounded-full px-2 py-0.2 font-mono text-[11px] ${
                currentTab === "leads"
                  ? "bg-ink text-paper"
                  : "bg-paper border border-hairline text-ink-muted"
              }`}
            >
              {leads.length}
            </span>
          </button>

          {/* Tab 2: Approvals */}
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "approvals"}
            onClick={() => handleTabChange("approvals")}
            className={`flex items-center gap-2.5 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "approvals"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Approvals</span>
            {pendingApprovalsCount > 0 ? (
              <span className="rounded-full bg-amber-tint border border-amber/30 px-2 py-0.2 font-mono text-[11px] font-semibold text-amber">
                {pendingApprovalsCount}
              </span>
            ) : (
              <span className="rounded-full bg-paper border border-hairline px-2 py-0.2 font-mono text-[11px] text-ink-muted">
                0
              </span>
            )}
          </button>

          {/* Tab 3: Handoffs */}
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === "handoffs"}
            onClick={() => handleTabChange("handoffs")}
            className={`flex items-center gap-2.5 border-b-2 py-3 px-1 font-sans text-[14px] transition-colors ${
              currentTab === "handoffs"
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-muted hover:border-hairline hover:text-ink"
            }`}
          >
            <Headphones className="h-4 w-4" />
            <span>Escalated Chats</span>
            {pendingHandoffsCount > 0 ? (
              <span className="rounded-full bg-error-surface border border-error/30 px-2 py-0.2 font-mono text-[11px] font-semibold text-error">
                {pendingHandoffsCount}
              </span>
            ) : (
              <span className="rounded-full bg-paper border border-hairline px-2 py-0.2 font-mono text-[11px] text-ink-muted">
                0
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {currentTab === "leads" && <QueueLeads />}
        {currentTab === "approvals" && (
          <QueueApprovals initialSelectedId={initialSelectedId} />
        )}
        {currentTab === "handoffs" && (
          <QueueHandoffs initialSelectedId={initialSelectedId} />
        )}
      </div>
    </div>
  );
}

export default function QueuePage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center font-mono text-[12px] text-ink-muted">
          Loading Work Queue...
        </div>
      }
    >
      <QueueContent />
    </Suspense>
  );
}
