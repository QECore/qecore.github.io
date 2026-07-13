import React from "react";
import TerminalBlock from "@/components/code/TerminalBlock";
import {
  REGISTRY_CODE,
  NESTED_CHAIN_CODE,
} from "@/components/docs/ChainLocatorsData";

/* ─── Small section label ───────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none leading-none block">
      {children}
    </span>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────── */
export default function ChainLocatorsSection() {
  return (
    <section className="text-left animate-in fade-in duration-300 space-y-2 max-w-5xl mx-auto font-sans">

      {/* ── Row 1: Registry + Nested Usage Example ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch justify-between">
        {/* Left: Registry */}
        <div className="md:col-span-5 flex flex-col">
          <Label>Page Registry</Label>
          <TerminalBlock
            code={REGISTRY_CODE}
            filename="config.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={13}
            // Removed highlights completely from registry code block to avoid visual noise
            className="flex-1 font-mono text-[9.5px] leading-snug"
          />
        </div>

        {/* Arrow */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0 select-none">
          <svg className="w-10 h-10 text-amber-500/80 rotate-90 md:rotate-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Right: Nested Usage Example */}
        <div className="md:col-span-6 flex flex-col">
          <Label>Nested Usage Example</Label>
          <TerminalBlock
            code={NESTED_CHAIN_CODE}
            filename="dashboard.test.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={13}
            className="flex-1 font-mono text-[9.5px] leading-snug"
          />
        </div>
      </div>

      {/* ── Row 2: Grouped Summary Card ──────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-2.5 flex flex-col md:flex-row gap-4 justify-between items-start"
        style={{
          background: "linear-gradient(90deg, rgba(251,146,60,0.06) 0%, rgba(251,146,60,0.02) 100%)",
          border: "1px solid rgba(251,146,60,0.1)",
        }}
      >
        {/* Left Column: Navigation */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-[11px]">✓</span>
            <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Navigation</span>
          </div>
          <ul className="space-y-0.5 pl-5 list-disc text-slate-400 text-[10px] leading-relaxed">
            <li>Every registry entry is accessible through <code className="bg-white/5 px-1 py-0.2 rounded font-mono text-slate-300">chain()</code></li>
            <li>Each dot navigates one registry level</li>
          </ul>
        </div>

        {/* Right Column: Type Safety */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-[11px]">✓</span>
            <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Type Safety</span>
          </div>
          <ul className="space-y-0.5 pl-5 list-disc text-slate-400 text-[10px] leading-relaxed">
            <li>Autocomplete only exposes valid paths</li>
            <li><span className="py-0.2 rounded text-amber-300">chain()</span> returns a native Playwright Locator</li>
          </ul>
        </div>
      </div>

    </section>
  );
}
