import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/public", "/admin"];
const adminRoute = ["/dashboard"]; 

export async function proxy (req) { 
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  const isAuthenticated = !!token;
  const reqPath = req.nextUrl.pathname;
  
  // Token না থাকলে role check করা যাবে না, তাই optional chaining (?.) use করলাম
  const isUser = token?.role === "user";
  const isAdmin = token?.role === "admin";
  
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
  const adminCheck = adminRoute.some((route) => reqPath.startsWith(route)); 
  
  // 🔍 Server-side log (VS Code terminal)
  console.log("Middleware check:", {
    isAuthenticated,
    reqPath,
    isPrivate,
    adminCheck,
    role: token?.role,
    isUser,
    isAdmin
  });

  // Logic 1: 🔒 Private route protection (login না থাকলে signin page এ নিয়ে যাও)
  if (isPrivate && !isAuthenticated) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }
  
  // Logic 2: 🛡️ Admin route protection (login আছে কিন্তু admin না হলে forbidden page এ নিয়ে যাও)
  if (isAuthenticated && !isAdmin && adminCheck) {
     // rewrite korla path nname changes hobe na // are redirect korla path name forbidden hoya jabe
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }

  // ✅ সব ঠিক থাকলে proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/private/:path*", 
    "/public/:path*", 
    "/admin/:path*",
    "/dashboard/:path*" // admin route টাও matcher এ add করতে হবে
  ],
};


