"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  MessageSquare,
  X,
  Minus,
  Sparkles,
  ArrowUp,
  User,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */
interface ChatMessage {
  id: string;
  role: "ai" | "user" | "escalation";
  text: string;
  /** Timestamp for display */
  time?: string;
}

/* Quick suggestion chips */
const QUICK_CHIPS = [
  "What do you sell?",
  "Business hours?",
  "Contact support",
];

/* ═══════════════════════════════════════════════════════════════
   TYPING INDICATOR — 3 bouncing dots
   ═══════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 pl-1">
      <div
        className="flex items-center gap-1 px-4 py-3"
        style={{
          background: "#F7F8FA",
          borderRadius: "4px 12px 12px 12px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-signal-ai animate-typing-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MESSAGE BUBBLE
   ═══════════════════════════════════════════════════════════════ */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.role === "escalation") {
    return (
      <div
        className="mx-2 p-3 rounded-btn flex items-center gap-3"
        style={{
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.15)",
        }}
      >
        <User size={14} className="text-signal-commerce flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-ink-secondary leading-relaxed">
            {msg.text}
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 px-3 py-1 rounded-btn font-mono uppercase text-signal-commerce transition-colors hover:bg-signal-commerce/10"
          style={{
            fontSize: 10,
            letterSpacing: "0.10em",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          Talk to Human
        </button>
      </div>
    );
  }

  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="font-body text-ink-primary"
        style={{
          maxWidth: isUser ? "75%" : "80%",
          padding: "12px 16px",
          fontSize: 14,
          lineHeight: 1.5,
          background: isUser ? "rgba(79,70,229,0.08)" : "#F7F8FA",
          border: isUser
            ? "1px solid rgba(79,70,229,0.2)"
            : "1px solid rgba(15,23,42,0.06)",
          borderRadius: isUser
            ? "12px 4px 12px 12px"
            : "4px 12px 12px 12px",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAT WINDOW — exposed via ref handle for showcase embedding
   ═══════════════════════════════════════════════════════════════ */
export interface ChatWindowHandle {
  resetConversation: () => void;
}

interface ChatWindowProps {
  /** Show in embedded/showcase mode (no close/minimize, always open) */
  embedded?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  /** Optional pre-seeded messages */
  initialMessages?: ChatMessage[];
}

export const ChatWindow = forwardRef<ChatWindowHandle, ChatWindowProps>(
  function ChatWindow({ embedded, onClose, onMinimize, initialMessages }, ref) {
    const [messages, setMessages] = useState<ChatMessage[]>(
      initialMessages ?? [
        {
          id: "welcome",
          role: "ai",
          text: "Hello! How can I help you with our services today?",
        },
      ]
    );
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [focused, setFocused] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      resetConversation: () => {
        setMessages(
          initialMessages ?? [
            {
              id: "welcome",
              role: "ai",
              text: "Hello! How can I help you with our services today?",
            },
          ]
        );
        setInput("");
        setTyping(false);
      },
    }));

    /* Auto-scroll to bottom */
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    /* AI reply simulation */
    const simulateReply = useCallback((userText: string) => {
      setTyping(true);
      const lc = userText.toLowerCase();
      let reply =
        "Thank you for your question! Our AI is processing your request using your business knowledge base.";
      if (lc.includes("hour") || lc.includes("time") || lc.includes("open")) {
        reply =
          "We are open Monday to Saturday, 9:00 AM to 6:00 PM IST. Our AI chatbot is available 24/7 for instant responses.";
      } else if (lc.includes("sell") || lc.includes("product") || lc.includes("service")) {
        reply =
          "We offer a comprehensive AI platform for MSMEs including chatbot, analytics, invoicing, CRM, and business intelligence — all for ₹198/year.";
      } else if (lc.includes("contact") || lc.includes("support") || lc.includes("human")) {
        /* Escalation */
        setTimeout(() => {
          setTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `esc-${Date.now()}`,
              role: "escalation",
              text: "I'll connect you with a human representative for personalized assistance.",
            },
          ]);
        }, 1500);
        return;
      } else if (lc.includes("price") || lc.includes("cost") || lc.includes("₹")) {
        reply =
          "₹16.5/month with auto-pay, or ₹198/year — everything included.";
      }

      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: `ai-${Date.now()}`, role: "ai", text: reply },
        ]);
      }, 1500);
    }, []);

    const handleSend = useCallback(() => {
      const trimmed = input.trim();
      if (!trimmed || typing) return;
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: "user", text: trimmed },
      ]);
      setInput("");
      simulateReply(trimmed);
    }, [input, typing, simulateReply]);

    const handleChip = useCallback(
      (text: string) => {
        if (typing) return;
        setMessages((prev) => [
          ...prev,
          { id: `user-${Date.now()}`, role: "user", text },
        ]);
        simulateReply(text);
      },
      [typing, simulateReply]
    );

    return (
      <div
        className={`flex flex-col overflow-hidden ${
          embedded ? "" : "animate-chat-window-in"
        }`}
        style={{
          width: embedded ? "100%" : undefined,
          height: embedded ? "100%" : undefined,
          ...(!embedded && {
            width: 380,
            height: 520,
            borderRadius: 16,
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
            background: "#FFFFFF",
          }),
        }}
      >
        {/* ── HEADER ── */}
        <div
          className="flex items-center gap-3 px-4 flex-shrink-0"
          style={{
            height: 56,
            background: "#F7F8FA",
            borderBottom: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          {/* AI Avatar */}
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 32,
              height: 32,
              background: "rgba(79,70,229,0.15)",
            }}
          >
            <Sparkles size={16} className="text-signal-ai" />
          </div>

          {/* Name + Status */}
          <div className="flex-1 min-w-0">
            <div className="font-display text-sm font-semibold text-ink-primary leading-tight">
              AI Assistant
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-growth flex-shrink-0" />
              <span
                className="font-mono text-ink-tertiary truncate"
                style={{ fontSize: 10 }}
              >
                Online • Powered by Neural Core
              </span>
            </div>
          </div>

          {/* Controls (only in floating mode) */}
          {!embedded && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onMinimize}
                className="p-1.5 rounded-micro text-ink-tertiary hover:text-ink-primary transition-colors"
                aria-label="Minimize"
              >
                <Minus size={12} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-micro text-ink-tertiary hover:text-ink-primary transition-colors"
                aria-label="Close chat"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        {/* ── MESSAGES AREA ── */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-3 p-4"
          style={{
            background: "#FFFFFF",
            backgroundImage:
              "radial-gradient(rgba(15,23,42,0.02) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* ── QUICK CHIPS ── */}
        {messages.length <= 2 && !typing && (
          <div
            className="flex items-center gap-2 px-4 py-2 overflow-x-auto flex-shrink-0"
            style={{
              background: "#FFFFFF",
              borderTop: "1px solid rgba(15,23,42,0.04)",
            }}
          >
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChip(chip)}
                className="flex-shrink-0 font-mono rounded-pill px-3 py-1.5 text-ink-secondary hover:text-ink-primary transition-all duration-200 whitespace-nowrap"
                style={{
                  fontSize: 11,
                  border: "1px solid rgba(15,23,42,0.08)",
                  background: "#F7F8FA",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4F46E5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(15,23,42,0.08)";
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* ── INPUT AREA ── */}
        <div
          className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
          style={{
            background: "#FFFFFF",
            borderTop: focused
              ? "1px solid rgba(79,70,229,0.3)"
              : "1px solid rgba(15,23,42,0.06)",
            transition: "border-color 200ms ease-out",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask about this business..."
            className="flex-1 bg-transparent border-none outline-none font-body text-ink-primary placeholder:text-ink-muted"
            style={{ fontSize: 14 }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || typing}
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-40"
            style={{
              width: 36,
              height: 36,
              background: input.trim() ? "#4F46E5" : "rgba(79,70,229,0.3)",
            }}
            aria-label="Send message"
          >
            <ArrowUp size={16} strokeWidth={2.4} className="text-white" />
          </button>
        </div>
      </div>
    );
  }
);

/* ═══════════════════════════════════════════════════════════════
   FLOATING CHATBOT WIDGET — FAB + window
   ═══════════════════════════════════════════════════════════════ */
interface ChatbotWidgetProps {
  /** Whether the widget should be visible */
  visible?: boolean;
}

export function ChatbotWidget({ visible = true }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  }, []);

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose();
    } else {
      setOpen(true);
    }
  }, [open, handleClose]);

  /* Escape key closes */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!visible) return null;

  return (
    <div className="fixed z-[100]" style={{ bottom: 24, right: 24 }}>
      {/* ── Chat Window ── */}
      {(open || closing) && (
        <div
          className="absolute"
          style={{
            bottom: 72,
            right: 0,
            animation: closing
              ? "chat-window-out 0.2s cubic-bezier(0.4,0,1,1) both"
              : undefined,
          }}
        >
          {/* Responsive size */}
          <div
            className="hidden sm:block"
            style={{ width: 380, height: 520 }}
          >
            <ChatWindow onClose={handleClose} onMinimize={handleClose} />
          </div>
          <div
            className="block sm:hidden"
            style={{
              width: "calc(100vw - 48px)",
              height: "70vh",
              maxHeight: 600,
            }}
          >
            <ChatWindow onClose={handleClose} onMinimize={handleClose} />
          </div>
        </div>
      )}

      {/* ── FAB Trigger ── */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-ai"
        style={{
          width: 56,
          height: 56,
          background: "#4F46E5",
          boxShadow: "0 4px 20px rgba(79,70,229,0.3)",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {/* Pulse ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full border-2 border-signal-ai/30 animate-fab-ping pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Icon morphs between MessageSquare and X */}
        <div
          style={{
            transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
            transform: open ? "rotate(90deg) scale(0.9)" : "rotate(0) scale(1)",
          }}
        >
          {open ? (
            <X size={24} className="text-white" />
          ) : (
            <MessageSquare size={24} className="text-white" />
          )}
        </div>
      </button>
    </div>
  );
}
