import { useMemo, useEffect } from "react";
import { useHeader } from "@/lib/HeaderContext";
import { docsSectionsData, type DocSection } from "@/constants/docsNavigation";
import { useHashSection } from "@/hooks/useHashSection";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { DocsSidebar } from "@/components/navigation/DocsSidebar";
import { PreviousNext } from "@/components/navigation/PreviousNext";
import { DocSectionRenderer } from "@/components/sections/DocSectionRenderer";
import { K6DocsPlaceholder } from "@/components/feedback/K6DocsPlaceholder";
import CodegenHeaderGrid from "@/components/sections/CodegenHeaderGrid";
import RuntimeFixturesFlow from "@/components/sections/RuntimeFixturesFlow";

export interface DocsPageProps {
  isEmbedded?: boolean;
}

export default function DocsPage({ isEmbedded = false }: DocsPageProps) {
  const { activeHeader } = useHeader();
  const sectionIds = useMemo(() => docsSectionsData.map((s) => s.id), []);
  const [activeSectionId, selectSection] = useHashSection(sectionIds, "installation");

  // Scroll the main content area to top when active section changes
  useEffect(() => {
    const scrollToTop = () => {
      const mainElements = document.querySelectorAll("main");
      mainElements.forEach((el) => {
        el.scrollTop = 0;
      });
    };

    scrollToTop();
    const rafHandle = requestAnimationFrame(scrollToTop);
    const timeoutHandle = setTimeout(scrollToTop, 50);

    return () => {
      cancelAnimationFrame(rafHandle);
      clearTimeout(timeoutHandle);
    };
  }, [activeSectionId]);

  const groups = useMemo(
    () =>
      docsSectionsData.reduce(
        (acc, section) => {
          const label = section.label;
          if (!acc[label]) acc[label] = [];
          acc[label].push(section);
          return acc;
        },
        {} as Record<string, DocSection[]>
      ),
    []
  );

  const activeSection =
    docsSectionsData.find((s) => s.id === activeSectionId) || docsSectionsData[0];

  if (activeHeader === "k6-core") {
    return <K6DocsPlaceholder />;
  }

  return (
    <DocsLayout
      embedded={isEmbedded}
      sidebar={
        <DocsSidebar
          groups={groups}
          activeSectionId={activeSectionId}
          onSelectSection={selectSection}
        />
      }
      footer={
        !isEmbedded ? (
          <PreviousNext
            // prevLink={activeSection.prevLink}
            nextLink={activeSection.nextLink}
            onNavigate={selectSection}
          />
        ) : undefined
      }
    >
      {/* Centralized Page Header with strict vertical rhythm */}
      <div className="pt-3 pb-1 select-none shrink-0 text-left border-b border-white/5 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-amber-500 block mb-1.5 leading-none">
            {activeSection.label}
          </span>
          <h1 className="text-[32px] font-bold leading-[1.05] tracking-tight text-slate-100 font-sans mb-2">
            {activeSection.title}
          </h1>
          {activeSection.description && (
            <p className="text-[14px] text-[#94A3B8] font-normal leading-relaxed max-w-[650px] mt-0">
              {activeSection.description}
            </p>
          )}
        </div>
        {activeSection.id === "pw-core-codegen" && (
          <div className="shrink-0 w-full md:w-auto mt-2">
            <CodegenHeaderGrid />
          </div>
        )}
        {activeSection.id === "test-runtime" && (
          <div className="shrink-0 w-full md:w-auto mt-2">
            <RuntimeFixturesFlow />
          </div>
        )}
      </div>

      <DocSectionRenderer section={activeSection} />
    </DocsLayout>
  );
}
