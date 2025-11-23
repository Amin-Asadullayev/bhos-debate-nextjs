import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import AOSProvider from "@/components/AOSProvider";

const lora = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "BHOS Debate Club",
  description: "BHOS Debate Club",
};

const setInitialTheme = `
(function() {
  try {
    const theme = window.localStorage.getItem('theme');
    if (
      theme === 'dark' || 
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html className={`scroll-smooth ${lora.className}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <AOSProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AOSProvider>
      </body>
    </html>
  );
}
