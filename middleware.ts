import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const allCookies = req.cookies.getAll()
    console.log(allCookies)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/chatrooms/:chatroomid/message'
    ]
}