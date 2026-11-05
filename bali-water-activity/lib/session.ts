export const SESSION_COOKIE = "bwa_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface DashboardConfig {
  user: string;
  password: string;
  secret: string;
}

export function dashboardConfig(): DashboardConfig | null {
  const user = process.env.DASHBOARD_USER;
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!user || !password || !secret) return null;
  return { user, password, secret };
}

/** Length-independent comparison so timing does not leak the credentials. */
export function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  let mismatch = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return mismatch === 0;
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken(secret: string): Promise<string> {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expiresAt}.${await sign(expiresAt, secret)}`;
}

export async function isValidSessionToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, await sign(expiresAt, secret));
}
