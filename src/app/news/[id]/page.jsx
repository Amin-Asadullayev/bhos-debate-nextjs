import { app } from "@/lib/firebase";
import { getDatabase, ref, get } from "firebase/database";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { notFound } from "next/navigation";
import Swiper from "@/components/Swiper";
import Navbar from "@/components/Navbar";

const database = getDatabase(app);
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export async function generateStaticParams() {
  const res = await get(ref(database, "news"));
  const news = res.val();
  if (!news) return [];

  return Object.keys(news).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;
  const res = await get(ref(database, `news/${param.id}`));
  const blog = res.val();

  return {
    title: `${blog.title} - BHOS Debate Club`,
    description: blog.title,
    openGraph: {
      title: `${blog.title} - BHOS Debate Club`,
      description: blog.title,
      url: "https://debate.bhos.club",
      siteName: "BHOS Debate Club",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - BHOS Debate Club`,
      description: blog.title,
    },
  };
}

export default async function BlogPost({ params }) {
  const param = await params;
  const res = await get(ref(database, `news/${param.id}`));
  const new_ = res.val();

  if (!new_) {
    notFound();
  }

  return (
    <>
      <div className="blog-post max-w-4xl mx-auto">
        <h1 className="text-center">{new_.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(new_.content) }}
        />
        <Swiper selector=".swiper" />
      </div>
    </>
  );
}
