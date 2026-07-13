import React from "react";

type BadgeVariant = "default" | "warning" | "success" | "indigo";

interface DocBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground border-border",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
};

/**
 * Inline badge/chip for docs pages.
 * Variants: default | warning | success | indigo
 */
export default function DocBadge({ children, variant = "default" }: DocBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
