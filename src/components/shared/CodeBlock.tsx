import React, { useState, useRef, useEffect, useMemo } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
  compact?: boolean;
  textSizeClass?: string;
  noScroll?: boolean;
}

export default function CodeBlock({ code, filename, compact, textSizeClass, noScroll }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const highlightTypeScript = (rawCode: string) => {
    // Escape HTML entities to prevent rendering issues
    let escaped = rawCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Single regex pass to match comments, strings, keywords, methods, object keys, and numbers
    const regex = /(\/\/.*)|(["'`])(.*?)\2|\b(import|export|class|extends|constructor|super|private|const|let|var|function|return|async|await|from|typeof|new|this|type)\b|\b(test|expect|createPageConfig|createPageRegistry|fill|click|verify|goto|verifyURL|toHaveCount|toBeVisible|dblclick|locator|extend|use)\b(?=\s*\()|(\w+)(?=\s*:(?!:))|\b(\d+)\b/g;

    return escaped.replace(regex, (match, comment, quote, stringContent, keyword, method, objKey, number) => {
      if (comment) {
        return `<span style="color: #64748b; opacity: 0.6;" class="italic">${comment}</span>`;
      }
      if (quote) {
        return `<span class="text-orange-400 font-semibold">${quote}${stringContent}${quote}</span>`;
      }
      if (keyword) {
        return `<span class="text-indigo-400 font-bold">${keyword}</span>`;
      }
      if (method) {
        return `<span class="text-sky-400 font-semibold">${method}</span>`;
      }
      if (objKey) {
        return `<span class="text-red-400 italic">${objKey}</span>`;
      }
      if (number) {
        return `<span class="text-amber-300">${number}</span>`;
      }
      return match;
    });
  };

  // Split and highlight line by line
  const highlightedLines = useMemo(() => {
    const rawLines = code.split("\n");
    if (rawLines.length > 1 && rawLines[rawLines.length - 1] === "") {
      rawLines.pop();
    }
    return rawLines.map((line) => highlightTypeScript(line));
  }, [code]);

  const handleScroll = () => {
    const el = preRef.current;
    if (!el) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (el.scrollLeft > 0) {
      scrollTimeoutRef.current = setTimeout(() => {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }, 10000);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  if (compact) {
    return (
      <div className="relative group rounded-lg overflow-hidden code-block-inset px-3.5 py-2 flex items-center justify-between h-[62px]">
        <pre 
          ref={preRef}
          onScroll={handleScroll}
          className="overflow-x-auto overflow-y-hidden text-[11px] sm:text-xs font-mono select-text text-slate-100 scrollbar-none flex items-center w-full"
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlightTypeScript(code) }}
          />
        </pre>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all shrink-0 ml-2"
          title="Copy"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden code-block-inset p-0">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.03]">
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 select-none">{filename || "TypeScript"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre 
        ref={preRef}
        onScroll={handleScroll}
        className={`p-0 py-3 ${noScroll ? "overflow-x-auto overflow-y-hidden max-h-none" : "overflow-x-auto overflow-y-auto max-h-[170px] scrollbar-thin"} ${textSizeClass || "text-[11px] sm:text-xs"} font-mono leading-normal sm:leading-relaxed select-text text-slate-100 bg-[#000000]`}
      >
        <code className="block min-w-max">
          {highlightedLines.map((htmlLine, i) => (
            <div key={i} className="flex items-start min-w-max hover:bg-white/[0.02]">
              {/* Line Number: Sticky, stays visible on horizontal scroll */}
              <span className="sticky left-0 bg-[#000000] text-slate-500/80 text-right select-none pr-3 pl-3 w-[36px] shrink-0 font-mono border-r border-white/5 mr-3 z-10">
                {i + 1}
              </span>
              {/* Line Content */}
              <span
                className="pr-4"
                dangerouslySetInnerHTML={{ __html: htmlLine || " " }}
              />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
