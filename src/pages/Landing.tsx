// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import CodeBlock from "../components/shared/CodeBlock";

// Import example source files raw for code comparison replica
import traditionalLoginPageRaw from "../docs/pw-core/examples/playwright/pages/login.page.ts?raw";
import traditionalLoginTestRaw from "../docs/pw-core/examples/playwright/tests/login.test.ts?raw";
import pwcoreLoginPageRaw from "../docs/pw-core/examples/pw-core/pages/login.page.ts?raw";
import pwcoreLoginTestRaw from "../docs/pw-core/examples/pw-core/tests/login.test.ts?raw";

const appArchSteps = [
  { label: "UI", sub: "React + Tailwind", icon: Monitor },
  { label: "Fake APIs", sub: "/api/*", icon: Server },
  { label: "JSON DB", sub: "Entities", icon: Database },
  { label: "Storage", sub: "Persistent", icon: Globe },
];

const frameworkArchSteps = [
  { label: "Tests", sub: "Clean & declarative", icon: FlaskConical },
  { label: "Registry", sub: "Automatic fixtures", icon: Database },
  { label: "Typed Pages", sub: "Type-safe Object Model", icon: LayoutDashboard },
  { label: "Components", sub: "Reusable Tables/UI", icon: Table2 },
  { label: "Playwright Engine", sub: "Automated browser", icon: Server },
];

const componentMatrix = [
  { component: "Form Inputs & OTP", page: "QA Playground", desc: "Inputs, sliders, toggles, and 6-digit OTP fields.", icon: TextCursorInput },
  { component: "Sortable Data Tables", page: "Projects, Tasks & QA Playground", desc: "Sorting, column styling, and filter search.", icon: Table2 },
  { component: "File Dropzones", page: "Documents & QA Playground", desc: "Drag-and-drop attachments with size checks.", icon: Upload },
  { component: "Dialogs & Modals", page: "Projects, Tasks & Kanban Board", desc: "Sheet overlays, dialog popups, and date-pickers.", icon: SquareStack },
  { component: "API Schema Sandbox", page: "Swagger Portal", desc: "JSON schema validation and live endpoint execution.", icon: BookOpen },
];

const modules = [
  {
    label: "App Platform",
    path: "/app",
    icon: LayoutDashboard,
    badge: "1",
    verify: "Complete user workflows",
    desc: "Dashboard, Projects, Tasks, Board, Documents, Activity",
    color: "amber"
  },
  {
    label: "QA Playground",
    path: "/playground",
    icon: FlaskConical,
    badge: "2",
    verify: "Component responsiveness",
    desc: "Inputs, Selectors, Tables, Upload, Advanced",
    color: "indigo"
  },
  {
    label: "Swagger Portal",
    path: "/swagger",
    icon: FileCode2,
    badge: "3",
    verify: "Integration testing",
    desc: "Endpoints, Models, Execute",
    color: "emerald"
  },
];

