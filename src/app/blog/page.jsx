import { app } from "@/lib/firebase"
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
      url: 'https://debate.bhos.club',
      siteName: 'BHOS Debate Club',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Blogs - BHOS Debate Club",
      description: "Explore all blog posts from the BHOS Debate Club",
    },
};

export default async function BlogList() {
  const res = await get(query(ref(database, "blogs"), orderByChild("date")));
  const blogs = res.val();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-black dark:text-gray-200">News</h1>

        {!blogs && <p className="mx-auto text-center text-black dark:text-gray-200">No blogs found.</p>}

        {blogs && (
          <ul className="space-y-6">
            {Object.entries(blogs).toReversed().map(([id, blog]) => (
              <li key={id} className="border-b border-black dark:border-gray-500 pb-4">
                <Link href={`/blog/${id}`}>
                  <h2 className="text-xl font-semibold hover:underline text-black dark:text-gray-200">
                    {blog.title}
                  </h2>
                </Link>
                {blog.content && (
                  <p className="text-gray-600 mt-2 dark:text-gray-400">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
