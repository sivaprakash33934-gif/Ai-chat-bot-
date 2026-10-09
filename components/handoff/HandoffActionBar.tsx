"use client";

import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";

interface HandoffActionBarProps {
  status: "AWAITING_HUMAN" | "OWNERSHIP_TAKEN" | "RETURNED_TO_AI";
  onTakeOwnership: () => void;
  onReturnToAi: (instruction: string) => void;
  loadingAction: string | null;
  auditLines: string[];
}

export function HandoffActionBar({
  status,
  onTakeOwnership,
  onReturnToAi,
  loadingAction,
  auditLines,
}: HandoffActionBarProps) {
  const [activeAction, setActiveAction] = useState<"none" | "return">("none");
  const [instruction, setInstruction] = useState("");
  const [instructionError, setInstructionError] = useState<string | null>(null);

  const handleReturnConfirm = () => {
    if (!instruction.trim()) {
      setInstructionError("Instruction is required before returning to AI.");
      return;
    }
    onReturnToAi(instruction);
    setActiveAction("none");
  };

  return (
    <div className="rounded border border-hairline bg-paper-elevated p-6 space-y-4">
      <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
        Operator Resolution Gate
      </h2>

      <div className="flex flex-wrap gap-3">
        <button
          disabled={loadingAction !== null || status === "OWNERSHIP_TAKEN"}
          onClick={onTakeOwnership}
          className="flex min-h-touch items-center gap-2 rounded border border-ink bg-ink px-4 font-mono text-[12px] font-medium text-paper hover:bg-black disabled:opacity-50"
        >
          {loadingAction === "ownership" ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Take Ownership"}
        </button>

        <button
          disabled={loadingAction !== null || status === "RETURNED_TO_AI"}
          onClick={() => {
            setActiveAction(activeAction === "return" ? "none" : "return");
            setInstructionError(null);
          }}
          className="flex min-h-touch items-center gap-2 rounded border border-hairline bg-paper px-4 font-mono text-[12px] font-medium text-ink hover:border-ink disabled:opacity-50"
        >
          Return to AI
        </button>
      </div>

      {activeAction === "return" && (
        <div className="mt-4 rounded border border-hairline bg-paper p-4 space-y-3">
          <label htmlFor="ai-instructions" className="block font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            Required Guidance for Autonomous Re-Execution
          </label>
          <textarea
            id="ai-instructions"
            rows={3}
            value={instruction}
            onChange={(e) => { setInstruction(e.target.value); setInstructionError(null); }}
            onBlur={() => { if (!instruction.trim()) setInstructionError("Instruction is required before returning to AI."); }}
            placeholder="e.g., Authorize 12% discount provided delivery is scheduled after the 15th."
            className="w-full rounded border border-hairline bg-paper-elevated p-2 font-mono text-[12px] text-ink focus:border-ink focus:outline-none"
          />
          {instructionError && (
            <p className="flex items-center gap-1 font-mono text-[11px] text-error">
              <AlertCircle size={12} /> {instructionError}
            </p>
          )}
          <button
            disabled={loadingAction !== null}
            onClick={handleReturnConfirm}
            className="flex min-h-touch items-center justify-center rounded border border-ink bg-ink px-4 font-mono text-[12px] font-medium text-paper hover:bg-black"
          >
            {loadingAction === "return" ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Confirm & Dispatch to Engine"}
          </button>
        </div>
      )}

      <div className="border-t border-hairline pt-3 space-y-1">
        <span className="font-mono text-[10px] uppercase text-ink-faint">Ledger Audit History</span>
        {auditLines.map((line, idx) => (
          <p key={idx} className="font-mono text-[11px] text-ink-muted">{line}</p>
        ))}
      </div>
    </div>
  );
}
