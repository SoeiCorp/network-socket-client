import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/drizzle/db';
import { users, User } from '@/drizzle/schemas/users';
import { eq } from 'drizzle-orm';

export async function PUT(req: NextRequest) {
    try {
        const userId = Number(req.headers.get('userId'));
        const reqBody = await req.json();
        const user: User[] = await db.update(users).set({ name: reqBody.name }).where(eq(users.id, userId)).returning();
        return NextResponse.json({
            success: true,
            message: 'Successfully updated a user',
            data: user[0]
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