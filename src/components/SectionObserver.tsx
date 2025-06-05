"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useClientSideEffect } from "@/hooks/useClientSideEffect";

interface SectionObserverProps {
  children: React.ReactNode;
  id?: string;
  animationDelay?: number;
  threshold?: number;
  margin?: string;
}

export default function SectionObserver({
  children,
  id,
  animationDelay = 0,
  threshold = 0.1,
  margin = "-100px",
}: SectionObserverProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  // Apply animation classes with delay to prevent layout shifts
  useClientSideEffect(() => {
    if (isInView && ref.current) {
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.classList.add("section-visible");
          ref.current.classList.remove("section-hidden");
        }
      }, animationDelay);

      return () => clearTimeout(timer);
    }
  }, [isInView, animationDelay]);

  return (
    <section
      id={id}
      ref={ref}
      className="will-change-opacity section-hidden"
      data-section-id={id}
    >
      {children}
    </section>
  );
}
