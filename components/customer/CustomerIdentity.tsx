import { CustomerDossier } from "@/lib/mock-deep";

interface CustomerIdentityProps {
  customer: CustomerDossier;
}

export function CustomerIdentity({ customer }: CustomerIdentityProps) {
  return (
    <div className="space-y-6">
      <div className="rounded border border-hairline bg-paper-elevated p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          Credit &amp; Tier
        </h2>
        <p className="mt-2 font-serif text-[15px] font-medium text-ink">
          {customer.tier}
        </p>
        <div className="mt-4 space-y-2 border-t border-hairline pt-3 font-mono text-[12px]">
          <div>
            <span className="text-ink-faint">Facility: </span>
            <span className="text-ink">{customer.creditLimit}</span>
          </div>
          <div>
            <span className="text-ink-faint">Outstanding: </span>
            <span className="text-ink tabular">{customer.outstandingBalance}</span>
          </div>
        </div>
      </div>

      {/* Native <details> Memory Bank */}
      <details
        open
        className="group rounded border border-hairline bg-paper-elevated p-5"
      >
        <summary className="cursor-pointer list-none font-mono text-[11px] uppercase tracking-wider text-ink-muted flex items-center justify-between">
          <span>Customer Memory Bank</span>
          <span className="text-ink-faint text-[10px] group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <div className="mt-4 space-y-3 border-t border-hairline pt-3">
          {customer.memoryBank.map((m, idx) => (
            <div key={idx} className="text-[12px]">
              <p className="font-mono text-[11px] text-ink-faint">{m.key}</p>
              <p className="mt-0.5 font-serif text-[13px] text-ink">{m.value}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
