import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PrismCodeBlock from "./PrismCodeBlock";

const REGISTRY_CODE = `export const test = createPageRegistry({
  login: {
    url: '/login',
    testIds: { name: 'username', password: 'password', submit: 'submit-btn' },
  },
  dashboard: {
    url: '/app',
    selectors: { heading: 'h1:has-text("Dashboard")' },
  },
})`;

const TEST_CODE = `test('Verify Login', async ({ login, dashboard }) => {
  await login.goto()
  await login.fill('name', 'teja')
  await login.click('submit')
  await dashboard.verifyURL()
})`;

export default function ArchitectureDeck() {
  const [flowStep, setFlowStep] = useState(0);

  // Cycle steps:
  // 0: Registry -> Runtime input line flows (500ms)
  // 1: Parse Registry step active (500ms)
  // 2: Generate Pages step active (500ms)
  // 3: Create Fixtures step active (500ms)
  // 4: Extend Test step active (500ms)
  // 5: Runtime output -> Test line flows (500ms)
  // 6: Static final state before loop (2500ms)
  useEffect(() => {
    const stepDurations = [500, 500, 600, 700, 500, 500, 100];
    
    const timer = setTimeout(() => {
      setFlowStep((prev) => (prev + 1) % 7);
    }, stepDurations[flowStep]);

    return () => clearTimeout(timer);
  }, [flowStep]);

  return (
    <div className="relative max-w-6xl mx-auto py-4 select-none overflow-visible">
      {/* CSS Styles for magnetic connection flow animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flow-horizontal-left {
            0% { left: 0%; opacity: 0; }
            5% { opacity: 1; }
            45% { opacity: 1; }
            50% { left: 100%; opacity: 0; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes flow-horizontal-right {
            0% { left: 0%; opacity: 0; }
            50% { left: 0%; opacity: 0; }
            55% { opacity: 1; }
            95% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
        `
      }} />

      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full overflow-visible gap-4 lg:gap-0">
        
        {/* Left Column: Registry.ts (Registry 35%) */}
        <div className="w-full lg:w-[35%] p-4 rounded-xl border border-border/20 bg-slate-950/40 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] shrink-0 transition-all duration-300">
          <div className="mb-2 pl-1 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500/80 font-extrabold">registry.ts</span>
            <span className="text-[9px] font-mono text-muted-foreground/40">Registry Schema</span>
          </div>
          <div className="border border-border/15 rounded-lg overflow-hidden bg-slate-950/90">
            <PrismCodeBlock 
              code={REGISTRY_CODE} 
              filename="registry.ts" 
              className="flex-1 font-mono text-[12px] leading-normal" 
              showLineNumbers={false}
              hideHeader={true}
            />
          </div>
        </div>

        {/* Desktop Connector Line 1: Registry -> Runtime */}
        <div 
          className={`hidden lg:block flex-grow h-[1.5px] transition-all duration-300 relative z-10 ${
            flowStep === 0 || flowStep === 1
              ? "bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.35)]"
              : "bg-slate-800"
          }`}
        >
          {/* Laser Particle */}
          {flowStep === 0 && (
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.4)] z-20"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Mobile Connector Line 1: Registry -> Runtime */}
        <div className="lg:hidden h-[30px] w-[1.5px] bg-slate-800 relative z-10 my-1">
          {flowStep === 0 && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.4)] z-20"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Center Card: PW-Core Runtime Engine (Runtime 18% width / min-w-210px) */}
        <div className="relative w-full lg:w-[18%] lg:min-w-[210px] p-6 rounded-xl border border-border/20 bg-slate-900/90 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.7)] shrink-0 z-25">
          
          {/* Subtle Glow Behind Runtime Engine during active compile stages */}
          {flowStep >= 1 && flowStep <= 4 && (
            <div className="absolute inset-0 bg-amber-500/5 rounded-xl filter blur-lg -z-10 animate-pulse" />
          )}

          {/* Accent Header */}
          <div className="text-center pb-2.5 border-b border-border/20 mb-4">
            <span className="text-[10px] tracking-[0.12em] font-mono font-extrabold text-amber-500 block uppercase">
              PW-CORE RUNTIME
            </span>
          </div>

          {/* Vertical Pipeline Compiler Sequence */}
          <div className="relative flex flex-col gap-3 select-none font-mono text-[10px] w-full px-1">
            
            {/* Vertical Connector Line connecting indicators 1, 2, 3, and 4 */}
            <div className="absolute left-[12px] top-[8px] bottom-[8px] w-[1.5px] bg-slate-800 z-0">
              <div 
                className="w-full bg-amber-500 transition-all duration-300"
                style={{
                  height: flowStep >= 4 ? "100%" : flowStep === 3 ? "68%" : flowStep === 2 ? "34%" : "0%"
                }}
              />
            </div>

            {[
              { text: "Parse Registry", step: 1 },
              { text: "Generate Pages", step: 2 },
              { text: "Create Fixtures", step: 3 },
              { text: "Extend Test", step: 4 }
            ].map((item, idx) => {
              const isActive = flowStep === item.step;
              const isCompleted = flowStep > item.step;
              return (
                <div key={idx} className="flex items-center gap-3 w-full py-0.5 relative z-10">
                  {/* Circular Completion Indicator on Left */}
                  <span 
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                      isActive 
                        ? "bg-amber-500/10 border-amber-400 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)] scale-110" 
                        : isCompleted
                          ? "bg-amber-500 border-amber-400 text-slate-950"
                          : "bg-slate-950 border-slate-800 text-slate-700"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-2.5 h-2.5 stroke-[3.5px] stroke-current" fill="none" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <span 
                    className={`font-mono text-[10px] font-bold transition-all duration-300 leading-none ${
                      isActive 
                        ? "text-amber-300 scale-[1.02]" 
                        : isCompleted
                          ? "text-amber-400"
                          : "text-slate-500"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Connector Line 2: Runtime -> Login.test.ts */}
        <div 
          className={`hidden lg:block flex-grow h-[1.5px] transition-all duration-300 relative z-10 ${
            flowStep === 5 || flowStep === 6
              ? "bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.35)]"
              : "bg-slate-800"
          }`}
        >
          {/* Laser Particle */}
          {flowStep === 5 && (
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.4)] z-20"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Mobile Connector Line 2: Runtime -> Test */}
        <div className="lg:hidden h-[30px] w-[1.5px] bg-slate-800 relative z-10 my-1">
          {flowStep === 5 && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.4)] z-20"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Right Column: Login.test.ts (Test 35%) */}
        <div className="w-full lg:w-[35%] p-4 rounded-xl border border-border/20 bg-slate-950/40 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] shrink-0 transition-all duration-300">
          <div className="mb-2 pl-1 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500/80 font-extrabold">login.test.ts</span>
            <span className="text-[9px] font-mono text-muted-foreground/40">Generated Fixtures Test</span>
          </div>
          <div className="border border-border/15 rounded-lg overflow-hidden bg-slate-950/90">
            <PrismCodeBlock 
              code={TEST_CODE} 
              filename="login.test.ts" 
              className="flex-1 font-mono text-[12px] leading-normal" 
              showLineNumbers={false}
              hideHeader={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
