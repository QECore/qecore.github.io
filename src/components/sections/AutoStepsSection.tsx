import React from "react";
import TerminalBlock from "@/components/code/TerminalBlock";
import { TRANSFORMATION, CHIPS } from "@/components/docs/AutoStepsData";

export default function AutoStepsSection() {
  return (
    <section className="text-left animate-in fade-in duration-300 space-y-6 pt-2 max-w-5xl mx-auto font-sans">
      {/* BEFORE → AFTER TRANSFORMATION (FOCAL POINT) */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-2 items-center">
        
        {/* Panel 1: Manual Playwright */}
        <div className="md:col-span-3 flex flex-col h-full justify-between">
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2 select-none text-center h-7 flex items-center justify-center">
            {TRANSFORMATION.panel1.title}
          </span>
          <div 
            className="relative flex-1 flex flex-col min-h-0 rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Elegant, thin red X overlay behind the code text */}
            <div className="absolute top-[28px] bottom-0 left-0 right-0 pointer-events-none z-0 flex items-center justify-center p-6">
              <svg className="w-full h-full opacity-[0.11]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="5" y1="5" x2="95" y2="95" stroke="rgba(254, 0, 0, 1)" strokeWidth="2" />
                <line x1="95" y1="5" x2="5" y2="95" stroke="rgba(254, 0, 0, 1)" strokeWidth="2" />
              </svg>
            </div>

            <TerminalBlock
              code={TRANSFORMATION.panel1.code}
              filename="manual.test.ts"
              variant="code"
              language="typescript"
              showLineNumbers={false}
              maxLines={11}
              className="flex-1 font-mono text-[9.5px] leading-relaxed relative z-10 !bg-transparent !border-none [&_.code-block-inset]:!bg-transparent [&_.code-block-inset]:!shadow-none"
            />
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0 select-none">
          <svg className="w-6 h-6 text-red-500/80 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Panel 2: Your Test */}
        <div className="md:col-span-3 flex flex-col h-full justify-between">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2 select-none text-center h-7 flex items-center justify-center">
            {TRANSFORMATION.panel2.title}
          </span>
          <TerminalBlock
            code={TRANSFORMATION.panel2.code}
            filename="pw-core.test.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={11}
            className="flex-1 font-mono text-[9.5px] leading-relaxed border-white/10"
          />
        </div>

        {/* Arrow 2 */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0 select-none">
          <svg className="w-6 h-6 text-emerald-400 rotate-90 md:rotate-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Panel 3: Generated HTML Report */}
        <div className="md:col-span-3 flex flex-col h-full justify-between">
          <span className="text-[10px] font-bold text-green-300 uppercase tracking-wider mb-2 select-none text-center h-7 flex items-center justify-center">
            {TRANSFORMATION.panel3.title}
          </span>
          <div
            className="flex-1 rounded-2xl bg-[#111111] border border-white/5 overflow-hidden flex flex-col min-h-[160px]"
            style={{
              boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.7)"
            }}
          >
            {/* Playwright Mock Report Title Bar */}
            <div className="bg-[#1a1a1a] px-3.5 py-2 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-[#111] font-extrabold font-mono">
                  ✓
                </span>
                <span className="text-[10px] font-medium text-slate-200 font-mono">
                  login.test.ts
                </span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">800ms</span>
            </div>

            {/* Playwright Steps */}
            <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-center">
              {TRANSFORMATION.panel3.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[10px] py-1.5 px-2 rounded hover:bg-white/[0.02] transition-colors border-l-2 border-emerald-500/80 pl-2 bg-white/[0.01]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-slate-500 text-[8px] select-none font-mono">▼</span>
                    <span className="font-mono text-slate-300 truncate font-medium">
                      {step.name}
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-[9px] shrink-0 ml-2 select-none">
                    {step.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM TAKEAWAY CHIPS */}
      <div className="flex flex-wrap gap-4 justify-center items-center pt-2">
        {CHIPS.map((chip, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold select-none tracking-wide"
          >
            <span className="text-emerald-400 font-extrabold">✓</span>
            <span>{chip}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
