"use client";

import { useEffect, useState } from "react";

export function useClientSideEffect(
  effect: () => void | (() => void),
  deps: unknown[] = []
) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, ...deps]);
}
