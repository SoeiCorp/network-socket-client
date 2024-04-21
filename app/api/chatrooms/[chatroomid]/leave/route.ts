import { db } from "@/drizzle/db";
import { ChatroomUser, chatroomUsers } from "@/drizzle/schemas/chatroomUsers";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
    try {
        const userId = Number(req.headers.get('userId'));
        const chatroom = await db.select().from(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid)))
        if (!chatroom.length) {
            return NextResponse.json({
                success: false,
                message: 'Chatroom not found or user not in the chatroom'
            }, { status: 400 })
        }
        const deletedUser: ChatroomUser[] = await db.delete(chatroomUsers).where(and(eq(chatroomUsers.userId, userId), eq(chatroomUsers.chatroomId, params.chatroomid))).returning();
        return NextResponse.json({
            success: true,
            message: 'Successfully leave the chatroom',
            data: deletedUser[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}