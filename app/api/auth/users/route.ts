import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { chatMessages } from '@/drizzle/schemas/chatMessages';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { users } from '@/drizzle/schemas/users';


export async function GET(req: NextRequest) {
    try {
        const allUsers = await db.select({
            id: users.id,
            name: users.name
        }).from(users)
        return NextResponse.json({
            success: true,
            message: 'Successfully get all users',
            data: allUsers
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}