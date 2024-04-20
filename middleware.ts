import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db';
import { users, User } from '@/drizzle/schemas/users'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm';
import { decodeToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    if (token && token !== 'none') {
        const { success, data } = await decodeToken(token);
        console.log(data)
        if (!success || data === null) {
            return NextResponse.json({
                success: false,
                message: 'Invalid token'
            }, { status: 400 })
        }
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('userId', data.toString())
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
        return response;
    }
    return NextResponse.json({
        success: false,
        message: 'Token not found'
    }, { status: 404 })
}

export const config = {
    matcher: [
        '/api/auth/update',
        // 'api/auth/me',
        '/api/chatrooms/group',
        '/api/chatrooms/:chatroomid/messages'
    ]
}