import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { Chatroom, chatrooms } from '@/drizzle/schemas/chatrooms';
import { ChatroomUser, chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { pg } from '@/lib/db';

export async function POST(req: NextRequest, { params }: any) {
    try {
        let result;
        const userId = Number(req.headers.get('userId'))
        // const chatroom: Chatroom[] = await db.select().from(chatrooms).where(and(eq(chatrooms.id, params.chatroomid)))
        result = await pg.query(`SELECT * FROM chatrooms WHERE id='${params.chatroomid}'`)
        const chatroom = result.rows
        if (chatroom[0].type === 'private') {
            return NextResponse.json({
                success: false,
                message: 'Cannot join a private chatroom',
            }, { status: 400 })
        }
        // const chatroomUser: ChatroomUser[] = await db.insert(chatroomUsers).values({
        //     chatroomId: params.chatroomid,
        //     userId: userId
        // }).returning()
        result = await pg.query(`INSERT INTO chatroom_users (chatroom_id, user_id) VALUES('${params.chatroomid}', ${userId}) RETURNING *`)
        const chatroomUser = result.rows;
        const modifiedChatroomUser = chatroomUser.map(item => {
            return {
                chatroomId: item.chatroom_id,
                userId: item.user_id,
                createdAt: item.created_at
            }
        })
        return NextResponse.json({
            success: true,
            message: 'Successfully joined a chatroom',
            data: modifiedChatroomUser[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}