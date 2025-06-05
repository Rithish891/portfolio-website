import { MainNavigation } from "@/components/MainNavigation";
import CustomCursor from "@/components/CustomCursor";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import MobileUtilityBar from "@/components/MobileUtilityBar";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Script from "next/script";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Preloader />
      <CustomCursor />
      <ChatBot />
      <ResumeDownloadButton />
      <MainNavigation />
      <MobileUtilityBar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />

      <Script
        src="https://kit.fontawesome.com/3fe7e52fc2.js"
        crossOrigin="anonymous"
      />
    </main>
  );
}
