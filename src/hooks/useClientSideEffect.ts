"use client";

import { useEffect, useState } from "react";

/**
 * A hook that safely executes effects only on the client-side
 * to prevent hydration errors in Next.js
 */
export function useClientSideEffect(
  effect: () => void | (() => void),
  deps: any[] = []
) {
  const [isMounted, setIsMounted] = useState(false);

  // First effect - only runs once to set isMounted to true
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Second effect - runs the actual effect function only after mounting
  useEffect(() => {
    if (isMounted) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, ...deps]);
}

/**
 * A hook that returns whether the component is mounted on the client-side
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
