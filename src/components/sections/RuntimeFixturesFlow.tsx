import React from "react";

export default function RuntimeFixturesFlow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 p-3.5 bg-[#0b0b0c]/25 border border-white/5 rounded-xl font-sans text-xs select-none text-slate-400">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#161619]/60 border border-white/5 rounded-lg text-slate-200">
        <span>Page Registry</span>
      </div>
      {/* Arrow */}
      <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0 select-none">
        <svg className="w-5 h-5 text-amber-500/80 rotate-90 md:rotate-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#161619]/60 border border-white/5 rounded-lg text-slate-400">
        <span><span className="text-amber-600/60 select-none shrink-0 mt-px">(Optional)</span> Extend Fixtures</span>
      </div>
      {/* Arrow */}
      <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0 select-none">
        <svg className="w-5 h-5 text-amber-500/80 rotate-90 md:rotate-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-200 font-medium font-mono text-[11px]">
        <span>test(...)</span>
      </div>
    </div>
  );
}
