"use client";

import React, { useState, useMemo } from "react";
import {
  Check,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Clock,
  Lock,
  Layers,
  FileText,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { DecisionStamp, GSTINDisplay, EmptyState } from "./ui";

export function QueueApprovals({ initialSelectedId }: { initialSelectedId?: string }) {
  const {
    approvals,
    approveGate,
    holdGate,
    role,
  } = useDashboardStore();

  // Find first pending approval or selected
  const pendingApprovals = useMemo(
    () => approvals.filter((a) => a.status === "pending"),
    [approvals]
  );

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (initialSelectedId && approvals.some((a) => a.id === initialSelectedId)) {
      return initialSelectedId;
    }
    return pendingApprovals[0]?.id || approvals[0]?.id || "";
  });

  const selectedApproval = useMemo(
    () => approvals.find((a) => a.id === selectedId) || pendingApprovals[0] || approvals[0],
    [approvals, selectedId]
  );

  // Navigate to next pending request
  const handleNextRequest = () => {
    const remainingPending = approvals.filter(
      (a) => a.status === "pending" && a.id !== selectedId
    );
    if (remainingPending.length > 0) {
      setSelectedId(remainingPending[0].id);
    }
  };

  const isViewer = role === "viewer";

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div>
          <h2 className="font-serif text-[18px] font-semibold text-ink">
            Approvals Needed
          </h2>
          <p className="font-sans text-[12px] text-ink-muted">
            Quotes that need your approval before being sent to the customer.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-ink-muted">
            {pendingApprovals.length} Pending
          </span>
        </div>
      </div>

      {approvals.length === 0 ? (
        <EmptyState
          title="No approvals needed."
          description="All quotes are within your pre-approved discount and credit rules."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Master List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-2 max-h-[680px] overflow-y-auto pr-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-2">
              Pending Requests ({approvals.length})
            </span>

            {approvals.map((gate) => {
              const isSelected = selectedApproval?.id === gate.id;

              return (
                <button
                  key={gate.id}
                  type="button"
                  onClick={() => setSelectedId(gate.id)}
                  className={`w-full text-left p-3.5 border transition-all rounded-sm ${
                    isSelected
                      ? "border-ink bg-paper-elevated ring-1 ring-ink"
                      : "border-hairline bg-paper hover:bg-paper-elevated hover:border-ink/40"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                        <span
                          className={`px-1.5 py-0.2 rounded-sm ${
                            gate.status === "approved"
                              ? "bg-success-surface text-success"
                              : gate.status === "held"
                              ? "bg-error-surface text-error"
                              : "bg-amber-tint text-amber"
                          }`}
                        >
                          {gate.status === "approved"
                            ? "Approved"
                            : gate.status === "held"
                            ? "On Hold"
                            : "Needs Approval"}
                        </span>
                        <span className="text-ink-muted">{gate.recordId}</span>
                      </div>
                      <div className="mt-1 font-sans text-[13px] font-semibold text-ink">
                        {gate.company}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-ink-faint">
                      {gate.timestamp}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-ink-muted">Discount</span>
                    <span
                      className={`font-semibold ${
                        gate.discountPct > 10 ? "text-error" : "text-amber"
                      }`}
                    >
                      {gate.discountPct}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Gate Card (Right 8 cols) */}
          <div className="lg:col-span-8">
            {selectedApproval ? (
              <div className="relative border border-hairline bg-paper-elevated p-6 space-y-6">
                {/* Status Stamp (if already decided) */}
                {selectedApproval.status !== "pending" && (
                  <div className="absolute right-6 top-6 z-10">
                    <DecisionStamp
                      status={selectedApproval.status as "approved" | "held"}
                      decidedBy={selectedApproval.decidedBy}
                      timestamp={selectedApproval.decidedAt}
                    />
                  </div>
                )}

                {/* Card Title & Meta */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                      Approval Needed
                    </span>
                    <span>·</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink">
                      {selectedApproval.id}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-[24px] font-semibold text-ink">
                    {selectedApproval.company}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-[12px] font-mono text-ink-muted">
                    <span>Contact: {selectedApproval.buyerName}</span>
                    <span>·</span>
                    <GSTINDisplay gstin={selectedApproval.gstin} />
                    <span>·</span>
                    <span>Quote: {selectedApproval.recordId}</span>
                  </div>
                </div>

                {/* Rule Citation Banner */}
                <div className="rounded-sm border border-amber/30 bg-amber-tint/40 p-4">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    <div>
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber">
                        Why Approval is Needed
                      </div>
                      <p className="mt-1 font-sans text-[13px] text-ink leading-relaxed">
                        {selectedApproval.ruleCitation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Spec Ledger */}
                <div className="border border-hairline bg-paper p-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-3">
                    Quote Details
                  </span>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono text-[12px]">
                    <div>
                      <span className="text-ink-muted block text-[10px] uppercase">Product</span>
                      <span className="font-semibold text-ink">{selectedApproval.item}</span>
                    </div>
                    <div>
                      <span className="text-ink-muted block text-[10px] uppercase">Normal Price</span>
                      <span className="font-semibold text-ink">₹{selectedApproval.standardPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-ink-muted block text-[10px] uppercase">Requested Price</span>
                      <span className="font-semibold text-error">₹{selectedApproval.requestedPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-ink-muted block text-[10px] uppercase">Minimum Profit</span>
                      <span className="font-semibold text-success">{selectedApproval.floorMarginPct}% Min Profit</span>
                    </div>
                  </div>
                </div>

                {/* Viewer RBAC Advisory */}
                {isViewer && (
                  <div className="flex items-center gap-2 rounded border border-hairline bg-paper p-3 text-[12px] font-mono text-ink-muted">
                    <Lock className="h-4 w-4 text-ink-muted" />
                    <span>
                      You are in View Only mode. Only Ops Lead and Owner can approve or hold quotes.
                    </span>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={isViewer || selectedApproval.status !== "pending"}
                      onClick={() => approveGate(selectedApproval.id)}
                      className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[12px] font-semibold transition-colors ${
                        isViewer || selectedApproval.status !== "pending"
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : "border-success bg-success text-paper hover:bg-success/90"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve Quote</span>
                    </button>

                    <button
                      type="button"
                      disabled={isViewer || selectedApproval.status !== "pending"}
                      onClick={() => holdGate(selectedApproval.id)}
                      className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-[12px] transition-colors ${
                        isViewer || selectedApproval.status !== "pending"
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : "border-error/40 bg-error-surface text-error hover:border-error"
                      }`}
                    >
                      <span>Hold for Review</span>
                    </button>
                  </div>

                  {pendingApprovals.length > 1 && (
                    <button
                      type="button"
                      onClick={handleNextRequest}
                      className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-3 py-2 font-mono text-[12px] text-ink hover:border-ink/40"
                    >
                      <span>Next request</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <EmptyState title="Select a request to review" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
