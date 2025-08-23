const JoinUs = () => {
  return (
    <section id="join"   className="py-16 bg-gray-50 dark:bg-gray-900 relative group transition-all duration-500 ease-in-out" >
      <divclassName="absolute inset-0 bg-center bg-cover  opacity-40 md:opacity-0 md:group-hover:opacity-50        transition-opacity duration-500" style={{ backgroundImage: "url('/felsefe.jpg')" }}></div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div
          className="
            bg-gray-50/70 dark:bg-gray-900/70 
            p-8 rounded-xl shadow-md 
            transition duration-500
            group-hover:bg-gray-50/80 dark:group-hover:bg-gray-900/80
          "
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Join Our Club
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 mb-8">
            Become a part of our community! Whether you're a seasoned debater or
            just starting out, we have a place for you.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gray-600 dark:bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
