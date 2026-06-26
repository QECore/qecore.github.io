import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type HeaderType = "pw-core" | "k6-core";
export const HEADERS: HeaderType[] = ["pw-core", "k6-core"];

interface HeaderContextType {
  activeHeader: HeaderType;
  setActiveHeader: (header: HeaderType) => void;
  toggleHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize from localStorage or path prefix
  const [activeHeader, setActiveHeaderState] = useState<HeaderType>(() => {
    const matched = HEADERS.find(h => location.pathname === `/${h}` || location.pathname.startsWith(`/${h}/`));
    if (matched) return matched;
    
    const saved = localStorage.getItem("active_header") as HeaderType;
    return (HEADERS.includes(saved) ? saved : HEADERS[0]);
  });

  const setActiveHeader = (header: HeaderType) => {
    setActiveHeaderState(header);
    localStorage.setItem("active_header", header);

    // If on docs page, transition to the target docs page
    const isDocs = HEADERS.some(h => location.pathname.startsWith(`/${h}/docs`));
    if (isDocs) {
      navigate(`/${header}/docs`);
    } else if (HEADERS.some(h => location.pathname === `/${h}`) || location.pathname === "/") {
      navigate(`/${header}`);
    }
  };

  const toggleHeader = () => {
    const currentIndex = HEADERS.indexOf(activeHeader);
    const nextIndex = (currentIndex + 1) % HEADERS.length;
    setActiveHeader(HEADERS[nextIndex]);
  };

  // Sync state if path changes externally
  useEffect(() => {
    const matched = HEADERS.find(h => location.pathname === `/${h}` || location.pathname.startsWith(`/${h}/`));
    if (matched) {
      setActiveHeaderState(matched);
      localStorage.setItem("active_header", matched);
    }
  }, [location.pathname]);

  return (
    <HeaderContext.Provider value={{ activeHeader, setActiveHeader, toggleHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
