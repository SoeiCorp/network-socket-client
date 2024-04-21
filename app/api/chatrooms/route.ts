"use server";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { Chatroom, chatrooms } from "@/drizzle/schemas/chatrooms";
import { ChatroomUser, chatroomUsers } from "@/drizzle/schemas/chatroomUsers";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { users } from "@/drizzle/schemas/users";

export async function POST(req: NextRequest) {
  try {
    const userId = Number(req.headers.get("userId"));
    const reqBody = await req.json();
    if (reqBody.type === "private") {
      const opponentUser = await db
        .select()
        .from(users)
        .where(eq(users.id, reqBody.opponentUser));
      const foundChatroom = await db.execute(sql`
                SELECT * FROM chatrooms c
                LEFT JOIN chatroom_users cu
                ON c.id = cu.chatroom_id
                WHERE c.chatroom_type = 'private' AND c.id IN (
                SELECT cu.chatroom_id FROM chatroom_users cu
                WHERE cu.chatroom_id IN (
                SELECT cu.chatroom_id FROM chatroom_users cu
                WHERE cu.user_id = ${userId}) AND user_id = ${reqBody.opponentUser})`);
      if (foundChatroom.rows.length) {
        return NextResponse.json(
          {
            success: false,
            message: "Chatroom already created",
            data: foundChatroom.rows[0],
          },
          { status: 200 }
        );
      }
    }
    const chatroom: Chatroom[] = await db
      .insert(chatrooms)
      .values({
        name: reqBody.type === "group" ? reqBody.name : null,
        type: reqBody.type,
      })
      .returning();
    console.log(chatroom[0].id);
    console.log(userId);
    const chatroomUser: ChatroomUser[] = await db
      .insert(chatroomUsers)
      .values({
        chatroomId: chatroom[0].id,
        userId: userId,
      })
      .returning();
    if (reqBody.type === "private") {
      const opponentUser: ChatroomUser[] = await db
        .insert(chatroomUsers)
        .values({
          chatroomId: chatroom[0].id,
          userId: reqBody.opponentUser,
        })
        .returning();
    }
    return NextResponse.json(
      {
        success: true,
        message: "Successfully create a chatroom",
        data: chatroom[0],
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "There is an error occurred",
      },
      { status: 400 }
    );
  }
}
