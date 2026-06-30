import { axiosInstance } from "./axiosInstance";
import type { LoginPayload, RegisterPayload, User } from "@/types";

function createFakeToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Date.now(),
    }),
  );
  return `${header}.${payload}.mock-signature`;
}

export async function loginRequest(
  payload: LoginPayload,
): Promise<{ user: User; token: string }> {
  const { data: users } = await axiosInstance.get<User[]>("/users");

  const user = users.find(
    (u) => u.email.toLowerCase() === payload.email.toLowerCase(),
  );

  if (!user) {
    throw new Error("Email not found");
  }

  if (user.password !== payload.password) {
    throw new Error("Incorrect password");
  }

  return {
    user,
    token: createFakeToken(user),
  };
}

export async function registerRequest(
  payload: RegisterPayload,
): Promise<{ user: User; token: string }> {
  const { data } = await axiosInstance.post<User>("/users", {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });

  const user: User = {
    id: data.id ?? Date.now(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };

  return { user, token: createFakeToken(user) };
}
