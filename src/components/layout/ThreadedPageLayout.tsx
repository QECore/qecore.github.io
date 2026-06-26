import * as React from "react";

interface Section {
  id: string;
  label: string;
}

interface ThreadedPageLayoutProps {
  sections: Section[];
  children: React.ReactNode;
}

export default function ThreadedPageLayout({ sections, children }: ThreadedPageLayoutProps) {
  const [activeId, setActiveId] = React.useState<string>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sections.some(s => s.id === hash)) {
      return hash;
    }
    return sections[0]?.id || "";
  });
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  
  const [dotCoords, setDotCoords] = React.useState<{ x: number; y: number }[]>([]);
  const [activeDotIndex, setActiveDotIndex] = React.useState<number>(-1);

  const isClickScrolling = React.useRef(false);
  const clickScrollTimeout = React.useRef<any>(null);
  const hashUpdateTimeout = React.useRef<any>(null);

  // Scroll to hash on mount
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
    return () => {
      if (hashUpdateTimeout.current) clearTimeout(hashUpdateTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      setIsAtBottom(atBottom);

      if (atBottom && sections.length > 0) {
        const lastId = sections[sections.length - 1].id;
        setActiveId(lastId);
        if (hashUpdateTimeout.current) clearTimeout(hashUpdateTimeout.current);
        hashUpdateTimeout.current = setTimeout(() => {
          if (window.location.hash.replace("#", "") !== lastId) {
            window.history.replaceState(null, "", `#${lastId}`);
          }
        }, 150);
        return;
      }

      // Target offset is set to exactly the center of the viewport
      const targetOffset = window.innerHeight / 2;
      let closestId = "";
      let minDistance = Infinity;
      let foundCovering = false;

      // Scan sections in reverse order so nested/sub-sections are evaluated before their parent container
      sections.slice().reverse().forEach((sec) => {
        if (foundCovering) return;
        const el = document.getElementById(sec.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        
        // If the section covers the target offset line, it is active
        if (rect.top <= targetOffset && rect.bottom >= targetOffset) {
          closestId = sec.id;
          foundCovering = true;
          return;
        }

        // Fallback: Calculate the absolute distance of the section's top from the target offset line
        const distance = Math.abs(rect.top - targetOffset);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = sec.id;
        }
      });

      if (closestId) {
        setActiveId(closestId);
        
        // Debounce URL hash updates to prevent synchronous scroll lag
        if (hashUpdateTimeout.current) clearTimeout(hashUpdateTimeout.current);
        hashUpdateTimeout.current = setTimeout(() => {
          if (window.location.hash.replace("#", "") !== closestId) {
            window.history.replaceState(null, "", `#${closestId}`);
          }
        }, 150);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);
      if (hashUpdateTimeout.current) clearTimeout(hashUpdateTimeout.current);
    };
  }, [sections]);

  const activeVisibleIndex = sections.findIndex((s) => s.id === activeId);

  React.useEffect(() => {
    const updateLineHeights = () => {
      if (!sidebarRef.current) return;
      const dots = sidebarRef.current.querySelectorAll(".dot-container");
      if (dots.length === 0) {
        setDotCoords([]);
        setActiveDotIndex(-1);
        return;
      }
      
      const coords = Array.from(dots).map((dotNode) => {
        const dot = dotNode as HTMLElement;
        return {
          x: dot.offsetLeft + dot.offsetWidth / 2,
          y: dot.offsetTop + dot.offsetHeight / 2,
        };
      });
      setDotCoords(coords);

      const activeDot = sidebarRef.current.querySelector(".dot-container[data-active='true']") as HTMLElement;
      if (activeDot) {
        const activeIndex = Array.from(dots).indexOf(activeDot);
        setActiveDotIndex(activeIndex);
      } else {
        // If active element is a sub-section, highlight up to its parent's dot!
        const activeSection = sections.find((s) => s.id === activeId);
        if (activeSection && (activeSection as any).isSub) {
          const parentId = (activeSection as any).parentId;
          const parentDot = sidebarRef.current.querySelector(`.dot-container[data-parent-id='${parentId}']`) as HTMLElement;
          if (parentDot) {
            const parentIndex = Array.from(dots).indexOf(parentDot);
            setActiveDotIndex(parentIndex);
            return;
          }
        }
        setActiveDotIndex(-1);
      }
    };

    updateLineHeights();

    const resizeObserver = new ResizeObserver(updateLineHeights);
    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }
    
    const mutationObserver = new MutationObserver(updateLineHeights);
    if (sidebarRef.current) {
      mutationObserver.observe(sidebarRef.current, { childList: true, subtree: true });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeId, sections]);

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isClickScrolling.current = true;
      if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);

      setActiveId(id);
      window.history.replaceState(null, "", `#${id}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      clickScrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    }
  };

  const mainSections = sections.filter((sec) => !(sec as any).isSub);
  const origActiveIdx = sections.findIndex(s => s.id === activeId);

  return (
    <div className="relative max-w-[1440px] w-full mx-auto px-4 md:px-8 py-0 flex gap-8 items-start">
      {/* Left Thread Navigation (Sticky sidebar) */}
      <aside className="hidden lg:block w-64 shrink-0 self-stretch">
        <div className="sticky top-20 pl-4 select-none h-[calc(100vh-80px)] flex flex-col justify-center">
          {/* Thread rail wrapper - stable layout to prevent top items from shifting */}
          <div 
            ref={sidebarRef} 
            className="relative pl-6 flex flex-col justify-start gap-[4.5vh] py-6 max-h-[80vh] overflow-y-visible"
          >
            {/* Dynamic Thread Line SVG */}
            {dotCoords.length > 1 && (
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <defs>
                  <linearGradient id="active-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                
                {/* Background Thread Line (Clean straight vertical line) */}
                <path
                  d={dotCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ")}
                  fill="none"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Active Thread Highlight Line */}
                {activeDotIndex !== -1 && (
                  <path
                    d={dotCoords.slice(0, activeDotIndex + 1).map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ")}
                    fill="none"
                    stroke="url(#active-line-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                  />
                )}
              </svg>
            )}

            {mainSections.map((sec) => {
              const subSections = sections.filter((s) => (s as any).parentId === sec.id);
              const isParentActive = sec.id === activeId;
              
              const isMainCompleted = (() => {
                const origMainIdx = sections.findIndex(s => s.id === sec.id);
                if (origMainIdx === -1) return false;
                if (isAtBottom && origMainIdx === sections.length - 1) return true;
                
                // If it has sub-sections, it is only completed when origActiveIdx is PAST the last sub-section
                if (subSections.length > 0) {
                  const maxSubIdx = Math.max(
                    ...subSections.map(sub => sections.findIndex(s => s.id === sub.id))
                  );
                  return origActiveIdx > maxSubIdx;
                }
                
                return origMainIdx < origActiveIdx;
              })();

              const hasSubs = subSections.length > 0;
              const isAnySubActive = subSections.some((s) => s.id === activeId);

              return (
                <div key={sec.id} className="flex flex-col gap-0">
                  {/* Main section item */}
                  <div
                    onClick={() => handleNodeClick(sec.id)}
                    className="flex items-center gap-3 cursor-pointer group py-1.5 transition-all"
                  >
                    {/* Dot Container (Rendered ONLY for main items) */}
                    <div 
                      className="dot-container relative flex items-center justify-center w-[14px] h-[14px] -ml-[24px] bg-background z-10"
                      data-active={isParentActive}
                      data-parent-id={sec.id}
                    >
                      {isMainCompleted ? (
                        <div className="w-[14px] h-[14px] rounded-full bg-amber-500 flex items-center justify-center text-slate-950 transition-all duration-300">
                          <svg className="w-2.5 h-2.5 stroke-[3.5px] stroke-current" fill="none" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : isParentActive || isAnySubActive ? (
                        <div className="w-[9px] h-[9px] rounded-full bg-amber-500 animate-smooth-pulse transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      ) : (
                        <div className="w-[9px] h-[9px] rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 transition-all duration-300" />
                      )}
                    </div>

                    <span
                      className={`transition-all duration-300 origin-left select-none text-xs font-bold flex items-center ${
                        isParentActive || isAnySubActive
                          ? "text-amber-500 dark:text-amber-400 scale-110 translate-x-1.5 font-bold"
                          : "text-muted-foreground/60 group-hover:text-foreground"
                      }`}
                    >
                      {sec.label}
                      {hasSubs && (
                        <span className="ml-2 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-muted-foreground/80 rounded-full border border-slate-200/50 dark:border-slate-700/50 animate-smooth-pulse">
                          {subSections.length}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Sub sections collapsible container (GPU-accelerated CSS Grid transition - ALWAYS OPEN) */}
                  {hasSubs && (
                    <div 
                      className="grid transition-all duration-300 ease-in-out grid-rows-[1fr] opacity-100 mt-[2vh] mb-[-1.5vh]"
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-[1.5vh] pl-1 pb-[0.5vh]">
                          {subSections.map((subSec, subIdx) => {
                            const isSubActive = subSec.id === activeId;

                            return (
                              <div
                                key={subSec.id}
                                onClick={() => handleNodeClick(subSec.id)}
                                className="flex items-center gap-2 cursor-pointer group py-1 transition-all pl-1.5"
                              >
                                <span
                                  className={`transition-all duration-300 origin-left select-none text-[11px] flex items-center ${
                                    isSubActive
                                      ? "text-amber-500 dark:text-amber-400 scale-105 translate-x-1 font-bold"
                                      : "text-muted-foreground/50 group-hover:text-foreground"
                                  }`}
                                >
                                  <span className="font-mono text-[9px] mr-2 opacity-60">0{subIdx + 1}.</span>
                                  {subSec.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pt-8 pb-12">
        {children}
      </div>
    </div>
  );
}
