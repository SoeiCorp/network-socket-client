import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';

type ChatroomResult = {
    id: number;
    name: string | null;
    type: "group" | "private";
    createdAt: Date;
    numUsers: number;
}[];

export async function GET(req: NextRequest, { params }: any) {
    try {
        const rows = await db.select({
            chatroom: chatrooms,
            chatroomUser: chatroomUsers
        }).from(chatrooms).leftJoin(chatroomUsers, eq(chatrooms.id, chatroomUsers.chatroomId)).where(eq(chatrooms.id, params.chatroomid))
        const result: ChatroomResult = rows.reduce((accum: ChatroomResult, { chatroom, chatroomUser }) => {
            const chatroomId = chatroom.id;
            const existingChatroom = accum.find(room => room.id === chatroomId);
            if (existingChatroom) {
                existingChatroom.numUsers++;
            } else {
                accum.push({
                    id: chatroomId,
                    name: chatroom.name,
                    type: chatroom.type,
                    createdAt: chatroom.createdAt,
                    numUsers: 1,
                });
            }
            return accum;
        }, []);

        return NextResponse.json({
            success: true,
            message: 'Successfully get chatroom information',
            data: result[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}