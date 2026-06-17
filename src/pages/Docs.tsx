import { useState, useEffect } from "react";
import {
  BookOpen, ChevronRight, Terminal, CheckCircle2,
  Cpu, Info
} from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuInset from "../components/shared/SkeuInset";
import CodeBlock from "../components/shared/CodeBlock";
import { useHeader } from "@/lib/HeaderContext";

// Import configurations from JSON files dynamically
import introData from "../docs/pw-core/intro.json";
import philosophyData from "../docs/pw-core/philosophy.json";
import comparisonData from "../docs/pw-core/comparison.json";
import registryData from "../docs/pw-core/registry.json";

// Import example source files raw
import traditionalLoginPageRaw from "../docs/pw-core/examples/playwright/pages/login.page.ts?raw";
import traditionalLoginTestRaw from "../docs/pw-core/examples/playwright/tests/login.test.ts?raw";
import traditionalFixturesRaw from "../docs/pw-core/examples/playwright/docs/fixtures.ts?raw";
import traditionalDashboardPageRaw from "../docs/pw-core/examples/playwright/pages/dashboard.page.ts?raw";
import pwcoreLoginPageRaw from "../docs/pw-core/examples/pw-core/pages/login.page.ts?raw";
import pwcoreLoginTestRaw from "../docs/pw-core/examples/pw-core/tests/login.test.ts?raw";
import pwcoreFixturesRaw from "../docs/pw-core/examples/pw-core/docs/fixtures.ts?raw";
import pwcoreDashboardPageRaw from "../docs/pw-core/examples/pw-core/pages/dashboard.page.ts?raw";
import registryRaw from "../docs/pw-core/examples/pw-core/docs/registry.ts?raw";
import registryFixturesUsageRaw from "../docs/pw-core/examples/pw-core/tests/registry-fixtures-usage.test.ts?raw";
import extendedLoginPageRaw from "../docs/pw-core/examples/pw-core/pages/extended-login.page.ts?raw";
import extendedFixturesRaw from "../docs/pw-core/examples/pw-core/docs/extended-fixtures.ts?raw";
import extendedLoginTestRaw from "../docs/pw-core/examples/pw-core/tests/extended-login.test.ts?raw";
import traditionalLoginCustomTestRaw from "../docs/pw-core/examples/playwright/tests/login-custom.test.ts?raw";
import ReactMarkdown from "react-markdown";

