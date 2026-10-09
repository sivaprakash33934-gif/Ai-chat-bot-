"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ChatMessage, PipelinePhase } from "./types";
import { WelcomeCard } from "./WelcomeCard";
import { SuggestedChips } from "./SuggestedChips";
import { MessageBubble } from "./MessageBubble";
import { StateLine } from "./StateLine";
import { Composer } from "./Composer";
import { useMobileChat } from "./MobilePolish";
import { useReducedMotion } from "./ReducedMotionCheck";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  phase: PipelinePhase;
  isStreaming: boolean;
  onStopStreaming: () => void;
  onConfirmAction?: (actionId: string) => void;
  onCancelAction?: (actionId: string) => void;
  onRetryAction?: (actionId: string) => void;
  onDuplicateAction?: () => void;
  theme?: "light" | "dark";
  embedded?: boolean;
}

export function ChatPanel({
  isOpen, onClose, messages, onSendMessage, phase, isStreaming, onStopStreaming,
  onConfirmAction, onCancelAction, onRetryAction, onDuplicateAction, theme = "light",
  embedded = false,
}: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isMobile, safeAreaBottom } = useMobileChat(isOpen);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      if (isMobile) closeBtnRef.current?.focus();
      else composerRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen, isMobile]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
    if (e.key === "Tab" && panelRef.current) {
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === focusables[0]) {
        e.preventDefault(); focusables[focusables.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === focusables[focusables.length - 1]) {
        e.preventDefault(); focusables[0].focus();
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, phase]);

  if (!isOpen) return null;

  const isDark = theme === "dark";
  const uniqueSources = new Set<string>();
  messages.forEach((m) => m.citations?.forEach((c) => uniqueSources.add(c.source)));

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={!embedded}
      aria-label="SYNEX Chat"
      onKeyDown={handleKeyDown}
      className={
        embedded
          ? `relative flex flex-col border h-[560px] w-full rounded-[4px] print:hidden ${
              isDark ? "bg-ink text-paper border-paper/20" : "bg-paper-elevated text-ink border-hairline"
            }`
          : `fixed inset-0 z-50 flex flex-col border sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[620px] sm:max-h-[70vh] sm:w-[400px] sm:rounded-[4px] print:hidden ${
              isDark ? "bg-ink text-paper border-paper/20" : "bg-paper-elevated text-ink border-hairline"
            }`
      }
    >
      <header className={`flex h-14 shrink-0 items-center justify-between border-b px-4 ${isDark ? "border-paper/20" : "border-hairline"}`}>
        <div>
          <h1 className="font-serif text-[15px] font-semibold">SYNEX for Senthil Traders</h1>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span>DEMO MODE</span>
          </div>
        </div>
        {!embedded && (
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-11 w-11 items-center justify-center rounded-[4px] text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <X className="h-4 w-4 stroke-[2]" aria-hidden="true" />
          </button>
        )}
      </header>

      <div role="log" aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3">
        <WelcomeCard />
        {messages.length === 0 && <SuggestedChips onSelect={onSendMessage} />}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onClarifySelect={onSendMessage}
            onConfirmAction={onConfirmAction}
            onCancelAction={onCancelAction}
            onRetryAction={onRetryAction}
            onDuplicateAction={onDuplicateAction}
          />
        ))}
        {phase !== "idle" && <StateLine phase={phase} reducedMotion={reducedMotion} />}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ paddingBottom: safeAreaBottom }}>
        <Composer ref={composerRef} onSend={onSendMessage} isStreaming={isStreaming} onStop={onStopStreaming} />
      </div>

      <footer className={`border-t px-3 py-1.5 text-center font-mono text-[10px] ${isDark ? "border-paper/20 bg-ink text-paper/70" : "border-hairline bg-paper text-ink-muted"}`}>
        {uniqueSources.size > 0 && <span className="mr-1 font-semibold">Sources consulted: {uniqueSources.size} · </span>}
        Simulated demo (local client time)
      </footer>
    </div>
  );
}
