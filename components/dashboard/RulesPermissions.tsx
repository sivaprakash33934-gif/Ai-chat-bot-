"use client";

import React, { useState, useMemo } from "react";
import {
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Lock,
  RotateCcw,
  Shield,
  Save,
  HelpCircle,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { Rule } from "@/lib/fixtures";
import { RiskPill, StatusBadge } from "./ui";
import { PermissionPreview } from "@/components/decision/PermissionPreview";

export function RulesPermissions() {
  const { rules, updateRule, role } = useDashboardStore();

  // Local draft state for draft isolation (Addendum D: navigating away discards unsaved draft)
  const [draftRules, setDraftRules] = useState<Rule[]>(() => JSON.parse(JSON.stringify(rules)));
  const [activePreviewId, setActivePreviewId] = useState<string>("RL-01");

  const isViewer = role === "viewer";

  // Check if draft has unsaved changes
  const isDirty = useMemo(() => {
    return JSON.stringify(draftRules) !== JSON.stringify(rules);
  }, [draftRules, rules]);

  // Find the primary discount rule for the preview slider
  const discountRule = draftRules.find((r) => r.id === "RL-01") || draftRules[0];
  const liveDiscountRule = rules.find((r) => r.id === "RL-01") || rules[0];

  // Minimum Profit Check: Minimum 28.0% gross margin implies max discount cannot exceed 20.0%
  const isMarginFloorViolated = discountRule.thresholdValue > 20.0;

  // Handle draft field change
  const handleThresholdChange = (id: string, value: number) => {
    setDraftRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, thresholdValue: value } : r))
    );
  };

  // Discard draft
  const handleDiscard = () => {
    setDraftRules(JSON.parse(JSON.stringify(rules)));
  };

  // Save all modified rules
  const handleSaveAll = () => {
    if (isMarginFloorViolated || isViewer) return;

    draftRules.forEach((draft) => {
      const live = rules.find((r) => r.id === draft.id);
      if (live && live.thresholdValue !== draft.thresholdValue) {
        updateRule(draft.id, {
          thresholdValue: draft.thresholdValue,
          status: "live",
        });
      }
    });
  };

  // Simulation calculations for slider readout
  const simulationReadout = useMemo(() => {
    const threshold = discountRule.thresholdValue;
    // Historical base: 45 quotes total
    let autoPass = 0;
    let escalated = 0;
    if (threshold <= 6) {
      autoPass = 28;
      escalated = 17;
    } else if (threshold <= 8) {
      autoPass = 42;
      escalated = 3;
    } else if (threshold <= 12) {
      autoPass = 44;
      escalated = 1;
    } else {
      autoPass = 45;
      escalated = 0;
    }

    return {
      autoPass,
      escalated,
      autoRate: ((autoPass / 45) * 100).toFixed(1),
      marginImpact: (threshold * 0.85).toFixed(2),
    };
  }, [discountRule.thresholdValue]);

  return (
    <div className="space-y-10">
      {/* Header & Dirty State Indicator */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Settings
            </span>
            <span className="text-ink-muted">/</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
              Business Rules
            </span>
          </div>
          <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
            Business Rules
          </h1>
          <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
            Rules that control what AI can do automatically, such as maximum discounts and order caps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isDirty && (
            <span className="rounded border border-amber/40 bg-amber-tint px-2.5 py-1 font-mono text-[11px] font-semibold text-amber">
              Unsaved Changes
            </span>
          )}

          <button
            type="button"
            disabled={!isDirty || isViewer}
            onClick={handleDiscard}
            className={`rounded border border-hairline bg-paper px-3 py-1.5 font-mono text-[12px] transition-colors ${
              !isDirty || isViewer
                ? "cursor-not-allowed text-ink-faint"
                : "text-ink hover:border-ink/40"
            }`}
          >
            Discard Changes
          </button>

          <button
            type="button"
            disabled={!isDirty || isMarginFloorViolated || isViewer}
            onClick={handleSaveAll}
            className={`inline-flex items-center gap-1.5 rounded border px-4 py-1.5 font-mono text-[12px] font-semibold transition-colors ${
              !isDirty || isMarginFloorViolated || isViewer
                ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                : "border-ink bg-ink text-paper hover:bg-ink/90"
            }`}
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Rules</span>
          </button>
        </div>
      </div>

      {/* Viewer RBAC Banner */}
      {isViewer && (
        <div className="flex items-center gap-2.5 rounded border border-hairline bg-paper p-3 font-mono text-[12px] text-ink-muted">
          <Lock className="h-4 w-4 text-ink-muted" />
          <span>
            You are in View Only mode. Only Ops Lead or Owner can modify business rules.
          </span>
        </div>
      )}

      {/* Minimum Profit Check Guard Banner */}
      {isMarginFloorViolated && (
        <div className="rounded border border-error/40 bg-error-surface p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-mono text-[12px] font-bold uppercase tracking-wider text-error">
              Minimum Profit Check Failed
            </h3>
            <p className="font-sans text-[13px] text-ink leading-relaxed">
              The proposed discount of{" "}
              <strong className="font-mono">{discountRule.thresholdValue}%</strong> would reduce profit below the required{" "}
              <strong className="font-mono">28.0% minimum profit margin</strong>. Please lower the discount to save.
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Test Rule Change (Rule Preview Simulator Slider) */}
      <section className="border border-hairline bg-paper-elevated p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-ink" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Test Rule Change
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            Testing: {discountRule.name} ({discountRule.id})
          </span>
        </div>

        <p className="font-sans text-[13px] text-ink-muted max-w-2xl">
          See how changing the discount limit would have affected your last 45 quotes.
        </p>

        {/* Interactive Slider */}
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center justify-between font-mono text-[12px]">
            <span className="text-ink-muted">Max Discount:</span>
            <span className="font-bold text-ink text-[16px]">
              {discountRule.thresholdValue}%
              {discountRule.thresholdValue !== liveDiscountRule.thresholdValue && (
                <span className="ml-2 text-[11px] font-normal text-amber">
                  (Live: {liveDiscountRule.thresholdValue}%)
                </span>
              )}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            disabled={isViewer}
            value={discountRule.thresholdValue}
            onChange={(e) =>
              handleThresholdChange("RL-01", parseFloat(e.target.value))
            }
            aria-label="Test max discount rule change"
            className="w-full accent-ink cursor-pointer disabled:cursor-not-allowed"
          />

          <div className="flex justify-between font-mono text-[10px] text-ink-muted">
            <span>0.0% (No discounts by AI)</span>
            <span className="text-amber">8.0% (Current Standard)</span>
            <span className="text-error">20.0% (Max allowed limit)</span>
            <span>30.0%</span>
          </div>
        </div>

        {/* Simulation Historical Readout */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border border-hairline bg-paper p-4 font-mono text-[12px]">
          <div>
            <span className="text-ink-muted block text-[10px] uppercase">
              Handled by AI
            </span>
            <span className="font-serif text-[20px] font-semibold text-success">
              {simulationReadout.autoPass} / 45
            </span>
            <span className="block text-[10px] text-ink-muted">
              {simulationReadout.autoRate}% auto-approved
            </span>
          </div>

          <div>
            <span className="text-ink-muted block text-[10px] uppercase">
              Sent for Approval
            </span>
            <span className="font-serif text-[20px] font-semibold text-amber">
              {simulationReadout.escalated} quotes
            </span>
            <span className="block text-[10px] text-ink-muted">
              Needs your review
            </span>
          </div>

          <div>
            <span className="text-ink-muted block text-[10px] uppercase">
              Minimum Profit Margin
            </span>
            <span
              className={`font-serif text-[20px] font-semibold ${
                isMarginFloorViolated ? "text-error" : "text-ink"
              }`}
            >
              28.0%
            </span>
            <span className="block text-[10px] text-ink-muted">
              {isMarginFloorViolated ? "Too Low!" : "Protected"}
            </span>
          </div>

          <div>
            <span className="text-ink-muted block text-[10px] uppercase">
              Profit Impact
            </span>
            <span className="font-serif text-[20px] font-semibold text-ink">
              -{simulationReadout.marginImpact}%
            </span>
            <span className="block text-[10px] text-ink-muted">
              Average discount
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Full Operating Rules Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-ink" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Current Business Rules
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            {draftRules.length} Active Rules
          </span>
        </div>

        <div className="overflow-x-auto border border-hairline bg-paper-elevated">
          <table className="w-full text-left border-collapse" aria-label="Business rules table">
            <thead>
              <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-5 py-3.5 font-medium">Rule Name</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Risk Level</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Current Limit</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Min Profit</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Last Modified</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans text-[13px]">
              {draftRules.map((rule) => {
                const live = rules.find((r) => r.id === rule.id);
                const isModified = live && live.thresholdValue !== rule.thresholdValue;

                return (
                  <tr key={rule.id} className="transition-colors hover:bg-paper/60">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">{rule.name}</div>
                      <div className="font-mono text-[11px] text-ink-muted">
                        {rule.id} · Applies to: {rule.scope}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <RiskPill risk={rule.risk} size="sm" />
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap font-mono text-[13px]">
                      {isViewer ? (
                        <span className="font-semibold text-ink">
                          {rule.thresholdValue} {rule.unit}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={rule.thresholdValue}
                            onChange={(e) =>
                              handleThresholdChange(rule.id, parseFloat(e.target.value) || 0)
                            }
                            aria-label={`Edit ${rule.name} threshold`}
                            className="w-20 rounded border border-hairline bg-paper px-2 py-1 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
                          />
                          <span className="text-ink-muted text-[11px]">{rule.unit}</span>
                          {isModified && (
                            <span className="font-mono text-[10px] text-amber font-semibold">
                              (Draft)
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 font-mono text-[12px] text-ink-muted whitespace-nowrap">
                      {rule.marginFloor}% Min Profit
                    </td>

                    <td className="px-5 py-4 font-mono text-[11px] text-ink-muted whitespace-nowrap">
                      <div>{rule.lastModified}</div>
                      <div className="text-[10px] text-ink-faint">By {rule.modifiedBy}</div>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <StatusBadge status={isModified ? "claimed" : "fresh"} label={isModified ? "Draft" : "Live"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Distinctive Experience: Role Permission Preview & Matrix */}
      <section className="space-y-4">
        <PermissionPreview />
      </section>
    </div>
  );
}
