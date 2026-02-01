"use client";

import { useState, useMemo, useEffect } from "react";
import { app } from "@/lib/firebase";
import { getDatabase, ref, get, orderByChild, query } from "firebase/database";
import SearchBar from "@/components/SearchBar";
import AllNews from "@/components/AllNews";
import Pagination from "@/components/Pagination";

const database = getDatabase(app);

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  // Fetch news from Firebase
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await get(query(ref(database, "news"), orderByChild("date")));
        const news = res.val();
        
        if (news) {
          // Convert to array format with id, title, content, image, date
          const formattedNews = Object.entries(news).reverse().map(([id, newsItem]) => {
            const date = new Date(-newsItem.date);
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
              title: newsItem.title,
              content: newsItem.content,
              image: newsItem.thumbnail,
              date: formattedDate,
            };
          });
          setNewsItems(formattedNews);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery) return newsItems;

    return newsItems.filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, newsItems]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

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
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-body text-[1.25rem] body-light">Loading news...</p>
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="font-baskerville max-md:mt-4 text-[3rem] md:text-[5rem] h2-light mb-4 italic">
              Latest News
            </h1>
            <p className="font-body text-[1.25rem] body-light max-w-2xl mx-auto">
              Stay updated with the latest achievements, events, and
              announcements from our debate community.
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
              <span className="font-semibold">{currentNews.length}</span> of{" "}
              <span className="font-semibold">{filteredNews.length}</span> news
              items
            </p>
          </div>

          {/* News List */}
          {currentNews.length > 0 ? (
            <>
              <AllNews news={currentNews} />

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
                  ? `No news found matching "${searchQuery}". Try a different search term.`
                  : "No news found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
