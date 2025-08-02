import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import About from '@/components/About'
import Events from '@/components/Events'
import JoinUs from '@/components/JoinUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home(){
    return (<>
        <Navbar/>
        <Header/>
        <About/>
        <Events/>
        <JoinUs/>
        <Contact/>
        <Footer/>
        </>)
}