import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const splitLayoutVariants = cva("flex w-full overflow-hidden min-h-0", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    height: {
      viewport: "h-[calc(100vh-64px)]",
      auto: "h-auto",
      full: "h-full",
      screen: "h-screen",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    height: "auto",
  },
});

export interface SplitLayoutProps extends VariantProps<typeof splitLayoutVariants> {
  children: ReactNode;
  sidebar?: ReactNode;
  content?: ReactNode;
  sidebarWidth?: "narrow" | "default";
  showSeparator?: boolean;
}

const sidebarWidthClasses = {
  narrow: "w-56",
  default: "w-64",
} as const;

export function SplitLayout({
  direction,
  height,
  children,
  sidebar,
  content,
  sidebarWidth = "default",
  showSeparator = false,
}: SplitLayoutProps) {
  if (sidebar || content) {
    return (
      <div className={splitLayoutVariants({ direction, height })}>
        {sidebar && (
          <aside
            className={`hidden lg:flex flex-col shrink-0 min-h-0 bg-transparent h-full overflow-y-auto overscroll-y-contain pl-6 pr-2 py-8 select-none sidebar-scrollbar ${sidebarWidthClasses[sidebarWidth]}`}
          >
            {sidebar}
          </aside>
        )}
        {showSeparator && (
          <div className="hidden lg:block w-[1.5px] bg-slate-800 self-stretch my-8 shrink-0" />
        )}
        <main className="flex-1 min-h-0 overflow-y-auto p-6 md:p-6 scrollbar-hidden">
          {content}
        </main>
      </div>
    );
  }

  return <div className={splitLayoutVariants({ direction, height })}>{children}</div>;
}
