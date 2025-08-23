const About = () => {
    return (
        <section 
            id="about"  
            className="py-16 bg-gray-50 dark:bg-gray-900 transition-all duration-500 ease-in-out relative group"
        >

            <div
                className="
                    absolute inset-0 bg-center bg-cover
                    opacity-50 md:opacity-0 md:group-hover:opacity-50
                    transition-opacity duration-500
                "
                style={{ backgroundImage: "url('/campus.jpg')" }}
            ></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-gray-50/40 dark:bg-gray-900/40 p-8 rounded-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        About Our Club
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
                        The Debate Club is a vibrant community dedicated to fostering intellectual growth,
                        critical thinking, and effective communication. We welcome individuals from all
                        backgrounds to engage in respectful and dynamic discussions on a wide range of topics.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
