import { MainNavigation } from "@/components/layout/MainNavigation";
import CustomCursor from "@/components/CustomCursor";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import MobileUtilityBar from "@/components/layout/MobileUtilityBar";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/features/ChatBot";
import ContentWrapper from "@/components/ContentWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Preloader />
      <ContentWrapper>
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
      </ContentWrapper>
    </main>
  );
}
