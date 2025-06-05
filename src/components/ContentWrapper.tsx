"use client";

import { useLoading } from "@/contexts/LoadingContext";
import React from "react";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLoading();

  if (isLoading) return null;

  return <>{children}</>;
}
