import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const contentLayoutVariants = cva("mx-auto", {
  variants: {
    width: {
      default: "max-w-5xl",
      wide: "max-w-6xl",
      narrow: "max-w-3xl",
      full: "w-full",
    },
    padding: {
      none: "",
      bottom: "pb-[120px]",
      section: "pt-2 pb-6",
    },
  },
  defaultVariants: {
    width: "default",
    padding: "none",
  },
});

export interface ContentLayoutProps extends VariantProps<typeof contentLayoutVariants> {
  children: ReactNode;
}

export function ContentLayout({ width, padding, children }: ContentLayoutProps) {
  return <div className={contentLayoutVariants({ width, padding })}>{children}</div>;
}
