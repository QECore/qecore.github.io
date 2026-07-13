import React from "react";
import TerminalBlock from "@/components/code/TerminalBlock";

export default function InternalLocatorsSection() {
  const registryCode = `selector: { logo: '.logo-brand'}
testId: { settings: 'settings-btn'}
button: ["Submit"],
textbox: ["Username"],
heading: ["Dashboard"]
`;

  const testCode = `await login.verify("logo");
await login.click("settings");
await login.click("Submit");
await login.fill("Username", "admin");
await login.verify("Dashboard")`;

  const mappings = [
    { key: "selector", playwright: "locator()" },
    { key: "testId", playwright: "getByTestId()" },
    { key: "text", playwright: "getByText()" },
    { key: "label", playwright: "getByLabel()" },
    { key: "placeholder", playwright: "getByPlaceholder()" },
    { key: "button, link, textbox, heading, checkbox, radio, menuitem, option, combobox, listitem, and more", playwright: "getByRole()" },
  ];

  return (
    <section className="text-left animate-in fade-in duration-300 space-y-5">
      {/* Code Blocks side-by-side or stacked to show the flow */}
      <div className="grid grid-cols-2 gap-4 items-stretch justify-between">
        {/* Registry Code Block */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none">
            Page Registry
          </span>
          <TerminalBlock
            code={registryCode}
            filename="registry.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={6}
            className="flex-1"
          />
        </div>
        {/* Test Code Block */}
        <div className="flex flex-col relative">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 select-none">
            Test Usage
          </span>
          <TerminalBlock
            code={testCode}
            filename="login.test.ts"
            variant="code"
            language="typescript"
            showLineNumbers={false}
            maxLines={6}
            className="flex-1"
          />
        </div>
      </div>

      {/* Supported Playwright Locators Table */}
      <div className="space-y-2 pt-2">
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
            Playwright Locator Support
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5 mb-4">
            Any Playwright semantic locator or role can be used as a <span className="text-amber-500">registry key</span>.          
          </p>
        </div>
        <div className="overflow-hidden border border-white/5 rounded-lg bg-white/[0.01]">
          <table className="w-full text-left border-collapse text-[11px] font-sans">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 font-semibold select-none">
                <th className="px-4 py-2 w-7/12">Registry Key Examples</th>
                <th className="px-4 py-2 w-5/12">Playwright</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {mappings.map((mapping) => (
                <tr key={mapping.key} className="hover:bg-white/[0.01] transition-colors duration-150">
                  <td className="px-4 py-2 font-mono text-amber-400/90 whitespace-normal break-words leading-relaxed">{mapping.key}</td>
                  <td className="px-4 py-2 font-mono text-slate-400">{mapping.playwright}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
