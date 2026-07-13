import React from "react";
import TerminalBlock from "@/components/code/TerminalBlock";

export default function TableSection() {
  const problem = [
    "Manual tr/td traversal",
    "Index-based cell lookups",
    "Repeated DOM parsing logic",
  ];

  const solution = "Convert table rows into typed objects and query them like normal JavaScript collections.";

  const code = `type Project = {
  id: number
  title: string;
  status: string
}

const projectsTable = new Table<Project>('tableLocator');
const rows = await projectsTable.get();
const project = rows.get('title','Website');
const activeProjects = rows.getAll('status','Active');`;

  const referenceRows = [
    { example: "table.get()", purpose: "Returns typed rows" },
    { example: "rows.get('title')", purpose: "Returns first title column value" },
    { example: "rows.get('title', 'Website')", purpose: "Returns matching row" },
    { example: "rows.getAll('title')", purpose: "Returns all title column values" },
    { example: "rows.getAll('status', 'Active')", purpose: "Returns matching rows" },
    { example: "table.getRowCount()", purpose: "Returns row count" },
  ];

  const chips = [
    "Typed table assertions",
    "Column-name lookups",
    "No DOM traversal",
    "Readable validation code",
    "Stable after UI changes",
  ];

  return (
    <section className="text-left animate-in fade-in duration-300 space-y-4 max-w-5xl mx-auto font-sans">
      {/* 1. Problem / Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Problem Card */}
        <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-lg px-4 py-2.5">
          <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            THE PROBLEM
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

        {/* PW-Core Solution Card */}
        <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg px-4 py-2.5 flex flex-col justify-center">
          <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            PW-CORE SOLUTION
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {solution}
          </p>
        </div>
      </div>

      {/* 2. Code Block + Table Reference */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Code Block */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none">
            PROJECTS-TABLE.TS
          </span>
          <TerminalBlock
            code={code}
            filename="projects-table.ts"
            variant="code"
            language="typescript"
            showLineNumbers={true}
            maxLines={11}
            className="flex-1 font-mono text-[9.5px] leading-relaxed"
          />
        </div>

        {/* Right Column: Table Reference */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none">
            Table Reference
          </span>
          <div className="flex-1 rounded-xl bg-[#111111] border border-white/5 overflow-hidden flex flex-col min-h-[160px] p-3 justify-center">
            <div className="overflow-hidden rounded-lg bg-black/[0.15]">
              <table className="w-full text-left border-collapse text-[10px] font-sans">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 font-semibold select-none text-[8.5px] uppercase tracking-wider">
                    <th className="px-3 py-1.5 w-6/12 font-mono">Example</th>
                    <th className="px-3 py-1.5 w-6/12 font-mono">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {referenceRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors duration-150 text-[9px]">
                      <td className="px-3 py-1.5 font-mono text-amber-500/90 font-semibold truncate max-w-[150px]" title={row.example}>
                        {row.example}
                      </td>
                      <td className="px-3 py-1.5 text-slate-400 leading-tight">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Benefit Tags */}
      <div className="flex flex-wrap gap-4 justify-center items-center pt-2 select-none">
        {chips.map((chip, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold tracking-wide"
          >
            <span className="text-emerald-400 font-extrabold">✓</span>
            <span>{chip}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
