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
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-0 text-black dark:text-gray-200">Blogs</h1>
        {!news && <p className="mx-auto text-center text-black dark:text-gray-200">No news found.</p>}
        {news && (<div className="text-white py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto px-4">
            {Object.entries(news).toReversed().map(([index, post]) => (
              <Link href={`/news/${index}`}>
                <div key={index} className="text-gray-800 dark:text-white bg-gray-400 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-700 mt-2">{["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][(new Date(-post.date)).getMonth()]+" "+(new Date(-post.date)).getDate()+", "+(new Date(-post.date)).getFullYear()}</p>
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
