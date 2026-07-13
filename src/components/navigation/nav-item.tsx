// @ts-nocheck
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  isActive: boolean;
  activeColor?: "amber" | "indigo" | "orange";
  variant?: "top-nav" | "sidebar" | "threaded";
  children: React.ReactNode;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLAnchorElement>) => void;
}

export function NavItem({
  to,
  isActive,
  activeColor = "amber",
  variant = "top-nav",
  children,
  id,
  onClick
  , onMouseEnter, onFocus
}: NavItemProps) {
  const baseClasses = "transition-all duration-200 select-none";
  
  const variants = {
    "top-nav": cn(
      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider",
      isActive 
        ? activeColor === "indigo" 
          ? "bg-indigo-500/10 text-indigo-400 font-semibold"
          : activeColor === "orange"
            ? "bg-orange-500/10 text-orange-500 font-semibold"
            : "bg-amber-500/10 text-amber-500 font-semibold"
        : "text-[#94A3B8] hover:bg-slate-200 dark:hover:bg-slate-800/50"
    ),
    sidebar: cn(
      "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm w-full",
      isActive
        ? "bg-sidebar-accent text-sidebar-foreground font-medium shadow-sm"
        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
    ),
    threaded: cn(
      "w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-[13px]",
      isActive
        ? activeColor === "indigo"
          ? "bg-indigo-500/10 text-indigo-400 font-semibold"
          : activeColor === "orange"
            ? "bg-orange-500/10 text-orange-500 font-semibold"
            : "bg-amber-500/10 text-amber-500 font-semibold"
        : "text-[#94A3B8] hover:bg-slate-200 dark:hover:bg-slate-800/85"
    )
  };

  return (
    <Link
      to={to}
      id={id}
      data-testid={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      className={cn(baseClasses, variants[variant])}
    >
      {children}
    </Link>
  );
}
