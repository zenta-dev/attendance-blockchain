import db from '@/libs/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("=== LOGIN REQUEST ===", body, "=====================")

        const user = await db.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        if (user.password !== body.password) {
            return new NextResponse("Wrong password", { status: 401 })
        }

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 })
    }
}

