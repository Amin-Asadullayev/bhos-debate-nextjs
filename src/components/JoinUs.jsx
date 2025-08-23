const JoinUs = () => {
    return (
        <section id="join" className="py-16 bg-gray-50 dark:bg-gray-900 relative group transition-all duration-500 ease-in-out">

            <div className="absolute inset-0 bg-center bg-coveropacity-60 md:opacity-0 md:group-hover:opacity-60transition-opacity duration-500"style={{ backgroundImage: "url('/felsefe.jpg')" }}></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Join Our Club
                </h2>
                <p className="text-lg text-gray-800 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Become a part of our community! Whether you're a seasoned debater or just starting out,
                    we have a place for you.
                </p>
                <ahref="#contact"className="nav-link inline-block bg-gray-600 dark:bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition">
                    Sign Up Now
                </a>
            </div>
        </section>
    );
};

export default JoinUs;
