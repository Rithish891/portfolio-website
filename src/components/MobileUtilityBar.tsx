"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { handleNavLinkClick } from "@/lib/scroll-utils";

const navigationItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "projects", label: "Projects", icon: "code" },
  { id: "skills", label: "Skills", icon: "tools" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "education", label: "Education", icon: "graduation-cap" },
  { id: "contact", label: "Contact", icon: "envelope" },
];

export default function MobileUtilityBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sections = navigationItems.map(item =>
        document.getElementById(item.id)
      );
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          if (section.offsetTop <= scrollPos) {
            setActiveSection(navigationItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Utility Menu */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 md:hidden">
        {" "}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/80 transition-colors"
          aria-label="Navigation Menu"
        >
          <i className={`fas fa-${showMenu ? "times" : "compass"} text-xl`}></i>
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed bottom-20 left-0 right-0 flex justify-center z-40 md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-card text-card-foreground rounded-xl shadow-2xl p-3 flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
              {navigationItems.map(item => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => {
                    handleNavLinkClick(e);
                    setShowMenu(false);
                  }}
                  className={`p-2 rounded-lg flex flex-col items-center justify-center w-20 h-20 transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-accent text-accent-foreground"
                  }`}
                >
                  <i className={`fas fa-${item.icon} text-xl mb-1`}></i>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
