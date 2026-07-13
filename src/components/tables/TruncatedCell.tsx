import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

interface TruncatedCellProps {
  children: React.ReactNode;
  maxLen?: number;
}

export function TruncatedCell({ children, maxLen = 40 }: TruncatedCellProps) {
  if (typeof children !== "string") {
    return <>{children}</>;
  }

  const text = children;
  if (text.length <= maxLen) {
    return <span>{text}</span>;
  }

  const truncated = text.substring(0, maxLen) + "...";

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span
            className="cursor-help underline decoration-dotted decoration-muted-foreground/30 hover:text-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {truncated}
          </span>
        </TooltipTrigger>
        <TooltipContent
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="max-w-xs break-words bg-slate-900 text-slate-100 border border-slate-800 p-2.5 shadow-lg rounded-md text-xs"
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
