import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const gridLayoutVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-1 md:grid-cols-12",
    },
    gap: {
      none: "gap-0",
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
    },
  },
  defaultVariants: {
    columns: 2,
    gap: "lg",
    align: "start",
  },
});

export interface GridLayoutProps extends VariantProps<typeof gridLayoutVariants> {
  children: ReactNode;
}

export function GridLayout({ columns, gap, align, children }: GridLayoutProps) {
  return <div className={gridLayoutVariants({ columns, gap, align })}>{children}</div>;
}

export const gridItemVariants = cva("", {
  variants: {
    span: {
      full: "col-span-12",
      half: "col-span-12 md:col-span-6",
      third: "col-span-12 md:col-span-4",
      seven: "col-span-12 md:col-span-7",
      five: "col-span-12 md:col-span-5",
    },
  },
  defaultVariants: {
    span: "full",
  },
});

export interface GridItemProps extends VariantProps<typeof gridItemVariants> {
  children: ReactNode;
}

export function GridItem({ span, children }: GridItemProps) {
  return <div className={gridItemVariants({ span })}>{children}</div>;
}
