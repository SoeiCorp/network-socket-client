import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { chatMessages } from '@/drizzle/schemas/chatMessages';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { User, users } from '@/drizzle/schemas/users';

export async function GET(req: NextRequest, { params }: any) {
    try {
        const userId = Number(req.headers.get('userId'))
        const validChatroom = await db.select().from(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid)))
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
        const result = await db.select({
            users: users,
            chat_messages: chatMessages
        }).from(chatMessages).leftJoin(users, eq(chatMessages.userId, users.id)).where(eq(chatMessages.chatroomId, params.chatroomid));
        const modifiedResult = result.map(item => {
            const { chat_messages, users } = item;
            return {
                ...chat_messages,
                userName: users?.name
            };
        });
        return NextResponse.json({
            success: true,
            message: 'Successfully get all chat messages',
            data: modifiedResult
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}