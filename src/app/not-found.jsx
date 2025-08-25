import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Not Found",
  description: "Not Found",
};

export default function NoPage() {
  return (
    <>
      <Navbar />
      <section
        id="about"
        className="py-16 min-h-screen bg-gray-50 dark:bg-gray-900 w-screen flex flex-col items-center justify-center"
      >
        <h2 className="text-5xl font-bold text-gray-900 dark:text-white text-center mb-8">
          404
        </h2>
        <p className="text-xl font-bold text-gray-900 dark:text-white text-center">
          The page you are looking for does not exist.
          Nəsə axtarırdın? :)
        </p>
      </section>
    </>
  );
}
