import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper font-serif text-lg">
            B
          </span>
          <h1 className="mt-4 font-serif text-2xl text-ink">{title}</h1>
          <p className="mt-1 text-sm text-ink/60">{subtitle}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
