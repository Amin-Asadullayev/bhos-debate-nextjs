import {FaFacebook, FaInstagram} from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>© 2025 BHOS Debate Club. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <a target="_blank" href="https://www.facebook.com/people/BHOS-Debate-Club/100074306918748/" className="text-2xl text-gray-400 hover:text-white"><FaFacebook /></a>
                    <a target="_blank" href="mailto:debate@bhos.edu.az" className="text-gray-400 text-2xl hover:text-white"><MdOutlineEmail /></a>
                    <a target="_blank" href="https://www.instagram.com/bhos.debate/" className="text-gray-400 text-2xl hover:text-white"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    )
}
export default Footer
