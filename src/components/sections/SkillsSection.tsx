"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillItemProps {
  icon: string;
  name: string;
  isIconClass?: boolean;
}

const SkillItem: React.FC<SkillItemProps> = ({
  icon,
  name,
  isIconClass = true,
}) => (
  <motion.div
    className="glass p-4 rounded-lg flex items-center"
    whileHover={{ scale: 1.05 }}
  >
    {isIconClass ? (
      <i className={`${icon} text-3xl mr-3`}></i>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={icon}
        />
      </svg>
    )}
    <span>{name}</span>
  </motion.div>
);

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const technicalSkills: SkillItemProps[] = [
    { icon: "fab fa-react text-blue-500", name: "React" },
    { icon: "fas fa-code-branch text-purple-600", name: "Redux" },
    { icon: "fab fa-react text-cyan-500", name: "React Native" },
    { icon: "fas fa-code text-blue-400", name: "TypeScript" },
    { icon: "fab fa-js-square text-yellow-400", name: "JavaScript" },
    { icon: "fas fa-bolt text-purple-500", name: "Vite" },
    { icon: "fas fa-cube text-blue-600", name: "Webpack" },
    { icon: "fab fa-node-js text-green-600", name: "Node.js" },
    { icon: "fas fa-server text-gray-600", name: "Express.js" },
    { icon: "fab fa-n text-black dark:text-white", name: "Next.js" },
    { icon: "fas fa-mobile-alt text-blue-500", name: "PWA" },
    { icon: "fas fa-palette text-pink-500", name: "Material UI" },
    { icon: "fab fa-css3 text-blue-400", name: "Tailwind CSS" },
    { icon: "fab fa-html5 text-red-500", name: "HTML" },
    { icon: "fab fa-css3-alt text-blue-500", name: "CSS" },
    { icon: "fab fa-python text-green-600", name: "Python" },
    { icon: "fas fa-fire text-orange-500", name: "Firebase" },
    { icon: "fas fa-database text-yellow-600", name: "SQL" },
    { icon: "fas fa-chart-bar text-cyan-600", name: "Power BI" },
    { icon: "fas fa-chart-line text-purple-500", name: "D3.js" },
    { icon: "fas fa-brain text-pink-400", name: "GenAI" },
    { icon: "fas fa-robot text-indigo-500", name: "LLMs" },
    { icon: "fas fa-project-diagram text-orange-600", name: "FHIR" },
    { icon: "fas fa-exchange-alt text-green-500", name: "RESTful APIs" },
    { icon: "fab fa-docker text-blue-600", name: "Docker" },
    { icon: "fas fa-shield-alt text-red-600", name: "Keycloak" },
    { icon: "fab fa-git-alt text-orange-600", name: "Git" },
    { icon: "fab fa-jira text-blue-500", name: "JIRA" },
    { icon: "fab fa-figma text-purple-400", name: "Figma" },
    { icon: "fas fa-paper-plane text-blue-400", name: "Postman" },
  ];

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Tools & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <SkillItem {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
