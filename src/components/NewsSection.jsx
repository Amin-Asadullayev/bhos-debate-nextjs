// const News = ({ news }) => {
//     return (
//         <section id="about" className="py-16 bg-gray-200 dark:bg-gray-800 transition-all duration-500 ease-in-out relative group rounded-lg overflow-hidden">

//             <div
//                 className="
//                     absolute inset-0 bg-center bg-cover
//                     opacity-50 sm:opacity-0 sm:group-hover:opacity-50
//                     transition-opacity duration-500 rounded-lg
//                 "
//                 style={{ backgroundImage: "url('/aydin.jpg')" }}
//             ></div>

//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
//                   <a href="/news" className="hover:underline">
//                     News
//                   </a>
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {Object.entries(news).map(([id, item]) =>
//                         <a href={`/news/${id}`} key={id}>
//                             <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
//                                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                                     {item.title}
//                                 </h3>
//                                 <p className="text-gray-600 dark:text-gray-300">
//                                     {
//                                         ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
//                                         [(new Date(-item.date)).getMonth()]
//                                         + " " + (new Date(-item.date)).getDate()
//                                         + ", " + (new Date(-item.date)).getFullYear()
//                                     }
//                                 </p>
//                                 <span className="inline-block mt-4 text-gray-800 dark:text-gray-400 font-semibold">
//                                     Read more →
//                                 </span>
//                             </div>
//                         </a>
//                     )}
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default News;

import Link from "next/link";
import AllNews from "./AllNews";

function NewsSection({ newsItems }) {
  return (
    <div className="header-dark">
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 body-dark" data-aos="fade-up">
            <h2 className="font-baskerville text-[3.5rem] leading-tight mb-4 italic">
              Latest News
            </h2>
            <p className="font-garamond text-[1.75rem] leading-snug mb-4">
              —stay updated with our community.
            </p>
            <p className="font-body text-[1.125rem] leading-relaxed max-w-3xl">
              Discover the latest updates, achievements, and upcoming events
              from our vibrant debate community.
            </p>
          </div>

          {/* News Cards */}
          <AllNews news={newsItems} />

          {/* Read More Button */}
          <div
            className="flex justify-end"
            data-aos="fade-up"
            data-aos-delay={4 * 100}
          >
            <Link href="/news">
              <button
                className="btn-dark font-body px-10 py-4 cursor-pointer transform
                     transition-all font-semibold uppercase
                     shadow-lg hover:shadow-xl"
              >
                Read More...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;
