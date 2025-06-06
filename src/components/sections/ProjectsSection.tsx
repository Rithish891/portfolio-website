"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";

interface ProjectProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  longDescription: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  imageSrc,
  tags,
  demoLink,
  codeLink,
  longDescription,
}) => {
  return (
    <motion.div
      className="project-card group rounded-xl overflow-hidden shadow-lg relative hover-glow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-card-inner">
        <div className="relative h-60 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={240}
            quality={85}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="project-overlay absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col justify-center items-center opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
              {title}
            </h3>
            <p className="text-primary-foreground/90 text-center px-4 mb-4">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-card text-card-foreground">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{longDescription}</p>
          <div className="flex justify-between items-center">
            {demoLink && (
              <Link
                href={demoLink}
                target="_blank"
                className="text-primary hover:text-primary/80 transition-transform hover:translate-x-1"
              >
                <FaExternalLinkAlt className="h-4 w-4 inline mr-2" />
                {demoLink.includes("youtube") ? "Demo" : "Visit site"}
              </Link>
            )}
            {codeLink && (
              <Link
                href={codeLink}
                target="_blank"
                className="text-primary hover:text-primary/80 transition-transform hover:translate-x-1"
              >
                <FaCode className="h-4 w-4 inline mr-2" />
                Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const projects: ProjectProps[] = [
    {
      title: "IMPS Framework",
      description:
        "A scalable micro-frontend framework for enterprise healthcare solutions, built with React and Vite, integrating authentication, analytics, and communication via Firebase, Keycloak, Power BI, and Zoom.",
      imageSrc: "/assets/Imps.png",
      tags: ["React", "TypeScript", "Redux", "Vite", "Microfrontend"],
      demoLink: "https://www.youtube.com/watch?v=V0tR-Lx-mYY",
      longDescription:
        "Built a scalable micro-frontend architecture with React, TypeScript, and Vite, integrating shared modules, state management (RTK Query, Redux), and third-party services like Firebase, Keycloak, Power BI, and Zoom. Delivered responsive, localized UIs with MUI and ensured high code quality through CI and agile collaboration.",
    },
    {
      title: "Interactive Kanban Board Application",
      description:
        "Kanban board to help teams track tasks, prioritize work, and manage workflows efficiently across devices while preserving user preferences.",
      imageSrc: "/assets/Kanban.png",
      tags: ["React", "TypeScript", "Redux Toolkit", "Pure CSS", "REST API"],
      demoLink: "https://rithish-kanban-board.netlify.app/",
      codeLink: "https://github.com/Rithish891/kanban-board",
      longDescription:
        "Developed an interactive Kanban board using React JS and pure CSS, integrating with a REST API to display and manage tickets. Implemented dynamic grouping by status, user, or priority, with sorting options by priority and title. Ensured simple, responsive design user-friendly UI, preserving user preferences across page reloads.",
    },
    {
      title: "Course Management Dashboard",
      description:
        "A responsive course management dashboard in React for real-time access—enabling students to view courses and faculties to update content via seamless backend integration using Axios.",
      imageSrc: "/assets/CourseDashboard.png",
      tags: ["React", "TypeScript", "Material-UI", "Axios"],
      longDescription:
        "Developed a dynamic and responsive course management dashboard using React, designed to provide an intuitive user interface for students to view course details and for faculty members to update course content seamlessly. The application efficiently handles HTTP requests using Axios to interact with the backend, enabling real-time fetching and updating of course information.",
    },
  ];
  return (
    <section
      id="projects"
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
            Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
