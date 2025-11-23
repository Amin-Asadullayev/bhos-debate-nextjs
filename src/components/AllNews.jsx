import NewsCard from "./NewsCard"

function AllNews({ news }) {
  return (
    <div className="space-y-6 mb-8">
      {Object.entries(news).map(([id, item], index) => (
        <NewsCard key={id} news={{...item, id}} index={index} />
      ))}
    </div>
  )
}

export default AllNews