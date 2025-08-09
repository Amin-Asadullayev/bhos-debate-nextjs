// app/blog/page.jsx

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

export const metadata = {
  title: "Blogs - BHOS Debate Club",
  description: "Explore all blog posts from the BHOS Debate Club",
};

export default async function BlogList() {
  const res = await get(ref(database, "blogs"));
  const blogs = res.val();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

        {!blogs && <p>No blogs found.</p>}

        {blogs && (
          <ul className="space-y-6">
            {Object.entries(blogs).map(([id, blog]) => (
              <li key={id} className="border-b pb-4">
                <Link href={`/blog/${id}`}>
                  <h2 className="text-xl font-semibold hover:underline">
                    {blog.title}
                  </h2>
                </Link>
                {blog.content && (
                  <p className="text-gray-600 mt-2">
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
