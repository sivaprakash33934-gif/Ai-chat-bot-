"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, X, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useDashboardStore } from "@/lib/store";

/* =========================================================================
   RISK PILL (High-Contrast AA Compliant)
   ========================================================================= */
export function RiskPill({
  risk,
  size = "md",
}: {
  risk: "low" | "medium" | "high" | "restricted";
  size?: "sm" | "md";
}) {
  const styles = {
    low: "bg-success-surface text-success border-success/30",
    medium: "bg-amber-tint text-amber border-amber/30",
    high: "bg-error-surface text-error border-error/30",
    restricted: "bg-error-surface text-error border-error/30 font-semibold tracking-wider",
  };

  const labels = {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    restricted: "Restricted",
  };

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]";

  return (
    <span
      className={`inline-flex items-center rounded-sm border font-mono uppercase tracking-tight ${styles[risk]} ${sizeClass}`}
    >
      {labels[risk]}
    </span>
  );
}

/* =========================================================================
   STATUS BADGE
   ========================================================================= */
export function StatusBadge({
  status,
  label,
}: {
  status: "fresh" | "stale" | "conflict" | "pending" | "approved" | "held" | "claimed" | "resolved" | "active" | "high_touch";
  label?: string;
}) {
  const config: Record<string, { bg: string; text: string; border: string; label: string }> = {
    fresh: { bg: "bg-success-surface", text: "text-success", border: "border-success/30", label: "Fresh" },
    stale: { bg: "bg-amber-tint", text: "text-amber", border: "border-amber/30", label: "Stale" },
    conflict: { bg: "bg-error-surface", text: "text-error", border: "border-error/30", label: "Conflict" },
    pending: { bg: "bg-amber-tint", text: "text-amber", border: "border-amber/30", label: "Pending" },
    approved: { bg: "bg-success-surface", text: "text-success", border: "border-success/30", label: "Approved" },
    held: { bg: "bg-error-surface", text: "text-error", border: "border-error/30", label: "Held" },
    claimed: { bg: "bg-amber-tint", text: "text-amber", border: "border-amber/30", label: "In Review" },
    resolved: { bg: "bg-success-surface", text: "text-success", border: "border-success/30", label: "Resolved" },
    active: { bg: "bg-success-surface", text: "text-success", border: "border-success/30", label: "Active" },
    high_touch: { bg: "bg-amber-tint", text: "text-amber", border: "border-amber/30", label: "VIP Customer" },
  };

  const item = config[status] || { bg: "bg-paper", text: "text-ink-muted", border: "border-hairline", label: status };

  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${item.bg} ${item.text} ${item.border}`}
    >
      {label || item.label}
    </span>
  );
}

/* =========================================================================
   DECISION STAMP (-6° Rotation, Responsive Fallback <420px)
   ========================================================================= */
export function DecisionStamp({
  status,
  decidedBy,
  timestamp = "JUST NOW",
}: {
  status: "approved" | "held";
  decidedBy?: string;
  timestamp?: string;
}) {
  const isApproved = status === "approved";
  const borderCol = isApproved ? "border-success text-success" : "border-error text-error";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none relative inline-block border-2 px-3 py-1.5 font-mono uppercase tracking-widest ${borderCol}
        animate-stamp-land max-[420px]:static max-[420px]:rotate-0 max-[420px]:animate-none min-[421px]:-rotate-6`}
    >
      <div className="text-[13px] font-bold leading-none">
        {isApproved ? "APPROVED" : "ON HOLD FOR REVIEW"}
      </div>
      <div className="mt-1 flex items-center justify-between gap-3 text-[9px] tracking-normal opacity-80">
        <span>{timestamp}</span>
        {decidedBy && <span>BY {decidedBy}</span>}
      </div>
    </div>
  );
}

/* =========================================================================
   METRIC CARD (Editorial Ledger Tokenized)
   ========================================================================= */
export function MetricCard({
  label,
  value,
  subvalue,
  indicator,
  isDemo,
}: {
  label: string;
  value: string;
  subvalue?: string;
  indicator?: "neutral" | "positive" | "warning";
  isDemo?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between border border-hairline bg-paper-elevated p-5 transition-colors">
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span>{label}</span>
          {isDemo && (
            <span className="rounded border border-hairline bg-paper px-1 py-0.2 text-[9px] font-mono text-ink-muted">
              [DEMO]
            </span>
          )}
        </span>
        {indicator === "positive" && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
        {indicator === "warning" && <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />}
      </div>
      <div className="mt-3">
        <div className="font-serif text-[28px] font-semibold leading-tight tracking-tight text-ink md:text-[32px]">
          {value}
        </div>
        {subvalue && (
          <div className="mt-1.5 font-mono text-[12px] text-ink-muted">
            {subvalue}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   GSTIN DISPLAY (PII Masking & Copy)
   ========================================================================= */
export function GSTINDisplay({ gstin }: { gstin: string }) {
  const { formatGSTIN } = useDashboardStore();
  const [copied, setCopied] = useState(false);
  const formatted = formatGSTIN(gstin);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(gstin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-ink">
      <span>{formatted}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy GSTIN ${gstin}`}
        className="rounded p-0.5 text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        title="Copy tax identifier"
      >
        {copied ? (
          <Check className="h-3 w-3 text-success" />
        ) : (
          <Copy className="h-3 w-3 opacity-60 hover:opacity-100" />
        )}
      </button>
    </span>
  );
}

/* =========================================================================
   HONESTY BADGE
   ========================================================================= */
export function HonestyBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-amber/80" />
      <span>Demo Data · No Live Backend</span>
    </span>
  );
}

/* =========================================================================
   EMPTY STATE
   ========================================================================= */
export function EmptyState({
  title = "Nothing needs you right now.",
  description = "Everything is running smoothly within your business rules.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-hairline bg-paper px-6 py-16 text-center">
      <div className="font-serif text-[20px] font-medium text-ink">{title}</div>
      <p className="mt-2 max-w-md font-sans text-[13px] text-ink-muted">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded border border-hairline bg-paper-elevated px-4 py-2 font-mono text-[12px] text-ink hover:border-ink/40"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* =========================================================================
   TOAST CONTAINER (Bottom-Right, Aria-Live, [SIMULATED] & Undo)
   ========================================================================= */
export function ToastContainer() {
  const { toasts, dismissToast, undoLastAction } = useDashboardStore();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notification center"
      className="fixed bottom-5 right-5 z-50 flex max-w-md flex-col gap-2.5"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 border border-hairline bg-paper-elevated p-3.5 shadow-none transition-all"
          >
            {isSuccess && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />}
            {isError && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-error" />}
            {!isSuccess && !isError && <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded bg-paper px-1.5 py-0.2 font-mono text-[10px] uppercase text-ink-muted border border-hairline">
                  SIMULATED
                </span>
                <span className="font-mono text-[12px] text-ink leading-snug">{toast.message}</span>
              </div>
            </div>

            {toast.undoable && (
              <button
                type="button"
                onClick={() => {
                  undoLastAction();
                  dismissToast(toast.id);
                }}
                className="flex items-center gap-1 rounded border border-hairline bg-paper px-2 py-1 font-mono text-[11px] font-medium text-ink hover:bg-paper-elevated hover:border-ink/40"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Undo</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-ink-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
