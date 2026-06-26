import {
  BookOpen, CheckCircle2,
  Cpu
} from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuInset from "../components/shared/SkeuInset";
import CodeBlock from "../components/shared/CodeBlock";
import SplitCodeBlock from "../components/shared/SplitCodeBlock";
import { useHeader } from "@/lib/HeaderContext";
import ElasticScroll from "../components/shared/ElasticScroll";

// Import code blocks from the /code folder in txt format
import pwcoreLoginPageRaw from "./code/pwcore-login-page.txt?raw";
import pwcoreLoginTestRaw from "./code/pwcore-login-test.txt?raw";
import pwcoreFixturesRaw from "./code/pwcore-fixtures.txt?raw";
import registryRaw from "./code/registry.txt?raw";
import registryFixturesUsageRaw from "./code/registry-fixtures-usage.txt?raw";
import overrideLoginPageRaw from "./code/override-login-page.txt?raw";
import overrideFixturesRaw from "./code/override-fixtures.txt?raw";
import overrideLoginTestRaw from "./code/override-login-test.txt?raw";

import projectsTableRaw from "./code/projects-table.txt?raw";
import tradDashboardRaw from "./code/trad-dashboard.txt?raw";
import coreDashboardRaw from "./code/core-dashboard.txt?raw";

import stepPlaywrightReportRaw from "./code/step-descriptions-playwright-report.txt?raw";
import stepYourTestCodeRaw from "./code/step-descriptions-your-test-code.txt?raw";
import stepPwCoreReportRaw from "./code/step-descriptions-pw-core-report.txt?raw";
import stepMinimalCodeRaw from "./code/step-descriptions-minimal-code.txt?raw";
import stepResultingReportRaw from "./code/step-descriptions-resulting-report.txt?raw";

import featuresData from "../docs/pw-core/features.json";


