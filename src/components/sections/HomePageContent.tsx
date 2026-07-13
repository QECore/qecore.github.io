// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/buttons/button";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, ChevronDown, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen, Settings, Cpu, Layers, Play, Copy, Check, Mail, Linkedin } from "lucide-react";
import SkeuCard from "@/components/cards/SkueCard";
import SkeuButton from "@/components/buttons/SkueButton";
import CodeBlock from "@/components/code/CodeBlock";
import ArchitectureDeck from "@/components/sections/ArchitectureDeck";
import { HomeLayout } from "@/components/layout/HomeLayout";
import ElasticScroll from "@/components/layout/ElasticScroll";
import ComparisonMetrics from "@/components/cards/ComparisonMetrics";
import { Highlight, themes } from "prism-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
import { ENGINEERING_PROBLEMS } from "@/pages/code/problems/problems";
import traditionalLoginPageRaw from "@/docs/pw-core/examples/playwright/pages/login.page.ts?raw";
import traditionalLoginTestRaw from "@/docs/pw-core/examples/playwright/tests/login.test.ts?raw";
import traditionalFixturesRaw from "@/docs/pw-core/examples/playwright/docs/fixtures.ts?raw";
import philosophyData from "@/docs/pw-core/philosophy.json";
import { homeSections } from "@/constants/homeSections";

const PLAYWRIGHT_COMPARISON_CODE = `// pages/login.page.ts
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  public page: Page;
  public username: Locator;
  public password: Locator;
  public loginBtn: Locator;
  public loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = this.page.getByTestId("username-input");
    this.password = this.page.getByTestId("password-input");
    this.loginBtn = this.page.getByTestId("login-button");
    this.loginError = this.page.getByTestId("login-error");
  }
}

// docs/fixtures.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

type PageFixtures = { loginPage: LoginPage };

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

// tests/login.test.ts
import { test, expect } from "../docs/fixtures";

test("user can login", async ({ loginPage }) => {
  await loginPage.page.goto("/login");
  await loginPage.username.fill("admin");
  await loginPage.password.fill("password");
  await loginPage.loginBtn.click();
  await expect(loginPage.loginError).toBeVisible();
});`;

const PW_CORE_COMPARISON_CODE = `// registry.ts
export const test = createPageRegistry({
  login: {
    url: '/login',
    testIds: {
      name: 'username-input',
      password: 'password-input',
      login: 'login-button',
      loginErr: 'login-error'
    }
  }
})

// login.test.ts
test('Verify Login', async ({ login }) => {
  await login.goto()
  await login.fill('name', 'teja')
  await login.fill('password', 'pw-core-secret')
  await login.click('login')
  await login.verify('loginErr')
})`;


const REGISTRY_CODE = `export const test = createPageRegistry({
  login: {
    url: '/login',
    testIds: {
      name: 'username',
      password: 'password',
      submit: 'submit-btn'
    },
  },

  dashboard: {
    url: '/app',
    selectors: {
      heading: 'h1:has-text("Dashboard")',
    },
  },
})`;

const TEST_CODE = `test('Verify Login', async ({ login, dashboard }) => {
  await login.goto()
  await login.fill('name', 'teja')
  await login.fill('password', 'pw-core-secret')
  await login.click('Submit')
  await dashboard.verifyURL()
})`;


