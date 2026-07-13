import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const surfaceVariants = cva("rounded-xl border", {
  variants: {
    variant: {
      default: "bg-card border-border",
      elevated: "bg-slate-950/75 border-white/10 shadow-2xl",
      terminal: "bg-black border-white/5 font-mono",
      muted: "bg-slate-900/30 border-white/5",
      gradient: "bg-gradient-to-br from-slate-900/90 to-slate-950/90 border-white/5",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface SurfaceProps extends VariantProps<typeof surfaceVariants> {
  children: ReactNode;
}

export function Surface({ variant, padding, children }: SurfaceProps) {
  return <div className={surfaceVariants({ variant, padding })}>{children}</div>;
}
