"use client";

import { useState, FormEvent, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, ShieldCheck } from "lucide-react";

type Step = "identifier" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("identifier");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleIdentifierSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Please enter a valid GSTIN or registered email.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 700);
  };

  const handleOtpChange = (value: string, index: number) => {
    setError(null);
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    // Auto-advance focus to the next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.some((digit) => digit === "")) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      router.push("/dashboard/today");
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#06080C] px-4 py-12 text-slate-100">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      {/* Skip link for keyboard accessibility */}
      <a
        href="#login-card"
        className="absolute left-4 top-4 z-50 -translate-y-16 rounded-md border border-white/20 bg-slate-900 px-4 py-2 font-mono text-[13px] text-white transition-transform focus:translate-y-0"
      >
        Skip to login
      </a>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Navigation link back to site */}
        <Link
          href="/"
          className="mb-6 inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" /> &larr; Back to site
        </Link>

        {/* Login Card */}
        <div
          id="login-card"
          tabIndex={-1}
          className="rounded-2xl border border-white/[0.1] bg-[#0E1322]/90 p-8 shadow-2xl backdrop-blur-xl focus:outline-none"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 font-mono text-[10px] font-bold text-white">
                S
              </span>
              <span className="font-sans text-[18px] font-bold tracking-[0.18em] text-white">
                SYNEX
              </span>
            </div>
            <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
              DEMO AUTH
            </span>
          </div>

          {step === "identifier" ? (
            <form onSubmit={handleIdentifierSubmit}>
              <h1 className="text-[20px] font-semibold tracking-tight text-white">
                Sign in to Control Center
              </h1>
              <p className="mt-1 text-[13px] text-slate-400">
                Enter your GSTIN or authorized operator email.
              </p>

              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-[12px] text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-6">
                <label
                  htmlFor="identifier"
                  className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  GSTIN / Email
                </label>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="33AAAAA0000A1Z5 or operator@synex.in"
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-white/[0.1] bg-black/40 px-3.5 font-mono text-[13px] text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 font-mono text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:from-indigo-400 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
              >
                {loading ? "Sending One-Time Password..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h1 className="text-[20px] font-semibold tracking-tight text-white">
                  Enter One-Time Password
                </h1>
              </div>
              <p className="mt-1 text-[13px] text-slate-400">
                Six-digit verification code sent to{" "}
                <span className="font-mono text-[12px] text-indigo-300 font-medium">
                  {identifier}
                </span>
              </p>

              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-[12px] text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-6 flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    ref={(el) => {
                      otpInputsRef.current[i] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`OTP digit ${i + 1}`}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : undefined}
                    className="h-12 w-11 rounded-lg border border-white/[0.12] bg-black/50 text-center font-mono text-[18px] font-bold tabular-nums text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 font-mono text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:from-indigo-400 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Enter"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep("identifier");
                }}
                className="mt-4 flex min-h-[44px] w-full items-center justify-center font-mono text-[12px] text-slate-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                Use a different GSTIN or email
              </button>
            </form>
          )}
        </div>

        {/* Footnote */}
        <p className="mt-6 text-center font-mono text-[11px] text-slate-600">
          Stateless session · No data retained · Demo auth
        </p>
      </div>
    </div>
  );
}
