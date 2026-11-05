"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  dashboardConfig,
  safeEqual,
} from "@/lib/session";

export interface LoginState {
  error: string | null;
  username: string;
}

// Slows down password guessing; serverless instances don't share memory, so a
// per-IP counter would not hold across requests.
const FAILED_LOGIN_DELAY_MS = 800;

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const config = dashboardConfig();
  const user = String(formData.get("username") ?? "");
  if (!config) return { error: "The dashboard is not configured yet.", username: user };

  const password = String(formData.get("password") ?? "");

  const userMatches = safeEqual(user, config.user);
  const passwordMatches = safeEqual(password, config.password);

  if (!userMatches || !passwordMatches) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    return { error: "Wrong username or password.", username: user };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await createSessionToken(config.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/dashboard" });
  redirect("/dashboard/login");
}
