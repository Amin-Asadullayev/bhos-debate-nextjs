"use client";

import { useState, useMemo, useEffect } from "react";
import { app } from "@/lib/firebase";
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import AllBlogs from "@/components/AllBlogs";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const database = getDatabase(app);

export default function BlogPage() {
  const [blogEntries, setBlogEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Fetch blogs from Firebase
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await get(query(ref(database, "blogs"), orderByChild("date")));
        const blogs = res.val();
        
        if (blogs) {
          // Convert to array format with id, title, content, image, date
          const formattedBlogs = Object.entries(blogs).reverse().map(([id, blog]) => {
            const date = new Date(-blog.date);
            const formattedDate =
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ][date.getMonth()] +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear();

            return {
              id,
              title: blog.title,
              content: blog.content,
              image: blog.thumbnail,
              date: formattedDate,
            };
          });
          setBlogEntries(formattedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogEntries;

    return blogEntries.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, blogEntries]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="bg-white relative overflow-hidden min-h-screen">
        <div className="py-20 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-body text-[1.25rem] body-light">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('../../img/The_School_of_Athens.jpg')" }}
      />

      <div className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="font-baskerville max-md:mt-4 text-[3rem] md:text-[5rem] h2-light mb-4 italic">
              All Blogs
            </h1>
            <p className="font-body text-[1.25rem] body-light max-w-2xl mx-auto">
              Explore our complete collection of articles, tips, and insights
              from the debate community.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Results Count */}
          <div className="mb-6 text-center" data-aos="fade-up">
            <p className="font-body body-light">
              Showing{" "}
              <span className="font-semibold">{currentBlogs.length}</span> of{" "}
              <span className="font-semibold">{filteredBlogs.length}</span>{" "}
              blogs
            </p>
          </div>

          {/* Blog Grid */}
          {currentBlogs.length > 0 ? (
            <>
              <AllBlogs blogs={currentBlogs} />

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="text-center py-20" data-aos="fade-up">
              <p className="font-body text-[1.25rem] body-light">
                {searchQuery
                  ? `No blogs found matching "${searchQuery}". Try a different search term.`
                  : "No blogs found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
