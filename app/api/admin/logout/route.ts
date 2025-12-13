import { NextResponse } from "next/server"

const ADMIN_COOKIE = "admin_session"

export async function POST(request: Request) {
  const origin = new URL(request.url).origin
  const res = NextResponse.redirect(new URL("/admin/login", origin))
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return res
}


