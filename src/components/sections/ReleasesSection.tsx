import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RELEASES_DATA, type ReleaseVersion } from "@/components/docs/ReleasesData";
import { Terminal, Gift, CheckCircle, Tag, GitPullRequest, Bookmark } from "lucide-react";
import { MenuItem } from "@/components/navigation/MenuItem";

export default function ReleasesSection() {
  const [selectedVersion, setSelectedVersion] = useState<string>("v1.3.0");

  const activeRelease = RELEASES_DATA.find((r) => r.version === selectedVersion) || RELEASES_DATA[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 text-left animate-in fade-in duration-300 w-full h-[calc(100vh-210px)] max-h-[520px]">
      {/* Left Column: Version Tabs */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col justify-between border border-white/5 rounded-xl bg-zinc-950/40 backdrop-blur-md p-4">
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-1">
            Version History
          </div>
          <div className="space-y-1.5 animate-none">
            {RELEASES_DATA.map((rel) => {
              const isSelected = rel.version === selectedVersion;
              return (
                <MenuItem
                  key={rel.version}
                  active={isSelected}
                  href={`#releases`}
                  className="w-full cursor-pointer hover:no-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVersion(rel.version);
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Tag className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-amber-500" : "text-slate-500 group-hover:text-slate-400"}`} />
                      <span className="font-mono text-sm font-semibold truncate">
                        {rel.version.replace('.0', '')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {rel.isLatest && (
                        <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded">
                          Latest
                        </span>
                      )}
                      <span className="text-[9px] font-mono text-slate-500 font-medium">
                        {rel.date.slice(5)}
                      </span>
                    </div>
                  </div>
                </MenuItem>
              );
            })}
          </div>
        </div>

        {/* NPM package link & stats */}
        <div className="border-t border-white/5 pt-3.5 mt-4 text-[10px] text-slate-500 space-y-2">
          <div className="flex justify-between items-center px-1">
            <span>Package Name</span>
            <span className="font-mono font-semibold text-slate-400 select-all">pw-core</span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span>License</span>
            <span className="text-slate-400 font-semibold">MIT</span>
          </div>
          <a
            href="https://www.npmjs.com/package/pw-core"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-amber-500/10 hover:border-amber-500/20 text-slate-300 hover:text-amber-500 font-semibold transition-all text-center uppercase tracking-wider text-[9px]"
          >
            <Terminal className="w-3.5 h-3.5" />
            View on NPM Registry
          </a>
        </div>
      </div>

      {/* Right Column: Release Detail Content */}
      <div className="flex-1 min-w-0 border border-white/5 rounded-xl bg-zinc-950/40 backdrop-blur-md flex flex-col h-full overflow-hidden">
        {/* Release Header */}
        <div className="border-b border-white/5 bg-zinc-900/40 px-6 py-4 shrink-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight">
                Release Notes for {activeRelease.version.replaceAll('.0', '')}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed max-w-[650px] line-clamp-1">
              {activeRelease.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable details container */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVersion}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {/* Highlights 2x2 Grid */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Release Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeRelease.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="border border-white/5 rounded-lg bg-white/[0.01] hover:bg-white/[0.02] p-3 transition-colors duration-150 flex gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-200">
                          {hl.title}
                        </h4>
                        <p className="text-[10.5px] text-slate-400 leading-normal mt-1">
                          {hl.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tickets / Code Blocks List */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Features & Enhancements
                </h3>
                <div className="space-y-3">
                  {activeRelease.tickets.map((t, idx) => (
                    <div
                      key={idx}
                      className="border border-white/5 rounded-lg bg-zinc-900/30 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5"
                    >
                      {/* Ticket Summary */}
                      <div className="p-4 md:w-[45%] flex flex-col justify-between gap-3 text-left">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {t.number && (
                              <span className="text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                                {t.number}
                              </span>
                            )}
                            <span className="text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                              {t.type}
                            </span>
                            <span className="text-[9.5px] font-semibold text-slate-400">
                              {t.area}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-200 leading-snug">
                            {t.title}
                          </h4>
                          <p className="text-[10.5px] text-slate-400 leading-relaxed mt-1.5">
                            {t.description}
                          </p>
                        </div>
                      </div>

                      {/* Ticket Code Example */}
                      <div className="p-4 md:w-[55%] bg-zinc-950/40 flex flex-col justify-center min-h-[90px]">
                        {t.exampleCode ? (
                          <div className="relative">
                            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1 select-none">
                              <Bookmark className="w-2.5 h-2.5" />
                              Usage Example
                            </div>
                            <pre className="text-[10.5px] font-mono text-amber-300/90 leading-relaxed overflow-x-auto whitespace-pre select-all bg-zinc-950/80 p-2.5 rounded-md border border-white/5 max-h-[140px] custom-scrollbar">
                              <code>{t.exampleCode}</code>
                            </pre>
                          </div>
                        ) : (
                          <div className="text-slate-500 text-[10px] font-mono italic text-center select-none">
                            No code examples required.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
