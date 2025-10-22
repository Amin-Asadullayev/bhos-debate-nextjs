export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import About from "@/components/About";
import News from "@/components/NewsSection";
import BlogSection from "@/components/BlogSection";
import JoinUs from "@/components/JoinUs";
import Contact from "@/components/Contact";
import { app } from "@/lib/firebase";
import { getDatabase, ref, get, query, orderByChild } from "firebase/database";

const database = getDatabase(app);

export const metadata = {
  title: "BHOS Debate Club",
  description: "BHOS Debate Club Home Page. The Baku Higher Oil School Debate Club is a vibrant community that nurtures intellectual curiosity, critical thinking, and persuasive communication, with a focus on public speaking and effective communication skills. Students from all disciplines are welcome to participate in dynamic, respectful discussions on a variety of topics.",
  openGraph: {
    title: "BHOS Debate Club",
    description: "BHOS Debate Club Home Page. The Baku Higher Oil School Debate Club is a vibrant community that nurtures intellectual curiosity, critical thinking, and persuasive communication, with a focus on public speaking and effective communication skills. Students from all disciplines are welcome to participate in dynamic, respectful discussions on a variety of topics.",
    url: "https://debate.bhos.club",
    siteName: "BHOS Debate Club",
  },
  twitter: {
    card: "summary_large_image",
    title: "BHOS Debate Club",
    description: "BHOS Debate Club Home Page. The Baku Higher Oil School Debate Club is a vibrant community that nurtures intellectual curiosity, critical thinking, and persuasive communication, with a focus on public speaking and effective communication skills. Students from all disciplines are welcome to participate in dynamic, respectful discussions on a variety of topics.",
  },
  keywords: ["Debate Club", "BHOS", "High School Debate", "Debate News", "Public Speaking", "Student Debate", "BHOS Students", "BANM", "Baki Ali Neft Mektebi", "Bakı Ali Neft Məktəbi", "Debat Klubu"],
};

export default async function Home() {
  const initialFetch = await get(
    query(ref(database, "blogs"), orderByChild("date"))
  );
  const initialFetch1 = await get(
    query(ref(database, "news"), orderByChild("date"))
  );
  const blogs = initialFetch.val() || {};
  const news = initialFetch1.val() || {};
  return (
    <>
      <Navbar />
      <Header />
      <div className="flex flex-col md:flex-row gap-5 mt-8 ml-5 mb-8 mr-5">
        <div className="md:w-1/2">
          <JoinUs />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <News news={news} />
          <BlogSection blogEntries={blogs} />
        </div>
      </div>

      <About />
      <Contact />
    </>
  );
}
