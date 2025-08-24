export const dynamic = "force-dynamic"
import Navbar from '@/components/Navbar'

export const metadata = {
  title: "BHOS Debate Club",
  description: "BHOS Debate Club Home Page",
  openGraph: {
    title: "BHOS Debate Club",
    description: "BHOS Debate Club Home Page",
    url: 'https://debate.bhos.club',
    siteName: 'BHOS Debate Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BHOS Debate Club",
    description: "BHOS Debate Club Home Page",
  },
};

export default function Password() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-[120px] font-bold text-black dark:text-gray-200 mb-4">
          Nə Axtarırsan balaca?
        </h1>
        <h1 className="text-3xl font-bold text-black dark:text-gray-200 mb-4">
          <a
            href="https://youtu.be/dQw4w9WgXcQ?si=3KYq1AyzXaxxdG1q"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-gray-400 hover:underline"
          >
            AdminPasswords.txt
          </a>
        </h1>

      </div>
    </>
  )
}
