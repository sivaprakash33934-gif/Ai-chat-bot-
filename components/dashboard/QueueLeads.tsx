"use client";

import React, { useState, useMemo } from "react";
import { X, ExternalLink, Activity } from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { GSTINDisplay, StatusBadge, EmptyState } from "./ui";

type FilterStatus = "all" | "pending_qualification" | "high_value" | "flagged";

export function QueueLeads() {
  const { leads, searchQuery, setSearchQuery, openTrace } = useDashboardStore();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  // Filter leads by query and status pill
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" ? true : lead.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.id.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.buyerName.toLowerCase().includes(q) ||
        lead.gstin.toLowerCase().includes(q) ||
        lead.intent.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  // Compute live pill counts
  const counts = useMemo(
    () => ({
      all: leads.length,
      pending_qualification: leads.filter((l) => l.status === "pending_qualification").length,
      high_value: leads.filter((l) => l.status === "high_value").length,
      flagged: leads.filter((l) => l.status === "flagged").length,
    }),
    [leads]
  );

  return (
    <div className="space-y-4">
      {/* Filters & Search Chip Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        {/* Filter Pills with simplified labels */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter leads by status">
          {(
            [
              { key: "all", label: "All Leads" },
              { key: "pending_qualification", label: "New Leads" },
              { key: "high_value", label: "Big Deals" },
              { key: "flagged", label: "Needs Review" },
            ] as const
          ).map((filter) => {
            const active = statusFilter === filter.key;
            const count = counts[filter.key];

            return (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStatusFilter(filter.key)}
                className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[12px] transition-colors ${
                  active
                    ? "border-ink bg-paper-elevated font-semibold text-ink"
                    : "border-hairline bg-paper text-ink-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    active ? "bg-ink text-paper" : "bg-paper-elevated text-ink-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Filter Chip (if active) & Record Count */}
        <div className="flex items-center gap-3">
          {searchQuery && (
            <div className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper-elevated px-2.5 py-1 font-mono text-[11px] text-ink">
              <span>Searching: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search filter"
                className="text-ink-muted hover:text-ink"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <span className="font-mono text-[12px] text-ink-muted">
            Showing {filteredLeads.length} of {leads.length}
          </span>
        </div>
      </div>

      {/* Table Section with Horizontal Scroll */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          title="No leads match your filter."
          description="Try broadening your search query or switching the status filter tab."
          actionLabel="Clear Filters"
          onAction={() => {
            setStatusFilter("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="overflow-x-auto border border-hairline bg-paper-elevated">
          <table className="w-full text-left border-collapse" aria-label="Customer leads queue">
            <thead>
              <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-4 py-3 font-medium">Lead / Company</th>
                <th scope="col" className="px-4 py-3 font-medium">GSTIN</th>
                <th scope="col" className="px-4 py-3 font-medium">What They Want</th>
                <th scope="col" className="px-4 py-3 font-medium">Estimated Value</th>
                <th scope="col" className="px-4 py-3 font-medium">Channel</th>
                <th scope="col" className="px-4 py-3 font-medium">AI Match</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans text-[13px]">
              {filteredLeads.map((lead) => {
                const statusDisplay =
                  lead.status === "qualified"
                    ? { status: "approved" as const, label: "Qualified" }
                    : lead.status === "high_value"
                    ? { status: "high_touch" as const, label: "Big Deal" }
                    : lead.status === "flagged"
                    ? { status: "held" as const, label: "Needs Review" }
                    : { status: "pending" as const, label: "New Lead" };

                return (
                  <tr key={lead.id} className="transition-colors hover:bg-paper/60">
                    {/* Lead ID & Buyer */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-ink">{lead.company}</div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
                        <span>{lead.id}</span>
                        <span>·</span>
                        <span>{lead.buyerName}</span>
                      </div>
                    </td>

                    {/* GSTIN */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <GSTINDisplay gstin={lead.gstin} />
                    </td>

                    {/* What They Want */}
                    <td className="px-4 py-3.5 max-w-xs text-ink-muted leading-snug">
                      <span className="line-clamp-2">{lead.intent}</span>
                    </td>

                    {/* Value in INR */}
                    <td className="px-4 py-3.5 font-mono text-ink whitespace-nowrap">
                      ₹{(lead.value).toLocaleString("en-IN")}
                    </td>

                    {/* Channel */}
                    <td className="px-4 py-3.5 font-mono text-[11px] text-ink-muted whitespace-nowrap">
                      {lead.channel}
                    </td>

                    {/* Model Confidence / AI Match */}
                    <td className="px-4 py-3.5 font-mono text-[12px] whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          lead.confidence >= 0.9
                            ? "text-success"
                            : lead.confidence >= 0.8
                            ? "text-ink"
                            : "text-amber"
                        }`}
                      >
                        {Math.round(lead.confidence * 100)}%
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge
                        status={statusDisplay.status}
                        label={statusDisplay.label}
                      />
                    </td>

                    {/* Trace Trigger */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openTrace(lead.id)}
                        className="inline-flex items-center gap-1.5 rounded border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] text-ink hover:border-ink/40 hover:bg-paper-elevated"
                      >
                        <Activity className="h-3 w-3 text-ink-muted" />
                        <span>Trace</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
