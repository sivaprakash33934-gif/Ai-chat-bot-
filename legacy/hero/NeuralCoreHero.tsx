"use client";

import dynamic from "next/dynamic";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import NeuralCoreFallback from "./NeuralCoreFallback";

const NeuralCoreScene = dynamic(
  () => import("./NeuralCoreScene").then((m) => m.NeuralCoreScene),
  {
    ssr: false,
    loading: () => <NeuralCoreFallback />,
  },
);

type DemoPhase = "idle" | "scanning" | "complete";

// Simulated demo figures — explicitly non-persisted and client-side only
const DEMO_RESULT = {
  pages: 17,
  products: 42,
  readiness: 68,
} as const;

function shouldUseFallback(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores < 4) {
    return true;
  }

  try {
    const canvas = document.createElement("canvas");
    return !Boolean(
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
    );
  } catch {
    return true;
  }
}

export function NeuralCoreHero() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger writes progress directly here. Scene reads in render loop. Zero React re-renders.
  const scrollIntensityRef = useRef(0);

  const [fallback, setFallback] = useState(true);
  const [url, setUrl] = useState("");
  const [typingTick, setTypingTick] = useState(0);
  const [submitTick, setSubmitTick] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [metrics, setMetrics] = useState({ pages: 0, products: 0, readiness: 0 });
  const [showSuccessRing, setShowSuccessRing] = useState(false);

  const lastTypingSpawn = useRef(0);
  const scanTimeout = useRef<number | null>(null);
  const counterTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setFallback(shouldUseFallback());
  }, []);

  // Hero-bounded ScrollTrigger modulation
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    if (!hero || !visual) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const modulation = { progress: 0 };

      gsap.to(modulation, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: () => {
            scrollIntensityRef.current = modulation.progress;
          },
        },
      });

      // Compositor-only visual hand-off
      gsap.to(visual, {
        yPercent: -4,
        scale: 0.95,
        opacity: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scanTimeout.current !== null) {
        window.clearTimeout(scanTimeout.current);
      }
      counterTweenRef.current?.kill();
    };
  }, []);

  // Throttled typing signal (max 10 spawns/sec)
  const handleUrlChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUrl(value);
    setPhase("idle");

    const now = performance.now();
    if (now - lastTypingSpawn.current >= 100) {
      lastTypingSpawn.current = now;
      setTypingTick((t) => t + 1);
    }
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!url.trim() || phase === "scanning") return;

      setPhase("scanning");
      setShowSuccessRing(false);
      setMetrics({ pages: 0, products: 0, readiness: 0 });
      setSubmitTick((t) => t + 1);

      // Simulated counter tween synced with beam arrival
      const state = { pages: 0, products: 0, readiness: 0 };
      counterTweenRef.current?.kill();
      counterTweenRef.current = gsap.to(state, {
        pages: DEMO_RESULT.pages,
        products: DEMO_RESULT.products,
        readiness: DEMO_RESULT.readiness,
        duration: 1.3,
        delay: 0.75,
        ease: "power2.out",
        onUpdate: () => {
          setMetrics({
            pages: Math.round(state.pages),
            products: Math.round(state.products),
            readiness: Math.round(state.readiness),
          });
        },
        onComplete: () => {
          setPhase("complete");
          setShowSuccessRing(true);
          scanTimeout.current = window.setTimeout(() => {
            setShowSuccessRing(false);
          }, 1400);
        },
      });
    },
    [phase, url],
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92svh] flex items-center overflow-hidden bg-[#FAFAFC] px-6 py-28 md:px-12 lg:px-16"
      aria-label="Hero"
    >
      <div className="mx-auto grid max-w-7xl w-full items-center gap-12 lg:gap-16 md:grid-cols-2">
        {/* Left Column: Text & Input Ingestion */}
        <div className="flex flex-col items-start z-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4F46E5] font-semibold">
            AI-Powered MSME Infrastructure
          </p>

          <h1
            className="text-slate-900 font-bold tracking-tight mt-6 text-balance"
            style={{
              fontSize: "clamp(2.75rem, 4.8vw + 1rem, 5.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            Your Business.
            <br />
            <span className="text-slate-900">Understood by AI.</span>
          </h1>

          <p className="mt-6 max-w-prose text-base sm:text-lg text-slate-600 leading-relaxed">
            One link. Your entire business becomes intelligent. Website →
            Knowledge Base → AI Chatbot → Growth. Enterprise AI at{" "}
            <span className="font-mono tabular-nums font-bold text-slate-900">
              ₹198/year
            </span>{" "}
            — transparent pricing, zero hidden costs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              data-cursor="TRY"
              data-magnetic="true"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#4F46E5] px-7 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F46E5] shadow-sm"
            >
              REQUEST ACCESS →
            </a>
            <a
              href="#demo"
              data-cursor="EXPLORE"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F46E5]"
            >
              EXPLORE DEMO
            </a>
          </div>

          {/* URL Ingest Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-3 shadow-md"
            data-cursor="TRY"
          >
            <div className="px-2 pb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>DEMO MODE · SIMULATED ANALYSIS</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="business-url" className="sr-only">
                Your business website
              </label>

              <input
                id="business-url"
                value={url}
                onChange={handleUrlChange}
                type="text"
                inputMode="url"
                placeholder="yourbusiness.com"
                data-cursor="TRY"
                className="min-h-[44px] flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              />

              <button
                type="submit"
                disabled={!url.trim() || phase === "scanning"}
                data-cursor="TRY"
                className="min-h-[44px] rounded-xl bg-slate-900 px-5 text-xs font-mono font-bold tracking-wider uppercase text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                {phase === "scanning" ? "INGESTING…" : "BUILD MY AI"}
              </button>
            </div>

            {/* Status readouts */}
            <div
              role="status"
              aria-live="polite"
              className="mt-3 pt-2.5 border-t border-slate-100 font-mono text-[11px] tabular-nums text-slate-600"
            >
              {phase === "idle" && (
                <span className="text-slate-400">
                  Enter your domain to simulate cold-start knowledge ingest.
                </span>
              )}

              {phase === "scanning" && (
                <span className="text-amber-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Synthesizing knowledge graph: {metrics.pages} pages · {metrics.products} SKUs…
                </span>
              )}

              {phase === "complete" && (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  ANALYSIS COMPLETE: {metrics.pages} pages · {metrics.products} products ·{" "}
                  {metrics.readiness}% AI readiness
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Signal Core 3D Canvas / Fallback */}
        <div
          ref={visualRef}
          className="relative aspect-square w-full max-w-lg lg:max-w-xl justify-self-center min-h-[380px] sm:min-h-[460px] flex items-center justify-center"
        >
          {/* Success Ring animation envelope */}
          {showSuccessRing && (
            <div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75"
              aria-hidden="true"
            />
          )}

          {fallback ? (
            <NeuralCoreFallback />
          ) : (
            <NeuralCoreScene
              typingTick={typingTick}
              submitTick={submitTick}
              intensityRef={scrollIntensityRef}
              onWebGLFailure={() => setFallback(true)}
            />
          )}

          {/* Topology caption */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md px-4 py-1.5 text-center font-mono text-[10px] tracking-wider text-slate-500 flex items-center gap-2 select-none pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="font-bold text-slate-700">SIGNAL CORE:</span>
            <span>DATA ENTERS → ORGANIZES → ACTS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeuralCoreHero;