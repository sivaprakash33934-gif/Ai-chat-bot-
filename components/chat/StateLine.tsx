"use client";

import React from "react";
import { PipelinePhase } from "./types";
import { useReducedMotion } from "./ReducedMotionCheck";

interface StateLineProps {
  phase: PipelinePhase;
  timestamp?: string;
  reducedMotion?: boolean;
}

export function StateLine({ phase, timestamp, reducedMotion }: StateLineProps) {
  const systemReduced = useReducedMotion();
  const isReduced = reducedMotion ?? systemReduced;

  if (phase === "idle") return null;

  const displayTime =
    timestamp ||
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const phaseTextMap: Record<PipelinePhase, string> = {
    idle: "",
    understanding: "Understanding…",
    retrieving: "Understanding → Reading business documents…",
    reasoning: "Understanding → Reading business documents → Checking rules…",
    drafting: "Understanding → Reading business documents → Checking rules → Drafting answer (demo)",
    needs_clarification: "Understanding → Incomplete parameters → Awaiting buyer clarification (demo)",
    awaiting_approval: "Understanding → Boundary check passed → Awaiting buyer confirmation (demo)",
  };

  if (isReduced) {
    return (
      <div className="py-1" role="status" aria-live="polite">
        <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
          <span className="tabular-nums opacity-75">[{displayTime}]</span>{" "}
          <span>{phaseTextMap[phase]}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="py-1" role="status" aria-live="polite">
      <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
        <span className="tabular-nums opacity-75">[{displayTime}]</span>{" "}
        <span className="animate-pulse">{phaseTextMap[phase]}</span>
      </p>
    </div>
  );
}
