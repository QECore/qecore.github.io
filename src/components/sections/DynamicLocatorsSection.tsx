import React from "react";
import TerminalBlock from "@/components/code/TerminalBlock";

export default function DynamicLocatorsSection() {
  const configCode = `const config = createPageConfig({
  profile: {
    testIds: {
      "{item}": {
        item: ["male", "female", "other"],
        testId: "radio-gender-item",
      }
    }
  },
  dashboard: {
    selectors: {
      "{item}{status}": {
        item: ["chart", "table"],
        status: ["active", "inactive"],
        selector: ".component-status-item",
      },
    },
  }
});`;

  const testCode = `

await profile.click("male")
await profile.verify("female")
await profile.verifyHidden("other")


// Supports any standard action or assertion


await dashboard.hover("chartActive")
await dashboard.chartInActive.isDisabled()
await dashboard.tableActive.focus()
await dashboard.tableInactive.nth(4)`;

  const results = [
    {
      icon: "🧩",
      title: "Template String",
      description: "Supports both testId and selector templates."
    },
    {
      icon: "🔑",
      title: "Typed Keys",
      description: "Generates strongly typed camelCase locator keys automatically."
    },
    {
      icon: "🟢",
      title: "Multi Dimensional",
      description: "Supports both single and multi-dimensional dynamic locators."
    },
    {
      icon: "⚡",
      title: "Cleaner Tests",
      description: "No runtime interpolation or string concatenation required."
    }
  ];

  return (
    <section className="text-left animate-in fade-in duration-300 space-y-4">
      {/* Problem & Solution cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Card */}
        <div className="bg-rose-500/[0.03] border border-rose-500/10 rounded-lg px-4 py-2.5 overflow-hidden">
          <h4 className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            THE PROBLEM
          </h4>
          <ul className="space-y-1">
            <li className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <span className="text-rose-500 font-bold shrink-0 select-none text-[11px] leading-tight">✕</span>
              <span className="leading-tight">Duplicate locators for similar elements</span>
            </li>
            <li className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <span className="text-rose-500 font-bold shrink-0 select-none text-[11px] leading-tight">✕</span>
              <span className="leading-tight">Hardcoded dynamic selector strings</span>
            </li>
            <li className="text-[11px] text-slate-400 flex items-start gap-1.5">
              <span className="text-rose-500 font-bold shrink-0 select-none text-[11px] leading-tight">✕</span>
              <span className="leading-tight">Repetitive locator maintenance</span>
            </li>
          </ul>
        </div>

        {/* PW-Core Solution Card */}
        <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-lg px-4 py-2.5 overflow-hidden flex flex-col justify-center">
          <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            PW-CORE SOLUTION
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Define template-based locators once in pageConfig. PW-Core generates strongly typed camelCase locator keys that tests consume directly.
          </p>
        </div>
      </div>

      {/* Code blocks & Result Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Columns (col-span-8) */}
        <div className="md:col-span-8 grid grid-cols-2 gap-6 items-stretch h-full">
          {/* pageConfig */}
          <div className="flex flex-col h-full">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2 select-none leading-none">
              PAGECONFIG
            </span>
            <TerminalBlock
              code={configCode}
              filename="config.ts"
              variant="code"
              language="typescript"
              showLineNumbers={false}
              maxLines={20}
              className="flex-1 font-mono text-[9.5px] leading-snug"
            />
          </div>

          {/* Test Usage */}
          <div className="flex flex-col h-full">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2 select-none leading-none">
              TEST USAGE
            </span>
            <TerminalBlock
              code={testCode}
              filename="profile.test.ts"
              variant="code"
              language="typescript"
              showLineNumbers={false}
              maxLines={20}
              className="flex-1 font-mono text-[9.5px] leading-snug"
            />
          </div>
        </div>

        {/* Right Column: Result Cards Stack (col-span-4) */}
        <div className="md:col-span-4 flex flex-col h-full justify-between">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2 select-none leading-none">
            RESULT
          </span>
          <div className="flex flex-col gap-2 flex-1 justify-between">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="bg-[#181818] border border-white/5 rounded-3xl px-3 py-2 transition-all duration-200 hover:border-amber-500/40 hover:bg-[#1c1c1e] select-none flex items-center gap-3.5 flex-1 min-h-[42px]"
                style={{
                  boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.7), -10px -10px 30px rgba(255, 255, 255, 0.01)"
                }}
              >
                <div className="text-[1rem] shrink-0"></div>
                <div className="flex flex-col justify-center min-w-0">
                  <h6 className="font-bold text-[12px] text-slate-200 leading-none mb-1">
                    {res.icon} {res.title}
                  </h6>
                  <p className="text-[8px] text-slate-400 leading-tight">
                    {res.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
