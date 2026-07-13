import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const centerLayoutVariants = cva("flex items-center justify-center", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    padding: {
      none: "",
      md: "p-6",
      lg: "p-12",
    },
  },
  defaultVariants: {
    direction: "col",
    padding: "none",
  },
});

export interface CenterLayoutProps extends VariantProps<typeof centerLayoutVariants> {
  children: ReactNode;
}

export function CenterLayout({ direction, padding, children }: CenterLayoutProps) {
  return <div className={centerLayoutVariants({ direction, padding })}>{children}</div>;
}
