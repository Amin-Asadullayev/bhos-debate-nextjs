import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database"
import createDOMPurify from 'isomorphic-dompurify'
import {JSDOM} from 'jsdom'
import NoPage from "../../not-found.jsx"
import dynamic from "next/dynamic.js";
import Footer from '@/components/Footer'

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })

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

const fetchData = async (id) => {
  try {
    const snap = await get(ref(database, id));
    if (snap.exists()) {
      return snap.val()
    } else {
      return "_"
    }
  } catch (err) {
    return "_"
  }
}

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

export default async function BlogPost({params}) {
  const param = await params;
  const blogData = await fetchData(param.id)
  return (
    <>
      {(blogData && blogData != "_") && <>
        <Navbar/>
        <div className="blog-post">
          <h1>{blogData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData.content) }}>
          </div>
        </div>
        <Footer />
      </>}
      {(blogData == "_") && <NoPage />}
    </>
  )

}