function GlitchCommand() {
  const [action, setAction] = React.useState("init");
  const [displayText, setDisplayText] = React.useState("init");
  const [displayHeading, setDisplayHeading] = React.useState("NEW");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAction((prev) => (prev === "init" ? "install" : "init"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let frame = 0;
    const targetText = action;
    const targetHeading = action === "init" ? "NEW" : "EXISTING";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const glitchDuration = 8; // number of frames to glitch

    const tick = () => {
      if (frame < glitchDuration) {
        const scrambledText = Array.from({ length: targetText.length }, () =>
          chars[Math.floor(Math.random() * chars.length)].toLowerCase()
        ).join("");
        const scrambledHeading = Array.from({ length: targetHeading.length }, () =>
          chars[Math.floor(Math.random() * chars.length)].toUpperCase()
        ).join("");
        setDisplayText(scrambledText);
        setDisplayHeading(scrambledHeading);
        frame++;
        requestAnimationFrame(tick);
      } else {
        setDisplayText(targetText);
        setDisplayHeading(targetHeading);
      }
    };

    tick();
  }, [action]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`npm ${action} pw-core@latest`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] rounded-md overflow-hidden flex items-center h-[40px] select-none w-[350px] shrink-0">
      {/* Left Amber Block */}
      <div
        className="bg-amber-500/90 text-black font-extrabold h-full flex flex-col justify-center text-[9px] uppercase tracking-wider shrink-0 leading-tight text-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.85),_inset_1px_0_2px_rgba(0,0,0,0.5)]"
        style={{ width: "82px" }}
      >
        <span>{displayHeading}</span>
        <span>Projects</span>
      </div>

      <div className="pl-3.5 font-mono text-xs flex items-center text-slate-200 flex-1 whitespace-nowrap">
        <span className="text-slate-400 select-none mr-2">$</span>
        <span>npm
          <span className="text-amber-500 font-bold tracking-wide transition-all duration-150 inline-block min-w-[56px] text-center">
            {displayText}
          </span>
          pw-core
          <span className="text-rose-700 font-bold tracking-wide transition-all duration-150 inline-block min-w-[56px] text-center">
            @latest
          </span>
        </span>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-8 h-8 mr-1 rounded hover:bg-white/10 active:bg-white/20 transition-all text-muted-foreground/60 hover:text-amber-500 shrink-0 flex items-center justify-center"
        title="Copy command"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

// @Depricated
function DnaCard({
  children,
  className,
  innerRef,
  onMouseDown,
  onTouchStart
}: {
  children: React.ReactNode;
  className?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}) {
  return (
    <div
      ref={innerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`relative z-10 w-[90%] bg-slate-950/85 border border-amber-500/10 backdrop-blur-md rounded-lg p-2.5 shadow-md hover:border-amber-500/30 transition-shadow duration-300 text-left select-none touch-none ${className || ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// Depricated
function FloatingDnaFeatures() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const card1Ref = React.useRef<HTMLDivElement>(null);
  const card2Ref = React.useRef<HTMLDivElement>(null);
  const card3Ref = React.useRef<HTMLDivElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);

  const cardStates = React.useRef([
    { x: 0, y: 0, vx: 0, vy: 0, isDragging: false, dragStart: { x: 0, y: 0 }, phase: 0, scale: 0.85 },
    { x: 0, y: 0, vx: 0, vy: 0, isDragging: false, dragStart: { x: 0, y: 0 }, phase: 2.0, scale: 1.28 },
    { x: 0, y: 0, vx: 0, vy: 0, isDragging: false, dragStart: { x: 0, y: 0 }, phase: 4.0, scale: 0.85 }
  ]);

  const activeDragIndex = React.useRef<number | null>(null);

  React.useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      const time = performance.now();
      const springK = 0.06;
      const damping = 0.86;

      cardStates.current.forEach((state, i) => {
        const refs = [card1Ref, card2Ref, card3Ref];
        const ref = refs[i].current;
        if (!ref) return;

        if (!state.isDragging) {
          // Pull toward standard resting state (0, 0)
          const ax = (0 - state.x) * springK;
          const ay = (0 - state.y) * springK;

          state.vx = (state.vx + ax) * damping;
          state.vy = (state.vy + ay) * damping;

          state.x += state.vx;
          state.y += state.vy;

          // Prevent micro-movements (jitter) when close to resting state
          if (Math.abs(state.x) < 0.05 && Math.abs(state.vx) < 0.05) {
            state.x = 0;
            state.vx = 0;
          }
          if (Math.abs(state.y) < 0.05 && Math.abs(state.vy) < 0.05) {
            state.y = 0;
            state.vy = 0;
          }
        }

        // Apply visual transformation and tilt
        if (state.x === 0 && state.y === 0 && !state.isDragging) {
          ref.style.transform = `scale(${state.scale})`;
        } else {
          const tiltX = Math.min(Math.max(-state.vy * 1.2, -12), 12);
          const tiltY = Math.min(Math.max(state.vx * 1.2, -12), 12);
          ref.style.transform = `translate3d(${state.x}px, ${state.y}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${state.scale})`;
        }
      });

      // Update SVG path for elastic band
      if (
        containerRef.current &&
        card1Ref.current &&
        card2Ref.current &&
        card3Ref.current &&
        pathRef.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const r1 = card1Ref.current.getBoundingClientRect();
        const r2 = card2Ref.current.getBoundingClientRect();
        const r3 = card3Ref.current.getBoundingClientRect();

        const x1 = r1.left + r1.width / 2 - containerRect.left;
        const y1 = r1.top + r1.height / 2 - containerRect.top;

        const x2 = r2.left + r2.width / 2 - containerRect.left;
        const y2 = r2.top + r2.height / 2 - containerRect.top;

        const x3 = r3.left + r3.width / 2 - containerRect.left;
        const y3 = r3.top + r3.height / 2 - containerRect.top;

        const mx1 = (x1 + x2) / 2;
        const my1 = (y1 + y2) / 2;
        const mx2 = (x2 + x3) / 2;
        const my2 = (y2 + y3) / 2;

        const d = `M ${x1} ${y1} Q ${mx1 - 25} ${my1} ${x2} ${y2} Q ${mx2 + 25} ${my2} ${x3} ${y3}`;
        pathRef.current.setAttribute("d", d);
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    // Mouse and Touch Event Listeners for global dragging
    const handleMouseMove = (e: MouseEvent) => {
      if (activeDragIndex.current === null) return;
      const state = cardStates.current[activeDragIndex.current];
      const newX = e.clientX - state.dragStart.x;
      const newY = e.clientY - state.dragStart.y;
      state.vx = newX - state.x;
      state.vy = newY - state.y;
      state.x = newX;
      state.y = newY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (activeDragIndex.current === null) return;
      const touch = e.touches[0];
      const state = cardStates.current[activeDragIndex.current];
      const newX = touch.clientX - state.dragStart.x;
      const newY = touch.clientY - state.dragStart.y;
      state.vx = newX - state.x;
      state.vy = newY - state.y;
      state.x = newX;
      state.y = newY;
    };

    const handleDragEnd = () => {
      if (activeDragIndex.current !== null) {
        cardStates.current[activeDragIndex.current].isDragging = false;
        activeDragIndex.current = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  const startDrag = (index: number, clientX: number, clientY: number) => {
    const state = cardStates.current[index];
    state.isDragging = true;
    state.dragStart = { x: clientX - state.x, y: clientY - state.y };
    activeDragIndex.current = index;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[380px] flex flex-col justify-between items-center py-2 perspective-[1000px] preserve-3d select-none">
      {/* Elastic band string */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-50" fill="none">
        <path
          ref={pathRef}
          stroke="url(#amber-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 2.5"
          filter="drop-shadow(0 2px 4px rgba(245,158,11,0.4))"
        />
        <defs>
          <linearGradient id="amber-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Card 1 */}
      <DnaCard
        innerRef={card1Ref}
        className="self-start w-[94%] cursor-grab active:cursor-grabbing border-amber-500/30 opacity-90"
        onMouseDown={(e) => startDrag(0, e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(0, e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-heading font-extrabold text-xl text-amber-500 leading-none">Define Once</span>
          <span className="font-heading font-bold text-[12px] text-foreground tracking-wide uppercase">Single Source of Truth</span>
          <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
            Define URLs, selectors, and test IDs once in a single schema.
          </p>
        </div>
      </DnaCard>

      {/* Card 2 */}
      <DnaCard
        innerRef={card2Ref}
        className="self-center w-[70%] cursor-grab active:cursor-grabbing border-amber-500/40 bg-slate-950/95 shadow-[0_12px_40px_rgba(0,0,0,0.9)] z-25"
        onMouseDown={(e) => startDrag(1, e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(1, e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-heading font-extrabold text-xl text-amber-500 leading-none">Typed Pages</span>
          <span className="font-heading font-bold text-[12px] text-foreground tracking-wide uppercase">100% Type-safe</span>
          <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
            Generate type-safe page (test/worker fixtures) and execution APIs automatically.
          </p>
        </div>
      </DnaCard>

      {/* Card 3 */}
      <DnaCard
        innerRef={card3Ref}
        className="self-start w-[94%] cursor-grab active:cursor-grabbing border-amber-500/30 opacity-90"
        onMouseDown={(e) => startDrag(2, e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(2, e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-heading font-extrabold text-xl text-amber-500 leading-none">Cleaner Tests</span>
          <span className="font-heading font-bold text-[12px] text-foreground tracking-wide uppercase">70% Less Boilerplate</span>
          <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
            No manual wiring, imports, or page setup required.
          </p>
        </div>
      </DnaCard>
    </div>
  );
}

const SLIDER_STEPS = [1, 3, 5, 10, 15];

const METRICS_DATA: Record<number, {
  filesTrad: number;
  filesCore: number;
  charsTrad: number;
  charsCore: number;
  devExp: string;
  maintenance: string;
  fixtureComplexity: string;
  imports: string;
  reviewComplexity: string;
}> = {
  1: {
    filesTrad: 3,
    filesCore: 2,
    charsTrad: 2100,
    charsCore: 700,
    devExp: "Simple and clean. Framework overhead is virtually invisible.",
    maintenance: "Negligible",
    fixtureComplexity: "Very Low",
    imports: "None",
    reviewComplexity: "Minimal"
  },
  3: {
    filesTrad: 7,
    filesCore: 4,
    charsTrad: 5600,
    charsCore: 1750,
    devExp: "Multiple POM files and boilerplate fixtures start accumulating.",
    maintenance: "Low",
    fixtureComplexity: "Low",
    imports: "Standard",
    reviewComplexity: "Low"
  },
  5: {
    filesTrad: 11,
    filesCore: 6,
    charsTrad: 8750,
    charsCore: 2800,
    devExp: "Boilerplate fixture wiring starts to become repetitive.",
    maintenance: "Medium",
    fixtureComplexity: "Medium",
    imports: "Increasing",
    reviewComplexity: "Medium"
  },
  10: {
    filesTrad: 21,
    filesCore: 11,
    charsTrad: 17500,
    charsCore: 5425,
    devExp: "Code reviews become slower. Fixture maintenance requires dedicated attention.",
    maintenance: "High",
    fixtureComplexity: "High",
    imports: "Heavy",
    reviewComplexity: "Complex"
  },
  15: {
    filesTrad: 31,
    filesCore: 16,
    charsTrad: 26250,
    charsCore: 8050,
    devExp: "Significant developer friction. Refactoring pages creates a cascading wave of test breakages.",
    maintenance: "Critical",
    fixtureComplexity: "Very High",
    imports: "Severe Clutter",
    reviewComplexity: "Very High"
  }
};

function HeroInstallCard({ handleCopyInstall }: { handleCopyInstall: (cmd: string) => void }) {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  const commandItems = [
    { label: "New Project", cmd: "npm init pw-core" },
    { label: "Existing Playwright Project", cmd: "npm install pw-core" },
    { label: "PW-Core Codegen", cmd: "npx pw-core codegen" }
  ];

  const handleCopy = (cmd: string) => {
    handleCopyInstall(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const renderCmd = (cmd: string) => {
    const parts = cmd.split(" ");
    if (parts[0] === "npx") {
      return (
        <>
          <span className="text-amber-500 font-medium">npx</span>{" "}
          <span className="text-slate-200">{parts[1]}</span>{" "}
          <span className="text-sky-400">{parts[2]}</span>
        </>
      );
    }
    return (
      <>
        <span className="text-amber-500 font-medium">{parts[0]}</span>{" "}
        <span className="text-sky-400">{parts[1]}</span>{" "}
        {parts[2] && <span className="text-slate-200">{parts[2]}</span>}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-950/75 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden text-left hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 mb-2 block">Quick Start</span>
      <h3 className="text-lg font-bold font-heading text-slate-100 mb-4">Start in under one minute</h3>

      <div className="space-y-4">
        {commandItems.map((item, idx) => {
          const isRecommended = item.label === "New Project";
          const containerStyle = isRecommended
            ? "bg-amber-950/20 border-amber-500/35 hover:border-amber-500/60"
            : "bg-black/60 border-white/5 hover:border-white/20";

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`text-[10.5px] font-bold block uppercase tracking-wider ${isRecommended ? "text-amber-500" : "text-slate-400"}`}>
                  {item.label}
                </span>
                {isRecommended && (
                  <span className="text-[9px] font-extrabold tracking-wider text-amber-400 select-none flex items-center gap-1">
                    <span>⭐</span> RECOMMENDED
                  </span>
                )}
              </div>
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border font-mono text-xs text-slate-200 select-all transition-all duration-300 ${containerStyle}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`select-none animate-pulse ${isRecommended ? "text-amber-500/70" : "text-slate-500"}`}>$</span>
                  <span>{renderCmd(item.cmd)}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.cmd)}
                  className={`text-slate-400 hover:text-amber-500 hover:scale-110 active:scale-95 transition-all duration-300 p-1 ${copiedCmd === item.cmd ? "rotate-[360deg] scale-110 duration-500" : ""}`}
                  title="Copy command"
                >
                  {copiedCmd === item.cmd ? (
                    <svg className="w-3.5 h-3.5 text-emerald-400 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-slate-400 hover:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-5 text-center text-[9px] text-muted-foreground/80 font-bold uppercase tracking-wider border-t border-white/5 pt-4 mt-5">
        <div>Works with existing projects</div>
        <div>No custom runner</div>
        <div>Incremental adoption</div>
      </div>
    </div>
  );
}


function HeroIllustration() {
  return (
    <div className="relative w-full h-[360px] rounded-2xl border border-white/10 bg-slate-950/60 shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-center items-center p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md gap-4 relative z-10">
        <div className="flex flex-col items-center bg-black/50 border border-white/5 rounded-xl p-4 w-[110px] text-center transition-all hover:scale-105 hover:border-amber-500/20">
          <Database className="w-6 h-6 text-amber-500 mb-2" />
          <span className="text-[11px] font-mono font-bold text-slate-300">registry.ts</span>
          <span className="text-[9px] text-muted-foreground mt-1">Registry</span>
        </div>

        <div className="flex flex-col items-center w-6 h-6 justify-center">
          <ArrowRight className="w-5 h-5 text-amber-500/40 animate-pulse hidden md:block" />
          <ChevronDown className="w-5 h-5 text-amber-500/40 animate-pulse md:hidden" />
        </div>

        <div className="flex flex-col items-center bg-black/60 border border-amber-500/30 rounded-xl p-4 w-[110px] text-center shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all hover:scale-105">
          <Cpu className="w-6 h-6 text-amber-400 mb-2" />
          <span className="text-[11px] font-mono font-bold text-slate-200">PW-Core</span>
          <span className="text-[9px] text-emerald-400 mt-1 font-semibold">Engine</span>
        </div>

        <div className="flex flex-col items-center w-6 h-6 justify-center">
          <ArrowRight className="w-5 h-5 text-amber-500/40 animate-pulse hidden md:block" />
          <ChevronDown className="w-5 h-5 text-amber-500/40 animate-pulse md:hidden" />
        </div>

        <div className="flex flex-col items-center bg-black/50 border border-white/5 rounded-xl p-4 w-[110px] text-center transition-all hover:scale-105 hover:border-amber-500/20">
          <FileCode2 className="w-6 h-6 text-amber-500 mb-2" />
          <span className="text-[11px] font-mono font-bold text-slate-300">login.test.ts</span>
          <span className="text-[9px] text-muted-foreground mt-1">Tests</span>
        </div>
      </div>

      <div className="mt-8 text-center text-xs font-sans text-slate-400/90 max-w-xs leading-relaxed">
        Define once in a single registry schema. The engine generates pages, wiring, and fixtures automatically.
      </div>
    </div>
  );
}
function ProblemsShowcase() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dotsRef = React.useRef<HTMLDivElement>(null);
  const isHovered = React.useRef(false);
  const isDragging = React.useRef(false);

  const scrollPos = React.useRef(0);
  const startX = React.useRef(0);
  const headIndex = React.useRef(0);
  const animationRef = React.useRef<number>(0);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      if (!prefersReducedMotion && !isHovered.current && !isDragging.current) {
        scrollPos.current += 3;
      }

      if (trackRef.current) {
        const itemWidth = 360 + 24; // Card width + gap

        let changed = false;

        // Shift item to end when it moves out of view on the left
        while (scrollPos.current >= itemWidth) {
          scrollPos.current -= itemWidth;
          if (trackRef.current.firstElementChild) {
            trackRef.current.appendChild(trackRef.current.firstElementChild);
            headIndex.current = (headIndex.current + 1) % ENGINEERING_PROBLEMS.length;
            changed = true;
          }
        }

        // Shift item to start when scrolling backwards past the left edge
        while (scrollPos.current < 0) {
          scrollPos.current += itemWidth;
          if (trackRef.current.lastElementChild) {
            trackRef.current.prepend(trackRef.current.lastElementChild);
            headIndex.current = (headIndex.current - 1 + ENGINEERING_PROBLEMS.length) % ENGINEERING_PROBLEMS.length;
            changed = true;
          }
        }

        trackRef.current.style.transform = `translate3d(-${scrollPos.current}px, 0, 0)`;

        if (changed || !dotsRef.current?.dataset.initialized) {
          if (dotsRef.current) {
            dotsRef.current.dataset.initialized = "true";
            const activeIndex = (headIndex.current + 1) % ENGINEERING_PROBLEMS.length;
            Array.from(dotsRef.current.children).forEach((dot, idx) => {
              if (idx === activeIndex) {
                dot.classList.add('bg-amber-500', 'w-6');
                dot.classList.remove('bg-white/20', 'w-2');
              } else {
                dot.classList.add('bg-white/20', 'w-2');
                dot.classList.remove('bg-amber-500', 'w-6');
              }
            });
          }
        }
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    if (trackRef.current) {
      trackRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    startX.current = e.clientX;
    scrollPos.current += diff;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Trackpad / Mouse Wheel Support
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        scrollPos.current += e.deltaX;
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <style>{`
        .carousel-mask {
          mask-image: linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 100px), transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0px, black 32px, black calc(100% - 100px), transparent 100%);
        }
        @media (min-width: 768px) {
          .carousel-mask {
            mask-image: linear-gradient(to right, transparent 0px, transparent 130px, black 242px, black calc(100% - 150px), transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0px, transparent 130px, black 242px, black calc(100% - 150px), transparent 100%);
          }
        }
      `}</style>
      <div
        className="carousel-mask relative -mx-4 md:mx-0 md:-ml-[242px] w-[calc(100%+32px)] md:w-[calc(100%+242px)] h-[280px] overflow-hidden group select-none touch-none"
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; isDragging.current = false; }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Marquee Track */}
        <div
          ref={trackRef}
          className="flex gap-[24px] w-max cursor-grab active:cursor-grabbing will-change-transform"
        >
          {ENGINEERING_PROBLEMS.map((problem) => (
            <div
              key={problem.id}
              className="flex-shrink-0 w-[360px] h-[280px] bg-[#0b0d11] border border-white/5 rounded-xl p-5 flex flex-col transition-colors duration-300 hover:border-amber-500/30 hover:bg-[#0e1117]"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <problem.icon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-slate-200 text-sm">
                  {problem.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4 h-8 line-clamp-2">
                {problem.description}
              </p>

              {/* Illustration Area */}
              <div className="flex-1 bg-black/60 rounded-lg border border-white/5 p-3 flex flex-col justify-center overflow-hidden group-hover:border-amber-500/20 transition-colors">
                <pre className="font-mono text-[10px] text-slate-500 leading-relaxed whitespace-pre-wrap">
                  {problem.illustration}
                </pre>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {problem.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-semibold bg-white/5 text-slate-300 border border-white/10 px-2 py-0.5 rounded-full select-none">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Dot Indicators */}
      <div className="flex justify-center mt-6 z-10 relative">
        <div ref={dotsRef} className="flex gap-2 items-center">
          {ENGINEERING_PROBLEMS.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${idx === 1 ? 'w-6 bg-amber-500' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function HorizontalTimeline() {
  const steps = [
    { title: "Define Once", desc: "Register elements in one unified schema.", icon: Database },
    { title: "Generate", desc: "PW-Core auto-builds pages and fixtures.", icon: Cpu },
    { title: "Write Tests", desc: "Write behavior code with autocomplete.", icon: FileCode2 },
    { title: "Maintain", desc: "Change one registry to update all tests.", icon: Settings }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8 max-w-4xl mx-auto text-left">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col items-start p-5 bg-slate-900/30 border border-white/5 rounded-xl hover:border-amber-500/10 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold mb-4">
            <step.icon className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-200 mb-1 font-heading">{step.title}</h4>
          <p className="text-xs text-muted-foreground leading-normal">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}

interface HighlightedCodeProps {
  code: string;
  language: string;
}

function HighlightedCode({ code, language }: HighlightedCodeProps) {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} text-[10px] md:text-[10.5px] leading-[1.35] font-mono select-all overflow-x-auto`} style={{ ...style, background: "transparent" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex">
              <span className="text-slate-600 w-5 select-none shrink-0 text-right pr-2 mr-2 border-r border-white/5">{i + 1}</span>
              <span className="flex-1">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function CodeComparisonSideBySide() {
  const traditional = `// dashboard.page.ts
import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  salesChartContainer: Locator;
  salesTableContainer: Locator;
  ordersChartContainer: Locator;
  ordersTableContainer: Locator;
  tasksChartContainer: Locator;
  tasksTableContainer: Locator;

  activeBadge: Locator;
  inactiveBadge: Locator;

  constructor(private page: Page) {
    this.salesChartContainer = page.locator(".sales-chart-container");
    this.salesTableContainer = page.locator(".sales-table-container");

    this.ordersChartContainer = page.locator(".orders-chart-container");
    this.ordersTableContainer = page.locator(".orders-table-container");

    this.tasksChartContainer = page.locator(".tasks-chart-container");
    this.tasksTableContainer = page.locator(".tasks-table-container");

    this.activeBadge = page.getByTestId("active-badge");
    this.inactiveBadge = page.getByTestId("inactive-badge");
  }
}

// dashboard.spec.ts
import { expect, test } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

test("dashboard widgets", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.salesChartContainer.click();
  await expect(dashboard.activeBadge).toBeVisible();
  await dashboard.tasksTableContainer.click();
  await expect(dashboard.inactiveBadge).toBeVisible();
});`;

  const pwCore = `// dashboard.registry.ts
import { createPageRegistry } from "pw-core";

export const test = createPageRegistry({
  dashboard: {
    selectors: {
      "{module}{component}Container": {
        module: ["Sales", "Orders", "Tasks"],
        component: ["Chart", "Table"],
        selector: ".{module}-{component}-container"
      }
    },

    testIds: {
      "{state}Badge": {
        state: ["Active", "Inactive"],
        testId: "{state}-badge"
      }
    }
  }
});

// dashboard.spec.ts
import { test } from "./fixtures";

test("dashboard widgets", async ({ dashboard }) => {
  await dashboard.click("salesChartContainer");
  await dashboard.verify("activeBadge")
  await dashboard.click("tasksTableContainer");
  await dashboard.verify("inactiveBadge")
});`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 max-w-6xl mx-auto text-left">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-mono tracking-wider text-red-500/80 mb-2 font-bold block">Traditional Playwright POM</span>
        <div className="bg-black/60 p-3 rounded-xl border border-white/5 overflow-y-auto">
          <HighlightedCode code={traditional} language="typescript" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 mb-2 font-bold block">With PW-Core API</span>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 overflow-y-auto">
          <HighlightedCode code={pwCore} language="typescript" />
        </div>
      </div>
    </div>
  );
}


function ScalingInsightCard() {
  const [sliderIndex, setSliderIndex] = React.useState(4); // steps index, default to index 4 (15 pages)
  const pages = SLIDER_STEPS[sliderIndex];
  const metrics = METRICS_DATA[pages];

  const maxPossibleChars = 26250;
  const maxPossibleFiles = 31;

  return (
    <div className="skeu-card p-6 md:p-8 mt-6 bg-slate-950/40 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
        <div className="flex-1 w-full space-y-6">
          <div>
            <h6 className="uppercase font-bold tracking-widest text-amber-500 block mb-1 text-xs">
              Architecture Scaling Simulator
            </h6>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              Adjust the slider to see how codebase complexity grows as you add page workflows.
            </p>
          </div>

          <div className="space-y-4 bg-black/40 p-5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Scale of Application:</span>
              <span className="text-amber-500 font-bold px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-sm">
                {pages} Page{pages === 1 ? '' : 's'}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="4"
              value={sliderIndex}
              onChange={(e) => setSliderIndex(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60 font-mono px-1">
              {SLIDER_STEPS.map((step, idx) => (
                <span key={step} className={idx === sliderIndex ? "text-amber-500 font-bold" : ""}>
                  {step} Page{step === 1 ? '' : 's'}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Files Metric */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Total Files Required</div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>Traditional POM</span>
                      <span className="font-mono font-bold text-red-400 text-xs">
                        {metrics.filesTrad} files
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                        style={{ width: `${Math.max(2, (metrics.filesTrad / maxPossibleFiles) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>PW-Core</span>
                      <span className="font-mono font-bold text-amber-500 text-xs">
                        {metrics.filesCore} files
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                        style={{ width: `${Math.max(2, (metrics.filesCore / maxPossibleFiles) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center select-none">
                Save {metrics.filesTrad - metrics.filesCore} files ({Math.round((1 - metrics.filesCore / metrics.filesTrad) * 100)}% reduction)
              </div>
            </div>

            {/* AI Context Size Metric */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">AI Context Footprint</div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>Traditional POM</span>
                      <span className="font-mono font-bold text-red-400 text-xs">
                        {metrics.charsTrad.toLocaleString()} chars
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                        style={{ width: `${Math.max(2, (metrics.charsTrad / maxPossibleChars) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>PW-Core</span>
                      <span className="font-mono font-bold text-amber-500 text-xs">
                        {metrics.charsCore.toLocaleString()} chars
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                        style={{ width: `${Math.max(2, (metrics.charsCore / maxPossibleChars) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 text-center select-none">
                {Math.round((1 - metrics.charsCore / metrics.charsTrad) * 100)}% Smaller AI Context
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[320px] bg-white/[0.02] border border-white/5 rounded-xl p-5 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400/80 block select-none">
              Developer Experience
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={pages}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div className="text-xl font-extrabold text-foreground tracking-tight font-heading leading-tight">
                  At {pages} Page{pages === 1 ? '' : 's'}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  {metrics.devExp}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 select-none">
            <div className="flex items-center gap-1.5 font-sans font-semibold text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PW-Core scales linearly with configuration.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground/60 leading-normal flex items-start gap-1.5 mt-4 pt-3 border-t border-white/5">
        <span className="text-amber-500 font-semibold select-none shrink-0 font-sans">Note:</span>
        <span>Figures are approximations based on common enterprise Playwright architectures. Actual savings depend on project conventions.</span>
      </div>
    </div>
  );
}

export function HomePageContent() {
  const [downloads, setDownloads] = React.useState("Loading...");
  const [dynamicReleases, setDynamicReleases] = React.useState<any[]>([]);
  const [loadingReleases, setLoadingReleases] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
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

  React.useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/QECore/pw-core/contents/releases");
        if (!res.ok) throw new Error("Failed to fetch releases list");
        const files = await res.json();

        const mdFiles = files
          .filter((f: any) => f.name.endsWith(".md"))
          .sort((a: any, b: any) => b.name.localeCompare(a.name));

        const cleanTitle = (rawTitle: string) => {
          return rawTitle
            .replace(/^[-*]\s+/, "")
            .replace(/\*\*?/g, "")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/\[|\]/g, "")
            .trim();
        };

        const fetchedData = await Promise.all(
          mdFiles.slice(0, 3).map(async (file: any) => {
            const contentRes = await fetch(file.download_url);
            if (!contentRes.ok) throw new Error(`Failed to fetch content for ${file.name}`);
            const text = await contentRes.text();

            const version = file.name.replace(".md", "");

            const lines = text.split('\n');
            const highlights: any[] = [];
            let capture = false;

            for (let line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('##') && trimmed.includes('Release Highlights')) {
                capture = true;
                continue;
              }
              if (capture) {
                if (trimmed.startsWith('#')) {
                  break;
                }
                if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                  if (/^[-\*\s]+$/.test(trimmed)) {
                    continue;
                  }

                  const colonIndex = trimmed.indexOf(":");
                  if (colonIndex !== -1) {
                    const rawTitle = trimmed.substring(0, colonIndex);
                    const rawDesc = trimmed.substring(colonIndex + 1);
                    const parsedTitle = cleanTitle(rawTitle);
                    if (/[a-zA-Z0-9]/.test(parsedTitle)) {
                      highlights.push({
                        title: parsedTitle,
                        desc: rawDesc.trim()
                      });
                    }
                  } else {
                    const cleanLine = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
                    if (cleanLine && /[a-zA-Z0-9]/.test(cleanLine)) {
                      highlights.push({ title: cleanLine, desc: "" });
                    }
                  }
                }
              }
            }

            return {
              version,
              url: `https://github.com/QECore/pw-core/blob/main/releases/${file.name}`,
              highlights
            };
          })
        );

        setDynamicReleases(fetchedData);
      } catch (err) {
        console.error("Dynamic fetch failed:", err);
      } finally {
        setLoadingReleases(false);
      }
    };

    fetchReleases();
  }, []);

  const handleCopyInstall = (cmd: string = "npm install pw-core") => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HomeLayout sections={homeSections}>
      <div className="w-full pt-2 pb-6">

        {/* SECTION 1: HERO */}
        <section id="introduction" className="snap-item scroll-mt-24 text-left pt-0 pb-10 md:pb-12 border-b border-border/40 mb-10 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase mb-3 space-y-1">
                  <span className="text-muted-foreground/60 block">THE MISSING LAYER FOR PLAYWRIGHT</span>
                </div>

                <h1 className="flex flex-col gap-1 mb-2 font-heading tracking-tight text-foreground leading-[1.05]">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-2xl md:text-[46px] font-bold text-slate-300"
                  >
                    One Registry.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="font-heading text-2xl md:text-[48px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent pb-2 pt-1 leading-none"
                  >
                    Entire Framework.
                  </motion.span>
                </h1>

                <div className="space-y-3 max-w-[580px] mb-5">
                  <p className="text-muted-foreground text-sm md:text-[16px] leading-[1.5] mb-2">
                    PW-Core turns your registry into typed pages, fixtures and test APIs.
                    <br />
                    So you only focus on writing tests.
                  </p>
                  <p className="font-sans font-black text-[22px] md:text-[28px] tracking-tight leading-none pt-3">
                    <span className="text-white">Write tests. </span>
                    <span className="text-amber-500">Not frameworks.</span>
                  </p>
                </div>

              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <Button variant="secondary" size="landing" asChild>
                      <Link to="/pw-core/docs">
                        Explore PW-Core
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">

                    <a
                      href="https://github.com/QECore/pw-core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current text-slate-500 group-hover:text-amber-500" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.npmjs.com/package/pw-core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                    >
                      <svg className="w-6 h-6 fill-current text-slate-500 group-hover:text-amber-500" viewBox="0 0 128 128">
                        <path d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z" />
                      </svg>
                      <span>NPM Package</span>
                    </a>

                    <a
                      href="mailto:shanmukaanem@gmail.com"
                      className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-500 group-hover:text-amber-500" />
                      <span>Email</span>
                    </a>

                    <a
                      href="https://linkedin.com/in/shanmukaanem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t border-white/5 pt-3 space-y-1.5 text-[9.5px] text-muted-foreground/75 font-semibold tracking-wider uppercase">
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.02] border border-white/5 select-none"
                    >
                      <span className="text-amber-500 text-[10px]">🔄</span> Works with Existing Projects
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.02] border border-white/5 select-none"
                    >
                      <span className="text-amber-500 text-[10px]">⚡</span> Built on Playwright
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.02] border border-white/5 select-none"
                    >
                      <span className="text-amber-500 text-[10px]">📘</span> TypeScript First
                    </motion.span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.02] border border-white/5 select-none"
                    >
                      <span className="text-amber-500 text-[10px]">🌍</span> Open Source
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.02] border border-white/5 select-none"
                    >
                      <span className="text-amber-500 text-[10px]">🔓</span> Zero Lock-In
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: One Large Illustration */}
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center pt-4 md:pt-0">
              <HeroInstallCard handleCopyInstall={handleCopyInstall} />
            </div>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEMS */}
        <section id="problems" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 relative text-left">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 select-none">
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-100 font-sans mb-1">
                Why Playwright Projects Become Hard to Maintain
              </h2>
              <p className="text-xs text-muted-foreground max-w-xl">
                Engineering pain points that slow down automation teams as test suites scale.
              </p>
            </div>

          </div>

          <div className="mt-8 mb-8">
            <ProblemsShowcase />
          </div>
        </section>

        {/* SECTION 3: REGISTRY SOLVES THEM ALL */}
        <section id="solution" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 relative text-left">
          <div className="max-w-6xl mx-auto mb-6">
            <h2 className="text-3xl font-bold font-heading text-slate-100 font-sans mb-1">
              Let the Registry Be the Brain of Your Application.
            </h2>
            <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
              PW-Core turns your registry into typed pages, fixtures and test APIs - so you only write test logic.
            </p>

            {/* Uniform Outcome Grid Strip with Skeuomorphic Container Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-5 select-none font-mono text-[10px] w-full">
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5 border border-amber-500/55 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-slate-900/60">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">SCATTERED CONFIG</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">REGISTRY</span>
                </div>
              </SkeuCard>
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">MANUAL PAGE OBJECTS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">GENERATED PAGES</span>
                </div>
              </SkeuCard>
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">FIXTURE WIRING</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">AUTO FIXTURES</span>
                </div>
              </SkeuCard>
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">LOCATOR BOILERPLATE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">TYPE-SAFE APIs</span>
                </div>
              </SkeuCard>
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">NESTED LOCATORS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">CHAINED LOCATORS</span>
                </div>
              </SkeuCard>
              <SkeuCard className="flex flex-col gap-1 !p-2 px-3 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-red-500 font-extrabold">✗</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wide">FRAMEWORK PLUMBING</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-extrabold">✓</span>
                  <span className="font-bold text-slate-200 uppercase tracking-wide">WRITE TESTS</span>
                </div>
              </SkeuCard>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">

            <style dangerouslySetInnerHTML={{
              __html: `
            @keyframes float3D-1 {
              0%, 100% { transform: translateY(0px) rotateX(4deg) rotateY(-8deg) translateZ(0px); }
              50% { transform: translateY(-8px) rotateX(6deg) rotateY(-12deg) translateZ(10px); }
            }
            @keyframes float3D-2 {
              0%, 100% { transform: translateY(0px) rotateX(6deg) rotateY(8deg) translateZ(0px); }
              50% { transform: translateY(-12px) rotateX(4deg) rotateY(12deg) translateZ(15px); }
            }
            @keyframes float3D-3 {
              0%, 100% { transform: translateY(0px) rotateX(-4deg) rotateY(-6deg) translateZ(0px); }
              50% { transform: translateY(-6px) rotateX(-2deg) rotateY(-10deg) translateZ(8px); }
            }
            @keyframes fluidicOpenContainer {
              0% {
                opacity: 0;
                transform: scale(0.78) translateX(30px);
                filter: blur(8px);
              }
              100% {
                opacity: 1;
                transform: scale(0.85) translateX(0);
                filter: blur(0);
              }
            }
            .animate-fluidic-open-container {
              animation: fluidicOpenContainer 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes fluidicOpenChild {
              0% {
                opacity: 0;
                transform: scale(0.92) translateY(20px);
                filter: blur(4px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0);
              }
            }
            .animate-fluidic-open-child {
              animation: fluidicOpenChild 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />

            <ArchitectureDeck />
          </div>
        </section>

        {/* SECTION 4: BEFORE VS AFTER */}
        <section id="beforeAfter" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 relative text-left">
          <div className="max-w-6xl mx-auto mb-4">
            <h2 className="text-3xl font-bold font-heading text-slate-100 font-sans mb-1">
              Before vs After
            </h2>
            <p className="text-xs text-muted-foreground max-w-xl">
              Remove setup plumbing and imports. Write tests using behavior-driven pathways.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <CodeComparisonSideBySide />
          </div>
        </section>

        {/* SECTION 6: TRADITIONAL POM COMPARISON */}
        <section id="scaling" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 relative text-left">
          <div className="max-w-6xl mx-auto text-left mb-4">
            <h2 className="text-3xl font-bold font-heading text-slate-100 font-sans mb-1">
              Scaling Simulator
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              As applications grow, maintaining traditional page architecture becomes more expensive than writing new tests.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ScalingInsightCard />
          </div>
        </section>

        {/* SECTION 7: DEVELOPER PHILOSOPHY */}
        <section className="snap-item scroll-mt-24 py-12 mb-12 relative text-left">
          <div className="max-w-6xl mx-auto">
            <div className="skeu-card p-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/5 relative overflow-hidden rounded-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-6 items-start md:items-center justify-start">
                <div className="max-w-lg">
                  <h6 className="uppercase font-bold tracking-widest text-amber-500 block text-xs font-mono mb-4">
                    Built for developers.
                  </h6>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-100 font-sans tracking-tight leading-[1.2]">
                    PW-Core doesn't replace Playwright. It removes the repetitive framework code around it.
                  </h2>
                </div>
                <div className="border-l border-white/10 pl-6 space-y-3.5 font-mono text-[11px] text-slate-400 self-center">
                  <div>
                    <span className="text-amber-500 font-sans text-xs block mb-4 font-mono uppercase tracking-wider">You no longer write</span>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-1.5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> Page Object boilerplate</div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> Fixture setup</div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> Locator wrappers</div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> Manual step descriptions</div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> AI framework context</div>
                      <div className="flex items-center gap-1.5 whitespace-nowrap"><span className="text-red-500/80 font-extrabold">✗</span> Framework plumbing</div>
                    </div>
                  </div>
                  <div className="text-green-500 font-semibold uppercase tracking-wide font-sans text-[11px] pt-1">
                    PW-Core generates them.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}