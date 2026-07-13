import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import registryCode from "./code/registry.ts?raw";

/**
 * RegistryExample — Displays a realistic VS Code style editor block showing a
 * complete, unified registry.ts file. This reinforces the mental model that
 * the entire registry is just one simple file/object.
 */
export default function RegistryExample() {
  return (
    <div
      className="font-mono text-[9.5px]/[14px] text-slate-300 rounded-xl overflow-hidden border border-[#272727] bg-[#121212]"
      style={{
        boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.7), -10px -10px 30px rgba(255, 255, 255, 0.03)",
      }}
    >
      {/* Tab bar header */}
      <div className="bg-[#1e1e1e] px-3 py-1.5 border-b border-[#272727] flex items-center justify-between">
        <span className="text-[9px] uppercase font-bold tracking-[2px] text-[#8e9cae] select-none">
          registry.ts
        </span>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]/65" />
          <span className="w-2 h-2 rounded-full bg-[#eab308]/65" />
          <span className="w-2 h-2 rounded-full bg-[#22c55e]/65" />
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-3 overflow-x-auto select-all bg-[#0a0a0a]">
        <Highlight theme={themes.vsDark} code={registryCode.trim()} language="typescript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} bg-transparent font-mono`} style={{ ...style, backgroundColor: "transparent", margin: 0 }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
