import { Highlight, themes } from "prism-react-renderer";
import CopyButton from "@/components/buttons/CopyButton";

type TerminalVariant = "terminal" | "code" | "terminalWithoutHeader";

interface TerminalBlockProps {
  /** The raw code/command string to display */
  code: string;
  /** Label shown in the header (e.g. "Terminal", "registry.ts") */
  filename?: string;
  /** "terminal" → amber CLI style. "code" → Prism.js syntax highlighting */
  variant?: TerminalVariant;
  /** Prism language for "code" variant (default: "tsx") */
  language?: string;
  /** Show line numbers (default: true for code, false for terminal) */
  showLineNumbers?: boolean;
  /** Max visible lines before scrolling (default: 12) */
  maxLines?: number;
  /** 1-based line numbers to highlight with amber glow */
  highlightLines?: number[];
  className?: string;
}

/**
 * TerminalBlock — reusable code/terminal display block.
 *
 * Terminal layout:
 *   ┌─────────────────────────────┐
 *   │  TERMINAL                   │  ← label row (small, muted)
 *   │  command text    [copy]     │  ← inset command row
 *   └─────────────────────────────┘
 *
 * Code layout:
 *   ┌─────────────────────────────┐
 *   │  ● ● ●  FILENAME.ts  [copy] │  ← single header bar
 *   │  (inset) code content       │  ← inset code area
 *   └─────────────────────────────┘
 */
export default function TerminalBlock({
  code,
  filename,
  variant = "code",
  language = "tsx",
  showLineNumbers,
  maxLines = 12,
  highlightLines,
  className = "",
}: TerminalBlockProps) {
  const trimmedCode = code.trimEnd();
  const lines = trimmedCode.split("\n");
  const lineCount = lines.length;
  const gutterWidth = String(lineCount).length;
  // Default: no line numbers in terminal, show in code
  const showNums = showLineNumbers ?? (variant === "code");

  /* ─── Terminal Without Header variant ─────────────────────────────── */
  if (variant === "terminalWithoutHeader") {
    return (
      <div
        className={`font-mono w-full rounded-xl flex items-center justify-between gap-2.5 px-3 py-1 ${className}`}
        style={{
          background: "rgba(0,0,0,0.55)",
          boxShadow: [
            "inset 0 4px 12px rgba(0,0,0,0.9)",
            "inset 0 2px 6px rgba(0,0,0,0.7)",
            "inset 0 -1px 2px rgba(255,255,255,0.03)",
            "inset 0 1px 0 rgba(251,146,60,0.04)",
          ].join(", "),
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      >
        <div
          className="flex-1 overflow-x-auto whitespace-pre text-[11.5px] leading-snug py-0.5"
          style={{
            maxHeight: `${maxLines * 1.5}rem`,
            overflowY: maxLines && lineCount > maxLines ? "auto" : "visible",
          }}
        >
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <span className="text-amber-600/60 select-none shrink-0 mt-px">$</span>
              <span
                className={
                  line.trim().startsWith("#")
                    ? "text-[#475569] italic"
                    : "text-amber-400"
                }
              >
                {line || " "}
              </span>
            </div>
          ))}
        </div>
        <div className="shrink-0 self-center">
          <CopyButton text={trimmedCode} />
        </div>
      </div>
    );
  }

  /* ─── Terminal variant ────────────────────────────────────────────── */
  if (variant === "terminal") {
    return (
      <div
        className={`font-mono w-full overflow-hidden ${className}`}
        style={{
          borderRadius: "20px",
          background: "#181818",
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.7), -10px -10px 30px rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.02)"
        }}
      >
        {/* Label row */}
        <div className="px-4 pt-1 pb-1">
          <span className="text-[9px] uppercase font-bold tracking-[2px] text-[#475569] select-none">
            {filename || "Terminal"}
          </span>
        </div>

        {/* Command row — recessed inner surface */}
        <div className="px-2.5 pb-2.5">
          <div
            className="rounded-xl flex items-center justify-between gap-2.5 px-3 py-1"
            style={{
              background: "rgba(0,0,0,0.55)",
              boxShadow: [
                "inset 0 4px 12px rgba(0,0,0,0.9)",
                "inset 0 2px 6px rgba(0,0,0,0.7)",
                "inset 0 -1px 2px rgba(255,255,255,0.03)",
                /* subtle inner amber shimmer */
                "inset 0 1px 0 rgba(251,146,60,0.04)",
              ].join(", "),
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="flex-1 overflow-x-auto whitespace-pre text-[11.5px] leading-snug py-0.5"
              style={{
                maxHeight: `${maxLines * 1.5}rem`,
                overflowY: maxLines && lineCount > maxLines ? "auto" : "visible",
              }}
            >
              {lines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  {/* Dollar prefix */}
                  <span className="text-amber-600/60 select-none shrink-0 mt-px">$</span>
                  <span
                    className={
                      line.trim().startsWith("#")
                        ? "text-[#475569] italic"
                        : "text-amber-400"
                    }
                  >
                    {line || " "}
                  </span>
                </div>
              ))}
            </div>
            <div className="shrink-0 self-center">
              <CopyButton text={trimmedCode} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Code (Prism) variant ────────────────────────────────────────── */
  return (
    <div
      className={`rounded-xl overflow-hidden flex flex-col ${className}`}
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Single header bar: dots · filename (centred) · copy */}
      <div
        className="flex items-center gap-2.5 px-3 py-1.5 border-b border-white/5"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>

        {/* Filename — flex-1 centres it naturally between dots and copy */}
        <span className="flex-1 text-center text-[9px] uppercase font-bold tracking-wider text-white/50 select-none font-mono">
          {filename || "TypeScript"}
        </span>

        {/* Copy button — right */}
        <div className="shrink-0">
          <CopyButton text={trimmedCode} />
        </div>
      </div>

      {/* Prism code — inset depth */}
      <Highlight theme={themes.vsDark} code={trimmedCode} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className="code-block-inset flex-1 p-1 overflow-x-auto text-[10.5px] sm:text-[11px] font-mono leading-snug select-text scrollbar-thin rounded-none"
            style={{
              margin: 0,
              maxHeight: `${maxLines * 1.5}rem`,
              overflowY: maxLines && lineCount > maxLines ? "auto" : "visible",
            }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const isHighlighted = highlightLines?.includes(i + 1);
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={lineProps.className ?? ""}
                  style={{
                    ...lineProps.style,
                    ...(isHighlighted
                      ? {
                        background: "rgba(251, 146, 60, 0.08)",
                        borderRadius: "4px",
                        margin: "0 -12px",
                        padding: "0 12px",
                      }
                      : {}),
                  }}
                >
                  {showNums && (
                    <span
                      className="inline-block text-right select-none mr-4"
                      style={{
                        minWidth: `${gutterWidth + 1}ch`,
                        color: isHighlighted
                          ? "rgba(251, 146, 60, 0.7)"
                          : "rgba(255,255,255,0.2)",
                        userSelect: "none",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key });
                    if (token.types.includes("comment")) {
                      tokenProps.style = { ...tokenProps.style, color: "#38bdf8" };
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
