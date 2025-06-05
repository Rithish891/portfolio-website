"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { handleNavLinkClick } from "@/lib/utils/scroll-utils";

export default function Footer() {
  return (
    <footer className="py-8 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="#home"
              className="text-2xl font-bold"
              onClick={e => handleNavLinkClick(e)}
            >
              _.RJ
            </Link>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <div className="flex space-x-6 mb-4">
              {["Home", "About", "Projects", "Skills"].map(item => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                  onClick={e => handleNavLinkClick(e)}
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex space-x-6">
              {["Experience", "Education", "Contact"].map(item => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                  onClick={e => handleNavLinkClick(e)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              &copy; 2025 Rithish Jakkireddy. All rights reserved.
            </p>
            <div className="w-1/2 md:w-2/12 overflow-hidden mt-4 md:mt-0">
              <div className="dark:hidden">
                <Image
                  src="/assets/Signature_Dark.png"
                  alt="Signature"
                  width={200}
                  height={80}
                  className="w-full"
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src="/assets/Signature_Light.png"
                  alt="Signature"
                  width={200}
                  height={80}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
