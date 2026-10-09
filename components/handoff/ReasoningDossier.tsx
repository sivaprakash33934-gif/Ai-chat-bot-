import { HandoffPayload } from "@/lib/mock-deep";

interface ReasoningDossierProps {
  handoff: HandoffPayload;
}

export function ReasoningDossier({ handoff }: ReasoningDossierProps) {
  return (
    <div className="rounded border border-hairline bg-paper-elevated p-6 space-y-5">
      <div>
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          What AI Already Tried
        </h2>
        <ul className="mt-2 space-y-1.5 font-serif text-[14px] text-ink list-disc list-inside">
          {handoff.whatAiTried.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="border-t border-hairline pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          What AI Recommends
        </h2>
        <p className="mt-1 font-serif text-[14px] leading-relaxed text-ink">
          {handoff.whatAiRecommends}
        </p>
      </div>

      <div className="border-t border-hairline pt-4">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-amber font-semibold">
          What AI Is Unsure About
        </h2>
        <p className="mt-1 font-serif text-[14px] leading-relaxed text-ink">
          {handoff.whatAiIsUnsureAbout}
        </p>
      </div>
    </div>
  );
}
