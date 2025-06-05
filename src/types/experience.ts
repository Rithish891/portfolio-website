/**
 * Experience interfaces
 */

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  logo?: string;
}
