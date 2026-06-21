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
  const [activeId, setActiveId] = React.useState<string>(sections[0]?.id || "");
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      setIsAtBottom(atBottom);

      if (atBottom && sections.length > 0) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const targetOffset = 150;
      let closestId = "";
      let minDistance = Infinity;
      let foundCovering = false;

      sections.forEach((sec) => {
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
      }
    };

    // Run once on mount/update to set initial active state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections]);

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Smooth scroll with offset accounted for by CSS scroll-margin-top
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <div className="relative max-w-[1440px] w-full mx-auto px-4 md:px-8 py-0 flex gap-8 items-start">
      {/* Left Thread Navigation (Sticky sidebar) */}
      <aside className="hidden lg:block w-64 shrink-0 self-stretch">
        <div className="sticky top-20 pl-4 select-none h-[calc(100vh-80px)] flex flex-col justify-center">
          {/* Thread rail wrapper - stretched vertically to spread nodes */}
          <div className="relative pl-6 flex flex-col justify-between py-6 max-h-[60vh] min-h-[380px]">
            {/* Thread Line - Spacing above/below aligned to first/last dot centers */}
            <div className="absolute left-[6px] top-[31px] bottom-[31px] w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />
            
            {/* Active Thread Highlight Line */}
            {activeIndex !== -1 && (
              <div
                className="absolute left-[6px] top-[31px] w-[2px] bg-gradient-to-b from-amber-500 to-orange-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                style={{
                  height: activeIndex <= 0 ? "0px" : `calc((100% - 62px) * ${activeIndex / (sections.length - 1)})`,
                }}
              />
            )}

            {sections.map((sec, idx) => {
              const isActive = sec.id === activeId;
              const isSub = (sec as any).isSub;
              const isCompleted = idx < activeIndex || (isAtBottom && idx === sections.length - 1);
              return (
                <div
                  key={sec.id}
                  onClick={() => handleNodeClick(sec.id)}
                  className={`flex items-center gap-3 cursor-pointer group py-1.5 transition-all ${isSub ? "pl-4" : ""}`}
                >
                  {/* Node Dot indicator */}
                  <div className="relative flex items-center justify-center w-[14px] h-[14px] -ml-[24px] bg-background z-10">
                    {isCompleted ? (
                      isSub ? (
                        <div
                          className="rounded-full bg-amber-500 transition-all duration-300"
                          style={{ width: "5px", height: "5px" }}
                        />
                      ) : (
                        <div
                          className="w-[14px] h-[14px] rounded-full bg-amber-500 flex items-center justify-center text-slate-950 transition-all duration-300"
                        >
                          <svg className="w-2.5 h-2.5 stroke-[3.5px] stroke-current" fill="none" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )
                    ) : isActive ? (
                      <div
                        className="rounded-full bg-amber-500 animate-smooth-pulse transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        style={{
                          width: isSub ? "5px" : "9px",
                          height: isSub ? "5px" : "9px",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 transition-all duration-300"
                        style={{
                          width: isSub ? "5px" : "9px",
                          height: isSub ? "5px" : "9px",
                        }}
                      />
                    )}
                  </div>

                  {/* Section Label */}
                  <span
                    className={`transition-all duration-300 origin-left select-none ${
                      isSub ? "text-[10px]" : "text-xs font-bold"
                    } ${
                      isActive
                        ? "text-amber-500 dark:text-amber-400 scale-110 translate-x-1.5 font-bold"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                    }`}
                  >
                    {sec.label}
                  </span>
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
