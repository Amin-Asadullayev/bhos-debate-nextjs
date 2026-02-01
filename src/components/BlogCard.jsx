import Link from "next/link";

function BlogCard({ blog, index }) {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    // Strip HTML tags for preview
    const strippedText = text.replace(/<[^>]+>/g, "");
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.slice(0, maxLength) + "...";
  };

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group/card header-light rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={blog.image || blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div>
          <h3 className="font-body text-[1.25rem] leading-snug font-semibold h2-light mb-3 group-hover/card:opacity-80 transition-colors">
            {blog.title}
          </h3>
          <p className="font-body text-[1rem] leading-relaxed body-light mb-4">
            {truncateText(blog.content, 200)}
          </p>
        </div>
        <p
          className="font-body text-[0.875rem] opacity-70"
          style={{ color: "var(--light-subtext)" }}
        >
          {blog.date}
        </p>
      </div>
    </Link>
  );
}

export default BlogCard;
