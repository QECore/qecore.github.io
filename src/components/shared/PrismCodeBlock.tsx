import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";

interface PrismCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  /** 1-based line numbers to highlight */
  highlightLines?: number[];
  className?: string;
  /** Whether to show line numbers (default: true) */
  showLineNumbers?: boolean;
  glowKeywords?: string[];
  glowActive?: boolean;
  hideHeader?: boolean;
}

export default function PrismCodeBlock({
  code,
  language = "tsx",
  filename,
  highlightLines,
  className,
  showLineNumbers = true,
  glowKeywords,
  glowActive = false,
  hideHeader = false,
}: PrismCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const lineCount = code.split("\n").length;
  const gutterWidth = String(lineCount).length;

  return (
    <div className={`rounded-xl overflow-hidden code-block-inset flex flex-col ${className ?? ""}`}>
      {/* Header bar */}
      {!hideHeader && (
        <div className="flex items-center justify-between px-3.5 py-1.5" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2">
            {/* Traffic light dots */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 select-none font-mono ml-2">
              {filename || "TypeScript"}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code Area */}
      <Highlight theme={themes.vsDark} code={code.trimEnd()} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="flex-1 p-2.5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-normal sm:leading-relaxed select-text scrollbar-thin" style={{ margin: 0 }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const isHighlighted = highlightLines?.includes(i + 1);
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={`${lineProps.className ?? ""}`}
                  style={{
                    ...lineProps.style,
                    ...(isHighlighted
                      ? { background: "rgba(251, 146, 60, 0.08)", borderRadius: "4px", margin: "0 -12px", padding: "0 12px" }
                      : {}),
                  }}
                >
                  {/* Line number gutter */}
                  {showLineNumbers && (
                    <span
                      className="inline-block text-right select-none mr-4"
                      style={{
                        minWidth: `${gutterWidth + 1}ch`,
                        color: isHighlighted ? "rgba(251, 146, 60, 0.7)" : "rgba(255,255,255,0.2)",
                        userSelect: "none",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => {
                    const isGlow = glowActive && glowKeywords?.includes(token.content.trim());
                    const tokenProps = getTokenProps({ token, key });
                    if (token.types.includes("comment")) {
                      tokenProps.style = { ...tokenProps.style, color: "#38bdf8" };
                    }
                    if (isGlow) {
                      return (
                        <span
                          key={key}
                          {...tokenProps}
                          className={`${tokenProps.className ?? ""} transition-all duration-300`}
                          style={{
                            ...tokenProps.style,
                            color: "#fb923c", // amber-400
                            textShadow: "0 0 8px rgba(251, 146, 60, 0.9), 0 0 16px rgba(251, 146, 60, 0.4)",
                            fontWeight: "bold",
                          }}
                        />
                      );
                    }
                    return <span key={key} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
