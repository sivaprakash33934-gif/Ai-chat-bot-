"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import {
  Role,
  Lead,
  ApprovalGate,
  Handoff,
  Customer,
  KnowledgeSource,
  KnowledgeGap,
  KnowledgeConflict,
  Rule,
  OutcomeLedgerRow,
  AuditEntry,
  INITIAL_LEADS,
  INITIAL_APPROVALS,
  INITIAL_HANDOFFS,
  INITIAL_CUSTOMERS,
  INITIAL_KNOWLEDGE_SOURCES,
  INITIAL_KNOWLEDGE_GAPS,
  INITIAL_KNOWLEDGE_CONFLICTS,
  INITIAL_RULES,
  INITIAL_OUTCOME_LEDGER,
  INITIAL_AUDIT_LOG,
} from "./fixtures";

export interface ToastMessage {
  id: string;
  message: string;
  type: "info" | "success" | "error";
  undoable?: boolean;
}

interface StoreSnapshot {
  leads: Lead[];
  approvals: ApprovalGate[];
  handoffs: Handoff[];
  rules: Rule[];
  knowledgeSources: KnowledgeSource[];
  knowledgeConflicts: KnowledgeConflict[];
}

interface UndoHistoryEntry {
  id: string;
  actionName: string;
  snapshot: StoreSnapshot;
}

interface DashboardContextType {
  // Global Session & RBAC
  role: Role;
  setRole: (role: Role) => void;
  revealPII: boolean;
  setRevealPII: (reveal: boolean) => void;
  formatGSTIN: (gstin: string) => string;

  // Search & Navigation
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTraceLeadId: string | null;
  openTrace: (leadId: string) => void;
  closeTrace: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  dateRange: "7" | "30" | "90";
  setDateRange: (range: "7" | "30" | "90") => void;

  // Data Collections
  leads: Lead[];
  approvals: ApprovalGate[];
  handoffs: Handoff[];
  customers: Customer[];
  knowledgeSources: KnowledgeSource[];
  knowledgeGaps: KnowledgeGap[];
  knowledgeConflicts: KnowledgeConflict[];
  rules: Rule[];
  outcomeLedger: OutcomeLedgerRow[];
  auditLog: AuditEntry[];

  // Computed Badges
  pendingApprovalsCount: number;
  pendingHandoffsCount: number;
  needsAttentionCount: number;
  knowledgeIssuesCount: number;

  // Actions
  approveGate: (id: string) => boolean;
  holdGate: (id: string) => boolean;
  takeOverHandoff: (id: string) => boolean;
  returnHandoffToAI: (id: string, note?: string) => boolean;
  updateRule: (id: string, updates: Partial<Rule>) => { success: boolean; error?: string };
  resolveConflict: (id: string, winner: "sourceA" | "sourceB") => boolean;
  answerGap: (id: string, answer: string) => boolean;
  addAuditEntry: (action: string, target: string, details: string) => void;

  // Toasts & Undo
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  undoLastAction: () => void;
  canUndo: boolean;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardStoreProvider({ children }: { children: ReactNode }) {
  // Session & RBAC State
  const [role, setRoleState] = useState<Role>("ops_lead");
  const [revealPII, setRevealPIIState] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTraceLeadId, setActiveTraceLeadId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<"7" | "30" | "90">("30");

  // Domain Collections
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [approvals, setApprovals] = useState<ApprovalGate[]>(INITIAL_APPROVALS);
  const [handoffs, setHandoffs] = useState<Handoff[]>(INITIAL_HANDOFFS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(INITIAL_KNOWLEDGE_SOURCES);
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGap[]>(INITIAL_KNOWLEDGE_GAPS);
  const [knowledgeConflicts, setKnowledgeConflicts] = useState<KnowledgeConflict[]>(INITIAL_KNOWLEDGE_CONFLICTS);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [outcomeLedger] = useState<OutcomeLedgerRow[]>(INITIAL_OUTCOME_LEDGER);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(INITIAL_AUDIT_LOG);

  // Undo History Stack (Addendum B)
  const [undoStack, setUndoStack] = useState<UndoHistoryEntry[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helpers
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: "info" | "success" | "error" = "info", undoable: boolean = false) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setToasts((prev) => [...prev, { id, message, type, undoable }]);
      setTimeout(() => {
        dismissToast(id);
      }, 6000);
    },
    [dismissToast]
  );

