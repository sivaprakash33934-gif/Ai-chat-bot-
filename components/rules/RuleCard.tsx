import { RuleItem } from "@/lib/mock-deep";

interface RuleCardProps {
  rule: RuleItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function RuleCard({ rule, isSelected, onSelect }: RuleCardProps) {
  return (
    <div
      onClick={() => onSelect(rule.id)}
      className={`cursor-pointer rounded border p-6 transition-colors ${
        isSelected
          ? "border-ink bg-paper-elevated"
          : "border-hairline bg-paper hover:bg-paper-elevated"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            {rule.scope}
          </span>
          <h2 className="mt-1 font-serif text-[18px] font-semibold text-ink">
            {rule.name}
          </h2>
        </div>
        <span className="rounded border border-hairline bg-paper px-2 py-0.5 font-mono text-[10px] font-semibold text-amber">
          {rule.riskTier} RISK
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-hairline pt-3 font-mono text-[12px] sm:grid-cols-2">
        <div>
          <span className="text-ink-faint">Condition: </span>
          <code>{rule.condition}</code>
        </div>
        <div>
          <span className="text-ink-faint">Effect: </span>
          <code>{rule.effect}</code>
        </div>
        <div>
          <span className="text-ink-faint">Authority: </span>
          <span>{rule.authorizedRole}</span>
        </div>
        <div>
          <span className="text-ink-faint">Last Changed: </span>
          <span>{rule.lastChanged}</span>
        </div>
      </div>
    </div>
  );
}