// Simple custom Badge component
function DocBadge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "warning" | "success" | "indigo" }) {
  const classes = {
    default: "bg-muted text-muted-foreground border-border",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes[variant]}`}>
      {children}
    </span>
  );
}

function InlineCode({ code }: { code: string }) {
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const highlightRegex = /\b(fill|click|dblClick|hover|focus|press|check|uncheck|selectOption|verifyHidden|verifyEnabled|verifyDisabled|verifyUrl|verifyTitle|verify|goto|getRowCount|getAll|get|not|toBeVisible)\b/g;

  const highlighted = escaped.replace(highlightRegex, (match) => {
    return `<span class="text-amber-500 font-semibold">${match}</span>`;
  });

  return (
    <code
      className="font-mono text-slate-300 bg-[#000000] px-1.5 py-0.5 rounded border border-white/5 inline-block text-[11px] select-text whitespace-pre"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

function CapabilityTable({
  title,
  items,
  titleSize = "h3",
  headerPurpose = "Purpose",
  caption
}: {
  title: string;
  items: { code: string; purpose: string }[];
  titleSize?: "h3" | "h4";
  headerPurpose?: string;
  caption?: string;
}) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mb-1.5 flex flex-col justify-start">
        {titleSize === "h3" ? (
          <h3 className="text-sm font-bold text-amber-500">{title}</h3>
        ) : (
          <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">{title}</h4>
        )}
        {caption && <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{caption}</p>}
      </div>
      <div className="border border-white/10 rounded-lg overflow-hidden bg-black flex-1">
        <table className="w-full text-[11px] text-left bg-black table-fixed">
          <thead className="bg-[#0c0c0c] border-b border-white/10 text-[9px] uppercase tracking-wider">
            <tr>
              <th className="py-1.5 px-2.5 font-semibold text-muted-foreground uppercase w-[60%]">Example</th>
              <th className="py-1.5 px-2.5 font-semibold text-muted-foreground uppercase">{headerPurpose}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-black">
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-1 px-2.5 bg-black align-middle overflow-x-auto scrollbar-none">
                  {item.code === "Reports" ? (
                    <span className="text-[10px] font-sans text-amber-500 font-semibold px-1.5 py-0.5 rounded border border-white/10 bg-[#000000] inline-block">
                      Reports
                    </span>
                  ) : (
                    <InlineCode code={item.code} />
                  )}
                </td>
                <td className="py-1 px-2.5 text-muted-foreground align-middle break-words leading-snug">
                  {item.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomCodeBlock({ code, filename }: { code: string; filename: string }) {
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const highlightRegex = /\b(Table|get|getAll)\b/g;
  const highlighted = escaped.replace(highlightRegex, '<span class="text-amber-500 font-semibold">$1</span>');

  const lines = highlighted.split("\n");

  return (
    <div className="relative group rounded-lg overflow-hidden code-block-inset p-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.03]">
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 select-none">
          {filename}
        </span>
      </div>
      <pre className="p-0 py-3 overflow-x-auto overflow-y-auto max-h-[220px] scrollbar-thin text-[11px] sm:text-xs font-mono leading-normal sm:leading-relaxed select-text text-slate-300 bg-[#000000]">
        <code className="block min-w-max">
          {lines.map((htmlLine, i) => (
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
}


interface DocsProps {
  isEmbedded?: boolean;
}

export default function Docs({ isEmbedded = false }: DocsProps) {
  const { activeHeader } = useHeader();

  if (activeHeader === "k6-core") {
    return (
      <div className="w-full py-10 px-6 md:px-12 lg:px-16">
        <SkeuCard className="p-12 text-center space-y-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center animate-pulse">
            <BookOpen className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              K6-Core Documentation
            </h1>
            <DocBadge variant="indigo">Coming Soon</DocBadge>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            We are working hard to bring you comprehensive documentation, guides, and examples for K6-Core. Stay tuned!
          </p>
        </SkeuCard>
      </div>
    );
  }

  const mainContent = (
    <div className={isEmbedded ? "w-full" : "max-w-[1440px] w-full mx-auto px-4 md:px-8 py-0 pt-8 pb-12"}>
      <div className="w-full">
        {/* Content Panel */}
        <main className="w-full space-y-12">
          {/* Section 3: Page Registry */}
          <div id="registry" className="space-y-8 pt-12 border-t border-border/40 animate-in fade-in duration-300">
            <div className="border-b border-border pb-4">
              <h1 className="text-3xl font-extrabold font-heading text-foreground">
                Page Registry
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Create Auto page fixtures (both test/ worker scoped), and test APIs from a single registry definition.
              </p>
            </div>

            <div className="space-y-4">
              <SplitCodeBlock
                files={[
                  { filename: "registry.ts", code: registryRaw },
                  { filename: "login.test.ts", code: registryFixturesUsageRaw }
                ]}
              />
            </div>

            <div className="space-y-4 pt-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-2xl font-extrabold font-heading text-foreground">
                  But, what if you have to add custom page methods?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Extend the generated page class and replace the auto-generated fixture with your custom subclass extension.
                </p>
              </div>

              <SplitCodeBlock
                files={[
                  { filename: "login.page.ts", code: overrideLoginPageRaw },
                  { filename: "fixtures.ts", code: overrideFixturesRaw },
                  { filename: "login.test.ts", code: overrideLoginTestRaw }
                ]}
              />
            </div>
          </div>

          {/* Section 4: Typed Page Examples */}
          <div id="typed-page" className="space-y-8 pt-12 border-t border-border/40 animate-in fade-in duration-300">
            <div className="border-b border-border pb-4">
              <h1 className="text-3xl font-extrabold font-heading text-foreground">
                Typed Page <span className="text-base font-normal text-muted-foreground/50 ml-2">(Only if you want your locators to be within the page file - Not Recommended)</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Build traditional page objects using TypedPage and createPageConfig. (Here we lose Auto Test/ Worker scoped Page fixtures)
              </p>
            </div>

            <div className="space-y-4">
              <SplitCodeBlock
                files={[
                  { filename: "login.page.ts", code: pwcoreLoginPageRaw },
                  { filename: "fixtures.ts", code: pwcoreFixturesRaw },
                  { filename: "login.test.ts", code: pwcoreLoginTestRaw }
                ]}
              />
            </div>
          </div>

          {/* Section: Features (Capabilities Catalog) */}
          <div id="features" className="space-y-6 pt-12 border-t border-border/40 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold font-heading text-foreground">
                    Features
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Discover the APIs, assertions, components, and utilities available in PW-Core.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-semibold text-amber-500 select-none shrink-0 md:text-left">
                  <span>✓ Key-Based Actions</span>
                  <span>✓ Dynamic Locators</span>
                  <span>✓ Auto Step Descriptions</span>
                  <span>✓ Built-In Assertions</span>
                  <span>✓ Locator Filters</span>
                  <span>✓ Automatic Secrets Masking</span>
                  <span>✓ Table Component</span>
                </div>
              </div>

              {/* Compact Callout: PW-Core Extends Playwright */}
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 h-[85px] flex flex-col justify-center relative overflow-hidden backdrop-blur-sm">
                <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                  PW-Core extends Playwright with typed actions, assertions, components, locator filters, and utilities.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                  All Playwright APIs remain available. Think of PW-Core as Playwright with a more readable, key-driven developer experience.
                </p>
              </div>
            </div>

            {/* Dynamic Locators Section */}
            <div id="features-dynamic-locators" className="space-y-4 pt-8 border-t border-border/40 pb-8 scroll-mt-24">
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold font-heading text-foreground">Dynamic Locators</h2>
                <p className="text-xs text-muted-foreground">
                  Generate combinations of selector keys dynamically from multiple dimensions with complete compile-time type safety.
                </p>
              </div>


              {/* Business Value Cards */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Business Value</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-200">Eliminate Duplication</span>
                    <p className="text-[11px] text-muted-foreground leading-normal">
                      Stop writing hundreds of almost-identical locators. Declare patterns once and generate all valid keys automatically.
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-200">Prevent Errors</span>
                    <p className="text-[11px] text-muted-foreground leading-normal">
                      Maintain structural consistency across all selector combinations. Enforce type safety in tests at compile time.
                    </p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-200">Simplify AI Automation</span>
                    <p className="text-[11px] text-muted-foreground leading-normal">
                      Minimize token usage and supply cleaner codebase contexts to help AI-generated scripts construct valid locators.
                    </p>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider">Traditional Playwright</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Manual declarations, verbose constructor assignments, and high maintenance for multi-dimensional test IDs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider">PW-Core</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Define a single dynamic config pattern and get full IntelliSense/compile-time safety.
                    </p>
                  </div>
                </div>
                <SplitCodeBlock
                  textSizeClass="text-[10px]"
                  files={[
                    {
                      filename: "dashboard.page.ts + dashboard.spec.ts",
                      code: tradDashboardRaw
                    },
                    {
                      filename: "dashboard.registry.ts + dashboard.spec.ts",
                      code: coreDashboardRaw
                    }
                  ]}
                />
              </div>

              {/* Automatic Test Step Descriptions Section */}
              <div id="features-auto-steps" className="space-y-4 pt-8 border-t border-border/40 pb-8 scroll-mt-24">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold font-heading text-foreground">Automatic Test Step Descriptions</h2>
                  <p className="text-xs text-muted-foreground">
                    Transform existing page methods into readable report steps automatically.
                  </p>
                  <p className="text-[11px] font-semibold text-amber-500">
                    No decorators. No wrappers. No <code className="text-slate-300">test.step()</code>.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Three-way SplitCodeBlock representing flow */}
                  <SplitCodeBlock
                    textSizeClass="text-[10px]"
                    gridColsClass="grid-cols-1 lg:grid-cols-[5fr_4.5fr_5fr] divide-y lg:divide-y-0 lg:divide-x"
                    files={[
                      {
                        filename: "You Don't need to wrap your steps ❌",
                        code: stepPlaywrightReportRaw
                      },
                      {
                        filename: "Your Test Code",
                        code: stepYourTestCodeRaw
                      },
                      {
                        filename: "PW-Core Automatically Generates steps",
                        code: stepPwCoreReportRaw
                      }
                    ]}
                  />

                  {/* Why It Matters / Business Value Bullet Grid */}
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider">Why It Matters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                        <span className="text-xs font-bold text-slate-200">✓ No Decorators or Wrappers</span>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          Keep your page classes clean. Avoid complex decorators or wrapper functions.
                        </p>
                      </div>
                      <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                        <span className="text-xs font-bold text-slate-200">✓ No test.step() boilerplate</span>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          Eliminate redundant `test.step()` calls that pollute your test scripts.
                        </p>
                      </div>
                      <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                        <span className="text-xs font-bold text-slate-200">✓ Parameters Included</span>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          Method parameters are automatically parsed and displayed inside report steps.
                        </p>
                      </div>
                      <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                        <span className="text-xs font-bold text-slate-200">✓ Zero Report Maintenance</span>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          Reports update dynamically whenever methods or parameter arguments change.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* 2-Column Capability Dashboard Grid */}
            <div id="features-capabilities" className="space-y-4 pt-8 border-t border-border/40 scroll-mt-24 pb-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold font-heading text-foreground">Capabilities</h2>
                <p className="text-xs text-muted-foreground">
                  The grid below showcases some of the new features and APIs added by PW-Core that are not available in Playwright.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Row 1: Actions | Assertions */}
                <div className="p-3 bg-[#080808] border border-white/10 rounded-xl">
                  <CapabilityTable
                    title={featuresData.sections.find(s => s.id === "actions")?.title || ""}
                    items={featuresData.sections.find(s => s.id === "actions")?.items || []}
                    headerPurpose="What PW-Core Adds"
                  />
                </div>
                <div className="p-3 bg-[#080808] border border-white/10 rounded-xl">
                  <CapabilityTable
                    title={featuresData.sections.find(s => s.id === "assertions")?.title || ""}
                    items={featuresData.sections.find(s => s.id === "assertions")?.items || []}
                  />
                </div>

                {/* Row 2: Navigation | Targeting */}
                <div className="p-3 bg-[#080808] border border-white/10 rounded-xl">
                  <CapabilityTable
                    title={featuresData.sections.find(s => s.id === "navigation")?.title || ""}
                    items={featuresData.sections.find(s => s.id === "navigation")?.items || []}
                  />
                </div>
                <div className="p-3 bg-[#080808] border border-white/10 rounded-xl">
                  <CapabilityTable
                    title={featuresData.sections.find(s => s.id === "locator-targeting")?.title || ""}
                    items={featuresData.sections.find(s => s.id === "locator-targeting")?.items || []}
                  />
                </div>
              </div>
            </div>

            {/* Security Section (Automatic Secret Masking Card) */}
            <div id="features-masking" className="pt-8 border-t border-border/40 space-y-4 scroll-mt-24">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold font-heading text-foreground">Automatic Secret Masking</h2>
                <div className="flex flex-wrap gap-4">
                  <InlineCode code="fill('password', 'secret')" />
                  <InlineCode code="fill('apiKey', 'abc123')" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sensitive values passed through PW-Core actions are automatically masked in reports and logs.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  While standard Playwright reports might reveal sensitive passwords in plain text (e.g., <code className="text-slate-300 font-mono">fill('password', 'secret')</code>), <br />PW-Core automatically masks them so that the reports contain secured values (e.g., <code className="text-slate-300 font-mono">fill('password', '****')</code>).
                </p>
              </div>

              {/* Table Component Section */}
              <div id="features-table" className="space-y-4 pt-8 border-t border-border/40 pb-8 scroll-mt-24">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold font-heading text-foreground">Table Component</h2>
                  <p className="text-xs text-muted-foreground">
                    Work with table data as structured records instead of manually traversing rows and cells.
                  </p>
                </div>

                {/* Main Table Example and API Reference Table Side-by-Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Main Table Example (Custom highlighted code block) */}
                  <div className="h-[220px] max-h-[220px]">
                    <CustomCodeBlock
                      code={projectsTableRaw}
                      filename="projects-table.ts"
                    />
                  </div>

                  {/* API Reference Table */}
                  <div className="p-3 bg-[#080808] border border-white/10 rounded-xl h-[284px] overflow-y-auto scrollbar-thin">
                    <CapabilityTable
                      title={featuresData.sections.find(s => s.id === "table-apis")?.title || "Table Reference"}
                      items={featuresData.sections.find(s => s.id === "table-apis")?.items || []}
                      titleSize="h3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  );

  if (isEmbedded) {
    return mainContent;
  }

  return (
    <ElasticScroll>
      {mainContent}
    </ElasticScroll>
  );
}
