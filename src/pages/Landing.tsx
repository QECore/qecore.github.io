// @ts-nocheck
import * as React from "react";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen, Settings, Cpu, Layers, Play, Copy, Check } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import CodeBlock from "../components/shared/CodeBlock";
import ArchitectureDeck from "../components/shared/ArchitectureDeck";
import ThreadedPageLayout from "../components/layout/ThreadedPageLayout";
import ElasticScroll from "../components/shared/ElasticScroll";
import ComparisonMetrics from "../components/shared/ComparisonMetrics";
import Docs from "./Docs";
import { Highlight, themes } from "prism-react-renderer";
import traditionalLoginPageRaw from "../docs/pw-core/examples/playwright/pages/login.page.ts?raw";
import traditionalLoginTestRaw from "../docs/pw-core/examples/playwright/tests/login.test.ts?raw";
import traditionalFixturesRaw from "../docs/pw-core/examples/playwright/docs/fixtures.ts?raw";
import philosophyData from "../docs/pw-core/philosophy.json";

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
      name: 'username',
      password: 'password',
      submit: 'submit-btn'
    }
  }
})

// login.test.ts
test('Verify Login', async ({ login }) => {
  await login.goto()
  await login.fill('name', 'teja')
  await login.fill('password', 'pw-core-secret')
  await login.click('submit')
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
  await login.click('submit')
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
    navigator.clipboard.writeText(`npm ${action} pw-core`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)] rounded-md overflow-hidden flex items-center h-[40px] select-none w-[290px] shrink-0">
      {/* Left Amber Block */}
      <div
        className="bg-amber-700/95 text-black font-extrabold h-full flex flex-col justify-center text-[9px] uppercase tracking-wider shrink-0 leading-tight text-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.85),_inset_1px_0_2px_rgba(0,0,0,0.5)]"
        style={{ width: "82px" }}
      >
        <span>{displayHeading}</span>
        <span>Projects</span>
      </div>

      <div className="pl-3.5 font-mono text-xs flex items-center text-slate-200 flex-1 whitespace-nowrap">
        <span className="text-slate-400 select-none mr-2">$</span>
        <span>npm <span className="text-amber-500 font-bold tracking-wide transition-all duration-150 inline-block min-w-[56px] text-center">{displayText}</span> pw-core</span>
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
        className="self-center w-[98%] cursor-grab active:cursor-grabbing border-amber-500/40 bg-slate-950/95 shadow-[0_12px_40px_rgba(0,0,0,0.9)] z-25"
        onMouseDown={(e) => startDrag(1, e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(1, e.touches[0].clientX, e.touches[0].clientY)}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-heading font-extrabold text-xl text-amber-500 leading-none">Typed Pages</span>
          <span className="font-heading font-bold text-[12px] text-foreground tracking-wide uppercase">100% Type-safe</span>
          <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
            Generate type-safe page fixtures and execution APIs automatically.
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

const sections = [
  { id: "hero", label: "Overview" },
  { id: "why-pw-core", label: "Registry → Runtime → Tests" },
  { id: "why-not-playwright", label: "Playwright vs PW-Core" },
  { id: "docs-registry", label: "Page Registry" },
  { id: "docs-typed-examples", label: "Typed Page" },
  { id: "docs-features", label: "Features" },
];

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
    <ElasticScroll>
      <ThreadedPageLayout sections={sections}>
        <div className="notion-page pt-0 pb-12">
          {/* Hero */}
          <section id="hero" className="snap-item scroll-mt-24 text-left py-12 md:py-8 border-b border-border/40 mb-12 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Tagline */}
                  <div className="text-xs font-bold tracking-widest uppercase mb-6 space-y-1">
                    <span className="text-muted-foreground/60 block">BUILT FOR PLAYWRIGHT</span>
                    <span className="text-amber-500 dark:text-amber-400 block text-sm font-semibold tracking-wider">TYPE-SAFE | LESS BOILERPLATE | SINGLE SOURCE OF TRUTH</span>
                  </div>

                  {/* Main Heading */}
                  <h1 className="flex flex-col gap-1 mb-6 font-heading text-2xl md:text-[44px] font-extrabold tracking-tight text-foreground leading-[1.1]">
                    Build Better
                    <span className="font-heading text-3xl md:text-[64px] font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent pb-5 pt-1">
                      Playwright Tests
                    </span>
                    With PW-Core
                  </h1>

                  {/* Subtext */}
                  <div className="space-y-4 max-w-[850px] mb-8">
                    <p className="text-muted-foreground text-lg md:text-[21px] leading-[1.6]">
                      Define URLs, selectors, and test IDs once. PW-Core generates typed pages, fixtures, and test APIs automatically.
                    </p>
                    <p className="text-lg md:text-[22px] text-foreground font-extrabold tracking-tight font-heading leading-[1.6] pt-2">
                      Write less.{" "}
                      <span className="text-lg md:text-[22px] font-extrabold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent pb-5 pt-1">
                        Ship more.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/50 block mb-2 select-none">
                    Get started in seconds
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <GlitchCommand />

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
                      </span>
                    </a>

                    {/* GitHub Repo Link */}
                    <a
                      href="https://github.com/QECore/pw-core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[40px] h-[40px] rounded-full skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 transition-all bg-white/[0.02] border border-border/40 shrink-0"
                      title="GitHub Repository"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
              </div>

              {/* Right Column: Floating DNA Features */}
              <div className="lg:col-span-5 flex flex-col justify-between border-l border-border/20 lg:pl-8 pt-6 lg:pt-0">
                <div className="h-full flex flex-col justify-between">
                  {/* <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2 mt-6 select-none text-left shrink-0">
                    FROM CONFIG TO TESTS
                  </h3> */}
                  <div className="flex-1 flex flex-col justify-center">
                    <FloatingDnaFeatures />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How To Use PW-Core */}
          <section id="why-pw-core" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 overflow-hidden relative">
            <div className="max-w-6xl mx-auto text-left">
              {/* <h2 className="sticky z-20 py-3 mb-2 backdrop-blur-md bg-background/85 text-2xl font-bold font-heading text-foreground">
                The How?
              </h2> */}
              {/* Comparison metrics */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
              </div> */}
              {/* <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
                Each registry entry generates a Playwright page fixture with registered URLs, locators, test IDs, and type-safe APIs.
              </p> */}

              {/* Core Philosophy Cards */}
              {/* <div className="mb-10 pt-6 border-t border-border/40">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Core Philosophy
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  The architectural principles that drive the design of pw-core.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {philosophyData.principles.map((p, i) => (
                    <SkeuCard key={i} className="p-4 hover:border-amber-500/25 transition-all text-left">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {p.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </SkeuCard>
                  ))}
                </div>
              </div> */}

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

          {/* Why not Playwright? */}
          <section id="why-not-playwright" className="snap-item scroll-mt-24 py-12 border-b border-border/40 mb-12 relative text-left">
            <div className="max-w-6xl mx-auto text-left mb-8">
              <h2 className="sticky z-20 mb-1 backdrop-blur-md bg-background/85 text-4xl font-bold font-heading text-foreground">
                Traditional Playwright vs Registry-Driven PW-Core
              </h2>
              <p className="text-[13.5px] text-muted-foreground max-w-3xl">
                Compare the same login workflow implemented using traditional page objects and fixtures versus a registry-driven typed pages.
              </p>
            </div>

            <div className="max-w-6xl mx-auto ml-0 w-full pr-4 sm:pr-6 lg:px-0 pl-0">
              {/* Code Blocks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[56px] items-stretch w-full mt-8">

                {/* Traditional Playwright Card */}
                <div className="flex flex-col h-full">
                  <h3 className="text-[13px] font-semibold text-red-500/80 uppercase tracking-wide mb-1">
                    Playwright
                  </h3>
                  <ComparisonMetrics
                    valueColorClass="text-red-500/80"
                    metrics={[
                      { value: 3, label: "Files" },
                      { value: 41, label: "Lines" },
                      { value: 996, label: "Chars" },
                      { value: "High", label: "Tokens" },
                      { value: "Large", label: "Context" }
                    ]}
                  />
                  {/* Code Editor */}
                  <div className="relative rounded-xl overflow-hidden code-block-inset flex flex-col flex-1 min-h-[520px] h-auto bg-black border border-white/5">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex items-center gap-2">
                        {/* Traffic light dots */}
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 select-none font-mono ml-2">
                          Page Objects + Fixtures + Tests
                        </span>
                      </div>
                    </div>


                    {/* Code Container */}
                    <div className="flex-1 overflow-hidden p-3 opacity-90 transition-opacity">
                      <Highlight theme={themes.vsDark} code={PLAYWRIGHT_COMPARISON_CODE} language="typescript">
                        {({ tokens, getLineProps, getTokenProps }) => (
                          <pre className="font-mono text-[10px] leading-[1.2]" style={{ margin: 0 }}>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line, key: i })}>
                                <span className="inline-block text-right select-none mr-2 text-slate-500/80 w-[16px]">
                                  {i + 1}
                                </span>
                                {line.map((token, key) => {
                                  const tokenProps = getTokenProps({ token, key });
                                  if (token.types.includes("comment")) {
                                    tokenProps.style = { ...tokenProps.style, color: "#64748b", opacity: 0.6 };
                                  }
                                  return <span key={key} {...tokenProps} />;
                                })}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                    </div>
                  </div>
                </div>

                {/* PW-Core Card */}
                <div className="flex flex-col h-full">
                  <h3 className="text-[13px] font-semibold text-amber-500 uppercase tracking-wide mb-1">
                    PW-Core
                  </h3>
                  <ComparisonMetrics
                    valueColorClass="text-amber-500"
                    metrics={[
                      { value: 2, label: "Files" },
                      { value: 19, label: "Lines" },
                      { value: 318, label: "Chars" },
                      { value: "Low", label: "Tokens" },
                      { value: "Small", label: "Context" }
                    ]}
                  />
                  {/* Code Editor */}
                  <div className="relative rounded-xl overflow-hidden code-block-inset flex flex-col flex-1 min-h-[520px] h-auto bg-black border border-white/5">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex items-center gap-2">
                        {/* Traffic light dots */}
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 select-none font-mono ml-2">
                          Registry → Generated Runtime → Tests
                        </span>
                      </div>
                    </div>

                    {/* Code Container */}
                    <div className="flex-1 overflow-hidden p-3">
                      <Highlight theme={themes.vsDark} code={PW_CORE_COMPARISON_CODE} language="typescript">
                        {({ tokens, getLineProps, getTokenProps }) => (
                          <pre className="font-mono text-[10px] leading-[1.2]" style={{ margin: 0 }}>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line, key: i })}>
                                <span className="inline-block text-right select-none mr-2 text-slate-500/80 w-[16px]">
                                  {i + 1}
                                </span>
                                {line.map((token, key) => {
                                  const tokenProps = getTokenProps({ token, key });
                                  if (token.types.includes("comment")) {
                                    tokenProps.style = { ...tokenProps.style, color: "#64748b", opacity: 0.6 };
                                  }
                                  return <span key={key} {...tokenProps} />;
                                })}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <Docs isEmbedded={true} />
        </div>
      </ThreadedPageLayout>
    </ElasticScroll>
  );
}