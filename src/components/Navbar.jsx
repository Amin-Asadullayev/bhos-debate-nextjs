// "use client";
// import { useState, useEffect } from "react";
// import { AiFillSun } from "react-icons/ai";
// import { AiOutlineMoon } from "react-icons/ai";
// import { AiFillCaretDown } from "react-icons/ai";

// export default function Navbar() {

//   const [theme, setTheme] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const getTheme = localStorage.getItem("theme");
//     const ifDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     const initialTheme = getTheme || (ifDark ? "dark" : "light");
//     setTheme(initialTheme);
//     document.documentElement.classList.toggle("dark", initialTheme === 'dark');
//     localStorage.setItem("theme", initialTheme);
//   }, []);

//   useEffect(() => {
//     if (theme) {
//       document.documentElement.classList.toggle("dark", theme === "dark");
//       localStorage.setItem("theme", theme);
//     }
//   }, [theme]);

//   const emoji = (theme === "dark" ? <AiOutlineMoon /> : <AiFillSun />);
//   if (theme === null) return null

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10, py-1">
//       <div className="w-full   px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14">
//           <a href="/" className="flex items-center space-x-2">
//             <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
//             <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
//               BHOS Debate Club
//             </h1>
//           </a>

//           <div className="sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <AiFillCaretDown
//                 className={`transform transition-transform duration-100 ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//           </div>

//           <div className="hidden sm:flex items-center float-right space-x-4">
//             <a
//               href="/"
//               className="nav-link text-1x1 text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               Home
//             </a>
//             <a
//               href="/blog"
//               className="nav-link text-1xl text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               Blog
//             </a>
//             <a
//               href="/news"
//               className="nav-link text-1x1 text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               News
//             </a>
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//             >
//               {emoji}
//             </button>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="sm:hidden flex flex-col space-y-2 mt-2 px-2 pb-3 ">
//             <a
//               href="/"
//               className="mx-auto text-gray-700 dark:text-gray-200"
//             >
//               Home
//             </a>
//             <a
//               href="/blog"
//               className="mx-auto text-gray-700 dark:text-gray-200"
//             >
//               Blog
//             </a>
//             <a
//               href="/news"
//               className="mx-auto text-gray-700 dark:text-gray-200"
//             >
//               News
//             </a>
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="transition duration-200 flex items-right justify-center w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//             >
//               {emoji}
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header-dark px-6 fixed w-full top-0 z-50">
      <nav className="max-w-7xl py-1 mx-auto flex items-center h-20 relative px-2 md:px-6">

        {/* LEFT GROUP: pages + logo */}
        <div className="flex items-center gap-20">

          {/* Pages */}
          <div className="hidden md:flex gap-12 items-center font-body text-md tracking-widest uppercase">
            <Link
              to="/" 
              className="body-dark hover:opacity-70 transition-colors border-b-2 border-transparent hover:border-current pb-1"
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="body-dark hover:opacity-70 transition-colors border-b-2 border-transparent hover:border-current pb-1"
            >
              Blog
            </Link>
            <Link 
              to="/news" 
              className="body-dark hover:opacity-70 transition-colors border-b-2 border-transparent hover:border-current pb-1"
            >
              News
            </Link>
          </div>

          {/* Logo — absolutely centered in the navbar */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" onClick={closeMenu}>
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                <img src="../../img/logo.png" alt="logo" className="w-full h-full object-contain" />
              </div>
            </Link>
          </div>

        </div>

        {/* RIGHT BUTTON */}
        <div className="hidden md:flex ml-auto font-body text-md tracking-widest uppercase">
          <button 
            onClick={scrollToContact}
            className="btn-dark border-2 border-transparent cursor-pointer uppercase px-6 py-2 transition-all"
          >
            Join Us
          </button>
        </div>

        {/* Mobile hamburger exactly unchanged */}
        <div className="md:hidden absolute left-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="body-dark transition-colors hover:opacity-70"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="md:hidden w-7"></div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#030b1fc2] z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`md:hidden fixed top-0 left-0 h-full w-72 header-dark transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button 
              onClick={closeMenu}
              className="body-dark transition-colors hover:opacity-70"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-6 px-8 font-body">
            <Link
              to="/"
              onClick={closeMenu}
              className="body-dark text-xl uppercase tracking-wide hover:opacity-70 transition-colors pb-3 border-b border-gray-700"
            >
              Home
            </Link>
            <Link
              to="/blog"
              onClick={closeMenu}
              className="body-dark text-xl uppercase tracking-wide hover:opacity-70 transition-colors pb-3 border-b border-gray-700"
            >
              Blog
            </Link>
            <Link
              to="/news"
              onClick={closeMenu}
              className="body-dark text-xl uppercase tracking-wide hover:opacity-70 transition-colors pb-3 border-b border-gray-700"
            >
              News
            </Link>
            <button
              onClick={scrollToContact}
              className="body-dark text-xl uppercase tracking-wide hover:opacity-70 transition-colors pb-3 border-b border-gray-700 text-left"
            >
              Contact
            </button>
            
            {/* Join Us Button */}
            <button
              onClick={scrollToContact}
              className="btn-dark mt-4 font-semibold px-8 py-3 rounded uppercase tracking-wide transition-all"
            >
              Join Us
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
