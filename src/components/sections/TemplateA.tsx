import React from "react";
import { Button } from "@/components/buttons/button";

interface LinkItem {
  id: string;
  label: string;
}

interface TemplateAProps {
  label: string;
  title: string;
  subtitle?: string;
  left: React.ReactNode;
  right: React.ReactNode;
  bottomBridge?: React.ReactNode;
  prevLink?: LinkItem;
  nextLink?: LinkItem;
  layoutRatio?: "50-50" | "53-47" | "70-30";
}

/**
 * Template A — Single Viewport Concept
 *
 * Two-column grid: code/diagram on the left, prose + legend on the right.
 * Designed to fit within a single viewport at 1440×900 without page-level scroll.
 * Code panel gets internal scroll if content exceeds the available height.
 */
export default function TemplateA({
  label,
  title,
  subtitle,
  left,
  right,
  bottomBridge,
  prevLink,
  nextLink,
  layoutRatio = "50-50",
}: TemplateAProps) {
  const gridColsClass = layoutRatio === "70-30"
    ? "lg:grid-cols-[1.8fr_1fr]"
    : layoutRatio === "53-47"
    ? "lg:grid-cols-[1.12fr_1fr]"
    : "lg:grid-cols-2";

  return (
    <div
      className="flex flex-col text-left animate-in fade-in duration-300"
      style={{ maxHeight: "calc(100vh - 64px)" }}
    >
      {/* Two-column body */}
      <div className={`flex-1 min-h-0 grid grid-cols-1 ${gridColsClass} gap-6 items-start overflow-hidden`}>
        {/* Left: code panel with internal scroll */}
        <div className="h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          {left}
        </div>

        {/* Right: prose + legend */}
        <div className="h-full overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
          {right}
        </div>
      </div>

      {/* Bottom bridge sentence */}
      {bottomBridge && (
        <div className="pt-3 shrink-0">
          {bottomBridge}
        </div>
      )}

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
