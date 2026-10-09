interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
}

export function BulkActionBar({ selectedCount, onClear }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded border border-hairline bg-paper-elevated px-6 py-3 shadow-none max-w-lg w-[90%]"
    >
      <span className="font-mono text-[12px] font-medium text-ink">
        {selectedCount} {selectedCount === 1 ? "lead" : "leads"} selected
      </span>
      <div className="flex-1" />
      <button
        onClick={onClear}
        className="font-mono text-[11px] text-ink-muted hover:underline"
      >
        Clear
      </button>
      <button className="min-h-touch rounded border border-ink bg-ink px-4 font-mono text-[12px] font-medium text-paper hover:bg-black">
        Batch Assign
      </button>
    </div>
  );
}
