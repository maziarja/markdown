"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SidebarContextType = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
};

type SidebarProviderProps = {
  children: React.ReactNode;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        setIsSidebarOpen,
        isSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("Sidebar context was used outside of sidebar provider");
  return context;
}

export { useSidebar, SidebarProvider };
