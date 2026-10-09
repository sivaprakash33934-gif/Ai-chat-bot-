"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_LEADS } from "@/lib/mock-deep";
import { LeadsFilterBar } from "./LeadsFilterBar";
import { LeadRow } from "./LeadRow";
import { BulkActionBar } from "./BulkActionBar";
import { ArrowUpDown } from "lucide-react";

export function LeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get("status") || "ALL";
  const intentParam = searchParams.get("intent") || "ALL";

  const [sortField, setSortField] = useState<"value" | "created">("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<string[]>([]);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const updateFilters = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "ALL") params.delete(key);
    else params.set(key, val);
    router.push(`/dashboard/leads?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    return MOCK_LEADS.filter((item) => {
      if (statusParam !== "ALL" && item.status !== statusParam) return false;
      if (intentParam !== "ALL" && item.intent !== intentParam) return false;
      return true;
    }).sort((a, b) => {
      const mult = sortOrder === "asc" ? 1 : -1;
      return sortField === "value"
        ? (a.value - b.value) * mult
        : (a.createdTimestamp - b.createdTimestamp) * mult;
    });
  }, [statusParam, intentParam, sortField, sortOrder]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selected.length > 0 && selected.length < filtered.length;
    }
  }, [selected, filtered]);

  const toggleSort = (field: "value" | "created") => {
    if (sortField === field) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortOrder("desc"); }
  };

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((l) => l.id));
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className={`space-y-6 ${selected.length > 0 ? "pb-24" : ""}`}>
      <LeadsFilterBar
        status={statusParam}
        intent={intentParam}
        totalCount={MOCK_LEADS.length}
        filteredCount={filtered.length}
        onFilterChange={updateFilters}
      />

      {filtered.length === 0 ? (
        <div className="rounded border border-hairline bg-paper-elevated p-12 text-center">
          <p className="font-serif text-[18px] text-ink">No active leads matching these filters.</p>
          <button
            onClick={() => router.push("/dashboard/leads")}
            className="mt-3 font-mono text-[12px] text-ink underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded border border-hairline bg-paper-elevated">
          <div className="hidden border-b border-hairline bg-paper px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-4">
            <div className="col-span-1">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={selected.length === filtered.length && filtered.length > 0}
                onChange={toggleSelectAll}
                aria-label="Select all leads"
                className="h-4 w-4 rounded border-hairline"
              />
            </div>
            <div className="col-span-3">Store Domain</div>
            <div className="col-span-2">Query Intent</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">
              <button
                onClick={() => toggleSort("value")}
                aria-sort={sortField === "value" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-ink hover:underline"
              >
                Value <ArrowUpDown size={12} />
              </button>
            </div>
            <div className="col-span-2 text-right">
              <button
                onClick={() => toggleSort("created")}
                aria-sort={sortField === "created" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-ink hover:underline"
              >
                Created <ArrowUpDown size={12} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-hairline">
            {filtered.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isSelected={selected.includes(lead.id)}
                onToggle={toggleSelect}
              />
            ))}
          </div>
        </div>
      )}

      <BulkActionBar
        selectedCount={selected.length}
        onClear={() => setSelected([])}
      />
    </div>
  );
}
