import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white relative group transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>© 2025 BHOS Debate Club. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a target="_blank" href="https://www.facebook.com/people/BHOS-Debate-Club/100074306918748/" className="text-2xl text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300" >
            <FaFacebook />
          </a>
          <a
            target="_blank"
            href="mailto:contact@debate.bhos.club"
            className="text-2xl text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300"
          >
            <MdOutlineEmail />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/bhos.debate.club/"
            className="text-2xl text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-300"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
