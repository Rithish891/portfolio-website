"use client";

import { Message } from "@/types/chat";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaUser, FaLightbulb } from "react-icons/fa";
import { BsSendFill, BsChatDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split("**");
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{part}</strong>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Rithish Jakkireddy. I'm here to answer questions about my professional background and experience. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasInteracted(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to send message" }));
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessageText =
        error instanceof Error
          ? error.message
          : "Sorry, I'm having trouble responding right now.";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, an error occurred: ${errorMessageText} Please try again or contact me directly.`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const resetChat = async () => {
    setIsLoading(true);
    try {
      await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reset: true }),
      });

      setMessages([
        {
          id: "1",
          content:
            "Hi! I'm Rithish Jakkireddy. I'm here to answer questions about my professional background and experience. What would you like to know?",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error resetting chat:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "Sorry, I couldn't reset the chat. Please try closing and reopening.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setHasInteracted(true);
        }}
        className={cn(
          "flex items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300",
          "bg-gradient-to-tr from-blue-600 via-blue-500 to-purple-500 hover:from-blue-500 hover:via-blue-400 hover:to-purple-400",
          "text-white",
          "size-14 md:size-14",
          "relative overflow-hidden border border-blue-400/30",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-label="Toggle chat"
        title="Chat with Rithish"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
          y: isOpen || hasInteracted ? 0 : [0, -8, 0, -4, 0],
        }}
        transition={{
          default: { duration: 0.3 },
          y:
            isOpen || hasInteracted
              ? { duration: 0.3 }
              : {
                  duration: 0.8,
                  times: [0, 0.3, 0.5, 0.7, 1],
                  ease: "easeInOut",
                  delay: 0.5,
                },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        <BsChatDots className="size-6 relative z-10 flex items-center justify-center" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "rounded-xl shadow-2xl w-80 sm:w-96 h-[500px] max-h-[90vh] flex flex-col",
              "border border-opacity-50",
              "bg-gradient-to-b from-transparent to-transparent",
              "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
              "dark:shadow-[0_0_15px_rgba(0,0,0,0.3)]",
              "backdrop-blur-md",
              "dark:bg-gray-900/80 bg-white/90",
              "relative overflow-hidden",
              "border-gray-200/50 dark:border-gray-700/50"
            )}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/5 dark:from-blue-500/5 dark:to-purple-500/10 rounded-xl pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>
            <div
              className={cn(
                "p-3 rounded-t-xl flex justify-between items-center",
                "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500",
                "relative z-10 overflow-hidden",
                "text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <BsChatDots className="size-5" />
                <h3 className="font-semibold text-sm md:text-base">
                  Chat with Rithish
                </h3>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={resetChat}
                  className="hover:bg-white/20 p-2 rounded-full text-xs transition-colors"
                  title="Reset chat"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isLoading}
                >
                  <FaTrash className="size-3.5" />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Close chat"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoMdClose className="size-4" />
                </motion.button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.4,
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md px-4 py-3 text-sm flex flex-col gap-1",
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-500 via-blue-550 to-blue-600 text-white font-medium rounded-2xl rounded-tr-none border border-blue-400/30 backdrop-blur-sm"
                        : "bg-gradient-to-br from-gray-100/90 to-gray-200/80 dark:from-gray-800/90 dark:to-gray-700/80 backdrop-blur-sm text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-none border border-gray-300/30 dark:border-gray-700/30",
                      "shadow-md relative overflow-hidden"
                    )}
                  >
                    {message.role === "user" ? (
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 to-transparent pointer-events-none" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-transparent dark:from-gray-700/20 dark:to-transparent pointer-events-none" />
                    )}
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                      {message.role === "assistant" ? (
                        <FaLightbulb className="size-3 text-blue-600 dark:text-blue-400 flex items-center justify-center" />
                      ) : (
                        <FaUser className="size-3 text-white" />
                      )}
                      <span
                        className={message.role === "user" ? "font-medium" : ""}
                      >
                        {message.role === "assistant" ? "Rithish AI" : "You"}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap relative z-10">
                      {renderFormattedText(message.content)}
                    </p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    duration: 0.4,
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <div
                    className={cn(
                      "bg-gradient-to-br from-gray-100/90 to-gray-200/80 dark:from-gray-800/90 dark:to-gray-700/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-none text-sm",
                      "shadow-md border border-gray-300/30 dark:border-gray-700/30 relative overflow-hidden"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-transparent dark:from-gray-700/20 dark:to-transparent pointer-events-none" />
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-80">
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/30 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full p-0.5 flex items-center justify-center">
                        <FaLightbulb className="size-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Rithish AI is typing...</span>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <motion.div
                        className="size-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/20"
                        animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                      />
                      <motion.div
                        className="size-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/20"
                        animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="size-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/20"
                        animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={sendMessage}
              className="p-4 border-t dark:border-gray-700/50 border-gray-200/50 relative z-10"
            >
              <div className="flex space-x-2 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about my skills, experience..."
                    className={cn(
                      "w-full rounded-full px-4 py-2.5 text-sm",
                      "bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm",
                      "border border-gray-200/50 dark:border-gray-700/50",
                      "text-gray-800 dark:text-gray-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                      "transition-all duration-200 pr-10"
                    )}
                    disabled={isLoading}
                    onKeyPress={e => {
                      if (e.key === "Enter" && !isLoading && input.trim())
                        sendMessage(e as any);
                    }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "rounded-full p-2.5",
                    "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400",
                    "text-white shadow-md",
                    "disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 disabled:from-gray-400 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-800",
                    "transition-all duration-200",
                    "border border-blue-400/30"
                  )}
                  whileHover={{ scale: isLoading || !input.trim() ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading || !input.trim() ? 1 : 0.95 }}
                >
                  <BsSendFill className="size-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
