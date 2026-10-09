"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  FileText,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { Customer } from "@/lib/fixtures";
import { GSTINDisplay } from "./ui";

function BackLink() {
  const searchParams = useSearchParams();
  const { searchQuery } = useDashboardStore();

  const queryToRestore = searchParams.get("returnQuery") || searchQuery || "";
  const backHref = queryToRestore
    ? `/dashboard/customers?q=${encodeURIComponent(queryToRestore)}`
    : "/dashboard/customers";

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-muted hover:text-ink focus-visible:outline-none"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>
        Back to Directory {queryToRestore ? `(Search: "${queryToRestore}")` : ""}
      </span>
    </Link>
  );
}

export function CustomerProfile({ customer }: { customer: Customer }) {
  const { role, revealPII, setRevealPII, formatGSTIN } = useDashboardStore();

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Back Button */}
      <div>
        <Suspense
          fallback={
            <div className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-muted">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Directory</span>
            </div>
          }
        >
          <BackLink />
        </Suspense>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <span>Customer Profile</span>
              <span>·</span>
              <span>{customer.id}</span>
            </div>
            <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
              {customer.company}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[12px] text-ink-muted">
              <span>Key Buyer: {customer.name}</span>
              <span>·</span>
              <GSTINDisplay gstin={customer.gstin} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
                customer.tier === "Enterprise"
                  ? "border-ink bg-ink text-paper"
                  : "border-hairline bg-paper text-ink"
              }`}
            >
              {customer.tier}
            </span>
            <div className="border border-hairline bg-paper-elevated px-4 py-2 font-mono text-right">
              <span className="block text-[10px] uppercase text-ink-muted">Total Purchases</span>
              <span className="font-serif text-[20px] font-semibold text-ink">
                ₹{(customer.totalGmv / 10000000).toFixed(2)} Cr
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: What We Remember (Left) & Activity History (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: What We Remember (5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          <div className="border border-hairline bg-paper-elevated p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ink" />
                <h2 className="font-serif text-[18px] font-semibold text-ink">
                  Customer Memory Bank
                </h2>
              </div>
              <span className="font-mono text-[10px] uppercase text-ink-muted">
                Governed Boundary
              </span>
            </div>
            <p className="font-sans text-[12px] text-ink-muted leading-relaxed">
              Strict memory partitioning. Context is categorized by model accessibility rules.
            </p>

            {/* Sub-group A: AI Can Use */}
            <div className="rounded-[4px] border border-hairline bg-paper p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-800">✓</span>
                  AI Can Use (Ingested)
                </span>
                <span className="font-mono text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-[2px]">
                  Permitted
                </span>
              </div>

              {/* Preferences */}
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-medium">
                  Preferences
                </span>
                <ul className="space-y-1 text-[12px] text-ink pl-2 border-l border-emerald-300">
                  {customer.memoryBank.preferences.map((pref, i) => (
                    <li key={i} className="leading-snug">{pref}</li>
                  ))}
                </ul>
              </div>

              {/* Delivery Notes */}
              <div className="space-y-1.5 pt-2 border-t border-hairline">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-medium">
                  Delivery & Warehouse Constraints
                </span>
                <ul className="space-y-1 text-[12px] text-ink pl-2 border-l border-emerald-300">
                  {customer.memoryBank.constraints.map((c, i) => (
                    <li key={i} className="leading-snug">{c}</li>
                  ))}
                </ul>
              </div>

              {/* Payment Terms */}
              <div className="space-y-1 pt-2 border-t border-hairline">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-medium">
                  Commercial Payment Terms
                </span>
                <div className="font-mono text-[11px] text-ink bg-paper-elevated border border-hairline px-2 py-1 rounded-[2px]">
                  {customer.memoryBank.paymentTerms}
                </div>
              </div>
            </div>

            {/* Sub-group B: AI Cannot Use (Restricted PII) */}
            <div className="rounded-[4px] border border-hairline bg-paper p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-[10px] text-red-800">✕</span>
                  AI Cannot Use (Restricted)
                </span>
                <span className="font-mono text-[9px] text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-[2px]">
                  Strict Exclusion
                </span>
              </div>

              <div className="space-y-2 text-[12px]">
                <div className="flex items-center justify-between py-1 border-b border-hairline">
                  <span className="font-mono text-[11px] text-ink-muted">Commercial GSTIN:</span>
                  <span className="font-mono text-[11px] text-ink font-medium">
                    {revealPII ? customer.gstin : formatGSTIN(customer.gstin)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-hairline">
                  <span className="font-mono text-[11px] text-ink-muted">Primary Phone:</span>
                  <span className="font-mono text-[11px] text-ink font-medium">
                    {revealPII ? "+91 98420 18832" : "+91 98420 •••••"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-mono text-[11px] text-ink-muted">Credit Facility Limit:</span>
                  <span className="font-mono text-[11px] text-ink font-medium">
                    {revealPII ? "₹50,00,000" : "₹50,••,•••"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-hairline space-y-2">
                <p className="font-mono text-[10px] text-ink-muted italic leading-tight">
                  Restricted by privacy policy — Zero model ingestion.
                </p>

                {/* Role-gated PII Reveal Button */}
                {role === "viewer" ? (
                  <div className="rounded-[3px] border border-hairline bg-paper-elevated p-2 text-center">
                    <span className="font-mono text-[10px] text-ink-muted">
                      🔒 Viewer role cannot unmask restricted PII.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealPII(!revealPII)}
                    className="w-full rounded-[3px] border border-ink bg-paper py-1.5 font-mono text-[10px] text-ink hover:bg-ink hover:text-paper transition-colors focus-visible:outline-none"
                  >
                    {revealPII ? "Mask Restricted PII" : "Reveal Restricted PII"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Activity History (7 cols) */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-ink-muted" />
              <h2 className="font-serif text-[18px] font-semibold text-ink">
                Activity History
              </h2>
            </div>
            <span className="font-mono text-[11px] text-ink-muted">
              {customer.timeline.length} Past Actions
            </span>
          </div>

          <div className="border border-hairline bg-paper-elevated p-6">
            <div className="space-y-6">
              {customer.timeline.map((event, idx) => (
                <div key={event.id} className="relative flex gap-4">
                  {/* Timeline icon */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-paper text-ink">
                      {event.type === "approval" && <ShieldCheck className="h-3.5 w-3.5 text-amber" />}
                      {event.type === "quote" && <FileText className="h-3.5 w-3.5 text-success" />}
                      {event.type === "handoff" && <Headphones className="h-3.5 w-3.5 text-error" />}
                      {event.type === "note" && <CheckCircle2 className="h-3.5 w-3.5 text-ink" />}
                    </div>
                    {idx !== customer.timeline.length - 1 && (
                      <div className="w-[1px] flex-1 bg-hairline my-2" />
                    )}
                  </div>

                  {/* Timeline Event Details */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[14px] font-semibold text-ink">
                        {event.title}
                      </span>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {event.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-[13px] text-ink-muted leading-relaxed">
                      {event.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
