export default async function BlogSection({ blogEntries }) {
  return (
    <section
      id="blog"
      className="py-16 bg-gray-50 dark:bg-gray-700 relative group transition-all duration-500 ease-in-out"
    >
      <div
        className="absolute inset-0 bg-center bg-cover opacity-40 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundImage: "url('/banem.JPG')" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          <a href="/blog" className="hover:underline">
            Blog
          </a>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {Object.keys(blogEntries)
            .slice(0, 3)
            .toReversed()
            .map((id) => {
            const timestamp = blogEntries[id].date;
            const date = new Date(Number(timestamp) * 1000); // multiply by 1000 if your Firebase uses seconds
            const formattedDate =
              [
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ][date.getMonth()] +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear();


              return (
                <a
                  key={id}
                  href={`/blog/${id}`}
                  className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 duration-300 relative z-10"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {blogEntries[id].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {formattedDate}
                  </p>
                  <span className="inline-block mt-4 text-primary font-semibold">
                    Read more →
                  </span>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
