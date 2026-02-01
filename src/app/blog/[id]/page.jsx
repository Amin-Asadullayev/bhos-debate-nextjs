"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { app } from "@/lib/firebase";
import { getDatabase, ref, get } from "firebase/database";
import Swiper from "@/components/Swiper";

const database = getDatabase(app);

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await get(ref(database, `blogs/${params.id}`));
        const blogData = res.val();

        if (blogData) {
          const date = new Date(-blogData.date);
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

          setBlog({
            ...blogData,
            formattedDate,
          });
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-white pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="font-body text-[1.25rem] body-light text-center">
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-white pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="font-body text-[1.25rem] body-light text-center">
            Blog not found.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="btn-light inline-flex items-center gap-2 px-8 py-3 rounded-lg transition"
            >
              <ArrowLeft size={20} />
              Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Function to parse content with headings and paragraphs
  const renderContent = (content) => {
    if (!content) return null;

    // Strip HTML tags for plain text rendering
    const strippedContent = content.replace(/<[^>]+>/g, "");
    const paragraphs = strippedContent.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="font-baskerville text-[2rem] h2-light mt-8 mb-4 italic"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.trim()) {
        return (
          <p
            key={index}
            className="font-body text-[1.125rem] leading-relaxed body-light mb-6"
          >
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1
          className="font-baskerville text-[3rem] md:text-[4rem] h2-light leading-tight italic mb-4"
          data-aos="fade-up"
        >
          {blog.title}
        </h1>

        {/* Date */}
        <p
          className="body-light text-sm mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {blog.formattedDate}
        </p>

        {/* Image */}
        {blog.thumbnail && (
          <div className="mb-10" data-aos="fade-up" data-aos-delay="150">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full shadow-lg object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article
          className="prose prose-lg max-w-none body-light blog-post"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {renderContent(blog.content)}
        </article>

        {/* Swiper for galleries in content */}
        <Swiper selector=".swiper" />

        {/* Bottom Button */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "var(--light-border)" }}
          data-aos="fade-up"
        >
          <Link
            href="/blog"
            className="btn-light inline-flex items-center gap-2 px-8 py-3 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
