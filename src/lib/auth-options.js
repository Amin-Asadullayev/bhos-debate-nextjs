import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebase-admin.js";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) return null;
        try {
          const decodedToken = await adminAuth.verifyIdToken(credentials.idToken);
          const email = decodedToken.email;

          const ADMIN_EMAILS = process.env.AUTHORIZED_EMAILS.split(",");
          if (!ADMIN_EMAILS.includes(email)) return null;

          return {
            id: decodedToken.uid, 
            email,
          };
        } catch (err) {
          console.error("Token verify failed:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60*60*24
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.uid = token.uid;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};