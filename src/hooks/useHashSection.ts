import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useHashSection(
  validIds: string[],
  defaultId: string
): [string, (id: string) => void] {
  const location = useLocation();
  const [activeId, setActiveId] = useState(() => {
    const hash = location.hash.replace("#", "");
    return hash && validIds.includes(hash) ? hash : defaultId;
  });

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && validIds.includes(hash)) {
      setActiveId(hash);
    } else {
      setActiveId(defaultId);
    }
  }, [location.hash, validIds, defaultId]);

  const selectSection = useCallback((id: string) => {
    window.location.hash = id;
    setActiveId(id);
  }, []);

  return [activeId, selectSection];
}
