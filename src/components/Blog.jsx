// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get } from "firebase/database";
// import createDOMPurify from "isomorphic-dompurify";
// import { JSDOM } from "jsdom";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const window = new JSDOM("").window;
// const DOMPurify = createDOMPurify(window);

// export default async function BlogPage() {
//   let blogs = null;

//   try {
//     const snapshot = await get(ref(database, "blogs"));
//     blogs = snapshot.val();
//   } catch (error) {
//     console.error("Failed to fetch blogs:", error);
//   }


//   const blogEntries = blogs
//     ? Object.entries(blogs)
//     : [
//         [
//           "dummy1",
//           {
//             title: "cox qarisiq oldu",
//             content: "cunki navbar isi zibilliyir ayri sehife olanda.",
//           },
//         ],
//         [
//           "dummy2",
//           {
//             title: "sakam",
//             content: "sakol.",
//           },
//         ],
//       ];

//   return (
//     <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
//           Blog
//         </h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
//           {blogEntries.map(([id, blog]) => (
//             <a
//               key={id}
//               href={id.startsWith("dummy") ? "#" : `/blog/${id}`}
//               className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 {blog.title}
//               </h3>
//               <p
//                 className="text-gray-600 dark:text-gray-300 line-clamp-3"
//                 dangerouslySetInnerHTML={{
//                   __html: DOMPurify.sanitize(
//                     blog.content.length > 120
//                       ? blog.content.slice(0, 120) + "..."
//                       : blog.content
//                   ),
//                 }}
//               />
//               { !id.startsWith("dummy") && (
//                 <span className="inline-block mt-4 text-primary font-semibold">
//                   Read more →
//                 </span>
//               )}
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// app/blog/page.jsx
// app/blog/page.jsx

export default function BlogPage() {
  const blogEntries = [
    {
      id: "1",
      title: "cox qarisiq oldu",
      content:
        "cunki navbar isi zibilliyir ayri sehife olanda.",
    },
    {
      id: "2",
      title: "sakam",
      content:
        "sakol.",
    },
  ];

  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
           Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {blogEntries.map(({ id, title, content }) => (
            <a
              key={id}
              href={`/blog/${id}`}
              className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {content.length > 120 ? content.slice(0, 120) + "..." : content}
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
