import React, { useState } from "react";
import TerminalBlock from "@/components/code/TerminalBlock";
import {
  LOGIN_CODE,
  REPORT_STATES,
} from "@/components/docs/SecretMaskingData";

export default function SecretMaskingSection() {
  const [activeTab, setActiveTab] = useState<"without" | "with">("with");

  return (
    <section className="text-left animate-in fade-in duration-300 space-y-4 pt-1 max-w-5xl mx-auto font-sans">
      
      {/* 1. Problem / Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Why it exists */}
        <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-lg px-4 py-2.5">
          <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Why it exists
          </h4>
          <ul className="space-y-0.5">
            <li className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-rose-500 font-extrabold shrink-0 select-none">✗</span>
              <span>Passwords exposed in report steps</span>
            </li>
            <li className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-rose-500 font-extrabold shrink-0 select-none">✗</span>
              <span>Secrets visible inside trace viewer</span>
            </li>
            <li className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-rose-500 font-extrabold shrink-0 select-none">✗</span>
              <span>Compliance and audit failures</span>
            </li>
          </ul>
        </div>

        {/* Right: What PW-Core does */}
        <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg px-4 py-2.5 flex flex-col justify-center">
          <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            What PW-Core does
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            PW-Core automatically detects password field interactions and replaces captured values with <code className="bg-white/5 px-1 py-0.5 rounded text-emerald-400 font-mono">********</code> across all generated Playwright reports automatically.
          </p>
        </div>
      </div>

      {/* 2. Interactive Before/After Visual Demo */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left Column: Code Block */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none">
            Login Page Object
          </span>
          <TerminalBlock
            code={LOGIN_CODE}
            filename="login.test.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={9}
            className="flex-1 font-mono text-[10px] leading-relaxed"
          />
        </div>

        {/* Right Column: Generated Playwright Report (Interactive) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 select-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Generated Playwright Report
            </span>
            
            {/* Interactive Toggle */}
            <div className="flex items-center bg-white/[0.02] border border-white/5 rounded-lg p-0.5 gap-0.5">
              <button
                onClick={() => setActiveTab("without")}
                className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all duration-150 ${
                  activeTab === "without"
                    ? "bg-rose-500/15 text-rose-400 border border-rose-500/10"
                    : "text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                Without PW-Core
              </button>
              <button
                onClick={() => setActiveTab("with")}
                className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-all duration-150 ${
                  activeTab === "with"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/10"
                    : "text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                With PW-Core
              </button>
            </div>
          </div>

          {/* Interactive Report Content Box */}
          <div className="flex-1 rounded-xl bg-[#111111] border border-white/5 overflow-hidden flex flex-col min-h-[145px] justify-between">
            {/* Report Header */}
            <div className="bg-[#1a1a1a] px-3.5 py-1.5 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full flex items-center justify-center text-[6px] font-extrabold font-mono ${
                  activeTab === "without" ? "bg-rose-500 text-black" : "bg-emerald-500 text-[#111]"
                }`}>
                  {activeTab === "without" ? "!" : "✓"}
                </span>
                <span className="text-[9.5px] font-medium text-slate-200 font-mono">
                  login.test.ts › Login flow
                </span>
              </div>
              <span className="text-[8.5px] text-slate-500 font-mono">240ms</span>
            </div>

            {/* Step execution details */}
            <div className="p-3 space-y-2 flex-1 flex flex-col justify-center">
              {REPORT_STATES[activeTab].map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-[10px] py-1 px-2.5 rounded border-l-2 ${
                    step.isSensitive
                      ? activeTab === "without"
                        ? "border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 text-rose-200"
                        : "border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-200"
                      : "border-slate-700 bg-white/[0.01] hover:bg-white/[0.02] text-slate-300"
                  } transition-colors`}
                >
                  <span className="font-mono font-medium">{step.label}</span>
                  <span className="font-mono opacity-90">{step.value}</span>
                </div>
              ))}
            </div>

            {/* Bottom highlighted annotation */}
            <div className="px-3 py-1.5 bg-white/[0.02] border-t border-white/5 text-[9px] text-slate-400 select-none text-center">
              {activeTab === "without" ? (
                <span className="text-rose-400 font-medium">⚠️ Critical: Plaintext credentials are exposed in final reports and trace logs.</span>
              ) : (
                <span className="text-emerald-400 font-medium">✨ Protected: PW-Core automatically masks password inputs in step logs.</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
