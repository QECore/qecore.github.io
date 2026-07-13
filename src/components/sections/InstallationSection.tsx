import { FlaskConical } from "lucide-react";
import DocCard from "@/components/cards/DocCard";
import CardPros from "@/components/cards/CardPros";
import TerminalBlock from "@/components/code/TerminalBlock";
import DocBadge from "@/components/feedback/DocBadge";
import { Button } from "@/components/buttons/button";

interface InstallationSectionProps {
  nextLink?: { id: string; label: string };
}

/**
 * InstallationSection — the full Installation docs page section.
 */
export default function InstallationSection({ nextLink }: InstallationSectionProps) {
  return (
    <div className="text-left animate-in fade-in duration-300">
      {/* Two-column install options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Column 1: New Project */}
        <DocCard
          accentColor="amber"
          heading="Start a New Project"
          badge={<DocBadge variant="warning">Recommended</DocBadge>}
        >
          <TerminalBlock
            code="npm init pw-core"
            filename="Terminal"
            variant="terminal"
            showLineNumbers={false}
          />

          <div className="space-y-4 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] block mb-2">PROJECT STRUCTURE</span>
            <div className="font-mono text-xs text-slate-300 space-y-2 pl-1 leading-normal">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">src/</span>
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <span className="text-slate-500">├──</span>
                <span className="w-3.5 h-3.5 bg-[#3178c6] text-white rounded-[2px] font-extrabold text-[8px] flex items-center justify-center select-none shrink-0 font-sans leading-none px-0.5">
                  TS
                </span>
                <span className="text-slate-300">registry.ts</span>
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <span className="text-slate-500">├──</span>
                <span className="text-slate-500">tests/</span>
              </div>
              <div className="flex items-center gap-1.5 pl-6">
                <span className="text-slate-500">└──</span>
                <FlaskConical className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-slate-400">parallel.test.ts</span>
              </div>
              <div className="flex items-center gap-1.5 pl-6">
                <span className="text-slate-600">└──</span>
                <FlaskConical className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-slate-400">serial.test.ts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-[#3178c6] text-white rounded-[2px] font-extrabold text-[8px] flex items-center justify-center select-none shrink-0 font-sans leading-none px-0.5">
                  TS
                </span>
                <span>playwright.config.ts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>.prettierrc <span className="text-slate-500 italic text-[11px] ml-1.5 font-sans">[preconfigured]</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>eslint.config.mjs <span className="text-slate-500 italic text-[11px] ml-1.5 font-sans">[preconfigured]</span></span>
              </div>
            </div>
          </div>
        </DocCard>

        {/* Column 2: Existing Project */}
        <DocCard
          accentColor="slate"
          heading="Existing Playwright Project"
        >
          <TerminalBlock
            code="npm install pw-core"
            filename="Terminal"
            variant="terminal"
            showLineNumbers={false}
          />

          <div className="space-y-4 pt-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] block mb-2">What changes after installing?</span>
            <p className="text-[12.5px] text-slate-300 font-semibold leading-relaxed">Nothing changes in your workflow.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <CardPros
                items={[
                  "Keep Playwright CLI",
                  "Keep playwright.config.ts",
                  "Keep existing tests",
                  "Adopt features gradually"
                ]}
              />
              <div className="pt-2 space-y-2 pl-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] block">Works with:</span>
                <ul className="space-y-3 font-sans text-[12px] text-slate-300 list-disc pl-4 leading-normal">
                  <li >Existing projects</li>
                  <li>CI/CD pipelines</li>
                  <li>Playwright Test</li>
                </ul>
              </div>
            </div>
          </div>
        </DocCard>
      </div>

      {/* Continue button at bottom */}
      {nextLink && (
        <div className="pt-4 flex justify-end">
          <Button
            variant="secondary"
            size="landing"
            onClick={() => { window.location.hash = nextLink.id; }}
            className="flex items-center gap-1.5 font-sans"
          >
            <span>Continue to {nextLink.label}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        </div>
      )}
    </div>
  );
}
