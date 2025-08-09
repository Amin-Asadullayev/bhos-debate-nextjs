import { app } from "@/lib/firebase"
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const database = getDatabase(app);

export const metadata = {
  title: "News - BHOS Debate Club",
  description: "Explore all news from the BHOS Debate Club",
    openGraph: {
      title: "News - BHOS Debate Club",
      description: "Explore all news posts from the BHOS Debate Club",
      url: 'https://debate.bhos.club',
      siteName: 'BHOS Debate Club',
    },
    twitter: {
      card: 'summary_large_image',
      title: "News - BHOS Debate Club",
      description: "Explore all news from the BHOS Debate Club",
    },
};

export default async function BlogList() {
  const res = await get(query(ref(database, "news"), orderByChild("date")));
  const news = res.val();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-6 text-black dark:text-gray-200">Blogs</h1>

        {!news && <p className="mx-auto text-center text-black dark:text-gray-200">No news found.</p>}

        {news && (
          <ul className="space-y-6">
            {Object.entries(news).toReversed().map(([id, news_]) => (
              <li key={id} className="border-b border-black dark:border-gray-500 pb-4">
                <Link href={`/news/${id}`}>
                  <h2 className="text-xl font-semibold hover:underline text-black dark:text-gray-200">
                    {news_.title}
                  </h2>
                </Link>
                {news_.content && (
                  <p className="text-gray-600 mt-2 dark:text-gray-400">
                    {news_.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
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
