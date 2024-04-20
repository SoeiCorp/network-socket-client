import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({
        success: true,
        message: 'Successfully logged out',
    }, { status: 200, headers: { "Set-Cookie": `token=none; path=/; httpOnly=true; expires=${new Date(Date.now())} ` } })
}