const JoinUs = () => {
  return (
    <section
      id="join"
      className="h-full flex items-center py-16 bg-gray-100 dark:bg-gray-850 relative group transition-all duration-500 ease-in-out"
    >
      <div
        className="absolute inset-0 bg-center bg-cover 
                   opacity-50 md:opacity-0 md:group-hover:opacity-50
                   transition-opacity duration-500 rounded-lg"
        style={{ backgroundImage: "url('/felsefe.jpg')" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50/40 dark:bg-gray-900/40 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Join Our Club
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            Become a part of our community! Whether you're a seasoned debater or
            just starting out, we have a place for you.
          </p>
          <div className="text-center">
            <a
              href="#contact"
              className="inline-block bg-gray-600 dark:bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
