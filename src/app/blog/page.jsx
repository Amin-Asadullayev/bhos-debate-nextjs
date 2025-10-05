import { app } from "@/lib/firebase";
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const database = getDatabase(app);

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Blogs - BHOS Debate Club",
  description: "Explore all blog posts from the BHOS Debate Club",
  openGraph: {
    title: "Blogs - BHOS Debate Club",
    description: "Explore all blog posts from the BHOS Debate Club",
    url: "https://debate.bhos.club",
    siteName: "BHOS Debate Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - BHOS Debate Club",
    description: "Explore all blog posts from the BHOS Debate Club",
  },
};

export async function fetchBlogs() {
  let blogs = null;

  try {
    const res = await get(query(ref(database, "blogs"), orderByChild("date")));
    blogs = res.val();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return blogs ? Object.entries(blogs).reverse() : [];
}

export default async function BlogList() {
  const blogEntries = await fetchBlogs();

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-8 text-black dark:text-gray-200">
          Blogs
        </h1>

        {blogEntries.length === 0 ? (
          <p className="mx-auto text-center text-black dark:text-gray-200">
            No blogs found.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogEntries.map(([id, blog]) => {
              const date = new Date(-blog.date);
              const formattedDate =
                [
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ][date.getMonth()] +
                " " +
                date.getDate() +
                ", " +
                date.getFullYear();

              return (
                <Link
                  key={id}
                  href={`/blog/${id}`}
                  className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300"
                >
                  <h2 className="text-xl font-semibold text-black dark:text-gray-200 mb-2">
                    {blog.title}
                  </h2>
                  {blog.content && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-4">
                      {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                    </p>
                  )}
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    {formattedDate}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
