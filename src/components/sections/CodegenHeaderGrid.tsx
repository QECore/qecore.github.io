import React from "react";
import { Tag, Shield, RefreshCw, BookOpen, FilePlus, PlayCircle } from "lucide-react";

export default function CodegenHeaderGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 select-none max-w-sm">
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <Tag className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Descriptive Keys</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <RefreshCw className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Locator Reuse</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <Shield className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Stable Locators</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <BookOpen className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Registry Updates</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <FilePlus className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Multi-page</span>
      </div>
      <div className="flex items-center gap-2.5 text-[11px] text-slate-300 font-medium">
        <PlayCircle className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
        <span>Resume Recording</span>
      </div>
    </div>
  );
}
