import * as React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, FolderKanban, ListChecks, FileText, Activity, Trello } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/app", icon: LayoutDashboard },
  { label: "Projects", path: "/app/projects", icon: FolderKanban },
  { label: "Tasks", path: "/app/tasks", icon: ListChecks },
  { label: "Board", path: "/app/board", icon: Trello },
  { label: "Documents", path: "/app/documents", icon: FileText },
  { label: "Activity", path: "/app/activity", icon: Activity },
];

export default function AppSidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen">
      {/* Floating sidebar palette */}
      <aside id="sidebar-container" data-test-id="sidebar-container" data-testid="sidebar-container" className="w-56 shrink-0 hidden md:flex flex-col p-3 sticky top-16 h-[calc(100vh-64px)]">
        <div
          className="rounded-2xl p-3 flex flex-col gap-1 h-full"
          style={{
            background: "var(--sidebar-floating-bg, hsl(var(--sidebar-background, var(--card))))",
            border: "1px solid hsl(var(--border) / 0.5)",
            boxShadow: "0 4px 24px -4px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2.5 mb-1 mt-1">
            Platform
          </p>
          <nav id="sidebar-nav" data-test-id="sidebar-nav" data-testid="sidebar-nav" className="flex flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                id={`sidebar-${item.label.toLowerCase()}`}
                data-test-id={`sidebar-${item.label.toLowerCase()}`}
                data-testid={`sidebar-${item.label.toLowerCase()}`}
                to={item.path}
                className={`
                  flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-all duration-200
                  ${isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/60"}
                `}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Right content area with normal page scroll */}
      <div className="flex-1 pb-16">
        <Outlet />
      </div>
    </div>
  );
}