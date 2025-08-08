import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { secret, path } = await req.json()
        if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_PASS) {
            return NextResponse.json({ response: "Invalid passkey!" }, { status: 401 })
        }
        if (!path || typeof path !== "string") {
            return NextResponse.json({ response: "Invalid path!" }, { status: 404 })
        }
        await revalidatePath(path)
        return NextResponse.json({ response: `Revalidated succesfully` }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ response: "ERROR" })
    }
}