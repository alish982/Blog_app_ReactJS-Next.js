import type { Metadata } from "next";
import { GuestLayout } from "@/components/layout/GuestLayout";
import { AuthCard, LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign in — Blog Post",
};

export default function LoginPage() {
  return (
    <GuestLayout>
      <AuthCard title="Welcome back" subtitle="Sign in to keep writing.">
        <LoginForm />
      </AuthCard>
    </GuestLayout>
  );
}
