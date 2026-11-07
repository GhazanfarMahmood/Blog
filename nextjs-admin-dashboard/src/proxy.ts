
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
];

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const secretKey = new TextEncoder().encode(secret);

    await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // No token: allow public pages, redirect protected pages.
  if (!token) {
    if (isPublicRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // Verify JWT signature and expiration.
  const isValidToken = await verifyToken(token);

  // Invalid or expired token.
  if (!isValidToken) {
    const response = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    response.cookies.delete("token");

    return response;
  }

  // Authenticated users should not revisit authentication pages.
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
