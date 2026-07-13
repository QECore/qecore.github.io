import React from "react";

interface LinkItem {
  id: string;
  label: string;
}

interface TemplateCProps {
  id: string;
  label: string;
  title: string;
  description: string;
  problem: string[];
  solution: string;
  code: string | React.ReactNode;
  codeFilename: string;
  results: string[];
  pills: string[];
  illustration?: React.ReactNode | null;
  extraContent?: React.ReactNode;
  prevLink?: LinkItem;
  nextLink?: LinkItem;
  onLearnMore?: (tab?: string) => void;
}

/**
 * Template C — Compact Problem→Solution
 *
 * Compressed layout: problem/solution row (max ~120px), code+result two-column,
 * and merged "why/when" pills instead of two separate bulleted sections.
 * Used for all Features pages.
 */
export default function TemplateC({
  id,
  label,
  title,
  description,
  problem,
  solution,
  code,
  codeFilename,
  results,
  pills,
  illustration,
  extraContent,
  prevLink,
  nextLink,
  onLearnMore,
}: TemplateCProps) {
  return (
    <section className="text-left animate-in fade-in duration-300 space-y-4">
      {/* Compressed Problem + Solution row — max ~120px tall */}
      {problem.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ maxHeight: "130px" }}>
          {/* Problem */}
          <div className="bg-rose-500/[0.03] border border-rose-500/10 rounded-lg px-4 py-3 overflow-hidden">
            <h4 className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              The Problem
            </h4>
            <ul className="space-y-0.5">
              {problem.map((item, idx) => (
                <li key={idx} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-rose-500 font-extrabold shrink-0 select-none text-[10px]">✗</span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-lg px-4 py-3 overflow-hidden">
            <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PW-Core Solution
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {solution}
            </p>
          </div>
        </div>
      )}

      {/* Extra content (e.g. CodegenVideoMock) */}
      {extraContent}

      {/* Code + Visual Result — two-column */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Code block */}
        <div className="md:col-span-7">
          {typeof code === "string" ? (
            <div
              className="rounded-xl overflow-hidden flex flex-col"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-center gap-2.5 px-3 py-1.5 border-b border-white/5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <span className="flex-1 text-center text-[9px] uppercase font-bold tracking-wider text-white/50 select-none font-mono">
                  {codeFilename}
                </span>
              </div>
              <pre className="code-block-inset p-3 text-[10.5px] font-mono leading-snug text-slate-300 overflow-x-auto max-h-[160px] overflow-y-auto">
                {code}
              </pre>
            </div>
          ) : (
            code
          )}
        </div>

        {/* Visual Result */}
        <div className="md:col-span-5">
          <div className="h-full bg-white/[0.01] border border-white/5 rounded-xl p-4 flex flex-col justify-center gap-2.5 min-h-[120px]">
            <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Result</h4>
            {illustration ? (
              <div className="flex-1 flex items-center justify-center">
                {illustration}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] font-medium">
                    <span className="text-emerald-500 font-extrabold shrink-0">✓</span>
                    <span className="text-slate-300">{res}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Merged pills — replaces separate "Why This Matters" + "You'll Use This If" */}
      {pills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {pills.map((pill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-amber-500/8 text-amber-500/90 border border-amber-500/15 select-none"
            >
              {pill}
            </span>
          ))}
        </div>
      )}

    </section>
  );
}
