"use client";

import React, { forwardRef, useState, useRef, useImperativeHandle } from "react";
import { ArrowUp, Square } from "lucide-react";

interface ComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
}

export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(
  function Composer({ onSend, disabled, isStreaming, onStop }, ref) {
    const [value, setValue] = useState("");
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const adjustHeight = () => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 112)}px`;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      const trimmed = value.trim();
      if (!trimmed || disabled || isStreaming) return;
      onSend(trimmed);
      setValue("");
      if (internalRef.current) {
        internalRef.current.style.height = "auto";
      }
    };

    const isWhitespaceOnly = !value.trim();

    return (
      <div className="border-t border-hairline bg-paper-elevated p-3">
        <label htmlFor="synex-chat-input" className="sr-only">
          Type a message to SYNEX
        </label>
        <div className="flex items-end gap-2">
          <textarea
            ref={internalRef}
            id="synex-chat-input"
            rows={1}
            maxLength={500}
            value={value}
            disabled={disabled || isStreaming}
            onChange={(e) => {
              setValue(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              isStreaming
                ? "Drafting response…"
                : "Ask about prices, stock, or orders…"
            }
            className="max-h-28 min-h-[40px] flex-1 resize-none rounded-[4px] border border-hairline bg-paper px-3 py-2 font-sans text-[13px] leading-relaxed text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none disabled:opacity-75"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop response generation"
              className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-[4px] border border-hairline bg-paper px-3 font-mono text-[11px] text-ink transition-colors hover:border-ink/60 hover:bg-paper-elevated active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Square className="h-3 w-3 fill-ink stroke-none" aria-hidden="true" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isWhitespaceOnly || disabled}
              aria-label="Send message"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border border-hairline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                isWhitespaceOnly || disabled
                  ? "cursor-not-allowed bg-paper text-ink-faint opacity-60"
                  : "bg-ink text-paper hover:bg-ink/90 active:scale-95"
              }`}
            >
              <ArrowUp className="h-4 w-4 stroke-[2]" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
