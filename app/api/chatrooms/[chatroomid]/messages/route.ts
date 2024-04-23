import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { chatMessages } from '@/drizzle/schemas/chatMessages';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { User, users } from '@/drizzle/schemas/users';
import { pg } from '@/lib/db';

export async function GET(req: NextRequest, { params }: any) {
    try {
        let resultQuery;
        const userId = Number(req.headers.get('userId'))
        // const validChatroom = await db.select().from(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid)))
        resultQuery = await pg.query(`SELECT * FROM chatroom_users WHERE user_id='${userId}' AND chatroom_id='${params.chatroomid}'`)
        const validChatroom = resultQuery.rows
        if (!validChatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Invalid chatroom user',
            }, { status: 400 })
        }
        // const chatroom = await db.select().from(chatrooms).where(eq(chatrooms.id, params.chatroomid));
        resultQuery = await pg.query(`SELECT * FROM chatrooms WHERE id = '${params.chatroomid}'`)
        const chatroom = resultQuery.rows
        if (!chatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Chatroom not found',
            }, { status: 404 })
        }
        // const result = await db.select().from(chatMessages).leftJoin(users, eq(chatMessages.userId, users.id)).where(eq(chatMessages.chatroomId, params.chatroomid));
        // const modifiedResult = result.map(item => {
        //     const { chat_messages, users } = item;
        //     return {
        //         ...chat_messages,
        //         userName: users?.name
        //     };
        // });
        resultQuery = await pg.query(`SELECT chat_messages.*, users.name FROM chat_messages LEFT JOIN users ON chat_messages.user_id = users.id WHERE chat_messages.chatroom_id = '${params.chatroomid}'`)
        const result = resultQuery.rows;
        const modifiedResult = result.map(item => {
            return {
                id: item.id,
                chatroomId: item.chatroom_id,
                userId: item.user_id,
                content: item.message,
                type: item.message_type,
                createdAt: item.created_at,
                userName: item.name
            }
        })
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