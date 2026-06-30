"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function useHydrateAuth() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    hydrate();
  }, []);

  return { isInitializing };
}
