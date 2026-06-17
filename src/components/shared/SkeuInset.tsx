import * as React from "react";

interface SkeuInsetProps {
  children: React.ReactNode;
  className?: string;
}

export default function SkeuInset({ children, className = "" }: SkeuInsetProps) {
  const hasPadding = /\bp-/.test(className) || /\bpx-/.test(className) || /\bpy-/.test(className);
  return (
    <div className={`skeu-inset ${hasPadding ? "" : "p-4"} ${className}`}>
      {children}
    </div>
  );
}
