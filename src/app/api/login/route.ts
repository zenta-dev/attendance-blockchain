import db from '@/libs/db';
import bcrypt from 'bcrypt';
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
            console.log("User not found")
            return new NextResponse("User not found", { status: 404 })
        }

        const match = await bcrypt.compare(body.password, user.password)

        if (!match) {
            console.log("Password does not match")
            return new NextResponse("Password does not match", { status: 401 })
        }

        user.password = ""

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500 })
    }
}

