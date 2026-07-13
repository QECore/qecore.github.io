import React from "react";
import {
  FileText,
  Layers,
  TestTube,
  Play,
  Shield,
  Globe
} from "lucide-react";
import TerminalBlock from "@/components/code/TerminalBlock";
import CodegenVideoPlayer from "@/components/sections/CodegenVideoPlayer";

export default function CodegenSection() {
  return (
    <section className="text-left animate-in fade-in duration-300 space-y-6 max-w-5xl mx-auto font-sans pt-4">
      <style>{`
        @media (min-width: 1024px) {
          .codegen-video-col {
            width: 74% !important;
            flex: 0 0 74% !important;
          }
          .codegen-sidebar-col {
            width: 26% !important;
            flex: 0 0 26% !important;
          }
        }
      `}</style>

      {/* FLEX CONTAINER FOR VIDEO (70%) + COMMANDS SIDEBAR (30%) */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full px-1">

        {/* Left Side: Large Recorder Video (70% on desktop) */}
        <div className="w-full codegen-video-col flex flex-col justify-between space-y-3" style={{ minWidth: 0 }}>
          <div className="border border-white/5 bg-[#080808]/80 backdrop-blur-md rounded-xl shadow-2xl relative flex flex-col flex-1">
            {/* Browser Header controls bar */}
            <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B] border-b border-white/5 pb-2 px-3 pt-3 rounded-t-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="font-bold text-slate-300 ml-2">Interactive Recording</span>
              </div>
              <span>1280x720</span>
            </div>
            <CodegenVideoPlayer />
          </div>
        </div>

        {/* Right Side: Commands Sidebar (26% on desktop) */}
        <div className="w-full codegen-sidebar-col flex flex-col gap-3">

          <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 select-none pl-1">
            Quick Start
          </div>

          {/* Card 1: Default Recording */}
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 mb-6 flex flex-col gap-2.5">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                  <Play className="w-3 h-3 text-slate-500" />
                  Default Recording
                </h4>
                <span className="text-[9px] font-semibold text-orange-400 border border-orange-500/30 bg-orange-500/10 px-1.5 py-0.5 rounded leading-none">
                  New Projects
                </span>
              </div>
              <p className="text-slate-400 leading-normal">
                Creates or updates registries, pages, and tests.
              </p>
            </div>
            <TerminalBlock
              code="npx pw-core codegen"
              variant="terminalWithoutHeader"
              className="w-full"
            />
          </div>

          {/* Card 2: Safe Mode */}
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 mb-6 justify-center flex flex-col gap-2.5 flex-4 min-h-[100px] relative">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                  <Shield className="w-3 h-3 text-slate-500" />
                  Safe Mode
                </h4>
                <span className="text-[9px] font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded leading-none">
                  Existing Projects
                </span>
              </div>
              <p className="text-slate-400 leading-normal">
                Preserves registries and appends only new pages and locators.
              </p>
            </div>
            <TerminalBlock
              code="npx pw-core codegen --safe"
              variant="terminalWithoutHeader"
              className="w-full"
            />
          </div>

          {/* Card 3: Custom URL */}
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col gap-2.5">
            <div className="space-y-1">
              <h4 className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                <Globe className="w-3 h-3 text-slate-500" />
                Custom URL
              </h4>
              <p className="text-slate-400 leading-normal">
                Starts recording from any URL.
              </p>
            </div>
            <TerminalBlock
              code="npx pw-core codegen --url https://example.com"
              variant="terminalWithoutHeader"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
