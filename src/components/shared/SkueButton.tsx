import * as React from "react";

interface SkeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "ghost" | "destructive";
  className?: string;
}

export default function SkeuButton({ children, variant = "default", className = "", ...props }: SkeuButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all";
  const variants = {
    default: "skeu-button text-foreground",
    primary: "skeu-button-primary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
    destructive: "bg-gradient-to-b from-red-500 to-red-600 border border-red-700 text-white shadow-sm hover:from-red-400 hover:to-red-500",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}