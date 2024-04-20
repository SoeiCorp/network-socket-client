import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { Chatroom, NewChatroom, chatrooms } from '@/drizzle/schemas/chatrooms';
import { ChatroomUser, chatroomUsers } from '@/drizzle/schemas/chatroomUsers';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm'

type ChatroomResult = {
    id: number;
    name: string | null;
    type: "group" | "private";
    createdAt: Date;
    numUsers: number;
}[];

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('userId')
        const result = await db.execute(sql`
            SELECT c.*, count(*) 
            FROM chatrooms c 
            LEFT JOIN chatroom_users cu 
            ON cu.chatroom_id = c.id 
            WHERE c.id IN ( 
                SELECT chatroom_id 
                FROM chatroom_users 
                WHERE user_id = ${userId}) 
            GROUP BY c.id`)
        return NextResponse.json({
            success: true,
            message: 'Successfully get all group chatrooms of user',
            data: result.rows
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
            error: err
        }, { status: 400 })
    }
}