function GlitchCommand() {
  const [action, setAction] = React.useState("init");
  const [displayText, setDisplayText] = React.useState("init");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAction((prev) => (prev === "init" ? "install" : "init"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let frame = 0;
    const target = action;
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const glitchDuration = 8; // number of frames to glitch

    const tick = () => {
      if (frame < glitchDuration) {
        const scrambled = Array.from({ length: target.length }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setDisplayText(scrambled);
        frame++;
        requestAnimationFrame(tick);
      } else {
        setDisplayText(target);
      }
    };

    tick();
  }, [action]);

  return (
    <div className="skeu-inset flex items-center font-mono text-xs px-3.5 h-[40px] select-none">
      <span className="text-slate-400 select-none mr-2">$</span>
      <span className="text-slate-200 select-all">
        npm <span className="text-amber-500 font-bold tracking-wide transition-all duration-150 inline-block min-w-[48px] text-center">{displayText}</span> pw-core
      </span>
    </div>
  );
}

export default function Landing() {
  const [downloads, setDownloads] = React.useState("Loading...");
  const [activeFile, setActiveFile] = React.useState<"page" | "spec">("page");

  React.useEffect(() => {
    fetch("https://api.npmjs.org/downloads/point/last-month/pw-core")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.downloads === "number") {
          setDownloads(data.downloads.toLocaleString());
        } else {
          setDownloads("124,500");
        }
      })
      .catch(() => {
        setDownloads("124,500");
      });
  }, []);

  return (
    <div className="notion-page pb-12">
      {/* Hero */}
      <section className="text-left py-12 md:py-8 border-b border-border/40 mb-12">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="text-xs font-bold tracking-widest uppercase mb-10 space-y-1">
            <span className="text-muted-foreground/60 block">BUILT FOR PLAYWRIGHT</span>
            <span className="text-amber-500 dark:text-amber-400 block text-sm font-semibold tracking-wider">TYPE-SAFE | READABLE | SCALABLE</span>
          </div>

          {/* Main Heading */}
          <h1 className="flex flex-col gap-1 mb-6 font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Build
            <span className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent py-1">
              Playwright Automation
            </span>
            with PW-Core
          </h1>

          {/* Subtext */}
          <div className="space-y-4 max-w-3xl mb-8">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              PW-Core eliminates the boilerplate that grows as Playwright projects scale.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Build type-safe page objects, reusable components, and scalable test architecture without maintaining custom boilerplate.
            </p>
            <p className="text-lg md:text-xl text-foreground font-extrabold tracking-tight font-heading leading-tight pt-2">
              Write less. Ship more.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/docs">
              <button className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-medium text-sm rounded-md shadow-md hover:shadow-lg transition-all">
                Get started
              </button>
            </Link>

            <a
              href="https://www.npmjs.com/package/pw-core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold select-none rounded-md overflow-hidden border border-border/60 hover:border-amber-500/50 transition-all"
            >
              <span className="skeu-badge-up flex items-center gap-1.5 px-3 h-[40px] text-foreground bg-white/[0.02] border-r border-border/40">
                <svg className="w-4 h-4 fill-[#CB3837]" viewBox="0 0 24 24">
                  <path d="M0 7.334v8h6.666v2H13.333v-2h10.667v-8H0zm1.333 1.333h5.333v6.667H5.333V10H4v4H1.333V8.667zm6.667 0h8v5.333H12v1.333h-1.333v-1.333h-2.667V8.667zM17.333 8.667H22.667v5.333h-2.667V10H18.667v4H17.333V8.667zm-8 1.333v2.667h2.667V10H9.333z" />
                </svg>
                Package
              </span>
            </a>

            {/* Animated glitch code block */}
            <GlitchCommand />

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/QECore/pw-core"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 transition-all bg-white/[0.02] border border-border/40 shrink-0"
              title="GitHub Repository"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* Developer Profile Link */}
            <a
              href="https://github.com/shanmukaanem"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full overflow-hidden skeu-inset flex items-center justify-center hover:border-amber-500/50 transition-all border border-border/40 shrink-0"
              title="Developer Profile"
            >
              <img 
                src="https://github.com/shanmukaanem.png" 
                alt="Shanmuka Chandra Teja Anem" 
                className="w-5 h-5 object-cover rounded-full"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Why PW-Core Section */}
      <section className="py-12 border-b border-border/40 mb-12">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
            Why Teams Adopt PW-Core
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Type-safe Selectors", desc: "Compile-time safety for all locators, testIds, and dynamic selectors." },
              { title: "Reusable Components", desc: "Build modular compound elements like Tables, Modals, and Cards once and reuse everywhere." },
              { title: "Registry-driven Fixtures", desc: "Centralized page registry automatically wires files into Playwright fixtures without manual setup." },
              { title: "Cleaner Tests", desc: "Focus test files completely on logic and intent, rather than locator extraction and selector querying." },
              { title: "Zero Maintenance Boilerplate", desc: "Say goodbye to redundant page class fields, element initializers, and boilerplate constructors." },
              { title: "Built on Playwright", desc: "Integrates natively with Playwright test runner features, assertions, configurations, and reports." }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Comparison Section */}
      <section className="py-12 border-b border-border/40 mb-12">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
            Playwright vs PW-Core
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Compare standard Playwright boilerplate with clean, intent-driven PW-Core code.
          </p>

          {/* Comparison metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="skeu-inset p-4 text-center rounded-lg">
              <span className="text-2xl font-extrabold text-amber-500 block">70%</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Less Boilerplate</span>
            </div>
            <div className="skeu-inset p-4 text-center rounded-lg">
              <span className="text-2xl font-extrabold text-amber-500 block">100%</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Type Safe</span>
            </div>
            <div className="skeu-inset p-4 text-center rounded-lg">
              <span className="text-2xl font-extrabold text-amber-500 block">Single</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Source of Truth</span>
            </div>
          </div>

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
        </div>
      </section>

      {/* Core Features Strip */}
      <section className="py-8 border-b border-border/40 mb-12">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            Core Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { name: "Typed Pages", desc: "Automated APIs from configs" },
              { name: "Page Registry", desc: "Centralized fixture mapping" },
              { name: "Components", desc: "Modular element wrappers" },
              { name: "Assertions", desc: "Chainable verify statements" },
              { name: "Storage Helpers", desc: "Fast cookies/session state" },
              { name: "Fixtures", desc: "Automatic test isolation" }
            ].map((feat, i) => (
              <SkeuCard key={i} className="p-3 text-center flex flex-col justify-center min-h-[90px] hover:border-amber-500/25 transition-all">
                <span className="font-heading font-bold text-xs text-foreground block mb-1">{feat.name}</span>
                <span className="text-[10px] text-muted-foreground leading-normal">{feat.desc}</span>
              </SkeuCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mt-8">
          {modules.map((mod) => (
            <Link key={mod.path} to={mod.path} className="group flex flex-col h-full">
              <SkeuCard className="w-full h-full hover:shadow-md transition-all duration-300 p-6 border border-border/60 group-hover:border-indigo-500/40 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative background blur gradient */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-colors ${mod.color === "amber" ? "bg-amber-500/5 group-hover:bg-amber-500/10" :
                  mod.color === "indigo" ? "bg-indigo-500/5 group-hover:bg-indigo-500/10" :
                    "bg-emerald-500/5 group-hover:bg-emerald-500/10"
                  }`} />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Top Row: Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg skeu-inset flex items-center justify-center shrink-0">
                      <mod.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${mod.color === "amber" ? "bg-amber-500/10 text-amber-500" :
                      mod.color === "indigo" ? "bg-indigo-500/10 text-indigo-500" :
                        "bg-emerald-500/10 text-emerald-500"
                      }`}>
                      {mod.badge}
                    </span>
                  </div>

                  {/* Module Label */}
                  <h3 className="font-heading font-bold text-base group-hover:text-accent transition-colors mb-2">
                    {mod.label}
                  </h3>

                  {/* Verification Pillar */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 block mb-0.5">Verify</span>
                    <p className="text-sm font-semibold text-foreground/90 leading-snug">{mod.verify}</p>
                  </div>

                  {/* Details / Features */}
                  <div className="pt-3 border-t border-border/50 mb-6 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 block mb-1">Features</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-2">
                  <SkeuButton variant={mod.path === "/app" ? "primary" : "default"} className="w-full text-xs py-1.5 h-9">
                    Open {mod.label.replace(" Portal", "")}
                  </SkeuButton>
                </div>
              </SkeuCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Framework Architecture */}
      <section className="mb-12">
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Framework Architecture</h2>
        <SkeuCard className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 overflow-x-auto">
            {frameworkArchSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="skeu-inset px-3 py-4 text-center flex-1 min-w-[125px] max-w-[160px] h-[105px] flex flex-col justify-center">
                  <step.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-heading font-semibold text-xs text-foreground leading-tight">{step.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-normal">{step.sub}</p>
                </div>
                {i < frameworkArchSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 rotate-90 lg:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </SkeuCard>
      </section>

      {/* App Architecture */}
      <section className="mb-12">
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Demo App Architecture</h2>
        <SkeuCard className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {appArchSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="skeu-inset px-5 py-4 text-center min-w-[150px] flex-1">
                  <step.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-heading font-semibold text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                </div>
                {i < appArchSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 rotate-90 sm:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </SkeuCard>
      </section>

      {/* Component Matrix */}
      <section className="mb-12">
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Component Matrix</h2>
        <SkeuCard className="overflow-hidden p-0">
          <table id="landing-component-matrix-table" data-test-id="landing-component-matrix-table" data-testid="landing-component-matrix-table" className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th id="landing-hdr-group" data-test-id="landing-hdr-group" data-testid="landing-hdr-group" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Component Group</th>
                <th id="landing-hdr-location" data-test-id="landing-hdr-location" data-testid="landing-hdr-location" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Page / Location</th>
                <th id="landing-hdr-desc" data-test-id="landing-hdr-desc" data-testid="landing-hdr-desc" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Capabilities Checked</th>
              </tr>
            </thead>
            <tbody>
              {componentMatrix.map((row) => {
                const slug = row.component.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <tr key={row.component} id={`landing-row-${slug}`} data-test-id={`landing-row-${slug}`} data-testid={`landing-row-${slug}`} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td id={`landing-cell-${slug}-group`} data-test-id={`landing-cell-${slug}-group`} data-testid={`landing-cell-${slug}-group`} className="px-4 py-3 flex items-center gap-2">
                      <row.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium">{row.component}</span>
                    </td>
                    <td id={`landing-cell-${slug}-location`} data-test-id={`landing-cell-${slug}-location`} data-testid={`landing-cell-${slug}-location`} className="px-4 py-3 text-muted-foreground">{row.page}</td>
                    <td id={`landing-cell-${slug}-desc`} data-test-id={`landing-cell-${slug}-desc`} data-testid={`landing-cell-${slug}-desc`} className="px-4 py-3 text-muted-foreground text-xs">{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SkeuCard>
      </section>

      {/* API Overview */}
      <section className="mb-12">
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">API Overview</h2>
        <SkeuCard>
          <div className="code-block text-xs">
            <p className="text-emerald-400">{"// Base URLs"}</p>
            <p>App      → <span className="text-amber-300">/api/app</span></p>
            <p>QA       → <span className="text-amber-300">/api/auth</span></p>
            <p className="mt-3 text-emerald-400">{"// All backed by entities (JSON DB → Storage)"}</p>
          </div>
        </SkeuCard>
      </section>
    </div>
  );
}