"use client";

import React, { useState } from "react";
import {
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Layers,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { StatusBadge, EmptyState } from "./ui";

export function Knowledge() {
  const {
    knowledgeSources,
    knowledgeGaps,
    knowledgeConflicts,
    resolveConflict,
    answerGap,
    role,
  } = useDashboardStore();

  const isViewer = role === "viewer";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Knowledge
          </span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            Business Documents
          </span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
          Knowledge Base
        </h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
          Your company documents and price lists. AI uses these verified documents to answer customer questions accurately.
        </p>
      </div>

      {/* Distinctive Experience: Evidence Freshness & Conflict Overview */}
      <section aria-labelledby="freshness-overview-title" className="border border-hairline bg-paper-elevated p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
          <div>
            <h2 id="freshness-overview-title" className="font-serif text-[18px] font-semibold text-ink">
              Evidence Freshness &amp; Conflict Overview
            </h2>
            <p className="font-sans text-[12px] text-ink-muted">
              Live audit of document authority tiers, sync currency, and pending reconciliation items.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink-muted border border-hairline bg-paper px-2 py-0.5">
            [GROUNDING MONITOR]
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
          {/* Card 1: Authority Tiers */}
          <div className="border border-hairline bg-paper p-3 space-y-1">
            <span className="text-[10px] text-ink-faint uppercase">Authority Breakdown</span>
            <div className="text-lg font-bold text-ink">
              {knowledgeSources.filter((s) => s.authority === "PRIMARY").length} Primary /{" "}
              {knowledgeSources.filter((s) => s.authority === "SECONDARY").length} Secondary
            </div>
            <p className="text-[11px] text-ink-muted font-sans">Primary sources supersede secondaries on price &amp; terms</p>
          </div>

          {/* Card 2: Freshness State */}
          <div className="border border-hairline bg-paper p-3 space-y-1">
            <span className="text-[10px] text-ink-faint uppercase">Document Freshness</span>
            <div className="text-lg font-bold text-success">
              {knowledgeSources.filter((s) => s.status === "fresh").length} Fresh ·{" "}
              <span className="text-amber">{knowledgeSources.filter((s) => s.status === "stale").length} Stale</span>
            </div>
            <p className="text-[11px] text-ink-muted font-sans">
              {knowledgeSources.find((s) => s.status === "stale")?.title.slice(0, 24)}... needs re-indexing
            </p>
          </div>

          {/* Card 3: Unresolved Conflicts */}
          <a
            href="#conflicts"
            className="border border-hairline bg-paper p-3 space-y-1 block hover:border-error/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-ink-faint uppercase">Corpus Conflicts</span>
              <span className="text-[10px] text-error font-bold">Inspect &darr;</span>
            </div>
            <div className="text-lg font-bold text-error">
              {knowledgeConflicts.filter((c) => c.status === "unresolved").length} Unresolved
            </div>
            <p className="text-[11px] text-ink-muted font-sans group-hover:text-ink">
              Conflicting rules requiring human authority resolution
            </p>
          </a>

          {/* Card 4: Unanswered Gaps */}
          <a
            href="#gaps"
            className="border border-hairline bg-paper p-3 space-y-1 block hover:border-amber/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-ink-faint uppercase">Unanswered Gaps</span>
              <span className="text-[10px] text-amber font-bold">Review &darr;</span>
            </div>
            <div className="text-lg font-bold text-amber">
              {knowledgeGaps.length} In Queue
            </div>
            <p className="text-[11px] text-ink-muted font-sans group-hover:text-ink">
              Recent buyer questions with missing source evidence
            </p>
          </a>
        </div>
      </section>

      {/* Section 1: Business Documents Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-ink" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Business Documents
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            {knowledgeSources.length} Documents
          </span>
        </div>

        <div className="overflow-x-auto border border-hairline bg-paper-elevated">
          <table className="w-full text-left border-collapse" aria-label="Business documents table">
            <thead>
              <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-5 py-3.5 font-medium">Document</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Category</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Authority</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Sections</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Last Verified</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Document Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans text-[13px]">
              {knowledgeSources.map((source) => (
                <tr key={source.id} className="transition-colors hover:bg-paper/60">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-ink">{source.title}</div>
                    <div className="font-mono text-[11px] text-ink-muted">
                      {source.id} · {source.summary}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] whitespace-nowrap text-ink">
                    {source.category}
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] whitespace-nowrap">
                    <span
                      className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] uppercase font-semibold ${
                        source.authority === "PRIMARY"
                          ? "bg-ink text-paper"
                          : "border border-hairline bg-paper text-ink-muted"
                      }`}
                    >
                      {source.authority}
                    </span>
                    <div className="text-[10px] text-ink-muted mt-0.5">{source.approvedBy}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] whitespace-nowrap text-ink">
                    {source.chunks} sections
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] whitespace-nowrap text-ink-muted">
                    <div>{source.lastVerified}</div>
                    <div className="text-[9px] text-ink-faint">{source.version}</div>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <StatusBadge status={source.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Unanswered Questions (Unmapped Gaps) */}
      <section id="gaps" className="space-y-4 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Unanswered Questions
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            {knowledgeGaps.length} Questions AI Couldn&apos;t Answer
          </span>
        </div>

        {knowledgeGaps.length === 0 ? (
          <EmptyState
            title="No unanswered questions."
            description="AI found clear answers in your documents for all recent customer queries."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {knowledgeGaps.map((gap) => (
              <div
                key={gap.id}
                className="flex flex-col justify-between border border-hairline bg-paper-elevated p-5 space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    <span>{gap.id} · Asked {gap.frequency} times</span>
                    <span>Last: {gap.lastAsked}</span>
                  </div>
                  <h3 className="mt-2 font-sans text-[14px] font-semibold text-ink leading-snug">
                    &ldquo;{gap.query}&rdquo;
                  </h3>
                  <div className="mt-3 rounded border border-hairline bg-paper p-3 font-sans text-[12px] text-ink-muted leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-semibold block mb-1">
                      Possible Answer:
                    </span>
                    {gap.suggestedAnswer}
                  </div>
                </div>

                <div className="border-t border-hairline pt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-faint">
                    Draft for Training
                  </span>
                  <button
                    type="button"
                    disabled={isViewer}
                    onClick={() => answerGap(gap.id, gap.suggestedAnswer)}
                    className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                      isViewer
                        ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                        : "border-ink bg-paper-elevated text-ink hover:bg-paper hover:border-ink/50"
                    }`}
                  >
                    <span>Queue Answer</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Fix Conflicting Info (Conflict Resolver) */}
      <section id="conflicts" className="space-y-4 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-error" />
            <h2 className="font-serif text-[18px] font-semibold text-ink">
              Fix Conflicting Info
            </h2>
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            {knowledgeConflicts.filter((c) => c.status === "unresolved").length} Conflicting Rules
          </span>
        </div>

        {knowledgeConflicts.map((conflict) => {
          const isResolved = conflict.status === "resolved";

          return (
            <div
              key={conflict.id}
              className="border border-hairline bg-paper-elevated p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    <span>Fix Conflict</span>
                    <span>·</span>
                    <span>{conflict.id}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-[20px] font-semibold text-ink">
                    {conflict.topic}
                  </h3>
                </div>
                <StatusBadge
                  status={isResolved ? "resolved" : "conflict"}
                  label={isResolved ? `Resolved (${conflict.chosenSource?.toUpperCase()})` : "Unresolved"}
                />
              </div>

              {/* Side-by-Side Source Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Source A Card */}
                <div
                  className={`rounded border p-4 flex flex-col justify-between space-y-4 ${
                    isResolved && conflict.chosenSource === "sourceA"
                      ? "border-success bg-success-surface/40"
                      : !isResolved && conflict.sourceA.authority === "PRIMARY"
                      ? "border-ink bg-paper shadow-none"
                      : "border-hairline bg-paper"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink block">
                        Option A: {conflict.sourceA.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[10px] uppercase font-semibold ${
                            conflict.sourceA.authority === "PRIMARY"
                              ? "bg-ink text-paper"
                              : "border border-hairline bg-paper text-ink-muted"
                          }`}
                        >
                          {conflict.sourceA.authority}
                        </span>
                        {conflict.sourceA.authority === "PRIMARY" && (
                          <span className="rounded border border-ink bg-paper-elevated px-1.5 py-0.2 font-mono text-[9px] uppercase font-semibold text-ink">
                            Recommended keep
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 font-sans text-[13px] text-ink leading-relaxed">
                      &ldquo;{conflict.sourceA.claim}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-hairline pt-3">
                    <button
                      type="button"
                      disabled={isViewer || isResolved}
                      onClick={() => resolveConflict(conflict.id, "sourceA")}
                      className={`w-full rounded border py-1.5 font-mono text-[12px] font-semibold transition-colors ${
                        isViewer || isResolved
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : conflict.sourceA.authority === "PRIMARY"
                          ? "border-ink bg-ink text-paper hover:bg-ink/90"
                          : "border-ink bg-paper-elevated text-ink hover:bg-paper"
                      }`}
                    >
                      Keep Option A
                    </button>
                  </div>
                </div>

                {/* Source B Card */}
                <div
                  className={`rounded border p-4 flex flex-col justify-between space-y-4 ${
                    isResolved && conflict.chosenSource === "sourceB"
                      ? "border-success bg-success-surface/40"
                      : !isResolved && conflict.sourceB.authority === "PRIMARY"
                      ? "border-ink bg-paper shadow-none"
                      : "border-hairline bg-paper"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink block">
                        Option B: {conflict.sourceB.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[10px] uppercase font-semibold ${
                            conflict.sourceB.authority === "PRIMARY"
                              ? "bg-ink text-paper"
                              : "border border-hairline bg-paper text-ink-muted"
                          }`}
                        >
                          {conflict.sourceB.authority}
                        </span>
                        {conflict.sourceB.authority === "PRIMARY" && (
                          <span className="rounded border border-ink bg-paper-elevated px-1.5 py-0.2 font-mono text-[9px] uppercase font-semibold text-ink">
                            Recommended keep
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 font-sans text-[13px] text-ink leading-relaxed">
                      &ldquo;{conflict.sourceB.claim}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-hairline pt-3">
                    <button
                      type="button"
                      disabled={isViewer || isResolved}
                      onClick={() => resolveConflict(conflict.id, "sourceB")}
                      className={`w-full rounded border py-1.5 font-mono text-[12px] font-semibold transition-colors ${
                        isViewer || isResolved
                          ? "cursor-not-allowed border-hairline bg-paper text-ink-faint"
                          : conflict.sourceB.authority === "PRIMARY"
                          ? "border-ink bg-ink text-paper hover:bg-ink/90"
                          : "border-ink bg-paper-elevated text-ink hover:bg-paper"
                      }`}
                    >
                      Keep Option B
                    </button>
                  </div>
                </div>
              </div>

              {/* RBAC note */}
              {isViewer && (
                <div className="flex items-center gap-2 rounded border border-hairline bg-paper p-3 text-[12px] font-mono text-ink-muted">
                  <Lock className="h-4 w-4 text-ink-muted" />
                  <span>
                    You are in View Only mode. Only Ops Lead and Owner can resolve conflicting information.
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
