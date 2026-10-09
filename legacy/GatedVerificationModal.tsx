"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight, Loader2, KeyRound, Building2 } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GatedVerificationModal({ isOpen, onClose }: ModalProps) {
  const [udyamNumber, setUdyamNumber] = useState("UDYAM-TN-02-0049182");
  const [gstin, setGstin] = useState("33AAACB2214K1ZK");
  const [enterpriseName, setEnterpriseName] = useState("Sri Murugan Precision Engineering");
  const [status, setStatus] = useState<"idle" | "verifying" | "approved">("idle");
  const [verificationStep, setVerificationStep] = useState(0);

  if (!isOpen) return null;

  const handleStartVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("verifying");
    setVerificationStep(1);

    setTimeout(() => {
      setVerificationStep(2);
    }, 700);

    setTimeout(() => {
      setVerificationStep(3);
    }, 1400);

    setTimeout(() => {
      setStatus("approved");
    }, 2100);
  };

  const handleReset = () => {
    setStatus("idle");
    setVerificationStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-panel-lg bg-surface-1 border border-border strong:border-border-strong shadow-[0_16px_48px_rgba(16,24,40,0.10)] overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-surface-2 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-signal-commerce" />
            <span className="font-display font-semibold text-sm text-ink-primary tracking-wide">
              RESTRICTED MSME GATED CLEARANCE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-micro hover:bg-surface-3 text-ink-tertiary hover:text-ink-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === "idle" && (
            <form onSubmit={handleStartVerification} className="space-y-4">
              <div className="p-3.5 rounded-card bg-surface-2 border border-border text-xs text-ink-secondary leading-relaxed">
                <span className="font-semibold text-signal-commerce">IMPORTANT POLICY:</span> Neural Commerce Command is restricted exclusively to legitimate Indian micro, small, and medium enterprises. Public registration is locked to prevent speculative compute misuse.
              </div>

              <div>
                <label className="block text-micro font-mono uppercase text-ink-muted mb-1.5">
                  ENTERPRISE / TRADING LEGAL NAME
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={enterpriseName}
                    onChange={(e) => setEnterpriseName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-input bg-surface-2 border border-border focus:border-signal-ai focus:outline-none text-ink-primary text-sm font-mono selection:bg-signal-ai/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-micro font-mono uppercase text-ink-muted mb-1.5">
                  UDYAM REGISTRATION NUMBER (NIC CODE)
                </label>
                <input
                  type="text"
                  required
                  placeholder="UDYAM-XX-00-0000000"
                  value={udyamNumber}
                  onChange={(e) => setUdyamNumber(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-input bg-surface-2 border border-border focus:border-signal-ai focus:outline-none text-ink-primary text-sm font-mono selection:bg-signal-ai/30"
                />
              </div>

              <div>
                <label className="block text-micro font-mono uppercase text-ink-muted mb-1.5">
                  COMMERCIAL GSTIN IDENTIFIER
                </label>
                <input
                  type="text"
                  required
                  placeholder="22AAAAA0000A1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-input bg-surface-2 border border-border focus:border-signal-ai focus:outline-none text-ink-primary text-sm font-mono selection:bg-signal-ai/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-btn bg-signal-ai hover:bg-signal-ai-hover text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-enter shadow-lg shadow-signal-ai/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFY CREDENTIALS &amp; UNLOCK ₹198/YR RATE</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-telemetry font-mono text-ink-muted">
                  CRYPTOGRAPHIC HANDSHAKE VIA NATIONAL MSME DATA GATEWAY
                </span>
              </div>
            </form>
          )}

          {status === "verifying" && (
            <div className="py-8 text-center space-y-6">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-2 border border-border">
                <div className="absolute inset-0 bg-signal-ai/15 rounded-full animate-ping opacity-50" />
                <Loader2 className="w-7 h-7 text-signal-ai animate-spin" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-ink-primary font-display mb-1">
                  Verifying Enterprise Sovereign Identity
                </h4>
                <p className="text-xs text-ink-secondary font-mono">
                  Connecting to Ministry of MSME &amp; GSTN Network...
                </p>
              </div>

              {/* Progress checklist */}
              <div className="space-y-2 text-left max-w-xs mx-auto text-xs font-mono">
                <div className={`flex items-center gap-2 ${verificationStep >= 1 ? "text-signal-growth" : "text-ink-muted"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>UDYAM Portal Registry validation</span>
                </div>
                <div className={`flex items-center gap-2 ${verificationStep >= 2 ? "text-signal-growth" : "text-ink-muted"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>GSTIN active status &amp; 3B filing score</span>
                </div>
                <div className={`flex items-center gap-2 ${verificationStep >= 3 ? "text-signal-growth" : "text-ink-muted"}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Generating ₹198/Year Enterprise Token</span>
                </div>
              </div>
            </div>
          )}

          {status === "approved" && (
            <div className="py-4 space-y-5">
              <div className="p-4 rounded-panel bg-surface-2 border border-signal-growth/40 flex items-start gap-3">
                <div className="p-2 rounded-btn bg-signal-growth/15 text-signal-growth shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink-primary font-display">
                    CLEARANCE GRANTED: MSME SUBSIDY APPLIED
                  </h4>
                  <p className="text-xs text-ink-secondary mt-1">
                    {enterpriseName} has been verified under category <span className="text-signal-commerce font-mono">SMALL_MANUFACTURING_TN</span>.
                  </p>
                </div>
              </div>

              {/* Clearance Certificate Badge */}
              <div className="p-4 rounded-input bg-canvas-deep border border-border font-mono text-xs space-y-2">
                <div className="flex justify-between text-telemetry text-ink-muted border-b border-border/50 pb-1.5">
                  <span>SUBSIDIZED BILLING:</span>
                  <span className="text-signal-growth font-bold">₹198.00 / 365 DAYS</span>
                </div>
                <div className="flex justify-between text-telemetry text-ink-muted border-b border-border/50 pb-1.5">
                  <span>ENTERPRISE PASSKEY:</span>
                  <span className="text-ink-primary font-mono tracking-wider">NCC-IND-8849-019X</span>
                </div>
                <div className="flex justify-between text-telemetry text-ink-muted">
                  <span>SECURITY CLEARANCE:</span>
                  <span className="text-signal-commerce">UNRESTRICTED ENTERPRISE COHORT</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-btn bg-signal-growth hover:bg-[#065f46] text-canvas-deep font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>ENTER COMMAND DASHBOARD</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-btn bg-surface-2 hover:bg-surface-3 text-ink-secondary text-xs font-mono border border-border"
                >
                  RESET
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