// Import all markdown files dynamically from the docs directory
const releaseModules = import.meta.glob("../docs/pw-core/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const releases = Object.entries(releaseModules)
  .map(([path, content]) => {
    const filename = path.split("/").pop() || "";
    const version = filename.replace(/\.md$/, "");
    return {
      id: version,
      label: version,
      content,
    };
  })
  .sort((a, b) => b.label.localeCompare(a.label, undefined, { numeric: true, sensitivity: 'base' }));


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

export default function Docs() {
  const { activeHeader } = useHeader();
  const [activeTab, setActiveTab] = useState("intro");
  const [activeSubSection, setActiveSubSection] = useState("registry-definition");

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    let sections: string[] = [];
    if (activeTab === "registry") {
      sections = ["registry-definition", "registry-extend-class", "registry-extend-fixtures", "registry-extend-tests"];
    } else if (activeTab === "typed-examples") {
      sections = ["typed-pages", "typed-fixtures", "typed-tests"];
    } else {
      return;
    }

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSubSection(sections[sections.length - 1]);
        return;
      }

      let currentSection = sections[0];
      let minDistance = Infinity;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 120);
          if (rect.top <= 250 && distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      }
      setActiveSubSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  // Comparison states
  const [comparisonMode, setComparisonMode] = useState<"traditional" | "pwcore">("pwcore");
  const [activeFile, setActiveFile] = useState<"config" | "page" | "spec">("spec");

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

  return (
    <div className="w-full py-10 px-6 md:px-12 lg:px-16">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <SkeuCard className="p-3 sticky top-24">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 mb-3">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span className="font-heading font-bold text-sm">PW-Core Docs</span>
            </div>

            <nav className="space-y-1">
              {[
                { id: "intro", title: introData.title },
                { id: "comparison", title: comparisonData.title },
                { id: "registry", title: registryData.title },
                { id: "typed-examples", title: "Typed Page" },
                { id: "releases", title: "Releases" },
              ].map((sec) => (
                <div key={sec.id}>
                  <button
                    onClick={() => {
                      if (activeTab === sec.id) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        setActiveTab(sec.id);
                        if (sec.id === "registry") setActiveSubSection("registry-definition");
                        if (sec.id === "typed-examples") setActiveSubSection("typed-pages");
                        if (sec.id === "releases") setActiveSubSection(releases[0]?.id || "");
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-all ${activeTab === sec.id
                      ? "active bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border-l-2 border-amber-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      }`}
                  >
                    <span>{sec.title}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === sec.id ? "rotate-90 text-foreground" : "text-muted-foreground/40"}`} />
                  </button>

                  {sec.id === "registry" && activeTab === "registry" && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-2 animate-in slide-in-from-top-1 duration-200">
                      {[
                        { id: "registry-definition", label: "Registry & AI" },
                        { id: "registry-extend-class", label: "Extending with Class" },
                        { id: "registry-extend-fixtures", label: "Extended Fixtures" },
                        { id: "registry-extend-tests", label: "Extended Tests" },
                      ].map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            document.getElementById(sub.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-[11px] font-medium transition-all ${activeSubSection === sub.id
                            ? "text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                            }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {sec.id === "typed-examples" && activeTab === "typed-examples" && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-2 animate-in slide-in-from-top-1 duration-200">
                      {[
                        { id: "typed-pages", label: "Page Objects" },
                        { id: "typed-fixtures", label: "Fixtures Configuration" },
                        { id: "typed-tests", label: "Test Specifications" },
                      ].map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            document.getElementById(sub.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-[11px] font-medium transition-all ${activeSubSection === sub.id
                            ? "text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                            }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {sec.id === "releases" && activeTab === "releases" && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-border/60 ml-2 animate-in slide-in-from-top-1 duration-200">
                      {releases.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveSubSection(sub.id);
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-[11px] font-medium transition-all ${activeSubSection === sub.id
                            ? "text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                            }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SkeuCard>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          <SkeuCard className="p-6 md:p-8 space-y-8">

            {/* Section 1: Introduction */}
            {activeTab === "intro" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DocBadge variant="warning">{introData.badge}</DocBadge>
                  </div>
                  <h1 className="text-3xl font-extrabold font-heading text-foreground">
                    {introData.heading}
                  </h1>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 space-y-3 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <p className="text-base text-foreground font-semibold leading-relaxed">
                    {introData.description}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {introData.body}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-amber-500" /> Installation
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground/80 uppercase mb-1.5">For a new project (Recommended)</div>
                        <CodeBlock code={(introData as any).installationNew} filename="terminal" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-muted-foreground/80 uppercase mb-1.5">For an existing project</div>
                        <CodeBlock code={(introData as any).installationExisting} filename="terminal" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-500" /> What do you get?
                    </h3>
                    <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 h-[calc(100%-2rem)] flex flex-col justify-center">
                      <ul className="text-xs text-muted-foreground list-disc list-inside space-y-2">
                        {(introData as any).whatDoYouGet.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold font-heading text-foreground">
                      {philosophyData.heading}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {philosophyData.description}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {philosophyData.principles.map((p, i) => (
                      <SkeuCard key={i} className="p-4">
                        <h3 className="font-heading font-bold text-sm text-foreground mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {p.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                      </SkeuCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Traditional vs pw-core */}
            {activeTab === "comparison" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <h1 className="text-3xl font-extrabold font-heading text-foreground">
                    {comparisonData.heading}
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    {comparisonData.description}
                  </p>
                </div>

                {/* Interactive Code Comparison Viewer */}
                <div className="space-y-4">
                  {/* Select file tab */}
                  <div className="flex gap-1 border-b border-border">
                    <button
                      onClick={() => setActiveFile("page")}
                      className={`px-3 py-2 text-xs font-bold transition-all border-b-2 rounded-md ${activeFile === "page"
                        ? "active border-amber-500 text-foreground font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Page Object (login.page.ts)
                    </button>
                    <button
                      onClick={() => setActiveFile("spec")}
                      className={`px-3 py-2 text-xs font-bold transition-all border-b-2 rounded-md ${activeFile === "spec"
                        ? "active border-amber-500 text-foreground font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Test Script (login.test.ts)
                    </button>
                  </div>

                  {/* Side-by-side grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Playwright</h4>
                      <CodeBlock
                        code={activeFile === "page" ? traditionalLoginPageRaw : traditionalLoginTestRaw}
                        filename={activeFile === "page" ? "login.page.ts" : "login.test.ts"}
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">pw-core</h4>
                      <CodeBlock
                        code={activeFile === "page" ? pwcoreLoginPageRaw : pwcoreLoginTestRaw}
                        filename={activeFile === "page" ? "login.page.ts" : "login.test.ts"}
                      />
                    </div>
                  </div>
                </div>

                {/* Advantages comparison table */}
                <div className="border border-border/80 rounded-lg overflow-hidden mt-6">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="p-3 font-semibold text-muted-foreground uppercase">Aspect</th>
                        <th className="p-3 font-semibold text-muted-foreground uppercase">Playwright</th>
                        <th className="p-3 font-semibold text-amber-500 uppercase">pw-core</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {comparisonData.table.map((row, i) => (
                        <tr key={i}>
                          <td className="p-3 font-semibold">{row.aspect}</td>
                          <td className="p-3 text-muted-foreground">{row.traditional}</td>
                          <td className="p-3 text-foreground font-semibold">{row.pwcore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Section 7: Page Registry */}
            {/* Section 7: Page Registry */}
            {activeTab === "registry" && (
              <div className="space-y-12 animate-in fade-in duration-300">
                <div id="registry-definition" className="scroll-mt-24 space-y-6">
                  <div className="border-b border-border pb-4">
                    <h1 className="text-3xl font-extrabold font-heading text-foreground">
                      {registryData.heading}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                      {registryData.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-foreground">{registryData.fixtures.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {registryData.fixtures.description}
                    </p>
                    <CodeBlock code={registryRaw} filename="registry.ts" />

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      This automatically provisions `loginPage` as a fixture directly in your spec runner:
                    </p>
                    <CodeBlock code={registryFixturesUsageRaw} filename="registry-usage.test.ts" />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                      <Cpu className="w-5 h-5 text-amber-500" /> {registryData.ai.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {registryData.ai.description}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                      {registryData.ai.subtext}
                    </p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1.5 pl-2">
                      {registryData.ai.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Comparison Header */}
                <div className="border-t border-border pt-8 space-y-8">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-2xl font-bold font-heading text-foreground">
                      Playwright vs PW-CORE
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Comparison examples demonstrating how to extend page objects with custom helper methods and wire them into test runner fixtures.
                    </p>
                  </div>

                  {/* C. Extending with Class */}
                  <div id="registry-extend-class" className="scroll-mt-24 space-y-4">
                    <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                      <h3 className="text-sm font-bold text-foreground">Extending with a Custom Class</h3>
                      <DocBadge variant="indigo">extended-login.page.ts</DocBadge>
                    </SkeuInset>
                    <p className="text-xs text-muted-foreground">
                      Extend the auto-generated registry class to add custom helper methods like <code className="font-mono bg-muted/50 px-1 rounded">login()</code>. This keeps all built-in <code className="font-mono bg-muted/50 px-1 rounded">fill</code>, <code className="font-mono bg-muted/50 px-1 rounded">click</code>, <code className="font-mono bg-muted/50 px-1 rounded">verify</code> methods intact while adding domain-specific workflows.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Playwright</h4>
                        <CodeBlock code={traditionalLoginPageRaw} filename="login.page.ts" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">pw-core</h4>
                        <CodeBlock code={extendedLoginPageRaw} filename="extended-login.page.ts" />
                      </div>
                    </div>
                    <SkeuCard className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Readability Insight:</span>
                        <p>Both frameworks extend from a base class. Playwright extends a manual class; pw-core extends <code className="font-mono bg-muted/50 px-1 rounded">registry.classes.loginPage</code> — an auto-generated typed class from the registry definition.</p>
                      </div>
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Scalability Insight:</span>
                        <p>You only create a class file when you need custom methods. Simple pages stay in the registry with zero files. Complex pages get class extensions without losing any registry benefits.</p>
                      </div>
                    </SkeuCard>
                  </div>

                  {/* D. Extended Fixtures */}
                  <div id="registry-extend-fixtures" className="scroll-mt-24 space-y-4">
                    <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                      <h3 className="text-sm font-bold text-foreground">Extended Fixtures</h3>
                      <DocBadge variant="indigo">extended-fixtures.ts</DocBadge>
                    </SkeuInset>
                    <p className="text-xs text-muted-foreground">
                      Wire the custom subclass into the test runner by extending the registry. This replaces the auto-generated page with your custom class while keeping all other registry pages intact.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Playwright</h4>
                        <CodeBlock code={traditionalFixturesRaw} filename="fixtures.ts" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">pw-core</h4>
                        <CodeBlock code={extendedFixturesRaw} filename="extended-fixtures.ts" />
                      </div>
                    </div>
                    <SkeuCard className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Readability Insight:</span>
                        <p>Both create a new test runner with the extended page class. pw-core uses <code className="font-mono bg-muted/50 px-1 rounded">registry.extend(&#123;&#125;)</code> which automatically inherits all existing fixtures from the registry.</p>
                      </div>
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Scalability Insight:</span>
                        <p>Adding more extended pages is a one-liner in the extend call. No need to re-declare every fixture — only overrides are specified.</p>
                      </div>
                    </SkeuCard>
                  </div>

                  {/* E. Extended Tests */}
                  <div id="registry-extend-tests" className="scroll-mt-24 space-y-4">
                    <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                      <h3 className="text-sm font-bold text-foreground">Extended Tests</h3>
                      <DocBadge variant="indigo">extended-login.test.ts</DocBadge>
                    </SkeuInset>
                    <p className="text-xs text-muted-foreground">
                      Tests that consume the extended fixture. Notice how the custom <code className="font-mono bg-muted/50 px-1 rounded">login()</code> method is now available directly on the destructured <code className="font-mono bg-muted/50 px-1 rounded">loginPage</code> fixture.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Playwright</h4>
                        <CodeBlock code={traditionalLoginCustomTestRaw} filename="login.test.ts" />
                      </div>
                      <div className="grid md:grid-cols-1 gap-2">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">pw-core</h4>
                        <CodeBlock code={extendedLoginTestRaw} filename="extended-login.test.ts" />
                      </div>
                    </div>
                    <SkeuCard className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Readability Insight:</span>
                        <p>Both tests look nearly identical — the only difference is the import source. Custom methods are seamlessly available on the fixture.</p>
                      </div>
                      <div className="space-y-1">
                        <span className="skeu-text-amber-pop block mb-1">Scalability Insight:</span>
                        <p>The registry pattern lets you start simple (no class files) and progressively add complexity (class extensions) only where needed, without refactoring existing tests.</p>
                      </div>
                    </SkeuCard>
                  </div>
                </div>
              </div>
            )}

            {/* Section 9: Typed Page Examples */}
            {activeTab === "typed-examples" && (
              <div id="typed-examples-root" className="scroll-mt-24 pb-32 space-y-12 animate-in fade-in duration-300">
                <div className="border-b border-border pb-4">
                  <h1 className="text-3xl font-extrabold font-heading text-foreground">
                    Typed Page
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Standard Page Object Model pattern using <code className="font-mono bg-muted/50 px-1 rounded">TypedPage</code> and <code className="font-mono bg-muted/50 px-1 rounded">createPageConfig</code> — compare side by side with traditional Playwright.
                  </p>
                </div>

                {/* Pages Sub-Section */}
                <div id="typed-pages" className="scroll-mt-24 space-y-6">
                  <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                    <h3 className="text-sm font-bold text-foreground">A. Page Objects</h3>
                    <DocBadge variant="indigo">*.page.ts</DocBadge>
                  </SkeuInset>
                  <p className="text-xs text-muted-foreground">
                    Page objects model the UI components and pages. Traditional Playwright maps elements to manual selectors, while pw-core binds them to static page configurations.
                  </p>

                  {/* Login Page Code */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold text-muted-foreground">Login Page Object</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <CodeBlock code={traditionalLoginPageRaw} filename="login.page.ts" />
                      </div>
                      <div className="space-y-2">
                        <CodeBlock code={pwcoreLoginPageRaw} filename="login.page.ts" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Page Code */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[11px] font-bold text-muted-foreground">Dashboard Page (Multiple Tables Example)</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Note: The <code className="font-mono bg-muted/50 px-1 rounded">Project</code> and <code className="font-mono bg-muted/50 px-1 rounded">Task</code> interfaces are identical in both implementations.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <CodeBlock code={traditionalDashboardPageRaw} filename="dashboard.page.ts" />
                      </div>
                      <div className="space-y-2">
                        <CodeBlock code={pwcoreDashboardPageRaw} filename="dashboard.page.ts" />
                      </div>
                    </div>
                  </div>

                  <SkeuCard className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="space-y-1">
                      <span className="skeu-text-amber-pop block mb-1">Readability Insight:</span>
                      <p>Playwright requires declaring fields for all locators and initializing them manually. <code className="font-mono bg-muted/50 px-1 rounded">pw-core</code> organizes URLs, selectors, and testIds inside a single <code className="font-mono bg-muted/50 px-1 rounded">createPageConfig</code> block, auto-generating TypedPage helper methods.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="skeu-text-amber-pop block mb-1">Scalability Insight:</span>
                      <p>With <code className="font-mono bg-muted/50 px-1 rounded">pw-core</code>, you don't write boilerplate field initializers. The dynamic page methods allow you to call <code className="font-mono bg-muted/50 px-1 rounded">this.click("locatorName")</code> immediately, significantly reducing class sizes as the application grows.</p>
                    </div>
                  </SkeuCard>
                </div>

                {/* Fixtures Sub-Section */}
                <div id="typed-fixtures" className="scroll-mt-24 space-y-4">
                  <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                    <h3 className="text-sm font-bold text-foreground">B. Fixtures Configuration</h3>
                    <DocBadge variant="indigo">fixtures.ts</DocBadge>
                  </SkeuInset>
                  <p className="text-xs text-muted-foreground">
                    Fixtures extend the base test runner to automatically instantiate and inject Page Objects, keeping test files completely clean.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider">Playwright</h4>
                      <CodeBlock code={traditionalFixturesRaw} filename="fixtures.ts" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">pw-core</h4>
                      <CodeBlock code={pwcoreFixturesRaw} filename="fixtures.ts" />
                    </div>
                  </div>
                  <SkeuCard className="grid md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="space-y-1">
                      <span className="skeu-text-amber-pop block mb-1">Readability Insight:</span>
                      <p>Both frameworks utilize Playwright's test extension API. Symmetrical structure ensures clean imports inside test specs.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="skeu-text-amber-pop block mb-1">Scalability Insight:</span>
                      <p>Defining fixtures once ensures page objects are instantiated automatically per-test, avoiding duplicate setups in every spec.</p>
                    </div>
                  </SkeuCard>
                </div>

                {/* Tests Sub-Section */}
                <div id="typed-tests" className="scroll-mt-24 space-y-6">
                  <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                    <h3 className="text-sm font-bold text-foreground">C. Test Specifications</h3>
                    <DocBadge variant="indigo">*.test.ts</DocBadge>
                  </SkeuInset>
                  <p className="text-xs text-muted-foreground">
                    Tests assert application state. Below are the specs demonstrating login flows.
                  </p>

                  {/* Login Spec */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold text-muted-foreground">Login Specs</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <CodeBlock code={traditionalLoginTestRaw} filename="login.test.ts" />
                      </div>
                      <div>
                        <CodeBlock code={pwcoreLoginTestRaw} filename="login.test.ts" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 10: Releases */}
            {activeTab === "releases" && (() => {
              const activeRelease = releases.find(r => r.id === activeSubSection) || releases[0];
              if (!activeRelease) {
                return (
                  <div className="text-center py-12 text-muted-foreground">
                    No release documentation found.
                  </div>
                );
              }
              return (
                <div id="releases-root" className="scroll-mt-24 pb-32 space-y-12 animate-in fade-in duration-300">
                  <div id={activeRelease.id} className="scroll-mt-24 space-y-6">
                    <div className="border-b border-border pb-4">
                      <h1 className="text-3xl font-extrabold font-heading text-foreground">
                        Release Documentation
                      </h1>
                      <p className="text-sm text-muted-foreground mt-2">
                        Browse release documentation for the latest versions of `pw-core`.
                      </p>
                    </div>

                    <SkeuInset className="flex items-center justify-between px-4 py-2.5 rounded-lg w-full mb-2">
                      <h3 className="text-sm font-bold text-foreground font-heading">Release {activeRelease.label} Guide</h3>
                      <DocBadge variant="success">{activeRelease.label}</DocBadge>
                    </SkeuInset>

                    <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                      <ReactMarkdown
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return match ? (
                              <div className="my-4">
                                <CodeBlock
                                  code={String(children).replace(/\n$/, "")}
                                  filename={match[1]}
                                />
                              </div>
                            ) : (
                              <code className="font-mono bg-muted/50 px-1.5 py-0.5 rounded text-amber-500 font-semibold" {...props}>
                                {children}
                              </code>
                            );
                          },
                          h1({ children }) {
                            return <h1 className="text-2xl font-extrabold font-heading text-foreground mt-8 mb-4 border-b border-border pb-2">{children}</h1>;
                          },
                          h2({ children }) {
                            return <h2 className="text-xl font-bold font-heading text-foreground mt-6 mb-3">{children}</h2>;
                          },
                          h3({ children }) {
                            return <h3 className="text-lg font-bold font-heading text-foreground mt-4 mb-2">{children}</h3>;
                          },
                          p({ children }) {
                            return <p className="text-sm text-muted-foreground leading-relaxed my-3">{children}</p>;
                          },
                          ul({ children }) {
                            return <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1.5 my-3 pl-2">{children}</ul>;
                          },
                          ol({ children }) {
                            return <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1.5 my-3 pl-2">{children}</ol>;
                          },
                          li({ children }) {
                            return <li className="text-sm text-muted-foreground">{children}</li>;
                          },
                          hr() {
                            return <hr className="my-6 border-border" />;
                          },
                          table({ children }) {
                            return (
                              <div className="border border-border/85 rounded-lg overflow-hidden my-4">
                                <table className="w-full text-xs text-left">{children}</table>
                              </div>
                            );
                          },
                          thead({ children }) {
                            return <thead className="bg-muted/50 border-b border-border">{children}</thead>;
                          },
                          tr({ children }) {
                            return <tr>{children}</tr>;
                          },
                          th({ children }) {
                            return <th className="p-3 font-semibold text-muted-foreground uppercase">{children}</th>;
                          },
                          td({ children }) {
                            return <td className="p-3 text-muted-foreground">{children}</td>;
                          }
                        }}
                      >
                        {activeRelease.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })()}

          </SkeuCard>
        </main>
      </div>
    </div>
  );
}
