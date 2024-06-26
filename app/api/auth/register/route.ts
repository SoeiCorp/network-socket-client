import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { users, NewUser, User } from "@/drizzle/schemas/users";
import { createToken } from "@/lib/auth";
import { pg } from "@/lib/db";

export async function POST(req: NextRequest) {
  const bcrypt = require("bcrypt");
  try {
    let result;
    const reqBody: NewUser = await req.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;
    // const user: User[] = await db.insert(users).values(reqBody).returning();
    result = await pg.query(`
      INSERT INTO users (name, email, password)
      VALUES ('${reqBody.name}', '${reqBody.email}', '${reqBody.password}')
      RETURNING *`)
    const user = result.rows
    const { token, cookieExpires } = await createToken(user[0]);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully Registered",
        id: user[0].id,
        name: user[0].name,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; path=/; httpOnly=true; expires=${cookieExpires} `,
        },
      }
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
