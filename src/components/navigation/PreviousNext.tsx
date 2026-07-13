export interface NavLink {
  id: string;
  label: string;
}

import { Button } from "@/components/buttons/button";

export interface PreviousNextProps {
  prevLink?: NavLink;
  nextLink?: NavLink;
  onNavigate: (id: string) => void;
  sidebarOffset?: boolean;
}

export function PreviousNext({
  prevLink,
  nextLink,
  onNavigate,
}: PreviousNextProps) {
  if (!prevLink && !nextLink) return null;

  return (
    <div
      className="fixed bottom-6 left-6 lg:left-80 right-8 flex items-center justify-between z-[999] pointer-events-none select-none"
    >
      {prevLink ? (
        <Button
          variant="activeOrange"
          className="py-2 rounded-xl text-xs font-medium font-sans shadow-lg pointer-events-auto bg-slate-950/65 backdrop-blur-md border border-white/10 hover:bg-zinc-800 transition-all"
          onClick={() => onNavigate(prevLink.id)}
        >
          ← {prevLink.label}
        </Button>
      ) : (
        <div />
      )}
      {nextLink ? (
        <Button
          variant="activeOrange"
          className="px-4 py-2 rounded-xl text-xs font-semibold font-sans shadow-lg pointer-events-auto"
          onClick={() => onNavigate(nextLink.id)}
        >
          {nextLink.label} →
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
