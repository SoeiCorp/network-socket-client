import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { chatrooms } from '@/drizzle/schemas/chatrooms';
import { chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { query } from '@/lib/db';

type ChatroomResult = {
    id: number;
    name: string | null;
    type: "group" | "private";
    createdAt: Date;
    numUsers: number;
}[];

export async function GET(req: NextRequest, { params }: any) {
    try {
        let result;
        result = await query(`
        SELECT 
            chatrooms.id,
            chatrooms.name,
            chatrooms.chatroom_type,
            chatrooms.created_at,
            COUNT(*) 
        FROM chatroom_users
        LEFT JOIN chatrooms
        ON chatrooms.id = chatroom_users.chatroom_id
        WHERE chatrooms.id = '${params.chatroomid}'
        GROUP BY 
            chatrooms.id, 
            chatrooms.name,
            chatrooms.chatroom_type,
            chatrooms.created_at`)
        const modifiedResult = result.rows.map(item => {
            return {
                id: item.id,
                name: item.name,
                type: item.chatroom_type,
                createdAt: item.created_at,
                numUsers: item.count
            }
        })
        // const rows = await db.select({
        //     chatroom: chatrooms,
        //     chatroomUser: chatroomUsers
        // }).from(chatrooms).leftJoin(chatroomUsers, eq(chatrooms.id, chatroomUsers.chatroomId)).where(eq(chatrooms.id, params.chatroomid))
        // const result: ChatroomResult = rows.reduce((accum: ChatroomResult, { chatroom, chatroomUser }) => {
        //     const chatroomId = chatroom.id;
        //     const existingChatroom = accum.find(room => room.id === chatroomId);
        //     if (existingChatroom) {
        //         existingChatroom.numUsers++;
        //     } else {
        //         accum.push({
        //             id: chatroomId,
        //             name: chatroom.name,
        //             type: chatroom.type,
        //             createdAt: chatroom.createdAt,
        //             numUsers: 1,
        //         });
        //     }
        //     return accum;
        // }, []);

        return NextResponse.json({
            success: true,
            message: 'Successfully get chatroom information',
            data: modifiedResult[0]
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
        }, { status: 400 })
    }
}