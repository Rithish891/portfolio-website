"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { handleNavLinkClick } from "@/lib/utils/scroll-utils";

export function MainNavigation() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 py-4 border-b">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="#home"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-ring hover:scale-105 transition-transform"
          onClick={e => handleNavLinkClick(e)}
        >
          _.RJ
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="space-x-6">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#experience", label: "Experience" },
                { href: "#education", label: "Education" },
                { href: "#contact", label: "Contact" },
              ].map(item => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="text-foreground/80 hover:text-primary transition-colors"
                      onClick={e => handleNavLinkClick(e)}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          {/* Theme Toggle - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-accent/50"
            onClick={toggleTheme}
          >
            <FiSun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FiMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg animate-in slide-in-from-top">
          <div className="container mx-auto p-4 flex flex-col space-y-4">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#skills", label: "Skills" },
              { href: "#experience", label: "Experience" },
              { href: "#education", label: "Education" },
              { href: "#contact", label: "Contact" },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={e => {
                  handleNavLinkClick(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
