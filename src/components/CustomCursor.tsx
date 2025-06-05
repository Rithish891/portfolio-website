"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useClientSideEffect } from "@/hooks/useClientSideEffect";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  useClientSideEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => setCursorVariant("click");
    const mouseUp = () => setCursorVariant("default");

    const handleMouseEnterLinks = () => setCursorVariant("hover");
    const handleMouseLeaveLinks = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Add event listeners to all clickable elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .hover-scale, .hover-glow, .hover-tilt, .project-card, .experience-card, .education-card"
    );

    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnterLinks);
      el.addEventListener("mouseleave", handleMouseLeaveLinks);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);

      const interactiveElements = document.querySelectorAll(
        "a, button, .hover-scale, .hover-glow, .hover-tilt, .project-card, .experience-card, .education-card"
      );

      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnterLinks);
        el.removeEventListener("mouseleave", handleMouseLeaveLinks);
      });
    };
  }, []);
  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "rgba(14, 165, 233, 0.5)",
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(14, 165, 233, 0.8)",
      // TypeScript doesn't allow string type for mixBlendMode in framer-motion
      // We'll apply this style via className instead
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(14, 165, 233, 0.8)",
    },
  };

  const cursorFollowerVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(14, 165, 233, 0.2)",
      transition: { type: "spring", mass: 0.3 },
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(14, 165, 233, 0.4)",
      transition: { type: "spring", mass: 0.3 },
    },
  };

  // Only show custom cursor on desktop devices
  const [showCursor, setShowCursor] = useState(false);
  useClientSideEffect(() => {
    setShowCursor(window.matchMedia("(min-width: 1024px)").matches);

    const mediaQueryList = window.matchMedia("(min-width: 1024px)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setShowCursor(e.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!showCursor) return null;

  return (
    <>
      {" "}
      <motion.div
        className={`cursor fixed rounded-full pointer-events-none z-[9999] ${
          cursorVariant === "hover" ? "mix-blend-difference" : ""
        }`}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50,
        }}
      />
      <motion.div
        className="cursor-follower fixed rounded-full pointer-events-none z-[9998]"
        variants={cursorFollowerVariants}
        animate={cursorVariant === "click" ? "default" : cursorVariant}
      />
    </>
  );
}
