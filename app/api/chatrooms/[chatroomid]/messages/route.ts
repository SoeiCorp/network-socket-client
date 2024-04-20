import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { users, User } from '@/drizzle/schemas/users'
import jwt from 'jsonwebtoken'
import { and, eq } from 'drizzle-orm';
import { chatMessages } from '@/drizzle/schemas/chatMessages';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';

export async function GET(req: NextRequest, { params }: any) {
    try {
        const userId = req.headers.get('userId')
        const validChatroom = await db.select().from(chatroomUsers).where(and(eq(chatroomUsers.userId, Number(userId)), eq(chatroomUsers.chatroomId, params.chatroomid)))
        if (!validChatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Invalid chatroom user',
            }, { status: 400 })
        }
        const chatroom = await db.select().from(chatrooms);
        if (!chatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Chatroom not found',
            }, { status: 404 })
        }
        const result = await db.select().from(chatMessages).where(eq(chatMessages.chatroomId, params.chatroomid));
        return NextResponse.json({
            success: true,
            message: 'Successfully get all chat messages',
            data: result
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}