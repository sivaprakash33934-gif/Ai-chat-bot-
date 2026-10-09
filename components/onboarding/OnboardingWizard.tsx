"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";
import { INITIAL_ONBOARDING_DATA, OnboardingData } from "./types";
import { StepBusiness, StepKnowledge, StepRules } from "./OnboardingStep1to3";
import { StepActions, StepTeam, StepTestAI, StepGoLive } from "./OnboardingStep4to7";

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(INITIAL_ONBOARDING_DATA);

  const totalSteps = 7;

  const handleChange = (patch: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  // Generate ASCII progress bar
  const filledBars = Math.round((currentStep / totalSteps) * 16);
  const emptyBars = 16 - filledBars;
  const progressBar = "━".repeat(filledBars) + "░".repeat(emptyBars);

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-6">
      {/* Ledger Header & Progress */}
      <div className="space-y-3 border-b border-hairline pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            SYNEX V1 · Setup Wizard Ledger
          </div>
          <div className="font-mono text-[11px] text-ink font-semibold">
            [{String(currentStep).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")}] {progressBar}
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto py-1">
          {["01 Business", "02 Knowledge", "03 Rules", "04 Actions", "05 Team", "06 Test AI", "07 Go Live"].map(
            (label, idx) => {
              const stepNum = idx + 1;
              const isActive = stepNum === currentStep;
              const isPast = stepNum < currentStep;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setCurrentStep(stepNum)}
                  className={`rounded-[3px] px-2 py-1 font-mono text-[10px] uppercase transition-colors shrink-0 ${
                    isActive
                      ? "border border-ink bg-ink text-paper"
                      : isPast
                      ? "border border-hairline bg-paper-elevated text-ink"
                      : "border border-hairline bg-paper text-ink-muted hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Active Step Container */}
      <div className="rounded-[4px] border border-hairline bg-paper-elevated p-6 min-h-[420px]">
        {currentStep === 1 && <StepBusiness data={formData} onChange={handleChange} />}
        {currentStep === 2 && <StepKnowledge data={formData} onChange={handleChange} />}
        {currentStep === 3 && <StepRules data={formData} onChange={handleChange} />}
        {currentStep === 4 && <StepActions data={formData} onChange={handleChange} />}
        {currentStep === 5 && <StepTeam data={formData} onChange={handleChange} />}
        {currentStep === 6 && <StepTestAI />}
        {currentStep === 7 && <StepGoLive data={formData} />}
      </div>

      {/* Navigation Controls */}
      {currentStep < totalSteps && (
        <div className="flex items-center justify-between border-t border-hairline pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-1.5 rounded-[3px] border px-3 py-2 font-mono text-[11px] uppercase transition-colors focus-visible:outline-none ${
              currentStep === 1
                ? "border-hairline bg-paper text-ink-muted/40 cursor-not-allowed"
                : "border-hairline bg-paper text-ink hover:border-ink/50"
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-muted hover:text-ink underline focus-visible:outline-none"
            >
              <SkipForward className="h-3 w-3" /> Skip Step
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase text-paper hover:bg-ink-muted transition-colors focus-visible:outline-none"
            >
              Next Step <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
