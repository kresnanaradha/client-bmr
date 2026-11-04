import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Length-independent comparison so timing does not leak the credentials. */
function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  let mismatch = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return mismatch === 0;
}

/**
 * HTTP Basic auth for the operator dashboard. Uses the Next 16 `proxy`
 * convention — `middleware.ts` is deprecated in this version.
 */
export function proxy(request: NextRequest) {
  const user = process.env.DASHBOARD_USER;
  const password = process.env.DASHBOARD_PASSWORD;

  // Without credentials configured the dashboard stays closed rather than public.
  if (!user || !password) {
    return new NextResponse(
      "Dashboard is not configured. Set DASHBOARD_USER and DASHBOARD_PASSWORD.",
      { status: 503, headers: { "content-type": "text/plain" } }
    );
  }

  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    const suppliedUser = decoded.slice(0, separator);
    const suppliedPassword = decoded.slice(separator + 1);

    if (safeEqual(suppliedUser, user) && safeEqual(suppliedPassword, password)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Bali Water Activity Dashboard", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
