import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { SECTIONS, SectionData, CodeHighlight } from "../docs/RuntimeFixturesData";

export default function RuntimeFixturesSection() {
  const [activeSectionId, setActiveSectionId] = useState<number>(1);
  const [hoveredHighlightId, setHoveredHighlightId] = useState<string | null>(null);
  const [copiedSectionId, setCopiedSectionId] = useState<number | null>(null);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll listener to set active section based on proximity to viewport vertical center
  useEffect(() => {
    const handleScroll = () => {
      let closestId = 1;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      sectionRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            const id = Number(ref.getAttribute("data-section-id"));
            if (id) {
              closestId = id;
            }
          }
        }
      });
      setActiveSectionId(closestId);
    };

    window.addEventListener("scroll", handleScroll, true);
    // Initial call to set active section on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const handleCopy = (code: string, secId: number) => {
    navigator.clipboard.writeText(code.trim());
    setCopiedSectionId(secId);
    setTimeout(() => setCopiedSectionId(null), 2000);
  };

  return (
    <div className="flex flex-col text-left">

      {SECTIONS.map((sec, idx) => {
        const isActive = sec.id === activeSectionId;

        // Determine active highlight for this section (hover takes precedence)
        const currentHighlightId = (hoveredHighlightId && sec.highlights.some(h => h.id === hoveredHighlightId))
          ? hoveredHighlightId
          : sec.highlights[0]?.id || "";

        const currentHighlight = sec.highlights.find((h) => h.id === currentHighlightId) || sec.highlights[0] || null;
        const highlightedLines = currentHighlight ? currentHighlight.lines : [];

        return (
          <div
            key={sec.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-section-id={sec.id}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 items-start py-8 border-b border-white/5 last:border-b-0 transition-opacity duration-200 ease-in-out",
              isActive ? "opacity-100" : "opacity-30"
            )}
          >
            {/* Left: Code Block & Header */}
            <div className="flex flex-col gap-4">

              {/* Header */}
              <div className="space-y-0.5 select-none">
                <h3 className="text-xl font-bold text-slate-100 tracking-tight font-sans">
                  {sec.heading}
                </h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed max-w-[600px]">
                  {sec.subtitle}
                </p>
              </div>

              {/* Code Editor */}
              <div
                className="rounded-xl overflow-hidden flex flex-col bg-[#181818]/40 border border-white/5 backdrop-blur-sm relative"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02)"
                }}
              >
                {/* Control bar */}
                <div className="flex items-center gap-2.5 px-4 py-2 border-b border-white/5 bg-[#121212]/45">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f57]/80" />
                    <span className="w-2 h-2 rounded-full bg-[#febc2e]/80" />
                    <span className="w-2 h-2 rounded-full bg-[#28c840]/80" />
                  </div>
                  <span className="flex-1 text-center text-[9px] uppercase font-bold tracking-widest text-slate-500 select-none font-mono">
                    tests/runtime.ts
                  </span>

                  <button
                    onClick={() => handleCopy(sec.code, sec.id)}
                    className="text-[9px] font-mono transition-colors duration-150 px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400 hover:text-amber-500 hover:bg-white/10 hover:border-white/10 focus:outline-none"
                  >
                    {copiedSectionId === sec.id ? "copied!" : "copy"}
                  </button>
                </div>

                {/* Code viewport */}
                <div className="p-4 bg-black/30 font-mono text-[11px] leading-relaxed select-text">
                  <Highlight theme={themes.vsDark} code={sec.code.trim()} language="typescript">
                    {({ tokens, getLineProps, getTokenProps }) => (
                      <pre style={{ margin: 0 }}>
                        {tokens.map((line, i) => {
                          const lineNum = i + 1;
                          const isLineFocused = isActive && highlightedLines.includes(lineNum);

                          // Selection and hover classes
                          const isHoverActive = isLineFocused && hoveredHighlightId !== null;
                          const isSelectionActive = isLineFocused && hoveredHighlightId === null;

                          const lineProps = getLineProps({ line, key: i });
                          return (
                            <div
                              key={i}
                              {...lineProps}
                              onMouseEnter={() => {
                                if (isActive) {
                                  const match = sec.highlights.find((h) => h.lines.includes(lineNum));
                                  if (match) setHoveredHighlightId(match.id);
                                }
                              }}
                              onMouseLeave={() => setHoveredHighlightId(null)}
                              className={cn(
                                "flex items-start transition-all duration-150 relative px-3 py-0.5 rounded-none cursor-pointer",
                                isActive
                                  ? (isSelectionActive
                                    ? "bg-amber-500/8 text-slate-100 shadow-[inset_3px_0_0_#f59e0b] opacity-100"
                                    : isHoverActive
                                      ? "bg-amber-500/5 text-slate-200 shadow-[inset_2px_0_0_rgba(245,158,11,0.6)] opacity-85"
                                      : "opacity-45 grayscale-[10%]"
                                  )
                                  : "opacity-40"
                              )}
                            >
                              <span
                                className={cn(
                                  "line-number inline-block text-right select-none mr-4 shrink-0 transition-colors duration-150 text-slate-600",
                                  isLineFocused && isActive && "text-amber-500/90 font-bold"
                                )}
                                style={{ minWidth: "2.5ch" }}
                              >
                                {lineNum}
                              </span>
                              <span className="flex-1 whitespace-pre">
                                {line.map((token, key) => {
                                  const tokenProps = getTokenProps({ token, key });
                                  return <span key={key} {...tokenProps} />;
                                })}
                              </span>
                            </div>
                          );
                        })}
                      </pre>
                    )}
                  </Highlight>
                </div>

                {/* Code explanation box */}
                <div className="border-t border-white/5 bg-[#121212]/30 p-3 px-4 min-h-[58px] flex items-center justify-between">
                  <div className="space-y-1 font-sans">
                    <span className="text-[8.5px] font-bold text-amber-500/85 uppercase tracking-widest block leading-none">
                      Why this code matters
                    </span>
                    <div className="text-[11px] text-slate-300 leading-relaxed max-w-[540px]">
                      {currentHighlight ? (
                        <div className="flex items-start gap-1.5 transition-opacity duration-150">
                          <span className="text-amber-500/70 select-none">•</span>
                          <span>{currentHighlight.explanation}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">Hover code lines to explore annotations.</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Concept Card & Practical Takeaways */}
            <div className="flex flex-col gap-3 lg:mt-[44px] h-full font-sans select-none">

              {/* Concept */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">
                  Concept
                </span>

                <div
                  className={cn(
                    "relative bg-[#0b0b0c]/30 border rounded-xl p-3.5 pl-4 transition-all duration-200 flex flex-col justify-center overflow-hidden min-h-[64px]",
                    isActive
                      ? "border-amber-500/20 bg-[#161619]/60 shadow-[0_2px_10px_rgba(245,158,11,0.04)]"
                      : "border-white/5"
                  )}
                >
                  {/* Left accent indicator */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-[2px] bg-amber-500 transition-transform duration-200 origin-left scale-y-0",
                      isActive && "scale-y-100"
                    )}
                  />

                  <h4 className={cn(
                    "text-[12px] font-bold flex items-center gap-1.5 leading-none mb-1 transition-colors duration-200",
                    isActive ? "text-slate-200" : "text-slate-400"
                  )}>
                    <span className={cn(
                      "text-[11px] transition-colors duration-200",
                      isActive ? "text-amber-500" : "text-slate-500"
                    )}>
                      ✓
                    </span>
                    <span>{sec.conceptTitle}</span>
                  </h4>
                  <div className="text-[10.5px] text-[#94A3B8] leading-relaxed">
                    {sec.conceptSummary}
                  </div>
                </div>
              </div>

              {/* Takeaways */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">
                  Practical Takeaways
                </span>
                <div className="bg-amber-500/[0.01] border border-white/5 rounded-xl p-3.5 space-y-2">
                  <ul className="space-y-1.5 m-0 p-0 list-none">
                    {sec.bottomExplanations.map((line, idx) => (
                      <li key={idx} className="text-[10.5px] text-slate-300 flex items-start gap-2 leading-tight">
                        <span className="text-amber-500 select-none text-[8px] mt-0.5">▪</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
