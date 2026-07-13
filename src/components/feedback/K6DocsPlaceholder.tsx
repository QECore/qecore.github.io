import { CenterLayout } from "@/components/layout/CenterLayout";
import { StackLayout } from "@/components/layout/StackLayout";
import { Surface } from "@/components/layout/Surface";
import { PageTitle, Paragraph } from "@/components/typography/Typography";

export function K6DocsPlaceholder() {
  return (
    <div className="w-full py-10 px-6 md:px-12 lg:px-16">
      <Surface variant="default" padding="lg">
        <CenterLayout direction="col" padding="lg">
          <StackLayout spacing="lg" align="center">
            <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center animate-pulse">
              <span className="text-indigo-500 text-xl font-bold">K6</span>
            </div>
            <StackLayout spacing="md" align="center">
              <PageTitle size="docs" gradient="indigo">
                K6-Core Documentation
              </PageTitle>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                Coming Soon
              </span>
            </StackLayout>
            <Paragraph size="sm" tone="muted">
              We are working hard to bring you comprehensive documentation, guides, and examples
              for K6-Core. Stay tuned!
            </Paragraph>
          </StackLayout>
        </CenterLayout>
      </Surface>
    </div>
  );
}
