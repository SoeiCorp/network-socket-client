import * as jose from 'jose';
import { NextResponse } from 'next/server';
import { users, User } from "@/drizzle/schemas/users";
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';

export async function createToken(user: any) {
    const token = await new jose.SignJWT({ id: user.id, name: user.name }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(process.env.JWT_EXPIRE || '').sign(new TextEncoder().encode(process.env.JWT_SECRET))
    const jwtCookieExpire: number = Number(process.env.JWT_COOKIE_EXPIRE)
    const cookieExpires = new Date(Date.now() + jwtCookieExpire * 24 * 60 * 60 * 1000)

    return { token, cookieExpires }
}

export async function decodeToken(token: string) {
    const decoded = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    if (!decoded.payload.id) {
        return { success: false, data: null }
    }
    const user: User[] = await db.select().from(users).where(eq(users.id, Number(decoded.payload.id)))
    if (!user.length) {
        return { success: false, data: null }
    }
    return { success: true, data: user[0].id }
}