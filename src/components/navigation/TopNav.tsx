import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, FlaskConical, FileCode2, LogOut, Moon, Sun, BookOpen, Shuffle, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useHeader } from "@/lib/HeaderContext";
import { HEADERS } from "@/constants/site";
import { applyTheme, ThemeType } from "@/utils/theme";
import { NavItem } from "@/components/navigation/nav-item";

export default function TopNav() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeHeader, setActiveHeader, toggleHeader } = useHeader();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleShuffle = () => {
    toggleHeader();
  };

  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "extra-dark";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "extra-dark" : "dark";
    setTheme(nextTheme);
  };

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
  const isLandingPage = ["/", ...HEADERS.map(h => `/${h}`)].includes(location.pathname);
  const isDull = isLandingPage && activeWorkspace.label === "QA Workspace";
  const hasHeaderInPath = HEADERS.some(h => location.pathname === `/${h}` || location.pathname.startsWith(`/${h}/`));

  return (
    <header id="top-nav" data-test-id="top-nav" data-testid="top-nav" className="fixed glass-edge-panel inset-x-4 top-2 py-2 px-6 z-50 border-b border-border">
      <div className="max-w-full grid grid-cols-3 items-center h-16">
        {/* Left Column: Logo & Switcher */}
        <div className="flex justify-start items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-8 object-contain shrink-0" />
          <div className="flex items-center gap-3 select-none">
            {hasHeaderInPath ? (
              activeHeader === "pw-core" ? (
                <>
                  <Link
                    to="/pw-core"
                    id="top-nav-logo"
                    data-test-id="top-nav-logo"
                    data-testid="top-nav-logo"
                    className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent hover:opacity-90 transition-opacity w-[78px] md:w-[88px] inline-flex items-center"
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
                    className="w-[70px] inline-flex items-center justify-center py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary/50 transition-all border border-border/50 shrink-0"
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
                    className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text text-transparent hover:opacity-90 transition-opacity w-[78px] md:w-[88px] inline-flex items-center"
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
                    className="w-[70px] inline-flex items-center justify-center py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary/50 transition-all border border-border/50 shrink-0"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    PW-Core
                  </button>
                </>
              )
            ) : (
              <Link
                to={`/${activeHeader}`}
                id="go-back-to-docs"
                data-test-id="go-back-to-docs"
                data-testid="go-back-to-docs"
                className="text-xs font-semibold text-muted-foreground/50 hover:text-foreground transition-all duration-200 transform scale-90 hover:scale-95 flex items-center gap-1.5 bg-secondary/20 px-2.5 py-1 rounded-md border border-border/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Go back to Docs</span>
              </Link>
            )}
          </div>
        </div>

        {/* Center Column: Navigation tabs */}
        <div className="flex justify-center items-center gap-2">
          <NavItem
            to={`/${activeHeader}`}
            id="top-nav-home"
            isActive={location.pathname === `/${activeHeader}` || location.pathname === '/'}
            activeColor={activeHeader === "k6-core" ? "indigo" : "amber"}
            variant="top-nav"
            onClick={() => {
              if (location.pathname === `/${activeHeader}` || location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}
            onMouseEnter={() => import('@/pages/home')}
            onFocus={() => import('@/pages/home')}
          >
            Home
          </NavItem>
          <NavItem
            to={`/${activeHeader}/docs`}
            id="top-nav-docs"
            isActive={location.pathname.endsWith('/docs') || location.pathname.includes('/docs/')}
            activeColor={activeHeader === "k6-core" ? "indigo" : "amber"}
            variant="top-nav"
            onMouseEnter={() => import('@/pages/docs')}
            onFocus={() => import('@/pages/docs')}
          >
            Docs
          </NavItem>
          <NavItem
            to="/workspace"
            id="top-nav-workspace"
            isActive={location.pathname.startsWith('/workspace')}
            activeColor={activeHeader === "k6-core" ? "indigo" : "amber"}
            variant="top-nav"
          >
            QA Workspace
          </NavItem>
        </div>

        {/* Right Column: Theme Toggle */}
        <div className="flex items-center justify-end gap-3">
          <button
            id="theme-toggle"
            data-test-id="theme-toggle"
            data-testid="theme-toggle"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            title={theme === "extra-dark" ? "Switch to Dark Mode" : "Switch to Extra Dark Mode"}
          >
            {theme === "extra-dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}