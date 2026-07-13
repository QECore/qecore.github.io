import React from "react";

interface StepBadgeProps {
  step: string | number;
}

/**
 * StepBadge — brand orange circular badge with a black font-mono number.
 * Used for step-based numbering sequences inside documentation headers.
 */
export default function StepBadge({ step }: StepBadgeProps) {
  // Format single digits to pad with a leading 0 (e.g. 1 -> 01)
  const formattedStep = typeof step === "number" && step < 10 
    ? `0${step}` 
    : step;

  return (
    <span
      className="w-7 h-7 rounded-full bg-amber-500 text-black font-mono font-extrabold text-xs flex items-center justify-center select-none shrink-0"
    >
      {formattedStep}
    </span>
  );
}
