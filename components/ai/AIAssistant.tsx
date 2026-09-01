"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  Leaf,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AIProductCard from "./AIProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  description: string;
  url: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  products?: Product[];
  followUpQuestion?: string | null;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "🌱 Hello! I'm AgroCare AI, your farming assistant. Ask me anything about farming, crop problems, fertilizers, or agricultural products. I speak Bangla, English, and Banglish!",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();

    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        }/api/ai/assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: trimmed,
            sessionId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (data.data.sessionId) {
          setSessionId(data.data.sessionId);
        }

        const aiMessage: Message = {
          id: Date.now().toString(),
          type: "ai",
          content: data.data.response,
          products: data.data.products,
          followUpQuestion: data.data.followUpQuestion,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          id: Date.now().toString(),
          type: "ai",
          content:
            data.message ||
            "Sorry, I couldn't process your question. Please try again.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: "Something went wrong. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFollowUp = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          className={cn(
            "fixed z-50 bg-[#111714] rounded-2xl border border-[rgba(255,255,255,0.06)] shadow-2xl shadow-black/50",
            "flex flex-col overflow-hidden",
            isFullScreen
              ? "inset-4"
              : "bottom-4 right-4 w-[420px] h-[650px] max-w-[95vw] max-h-[90vh]",
            isMinimized ? "h-16" : ""
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[#1D976C]/5 to-[#93F9B9]/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/30">
                <Leaf className="w-5 h-5 text-[#111714]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#F1F5F2]">
                  AgroCare AI
                </h3>

                <span className="text-[10px] text-[#93F9B9] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Powered by Gemini
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300"
              >
                {isFullScreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.type === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-[#111714]" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl p-4",
                        message.type === "user"
                          ? "bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714]"
                          : "bg-[rgba(255,255,255,0.04)] text-[#F1F5F2] border border-[rgba(255,255,255,0.06)]"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>

                      {message.products &&
                        message.products.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <p className="text-xs text-[#93F9B9] font-medium flex items-center gap-2">
                              <ShoppingBag className="w-3 h-3" />
                              Recommended Products
                            </p>

                            {message.products.map((product) => (
                              <AIProductCard
                                key={product.id}
                                product={product}
                              />
                            ))}
                          </div>
                        )}

                      {message.followUpQuestion && (
                        <div className="mt-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                          <p className="text-xs text-[#7D8983] mb-2">
                            🤔 Follow-up:
                          </p>

                          <p className="text-sm text-[#A9B5AF]">
                            {message.followUpQuestion}
                          </p>

                          <button
                            onClick={() =>
                              handleFollowUp(
                                message.followUpQuestion || ""
                              )
                            }
                            className="mt-2 text-xs text-[#93F9B9] hover:text-[#1D976C] transition-colors duration-300"
                          >
                            Ask this question →
                          </button>
                        </div>
                      )}

                      <span className="text-[10px] text-[#7D8983] mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-[#1D976C]/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[#93F9B9]" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[#111714]" />
                    </div>

                    <div className="bg-[rgba(255,255,255,0.04)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]">
                      <Loader2 className="w-5 h-5 text-[#93F9B9] animate-spin" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[#1D976C]/5 to-[#93F9B9]/5">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about farming, crops, products..."
                    className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                    disabled={isLoading}
                  />

                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-[#52635B] mt-2 text-center">
                  Supports Bangla, English, and Banglish
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;