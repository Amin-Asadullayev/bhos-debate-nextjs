import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
const ADMIN_EMAILS = process.env.AUTHORIZED_EMAILS.split(",");

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/login");
  }
  
  return (
    <>
    <Navbar/>
    <h1 className="text-2xl font-bold text-center mx-auto w-full my-3 dark:text-gray-200">BHOS Debate Club Admin Panel</h1>
    <div className="grid sm:gap-8 gap-6 md:grid-cols-2 lg:grid-cols-3 text-center text-center mx-10 my-5">
      <a href="/admin/post-blog" className="block bg-gray-300 dark:bg-gray-800 p-6 mb-0 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Post a blog
      </h3>
      </a>

      <a className="block bg-gray-300 dark:bg-gray-800 p-6 mb-0 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Post news
      </h3>
      </a>

      <a className="block bg-gray-300 dark:bg-gray-800 p-6 mb-0 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Manage blogs
      </h3>
      </a>

      <a className="block bg-gray-300 dark:bg-gray-800 p-6 m-0 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Manage news
      </h3>
      </a>
    </div>
    </>
  );
}
