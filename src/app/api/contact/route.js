import { NextResponse } from "next/server";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY);
            
export async function POST(req) {
    const { name, email, message, token } = await req.json()

    if (name.trim().length < 3 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) || message.trim().length < 10) {
        return NextResponse.json({ success: false, message: "Failed" }, { status: 400 })
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, { method: "POST" })
    const res = await response.json()
    if (res.success) {
        try {
            const {data, error} = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: [process.env.RESEND_EMAIL],
                subject: `New message from ${name.trim()}`,
                text: `${message.trim()}\n\nBy ${email.trim()}`,
                replyTo: email.trim()           
            });
            if (error) return NextResponse.json({ success: false, message: "Failed" }, { status: 500 })
            return NextResponse.json({ success: true, message: "Done" }, { status: 200 })
        } catch (err) {
            console.log(err)
            return NextResponse.json({ success: false, message: "Failed" }, { status: 500 })
        }
    } else {
        return NextResponse.json({ success: false, message: "Failed" }, { status: 400 })
    }
}