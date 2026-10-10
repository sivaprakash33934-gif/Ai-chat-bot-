"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Trash2,
  Plus,
  Scale,
  ArrowRight,
} from "lucide-react";
import { DecisionReceipt, DecisionOutcome } from "@/components/decision/DecisionReceipt";

export interface TestCaseRun {
  id: string;
  name: string;
  question: string;
  evaluatedRule: string;
  ruleFloor: string;
  sourceDoc: string;
  sourceAuthority: "PRIMARY" | "SECONDARY";
  outcome: DecisionOutcome;
  requiredApproval: string;
  actionStatus: string;
  latencyMs: number;
  timestamp: string;
}

const DEFAULT_TEST_SUITE: TestCaseRun[] = [
  {
    id: "TC-01",
    name: "Tier 2 Volume Discount Inquiry",
    question: "What is your best price for 400 units of 6mm brass rod for a repeat buyer?",
    evaluatedRule: "Rule RL-01 (Autonomous Discount <= 8.0%)",
    ruleFloor: "Margin >= 28.0%",
    sourceDoc: "Master Price List Q4 FY26 (Cotton & Yarns)",
    sourceAuthority: "PRIMARY",
    outcome: "ALLOWED",
    requiredApproval: "Autonomous execution permitted",
    actionStatus: "Quotation Generated (QT-4471)",
    latencyMs: 420,
    timestamp: "Simulated Run #1",
  },
  {
    id: "TC-02",
    name: "Excess Discount Request (12%)",
    question: "Can you provide a 12% discount on 2,500 units of 6mm brass fittings?",
    evaluatedRule: "Rule RL-01 (Autonomous Discount <= 8.0%)",
    ruleFloor: "Breached: 12.0% > 8.0% cap",
    sourceDoc: "Master Price List Q4 FY26 (Cotton & Yarns)",
    sourceAuthority: "PRIMARY",
    outcome: "HELD",
    requiredApproval: "Level 2 Commercial Authority (Ops Lead)",
    actionStatus: "Intercepted by Permission Gate",
    latencyMs: 310,
    timestamp: "Simulated Run #1",
  },
  {
    id: "TC-03",
    name: "Unverified Certification Inquiry",
    question: "Do you provide OEKO-TEX Standard 100 Class 1 certified organic dyes?",
    evaluatedRule: "Zero Hallucination Policy (Confidence >= 0.85)",
    ruleFloor: "Missing corpus evidence",
    sourceDoc: "None matched (Knowledge Gap KG-01)",
    sourceAuthority: "SECONDARY",
    outcome: "NEEDS HUMAN",
    requiredApproval: "Quality Assurance Specialist Handoff",
    actionStatus: "Escalated to Operations Desk",
    latencyMs: 180,
    timestamp: "Simulated Run #1",
  },
];

