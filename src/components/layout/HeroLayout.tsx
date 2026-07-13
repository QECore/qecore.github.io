import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const heroLayoutVariants = cva("text-left", {
  variants: {
    padding: {
      default: "pt-0 pb-10 md:pb-12",
      compact: "pt-2 pb-6",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export interface HeroLayoutProps extends VariantProps<typeof heroLayoutVariants> {
  children: ReactNode;
}

export function HeroLayout({ padding, children }: HeroLayoutProps) {
  return <div className={heroLayoutVariants({ padding })}>{children}</div>;
}
