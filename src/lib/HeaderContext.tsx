import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderType = "pw-core" | "k6-core";

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
    if (location.pathname === "/pw-core" || location.pathname.startsWith("/pw-core/docs")) return "pw-core";
    if (location.pathname === "/k6-core" || location.pathname.startsWith("/k6-core/docs")) return "k6-core";
    
    const saved = localStorage.getItem("active_header");
    return (saved === "k6-core" ? "k6-core" : "pw-core");
  });

  const setActiveHeader = (header: HeaderType) => {
    setActiveHeaderState(header);
    localStorage.setItem("active_header", header);

    // If on docs page, transition to the target docs page
    if (location.pathname.startsWith("/pw-core/docs") || location.pathname.startsWith("/k6-core/docs")) {
      navigate(`/${header}/docs`);
    } else if (location.pathname === "/pw-core" || location.pathname === "/k6-core" || location.pathname === "/") {
      navigate(`/${header}`);
    }
  };

  const toggleHeader = () => {
    setActiveHeader(activeHeader === "pw-core" ? "k6-core" : "pw-core");
  };

  // Sync state if path changes externally
  useEffect(() => {
    if (location.pathname === "/pw-core" || location.pathname.startsWith("/pw-core/docs")) {
      setActiveHeaderState("pw-core");
      localStorage.setItem("active_header", "pw-core");
    } else if (location.pathname === "/k6-core" || location.pathname.startsWith("/k6-core/docs")) {
      setActiveHeaderState("k6-core");
      localStorage.setItem("active_header", "k6-core");
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
