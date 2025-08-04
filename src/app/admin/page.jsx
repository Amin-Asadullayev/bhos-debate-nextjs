import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import TipTap from "@/components/TipTap"
const ADMIN_EMAILS = process.env.AUTHORIZED_EMAILS.split(",");

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/login");
  }
  
  return (
    <>
    <Navbar/>
    <TipTap/>
    </>
  );
}
