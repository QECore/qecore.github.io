import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

export const sectionLayoutVariants = cva("snap-item scroll-mt-24 relative text-left", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-6",
      md: "py-12",
      lg: "py-16",
    },
    border: {
      none: "",
      bottom: "border-b border-border/40 mb-10",
      bottomLg: "border-b border-border/40 mb-12",
    },
  },
  defaultVariants: {
    spacing: "md",
    border: "bottomLg",
  },
});

export interface SectionLayoutProps extends VariantProps<typeof sectionLayoutVariants> {
  id?: string;
  children: ReactNode;
}

export function SectionLayout({ id, spacing, border, children }: SectionLayoutProps) {
  return (
    <section id={id} className={sectionLayoutVariants({ spacing, border })}>
      {children}
    </section>
  );
}
