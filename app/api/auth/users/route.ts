import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schemas/users';
import { query } from '@/lib/db';

type Result = {
    id: number
    name: string
}[]

export async function GET(req: NextRequest) {
    try {
        // console.log('im here')
        // const allUsers = await db.select({
        //     id: users.id,
        //     name: users.name
        // }).from(users)
        // console.log(allUsers)
        const allUsers = await query<Result>('SELECT id, name FROM users')
        return NextResponse.json({
            success: true,
            message: 'Successfully get all users',
            data: allUsers.rows
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'There is an error occurred',
            error: err
        }, { status: 400 })
    }
}