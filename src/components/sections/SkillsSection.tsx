"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiRedux,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiWebpack,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiPython,
  SiFirebase,
  SiD3Dotjs,
  SiOpenai,
  SiDocker,
  SiGit,
  SiJira,
  SiFigma,
  SiPostman,
  SiPostgresql,
  SiPwa,
  SiMui,
} from "react-icons/si";
import { TbShieldLock } from "react-icons/tb";
import {
  MdSmartToy,
  MdCompareArrows,
  MdOutlineHealthAndSafety,
  MdOutlineAnalytics,
} from "react-icons/md";

interface SkillItemProps {
  icon: React.ReactNode;
  name: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon, name }) => (
  <motion.div
    className="glass p-4 rounded-lg flex items-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-3xl mr-3">{icon}</div>
    <span>{name}</span>
  </motion.div>
);

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const technicalSkills: SkillItemProps[] = [
    { icon: <SiReact className="text-blue-500" />, name: "React" },
    { icon: <SiRedux className="text-purple-600" />, name: "Redux" },
    { icon: <SiTypescript className="text-blue-400" />, name: "TypeScript" },
    { icon: <SiNodedotjs className="text-green-600" />, name: "Node.js" },
    { icon: <SiNextdotjs className="dark:text-white" />, name: "Next.js" },
    { icon: <SiJavascript className="text-yellow-400" />, name: "JavaScript" },
    { icon: <SiVite className="text-purple-500" />, name: "Vite" },
    { icon: <SiWebpack className="text-blue-600" />, name: "Webpack" },
    { icon: <SiExpress className="text-gray-600" />, name: "Express.js" },
    {
      icon: <SiMui className="text-blue-600" />,
      name: "Material UI",
    },
    { icon: <SiTailwindcss className="text-blue-400" />, name: "Tailwind CSS" },
    { icon: <SiHtml5 className="text-red-500" />, name: "HTML" },
    { icon: <SiCss3 className="text-blue-500" />, name: "CSS" },
    { icon: <SiPwa className="text-yellow-400" />, name: "PWA" },
    { icon: <SiPython className="text-green-600" />, name: "Python" },
    { icon: <SiFirebase className="text-orange-500" />, name: "Firebase" },
    { icon: <SiPostgresql className="text-yellow-600" />, name: "SQL" },
    {
      icon: <MdOutlineAnalytics className="text-cyan-600" />,
      name: "Power BI",
    },
    { icon: <SiD3Dotjs className="text-purple-500" />, name: "D3.js" },
    { icon: <SiOpenai className="text-pink-400" />, name: "GenAI" },
    { icon: <MdSmartToy className="text-indigo-500" />, name: "LLMs" },
    {
      icon: <MdOutlineHealthAndSafety className="text-orange-600" />,
      name: "FHIR",
    },
    {
      icon: <MdCompareArrows className="text-green-500" />,
      name: "RESTful APIs",
    },
    { icon: <SiDocker className="text-blue-600" />, name: "Docker" },
    { icon: <TbShieldLock className="text-red-600" />, name: "Keycloak" },
    { icon: <SiGit className="text-orange-600" />, name: "Git" },
    { icon: <SiJira className="text-blue-500" />, name: "JIRA" },
    { icon: <SiFigma className="text-purple-400" />, name: "Figma" },
    { icon: <SiPostman className="text-blue-400" />, name: "Postman" },
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
