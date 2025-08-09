export const dynamic = "force-dynamic"
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import About from '@/components/About'
import News from '@/components/NewsSection'
import BlogSection from '@/components/BlogSection'
import JoinUs from '@/components/JoinUs'
import Contact from '@/components/Contact'
import { app } from "@/lib/firebase"
import { getDatabase, ref, get, query, orderByChild } from "firebase/database";

const database = getDatabase(app);

export const metadata = {
  title: "BHOS Debate Club",
  description: "BHOS Debate Club Home Page",
    openGraph: {
      title: "BHOS Debate Club",
      description: "BHOS Debate Club Home Page",
      url: 'https://debate.bhos.club',
      siteName: 'BHOS Debate Club',
    },
    twitter: {
      card: 'summary_large_image',
      title: "BHOS Debate Club",
      description: "BHOS Debate Club Home Page",
    },
};

export default async function Home(){
    const initialFetch = await get(query(ref(database, "blogs"), orderByChild("date")))
    const initialFetch1 = await get(query(ref(database, "news"), orderByChild("date")))
    const blogs = initialFetch.val() || {}
    const news = initialFetch1.val() || {}
    return (<>
        <Navbar/>
        <Header/>
        <About/>
        <News news={news}/>
        <BlogSection blogEntries={blogs}/>
        <JoinUs/>
        <Contact/>
        </>)
}