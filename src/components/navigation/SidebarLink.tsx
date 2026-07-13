import * as React from "react";
import { cn } from "@/lib/utils";

export interface SidebarLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function SidebarLink({
  active = false,
  className,
  children,
  ...props
}: SidebarLinkProps) {
  return (
    <button
      type="button"
      data-active={active ? "true" : undefined}
      className={cn(
        "flex w-full items-center px-3 py-2 rounded-md text-[15px] font-medium leading-5 transition-colors duration-150 text-zinc-400",
        "hover:bg-white/8 hover:text-white",
        "data-[active=true]:bg-white/8 data-[active=true]:text-amber-400 data-[active=true]:font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
