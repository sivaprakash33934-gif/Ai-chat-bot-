"use client";

import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { ActionData } from "./types";
import { RetryButton } from "./RetryButton";

interface ActionStatusCardProps {
  action: ActionData;
  onRetry?: () => void;
  onCancel?: () => void;
}

export function ActionStatusCard({
  action,
  onRetry,
  onCancel,
}: ActionStatusCardProps) {
  const { status, errorMessage, retryCount } = action;

  if (status === "pending_confirmation" || status === "cancelled") {
    return null;
  }

  const isPending =
    status === "requested" || status === "authorized" || status === "executing";

  return (
    <div className="mt-2.5 rounded-[4px] border border-hairline bg-paper-elevated p-3.5 text-left space-y-2">
      <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono text-[10px] uppercase text-ink-muted">
        <span>Action Lifecycle</span>
        <span className="font-semibold text-ink">{status}</span>
      </div>

      {isPending && (
        <div className="flex items-center gap-2 font-mono text-[11px] text-ink py-1">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-muted" aria-hidden="true" />
          <span>
            {status === "requested" && "Requested: Dispatching payload to CRM gateway…"}
            {status === "authorized" && "Authorized: Permission verified for Senthil Traders…"}
            {status === "executing" && "Executing: Writing lead record to CRM database…"}
          </span>
        </div>
      )}

      {status === "succeeded" && (
        <div className="space-y-2 py-1">
          <div className="flex items-center gap-2 text-success font-medium text-[13px]">
            <CheckCircle2 className="h-4 w-4 shrink-0 stroke-[2]" aria-hidden="true" />
            <span>Lead created successfully (demo)</span>
          </div>
          <p className="font-mono text-[10px] text-ink-muted">
            Record ID: <span className="text-ink font-semibold">CRM-LEAD-9914</span> · Verified SHA-256
          </p>
          <a
            href="#crm"
            onClick={(e) => e.preventDefault()}
            className="inline-block font-mono text-[11px] text-ink underline hover:opacity-80"
          >
            View in CRM (Simulated) &rarr;
          </a>
        </div>
      )}

      {status === "failed" && (
        <div className="space-y-1.5 py-1">
          <div className="flex items-center gap-2 text-error font-medium text-[13px]">
            <XCircle className="h-4 w-4 shrink-0 stroke-[2]" aria-hidden="true" />
            <span>{errorMessage || "Action failed: CRM timeout after 5000ms (demo)"}</span>
          </div>
          {onRetry && <RetryButton retryCount={retryCount} onRetry={onRetry} />}
        </div>
      )}

      {status === "unknown" && (
        <div className="space-y-1.5 py-1">
          <div className="flex items-center gap-2 text-amber font-medium text-[13px]">
            <AlertTriangle className="h-4 w-4 shrink-0 stroke-[2]" aria-hidden="true" />
            <span>Action status unknown — cannot confirm success (demo)</span>
          </div>
          <p className="font-mono text-[10px] text-ink-muted">
            The external endpoint timed out before acknowledgement. No state change was confirmed.
          </p>
          <div className="flex items-center gap-2">
            {onRetry && <RetryButton retryCount={retryCount} onRetry={onRetry} />}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="mt-2 inline-flex items-center rounded-[4px] border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-ink hover:border-ink/60"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
