const News = ({ news }) => {
    return (
        <section  id="about" className="py-16 bg-gray-300 dark:bg-gray-800 transition-all duration-500 ease-in-out relative group">

            <div className="absolute inset-0 bg-center bg-cover opacity-100 sm:opacity-0 sm:group-hover:opacity-50 transition-opacity duration-500" style={{ backgroundImage: "url('/banem.JPG')" }} ></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                    News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(news).map(([id, item]) =>
                        <a href={`/news/${id}`} key={id}>
                            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {
                                        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                        [(new Date(-item.date)).getMonth()] 
                                        + " " + (new Date(-item.date)).getDate() 
                                        + ", " + (new Date(-item.date)).getFullYear()
                                    }
                                </p>
                                <span className="inline-block mt-4 text-gray-800 dark:text-gray-400 font-semibold">
                                    Read more →
                                </span>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}

export default News
