import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { Chatroom, chatrooms } from '@/drizzle/schemas/chatrooms';
import { ChatroomUser, chatroomUsers } from '@/drizzle/schemas/chatroomUsers';

export async function POST(req: NextRequest, { params }: any) {
    try {
        const userId = Number(req.headers.get('userId'))
        const chatroom: Chatroom[] = await db.select().from(chatrooms).where(and(eq(chatrooms.id, params.chatroomid)))
        if (chatroom[0].type === 'private') {
            return NextResponse.json({
                success: false,
                message: 'Cannot join a private chatroom',
            }, { status: 400 })
        }
        const chatroomUser: ChatroomUser[] = await db.insert(chatroomUsers).values({
            chatroomId: params.chatroomid,
            userId: userId
        }).returning()
        return NextResponse.json({
            success: true,
            message: 'Successfully joined a chatroom',
            data: chatroomUser[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}