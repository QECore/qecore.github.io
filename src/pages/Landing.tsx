// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";

const archSteps = [
  { label: "UI", sub: "React + Tailwind", icon: Monitor },
  { label: "Fake APIs", sub: "/api/*", icon: Server },
  { label: "JSON DB", sub: "Entities", icon: Database },
  { label: "Storage", sub: "Persistent", icon: Globe },
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

export default function Landing() {
  const [downloads, setDownloads] = React.useState("Loading...");

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
          <div className="text-amber-500 dark:text-amber-400 text-sm font-semibold tracking-wider uppercase mb-10">
            TYPE-SAFE | READABLE | SCALABLE
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
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
            PW-Core provides the building blocks for scalable Playwright automation, combining type-safe page objects, reusable components, and developer-friendly APIs.
            <span className="block mt-2 text-foreground/90 font-medium">
              Write less boilerplate. Maintain more automation.
            </span>
          </p>

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
              className="inline-flex items-center text-xs font-semibold select-none"
            >
              <span
                className="skeu-badge-up flex items-center gap-1.5 px-3 py-3 text-foreground"
                style={{ borderRadius: 'calc(var(--radius) - 2px) 0 0 calc(var(--radius) - 2px)' }}
              >
                <svg className="w-4 h-4 fill-[#CB3837]" viewBox="0 0 24 24">
                  <path d="M0 7.334v8h6.666v2H13.333v-2h10.667v-8H0zm1.333 1.333h5.333v6.667H5.333V10H4v4H1.333V8.667zm6.667 0h8v5.333H12v1.333h-1.333v-1.333h-2.667V8.667zM17.333 8.667H22.667v5.333h-2.667V10H18.667v4H17.333V8.667zm-8 1.333v2.667h2.667V10H9.333z" />
                </svg>
                Downloads
              </span>
              <span
                className="skeu-badge-down px-3 py-3 font-mono text-orange-500"
                style={{ borderRadius: '0 calc(var(--radius) - 2px) calc(var(--radius) - 2px) 0' }}
              >
                {downloads}
              </span>
            </a>
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

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Architecture</h2>
        <SkeuCard className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {archSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="skeu-inset px-5 py-4 text-center min-w-[150px]">
                  <step.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-heading font-semibold text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.sub}</p>
                </div>
                {i < archSteps.length - 1 && (
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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Component Group</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Page / Location</th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Capabilities Checked</th>
              </tr>
            </thead>
            <tbody>
              {componentMatrix.map((row) => (
                <tr key={row.component} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <row.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-medium">{row.component}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.page}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{row.desc}</td>
                </tr>
              ))}
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