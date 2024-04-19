import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/drizzle/db';
import { users, User } from '@/drizzle/schemas/users'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm';

interface JwtPayload {
    id: number,
    name: string
}

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload
            const user: User[] = await db.select().from(users).where(eq(users.id, decoded.id))
            return NextResponse.json({
                success: true,
                data: user[0],
                message: 'Successfully returned'
            }, { status: 200 })
        }
        return NextResponse.json({
            success: false,
            message: 'Token not found'
        }, { status: 404 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Error'
        }, { status: 400 })
    }
}