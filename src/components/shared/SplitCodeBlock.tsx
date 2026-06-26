import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface SplitFile {
  filename: string;
  code: string;
}

interface SplitCodeBlockProps {
  files: SplitFile[];
  textSizeClass?: string;
  gridColsClass?: string;
}

function CopyButton({ code }: { code: string }) {
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

  return (
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
  );
}

export default function SplitCodeBlock({ files, textSizeClass = "text-[9.5px]", gridColsClass }: SplitCodeBlockProps) {
  const highlightTypeScript = (rawCode: string) => {
    let escaped = rawCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const regex = /(\/\/.*)|(["'`])(.*?)\2|\b(const)\s+(\w+)\b|\b(import|export|class|extends|constructor|super|private|let|var|function|return|async|await|from|typeof|new|this|type)\b|\b(test|expect)\b|\b(describe|beforeAll|beforeEach|afterAll|afterEach|only|skip|createPageConfig|createPageRegistry|fill|click|verify|goto|verifyURL|toHaveCount|toBeVisible|dblclick|locator|extend|use)\b(?=\s*\()|(\w+)(?=\s*:(?!:))|\b(\d+)\b/g;

    return escaped.replace(regex, (match, comment, quote, stringContent, constKeyword, constName, keyword, caller, method, objKey, number) => {
      if (comment) {
        return `<span style="color: #64748b; opacity: 0.6;" class="italic">${comment}</span>`;
      }
      if (quote) {
        return `<span class="text-orange-400 font-semibold">${quote}${stringContent}${quote}</span>`;
      }
      if (constKeyword && constName) {
        return `<span class="text-purple-400 italic">${constKeyword}</span> <span class="text-red-500 font-bold">${constName}</span>`;
      }
      if (keyword) {
        return `<span class="text-purple-400 italic">${keyword}</span>`;
      }
      if (caller) {
        return `<span class="text-sky-400 font-semibold">${caller}</span>`;
      }
      if (method) {
        return `<span class="text-amber-400 font-semibold">${method}</span>`;
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

  const getGridColsClass = (count: number) => {
    if (gridColsClass) return gridColsClass;
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x";
    return "grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x";
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#000000] shadow-2xl">
      <div className={`grid ${getGridColsClass(files.length)} divide-white/10 w-full`}>
        {files.map((file) => {
          const rawLines = file.code.split("\n");
          if (rawLines.length > 1 && rawLines[rawLines.length - 1] === "") {
            rawLines.pop();
          }
          const highlightedLines = rawLines.map(line => highlightTypeScript(line));

          return (
            <div key={file.filename} className="flex flex-col min-w-0">
              {/* Pane Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.03]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 select-none font-mono">
                  {file.filename}
                </span>
                <CopyButton code={file.code} />
              </div>

              {/* Code Content */}
              <pre className={`p-0 py-3 overflow-x-auto overflow-y-hidden max-h-none ${textSizeClass} font-mono leading-normal sm:leading-relaxed select-text text-slate-100 bg-[#000000]`}>
                <code className="block min-w-max">
                  {highlightedLines.map((htmlLine, i) => (
                    <div key={i} className="flex items-start min-w-max hover:bg-white/[0.02]">
                      <span className="sticky left-0 bg-[#000000] text-slate-500/80 text-right select-none pr-3 pl-3 w-[36px] shrink-0 font-mono border-r border-white/5 mr-3 z-10">
                        {i + 1}
                      </span>
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
        })}
      </div>
    </div>
  );
}
