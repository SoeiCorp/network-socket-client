import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/drizzle/db';
import { users, NewUser } from '@/drizzle/schemas/users';
export async function POST(req: NextRequest) {
    const bcrypt = require('bcrypt')
    try {
        const reqBody: NewUser = await req.json();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword
        const user = await db.insert(users).values(reqBody).returning({ userId: users.id });
        return NextResponse.json({
            success: true,
            message: 'Successfully registered',
            userId: user[0].userId
        }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
            error: err
        }, { status: 400 })
    }
}