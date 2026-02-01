import BlogCard from "./BlogCard";

function AllBlogs({ blogs }) {
  // Handle both array and object formats
  const blogsArray = Array.isArray(blogs)
    ? blogs
    : Object.entries(blogs).map(([id, item]) => ({ ...item, id }));

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      {blogsArray.map((blog, index) => (
        <BlogCard key={blog.id} blog={blog} index={index} />
      ))}
    </div>
  );
}

export default AllBlogs;
