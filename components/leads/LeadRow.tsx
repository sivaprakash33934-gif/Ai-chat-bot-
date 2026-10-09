import { Lead } from "@/lib/mock-deep";

interface LeadRowProps {
  lead: Lead;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function LeadRow({ lead, isSelected, onToggle }: LeadRowProps) {
  const customerId = lead.domain.replace(/\.[a-z]+$/, "");

  return (
    <div
      className={`p-4 transition-colors hover:bg-paper min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-4 min-[900px]:px-6 min-[900px]:py-3.5 ${
        isSelected ? "bg-amber-tint" : ""
      }`}
    >
      {/* Desktop Columns (>= 900px) */}
      <div className="hidden min-[900px]:col-span-1 min-[900px]:block">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(lead.id)}
          aria-label={`Select lead from ${lead.domain}`}
          className="h-4 w-4 rounded border-hairline"
        />
      </div>
      <div className="hidden min-[900px]:col-span-3 min-[900px]:block font-serif text-[14px] font-medium text-ink">
        <a href={`/dashboard/customers/${customerId}`} className="hover:underline">
          {lead.domain}
        </a>
      </div>
      <div className="hidden min-[900px]:col-span-2 min-[900px]:block font-mono text-[12px] text-ink-muted">
        {lead.intent}
      </div>
      <div className="hidden min-[900px]:col-span-2 min-[900px]:block">
        <span className="rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-ink">
          {lead.status}
        </span>
      </div>
      <div className="hidden min-[900px]:col-span-2 min-[900px]:block text-right font-mono text-[13px] font-semibold tabular text-ink">
        {lead.valueFormatted}
      </div>
      <div className="hidden min-[900px]:col-span-2 min-[900px]:block text-right font-mono text-[12px] text-ink-muted">
        {lead.created}
      </div>

      {/* Mobile Stacked Row-Card (< 900px) */}
      <div className="flex flex-col gap-2 min-[900px]:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(lead.id)}
              aria-label={`Select lead from ${lead.domain}`}
              className="h-4 w-4 rounded border-hairline"
            />
            <span className="rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-ink">
              {lead.status}
            </span>
          </div>
          <span className="font-mono text-[14px] font-semibold tabular text-ink">
            {lead.valueFormatted}
          </span>
        </div>
        <div className="flex items-center justify-between font-mono text-[12px] text-ink-muted">
          <a href={`/dashboard/customers/${customerId}`} className="font-serif text-[14px] text-ink hover:underline">
            {lead.domain}
          </a>
          <span>{lead.intent}</span>
        </div>
      </div>
    </div>
  );
}
