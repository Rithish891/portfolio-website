"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="education"
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Education
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
          <motion.div
            className="education-card glass p-6 rounded-lg shadow hover-glow hover-tilt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Bachelor&apos;s in Electronics and Communication Engineering
                </h3>
                <h4 className="text-lg font-medium">Shiv Nadar University</h4>
              </div>
            </div>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>SNU Student Committee - Maintenance and Health</li>
              <li>
                BREEZE 2019 - SNU Annual fest Working Committee - Hospitality
                team
              </li>
            </ul>
            <div className="flex justify-between items-center">
              {" "}
              <span className="text-sm text-primary font-medium">
                2018 - 2022
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
