import { NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schemas/users';
import { eq } from 'drizzle-orm';
import { reqBody } from './postBody';

export async function POST(req: Request) {
    const bcrypt = require('bcrypt')
    try {
        const reqBody: reqBody = await req.json();
        const user = await db.select().from(users).where(eq(users.email, reqBody.email));
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Wrong email or password'
            }, { status: 404 })
        }
        const matchPassword = await bcrypt.compare(reqBody.password, user[0].password);
        if (!matchPassword) {
            return NextResponse.json({
                success: false,
                message: 'Wrong email or password'
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            message: 'Successfully logged-in'
        }, { status: 200 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
            error: err
        }, { status: 404 })
    }
}