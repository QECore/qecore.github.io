import * as React from "react";

interface SkeuCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SkeuCard({ children, className = "", onClick }: SkeuCardProps) {
  return (
    <div
      onClick={onClick}
      className={`skeu-card p-4 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}