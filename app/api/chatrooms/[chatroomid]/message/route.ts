import { NextRequest, NextResponse } from 'next/server';
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
        const userId = req.headers.get('userId')

        return NextResponse.json({
            success: false,
            message: 'Token not found'
        }, { status: 404 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}