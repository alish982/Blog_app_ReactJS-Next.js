"use client";

import { useHydrateTheme } from "@/hooks/useHydrateTheme";


export function ThemeInitializer() {
  useHydrateTheme();
  return null;
}
