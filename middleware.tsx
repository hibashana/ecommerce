import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const islogin = request.cookies.get("islogin");
  if (!islogin) {
    if (
      request.nextUrl.pathname.startsWith("/home") ||
      request.nextUrl.pathname.startsWith("/addtoCart") ||
      request.nextUrl.pathname.startsWith("/wishlist") ||
      request.nextUrl.pathname.startsWith("/myorders") ||
      request.nextUrl.pathname.startsWith("/profiler")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

