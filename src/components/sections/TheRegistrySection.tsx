import React, { useState, useMemo, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";

const registryCode = `import { createPageRegistry } from "pw-core/page";

export const test = createPageRegistry({
  home: {
    url: "/",                          // Navigation
    heading: ["Welcome"],              // Semantic locator
  },

  login: {
    url: "/login",                     // Navigation
    textbox: ["username"],             // Semantic locator
    button: ["Sign In"],               // Semantic locator
    testId: { profile: "profile-card" } // Fallback locator
  }
});`;

type HighlightCategory = "navigation" | "semantic" | "fallback" | "best-practices" | null;

interface InfoCardProps {
  icon: string;
  title: string;
  description: React.ReactNode;
  category: HighlightCategory;
  hoveredCategory: HighlightCategory;
  onHover: (category: HighlightCategory) => void;
}

const InfoCard = React.memo(({ icon, title, description, category, hoveredCategory, onHover }: InfoCardProps) => {
  const isActive = hoveredCategory === category;

  return (
    <div
      onMouseEnter={() => onHover(category)}
      onMouseLeave={() => onHover(null)}
      className={`relative bg-[#0b0b0c]/50 border rounded-xl p-3.5 pl-5 transition-all duration-200 cursor-default select-none flex flex-col justify-center overflow-hidden
        ${isActive
          ? "border-amber-500/40 bg-[#161619]/90 shadow-[0_4px_20px_rgba(245,158,11,0.08)] -translate-y-0.5"
          : "border-white/5 hover:border-white/10"
        }`}
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-amber-500 rounded-r-full transition-all duration-200 origin-left
          ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
      />

      <h4 className={`text-[12.5px] font-bold flex items-center gap-2 font-sans leading-none mb-1.5 transition-colors duration-200
        ${isActive ? "text-white" : "text-slate-200"}`}
      >
        <span className={`text-[14px] shrink-0 transition-all duration-200 
          ${isActive ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] scale-110" : ""}`}
        >
          {icon}
        </span>
        <span>{title}</span>
      </h4>
      <div className="text-[11px] text-[#94A3B8] font-sans leading-relaxed font-normal">
        {description}
      </div>
    </div>
  );
});

// Memoized static code block that never updates JS-side on hover
const StaticCodeBlock = React.memo(({
  code,
  language,
  onLineEnter
}: {
  code: string;
  language: string;
  onLineEnter: (lineNum: number) => void;
}) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre style={{ margin: 0 }}>
          {tokens.map((line, i) => {
            const lineNum = i + 1;
            const lineProps = getLineProps({ line, key: i });
            return (
              <div
                key={i}
                {...lineProps}
                onMouseEnter={() => onLineEnter(lineNum)}
                className="code-line flex items-start transition-[opacity,background-color] duration-200 relative px-2 py-0.5 rounded-none cursor-pointer"
                data-line-num={lineNum}
              >
                {/* Left amber gutter marker inside highlighted row */}
                <div className="gutter-marker absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-none origin-left scale-x-0 transition-transform duration-200" />

                <span
                  className="line-number inline-block text-right select-none mr-4 shrink-0 transition-colors duration-200 text-slate-600"
                  style={{ minWidth: "2.5ch" }}
                >
                  {lineNum}
                </span>
                <span className="flex-1 whitespace-pre">
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key });
                    if (token.types.includes("comment")) {
                      tokenProps.className = `${tokenProps.className || ""} token-comment`;
                      tokenProps.style = { ...tokenProps.style, color: "#94a3b8" };
                    }
                    return <span key={key} {...tokenProps} />;
                  })}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
});

