import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schemas/users";
import { eq } from "drizzle-orm";
import { createToken } from "@/lib/auth";
import { reqBody } from "./reqBody";

export async function POST(req: NextRequest) {
  const bcrypt = require("bcrypt");
  try {
    const reqBody: reqBody = await req.json();
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, reqBody.email));
    if (!user.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong email or password",
        },
        { status: 404 }
      );
    }
    const matchPassword = await bcrypt.compare(
      reqBody.password,
      user[0].password
    );
    if (!matchPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong email or password",
        },
        { status: 404 }
      );
    }
    const { token, cookieExpires } = await createToken(user[0]);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
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
