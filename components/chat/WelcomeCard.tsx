import React from "react";
import { ShieldCheck } from "lucide-react";

export function WelcomeCard() {
  return (
    <div className="rounded-[4px] border border-hairline bg-paper p-4 text-left">
      <div className="flex items-center gap-2 text-ink-muted">
        <ShieldCheck className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
          Verified Agent
        </span>
      </div>
      <h2 className="mt-2 font-serif text-[15px] font-medium leading-snug text-ink">
        Hi! I&apos;m SYNEX for Senthil Traders. I can check prices, stock, and order status from approved business documents.
      </h2>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-muted">
        Answers cite their sources. I won&apos;t guess.
      </p>
    </div>
  );
}
