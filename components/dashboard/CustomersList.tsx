"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Users, ArrowUpRight, ArrowRight } from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { GSTINDisplay, EmptyState } from "./ui";

export function CustomersList({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const { customers, searchQuery, setSearchQuery } = useDashboardStore();

  const [localSearch, setLocalSearch] = useState<string>(initialQuery || searchQuery || "");

  // Sync with global store if changed
  const activeQuery = localSearch || searchQuery;

  const filteredCustomers = useMemo(() => {
    const q = activeQuery.toLowerCase().trim();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.gstin.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }, [customers, activeQuery]);

  const handleRowClick = (customerId: string) => {
    // Preserve query in URL param for back button restoration (Addendum A)
    const param = activeQuery ? `?returnQuery=${encodeURIComponent(activeQuery)}` : "";
    router.push(`/dashboard/customers/${customerId}${param}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Customers
          </span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
            All Accounts
          </span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">
          Customers
        </h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
          List of your buyers, customer preferences, and payment terms.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search accounts by name, company, or GSTIN..."
            aria-label="Search customer accounts"
            className="h-9 w-full rounded border border-hairline bg-paper-elevated pl-9 pr-8 font-sans text-[13px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                setSearchQuery("");
              }}
              aria-label="Clear customer search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <span className="font-mono text-[12px] text-ink-muted">
          Showing {filteredCustomers.length} of {customers.length} Accounts
        </span>
      </div>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          title="No customer accounts found."
          description={`No accounts matched "${activeQuery}". Clear the search term to view all registered buyers.`}
          actionLabel="Clear Search"
          onAction={() => {
            setLocalSearch("");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="overflow-x-auto border border-hairline bg-paper-elevated">
          <table className="w-full text-left border-collapse" aria-label="Customer accounts directory">
            <thead>
              <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                <th scope="col" className="px-5 py-3.5 font-medium">Customer / Contact</th>
                <th scope="col" className="px-5 py-3.5 font-medium">GSTIN</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Tier</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Total Purchases</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Payment Terms</th>
                <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
                <th scope="col" className="px-5 py-3.5 text-right font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-sans text-[13px]">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => handleRowClick(cust.id)}
                  className="cursor-pointer transition-colors hover:bg-paper/70 group"
                >
                  {/* Account Name */}
                  <td className="px-5 py-4">
                    <div className="font-semibold text-ink group-hover:underline">
                      {cust.company}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
                      <span>{cust.id}</span>
                      <span>·</span>
                      <span>{cust.name}</span>
                    </div>
                  </td>

                  {/* GSTIN */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <GSTINDisplay gstin={cust.gstin} />
                  </td>

                  {/* Tier */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
                        cust.tier === "Enterprise"
                          ? "bg-ink text-paper border-ink"
                          : "bg-paper text-ink border-hairline"
                      }`}
                    >
                      {cust.tier}
                    </span>
                  </td>

                  {/* Total Purchases (Aggregate GMV) */}
                  <td className="px-5 py-4 font-mono text-ink whitespace-nowrap font-medium">
                    ₹{(cust.totalGmv / 10000000).toFixed(2)} Cr
                  </td>

                  {/* Payment Terms */}
                  <td className="px-5 py-4 font-sans text-[12px] text-ink-muted max-w-[200px] truncate">
                    {cust.memoryBank.paymentTerms}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] uppercase ${
                        cust.status === "high_touch"
                          ? "bg-amber-tint text-amber border-amber/30"
                          : "bg-success-surface text-success border-success/30"
                      }`}
                    >
                      {cust.status === "high_touch" ? "VIP Customer" : "Active Customer"}
                    </span>
                  </td>

                  {/* Open Profile */}
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted group-hover:text-ink">
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
