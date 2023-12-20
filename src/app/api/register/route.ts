import db from '@/libs/db';
import bcrypt from 'bcrypt';
export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("=== REGISTER REQUEST ===", body, "=====================")

        const find = await db.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (find) {
            console.log("Email already registered")
            return new Response("Email already registered", { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)

        const user = await db.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name
            }
        })

        if (!user) {
            console.log("User not found")
            return new Response("User not found", { status: 404 })
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", { status: 500 })

    }
}
