import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, dashboardConfig, isValidSessionToken } from "@/lib/session";

const LOGIN_PATH = "/dashboard/login";

/** Gates the operator dashboard behind the login page. */
export async function proxy(request: NextRequest) {
  const config = dashboardConfig();

  // Without credentials configured the dashboard stays closed rather than public.
  if (!config) {
    return new NextResponse(
      "Dashboard is not configured. Set DASHBOARD_USER, DASHBOARD_PASSWORD and DASHBOARD_SESSION_SECRET.",
      { status: 503, headers: { "content-type": "text/plain" } }
    );
  }

  const signedIn = await isValidSessionToken(request.cookies.get(SESSION_COOKIE)?.value, config.secret);
  const onLoginPage = request.nextUrl.pathname === LOGIN_PATH;

  if (onLoginPage) {
    return signedIn ? NextResponse.redirect(new URL("/dashboard", request.url)) : NextResponse.next();
  }

  return signedIn ? NextResponse.next() : NextResponse.redirect(new URL(LOGIN_PATH, request.url));
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
