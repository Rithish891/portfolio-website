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
