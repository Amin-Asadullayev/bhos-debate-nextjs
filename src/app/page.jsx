import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import About from '@/components/About'
import Events from '@/components/Events'
import BlogSection from '@/components/BlogSection'
import JoinUs from '@/components/JoinUs'
import Contact from '@/components/Contact'

export default function Home(){
    return (<>
        <Navbar/>
        <Header/>
        <About/>
        <Events/>
        <BlogSection/>
        <JoinUs/>
        <Contact/>
        </>)
}