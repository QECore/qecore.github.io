import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, FlaskConical, FileCode2, LogOut, Moon, Sun, BookOpen, LogIn, Zap, Shuffle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useHeader } from "@/lib/HeaderContext";

const navItems = [
  { label: "Docs", path: "/docs", icon: BookOpen },
  { label: "App", path: "/app", icon: LayoutDashboard },
  { label: "Playground", path: "/playground", icon: FlaskConical },
  { label: "Swagger", path: "/swagger", icon: FileCode2 },
];

export default function TopNav() {
  const { isAuthenticated, logout, navigateToLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeHeader, setActiveHeader, toggleHeader } = useHeader();

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

  const isActive = (path) => {
    if (path === "/pw-core") return location.pathname === "/pw-core";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="w-full px-6 grid grid-cols-3 items-center h-16">
        <div className="flex justify-start items-center gap-2.5">
          <img src="/logo.png" alt="Logo" className="h-8 object-contain shrink-0" />
          <div className="flex items-center gap-3 select-none">
            {activeHeader === "pw-core" ? (
              <>
                <Link
                  to="/"
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
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-muted-foreground bg-secondary/50 hover:bg-secondary hover:text-foreground transition-all border border-border/50 shrink-0"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  K6-Core
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
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

        <nav className="flex items-center justify-center gap-0.5">
          {navItems.map((item) => {
            const targetPath = item.path === "/docs" ? `/${activeHeader}/docs` : item.path;
            const isDocsActive = item.path === "/docs" && (location.pathname.startsWith("/pw-core/docs") || location.pathname.startsWith("/k6-core/docs"));
            const linkActive = isDocsActive || (item.path !== "/docs" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                id={`nav-${item.label.toLowerCase()}`}
                data-test-id={`nav-${item.label.toLowerCase()}`}
                data-testid={`nav-${item.label.toLowerCase()}`}
                to={targetPath}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all
                  ${linkActive
                    ? "active"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
                `}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-1">
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
          {isAuthenticated ? (
            <button
              id="logout-button"
              data-test-id="logout-button"
              data-testid="logout-button"
              onClick={() => logout()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <button
              id="login-button"
              data-test-id="login-button"
              data-testid="login-button"
              onClick={() => navigateToLogin()}
              className={`
                flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all
                ${location.pathname === '/login'
                  ? "active"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              `}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}