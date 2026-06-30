"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export function useHydrateTheme() {
  const hydrate = useThemeStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, []);
}
