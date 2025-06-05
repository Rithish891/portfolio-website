"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  fallback?: string;
  showLoadingEffect?: boolean;
}

/**
 * OptimizedImage - A wrapper around Next.js Image component with additional features:
 * - Loading states
 * - Fallback image
 * - Loading animation
 */
export function OptimizedImage({
  src,
  alt,
  fallback = "/assets/placeholder.svg",
  showLoadingEffect = true,
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const imageSrc = error ? fallback : src;

  return (
    <div className="relative overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoadingComplete}
        onError={handleError}
        className={`
          ${className}
          ${isLoading && showLoadingEffect ? "opacity-0" : "opacity-100"}
          transition-opacity duration-500
        `}
        {...props}
      />

      {isLoading && showLoadingEffect && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      )}
    </div>
  );
}
