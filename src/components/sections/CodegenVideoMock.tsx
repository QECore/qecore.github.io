import { useState, useEffect } from "react";
import { Play } from "lucide-react";

/**
 * CodegenVideoMock — Interactive browser recording animation
 *
 * Extracted from Docs.tsx. Shows a simulated browser with login form
 * and a recording events panel that animates through steps.
 */
export default function CodegenVideoMock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            setActiveStep(0);
            return 0;
          }
          const nextProgress = p + 1.5;
          setActiveStep(Math.floor((nextProgress / 100) * 6));
          return nextProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const steps = [
    "Navigate to /login",
    "Click input[placeholder=\"username\"]",
    "Fill username with 'admin'",
    "Fill password with 'secret'",
    "Click button 'Sign In'",
    "Registry & Page Objects Generated"
  ];

  return (
    <div className="border border-white/5 bg-[#080808] rounded-xl overflow-hidden shadow-2xl relative aspect-video flex flex-col justify-between p-3 select-none w-full max-w-xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B] border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full bg-red-500 ${isPlaying ? "animate-pulse" : ""}`} />
          <span className="font-bold text-slate-300">PW-CORE CODEGEN RECORDER</span>
        </div>
        <span>1280x720</span>
      </div>

      {/* Middle screen */}
      <div className="flex-1 flex items-center justify-center relative my-2 overflow-hidden min-h-[140px]">
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95 z-20"
          >
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </button>
        )}

        {/* Mock browser screen */}
        <div className="absolute inset-0 bg-[#0c0c0c]/90 rounded-lg border border-white/5 p-3 flex flex-col justify-between text-left">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#334155]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#334155]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#334155]" />
            <div className="bg-[#1e293b] text-[8px] text-slate-400 px-2 py-0.5 rounded flex-1 ml-2 font-mono flex items-center justify-between">
              <span>https://localhost:3000/login</span>
            </div>
          </div>
          
          {/* Dynamic interactive steps inside screen */}
          <div className="flex-1 flex flex-col justify-center space-y-2 font-mono text-[9px] w-full max-w-[140px] mx-auto">
            <div className="space-y-1 bg-slate-900/50 p-2 rounded border border-white/5">
              <div className="h-4 bg-slate-800 rounded w-full flex items-center px-1 text-[8px] text-slate-500">
                {isPlaying && activeStep >= 2 ? "admin" : "username"}
              </div>
              <div className="h-4 bg-slate-800 rounded w-full flex items-center px-1 text-[8px] text-slate-500">
                {isPlaying && activeStep >= 3 ? "••••••" : "password"}
              </div>
              <div className="h-4 bg-amber-500/80 rounded w-full flex items-center justify-center text-slate-950 font-bold text-[8px]">
                SIGN IN
              </div>
            </div>
          </div>
        </div>

        {/* Recorded steps overlay list on the right */}
        <div className="absolute right-2 top-2 bottom-2 w-[130px] bg-black/90 rounded border border-white/10 p-2 flex flex-col justify-start text-left overflow-y-auto scrollbar-none font-mono text-[8px] space-y-1 z-10">
          <div className="text-amber-500 font-bold uppercase tracking-wider text-[7px] border-b border-white/5 pb-1">Recorded Events</div>
          {steps.map((st, i) => (
            <div
              key={i}
              className={`transition-colors duration-200 ${
                isPlaying && activeStep >= i ? "text-emerald-400 font-semibold" : "text-slate-600"
              }`}
            >
              {isPlaying && activeStep >= i ? "✓ " : "• "}{st}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Player controls */}
      <div className="flex items-center gap-3 text-slate-500 text-[9px] font-mono border-t border-white/5 pt-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-slate-400 hover:text-white"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 bg-amber-500" style={{ width: `${progress}%` }} />
        </div>
        <span>{isPlaying ? `0:0${Math.min(9, Math.floor((progress/100)*6))}` : "0:00"} / 0:06</span>
      </div>
    </div>
  );
}
