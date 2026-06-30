"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginSchema } from "@/utils/validation/authSchemas";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@/components/ui";

export function LoginForm() {
  const { login, isSubmitting } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (values: LoginSchema) => {
    try {
      await login(values);
    } catch (e) {
      console.log("Error", e)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Sign in
      </Button>
      <p className="text-center text-sm text-ink/60">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-accent hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
