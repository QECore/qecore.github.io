import React, { useState } from "react";
import { Button } from "@/components/buttons/button";

interface LinkItem {
  id: string;
  label: string;
}

interface StepData {
  number: number;
  title: string;
  description: string;
  detail: React.ReactNode;
}

interface TemplateBProps {
  label: string;
  title: string;
  subtitle?: string;
  steps: StepData[];
  bottomNote?: React.ReactNode;
  prevLink?: LinkItem;
  nextLink?: LinkItem;
}

/**
 * Template B — Horizontal Stepper
 *
 * A horizontal row of numbered circles connected by lines.
 * Each step's detail appears in a card below the active node.
 * Replaces vertical "Stage 1/2/3" box stacking.
 * Fits within a single viewport at 1440×900.
 */
export default function TemplateB({
  label,
  title,
  subtitle,
  steps,
  bottomNote,
  prevLink,
  nextLink,
}: TemplateBProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      className="flex flex-col text-left animate-in fade-in duration-300"
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      {/* Horizontal stepper */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Step circles + connecting lines */}
        <div className="flex items-center justify-center gap-0 px-4 shrink-0 select-none">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isPast = idx < activeStep;

            return (
              <React.Fragment key={idx}>
                {/* Connecting line (before this node) */}
                {idx > 0 && (
                  <div className="flex-1 max-w-[120px] h-[2px] relative mx-1">
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <div
                      className="absolute inset-0 bg-amber-500 rounded-full origin-left transition-transform duration-500"
                      style={{ transform: isPast || isActive ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </div>
                )}

                {/* Node */}
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`
                    relative flex flex-col items-center gap-2 group cursor-pointer
                    transition-all duration-300
                  `}
                >
                  {/* Circle */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      font-mono font-extrabold text-sm transition-all duration-300
                      ${isActive
                        ? "bg-amber-500 text-black shadow-[0_0_20px_rgba(251,146,60,0.4)]"
                        : isPast
                          ? "bg-amber-500/60 text-black"
                          : "bg-[#1a1a1a] text-slate-500 border border-white/10"
                      }
                    `}
                  >
                    {step.number}
                  </div>
                  {/* Label below circle */}
                  <span
                    className={`
                      text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                      transition-colors duration-300
                      ${isActive ? "text-amber-500" : "text-slate-500"}
                    `}
                  >
                    {step.title}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Active step detail card */}
        <div className="mt-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <div
            className="rounded-xl border border-white/5 bg-[#0a0a0a] p-6 animate-in fade-in duration-200"
            key={activeStep}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-mono font-extrabold text-xs flex items-center justify-center shrink-0">
                {steps[activeStep].number}
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-100">
                  {steps[activeStep].title}
                </h3>
                <p className="text-[12px] text-[#94A3B8] leading-relaxed mt-1">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              {steps[activeStep].detail}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        {bottomNote && (
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-md p-3 mt-3 shrink-0">
            {bottomNote}
          </div>
        )}
      </div>

      {/* Footer navigation */}
      {(prevLink || nextLink) && (
        <div className="pt-3 flex justify-between items-center border-t border-white/5 mt-2 shrink-0">
          {prevLink ? (
            <Button
              variant="secondary"
              size="landing"
              onClick={() => { window.location.hash = prevLink.id; }}
              className="flex items-center gap-1.5 font-sans"
            >
              <span>← {prevLink.label}</span>
            </Button>
          ) : <div />}
          {nextLink && (
            <Button
              variant="secondary"
              size="landing"
              onClick={() => { window.location.hash = nextLink.id; }}
              className="flex items-center gap-1.5 font-sans"
            >
              <span>{nextLink.label} →</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
