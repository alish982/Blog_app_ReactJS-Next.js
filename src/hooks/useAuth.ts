"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { loginRequest, registerRequest } from "@/services/authService";
import type { LoginPayload, RegisterPayload } from "@/types";

export function useAuth() {
  const { user, token, isAuthenticated, setSession, clearSession } =
    useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const login = useCallback(
    async (payload: LoginPayload) => {
      setIsSubmitting(true);
      try {
        const { user: loggedInUser, token: nextToken } =
          await loginRequest(payload);
        setSession(loggedInUser, nextToken);
        toast.success(`Welcome back, ${loggedInUser.name}`);
        router.push("/dashboard");
      } catch {
        toast.error("Incorrect Email or Password.");
        throw new Error("login_failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, setSession],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsSubmitting(true);
      try {
        await registerRequest(payload);
        toast.success("Account created. Sign in to continue.");
        router.push("/login");
      } catch {
        toast.error("Couldn't create your account. Please try again.");
        throw new Error("register_failed");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    clearSession();
    toast.success("Signed out");
    router.push("/login");
  }, [clearSession, router]);

  return {
    user,
    token,
    isAuthenticated,
    isSubmitting,
    login,
    register,
    logout,
  };
}
