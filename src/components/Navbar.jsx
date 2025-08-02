"use client"
import {useState, useEffect} from 'react'
export default function Navbar() {
    useEffect(() => {
        if (!window.localStorage.getItem("theme")) {
            window.localStorage.setItem("theme", "dark")
        }
        setTheme(window.localStorage.getItem("theme"))
    }, [])
    const [theme, setTheme] = useState("dark")
    const [isOpen, setIsOpen] = useState(false);
    const [emoji, setEmoji] = useState("🌙")
    useEffect(() => {
        let rootWindow = window.document.documentElement;
        if (theme === "dark") {
            rootWindow.classList.add("dark")
            window.localStorage.setItem("theme", "dark")
            setEmoji("🌙")
        } else {
            rootWindow.classList.remove("dark")
            window.localStorage.setItem("theme", "light")
            setEmoji("☀️")
        }
    }, [theme])

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            ☰
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center space-x-4">
                        <a href="#about" className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500">About</a>
                        <a href="#events" className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500">Events</a>
                        <a href="#join" className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500">Join Us</a>
                        <a href="#contact" className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500">Contact</a>
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{emoji}</button>
                    </div>
                </div>

                {isOpen && (
                    <div className="sm:hidden flex flex-col space-y-2 mt-2 px-2 pb-3 ">
                        <a href="#about" className="text-gray-700 dark:text-gray-200">About</a>
                        <a href="#events" className="text-gray-700 dark:text-gray-200">Events</a>
                        <a href="#join" className="text-gray-700 dark:text-gray-200">Join Us</a>
                        <a href="#contact" className="text-gray-700 dark:text-gray-200">Contact</a>
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-max p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{emoji}</button>
                    </div>
                )}
            </div>
        </nav>
    );
}
