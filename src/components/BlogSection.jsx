import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

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
const database = getDatabase(app);


export default async function BlogSection() {
  const snap = await get(ref(database, "blogs"))
  const blogEntries = snap.val() || {}
  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
           Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {Object.keys(blogEntries).slice(0,3).map((id) => (
            <a
              key={id}
              href={`/blog/${id}`}
              className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {blogEntries[id].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {blogEntries[id].description}
              </p>
              <span className="inline-block mt-4 text-primary font-semibold">
                Read more →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 
