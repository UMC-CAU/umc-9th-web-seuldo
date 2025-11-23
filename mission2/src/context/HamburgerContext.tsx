import { createContext, useContext, useState, useRef, useEffect } from "react";

interface HamburgerContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  sidebarRef: React.RefObject<HTMLDivElement | null>;
}

interface HamburgerProviderProps {
  children: React.ReactNode;
}

const HamburgerContext = createContext<HamburgerContextType | null>(null);

export const HamburgerProvider = ({ children }: HamburgerProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  // ✅ 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !e.composedPath().some((el) => (el as HTMLElement).id === "hamburger-button")
      ) {
        close();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) open(); 
      else close()
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HamburgerContext.Provider value={{ isOpen, toggle, close, sidebarRef }}>
      {children}
    </HamburgerContext.Provider>
  );
};

export const useHamburger = () => {
  const context = useContext(HamburgerContext);
  if (!context)
    throw new Error("useHamburger must be used within a HamburgerProvider");
  return context;
};
