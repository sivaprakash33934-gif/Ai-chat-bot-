"use client";

import React from "react";
import { INITIAL_TOOL_DEFINITIONS, ToolDefinition } from "@/lib/fixtures";
import { RiskPill } from "./ui";

export function ActionsToolsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <h2 className="font-serif text-[18px] font-semibold text-ink">Registered Action Tools</h2>
        <span className="font-mono text-[11px] text-ink-muted">
          {INITIAL_TOOL_DEFINITIONS.length} Deterministic Schemas
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {INITIAL_TOOL_DEFINITIONS.map((tool) => (
          <div key={tool.id} className="border border-hairline bg-paper-elevated p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-[16px] font-semibold text-ink">{tool.name}</span>
                <code className="rounded border border-hairline bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
                  {tool.slug}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <RiskPill risk={tool.risk} size="sm" />
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] uppercase font-semibold ${
                    tool.gatePolicy === "autonomous"
                      ? "border-success/30 bg-success-surface text-success"
                      : "border-amber/30 bg-amber-tint text-amber"
                  }`}
                >
                  {tool.gatePolicy === "autonomous" ? "Allowed for AI" : "Approval Needed"}
                </span>
              </div>
            </div>

            <p className="font-sans text-[13px] text-ink-muted leading-relaxed">{tool.description}</p>

            <div className="border border-hairline bg-paper p-3 space-y-1.5">
              <span className="block font-mono text-[10px] uppercase text-ink-faint">Accepted Parameters:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                {tool.parameters.map((p, idx) => (
                  <div key={idx} className="text-ink">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-ink-muted"> ({p.type}{p.required ? ", required" : ""})</span>
                    <div className="text-[10px] text-ink-muted font-sans">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-ink-faint pt-1">
              <span>Rate Limit: {tool.rateLimit}</span>
              <span>Schema: {tool.schemaVersion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
