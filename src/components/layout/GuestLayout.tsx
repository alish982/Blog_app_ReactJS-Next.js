"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { Loader } from "@/components/ui";

interface GuestLayoutProps {
  children: ReactNode;
}

export function GuestLayout({ children }: GuestLayoutProps) {
  const { isInitializing } = useHydrateAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isInitializing, isAuthenticated, router]);

  if (isInitializing || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <Loader size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
