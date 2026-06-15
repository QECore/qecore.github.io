import { useState } from "react";
import { BookOpen, ChevronRight, Terminal, Code, Play } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";

const docSections = [
  {
    id: "intro",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-foreground">Getting Started with PW-Core</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PW-Core is a modern Quality Engineering framework built on top of Playwright. It provides out-of-the-box support for TypeScript, automatic schema validation, API mocking, and cross-browser testing.
        </p>
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Installation
          </h3>
          <pre className="code-block text-xs">npm install @pw-core/cli playwright --save-dev</pre>
        </div>
      </div>
    ),
  },
  {
    id: "writing-tests",
    title: "Writing Tests",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-foreground">Writing Your First Test</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PW-Core simplifies test declarations by providing pre-configured hooks, automatic screenshots, and video recordings for failing runs.
        </p>
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" /> example.spec.ts
          </h3>
          <pre className="code-block text-xs">{`import { test, expect } from '@pw-core/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});`}</pre>
        </div>
      </div>
    ),
  },
  {
    id: "runner",
    title: "Running Tests",
    content: (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-foreground">Test Execution</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You can run single tests, specific files, or execute the entire test suite in headed or headless modes using the built-in CLI.
        </p>
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5" /> Commands
          </h3>
          <pre className="code-block text-xs">{`# Run all specs
npx pw-core test

# Run a specific spec in headed mode
npx pw-core test example.spec.ts --headed`}</pre>
        </div>
      </div>
    ),
  },
];

export default function Docs() {
  const [activeTab, setActiveTab] = useState("intro");

  const activeContent = docSections.find((s) => s.id === activeTab)?.content;

  return (
    <div className="notion-page py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <SkeuCard className="p-3">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="font-heading font-bold text-sm">Documentation</span>
            </div>
            <nav className="space-y-1">
              {docSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    activeTab === sec.id
                      ? "bg-secondary text-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  <span>{sec.title}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === sec.id ? "rotate-90 text-foreground" : "text-muted-foreground/50"}`} />
                </button>
              ))}
            </nav>
          </SkeuCard>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <SkeuCard className="p-8">
            {activeContent}
          </SkeuCard>
        </main>
      </div>
    </div>
  );
}
