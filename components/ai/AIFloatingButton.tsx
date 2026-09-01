"use client";

import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { useAI } from "./AIProvider";

const AIFloatingButton = () => {
  const { toggleAI, isOpen } = useAI();

  // Don't render if already open
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={toggleAI}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D976C] to-[#93F9B9] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#1D976C] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/40 hover:shadow-[#1D976C]/60 transition-all duration-300 hover:scale-105 group-hover:scale-105">
          <MessageCircle className="w-6 h-6 text-[#111714]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-[#93F9B9] rounded-full border-2 border-[#111714] flex items-center justify-center"
          >
            <Sparkles className="w-2.5 h-2.5 text-[#111714]" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default AIFloatingButton;