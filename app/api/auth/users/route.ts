import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schemas/users';

export async function GET(req: NextRequest) {
    try {
        // console.log('im here')
        const allUsers = await db.select({
            id: users.id,
            name: users.name
        }).from(users)
        // console.log(allUsers)
        return NextResponse.json({
            success: true,
            message: 'Successfully get all users',
            data: allUsers
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
            error: err
        }, { status: 400 })
    }
}