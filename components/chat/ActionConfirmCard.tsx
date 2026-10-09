"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { ActionData } from "./types";

interface ActionConfirmCardProps {
  action: ActionData;
  onConfirm: (actionId: string) => void;
  onCancel: (actionId: string) => void;
  onDuplicate?: () => void;
}

export function ActionConfirmCard({
  action,
  onConfirm,
  onCancel,
  onDuplicate,
}: ActionConfirmCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isReadOnly = action.status !== "pending_confirmation";

  const handleConfirm = () => {
    if (isReadOnly || isProcessing) {
      onDuplicate?.();
      return;
    }
    setIsProcessing(true);
    onConfirm(action.id);
  };

  const handleCancel = () => {
    if (isReadOnly || isProcessing) return;
    onCancel(action.id);
  };

  return (
    <div className="mt-2.5 rounded-[4px] border border-hairline bg-paper-elevated p-3.5 text-left text-[13px] space-y-3">
      <div className="flex items-center gap-1.5 border-b border-hairline pb-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
        <AlertCircle className="h-3.5 w-3.5 stroke-[2] text-ink" aria-hidden="true" />
        <span className="font-semibold text-ink">Action Required</span>
        <span className="text-ink-faint">· {action.title}</span>
      </div>

      <div className="space-y-1.5 rounded-[2px] border border-hairline bg-paper p-2.5 font-mono text-[11px]">
        {action.fields.map((field) => (
          <div key={field.label} className="flex justify-between gap-2">
            <span className="text-ink-muted">{field.label}:</span>
            <span className="font-medium text-ink truncate">{field.value}</span>
          </div>
        ))}
      </div>

      {!isReadOnly ? (
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleConfirm}
            className="rounded-[4px] bg-ink px-3.5 py-1.5 font-mono text-[11px] font-semibold text-paper transition-colors hover:bg-ink/90 active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            {isProcessing ? "Submitting…" : "Confirm"}
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleCancel}
            className="rounded-[4px] border border-hairline bg-paper px-3.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-ink/50 hover:bg-paper-elevated active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="pt-1 font-mono text-[10px] text-ink-muted">
          Action locked · Status: {action.status}
        </div>
      )}
    </div>
  );
}
