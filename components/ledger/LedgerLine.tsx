interface LedgerLineProps {
  timestamp: string;
  actor: "MACHINE" | "HUMAN" | string;
  actorName?: string;
  content: string;
  delta?: string;
  voice?: "mono" | "serif";
  className?: string;
}

export function LedgerLine({
  timestamp,
  actor,
  actorName,
  content,
  delta,
  voice = "mono",
  className = "",
}: LedgerLineProps) {
  const isMachine = actor === "MACHINE" || actor === "SYNEX";

  return (
    <div
      className={`flex flex-col gap-2 border-b border-hairline py-3.5 last:border-b-0 sm:flex-row sm:items-start sm:gap-4 ${className}`}
    >
      <div className="flex w-36 shrink-0 items-center gap-2">
        <span
          className={`inline-flex rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
            isMachine
              ? "border border-hairline bg-paper text-ink"
              : "border border-amber bg-amber-tint text-amber-ink"
          }`}
        >
          {actor}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-ink-muted">
          {timestamp}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        {actorName && (
          <p className="font-mono text-[11px] text-ink-faint mb-0.5">
            {actorName}
          </p>
        )}
        <p
          className={`leading-relaxed text-ink ${
            voice === "serif"
              ? "font-serif text-[14px]"
              : "font-mono text-[12px]"
          }`}
        >
          {content}
        </p>
      </div>

      {delta && (
        <div className="shrink-0 text-right sm:w-28">
          <span className="font-mono text-[12px] font-semibold tabular-nums text-ink">
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}
