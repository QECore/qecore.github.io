import DocCard from "@/components/cards/DocCard";
import CardPros from "@/components/cards/CardPros";
import TerminalBlock from "@/components/code/TerminalBlock";

interface FirstTestSectionProps {
  prevLink?: { id: string; label: string };
  nextLink?: { id: string; label: string };
}

/**
 * FirstTestSection — the Your First Test docs page.
 *
 * Restructured into a clean 3-column layout (36% | 40% | 24%) to fit entirely on one screen.
 */
export default function FirstTestSection({ prevLink, nextLink }: FirstTestSectionProps) {
  const step1Code = `export const registry = createPageRegistry({
  login: {
    url: "/login",
    textbox: ['Username', 'Password'],
    button: ["Submit"]
  }
});`;

  const step2Code = `import { registry as test } from "../registry";

test("Login", async ({ login }) => {
  await login.goto();
  await login.fill('Username', 'John');
  await login.fill('Password', 'John123');
  await login.click("Submit");
});`;

  return (
    <div className="text-left animate-in fade-in duration-300">
      <div className="flex flex-col lg:flex-row items-stretch gap-3 select-none">
        {/* Step 1: Registry (35%) */}
        <div className="flex flex-col min-w-0" style={{ flex: "35 35 35%" }}>
          <DocCard
            accentColor="amber"
            subtitle="STEP 1"
            heading="Registry"
            description="Define your application's pages and locators."
            className="h-full flex-1"
          >
            <TerminalBlock
              code={step1Code}
              filename="registry.ts"
              variant="code"
              language="typescript"
              showLineNumbers={true}
              maxLines={10}
              className="h-[210px]"
            />
          </DocCard>
        </div>

        {/* Step 2: Write Test (36%) */}
        <div className="flex flex-col min-w-0" style={{ flex: "36 36 36%" }}>
          <DocCard
            accentColor="slate"
            subtitle="STEP 2"
            heading="Write Test"
            description="Use the generated API instead of raw locators."
            className="h-full flex-1"
          >
            <TerminalBlock
              code={step2Code}
              filename="login.test.ts"
              variant="code"
              language="typescript"
              showLineNumbers={true}
              maxLines={10}
              className="h-[210px]"
            />
          </DocCard>
        </div>

        {/* Step 3: Run Test (29%) */}
        <div className="flex flex-col min-w-0" style={{ flex: "29 29 29%", minWidth: "220px" }}>
          <DocCard
            accentColor="slate"
            subtitle="STEP 3"
            heading="Run Test"
            description="Execute with the standard Playwright CLI."
            className="h-full flex-1"
          >
            <div className="space-y-4 flex flex-col justify-between h-full">
              <TerminalBlock
                code="npx playwright test"
                filename="Terminal"
                variant="terminal"
                showLineNumbers={false}
                maxLines={10}
              />
              <CardPros
                items={[
                  "Launches browser",
                  "Executes tests",
                  "Generates HTML report"
                ]}
              />
            </div>
          </DocCard>
        </div>
      </div>
    </div>
  );
}
