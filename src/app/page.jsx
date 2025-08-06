export const dynamic = "force-dynamic"
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import About from '@/components/About'
import Events from '@/components/Events'
import BlogSection from '@/components/BlogSection'
import JoinUs from '@/components/JoinUs'
import Contact from '@/components/Contact'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, query, orderByChild } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default async function Home(){
    const initialFetch = await get(query(ref(database, "blogs"), orderByChild("date")))
    const blogs = initialFetch.val() || {}
    return (<>
        <Navbar/>
        <Header/>
        <About/>
        <Events/>
        <BlogSection blogEntries={blogs}/>
        <JoinUs/>
        <Contact/>
        </>)
}