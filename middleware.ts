import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Global auth guard: everything requires auth except login/signup and internals
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that should always be accessible
  const publicPaths = ["/login", "/signup", "/403"];
  const isPublicPath = publicPaths.includes(pathname);

  // Read session cookie via Better Auth
  const sessionCookie = getSessionCookie(request);

  // If authenticated, keep users away from login/signup
  if (sessionCookie && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated, block everything except public paths
  if (!sessionCookie && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except next internals, images, favicon and API routes
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
