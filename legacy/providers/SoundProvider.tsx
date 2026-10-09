"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  play: (type: "snap" | "click" | "chime" | "hover") => void;
}

const SoundCtx = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Pure in-memory state: audio defaults to muted, resets on every load
  const [enabled, setEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close();
      }
    };
  }, [audioCtx]);

  const initAudio = () => {
    if (!audioCtx) {
      const CtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (CtxClass) {
        const ctx = new CtxClass();
        setAudioCtx(ctx);
        return ctx;
      }
    }
    return audioCtx;
  };

  const toggle = () => {
    if (!enabled) {
      const ctx = initAudio();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  };

  const play = (type: "snap" | "click" | "chime" | "hover") => {
    if (!enabled) return;
    const ctx = initAudio();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.002);
      gain.gain.linearRampToValueAtTime(0, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === "chime") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === "snap") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.005);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.11);
    } else if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.001);
      gain.gain.linearRampToValueAtTime(0, now + 0.015);
      osc.start(now);
      osc.stop(now + 0.02);
    }
  };

  return (
    <SoundCtx.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundCtx.Provider>
  );
}

export const useSound = () => useContext(SoundCtx);
