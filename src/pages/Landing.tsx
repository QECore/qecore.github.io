// @ts-nocheck
import * as React from "react";
import { LayoutDashboard, FlaskConical, FileCode2, ArrowRight, Database, Globe, Server, Monitor, TextCursorInput, Table2, Upload, SquareStack, BookOpen, Settings, Cpu, Layers, Play, Copy, Check, Mail, Linkedin } from "lucide-react";
import SkeuCard from "../components/shared/SkueCard";
import SkeuButton from "../components/shared/SkueButton";
import CodeBlock from "../components/shared/CodeBlock";
import ArchitectureDeck from "../components/shared/ArchitectureDeck";
import ThreadedPageLayout from "../components/layout/ThreadedPageLayout";
import ElasticScroll from "../components/shared/ElasticScroll";
import ComparisonMetrics from "../components/shared/ComparisonMetrics";
import Docs from "./Docs";
import { Highlight, themes } from "prism-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
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

function ScalingInsightCard() {
  const [pages, setPages] = React.useState(5);

  // N workflows metrics:
  // Assumptions per Page Object:
  // - 8 locators per page.
  // - Traditional locator: declaration public name: Locator; + assignment this.name = this.page.getByTestId("id"); (~85 chars/locator)
  // - PW-Core registry style: locator: "id", (~22 chars/locator)
  //   -> Reduction: ~63 chars per locator. With 8 locators: ~504 chars saved per page.
  // - Chaining locators & shortened method calls (e.g. login.fill('name', 'val') vs loginPage.name.fill('val'))
  //   -> Saves ~25 chars per method call. With 5 action calls per test: ~125 chars saved per test.

  // Traditional calculations:
  // - Base boilerplate (imports, fixtures, etc.): ~350 chars
  // - Per Page: Page Object Class structure (~400 chars) + 8 locators definition (~680 chars) = ~1080 chars
  // - Per Test: Test boilerplate (~300 chars) + 5 action calls (~200 chars) = ~500 chars
  const tradFiles = 2 * pages + 1;
  const tradChars = 1580 * pages + 350;

  // PW-Core calculations:
  // - Base boilerplate (registry imports & setup): ~250 chars
  // - Per Page: Registry entry config (~80 chars) + 8 selectors (~176 chars) = ~256 chars
  // - Per Test: Test boilerplate (~200 chars) + 5 shortened action calls (~75 chars) = ~275 chars
  const coreFiles = pages + 1;
  const coreChars = 531 * pages + 250;

  // Differences
  const fileSaved = tradFiles - coreFiles;
  const charSaved = tradChars - coreChars;
  const savingPercent = Math.max(0, Math.round((charSaved / tradChars) * 100));
  const filePercent = Math.max(0, Math.round((fileSaved / tradFiles) * 100));

  const maxPossibleChars = 1580 * 15 + 350;

  const getDynamicContent = (p: number) => {
    if (p === 1) {
      return {
        paragraphs: [
          "Both approaches are nearly identical at this scale.",
          "The application is small, framework overhead is minimal, and maintainability concerns are limited.",
          "PW-Core's architectural advantages become more apparent as additional page objects are introduced."
        ],
        status: "Minimal Complexity"
      };
    } else if (p <= 3) {
      return {
        paragraphs: [
          "Traditional Playwright begins introducing separate page classes and additional framework structure.",
          "PW-Core continues using the same registry-driven architecture without introducing new framework layers.",
          "The difference is still small but growth patterns are starting to diverge."
        ],
        status: "Early Growth"
      };
    } else if (p <= 5) {
      return {
        paragraphs: [
          "Traditional Playwright now contains multiple page classes and additional fixture wiring.",
          "PW-Core expands by adding page definitions while keeping framework structure stable.",
          "Maintenance effort remains manageable, but architectural growth is becoming visible."
        ],
        status: "Architecture Divergence Begins"
      };
    } else if (p <= 10) {
      return {
        paragraphs: [
          "Framework complexity starts increasing noticeably.",
          "Traditional Playwright typically requires more page objects, locator declarations, and fixture extensions as pages expand.",
          "PW-Core continues scaling through configuration while maintaining a centralized architecture."
        ],
        status: "Scaling Advantage Emerging"
      };
    } else {
      return {
        paragraphs: [
          "Traditional Playwright now contains significantly more framework structure than application logic.",
          "PW-Core maintains a centralized registry-driven model, reducing framework growth while keeping pages organized.",
          "Result: fewer files, smaller AI context footprint, and lower maintenance overhead."
        ],
        status: "Constant Complexity Architecture"
      };
    }
  };

  const dynamicContent = getDynamicContent(pages);

  return (
    <div className="skeu-card p-6 md:p-8 mt-12 bg-slate-950/40 border border-white/5 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 items-stretch relative z-10">
        <div className="flex-1 w-full space-y-6">
          <div>
            <h6 className="uppercase font-bold tracking-widest text-amber-500 block mb-1">
              Architecture Scaling Simulator
            </h6>
            {/* <h3 className="font-heading text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              Traditional Playwright vs Registry-Driven PW-Core
            </h3> */}
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              Adjust the slider to see how codebase complexity grows as you add page workflows.
            </p>
          </div>

          <div className="space-y-2.5 bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Scale of Application:</span>
              <span className="text-amber-500 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-mono">
                {pages} Page{pages === 1 ? '' : 's'}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="15"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
            />
            <div className="flex justify-between text-[9px] text-muted-foreground/60 font-mono">
              <span>1 Page</span>
              <span class='mr-16'>5 Pages</span>
              <span>10 Pages</span>
              <span>15 Pages</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Files Metric */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">Total Files Required</div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>Playwright</span>
                      <span className="font-mono font-bold text-red-400 text-[11px] sm:text-xs">
                        <motion.span
                          key={tradFiles}
                          initial={{ scale: 0.9, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          {tradFiles}
                        </motion.span> files
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (tradFiles / 31) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>PW-Core</span>
                      <span className="font-mono font-bold text-amber-500 text-[11px] sm:text-xs">
                        <motion.span
                          key={coreFiles}
                          initial={{ scale: 0.9, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          {coreFiles}
                        </motion.span> files
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (coreFiles / 31) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block text-center whitespace-nowrap select-none">
                Save {fileSaved} files ({filePercent}% reduction)
              </div>
            </div>

            {/* AI Context Size Metric */}
            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">AI Context Footprint</div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>Playwright</span>
                      <span className="font-mono font-bold text-red-400 text-[11px] sm:text-xs">
                        <motion.span
                          key={tradChars}
                          initial={{ scale: 0.9, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          {tradChars.toLocaleString()}
                        </motion.span> chars
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (tradChars / maxPossibleChars) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] text-slate-400">
                      <span>PW-Core</span>
                      <span className="font-mono font-bold text-amber-500 text-[11px] sm:text-xs">
                        <motion.span
                          key={coreChars}
                          initial={{ scale: 0.9, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          {coreChars.toLocaleString()}
                        </motion.span> chars
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                        style={{ width: `${Math.min(100, (coreChars / maxPossibleChars) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block text-center whitespace-nowrap select-none">
                {savingPercent}% Smaller AI Context
              </div>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground/60 leading-normal flex items-start gap-1.5 mt-4 pt-3 border-t border-white/5">
            <span className="text-amber-500 font-semibold select-none shrink-0 font-sans">Methodology:</span>
            <span>Estimates are based on page-object architectures with approximately 8 locators per Page Class. Actual savings vary by project structure and coding standards.</span>
          </div>
        </div>

        <div className="w-full md:w-[320px] bg-white/[0.02] border border-white/5 rounded-xl p-5 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-3.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400/80 block select-none">
              Metrics Insight
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

                <div className="text-xs text-muted-foreground leading-relaxed font-sans space-y-3">
                  {dynamicContent.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* <div className="pt-3.5 border-t border-white/5 space-y-3.5 text-[11px]">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-red-500/85 font-mono mb-1.5 flex items-center justify-between">
                  <span>Traditional Playwright</span>
                </div>
                <ul className="space-y-1 font-mono text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 shrink-0" />
                    <span>
                      <motion.span
                        key={`po-${pages}`}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold text-red-400"
                      >
                        {pages}
                      </motion.span> Page Class{pages === 1 ? '' : 'es'}
                    </span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 shrink-0" />
                    <span>
                      <motion.span
                        key={`fix-${pages}`}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold text-red-400"
                      >
                        {pages}
                      </motion.span> Fixture Extension{pages === 1 ? '' : 's'}
                    </span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 shrink-0" />
                    <span>
                      <motion.span
                        key={`loc-${pages}`}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold text-red-400"
                      >
                        {pages * 8}
                      </motion.span> Locator Definition{pages * 8 === 1 ? '' : 's'}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-500 font-mono mb-1.5 flex items-center justify-between">
                  <span>Registry-Driven PW-Core</span>
                </div>
                <ul className="space-y-1 font-mono text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0" />
                    <span><span className="font-bold text-amber-400">1</span> Registry</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0" />
                    <span><span className="font-bold text-amber-400">1</span> Runtime</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0" />
                    <span>
                      <motion.span
                        key={`wf-${pages}`}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-bold text-amber-400"
                      >
                        {pages}
                      </motion.span> Workflow Definition{pages === 1 ? '' : 's'}
                    </span>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={dynamicContent.status}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 font-sans font-semibold text-emerald-400"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>✓ {dynamicContent.status}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScalingCodeComparison() {
  return (
    <div className="mt-12 space-y-4 text-left border-t border-white/5 pt-8">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 block mb-1">
          Scaling Comparison
        </span>
        <h3 className="font-heading text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
          How Scaling Changes
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
          Compare how adding page objects affects repository complexity and framework structure under both architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-6">
        {/* Traditional Playwright */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-500/80 block font-mono">
              Traditional Playwright (Framework Scaling)
            </span>
            <pre className="font-mono text-xs text-slate-300 bg-black/60 p-4 rounded-lg border border-white/5 leading-relaxed overflow-x-auto select-all">
              {`class LoginPage {}
class UsersPage {}
class ProductsPage {}
class SettingsPage {}
class ReportsPage {}
...`}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground/75 leading-relaxed pt-3 border-t border-white/5 font-sans">
            Traditional page-object architectures grow through additional classes and fixture wiring.
          </p>
        </div>

        {/* PW-Core */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500 block font-mono">
              PW-Core (Configuration Scaling)
            </span>
            <pre className="font-mono text-xs text-slate-300 bg-black/60 p-4 rounded-lg border border-white/5 leading-relaxed overflow-x-auto select-all">
              {`createPageRegistry({
  login: {...},
  users: {...},
  products: {...},
  settings: {...},
  reports: {...}
})`}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground/75 leading-relaxed pt-3 border-t border-white/5 font-sans">
            PW-Core scales through registry definitions while keeping the framework structure stable.
          </p>
        </div>
      </div>
    </div>
  );
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "why-pw-core", label: "Registry → Runtime → Tests" },
  { id: "why-not-playwright", label: "Playwright vs PW-Core" },
  { id: "registry", label: "Page Registry" },
  { id: "typed-page", label: "Typed Page" },
  { id: "features", label: "Features" },
  { id: "features-dynamic-locators", label: "Dynamic Locators", isSub: true, parentId: "features" },
  { id: "features-auto-steps", label: "Auto Steps", isSub: true, parentId: "features" },
  { id: "features-capabilities", label: "Capabilities", isSub: true, parentId: "features" },
  { id: "features-masking", label: "Secret Masking", isSub: true, parentId: "features" },
  { id: "features-table", label: "Table Component", isSub: true, parentId: "features" },
  { id: "releases", label: "Releases" },
];

export default function Landing() {
  const [downloads, setDownloads] = React.useState("Loading...");
  const [activeFile, setActiveFile] = React.useState<"page" | "spec">("page");
  const [dynamicReleases, setDynamicReleases] = React.useState<any[]>([]);
  const [loadingReleases, setLoadingReleases] = React.useState(true);

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
          mdFiles.map(async (file: any) => {
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
                  const colonIndex = trimmed.indexOf(":");
                  if (colonIndex !== -1) {
                    const rawTitle = trimmed.substring(0, colonIndex);
                    const rawDesc = trimmed.substring(colonIndex + 1);
                    highlights.push({
                      title: cleanTitle(rawTitle),
                      desc: rawDesc.trim()
                    });
                  } else {
                    const cleanLine = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
                    if (cleanLine) {
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

  return (
    <ElasticScroll>
      <ThreadedPageLayout sections={sections}>
        <div className="notion-page pt-0 pb-12">
          {/* overview */}
          <section id="overview" className="snap-item scroll-mt-24 text-left py-12 md:py-8 border-b border-border/40 mb-12 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: overview Content */}
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
                      className="group w-[40px] h-[40px] skeu-inset flex items-center justify-center text-foreground bg-white/[0.02] border border-border/40 shrink-0 hover:border-amber-500/50 transition-all"
                      title="NPM Package"
                    >
                      <svg className="w-6 h-6 fill-[#CB3837] group-hover:fill-orange-500 hover:fill-orange-500 transition-colors duration-200" viewBox="0 0 128 128">
                        <path d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z" />
                      </svg>
                    </a>

                    {/* GitHub Repo Link */}
                    <a
                      href="https://github.com/QECore/pw-core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-[40px] h-[40px] skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 hover:border-amber-500/50 transition-all bg-white/[0.02] border border-border/40 shrink-0"
                      title="GitHub Repository"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>

                    {/* Developer Profile Link */}
                    {/* <a
                      href="https://github.com/shanmukaanem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-[40px] h-[40px] overflow-hidden skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 hover:border-amber-500/50 transition-all bg-white/[0.02] border border-border/40 shrink-0"
                      title="Developer Profile"
                    >
                      <img
                        src="https://github.com/shanmukaanem.png"
                        alt="Shanmuka Chandra Teja Anem"
                        className="w-6 h-6 object-cover rounded-full"
                      />
                    </a> */}

                    {/* LinkedIn Profile Link */}
                    <a
                      href="https://www.linkedin.com/in/shanmukaanem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-[40px] h-[40px] skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 hover:border-amber-500/50 transition-all bg-white/[0.02] border border-border/40 shrink-0"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5 text-muted-foreground/80 group-hover:text-amber-500 transition-colors" />
                    </a>

                    {/* Contact Email Link */}
                    <a
                      href="mailto:shanmukaanem@gmail.com"
                      className="group w-[40px] h-[40px] skeu-inset flex items-center justify-center text-foreground hover:text-amber-500 hover:border-amber-500/50 transition-all bg-white/[0.02] border border-border/40 shrink-0"
                      title="Email Developer"
                    >
                      <Mail className="w-5 h-5 text-muted-foreground/80 group-hover:text-amber-500 transition-colors" />
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

              {/* Centralized insights metric card for 5 pages */}
              <ScalingInsightCard />
              {/* <ScalingCodeComparison /> */}
            </div>
          </section>

          <Docs isEmbedded={true} />

          {/* Section: Releases */}
          <section id="releases" className="snap-item scroll-mt-24 py-12 border-t border-border/40 mb-12 relative text-left">
            <div className="max-w-6xl mx-auto text-left mb-8">
              <h2 className="sticky z-20 mb-1 backdrop-blur-md bg-background/85 text-4xl font-bold font-heading text-foreground">
                Releases & Changelog
              </h2>
              <p className="text-[13.5px] text-muted-foreground max-w-3xl">
                Stay up to date with the latest features, improvements, and updates to the pw-core framework.
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {loadingReleases ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                  <span className="text-xs text-muted-foreground">Fetching release notes...</span>
                </div>
              ) : (
                dynamicReleases.map((release) => (
                  <SkeuCard key={release.version} className="p-6 md:p-8 hover:border-amber-500/25 transition-all text-left relative overflow-hidden bg-slate-950/40 border border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/5">
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-heading flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono">
                            {release.version.startsWith('v') ? release.version : `v${release.version}`}
                          </span>
                          Release Notes
                        </h3>
                      </div>
                      <a
                        href={release.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-500 hover:text-orange-500 font-semibold flex items-center gap-1 mt-2 md:mt-0 transition-colors"
                      >
                        View Full notes on GitHub <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="space-y-4">
                      {release.highlights && release.highlights.length > 0 && (
                        <>
                          <h4 className="text-xs uppercase font-bold tracking-wider text-muted-foreground/80">🌟 Release Highlights</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {release.highlights.map((highlight: any, idx: number) => (
                              <li
                                key={idx}
                                className={`p-4 rounded-lg bg-black/30 border border-white/5 space-y-1 ${idx === release.highlights.length - 1 && release.highlights.length % 2 !== 0 ? "md:col-span-2" : ""
                                  }`}
                              >
                                <strong className="text-sm font-semibold text-slate-200 block">{highlight.title}</strong>
                                {highlight.desc && (
                                  <span className="text-xs text-muted-foreground leading-normal block">{highlight.desc}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </SkeuCard>
                ))
              )}

              {/* View Rest of the releases */}
              <div className="flex justify-center pt-4">
                <a
                  href="https://github.com/QECore/pw-core/tree/main/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 font-semibold transition-all hover:scale-105 duration-200"
                >
                  Browse all releases on GitHub
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </ThreadedPageLayout>
    </ElasticScroll>
  );
}