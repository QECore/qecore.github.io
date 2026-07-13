import React from "react";
import { Rocket, Video, CheckCircle2, Play } from "lucide-react";
import { CLI_COMMANDS } from "@/components/docs/CliReferenceData";

export default function CliReferenceSection() {
  return (
    <div className="flex flex-col text-left animate-in fade-in duration-300 w-full">
      <div className="border border-white/5 rounded-xl overflow-hidden bg-zinc-950/40 backdrop-blur-md">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-white/5 bg-zinc-900/50 text-[10px] font-semibold text-slate-400 uppercase tracking-wider select-none">
              <th className="py-3 px-5 w-[30%]">Command</th>
              <th className="py-3 px-5 w-[35%]">Description</th>
              <th className="py-3 px-5 w-[35%]">Examples / Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CLI_COMMANDS.map((cmd, idx) => (
              <tr
                key={cmd.command}
                className={`transition-colors hover:bg-white/[0.02] ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                }`}
              >
                {/* Command Column */}
                <td className="py-5 px-5 align-top">
                  <div className="flex items-center gap-2.5">
                    <span className="text-orange-500 shrink-0">
                      {cmd.icon === "rocket" && <Rocket className="w-3.5 h-3.5" />}
                      {cmd.icon === "video" && <Video className="w-3.5 h-3.5" />}
                      {cmd.icon === "check" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {cmd.icon === "play" && <Play className="w-3.5 h-3.5" />}
                    </span>
                    <span className="font-mono text-[11px] font-semibold bg-orange-950/20 border border-orange-500/20 text-orange-400 px-2.5 py-1.5 rounded-lg shadow-sm min-w-[140px] text-center sm:text-left">
                      {cmd.command}
                    </span>
                  </div>
                </td>

                {/* Description Column */}
                <td className="py-5 px-5 align-top">
                  <p className="text-slate-300 text-[11px] font-normal leading-relaxed max-w-[340px]">
                    {cmd.purpose}
                  </p>
                </td>

                {/* Examples / Options Column */}
                <td className="py-5 px-5 align-top">
                  <div className="flex flex-col gap-2">
                    {cmd.options && cmd.options.length > 0 ? (
                      cmd.options.map((opt) => (
                        <div key={opt.flag} className="flex items-start gap-2.5 text-left">
                          <span className="font-mono text-[10px] text-slate-300 bg-zinc-800/60 border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap shrink-0 mt-0.5">
                            {opt.flag}
                          </span>
                          <span className="text-[10px] text-slate-400 font-sans leading-relaxed mt-0.5">
                            {opt.description}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 text-[10px] font-mono pl-1">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
