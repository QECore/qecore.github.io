import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TemplateTabsProps {
  tabs: Tab[];
  className?: string;
}

/**
 * TemplateTabs — Before/After tab switcher
 *
 * Simple two-button tab component (no library dependency).
 * Used inside Template A for the "Custom Fixtures" page
 * to show "Before" (repeated generated calls) vs "After" (TypedPage class).
 */
export default function TemplateTabs({ tabs, className = "" }: TemplateTabsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Tab buttons */}
      <div className="flex items-center gap-1 mb-3">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`
              px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider
              rounded-md transition-all duration-200 select-none
              ${idx === activeIdx
                ? "bg-amber-500 text-black shadow-[0_2px_8px_rgba(251,146,60,0.3)]"
                : "bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/8"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="animate-in fade-in duration-150" key={activeIdx}>
        {tabs[activeIdx].content}
      </div>
    </div>
  );
}
