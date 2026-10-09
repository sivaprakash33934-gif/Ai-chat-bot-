interface LeadsFilterBarProps {
  status: string;
  intent: string;
  totalCount: number;
  filteredCount: number;
  onFilterChange: (key: string, val: string) => void;
}

export function LeadsFilterBar({
  status,
  intent,
  totalCount,
  filteredCount,
  onFilterChange,
}: LeadsFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded border border-hairline bg-paper-elevated p-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          aria-label="Filter by Status"
          className="min-h-touch rounded border border-hairline bg-paper px-3 font-mono text-[13px] text-ink focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING_REVIEW">Pending Review</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="DISQUALIFIED">Disqualified</option>
        </select>

        <select
          value={intent}
          onChange={(e) => onFilterChange("intent", e.target.value)}
          aria-label="Filter by Intent"
          className="min-h-touch rounded border border-hairline bg-paper px-3 font-mono text-[13px] text-ink focus:outline-none"
        >
          <option value="ALL">All Intents</option>
          <option value="BULK_ORDER">Bulk Order</option>
          <option value="PRICE_CHECK">Price Check</option>
          <option value="STOCK_CHECK">Stock Check</option>
          <option value="POLICY">Policy</option>
        </select>
      </div>
      <p className="font-mono text-[12px] text-ink-muted">
        Showing {filteredCount} of {totalCount} leads
      </p>
    </div>
  );
}
