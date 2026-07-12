import { NextRequest, NextResponse } from "next/server";
//NextResponse,NextRequest is object
export function proxy(request: NextRequest) {
  const token = request.cookies.get("refresh-token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");

  const isProtectedRoute =
    pathname.startsWith("/dashbord") ||
    pathname.startsWith("/doctors") ||
    pathname.startsWith("/appointments") ||
    pathname.startsWith("/deperatments");

  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("reason", "auth-required");

    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next(); //Diifferent state to go
}
//Looked Route
export const config = {
  matcher: ["/dashbord", "/doctors", "/appointments", "/deperatments", "/auth"],
};
