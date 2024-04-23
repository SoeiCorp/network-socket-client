import { db } from "@/drizzle/db";
import { ChatroomUser, chatroomUsers } from "@/drizzle/schemas/chatroomUsers";
import { pg } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
    try {
        let result;
        const userId = Number(req.headers.get('userId'));
        // const chatroom = await db.select().from(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid)))
        result = await pg.query(`SELECT * FROM chatroom_users WHERE user_id='${userId}' AND chatroom_id='${params.chatroomid}'`)
        const chatroom = result.rows;
        if (!chatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Chatroom not found or user not in the chatroom'
            }, { status: 400 })
        }
        // const deletedUser: ChatroomUser[] = await db.delete(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid))).returning();
        result = await pg.query(`DELETE FROM chatroom_users WHERE user_id = '${userId}' AND chatroom_id = '${params.chatroomid}' RETURNING *`)
        const deletedUser = result.rows
        const modifiedDeltedUser = deletedUser.map(item => {
            return {
                chatroomId: item.chatroom_id,
                userId: item.user_id,
                createdAt: item.created_at
            }
        })
        return NextResponse.json({
            success: true,
            message: 'Successfully leave the chatroom',
            data: modifiedDeltedUser[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}