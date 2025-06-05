"use client";

export const scrollToSection = (
  sectionId: string,
  offset: number = 80
): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};

export const setupSectionObserver = (): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          entry.target.classList.remove("section-hidden");
        }
      });
    },
    { threshold: 0.1 }
  );

  // This function needs to be called after the DOM is loaded
  const observeSections = () => {
    document.querySelectorAll("section").forEach(section => {
      observer.observe(section);
    });
  };

  if (document.readyState === "complete") {
    observeSections();
    return () => {};
  } else {
    window.addEventListener("load", observeSections);
    return () => window.removeEventListener("load", observeSections);
  }
};

export const handleNavLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  closeMobileMenu?: () => void
): void => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  }
};