  // Snapshot Creation Helper
  const takeSnapshot = useCallback((): StoreSnapshot => {
    return {
      leads: [...leads],
      approvals: [...approvals],
      handoffs: [...handoffs],
      rules: [...rules],
      knowledgeSources: [...knowledgeSources],
      knowledgeConflicts: [...knowledgeConflicts],
    };
  }, [leads, approvals, handoffs, rules, knowledgeSources, knowledgeConflicts]);

  const pushUndo = useCallback(
    (actionName: string) => {
      const snapshot = takeSnapshot();
      setUndoStack((prev) => [
        {
          id: `undo-${Date.now()}`,
          actionName,
          snapshot,
        },
        ...prev.slice(0, 9), // limit stack depth to 10
      ]);
    },
    [takeSnapshot]
  );

  // Undo Execution (Addendum B)
  const undoLastAction = useCallback(() => {
    if (undoStack.length === 0) return;
    const [latest, ...restStack] = undoStack;
    const { snapshot, actionName } = latest;

    setLeads(snapshot.leads);
    setApprovals(snapshot.approvals);
    setHandoffs(snapshot.handoffs);
    setRules(snapshot.rules);
    setKnowledgeSources(snapshot.knowledgeSources);
    setKnowledgeConflicts(snapshot.knowledgeConflicts);
    setUndoStack(restStack);

    // Audit log entry for Undo
    const undoAudit: AuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: "Just now",
      actor: `${role.toUpperCase()} (Human)`,
      role,
      action: "ACTION_REVERTED",
      target: actionName,
      details: `Reverted action: ${actionName}. Previous state restored.`,
    };
    setAuditLog((prev) => [undoAudit, ...prev]);

    addToast(`Restored state before: ${actionName}`, "info", false);
  }, [undoStack, role, addToast]);

  // GSTIN Masking: 33AAAAA0000A1Z5 -> 33AA•••••••1Z5
  const formatGSTIN = useCallback(
    (gstin: string): string => {
      if (revealPII && role !== "viewer") {
        return gstin;
      }
      if (!gstin || gstin.length < 8) return gstin;
      return `${gstin.slice(0, 4)}•••••••${gstin.slice(-3)}`;
    },
    [revealPII, role]
  );

  // Role Switching with audit logging and PII reset
  const setRole = useCallback(
    (newRole: Role) => {
      setRoleState(newRole);
      if (newRole === "viewer") {
        setRevealPIIState(false);
      }
      const entry: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: "Control Center Session",
        role: newRole,
        action: "ROLE_CHANGED",
        target: "Session",
        details: `Active operator role changed to ${newRole.toUpperCase()}. Mutating permissions ${
          newRole === "viewer" ? "revoked" : "granted"
        }.`,
      };
      setAuditLog((prev) => [entry, ...prev]);
      addToast(`Session role switched to ${newRole.replace("_", " ").toUpperCase()}`, "info", false);
    },
    [addToast]
  );

  // PII Toggle with RBAC gate & audit logging
  const setRevealPII = useCallback(
    (reveal: boolean) => {
      if (role === "viewer") {
        addToast("Viewer role cannot reveal PII under DPDP sovereignty policy.", "error", false);
        return;
      }
      setRevealPIIState(reveal);
      const entry: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} Operator`,
        role,
        action: reveal ? "PII_REVEALED" : "PII_MASKED",
        target: "GSTIN Registry",
        details: `Commercial tax identifiers ${reveal ? "unmasked for inspection" : "re-masked per privacy policy"}.`,
      };
      setAuditLog((prev) => [entry, ...prev]);
      addToast(reveal ? "PII revealed (Audit entry created)" : "PII masked by default", "info", false);
    },
    [role, addToast]
  );

  // Trace Drawer Controls
  const openTrace = useCallback((leadId: string) => {
    setActiveTraceLeadId(leadId);
  }, []);

  const closeTrace = useCallback(() => {
    setActiveTraceLeadId(null);
  }, []);

  // Mutating Actions (Approvals)
  const approveGate = useCallback(
    (id: string): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot approve quotes.", "error", false);
        return false;
      }
      const target = approvals.find((a) => a.id === id);
      if (!target) return false;

      pushUndo(`Approve Gate ${target.recordId}`);

      setApprovals((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status: "approved",
                decidedAt: "Just now",
                decidedBy: `${role.toUpperCase()} (Manual Override)`,
              }
            : a
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} (Authorized)`,
        role,
        action: "GATE_APPROVED",
        target: `${target.recordId} (${target.company})`,
        details: `Approved requested discount ${target.discountPct}% on ${target.item}. Proforma committed.`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Approved quote ${target.recordId}`, "success", true);
      return true;
    },
    [role, approvals, pushUndo, addToast]
  );

  const holdGate = useCallback(
    (id: string): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot hold requests.", "error", false);
        return false;
      }
      const target = approvals.find((a) => a.id === id);
      if (!target) return false;

      pushUndo(`Hold Gate ${target.recordId}`);

      setApprovals((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status: "held",
                decidedAt: "Just now",
                decidedBy: `${role.toUpperCase()} (Held)`,
              }
            : a
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} (Authorized)`,
        role,
        action: "GATE_HELD",
        target: `${target.recordId} (${target.company})`,
        details: `Placed quote ${target.recordId} on hold. Buyer notified of commercial review.`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Held quote ${target.recordId} for review`, "info", true);
      return true;
    },
    [role, approvals, pushUndo, addToast]
  );

  // Mutating Actions (Handoffs)
  const takeOverHandoff = useCallback(
    (id: string): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot take over buyer conversations.", "error", false);
        return false;
      }
      const target = handoffs.find((h) => h.id === id);
      if (!target) return false;

      pushUndo(`Take Over Handoff ${target.id}`);

      setHandoffs((prev) =>
        prev.map((h) =>
          h.id === id
            ? {
                ...h,
                status: "claimed",
                claimedBy: `${role.toUpperCase()} Operator`,
              }
            : h
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} (Claimed)`,
        role,
        action: "HANDOFF_CLAIMED",
        target: `${target.id} (${target.company})`,
        details: `Human operator claimed conversation. AI autonomous responder paused.`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Claimed handoff for ${target.company}`, "success", true);
      return true;
    },
    [role, handoffs, pushUndo, addToast]
  );

  const returnHandoffToAI = useCallback(
    (id: string, note?: string): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot return conversations to AI.", "error", false);
        return false;
      }
      const target = handoffs.find((h) => h.id === id);
      if (!target) return false;

      pushUndo(`Return Handoff ${target.id} to AI`);

      setHandoffs((prev) =>
        prev.map((h) =>
          h.id === id
            ? {
                ...h,
                status: "resolved",
              }
            : h
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} (Operator)`,
        role,
        action: "HANDOFF_RETURNED_TO_AI",
        target: `${target.id} (${target.company})`,
        details: `Conversation returned to autonomous loop with clarification note: "${note || "Standard terms clarified"}".`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Returned conversation to SYNEX autonomous loop`, "info", true);
      return true;
    },
    [role, handoffs, pushUndo, addToast]
  );

  // Mutating Actions (Rules & Permissions)
  const updateRule = useCallback(
    (id: string, updates: Partial<Rule>): { success: boolean; error?: string } => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot modify operating rules.", "error", false);
        return { success: false, error: "Viewer role has read-only access." };
      }

      const existing = rules.find((r) => r.id === id);
      if (!existing) return { success: false, error: "Rule not found." };

      // Margin Floor Enforcement (§21.4): Max discount cannot breach margin floor
      if (
        existing.id === "RL-01" &&
        updates.thresholdValue !== undefined &&
        updates.thresholdValue > (100 - existing.marginFloor)
      ) {
        const errorMsg = `Margin floor violation: Discount cannot exceed ${
          100 - existing.marginFloor
        }% without breaching the 28.0% minimum gross margin floor.`;
        addToast(errorMsg, "error", false);
        return { success: false, error: errorMsg };
      }

      pushUndo(`Update Rule ${existing.name}`);

      setRules((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                ...updates,
                lastModified: "Just now",
                modifiedBy: `${role.toUpperCase()} Operator`,
              }
            : r
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} Operator`,
        role,
        action: "RULE_MODIFIED",
        target: existing.name,
        details: `Rule threshold updated to ${updates.thresholdValue ?? existing.thresholdValue}${existing.unit}. Status: ${
          updates.status ?? existing.status
        }.`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Policy rule "${existing.name}" updated`, "success", true);
      return { success: true };
    },
    [role, rules, pushUndo, addToast]
  );

  // Mutating Actions (Knowledge Conflict Resolution)
  const resolveConflict = useCallback(
    (id: string, winner: "sourceA" | "sourceB"): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot resolve knowledge conflicts.", "error", false);
        return false;
      }
      const target = knowledgeConflicts.find((c) => c.id === id);
      if (!target) return false;

      pushUndo(`Resolve Knowledge Conflict ${target.topic}`);

      setKnowledgeConflicts((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "resolved",
                chosenSource: winner,
              }
            : c
        )
      );

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} Operator`,
        role,
        action: "CONFLICT_RESOLVED",
        target: `${target.id} (${target.topic})`,
        details: `Reconciled conflict ${target.id} in favor of ${winner === "sourceA" ? "Option A" : "Option B"} (${target[winner].name}).`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Conflict resolved in favor of ${target[winner].name}`, "success", true);
      return true;
    },
    [role, knowledgeConflicts, pushUndo, addToast]
  );

  const answerGap = useCallback(
    (id: string, answer: string): boolean => {
      if (role === "viewer") {
        addToast("Permission denied: Viewer cannot add knowledge answers.", "error", false);
        return false;
      }
      const target = knowledgeGaps.find((g) => g.id === id);
      if (!target) return false;

      pushUndo(`Answer Knowledge Gap ${target.id}`);

      setKnowledgeGaps((prev) => prev.filter((g) => g.id !== id));

      const audit: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} Operator`,
        role,
        action: "KNOWLEDGE_GAP_ANSWERED",
        target: target.query,
        details: `Ingested verified answer into knowledge base: "${answer.slice(0, 60)}..."`,
      };
      setAuditLog((prev) => [audit, ...prev]);
      addToast(`[SIMULATED] Answer mapped to SYNEX knowledge index`, "success", true);
      return true;
    },
    [role, knowledgeGaps, pushUndo, addToast]
  );

  // Computed Badges
  const pendingApprovalsCount = useMemo(
    () => approvals.filter((a) => a.status === "pending").length,
    [approvals]
  );

  const pendingHandoffsCount = useMemo(
    () => handoffs.filter((h) => h.status === "pending").length,
    [handoffs]
  );

  const needsAttentionCount = useMemo(
    () => pendingApprovalsCount + pendingHandoffsCount,
    [pendingApprovalsCount, pendingHandoffsCount]
  );

  const knowledgeIssuesCount = useMemo(
    () =>
      knowledgeSources.filter((k) => k.status !== "fresh").length +
      knowledgeConflicts.filter((c) => c.status === "unresolved").length,
    [knowledgeSources, knowledgeConflicts]
  );

  const addAuditEntry = useCallback(
    (action: string, target: string, details: string) => {
      const entry: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        actor: `${role.toUpperCase()} (Operator)`,
        role,
        action,
        target,
        details,
      };
      setAuditLog((prev) => [entry, ...prev]);
    },
    [role]
  );

  const value: DashboardContextType = {
    role,
    setRole,
    revealPII,
    setRevealPII,
    formatGSTIN,
    searchQuery,
    setSearchQuery,
    activeTraceLeadId,
    openTrace,
    closeTrace,
    mobileMenuOpen,
    setMobileMenuOpen,
    dateRange,
    setDateRange,
    leads,
    approvals,
    handoffs,
    customers,
    knowledgeSources,
    knowledgeGaps,
    knowledgeConflicts,
    rules,
    outcomeLedger,
    auditLog,
    pendingApprovalsCount,
    pendingHandoffsCount,
    needsAttentionCount,
    knowledgeIssuesCount,
    approveGate,
    holdGate,
    takeOverHandoff,
    returnHandoffToAI,
    updateRule,
    resolveConflict,
    answerGap,
    addAuditEntry,
    toasts,
    dismissToast,
    undoLastAction,
    canUndo: undoStack.length > 0,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardStore() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardStore must be used within a DashboardStoreProvider");
  }
  return context;
}
