import { useEffect, useState } from "react";

interface ScrollSpySection {
  id: string;
}

export function useScrollSpy(sections: ScrollSpySection[], targetOffset = 150) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle URL hash on initial load
  useEffect(() => {
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      const hasSection = sections.some((s) => s.id === initialHash);
      if (hasSection) {
        const timer = setTimeout(() => {
          document.getElementById(initialHash)?.scrollIntoView({ behavior: "auto", block: "start" });
          setIsInitialized(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
    setIsInitialized(true);
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70;
      setIsAtBottom(atBottom);

      if (atBottom && sections.length > 0) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let closestId = "";
      let minDistance = Infinity;
      let foundCovering = false;

      sections.forEach((sec) => {
        if (foundCovering) return;
        const el = document.getElementById(sec.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top <= targetOffset && rect.bottom >= targetOffset) {
          closestId = sec.id;
          foundCovering = true;
          return;
        }

        const distance = Math.abs(rect.top - targetOffset);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = sec.id;
        }
      });

      if (closestId) setActiveId(closestId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections, targetOffset]);

  // Update URL hash dynamically as activeId changes
  useEffect(() => {
    if (isInitialized && activeId) {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash !== activeId) {
        const newUrl = `${window.location.pathname}${window.location.search}#${activeId}`;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [activeId, isInitialized]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { activeId, isAtBottom, scrollToSection };
}
