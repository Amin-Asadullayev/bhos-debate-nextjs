// "use client";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   useEffect(() => {
//     if (!window.localStorage.getItem("theme")) {
//       window.localStorage.setItem("theme", "dark");
//     }
//     setTheme(window.localStorage.getItem("theme"));
//   }, []);

//   const [theme, setTheme] = useState("dark");
//   const [isOpen, setIsOpen] = useState(false);
//   const [emoji, setEmoji] = useState("🌙");

//   useEffect(() => {
//     let rootWindow = window.document.documentElement;
//     if (theme === "dark") {
//       rootWindow.classList.add("dark");
//       window.localStorage.setItem("theme", "dark");
//       setEmoji("🌙");
//     } else {
//       rootWindow.classList.remove("dark");
//       window.localStorage.setItem("theme", "light");
//       setEmoji("☀️");
//     }
//   }, [theme]);

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
//               ☰
//             </button>
//           </div>

//           <div className="hidden sm:flex items-center space-x-4">
//             <a
//               href="#about"
//               className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               About
//             </a>
//             <a
//               href="#events"
//               className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               Events
//             </a>
//             <a
//               href="#join"
//               className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               Join Us
//             </a>
//             <a
//               href="#contact"
//               className="nav-link text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500"
//             >
//               Contact
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
//             <a href="#about" className="text-gray-700 dark:text-gray-200">
//               About
//             </a>
//             <a href="#events" className="text-gray-700 dark:text-gray-200">
//               Events
//             </a>
//             <a href="#join" className="text-gray-700 dark:text-gray-200">
//               Join Us
//             </a>
//             <a href="#contact" className="text-gray-700 dark:text-gray-200">
//               Contact
//             </a>
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="w-max p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//             >
//               {emoji}
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// const Header = () => {
//   return (
//     <section className="bg-primary text-white py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
//           Join the Art of Debate
//         </h2>
//         <p className="text-lg md:text-xl mb-8">
//           Engage in thought-provoking discussions and sharpen your critical
//           thinking skills.
//         </p>
//         <a
//           href="#join"
//           className="nav-link inline-block bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary-100 transition"
//         >
//           Get Involved
//         </a>
//       </div>
//     </section>
//   );
// };

// const About = () => {
//   return (
//     <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
//           About Our Club
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
//           The Debate Club is a vibrant community dedicated to fostering
//           intellectual growth, critical thinking, and effective communication.
//           We welcome individuals from all backgrounds to engage in respectful
//           and dynamic discussions on a wide range of topics.
//         </p>
//       </div>
//     </section>
//   );
// };

// const Events = () => {
//   let events = [
//     {
//       title: "Climate Change Debate",
//       date: "August 10, 2025",
//       desc: "Join us to discuss global climate policies.",
//       link: "https://google.com",
//     },
//     {
//       title: "Tech Ethics Forum",
//       date: "September 5, 2025",
//       desc: "Explore the ethical implications of AI.",
//       link: "https://google.com",
//     },
//     {
//       title: "Open Mic Debate",
//       date: "October 15, 2025",
//       desc: "Bring your topic and join the conversation!",
//       link: "https://google.com",
//     },
//   ];
//   return (
//     <section id="events" className="py-16 bg-white dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
//           Upcoming Events
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((item) => (
//             <a href={item.link} key={item.title}>
//               <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300">{item.date}</p>
//                 <p className="text-gray-600 dark:text-gray-300 mt-2">
//                   {item.desc}
//                 </p>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const JoinUs = () => {
//   return (
//     <section id="join" className="py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
//           Join Our Club
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//           Become a part of our community! Whether you're a seasoned debater or
//           just starting out, we have a place for you.
//         </p>
//         <a
//           href="#contact"
//           className="nav-link inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-200 transition"
//         >
//           Sign Up Now
//         </a>
//       </div>
//     </section>
//   );
// };

// const Contact = () => {
//   return (
//     <section id="contact" className="py-16 bg-white dark:bg-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
//           Contact Us
//         </h2>
//         <div className="max-w-lg mx-auto">
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <textarea
//               placeholder="Your Message"
//               className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
//               rows="5"
//             ></textarea>
//             <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-200 transition">
//               Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p>© 2025 BHOS Debate Club. All rights reserved.</p>
//         <div className="mt-4 flex justify-center space-x-4">
//           <a
//             target="_blank"
//             href="https://www.facebook.com/people/BHOS-Debate-Club/100074306918748/"
//             className="text-gray-400 hover:text-white"
//           >
//             Facebook
//           </a>
//           <a
//             target="_blank"
//             href="https://www.instagram.com/bhos.debate/"
//             className="text-gray-400 hover:text-white"
//           >
//             Instagram
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export { Navbar, Header, About, Events, JoinUs, Contact, Footer };
