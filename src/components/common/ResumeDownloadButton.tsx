"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResumeDownloadButton() {
  return (
    <Link
      href="https://drive.google.com/file/d/1Yf5Pz1kM7CV1aAcaMyndFSSckmpXjAmN/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      title="Rithish's Resume"
    >
      {" "}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              ></path>
            </defs>
            <text fontSize="10.5" fill="yellow">
              <textPath href="#circlePath" startOffset="0%">
                Click to download CV • Click to download CV •
              </textPath>
            </text>
          </svg>
        </div>
        <Image
          src="/assets/Avatar.png"
          alt="Rithish"
          width={72}
          height={72}
          className="w-16 h-16 object-cover rounded-full z-10 border-3 border-background shadow-lg"
        />
      </div>
    </Link>
  );
}
