import Link from "next/link";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import { CustomerDossier } from "@/lib/mock-deep";

interface CustomerActionsProps {
  customer: CustomerDossier;
}

export function CustomerActions({ customer }: CustomerActionsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded border border-hairline bg-paper-elevated p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          Next Best Action
        </h2>
        <p className="mt-2 font-serif text-[15px] font-semibold text-ink">
          {customer.nextBestAction.title}
        </p>
        <p className="mt-2 font-serif text-[13px] leading-relaxed text-ink-muted">
          {customer.nextBestAction.recommendation}
        </p>
        <Link
          href="/dashboard/approvals"
          className="mt-4 flex min-h-touch items-center justify-center gap-1.5 rounded border border-ink bg-ink px-3 font-mono text-[12px] font-medium text-paper hover:bg-black"
        >
          {customer.nextBestAction.actionLabel} <ArrowUpRight size={13} />
        </Link>
      </div>

      <div className="rounded border border-hairline bg-paper-elevated p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-3">
          Open Risk Items ({customer.openItems.length})
        </h2>
        {customer.openItems.length === 0 ? (
          <p className="font-serif text-[13px] text-ink-muted">Zero active flags.</p>
        ) : (
          <div className="space-y-3">
            {customer.openItems.map((item) => (
              <div key={item.id} className="rounded border border-hairline bg-paper p-3">
                <div className="flex items-center gap-1.5 text-amber">
                  <AlertTriangle size={12} />
                  <span className="font-mono text-[10px] font-semibold uppercase">
                    {item.risk} RISK
                  </span>
                </div>
                <p className="mt-1 font-serif text-[13px] font-medium text-ink">
                  {item.title}
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-muted">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
