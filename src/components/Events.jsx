const Events = () => {
    let events = [
        { "title": "Climate Change Debate", "date": "August 10, 2025", "desc": "Join us to discuss global climate policies.", "link": "https://google.com" },
        { "title": "Tech Ethics Forum", "date": "September 5, 2025", "desc": "Explore the ethical implications of AI.", "link": "https://google.com" },
        { "title": "Open Mic Debate", "date": "October 15, 2025", "desc": "Bring your topic and join the conversation!", "link": "https://google.com" }
    ]
    return (
        <section id="events" className="py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        events.map((item) =>
                            <a href={item.link} key={item.title}>
                                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.date}</p>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
                                </div>
                            </a>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Events