import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { User } from "@/drizzle/schemas/users";

export async function createToken(user: any) {
    const token = await jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRE })
    const jwtCookieExpire: number = Number(process.env.JWT_COOKIE_EXPIRE)
    const cookieExpires = new Date(Date.now() + jwtCookieExpire * 24 * 60 * 60 * 1000)

    return { token, cookieExpires }
}