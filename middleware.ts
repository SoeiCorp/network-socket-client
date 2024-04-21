import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { users, User } from "@/drizzle/schemas/users";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { decodeToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  if (token && token !== "none") {
    const { success, data } = await decodeToken(token);
    if (!success || data === null) {
      // Redirect to login if token is not found or not successful
      if (path.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 400 }
      );
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", data.toString());
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  } else {
    // Redirect to login if token is not found or not successful
    if (path.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.json(
      {
        success: false,
        message: "Token not found",
      },
      { status: 404 }
    );
  }
}

export const config = {
  matcher: [
    "/chat/:path*",
    "/api/auth/update",
    "/api/chatrooms",
    "/api/chatrooms/group",
    "/api/chatrooms/:chatroomid/messages",
    "/api/chatrooms/:chatroomid/join",
  ],
};
