import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const containerVariants = cva("w-full mx-auto", {
  variants: {
    width: {
      default: "max-w-[1440px]",
      narrow: "max-w-5xl",
      wide: "max-w-6xl",
      full: "max-w-none",
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
  },
  defaultVariants: {
    width: "default",
    padding: "md",
  },
});

export interface ContainerProps extends VariantProps<typeof containerVariants> {
  children: ReactNode;
  className?: string;
}

export function Container({ width, padding, children, className }: ContainerProps) {
  return <div className={cn(containerVariants({ width, padding }), className)}>{children}</div>;
}
