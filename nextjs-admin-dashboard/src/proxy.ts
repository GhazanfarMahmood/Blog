
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Let authentication pages load.
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Let protected pages load.
  // ProtectedLayout and /auth/me handle authentication.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
