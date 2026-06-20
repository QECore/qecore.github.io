import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, FlaskConical, FileCode2, LogOut, Moon, Sun, BookOpen, Shuffle, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useHeader } from "@/lib/HeaderContext";

export default function TopNav() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeHeader, setActiveHeader, toggleHeader } = useHeader();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleShuffle = () => {
    toggleHeader();
  };

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "light";
  });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const workspaces = [
    { label: "QA Workspace", path: "/workspace", icon: Home },
    { label: "App", path: isAuthenticated ? "/app" : "/login", icon: LayoutDashboard },
    { label: "Playground", path: "/playground", icon: FlaskConical },
    { label: "Swagger", path: "/swagger", icon: FileCode2 },
  ];

  const getActiveWorkspace = () => {
    const path = location.pathname;
    if (path.startsWith("/playground")) return workspaces[2];
    if (path.startsWith("/swagger")) return workspaces[3];
    if (path.startsWith("/app") || path.startsWith("/login")) return workspaces[1];
    return workspaces[0];
  };

  const activeWorkspace = getActiveWorkspace();
  const isLandingPage = ["/pw-core", "/k6-core", "/"].includes(location.pathname);
  const isDull = isLandingPage && activeWorkspace.label === "QA Workspace";

  return (
    <header id="top-nav" data-test-id="top-nav" data-testid="top-nav" className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="w-full px-6 grid grid-cols-3 items-center h-16">
        {/* Left Column: Logo & Switcher */}
        <div className="flex justify-start items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-8 object-contain shrink-0" />
          <div className="flex items-center gap-3 select-none">
            {activeHeader === "pw-core" ? (
              <>
                <Link
                  to="/pw-core"
                  id="top-nav-logo"
                  data-test-id="top-nav-logo"
                  data-testid="top-nav-logo"
                  className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    backgroundImage: "linear-gradient(135deg, hsl(38, 92%, 55%), hsl(25, 95%, 53%))",
                  }}
                >
                  PW-Core
                </Link>
                <Shuffle
                  id="header-shuffle"
                  data-test-id="header-shuffle"
                  data-testid="header-shuffle"
                  onClick={handleShuffle}
                  className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-foreground hover:rotate-180 transition-all duration-300 cursor-pointer shrink-0 mx-0.5"
                />
                <button
                  id="switch-to-k6-core"
                  data-test-id="switch-to-k6-core"
                  data-testid="switch-to-k6-core"
                  onClick={() => setActiveHeader("k6-core")}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary/50 transition-all border border-border/50 shrink-0"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  K6-Core
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/k6-core"
                  id="top-nav-logo"
                  data-test-id="top-nav-logo"
                  data-testid="top-nav-logo"
                  className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    backgroundImage: "linear-gradient(135deg, hsl(260, 92%, 65%), hsl(280, 95%, 55%))",
                  }}
                >
                  K6-Core
                </Link>
                <Shuffle
                  id="header-shuffle"
                  data-test-id="header-shuffle"
                  data-testid="header-shuffle"
                  onClick={handleShuffle}
                  className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-foreground hover:rotate-180 transition-all duration-300 cursor-pointer shrink-0 mx-0.5"
                />
                <button
                  id="switch-to-pw-core"
                  data-test-id="switch-to-pw-core"
                  data-testid="switch-to-pw-core"
                  onClick={() => setActiveHeader("pw-core")}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary hover:text-foreground transition-all border border-border/50 shrink-0"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  PW-Core
                </button>
              </>
            )}
          </div>
        </div>

        {/* Center Column: Empty space (previously nav tabs) */}
        <div />

        {/* Right Column: Theme Toggle & Workspace Dropdown */}
        <div className="flex items-center justify-end gap-3">
          <button
            id="theme-toggle"
            data-test-id="theme-toggle"
            data-testid="theme-toggle"
            onClick={toggleDark}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* QA Workspace Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={`flex items-center rounded-md transition-all overflow-hidden h-9 ${
              isDull
                ? "border border-border/60 bg-secondary/35 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                : "bg-gradient-to-b from-amber-400 to-amber-500 dark:from-amber-400 dark:to-orange-500 text-slate-950 font-bold border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15),inset_0_1.5px_0px_rgba(255,255,255,0.45),inset_0_-2px_0px_rgba(0,0,0,0.15)]"
            }`}>
              {/* Main Button: Click navigates to active workspace page */}
              <button
                id="active-workspace-btn"
                data-test-id="active-workspace-btn"
                data-testid="active-workspace-btn"
                onClick={() => navigate(activeWorkspace.path)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold h-full transition-colors ${
                  isDull ? "text-muted-foreground hover:text-foreground" : "text-slate-950 hover:text-slate-950"
                }`}
              >
                <activeWorkspace.icon className={`w-3.5 h-3.5 transition-colors ${isDull ? "text-muted-foreground/60" : "text-slate-950 hover:text-slate-950"}`} />
                <span>{activeWorkspace.label}</span>
              </button>

              {/* Arrow Button: Click toggles dropdown */}
              <button
                id="workspace-dropdown-arrow"
                data-test-id="workspace-dropdown-arrow"
                data-testid="workspace-dropdown-arrow"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center justify-center px-2 py-1.5 transition-all h-full ${
                  isDull ? "border-l border-border/60 hover:bg-secondary/80" : "border-l border-slate-950/20 hover:bg-white/10"
                }`}
              >
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  isDull ? "text-muted-foreground" : "text-slate-950 hover:text-slate-950"
                } ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Dropdown Menu Overlay */}
            {dropdownOpen && (
              <div
                id="workspace-dropdown-menu"
                data-test-id="workspace-dropdown-menu"
                data-testid="workspace-dropdown-menu"
                className="absolute right-0 top-full pt-1.5 w-48 z-50"
              >
                <div className="rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in-50 slide-in-from-top-1 duration-150 p-1 flex flex-col gap-0.5">
                  {workspaces.map((ws) => {
                    const isWSActive = ws.label === activeWorkspace.label;
                    return (
                      <button
                        key={ws.label}
                        id={`ws-option-${ws.label.toLowerCase().replace(" ", "-")}`}
                        data-test-id={`ws-option-${ws.label.toLowerCase().replace(" ", "-")}`}
                        data-testid={`ws-option-${ws.label.toLowerCase().replace(" ", "-")}`}
                        onClick={() => {
                          navigate(ws.path);
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium text-left w-full transition-all ${
                          isWSActive
                            ? "bg-amber-500/10 text-amber-500 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        <ws.icon className={`w-3.5 h-3.5 ${isWSActive ? "text-amber-500" : "text-muted-foreground"}`} />
                        <span>{ws.label}</span>
                      </button>
                    );
                  })}
                  {isAuthenticated && (
                    <button
                      id="ws-option-logout"
                      data-test-id="ws-option-logout"
                      data-testid="ws-option-logout"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium text-left w-full transition-all text-red-500 hover:bg-red-500/10"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}