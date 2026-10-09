"use client";

import React, { useState, useMemo } from "react";
import { MessageSquare, Search, Filter, ShieldAlert, CheckCircle2, UserCheck } from "lucide-react";
import { CONVERSATIONS_DIRECTORY, ConversationRecord } from "@/lib/fixtures";
import { ConversationDrawer } from "./ConversationDrawer";

type FilterStatus = "all" | "escalated" | "autonomous" | "resolved";
type FilterChannel = "all" | "Website Chat" | "API Webhook" | "Web Form";

export function ConversationsBrowser() {
  const [conversations, setConversations] = useState<ConversationRecord[]>(CONVERSATIONS_DIRECTORY);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [channelFilter, setChannelFilter] = useState<FilterChannel>("all");
  const [selectedConv, setSelectedConv] = useState<ConversationRecord | null>(null);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q);

      const matchesStatus =
        filter === "all"
          ? true
          : filter === "escalated"
          ? c.status === "handoff_pending" || c.status === "handoff_claimed"
          : filter === "autonomous"
          ? c.status === "autonomous"
          : c.status === "resolved";

      const matchesChannel =
        channelFilter === "all" ? true : c.channel === channelFilter;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [conversations, search, filter, channelFilter]);

  const handleTakeOver = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === "handoff_pending" ? "handoff_claimed" : "resolved";
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
    if (selectedConv && selectedConv.id === id) {
      setSelectedConv((prev) => (prev ? { ...prev, status: prev.status === "handoff_pending" ? "handoff_claimed" : "resolved" } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-hairline pb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Conversations</span>
          <span className="text-ink-muted">/</span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink">Customer Sessions</span>
        </div>
        <h1 className="mt-1 font-serif text-[32px] font-semibold tracking-tight text-ink">Conversations</h1>
        <p className="mt-1 max-w-2xl font-sans text-[14px] text-ink-muted">
          Browse customer chats, verify answer citations, and take over escalated requests.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 border-b border-hairline pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Conversation status filters">
            {(
              [
                { key: "all", label: "All Chats" },
                { key: "escalated", label: "Waiting for You" },
                { key: "autonomous", label: "Handled by AI" },
                { key: "resolved", label: "Completed" },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={filter === item.key}
                onClick={() => setFilter(item.key)}
                className={`rounded border px-3 py-1 font-mono text-[12px] transition-colors ${
                  filter === item.key ? "border-ink bg-paper-elevated font-semibold text-ink" : "border-hairline text-ink-muted hover:border-ink/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-ink-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border border-hairline bg-paper py-1.5 pl-8 pr-3 font-sans text-[13px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        {/* Channel Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
          <span className="text-ink-muted uppercase">Channel:</span>
          {(
            [
              { key: "all", label: "All Channels" },
              { key: "Website Chat", label: "Website Chat" },
              { key: "API Webhook", label: "API Webhook" },
              { key: "Web Form", label: "Web Form" },
            ] as const
          ).map((ch) => (
            <button
              key={ch.key}
              type="button"
              onClick={() => setChannelFilter(ch.key)}
              className={`rounded px-2 py-0.5 border transition-colors ${
                channelFilter === ch.key
                  ? "border-ink bg-paper text-ink font-semibold"
                  : "border-hairline bg-transparent text-ink-faint hover:text-ink hover:border-ink/30"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations Table */}
      <div className="overflow-x-auto border border-hairline bg-paper-elevated">
        <table className="w-full text-left border-collapse" aria-label="Conversations ledger">
          <thead>
            <tr className="border-b border-hairline bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              <th scope="col" className="px-5 py-3.5 font-medium">Customer &amp; Company</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Channel</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Summary</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Messages</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
              <th scope="col" className="px-5 py-3.5 font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline font-sans text-[13px]">
            {filtered.map((conv) => (
              <tr
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className="cursor-pointer transition-colors hover:bg-paper/60"
              >
                <td className="px-5 py-3.5">
                  <div className="font-semibold text-ink">{conv.customerName}</div>
                  <div className="font-mono text-[11px] text-ink-muted">{conv.company}</div>
                </td>
                <td className="px-5 py-3.5 font-mono text-[12px] text-ink">{conv.channel}</td>
                <td className="px-5 py-3.5 text-ink-muted max-w-sm truncate">{conv.summary}</td>
                <td className="px-5 py-3.5 font-mono text-[12px] text-ink">{conv.messageCount} turns</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] uppercase font-semibold border ${
                      conv.status === "handoff_pending"
                        ? "bg-amber-tint text-amber border-amber/30"
                        : conv.status === "handoff_claimed"
                        ? "bg-amber-tint text-amber border-amber/30"
                        : "bg-success-surface text-success border-success/30"
                    }`}
                  >
                    {conv.status === "handoff_pending"
                      ? "Waiting for You"
                      : conv.status === "handoff_claimed"
                      ? "In Review"
                      : "Handled by AI"}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-[11px] text-ink-muted whitespace-nowrap">{conv.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transcript Drawer */}
      <ConversationDrawer
        conversation={selectedConv}
        onClose={() => setSelectedConv(null)}
        onTakeOver={handleTakeOver}
      />
    </div>
  );
}
