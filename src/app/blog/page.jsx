import { app } from "@/lib/firebase";
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const database = getDatabase(app);

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

export default async function BlogList() {
  let blogs = null;

  try {
    const res = await get(query(ref(database, "blogs"), orderByChild("date")));
    blogs = res.val();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  const blogEntries = blogs ? Object.entries(blogs).reverse() : [];

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
            {blogEntries.map(([id, blog]) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <Link href={`/blog/${id}`}>
                  <h2 className="text-xl font-semibold hover:underline text-black dark:text-gray-200 mb-2">
                    {blog.title}
                  </h2>
                </Link>
                {blog.content && (
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-4">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                  </p>
                )}
                <Link
                  href={`/blog/${id}`}
                  className="inline-block mt-4 text-primary font-semibold hover:underline"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
