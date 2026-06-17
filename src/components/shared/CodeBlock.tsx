import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
}

export default function CodeBlock({ code, filename }: CodeBlockProps) {
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
        return `<span class="text-emerald-500/80 italic">${comment}</span>`;
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

  return (
    <div className="relative group rounded-lg overflow-hidden skeu-inset !bg-[#000000] p-0">
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
      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed select-text text-slate-100">
        <code
          dangerouslySetInnerHTML={{ __html: highlightTypeScript(code) }}
        />
      </pre>
    </div>
  );
}
