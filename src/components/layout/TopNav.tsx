import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, FlaskConical, FileCode2, LogOut, Moon, Sun, BookOpen, LogIn } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { label: "Home", path: "/home", icon: Home },
  { label: "Docs", path: "/docs", icon: BookOpen },
  { label: "App", path: "/app", icon: LayoutDashboard },
  { label: "Playground", path: "/playground", icon: FlaskConical },
  { label: "Swagger", path: "/swagger", icon: FileCode2 },
];

export default function TopNav() {
  const { isAuthenticated, logout, navigateToLogin } = useAuth();
  const location = useLocation();
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
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="w-full px-6 grid grid-cols-3 items-center h-16">
        <div className="flex justify-start">
          <Link to="/home" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="PW-Core Logo" className="h-8 object-contain" />
            <span
              className="text-2xl tracking-tight transition-colors"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                background: "linear-gradient(135deg, hsl(38, 92%, 55%), hsl(25, 95%, 53%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PW-Core
            </span>
          </Link>
        </div>

        <nav className="flex items-center justify-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all
                ${isActive(item.path)
                  ? "active"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}
              `}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1">
          <button
            onClick={toggleDark}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <button
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