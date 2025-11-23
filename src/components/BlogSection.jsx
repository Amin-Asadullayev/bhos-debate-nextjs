import Link from "next/link";
import AllBlogs from "./AllBlogs";

function BlogSection({ blogPosts }) {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Hover trigger wrapper */}
      <div className="group relative">
        <style>
          {`
            .blog-section:hover .blog-bg {
              opacity: 0.4;
            }
          `}
        </style>

        <div className="blog-section py-20 px-6">
          {/* Background responds to section hover */}
          <div
            className="blog-bg absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-400 pointer-events-none"
            style={{
              backgroundImage: "url('../../img/The_School_of_Athens.jpg')",
            }}
          />

          <div className="max-w-6xl mx-auto relative">
            {/* Section Header */}
            <div className="mb-12" data-aos="fade-up">
              <h2 className="font-baskerville text-[3.5rem] leading-tight h2-light mb-4 italic">
                Featured Blogs
              </h2>
              <p className="font-garamond text-[1.75rem] leading-snug body-light mb-4">
                —insights, tips, and stories.
              </p>
              <p className="font-body text-[1.125rem] leading-relaxed body-light max-w-3xl">
                Explore articles written by our community members, covering
                debate strategies, personal experiences, and thought-provoking
                discussions.
              </p>
            </div>

            <AllBlogs blogs={blogPosts} />

            {/* Read More Button */}
            <div
              className="flex justify-end"
              data-aos="fade-up"
              data-aos-delay={4 * 100}
            >
              <Link href="/blog">
                <button className="btn-light font-body cursor-pointer px-8 py-3 tracking-wider uppercase text-sm transition border border-zinc-600">
                  Read More Blogs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;

// export default async function BlogSection({ blogEntries }) {
//   return (
//     <section
//       id="blog"
//       className="py-16 bg-gray-50 dark:bg-gray-700 relative group transition-all duration-500 ease-in-out rounded-lg overflow-hidden"
//     >
//       <div
//         className="absolute inset-0 bg-center bg-cover opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-500 rounded-lg"
//         style={{ backgroundImage: "url('/banem.JPG')" }}
//       ></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
//           <a href="/blog" className="hover:underline">
//             Blog
//           </a>
//         </h2>

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
//           {Object.keys(blogEntries)
//             .slice(0, 3)
//             .toReversed()
//             .map((id) => {

//               const date = new Date(-blogEntries[id].date);
//               const formattedDate =
//                 [
//                   "January","February","March","April","May","June",
//                   "July","August","September","October","November","December"
//                 ][date.getMonth()] +
//                 " " +
//                 date.getDate() +
//                 ", " +
//                 date.getFullYear();

//               return (
//                 <a
//                   key={id}
//                   href={`/blog/${id}`}
//                   className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300 relative z-10"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     {blogEntries[id].title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
//                     {formattedDate}
//                   </p>
//                   <span className="inline-block mt-4 text-primary font-semibold">
//                     Read more →
//                   </span>
//                 </a>
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// }
