"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

export default function Preloader() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [setIsLoading]);

  const text = "RITHISH JAKKIREDDY";
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  };

  const staticBubbles = React.useMemo(() => {
    return [...Array(20)].map(() => ({
      width: 50,
      height: 50,
      top: "50%",
      left: "50%",
      animScale: 0.5,
      animOpacity: 0.2,
      animX: 0,
      animY: 0,
      animDuration: 4,
    }));
  }, []);

  const [bubbles, setBubbles] = React.useState(staticBubbles);

  useEffect(() => {
    setBubbles(
      [...Array(20)].map(() => ({
        width: Math.random() * 100 + 20,
        height: Math.random() * 100 + 20,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animScale: Math.random() * 1 + 0.5,
        animOpacity: Math.random() * 0.3 + 0.1,
        animX: Math.random() * 100 - 50,
        animY: Math.random() * 100 - 50,
        animDuration: Math.random() * 5 + 3,
      }))
    );
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {bubbles.map((bubble, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: bubble.width,
                  height: bubble.height,
                  top: bubble.top,
                  left: bubble.left,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: bubble.animScale,
                  opacity: bubble.animOpacity,
                  x: bubble.animX,
                  y: bubble.animY,
                }}
                transition={{
                  duration: bubble.animDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-28 h-28 relative mb-6">
              <svg
                className="text-primary absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 50C10 27.9086 27.9086 10 50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{
                    pathLength: { duration: 1.8, ease: "easeInOut" },
                    rotate: { duration: 1.8, ease: "easeInOut" },
                  }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span className="text-xl font-bold text-primary flex items-center justify-center w-full h-full">
                  RJ
                </span>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {text.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-xl font-bold tracking-widest"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="mt-8 w-60 h-1 bg-secondary/30 rounded overflow-hidden relative"
              initial={{ width: 0 }}
              animate={{ width: "15rem" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary rounded"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-primary/70 mt-2 font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
