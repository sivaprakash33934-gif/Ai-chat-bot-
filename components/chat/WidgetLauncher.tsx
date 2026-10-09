"use client";

import React, { forwardRef } from "react";
import { MessageSquare } from "lucide-react";

interface WidgetLauncherProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const WidgetLauncher = forwardRef<HTMLButtonElement, WidgetLauncherProps>(
  function WidgetLauncher({ isOpen, onOpen }, ref) {
    if (isOpen) return null;

    return (
      <button
        ref={ref}
        id="synex-chat-launcher"
        type="button"
        onClick={onOpen}
        aria-label="Chat with SYNEX"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="fixed bottom-5 right-5 z-40 flex h-11 items-center gap-2 rounded-full border border-hairline bg-ink px-4 text-paper ring-1 ring-ink/15 transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 print:hidden"
      >
        <MessageSquare className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">
          CHAT
        </span>
      </button>
    );
  }
);
