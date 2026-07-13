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
          className="shadow-sm pointer-events-auto hover:bg-amber-500/20 transition-all"
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
          className="shadow-sm pointer-events-auto hover:bg-amber-500/20 transition-all"
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
