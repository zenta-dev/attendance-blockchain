import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blocks = await db.block.findMany();
        return new NextResponse(JSON.stringify(blocks), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 })
    }
}