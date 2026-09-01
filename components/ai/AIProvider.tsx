"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import AIAssistant from "./AIAssistant";
 
interface AIContextType {
  isOpen: boolean;
  openAI: () => void;
  closeAI: () => void;
  toggleAI: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAI = () => setIsOpen(true);
  const closeAI = () => setIsOpen(false);
  const toggleAI = () => setIsOpen(!isOpen);

  return (
    <AIContext.Provider value={{ isOpen, openAI, closeAI, toggleAI }}>
      {children}
      <AIAssistant isOpen={isOpen} onClose={closeAI} />
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}

// Add display name for debugging
AIProvider.displayName = "AIProvider";