import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const stackLayoutVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-10",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    spacing: "md",
    align: "stretch",
  },
});

export interface StackLayoutProps extends VariantProps<typeof stackLayoutVariants> {
  children: ReactNode;
}

export function StackLayout({ spacing, align, children }: StackLayoutProps) {
  return <div className={stackLayoutVariants({ spacing, align })}>{children}</div>;
}
