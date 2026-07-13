import type { ReactNode } from "react";

export interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="mx-4 flex flex-col h-screen min-h-0 bg-background relative">
      {children}
    </div>
  );
}
