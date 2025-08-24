const Header = () => {
  return (
    <section className="relative bg-primary text-white py-20 overflow-hidden group">
      <div
        className="
          absolute inset-0 bg-center bg-cover
          opacity-40 
        "
        style={{ backgroundImage: "url('/fel.jpg')" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Join the Art of Debate
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Engage in thought-provoking discussions and sharpen your critical
          thinking skills.
        </p>
        <a
          href="#join"
          className="nav-link inline-block bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary-100 transition"
        >
          Get Involved
        </a>
      </div>
    </section>
  );
};

export default Header;
