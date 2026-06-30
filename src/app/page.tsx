"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { Loader } from "@/components/ui";

export default function Home() {
  const { isInitializing } = useHydrateAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;
    router.replace(isAuthenticated ? "/dashboard" : "/login");
  }, [isInitializing, isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <Loader size="lg" />
    </div>
  );
}