export function ReplayCompareLab() {
  const [testCases, setTestCases] = useState<TestCaseRun[]>(DEFAULT_TEST_SUITE);
  const [selectedCaseId, setSelectedCaseId] = useState<string>("TC-01");
  const [compareCaseId, setCompareCaseId] = useState<string>("TC-02");
  const [showComparison, setShowComparison] = useState(false);
  const [newQuestionInput, setNewQuestionInput] = useState("");
  const [newNameInput, setNewNameInput] = useState("");

  const activeCase = testCases.find((c) => c.id === selectedCaseId) || testCases[0];
  const compareCase = testCases.find((c) => c.id === compareCaseId) || testCases[1] || testCases[0];

  const handleAddCustomTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionInput.trim()) return;

    const newTest: TestCaseRun = {
      id: `TC-${String(testCases.length + 1).padStart(2, "0")}`,
      name: newNameInput.trim() || `Custom Test #${testCases.length + 1}`,
      question: newQuestionInput.trim(),
      evaluatedRule: "Rule RL-01 (Simulated Evaluation)",
      ruleFloor: "Margin >= 28.0%",
      sourceDoc: "Tier Rate Cards 2026 (PRIMARY)",
      sourceAuthority: "PRIMARY",
      outcome: newQuestionInput.toLowerCase().includes("discount") ? "HELD" : "ALLOWED",
      requiredApproval: newQuestionInput.toLowerCase().includes("discount")
        ? "Level 2 Commercial Authority"
        : "Autonomous execution permitted",
      actionStatus: "Test Execution Simulated",
      latencyMs: 380,
      timestamp: "Client Session Run",
    };

    setTestCases((prev) => [newTest, ...prev]);
    setSelectedCaseId(newTest.id);
    setNewQuestionInput("");
    setNewNameInput("");
  };

  const handleDeleteTest = (id: string) => {
    setTestCases((prev) => prev.filter((t) => t.id !== id));
    if (selectedCaseId === id && testCases.length > 1) {
      setSelectedCaseId(testCases.find((t) => t.id !== id)?.id || "");
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>Simulation Lab</span>
            <span>·</span>
            <span>Regression Workbench</span>
          </div>
          <h2 className="font-serif text-[24px] font-semibold text-ink mt-0.5">
            AI Test Lab &amp; Decision Replay
          </h2>
          <p className="font-sans text-[13px] text-ink-muted">
            Run sample customer inquiries, inspect decision evidence receipts, and compare execution variations side by side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="border border-hairline bg-paper px-2 py-1 font-mono text-[10px] text-ink-muted">
            [CLIENT STORAGE ONLY]
          </span>
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 font-mono text-[12px] transition-colors ${
              showComparison
                ? "border-ink bg-ink text-paper font-semibold"
                : "border-hairline bg-paper-elevated text-ink hover:border-ink/40"
            }`}
          >
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{showComparison ? "Exit Comparison" : "Compare Two Runs"}</span>
          </button>
        </div>
      </div>

      {/* Test Runner Suite Bar */}
      <div className="border border-hairline bg-paper p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
            Saved Test Cases ({testCases.length})
          </span>
          <span className="font-mono text-[10px] text-ink-faint">
            Stored in local session memory
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {testCases.map((tc) => (
            <div
              key={tc.id}
              className={`flex items-center gap-1 rounded border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                selectedCaseId === tc.id
                  ? "border-ink bg-paper-elevated font-semibold text-ink"
                  : "border-hairline bg-paper text-ink-muted hover:text-ink hover:border-ink/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedCaseId(tc.id)}
                className="text-left truncate max-w-[200px]"
              >
                <span>{tc.id}: </span>
                <span>{tc.name}</span>
              </button>
              {testCases.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteTest(tc.id)}
                  aria-label={`Delete test case ${tc.id}`}
                  className="ml-1 text-ink-faint hover:text-error"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Test Case Form */}
        <form onSubmit={handleAddCustomTest} className="border-t border-hairline pt-3 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={newNameInput}
            onChange={(e) => setNewNameInput(e.target.value)}
            placeholder="Test Title (e.g. Bulk Quote)"
            className="w-48 rounded border border-hairline bg-paper-elevated px-2.5 py-1 font-mono text-[11px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
          <input
            type="text"
            value={newQuestionInput}
            onChange={(e) => setNewQuestionInput(e.target.value)}
            placeholder="Simulated buyer question..."
            className="flex-1 min-w-[240px] rounded border border-hairline bg-paper-elevated px-2.5 py-1 font-sans text-[12px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded border border-ink bg-paper-elevated px-3 py-1 font-mono text-[11px] font-semibold text-ink hover:bg-paper"
          >
            <Plus className="h-3 w-3" />
            <span>Save Case</span>
          </button>
        </form>
      </div>

      {/* Execution Results View: Single or Side-by-Side Comparison */}
      {!showComparison ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono text-[11px]">
            <span className="text-ink font-semibold uppercase tracking-wider">
              Primary Run Replay: {activeCase.id} — {activeCase.name}
            </span>
            <span className="text-ink-muted">Execution Latency: {activeCase.latencyMs}ms</span>
          </div>

          <DecisionReceipt
            id={activeCase.id}
            question={activeCase.question}
            outcome={activeCase.outcome}
            ruleCitation={activeCase.evaluatedRule}
            ruleFloor={activeCase.ruleFloor}
            requiredApproval={activeCase.requiredApproval}
            proposedAction={activeCase.actionStatus}
            evidence={[
              {
                documentTitle: activeCase.sourceDoc,
                documentId: "DOC-2026",
                authority: activeCase.sourceAuthority,
                lastVerified: "Today, 09:00 IST",
                excerpt:
                  activeCase.outcome === "NEEDS HUMAN"
                    ? "Requested item or certification not found in current approved corpus."
                    : "Base volume tier rate ₹245/unit applicable for quantities between 250 and 500.",
              },
            ]}
            unresolvedUncertainty={
              activeCase.outcome === "NEEDS HUMAN"
                ? "No matching technical specification found in approved knowledge base."
                : undefined
            }
            defaultExpanded={true}
          />
        </div>
      ) : (
        /* Side by Side Comparison Workbench */
        <div className="space-y-4">
          <div className="border border-hairline bg-paper p-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
            <span className="font-semibold text-ink uppercase tracking-wider">
              Differential Comparison Workbench
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="compareSelect" className="text-ink-muted">
                Compare Against:
              </label>
              <select
                id="compareSelect"
                value={compareCaseId}
                onChange={(e) => setCompareCaseId(e.target.value)}
                className="border border-hairline bg-paper-elevated px-2 py-0.5 font-mono text-[11px] text-ink focus:border-ink focus:outline-none"
              >
                {testCases.map((tc) => (
                  <option key={tc.id} value={tc.id}>
                    {tc.id}: {tc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Run A */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-hairline pb-1.5 font-mono text-[11px]">
                <span className="font-semibold text-ink">Run A: {activeCase.id}</span>
                <span className="text-ink-muted">{activeCase.name}</span>
              </div>
              <DecisionReceipt
                id={`${activeCase.id}-A`}
                question={activeCase.question}
                outcome={activeCase.outcome}
                ruleCitation={activeCase.evaluatedRule}
                ruleFloor={activeCase.ruleFloor}
                requiredApproval={activeCase.requiredApproval}
                proposedAction={activeCase.actionStatus}
                evidence={[
                  {
                    documentTitle: activeCase.sourceDoc,
                    documentId: "DOC-2026",
                    authority: activeCase.sourceAuthority,
                    lastVerified: "Today, 09:00 IST",
                    excerpt: "Base pricing and constraint parameters checked against active corpus.",
                  },
                ]}
                defaultExpanded={true}
              />
            </div>

            {/* Run B */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-hairline pb-1.5 font-mono text-[11px]">
                <span className="font-semibold text-ink">Run B: {compareCase.id}</span>
                <span className="text-ink-muted">{compareCase.name}</span>
              </div>
              <DecisionReceipt
                id={`${compareCase.id}-B`}
                question={compareCase.question}
                outcome={compareCase.outcome}
                ruleCitation={compareCase.evaluatedRule}
                ruleFloor={compareCase.ruleFloor}
                requiredApproval={compareCase.requiredApproval}
                proposedAction={compareCase.actionStatus}
                evidence={[
                  {
                    documentTitle: compareCase.sourceDoc,
                    documentId: "DOC-2026",
                    authority: compareCase.sourceAuthority,
                    lastVerified: "Today, 09:00 IST",
                    excerpt: "Evaluation comparison reflecting differing inquiry parameters.",
                  },
                ]}
                defaultExpanded={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
