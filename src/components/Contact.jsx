const Contact = () => {
    return (<section id="contact" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Contact Us</h2>
            <div className="max-w-lg mx-auto">
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                        placeholder="Your Message"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="5"
                    ></textarea>
                    <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-200 transition">
                        Send Messages
                    </button>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Contact;