// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import ThreadedPageLayout from "../components/layout/ThreadedPageLayout";
import ElasticScroll from "../components/shared/ElasticScroll";

const appArchSteps = [
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

const sections = [
  { id: "modules", label: "Explore Modules" },
  { id: "architecture", label: "Architecture & API" },
  { id: "matrix", label: "Component Matrix" },
];

export default function QAWorkspace() {

  return (
    <ElasticScroll>
      <ThreadedPageLayout sections={sections}>
        <div className="notion-page pt-0 pb-12">
          {/* Explore Modules */}
          <section id="modules" className="snap-item scroll-mt-24 mb-12 relative text-left">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              Explore Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mt-8">
              {modules.map((mod) => (
                <Link key={mod.path} to={mod.path} className="group flex flex-col h-full">
                  <SkeuCard className="w-full h-full transition-all duration-300 p-6 border border-border/60 group-hover:border-amber-500/40 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:scale-[1.03] flex flex-col justify-between relative overflow-hidden">
                    <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-colors ${mod.color === "amber" ? "bg-amber-500/5 group-hover:bg-amber-500/10" :
                      mod.color === "indigo" ? "bg-indigo-500/5 group-hover:bg-indigo-500/10" :
                        "bg-emerald-500/5 group-hover:bg-emerald-500/10"
                      }`} />

                    <div className="relative z-10 flex-1 flex flex-col">
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

                      <h3 className="font-heading font-bold text-base group-hover:text-accent transition-colors mb-2">
                        {mod.label}
                      </h3>

                      <div className="mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 block mb-0.5">Verify</span>
                        <p className="text-sm font-semibold text-foreground/90 leading-snug">{mod.verify}</p>
                      </div>

                      <div className="pt-3 border-t border-border/50 mb-6 flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 block mb-1">Features</span>
                        <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto pt-2">
                      <SkeuButton variant="default" className="w-full text-xs py-1.5 h-9">
                        Open {mod.label.replace(" Portal", "")}
                      </SkeuButton>
                    </div>
                  </SkeuCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Architecture & API */}
          <section id="architecture" className="snap-item scroll-mt-24 mb-12 relative text-left">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              Architecture & API
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
              {/* Left Column: App Architecture */}
              <SkeuCard className="p-4 flex flex-col justify-between">
                <h3 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80 mb-3">
                  Demo App Architecture
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 flex-1">
                  {appArchSteps.map((step, i) => (
                    <React.Fragment key={step.label}>
                      <div className="skeu-inset px-2.5 py-3 text-center min-w-[90px] flex-1">
                        <step.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-heading font-semibold text-[11px] leading-tight">{step.label}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{step.sub}</p>
                      </div>
                      {i < appArchSteps.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 rotate-90 sm:rotate-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </SkeuCard>

              {/* Right Column: API Overview */}
              <SkeuCard className="p-4 flex flex-col justify-between">
                <h3 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/80 mb-3">
                  API Overview & Swagger
                </h3>
                <div className="code-block text-[10.5px] p-3 flex-1 flex flex-col justify-center leading-relaxed h-full">
                  <p className="text-emerald-400">{"// Base URLs"}</p>
                  <p>App      → <span className="text-amber-300">/api/app</span></p>
                  <p>QA       → <span className="text-amber-300">/api/auth</span></p>
                  <p className="mt-2 text-emerald-400">{"// Backed by JSON DB → Storage"}</p>
                </div>
              </SkeuCard>
            </div>
          </section>

          {/* Component Matrix */}
          <section id="matrix" className="snap-item scroll-mt-24 mb-12 relative text-left">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
              Component Matrix
            </h2>
            <SkeuCard className="overflow-hidden p-0">
              <table id="landing-component-matrix-table" data-test-id="landing-component-matrix-table" data-testid="landing-component-matrix-table" className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th id="landing-hdr-group" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Component Group</th>
                    <th id="landing-hdr-location" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Page / Location</th>
                    <th id="landing-hdr-desc" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Capabilities Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {componentMatrix.map((row) => {
                    const slug = row.component.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <tr key={row.component} id={`landing-row-${slug}`} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td id={`landing-cell-${slug}-group`} className="px-4 py-3 flex items-center gap-2">
                          <row.icon className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-medium">{row.component}</span>
                        </td>
                        <td id={`landing-cell-${slug}-location`} className="px-4 py-3 text-muted-foreground">{row.page}</td>
                        <td id={`landing-cell-${slug}-desc`} className="px-4 py-3 text-muted-foreground text-xs">{row.desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </SkeuCard>
          </section>
        </div>
      </ThreadedPageLayout>
    </ElasticScroll>
  );
}
