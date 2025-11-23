import BlogCard from "./BlogCard";

function AllBlogs({ blogs }) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      {Object.entries(blogs).map(([id, item], index) => (
        <BlogCard key={id} blog={{...item, id}} index={index} />
      ))}
    </div>
  );
}

export default AllBlogs;
