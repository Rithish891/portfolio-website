"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MdCode, MdDevices, MdBolt, MdFavorite } from "react-icons/md";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-background text-foreground relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex flex-col md:flex-row items-center"
        >
          <motion.div
            className="md:w-1/3 mb-10 md:mb-0 flex justify-center"
            variants={fadeIn}
          >
            <div className="relative w-64 h-64">
              <Image
                src="/assets/Rithish_Ghibli.jpg"
                alt="Rithish Jakkireddy"
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-lg shadow-xl hover-tilt"
              />
              <div className="absolute -bottom-4 -right-4 glass p-4 rounded-lg shadow-lg w-3/4">
                <h4 className="font-bold text-primary">Rithish Jakkireddy</h4>
                <p className="text-sm text-foreground/80">Frontend Developer</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="md:w-2/3 md:pl-12" variants={fadeIn}>
            <p className="mb-6 opacity-90">
              I&rsquo;m a frontend developer with over 3 years of experience 👨‍💻
              crafting modern, responsive web applications. I specialize in
              React ⚛️, TypeScript, and the latest JavaScript
              frameworks—building interfaces that are not just functional, but
              fast ⚡, accessible ♿, and delightful to use ✨.
            </p>
            <p className="mb-6 opacity-90">
              My passion for web development started back in college 🎓, and it
              has been a creative obsession ever since. I love transforming
              complex challenges into clean, user-friendly solutions that feel
              effortless 🧩.
            </p>
            <p className="mb-8 opacity-90">
              Outside of coding, I am either deep into a game 🎮, binge-watching
              a good series 🎬, or learning something new, whether it&rsquo;s
              exploring the latest tech trends 📚 or picking up new skills
              through online courses 🧑‍💻—always exploring, always evolving 🌱.
            </p>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                {
                  icon: <MdCode className="text-primary" />,
                  label: "Clean Code",
                },
                {
                  icon: <MdDevices className="text-primary" />,
                  label: "Responsive",
                },
                { icon: <MdBolt className="text-primary" />, label: "Fast" },
                {
                  icon: <MdFavorite className="text-primary" />,
                  label: "Intuitive",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass p-4 flex flex-col rounded-lg text-center hover-glow items-center"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4 },
                    },
                  }}
                >
                  <div className="text-primary text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-bold">{item.label}</h4>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
