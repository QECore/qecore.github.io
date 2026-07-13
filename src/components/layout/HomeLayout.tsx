import type { ReactNode } from "react";
import { Container } from "./Container";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export interface HomeSectionNavItem {
  id: string;
  label: string;
  isSub?: boolean;
}

export interface HomeLayoutProps {
  sections: HomeSectionNavItem[];
  children: ReactNode;
}

export function HomeLayout({ sections, children }: HomeLayoutProps) {
  const { activeId, isAtBottom, scrollToSection } = useScrollSpy(sections);
  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <Container
      width="full"
      padding="lg"
      className="relative py-0 flex gap-8 items-start"
    >
      <aside className="hidden lg:block w-64 shrink-0 self-stretch">
        <div className="sticky top-20 pl-4 select-none h-[calc(100vh-80px)] flex flex-col justify-center">
          <div className="relative pl-6 flex flex-col justify-between py-6 max-h-[60vh] min-h-[380px]">
            <div className="absolute left-[6px] top-[31px] bottom-[31px] w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />

            {activeIndex !== -1 && (
              <div
                className="absolute left-[6px] top-[31px] w-[2px] bg-gradient-to-b from-amber-500 to-orange-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                style={{
                  height:
                    activeIndex <= 0
                      ? "0px"
                      : `calc((100% - 62px) * ${activeIndex / (sections.length - 1)})`,
                }}
              />
            )}

            {sections.map((sec, idx) => {
              const isActive = sec.id === activeId;
              const isCompleted =
                idx < activeIndex ||
                (isAtBottom && idx === sections.length - 1);

              return (
                <div
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex items-center gap-3 cursor-pointer group py-1.5 transition-all ${sec.isSub ? "pl-4" : ""}`}
                >
                  <div className="relative flex items-center justify-center w-[14px] h-[14px] -ml-[24px]  z-10">
                    {isCompleted ? (
                      sec.isSub ? (
                        <div className="rounded-full bg-amber-500 transition-all duration-300 w-[5px] h-[5px]" />
                      ) : (
                        <div className="w-[14px] h-[14px] rounded-full bg-amber-500 flex items-center justify-center text-slate-950 transition-all duration-300">
                          <svg
                            className="w-2.5 h-2.5 stroke-[3.5px] stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )
                    ) : isActive ? (
                      <div
                        className="rounded-full bg-amber-500 animate-smooth-pulse transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        style={{
                          width: sec.isSub ? "5px" : "9px",
                          height: sec.isSub ? "5px" : "9px",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 transition-all duration-300"
                        style={{
                          width: sec.isSub ? "5px" : "9px",
                          height: sec.isSub ? "5px" : "9px",
                        }}
                      />
                    )}
                  </div>

                  <span
                    className={`transition-all duration-300 origin-left select-none ${
                      sec.isSub ? "text-[10px]" : "text-xs font-bold"
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

      <div className="flex-1 min-w-0 pt-8 pb-12">{children}</div>
    </Container>
  );
}
