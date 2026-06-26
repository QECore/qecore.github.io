import * as React from "react";

interface SkeuCardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SkeuCard({ children, className = "", disabled, onClick }: SkeuCardProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      className={`skeu-card p-4 ${onClick && !disabled ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${disabled ? "pointer-events-none" : ""} ${className}`}
    >
      {children}
    </div>
  );
}