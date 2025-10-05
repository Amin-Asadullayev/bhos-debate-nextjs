import { app } from "@/lib/firebase";
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const database = getDatabase(app);

export const dynamic = 'force-dynamic';

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

export async function fetchNews() {
  let news = null;
  try {
    const res = await get(query(ref(database, "news"), orderByChild("date")));
    news = res.val();
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }
  return news ? Object.entries(news).reverse() : [];
}

export default async function NewsList() {
  const newsEntries = await fetchNews();

  return (
    <>
      <Navbar />
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-0 text-black dark:text-gray-200">News</h1>
        {!newsEntries.length && <p className="mx-auto text-center text-black dark:text-gray-200">No news found.</p>}
        {newsEntries.length > 0 && (
          <div className="text-white py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto px-4">
              {newsEntries.map(([index, post]) => (
                <Link key={index} href={`/news/${index}`}>
                  <div className="text-gray-800 dark:text-white bg-gray-400 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-400 mt-2">
                      {[
                        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                      ][new Date(-post.date).getMonth()] +
                        " " +
                        new Date(-post.date).getDate() +
                        ", " +
                        new Date(-post.date).getFullYear()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
