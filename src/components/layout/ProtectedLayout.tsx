"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { Topbar } from "./Topbar";
import { Loader } from "@/components/ui";

interface ProtectedLayoutProps {
  children: ReactNode;
}


export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isInitializing } = useHydrateAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isInitializing, isAuthenticated, router]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader size="lg" label="Loading your workspace…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-paper">
      <Topbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
