"use client";

import React from "react";
import {
  Clock,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  UserCheck,
  ArrowRight,
} from "lucide-react";

export type ActionLifecycleState =
  | "REQUESTED"
  | "VALIDATING"
  | "AWAITING APPROVAL"
  | "EXECUTED"
  | "HELD"
  | "BLOCKED"
  | "NEEDS HUMAN"
  | "FAILED"
  | "RETRY AVAILABLE";

interface ActionLifecycleProps {
  actionId?: string;
  actionTitle: string;
  targetSystem?: string;
  currentState: ActionLifecycleState;
  nextResponsibleRole?: string;
  requiredApproval?: string;
  timestamp?: string;
  onRetry?: () => void;
  onHold?: () => void;
  onApproveSimulated?: () => void;
  isDemo?: boolean;
}

const PRIMARY_FLOW: ActionLifecycleState[] = [
  "REQUESTED",
  "VALIDATING",
  "AWAITING APPROVAL",
  "EXECUTED",
];

export function ActionLifecycle({
  actionId = "TX-8812",
  actionTitle,
  targetSystem = "Internal ERP / CRM Gateway",
  currentState,
  nextResponsibleRole = "Ops Lead (Senthil Kumar)",
  requiredApproval = "Level 2 Commercial Authority",
  timestamp = "Today, 14:12 IST",
  onRetry,
  onHold,
  onApproveSimulated,
  isDemo = true,
}: ActionLifecycleProps) {
  const isPrimary = PRIMARY_FLOW.includes(currentState);
  const primaryIndex = PRIMARY_FLOW.indexOf(currentState);

  const getStatusBadge = () => {
    switch (currentState) {
      case "EXECUTED":
        return {
          border: "border-success/40",
          bg: "bg-emerald-50",
          text: "text-success",
          icon: <CheckCircle2 className="h-3 w-3" aria-hidden="true" />,
        };
      case "BLOCKED":
      case "FAILED":
        return {
          border: "border-error/40",
          bg: "bg-rose-50",
          text: "text-error",
          icon: <XCircle className="h-3 w-3" aria-hidden="true" />,
        };
      case "HELD":
      case "AWAITING APPROVAL":
      case "NEEDS HUMAN":
      case "RETRY AVAILABLE":
        return {
          border: "border-amber/40",
          bg: "bg-amber-tint",
          text: "text-amber",
          icon: <ShieldAlert className="h-3 w-3" aria-hidden="true" />,
        };
      default:
        return {
          border: "border-hairline",
          bg: "bg-paper-elevated",
          text: "text-ink",
          icon: <Clock className="h-3 w-3" aria-hidden="true" />,
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div
      role="region"
      aria-label={`Action Lifecycle: ${actionTitle}`}
      className="border border-hairline bg-paper-elevated text-ink p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted uppercase tracking-wider">
            <span>Action Control Flow</span>
            <span>·</span>
            <span>ID: {actionId}</span>
            {isDemo && (
              <span className="border border-hairline bg-paper px-1.5 py-0.2 text-ink-muted">
                [SIMULATED REPLAY]
              </span>
            )}
          </div>
          <h3 className="font-serif text-[16px] font-semibold text-ink mt-0.5">
            {actionTitle}
          </h3>
          <span className="font-mono text-[11px] text-ink-muted">
            Target: {targetSystem}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase ${badge.border} ${badge.bg} ${badge.text}`}
          >
            {badge.icon}
            <span>{currentState}</span>
          </span>
        </div>
      </div>

      {/* Visual Progression Strip */}
      <div className="space-y-1.5">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          Lifecycle Progression Ladder
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
          {PRIMARY_FLOW.map((step, idx) => {
            const isCompleted = isPrimary && primaryIndex > idx;
            const isCurrent = currentState === step;
            const isPending = isPrimary && primaryIndex < idx;

            return (
              <div
                key={step}
                className={`border p-2 space-y-1 transition-colors ${
                  isCurrent
                    ? "border-ink bg-ink text-paper font-semibold shadow-none"
                    : isCompleted
                    ? "border-hairline bg-paper text-ink"
                    : isPending
                    ? "border-hairline/60 bg-paper/40 text-ink-faint"
                    : "border-hairline bg-paper text-ink-muted opacity-60"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span>0{idx + 1}</span>
                  {isCompleted && <span>✓</span>}
                  {isCurrent && <span className="uppercase text-[9px] text-amber">Active</span>}
                </div>
                <div className="truncate uppercase text-[10px] tracking-wider">
                  {step}
                </div>
              </div>
            );
          })}
        </div>

        {/* Alternative Non-Linear States Ribbon */}
        {!isPrimary && (
          <div className="mt-2 border border-amber/40 bg-amber-tint p-2.5 font-mono text-[11px] flex items-center justify-between">
            <div className="flex items-center gap-2 text-ink">
              <ShieldAlert className="h-4 w-4 text-amber shrink-0" aria-hidden="true" />
              <span>
                Safety Boundary Active: Action placed in{" "}
                <strong className="text-amber uppercase">{currentState}</strong> state.
              </span>
            </div>
            <span className="text-[10px] text-ink-muted">Boundary Guard Enforced</span>
          </div>
        )}
      </div>

      {/* Responsibilities & Authority Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-hairline pt-3 font-mono text-[11px]">
        <div>
          <span className="block text-[10px] uppercase text-ink-faint">
            Next Responsible Actor
          </span>
          <span className="text-ink font-medium">{nextResponsibleRole}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase text-ink-faint">
            Required Authority
          </span>
          <span className="text-ink font-medium">{requiredApproval}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase text-ink-faint">Event Timestamp</span>
          <span className="text-ink font-medium">{timestamp}</span>
        </div>
      </div>

      {/* Safe Operator UI Controls */}
      <div className="border-t border-hairline pt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-ink-faint">
          Safe UI Simulation Controls (No Real External Mutation)
        </span>
        <div className="flex items-center gap-2">
          {onHold && (
            <button
              type="button"
              onClick={onHold}
              className="rounded border border-hairline bg-paper px-3 py-1 font-mono text-[11px] text-ink hover:border-ink/40 transition-colors"
            >
              Hold &amp; Inspect
            </button>
          )}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-3 py-1 font-mono text-[11px] text-ink hover:border-ink/40 transition-colors"
            >
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              <span>Retry Step</span>
            </button>
          )}
          {onApproveSimulated && (
            <button
              type="button"
              onClick={onApproveSimulated}
              className="inline-flex items-center gap-1.5 rounded border border-ink bg-ink px-3 py-1 font-mono text-[11px] font-semibold text-paper hover:bg-ink/90 transition-colors"
            >
              <UserCheck className="h-3 w-3" aria-hidden="true" />
              <span>Simulate Approval</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
