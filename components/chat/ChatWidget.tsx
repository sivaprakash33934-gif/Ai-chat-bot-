"use client";

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ChatContextType, ChatMessage, PipelinePhase } from "./types";
import { WidgetLauncher } from "./WidgetLauncher";
import { matchCannedResponse, simulateActionOutcome } from "@/lib/fixtures/chatResponses";
import { streamText, StreamController } from "./streamingEngine";

const ChatContext = createContext<ChatContextType | null>(null);
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatWidget");
  return ctx;
};

const DynamicChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), {
  ssr: false,
  loading: () => (
    <div role="status" className="fixed inset-0 z-50 flex items-center justify-center border border-hairline bg-paper-elevated sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[620px] sm:w-[400px] sm:rounded-[4px] print:hidden">
      <p className="font-mono text-[12px] text-ink-muted">Loading chat…</p>
    </div>
  ),
});

export function ChatWidget({ embedded = false, theme = "light" }: { embedded?: boolean; theme?: "light" | "dark" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(embedded);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<PipelinePhase>("idle");
  const [isStreaming, setIsStreaming] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const streamCtrlRef = useRef<StreamController | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("synex-chat-session");
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try { sessionStorage.setItem("synex-chat-session", JSON.stringify(messages)); } catch {}
    }
  }, [messages]);

  const isSuppressed = !embedded && (pathname === "/login" || pathname.startsWith("/login/") || pathname === "/pilot" || pathname.startsWith("/pilot/"));
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => {
    if (embedded && typeof window !== "undefined") {
      window.parent.postMessage("synex:close", "*");
    } else {
      setIsOpen(false);
      setTimeout(() => launcherRef.current?.focus(), 50);
    }
  }, [embedded]);

  const cancelStreaming = useCallback(() => {
    streamCtrlRef.current?.cancel();
    timersRef.current.forEach(clearTimeout);
    setIsStreaming(false);
    setPhase("idle");
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((p) => [...p, { id: `sys-${Date.now()}`, role: "system", content: "[DEMO] Response interrupted. Awaiting your next message.", timestamp: ts }]);
  }, []);

  const runActionPipeline = useCallback((actionId: string, currentRetries = 0) => {
    const update = (status: any, extra?: any) => {
      setMessages((prev) => prev.map((m) => m.action?.id === actionId ? { ...m, action: { ...m.action, status, ...extra } } : m));
    };
    update("requested", { retryCount: currentRetries });
    const t1 = window.setTimeout(() => update("authorized"), 500);
    const t2 = window.setTimeout(() => update("executing"), 800);
    const t3 = window.setTimeout(() => {
      const outcome = simulateActionOutcome();
      update(outcome.status, { errorMessage: outcome.errorMessage });
    }, 1600);
    timersRef.current.push(t1, t2, t3);
  }, []);

  const handleConfirmAction = useCallback((id: string) => {
    setPhase("idle");
    runActionPipeline(id, 0);
  }, [runActionPipeline]);

  const handleCancelAction = useCallback((id: string) => {
    setPhase("idle");
    setMessages((prev) => prev.map((m) => m.action?.id === id ? { ...m, action: { ...m.action, status: "cancelled" } } : m));
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((p) => [...p, { id: `sys-${Date.now()}`, role: "system", content: "[DEMO] Action cancelled by user.", timestamp: ts }]);
  }, []);

  const handleDuplicateAction = useCallback(() => {
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((p) => [...p, { id: `sys-${Date.now()}`, role: "system", content: "[DEMO] Duplicate request ignored.", timestamp: ts }]);
  }, []);

  const handleRetryAction = useCallback((id: string) => {
    const target = messages.find((m) => m.action?.id === id);
    const retries = (target?.action?.retryCount || 0) + 1;
    if (retries > 3) {
      const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((p) => [...p, { id: `sys-${Date.now()}`, role: "system", content: "Multiple failures detected. This conversation has been flagged for manual review (demo).", timestamp: ts }]);
      return;
    }
    runActionPipeline(id, retries);
  }, [messages, runActionPipeline]);

  const sendMessage = useCallback((text: string) => {
    const ts = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((p) => [...p, { id: `user-${Date.now()}`, role: "user", content: text, timestamp: ts }]);
    const canned = matchCannedResponse(text);

    if (canned.isPermissionDenied) {
      setPhase("idle");
      setMessages((p) => [...p, { id: `sys-${Date.now() + 1}`, role: "system", content: canned.text, timestamp: ts }]);
      return;
    }
    if (canned.action || canned.handoff) {
      if (canned.action?.status === "pending_confirmation") {
        setPhase("awaiting_approval");
      } else {
        setPhase("idle");
      }
      setMessages((p) => [...p, {
        id: `asst-${Date.now() + 1}`,
        role: "assistant",
        content: canned.text,
        timestamp: ts,
        action: canned.action,
        handoff: canned.handoff,
        rulesApplied: canned.rulesApplied,
        customerContext: canned.customerContext,
      }]);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase(canned.clarify ? "needs_clarification" : "idle");
      setMessages((p) => [...p, {
        id: `asst-${Date.now() + 1}`,
        role: "assistant",
        content: canned.text,
        timestamp: ts,
        citations: canned.citations,
        clarify: canned.clarify,
        rulesApplied: canned.rulesApplied,
        customerContext: canned.customerContext,
      }]);
      return;
    }

    setPhase("understanding");
    const t1 = window.setTimeout(() => setPhase("retrieving"), 400);
    const t2 = window.setTimeout(() => setPhase("reasoning"), 1000);
    const t3 = window.setTimeout(() => {
      setPhase("drafting");
      setIsStreaming(true);
      const asstId = `asst-${Date.now() + 1}`;
      setMessages((p) => [...p, { id: asstId, role: "assistant", content: "", timestamp: ts }]);
      streamCtrlRef.current = streamText(
        canned.text,
        (chunk) => setMessages((p) => p.map((m) => (m.id === asstId ? { ...m, content: chunk } : m))),
        (final) => {
          setIsStreaming(false);
          setPhase(canned.clarify ? "needs_clarification" : "idle");
          setMessages((p) => p.map((m) => (m.id === asstId ? {
            ...m,
            content: final,
            citations: canned.citations,
            clarify: canned.clarify,
            rulesApplied: canned.rulesApplied,
            customerContext: canned.customerContext,
          } : m)));
        }
      );
    }, 1400);
    timersRef.current = [t1, t2, t3];
  }, []);

  if (isSuppressed) return null;
  const uniqueSources = new Set<string>();
  messages.forEach((m) => m.citations?.forEach((c) => uniqueSources.add(c.source)));

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, messages, sendMessage, currentPhase: phase, isStreaming, cancelStreaming, uniqueSourcesCount: uniqueSources.size }}>
      {!embedded && <WidgetLauncher ref={launcherRef} isOpen={isOpen} onOpen={openChat} />}
      {isOpen && (
        <DynamicChatPanel
          isOpen={isOpen} onClose={closeChat} messages={messages} onSendMessage={sendMessage} phase={phase} isStreaming={isStreaming} onStopStreaming={cancelStreaming}
          onConfirmAction={handleConfirmAction} onCancelAction={handleCancelAction} onRetryAction={handleRetryAction} onDuplicateAction={handleDuplicateAction} theme={theme}
          embedded={embedded}
        />
      )}
    </ChatContext.Provider>
  );
}

export default ChatWidget;
