import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

const pageTitleVariants = cva("font-heading tracking-tight", {
  variants: {
    size: {
      default: "text-2xl md:text-[46px] font-bold",
      hero: "text-2xl md:text-[48px] font-extrabold",
      docs: "text-3xl font-extrabold",
    },
    gradient: {
      none: "text-foreground",
      amber: "bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent",
      indigo: "bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent",
      muted: "text-slate-300",
    },
  },
  defaultVariants: {
    size: "default",
    gradient: "none",
  },
});

export interface PageTitleProps extends VariantProps<typeof pageTitleVariants> {
  children: ReactNode;
  as?: ElementType;
}

export function PageTitle({ size, gradient, children, as: Tag = "h1" }: PageTitleProps) {
  return <Tag className={pageTitleVariants({ size, gradient })}>{children}</Tag>;
}

const sectionTitleVariants = cva("font-bold font-heading text-slate-100 font-sans", {
  variants: {
    size: {
      default: "text-3xl",
      sm: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SectionTitleProps extends VariantProps<typeof sectionTitleVariants> {
  children: ReactNode;
  as?: ElementType;
}

export function SectionTitle({ size, children, as: Tag = "h2" }: SectionTitleProps) {
  return <Tag className={sectionTitleVariants({ size })}>{children}</Tag>;
}

const paragraphVariants = cva("leading-relaxed", {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm md:text-base",
      lg: "text-sm md:text-[16px] leading-[1.5]",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      subtle: "text-muted-foreground/75",
    },
  },
  defaultVariants: {
    size: "default",
    tone: "muted",
  },
});

export interface ParagraphProps extends VariantProps<typeof paragraphVariants> {
  children: ReactNode;
}

export function Paragraph({ size, tone, children }: ParagraphProps) {
  return <p className={paragraphVariants({ size, tone })}>{children}</p>;
}

const captionVariants = cva("uppercase font-bold tracking-wider", {
  variants: {
    size: {
      sm: "text-[9px]",
      default: "text-[10px] tracking-[0.15em]",
      lg: "text-xs tracking-widest",
    },
    tone: {
      default: "text-muted-foreground/60",
      accent: "text-amber-500",
      label: "text-slate-500",
    },
  },
  defaultVariants: {
    size: "default",
    tone: "default",
  },
});

export interface CaptionProps extends VariantProps<typeof captionVariants> {
  children: ReactNode;
  as?: ElementType;
}

export function Caption({ size, tone, children, as: Tag = "span" }: CaptionProps) {
  return <Tag className={captionVariants({ size, tone })}>{children}</Tag>;
}

const labelVariants = cva("font-semibold", {
  variants: {
    size: {
      sm: "text-[10.5px] uppercase tracking-wider",
      default: "text-xs",
    },
    tone: {
      default: "text-slate-400",
      accent: "text-amber-500",
    },
  },
  defaultVariants: {
    size: "default",
    tone: "default",
  },
});

export interface LabelTextProps extends VariantProps<typeof labelVariants> {
  children: ReactNode;
}

export function LabelText({ size, tone, children }: LabelTextProps) {
  return <span className={labelVariants({ size, tone })}>{children}</span>;
}

const codeTextVariants = cva("font-mono", {
  variants: {
    size: {
      sm: "text-[10px]",
      default: "text-xs",
      lg: "text-sm",
    },
    tone: {
      default: "text-slate-200",
      muted: "text-slate-400",
      accent: "text-amber-500",
    },
  },
  defaultVariants: {
    size: "default",
    tone: "default",
  },
});

export interface CodeTextProps extends VariantProps<typeof codeTextVariants> {
  children: ReactNode;
  as?: ElementType;
}

export function CodeText({ size, tone, children, as: Tag = "code" }: CodeTextProps) {
  return <Tag className={codeTextVariants({ size, tone })}>{children}</Tag>;
}
