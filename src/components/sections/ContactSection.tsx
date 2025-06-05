"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="text-3xl mb-2" />,
      href: "https://github.com/Rithish891",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="text-3xl mb-2" />,
      href: "https://www.linkedin.com/in/rithishjakkireddy",
    },
    {
      name: "Topmate",
      icon: <HiOutlineIdentification className="text-3xl mb-2" />,
      href: "https://topmate.io/rithishjakkireddy",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-3xl mb-2" />,
      href: "https://www.instagram.com/rithish_jakkireddy/",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-background text-foreground"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground">
            Feel free to reach out to me for any questions or opportunities.
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {" "}
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-blue-400">
                  <MdEmail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <a
                    href="mailto:rithishjakkireddy@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    rithishjakkireddy@gmail.com
                  </a>
                </div>
              </div>{" "}
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-blue-400">
                  <MdPhone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <a
                    href="tel:+918919862345"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 89198 62345
                  </a>
                </div>
              </div>{" "}
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-blue-400">
                  <MdLocationOn className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Location</h4>
                  <p className="text-muted-foreground">Hyderabad, India</p>
                </div>
              </div>{" "}
              <div className="flex items-start">
                <a
                  href="https://drive.google.com/file/d/1Yf5Pz1kM7CV1aAcaMyndFSSckmpXjAmN/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary-foreground bg-primary font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <FiDownload className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <p className="text-muted-foreground mb-8">
              Follow me on social media to stay updated with my latest projects
              and insights.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-4 rounded-xl flex flex-col items-center hover:bg-primary/30 hover:bg-opacity-20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
