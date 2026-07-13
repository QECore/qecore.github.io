import { Button } from "@/components/buttons/button";

export interface DocsPageLink {
  id: string;
  label: string;
}

interface DocsPagerProps {
  previous?: DocsPageLink;
  next?: DocsPageLink;
  onNavigate?: (id: string) => void;
}

export function DocsPager({ previous, next, onNavigate }: DocsPagerProps) {
  if (!previous && !next) return null;

  const navigate = (id: string) => onNavigate ? onNavigate(id) : (window.location.hash = id);

  return (
    <nav aria-label="Documentation pagination" className="mt-2 flex items-center justify-between border-t border-white/5 pt-3">
      {previous ? <Button variant="secondary" size="landing" onClick={() => navigate(previous.id)}>← {previous.label}</Button> : <span />}
      {next ? <Button variant="secondary" size="landing" onClick={() => navigate(next.id)}>{next.label} →</Button> : <span />}
    </nav>
  );
}
