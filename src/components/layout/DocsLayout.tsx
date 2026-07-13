import type { ReactNode } from "react";
import { SplitLayout } from "./SplitLayout";
import { ContentLayout } from "./ContentLayout";

export interface DocsLayoutProps {
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  embedded?: boolean;
}

export function DocsLayout({ sidebar, footer, children, embedded = false }: DocsLayoutProps) {
  if (embedded) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div className="flex-1 min-h-0">
        <SplitLayout
          height="full"
          children={null}
          sidebar={sidebar}
          content={
            <ContentLayout width="default" padding="bottom">
              <div className="flex flex-col min-h-full justify-between">
                <div className="flex-1 min-h-0">{children}</div>
                {footer}
              </div>
            </ContentLayout>
          }
        />
      </div>
    </div>
  );
}
