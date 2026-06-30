import type { Metadata } from "next";
import { GuestLayout } from "@/components/layout/GuestLayout";
import { AuthCard, RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Create account — Blog Post",
};

export default function RegisterPage() {
  return (
    <GuestLayout>
      <AuthCard title="Create your account" subtitle="Start publishing blogs.">
        <RegisterForm />
      </AuthCard>
    </GuestLayout>
  );
}
