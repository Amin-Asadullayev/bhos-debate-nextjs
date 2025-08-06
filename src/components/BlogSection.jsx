export default async function BlogSection({blogEntries}) {
  return (
    <section id="blog" className="py-16 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
           Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {Object.keys(blogEntries).slice(0,3).toReversed().map((id) => (
            <a
              key={id}
              href={`/blog/${id}`}
              className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {blogEntries[id].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][(new Date(-blogEntries[id].date)).getMonth()]+" "+(new Date(-blogEntries[id].date)).getDate()+", "+(new Date(-blogEntries[id].date)).getFullYear()}
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
