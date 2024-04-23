import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { sql } from "drizzle-orm";

type ChatroomResult = {
  id: number;
  name: string | null;
  type: "group" | "private";
  createdAt: Date;
  numUsers: number;
}[];

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("userId");
    let prepare = sql.empty();
    prepare = sql`
    SELECT 
      c.id AS id,
      c.name AS name,
      c.chatroom_type AS type,
      c.created_at AS "createdAt",
      count(*) AS "numUsers"
    FROM chatrooms c
    LEFT JOIN chatroom_users cu
    ON cu.chatroom_id = c.id
    WHERE c.id IN (
      SELECT chatroom_id
      FROM chatroom_users
      WHERE user_id = ${userId}
    )
      AND c.chatroom_type = 'group'
    GROUP BY c.id`;
    const test = await db.execute(sql`
    SELECT *
    FROM chatrooms c
    WHERE c.id IN (
      SELECT chatroom_id
      FROM chatroom_users
      WHERE user_id = ${userId}
    )
      AND c.chatroom_type = 'group'`)
    const result = await db.execute(prepare);
    // console.log(result.rows)
    const modifiedResult = result.rows.map(item => {
      const modifiedItem = { ...item }
      modifiedItem.createdAt = new Date(modifiedItem.createdAt as string);
      modifiedItem.numUsers = parseInt(modifiedItem.numUsers as string)
      return modifiedItem
    })
    return NextResponse.json(
      {
        success: true,
        message: "Successfully get all group chatrooms of user",
        data: modifiedResult,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "There is an error occurred",
        error: err,
      },
      { status: 400 }
    );
  }
}
