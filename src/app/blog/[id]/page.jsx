import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import createDOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"

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
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export async function generateStaticParams() {
  const res = await get(ref(database, "blogs"));
  const blogs = res.val();

  if (!blogs) return [];

  return Object.keys(blogs).map((id) => ({
    id,
  }));
}

export default async function BlogPost({ params }) {
  const param = await params
  const res = await get(ref(database, `blogs/${param.id}`));
  const blog = res.val();

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="blog-post bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
        <div className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
      </div>
    </>
  );
}