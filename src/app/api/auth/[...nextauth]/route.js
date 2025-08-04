import NextAuth from "next-auth/next";
import {authOptions} from "@/lib/auth-options"

const handler = NextAuth(authOptions)
export const POST = handler;
export const GET = handler;
