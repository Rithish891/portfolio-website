"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { VscCode } from "react-icons/vsc";

// Social Icon component for rendering different social media icons with React Icons
function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "github":
      return <FaGithub className="text-lg" />;
    case "linkedin":
      return <FaLinkedinIn className="text-lg" />;
    case "topmate":
      return <HiOutlineIdentification className="text-lg" />;
    case "instagram":
      return <FaInstagram className="text-lg" />;
    default:
      return null;
  }
}

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{
      top: string;
      left: string;
      opacity: number;
      animation: string;
    }>
  >([]);
  const [ringParticles, setRingParticles] = useState<
    Array<{
      top: string;
      left: string;
      opacity: number;
      animation: string;
    }>
  >([]);
  const heroRef = useRef<HTMLElement>(null);
  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: "github", url: "https://github.com/Rithish891" },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/rithishjakkireddy",
    },
    {
      name: "Topmate",
      icon: "topmate",
      url: "https://topmate.io/rithishjakkireddy",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/rithish_jakkireddy",
    },
  ];

  const textArray = [
    "Rithish Jakkireddy",
    "React enthusiast",
    "Someone who turns ideas into websites",
  ];

  const currentText = useRef("");
  const currentIndex = useRef(0);

  // Generate particles on client-side only
  useEffect(() => {
    const primaryParticles = [...Array(10)].map((_, i) => ({
      top: `${10 + i * 8}%`,
      left: `${5 + i * 9}%`,
      opacity: 0.5 + Math.random() * 0.5,
      animation: `pulse ${3 + Math.random() * 2}s infinite alternate ${
        Math.random() * 2
      }s`,
    }));

    const secondaryParticles = [...Array(10)].map((_, i) => ({
      top: `${15 + i * 7}%`,
      left: `${60 + i * 3}%`,
      opacity: 0.3 + Math.random() * 0.7,
      animation: `pulse ${2 + Math.random() * 3}s infinite alternate ${
        Math.random() * 2
      }s`,
    }));

    setParticles(primaryParticles);
    setRingParticles(secondaryParticles);
  }, []);
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text typing effect
  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % textArray.length;

      if (isDeleting) {
        currentText.current = textArray[i].substring(
          0,
          currentText.current.length - 1
        );
      } else {
        currentText.current = textArray[i].substring(
          0,
          currentText.current.length + 1
        );
      }

      setDisplayText(currentText.current);

      if (!isDeleting && currentText.current === textArray[i]) {
        setIsDeleting(true);
        setTypingSpeed(100);
        setTimeout(() => {
          setTypingSpeed(25);
        }, 500);
      } else if (isDeleting && currentText.current === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [loopNum, isDeleting, typingSpeed, textArray]);
  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Interactive background with floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated particles/dots grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="relative w-full h-full">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                style={{
                  top: particle.top,
                  left: particle.left,
                  opacity: particle.opacity,
                  animation: particle.animation,
                }}
              />
            ))}
            {ringParticles.map((particle, i) => (
              <div
                key={i + 10}
                className="absolute w-1 h-1 rounded-full bg-ring"
                style={{
                  top: particle.top,
                  left: particle.left,
                  opacity: particle.opacity,
                  animation: particle.animation,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main glowing orbs with parallax effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent blur-3xl"
          style={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-tr from-accent/30 via-accent/20 to-transparent blur-3xl"
          style={{
            x: mousePosition.x * 40,
            y: mousePosition.y * 40,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-tl from-ring/30 via-ring/20 to-transparent blur-3xl"
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15]"></div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-evenly">
          {/* Text section */}
          <motion.div
            className="lg:w-1/2 mb-16 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting badge */}
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium opacity-80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-2">👋</span>
              <span>Hello, welcome to my portfolio</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <motion.span
                className="text-4xl md:text-5xl font-semibold block mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I'm
              </motion.span>
              <motion.div
                className="overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="gradient-text inline-block">
                  {displayText}
                  <span className="ml-1 inline-block w-1 h-8 bg-primary animate-blink-caret"></span>
                </span>
              </motion.div>
            </h1>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Frontend Developer
            </motion.h2>

            <motion.p
              className="text-lg mb-8 max-w-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Frontend developer with experience in React and TypeScript,
              focused on creating intuitive, user-centric web applications. I
              deliver clean, maintainable code and continuously enhance the user
              experience, aiming to add simplicity and value to every
              interaction.
            </motion.p>

            {/* Action buttons with animated hover states */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link
                href="#projects"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:shadow-md hover:shadow-primary/20 hover:translate-y-[-2px]"
              >
                <span>View My Work</span>
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium transition-all hover:bg-primary/10 hover:shadow-md hover:translate-y-[-2px]"
              >
                <span>Contact Me</span>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="text-sm text-muted-foreground">Find me on</span>
              <div className="flex gap-3">
                {" "}
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <span className="sr-only">{link.name}</span>
                    <SocialIcon type={link.icon} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Profile image section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-[25rem] md:h-[25rem] mx-auto">
              {/* Enhanced background decorative elements */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent -z-10 blur-md"></div>
              <div className="absolute inset-0 rotate-45 rounded-full bg-gradient-to-tr from-transparent via-ring/20 to-ring/30 -z-10 blur-md"></div>
              {/* Enhanced photo container with depth */}
              <div className="p-3 backdrop-blur-md rounded-full">
                <div className="rounded-full bg-gradient-to-br from-primary/90 via-accent to-ring p-[3px] shadow-lg shadow-primary/20 overflow-hidden">
                  <div className="rounded-full p-1 bg-background/80 backdrop-filter backdrop-blur-sm overflow-hidden">
                    <Image
                      src="/assets/Rithish.jpg"
                      alt="Rithish Jakkireddy"
                      width={400}
                      height={400}
                      priority
                      className="w-full h-full object-cover rounded-full shadow-inner hover:scale-105 transition-all duration-500 ease-out"
                    />
                  </div>
                </div>
              </div>
              {/* Redesigned experience badge */}
              <div className="absolute -bottom-4 -right-4 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                <div className="relative flex items-center justify-center bg-gradient-to-r from-primary via-accent to-ring p-[2px] rounded-2xl shadow-xl">
                  <div className="bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-lg text-primary">⭐</span>
                    </div>
                    <span className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-ring">
                      3+ Years Experience
                    </span>
                  </div>
                </div>
              </div>
              {/* Developer icon with updated style */}{" "}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full"></div>
                <VscCode className="h-8 w-8 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with motion */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link
          href="#about"
          className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="mb-2 text-sm font-medium">Scroll to explore</span>
          <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center hover:border-primary transition-colors">
            <motion.div
              className="absolute top-1 w-1 h-1 rounded-full bg-muted-foreground hover:bg-primary transition-colors"
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
