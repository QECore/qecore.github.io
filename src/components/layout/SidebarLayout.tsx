import type { ReactNode } from "react";

export interface SidebarLayoutProps {
  children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      {children}
    </div>
  );
}

export function SidebarLayoutAside({ children }: { children: ReactNode }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-background">
      {children}
    </aside>
  );
}

export function SidebarLayoutContent({ children }: { children: ReactNode }) {
  return <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>;
}
