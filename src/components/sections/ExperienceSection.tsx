"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface ExperienceProps {
  company: string;
  logo: string;
  period: string;
  title: string;
  description: string;
  skills: string[];
}

const ExperienceCard: React.FC<ExperienceProps> = ({
  company,
  logo,
  period,
  title,
  description,
  skills,
}) => (
  <motion.div
    className="experience-card glass p-6 rounded-xl relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-4 md:mb-0">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mr-4">
            <Image
              src={logo}
              alt={company}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="font-bold">{company}</h3>
            <p className="text-sm text-muted-foreground">{period}</p>
          </div>
        </div>
      </div>
      <div className="md:w-3/4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const experiences: ExperienceProps[] = [
    {
      company: "Capgemini Engineering",
      logo: "/assets/capgemini.png",
      period: "2024 - Present",
      title: "Professional I - Senior Frontend Developer",
      description:
        "Currently leading the frontend team, driving architectural decisions, feature delivery, and mentoring junior developers. Integrated third-party services like Firebase, Keycloak, Power BI, and Zoom to enhance platform capabilities. Ensured high code quality through CI/CD, code reviews, and agile practices while collaborating with cross-functional teams.",
      skills: [
        "React",
        "TypeScript",
        "Redux",
        "Vitest",
        "Firebase",
        "PWA",
        "Leadership",
      ],
    },
    {
      company: "Capgemini Engineering",
      logo: "/assets/capgemini.png",
      period: "2022 - 2024",
      title: "Associate II - Frontend Developer",
      description:
        "Built a scalable micro frontend architecture using React, TypeScript, and Vite, along with a shared Common Microfrontend for reusability. Implemented efficient data fetching with RTK Query and state management using Redux Toolkit. Developed responsive Material-UI components, added internationalization, and managed environment-specific configurations.",
      skills: ["React", "TypeScript", "Microfrontend", "Vite", "Webpack"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-secondary text-secondary-foreground"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        <div className="relative">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
