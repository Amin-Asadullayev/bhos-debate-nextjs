"use client";
import { useState, useEffect } from "react";
import { AiFillSun } from "react-icons/ai";
import { AiOutlineMoon } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

export default function Navbar() {

  const [theme, setTheme] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    const ifDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = getTheme || (ifDark ? 'dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    localStorage.setItem("theme", initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark', theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const emoji = (theme === "dark" ? <AiOutlineMoon /> : <AiFillSun />);
  if (theme === null) return null

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="w-screen  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <a href="/" className="flex items-center space-x-2">
            <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              BHOS Debate Club
            </h1>
          </a>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillCaretDown
                className={`transform transition-transform duration-100 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="hidden sm:flex items-center float-right space-x-4">
            <a
              href="/"
              className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
            >
              Home
            </a>
            <a
              href="/blog"
              className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
            >
              Blog
            </a>
            <a
              href="/news"
              className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
            >
              News
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {emoji}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden flex flex-col space-y-2 mt-2 px-2 pb-3 ">
            <a
              href="/"
              className="mx-auto text-gray-700 dark:text-gray-200"
            >
              Home
            </a>
            <a
              href="/blog"
              className="mx-auto text-gray-700 dark:text-gray-200"
            >
              Blog
            </a>
            <a
              href="/news"
              className="mx-auto text-gray-700 dark:text-gray-200"
            >
              News
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition duration-200 flex items-right justify-center w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {emoji}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
