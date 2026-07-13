import * as React from "react";
import { cn } from "@/lib/utils";

export interface MenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function MenuItem({
  active = false,
  className,
  children,
  href,
  ...props
}: MenuItemProps) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center px-3 py-2 rounded-md text-[13px] font-medium leading-5 transition-colors duration-150 ease-linear text-zinc-400",
        "hover:bg-zinc-800/70 hover:text-white",
        active && "bg-amber-500/10 text-amber-500 font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
