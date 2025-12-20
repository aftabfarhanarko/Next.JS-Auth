import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/public", "/admin"];

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const reqPath = req.nextUrl.pathname;

  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  // 🔍 Server-side log (VS Code terminal)
  console.log("Middleware check:", {
    isAuthenticated,
    reqPath,
    isPrivate,
    token,
  });

  // 🔒 Private route protection
  if (isPrivate && !isAuthenticated) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath)
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/private/:path*", "/public/:path*", "/admin/:path*"],

};