export default function TheRegistrySection() {
  const [hoveredCategory, setHoveredCategory] = useState<HighlightCategory>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeHovered, setIsCodeHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(registryCode.trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLineMouseEnter = useCallback((lineIndex: number) => {
    let nextCategory: HighlightCategory = null;
    if (lineIndex === 5 || lineIndex === 10) {
      nextCategory = "navigation";
    } else if (lineIndex === 6 || lineIndex === 11 || lineIndex === 12) {
      nextCategory = "semantic";
    } else if (lineIndex === 13) {
      nextCategory = "fallback";
    } else if ((lineIndex >= 4 && lineIndex <= 7) || (lineIndex >= 9 && lineIndex <= 14)) {
      nextCategory = "best-practices";
    }

    setHoveredCategory((prev) => (prev !== nextCategory ? nextCategory : prev));
  }, []);

  const handleCategoryHover = useCallback((category: HighlightCategory) => {
    setHoveredCategory((prev) => (prev !== category ? category : prev));
  }, []);

  return (
    <div className="flex flex-col text-left animate-in fade-in duration-300">
      {/* CSS rules for pure-CSS transitions on code editor highlights */}
      <style>{`
        /* Smooth, premium transitions with custom cubic-bezier curve */
        .code-line {
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 1. NAVIGATION */
        [data-hovered-category="navigation"] [data-line-num="5"],
        [data-hovered-category="navigation"] [data-line-num="10"] {
          background-color: rgba(245, 158, 11, 0.07) !important;
          color: #f8fafc !important;
          box-shadow: inset 3px 0 0 #f59e0b, inset 0 0 12px rgba(245, 158, 11, 0.05);
        }
        [data-hovered-category="navigation"] [data-line-num="5"] .gutter-marker,
        [data-hovered-category="navigation"] [data-line-num="10"] .gutter-marker {
          transform: scaleX(1) !important;
        }
        [data-hovered-category="navigation"] [data-line-num="5"] .line-number,
        [data-hovered-category="navigation"] [data-line-num="10"] .line-number {
          color: rgba(245, 158, 11, 0.9) !important;
          font-weight: bold;
        }
        [data-hovered-category="navigation"] [data-line-num="5"] .token-comment,
        [data-hovered-category="navigation"] [data-line-num="10"] .token-comment {
          color: #fbbf24 !important;
          font-weight: 600 !important;
        }
        [data-hovered-category="navigation"] .code-line:not([data-line-num="5"]):not([data-line-num="10"]) {
          opacity: 0.35 !important;
          filter: grayscale(20%);
        }

        /* 2. SEMANTIC LOCATORS */
        [data-hovered-category="semantic"] [data-line-num="6"],
        [data-hovered-category="semantic"] [data-line-num="11"],
        [data-hovered-category="semantic"] [data-line-num="12"] {
          background-color: rgba(245, 158, 11, 0.07) !important;
          color: #f8fafc !important;
          box-shadow: inset 3px 0 0 #f59e0b, inset 0 0 12px rgba(245, 158, 11, 0.05);
        }
        [data-hovered-category="semantic"] [data-line-num="6"] .gutter-marker,
        [data-hovered-category="semantic"] [data-line-num="11"] .gutter-marker,
        [data-hovered-category="semantic"] [data-line-num="12"] .gutter-marker {
          transform: scaleX(1) !important;
        }
        [data-hovered-category="semantic"] [data-line-num="6"] .line-number,
        [data-hovered-category="semantic"] [data-line-num="11"] .line-number,
        [data-hovered-category="semantic"] [data-line-num="12"] .line-number {
          color: rgba(245, 158, 11, 0.9) !important;
          font-weight: bold;
        }
        [data-hovered-category="semantic"] [data-line-num="6"] .token-comment,
        [data-hovered-category="semantic"] [data-line-num="11"] .token-comment,
        [data-hovered-category="semantic"] [data-line-num="12"] .token-comment {
          color: #fbbf24 !important;
          font-weight: 600 !important;
        }
        [data-hovered-category="semantic"] .code-line:not([data-line-num="6"]):not([data-line-num="11"]):not([data-line-num="12"]) {
          opacity: 0.35 !important;
          filter: grayscale(20%);
        }

        /* 3. FALLBACK LOCATORS */
        [data-hovered-category="fallback"] [data-line-num="13"] {
          background-color: rgba(245, 158, 11, 0.07) !important;
          color: #f8fafc !important;
          box-shadow: inset 3px 0 0 #f59e0b, inset 0 0 12px rgba(245, 158, 11, 0.05);
        }
        [data-hovered-category="fallback"] [data-line-num="13"] .gutter-marker {
          transform: scaleX(1) !important;
        }
        [data-hovered-category="fallback"] [data-line-num="13"] .line-number {
          color: rgba(245, 158, 11, 0.9) !important;
          font-weight: bold;
        }
        [data-hovered-category="fallback"] [data-line-num="13"] .token-comment {
          color: #fbbf24 !important;
          font-weight: 600 !important;
        }
        [data-hovered-category="fallback"] .code-line:not([data-line-num="13"]) {
          opacity: 0.35 !important;
          filter: grayscale(20%);
        }

        /* 4. BEST PRACTICES (Subtle whole object highlight) */
        [data-hovered-category="best-practices"] [data-line-num="4"],
        [data-hovered-category="best-practices"] [data-line-num="5"],
        [data-hovered-category="best-practices"] [data-line-num="6"],
        [data-hovered-category="best-practices"] [data-line-num="7"],
        [data-hovered-category="best-practices"] [data-line-num="9"],
        [data-hovered-category="best-practices"] [data-line-num="10"],
        [data-hovered-category="best-practices"] [data-line-num="11"],
        [data-hovered-category="best-practices"] [data-line-num="12"],
        [data-hovered-category="best-practices"] [data-line-num="13"],
        [data-hovered-category="best-practices"] [data-line-num="14"] {
          background-color: rgba(245, 158, 11, 0.05) !important;
          color: #e2e8f0 !important;
        }
        [data-hovered-category="best-practices"] [data-line-num="4"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="5"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="6"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="7"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="9"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="10"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="11"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="12"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="13"] .gutter-marker,
        [data-hovered-category="best-practices"] [data-line-num="14"] .gutter-marker {
          transform: scaleX(1) !important;
        }
        [data-hovered-category="best-practices"] [data-line-num="4"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="5"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="6"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="7"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="9"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="10"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="11"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="12"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="13"] .line-number,
        [data-hovered-category="best-practices"] [data-line-num="14"] .line-number {
          color: rgba(245, 158, 11, 0.8) !important;
        }
        [data-hovered-category="best-practices"] [data-line-num="5"] .token-comment,
        [data-hovered-category="best-practices"] [data-line-num="6"] .token-comment,
        [data-hovered-category="best-practices"] [data-line-num="10"] .token-comment,
        [data-hovered-category="best-practices"] [data-line-num="11"] .token-comment,
        [data-hovered-category="best-practices"] [data-line-num="12"] .token-comment,
        [data-hovered-category="best-practices"] [data-line-num="13"] .token-comment {
          color: #fbbf24 !important;
        }
        [data-hovered-category="best-practices"] .code-line:not([data-line-num="4"]):not([data-line-num="5"]):not([data-line-num="6"]):not([data-line-num="7"]):not([data-line-num="9"]):not([data-line-num="10"]):not([data-line-num="11"]):not([data-line-num="12"]):not([data-line-num="13"]):not([data-line-num="14"]) {
          opacity: 0.35 !important;
          filter: grayscale(20%);
        }
      `}</style>

      {/* Two-column body fitting within 16:9 viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-stretch overflow-hidden pb-4">

        {/* Left: Interactive Code Block */}
        <div
          className="flex flex-col h-full justify-between"
          onMouseEnter={() => setIsCodeHovered(true)}
          onMouseLeave={() => {
            setIsCodeHovered(false);
            handleCategoryHover(null);
          }}
        >
          {/* Legend above the code aligned to same baseline */}
          <div className="flex items-baseline justify-between mb-2.5 px-1 font-sans select-none">
            <span className="text-[11px] font-semibold text-slate-300">Registry Example</span>
            <span className="text-[10px] text-amber-500/85 font-medium flex items-center gap-1 animate-pulse">
              <span>Hover cards to explore →</span>
            </span>
          </div>

          <div
            className="rounded-xl overflow-hidden flex flex-col h-full bg-[#181818]/40 border border-white/5 backdrop-blur-sm relative"
            style={{
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)"
            }}
            data-hovered-category={hoveredCategory || ""}
          >
            {/* Window controls header bar */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/5 bg-[#121212]/45">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
              </div>
              <span className="flex-1 text-center text-[10px] uppercase font-bold tracking-widest text-slate-500 select-none font-mono">
                registry.ts
              </span>

              {/* Copy button with smooth glass opacity transition */}
              <button
                onClick={handleCopy}
                className="text-[10px] font-mono transition-all duration-200 px-2 py-0.5 rounded border border-white/5 bg-white/5 backdrop-blur-md text-slate-400 opacity-60 hover:opacity-100 hover:text-white hover:bg-white/10 hover:border-white/10 focus:outline-none"
              >
                {isCopied ? "copied!" : "copy"}
              </button>
            </div>

            {/* Syntax Highlighted Lines - Rendered with StaticCodeBlock */}
            <div className="flex-1 p-4 bg-black/30 font-mono text-[11.5px] leading-relaxed select-text overflow-y-auto scrollbar-thin">
              <StaticCodeBlock
                code={registryCode.trim()}
                language="typescript"
                onLineEnter={handleLineMouseEnter}
              />
            </div>
          </div>
        </div>

        {/* Right: Registry Anatomy Cards */}
        <div className="flex flex-col gap-2.5">
          <InfoCard
            icon="🌍"
            title="Navigation"
            category="navigation"
            hoveredCategory={hoveredCategory}
            onHover={handleCategoryHover}
            description="Defines the page URL for navigation and URL verification."
          />
          <InfoCard
            icon="👤"
            title="Semantic Locators"
            category="semantic"
            hoveredCategory={hoveredCategory}
            onHover={handleCategoryHover}
            description="Uses browser-native locators such as textbox, button, and heading."
          />
          <InfoCard
            icon="🏷️"
            title="Fallback Locators"
            category="fallback"
            hoveredCategory={hoveredCategory}
            onHover={handleCategoryHover}
            description="Uses explicit identifiers or CSS when semantic roles aren't possible."
          />
          <InfoCard
            icon="✨"
            title="Best Practices"
            category="best-practices"
            hoveredCategory={hoveredCategory}
            onHover={handleCategoryHover}
            description={
              <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-400">
                <li>One registry per screen.</li>
                <li>Prefer semantic locators.</li>
                <li>Keep registries declarative.</li>
              </ul>
            }
          />

          {/* Related Documentation Card with Navigable Animated Arrows (Single Column Layout) */}
          <div
            className="bg-[#0b0b0c]/50 border border-white/5 rounded-xl p-3.5 transition-all duration-300 flex flex-col justify-center hover:border-white/10"
          >
            <h4 className="text-[12px] font-bold text-slate-200 flex items-center gap-1.5 font-sans leading-none mb-2.5">
              <span className="text-[14px] shrink-0">📖</span>
              <span>Related Documentation</span>
            </h4>
            <div className="flex flex-col gap-2 text-[10.5px] font-medium font-sans mt-0.5">
              <a
                href="#features-locators"
                className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                <span>Internal Locators</span>
              </a>
              <a
                href="#features-dynamic-locators"
                className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                <span>Dynamic Locators</span>
              </a>
              <a
                href="#test-runtime"
                className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                <span>Test Runtime</span>
              </a>
              <a
                href="#features-table"
                className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
              >
                <span className="transform group-hover:translate-x-0.5 transition-transform duration-150">→</span>
                <span>Components</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
