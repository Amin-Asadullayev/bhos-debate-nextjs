import NewsCard from "./NewsCard";

function AllNews({ news }) {
  // Handle both array and object formats
  const newsArray = Array.isArray(news)
    ? news
    : Object.entries(news).map(([id, item]) => ({ ...item, id }));

  return (
    <div className="space-y-6 mb-8">
      {newsArray.map((newsItem, index) => (
        <NewsCard key={newsItem.id} news={newsItem} index={index} />
      ))}
    </div>
  );
}

export default AllNews;
