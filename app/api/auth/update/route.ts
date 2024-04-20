import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/drizzle/db';
import { users, NewUser, User } from '@/drizzle/schemas/users';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const userId = Number(req.headers.get('userId'));
        const reqBody = await req.json();
        const user: User[] = await db.update(users).set({ name: reqBody.name }).where(eq(users.id, userId)).returning();
        return NextResponse.json({
            success: true,
            message: 'Successfully Updated a user',
            data: user
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