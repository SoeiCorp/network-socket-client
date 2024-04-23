"use server";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { Chatroom, chatrooms } from "@/drizzle/schemas/chatrooms";
import { ChatroomUser, chatroomUsers } from "@/drizzle/schemas/chatroomUsers";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { users } from "@/drizzle/schemas/users";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    let result;
    const userId = Number(req.headers.get("userId"));
    const reqBody = await req.json();
    if (reqBody.type === "private") {
      // const opponentUser = await db
      //   .select()
      //   .from(users)
      //   .where(eq(users.id, reqBody.opponentUser));
      // const foundChatroom = await db.execute(sql`
      //           SELECT * FROM chatrooms c
      //           LEFT JOIN chatroom_users cu
      //           ON c.id = cu.chatroom_id
      //           WHERE c.chatroom_type = 'private' AND c.id IN (
      //           SELECT cu.chatroom_id FROM chatroom_users cu
      //           WHERE cu.chatroom_id IN (
      //           SELECT cu.chatroom_id FROM chatroom_users cu
      //           WHERE cu.user_id = ${userId}) AND user_id = ${reqBody.opponentUser})`);
      const foundChatroom = await query(`
      SELECT * FROM chatrooms c
      LEFT JOIN chatroom_users cu
      ON c.id = cu.chatroom_id
      WHERE c.chatroom_type = 'private' AND c.id IN (
      SELECT cu.chatroom_id FROM chatroom_users cu
      WHERE cu.chatroom_id IN (
      SELECT cu.chatroom_id FROM chatroom_users cu
      WHERE cu.user_id = ${userId}) AND user_id = ${reqBody.opponentUser})`)
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
    // const chatroom: Chatroom[] = await db
    //   .insert(chatrooms)
    //   .values({
    //     name: reqBody.type === "group" ? reqBody.name : null,
    //     type: reqBody.type,
    //   })
    //   .returning();
    result = await query(`
      INSERT INTO chatrooms (name, chatroom_type)
      VALUES ('${reqBody.name}', '${reqBody.type}')
      RETURNING *`)
    const chatroom = result.rows
    // const chatroomUser: ChatroomUser[] = await db
    //   .insert(chatroomUsers)
    //   .values({
    //     chatroomId: chatroom[0].id,
    //     userId: userId,
    //   })
    //   .returning();
    result = await query(`
      INSERT INTO chatroom_users (chatroom_id, user_id)
      VALUES ('${chatroom[0].id}', '${userId}')
      RETURNING *`)
    const chatroomUser = result.rows
    if (reqBody.type === "private") {
      // const opponentUser: ChatroomUser[] = await db
      //   .insert(chatroomUsers)
      //   .values({
      //     chatroomId: chatroom[0].id,
      //     userId: reqBody.opponentUser,
      //   })
      //   .returning();
      result = await query(`
        INSERT INTO chatroom_users (chatroom_id, user_id)
        VALUES ('${chatroom[0].id}', '${reqBody.opponentUser}')
        RETURNING *`)
      const opponentUser = result.rows
    }
    const modifiedChatroom = {
      id: chatroom[0].id,
      name: chatroom[0].name,
      type: chatroom[0].chatroom_type,
      createdAt: chatroom[0].created_at
    }
    return NextResponse.json(
      {
        success: true,
        message: "Successfully create a chatroom",
        data: modifiedChatroom,
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
