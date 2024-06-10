import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./lib";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  if (!parsed) return NextResponse.redirect(new URL("/login", request.url));
  const expires = new Date(Date.now() + 600 * 1000);
  parsed.expires = expires;
  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires,
  });
  return response;
}

export const config = {
  matcher: "/manager/:path*",
};
