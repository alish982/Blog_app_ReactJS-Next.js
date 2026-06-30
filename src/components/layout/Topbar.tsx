"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper font-serif text-sm">
            B
          </span>
          <span className="font-serif text-lg text-ink">Blog POst</span>
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-ink">{user.name}</span>
              <span className="text-xs text-ink/50">{user.email}</span>
            </div>
          )}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent"
            aria-hidden="true"
          >
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <ThemeToggle />
          <Button variant="secondary" size="sm" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
