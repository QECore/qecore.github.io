// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen, Activity, Zap, Cpu } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import ThreadedPageLayout from "../components/layout/ThreadedPageLayout";
import ElasticScroll from "../components/shared/ElasticScroll";
import Docs from "./Docs";

const archSteps = [
  { label: "k6 Scripting", sub: "TypeScript / JS", icon: Monitor },
  { label: "k6 Engine", sub: "Go-based runner", icon: Server },
  { label: "Virtual Users", sub: "Parallel Execution", icon: Cpu },
  { label: "Metrics & Logs", sub: "InfluxDB / Grafana", icon: Activity },
];

const capabilities = [
  { group: "Type-safe Scenarios", page: "k6 Scripts", desc: "Define load profiles, stages, and thresholds with auto-completion.", icon: TextCursorInput },
  { group: "Playwright-like Syntax", page: "API Requests", desc: "Write HTTP requests and checks using familiar page-object patterns.", icon: Table2 },
  { group: "Reusable Helpers", page: "Load Testing", desc: "Helper functions for auth, parsing, and setup/teardown.", icon: Zap },
];

export default function K6Core() {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "docs", label: "Docs" },
    { id: "capabilities", label: "Capabilities" },
  ];

  return (
    <ElasticScroll>
      <ThreadedPageLayout sections={sections}>
        <div className="notion-page pt-0 pb-12">
          {/* overview */}
          <section id="overview" className="snap-item scroll-mt-24 text-left py-12 md:py-8 border-b border-border/40 mb-12 relative">
            <div className="max-w-4xl">
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-10 flex-wrap">
                <div className="text-indigo-500 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase">
                  TYPE-SAFE | READABLE | EASY-TO-CONFIGURE
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="flex flex-col gap-1 mb-6 font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Performance Tests With
                <span className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent py-1">
                  K6-Core
                </span>
                That looks like Playwright
              </h1>

              {/* Subtext */}
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-6 leading-relaxed">
                K6-Core brings the familiar structure, type-safety, and developer experience of Playwright to performance testing. Define virtual users, thresholds, and scenarios with zero-boilerplate setup.
                <span className="block mt-2 text-foreground/90 font-medium">
                  Configure easily. Script in TypeScript. Run at scale.
                </span>
              </p>

              <div className="mt-8 text-2xl md:text-3xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent animate-pulse select-none">
                Coming soon, stay tuned!
              </div>
            </div>
          </section>

          <section id="docs" className="snap-item scroll-mt-24 mb-12 relative text-left">
            <h2 className="sticky top-[60px] z-20 py-3 mb-4 backdrop-blur-md bg-background/85 text-2xl font-bold font-heading text-foreground">
              Docs
            </h2>
            <Docs isEmbedded={true} />
          </section>

          {/* Component Matrix */}
          <section id="capabilities" className="snap-item scroll-mt-24 mb-12 relative">
            <h2 className="sticky top-[60px] z-20 py-3 mb-4 backdrop-blur-md bg-background/85 text-sm font-semibold font-heading uppercase tracking-wider text-muted-foreground">Capabilities</h2>
            <SkeuCard className="overflow-hidden p-0">
              <table id="k6-capabilities-table" data-test-id="k6-capabilities-table" data-testid="k6-capabilities-table" className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th id="k6-hdr-group" data-test-id="k6-hdr-group" data-testid="k6-hdr-group" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Capability Group</th>
                    <th id="k6-hdr-location" data-test-id="k6-hdr-location" data-testid="k6-hdr-location" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Location / Usage</th>
                    <th id="k6-hdr-desc" data-test-id="k6-hdr-desc" data-testid="k6-hdr-desc" className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilities.map((row) => {
                    const slug = row.group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <tr key={row.group} id={`k6-row-${slug}`} data-test-id={`k6-row-${slug}`} data-testid={`k6-row-${slug}`} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td id={`k6-cell-${slug}-group`} data-test-id={`k6-cell-${slug}-group`} data-testid={`k6-cell-${slug}-group`} className="px-4 py-3 flex items-center gap-2">
                          <row.icon className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-medium">{row.group}</span>
                        </td>
                        <td id={`k6-cell-${slug}-location`} data-test-id={`k6-cell-${slug}-location`} data-testid={`k6-cell-${slug}-location`} className="px-4 py-3 text-muted-foreground">{row.page}</td>
                        <td id={`k6-cell-${slug}-desc`} data-test-id={`k6-cell-${slug}-desc`} data-testid={`k6-cell-${slug}-desc`} className="px-4 py-3 text-muted-foreground text-xs">{row.desc}</td>
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
