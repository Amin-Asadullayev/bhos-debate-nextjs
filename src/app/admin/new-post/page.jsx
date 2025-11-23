import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewPost from "@/components/NewPost";

const ADMIN_EMAILS = process.env.AUTHORIZED_EMAILS.split(",");

export const metadata = {
  title: "New Post",
  description: "Add a new post",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function App() {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/login");
  }

  return (
    <>
      <NewPost />
    </>
  );
}
