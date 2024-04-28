import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Link
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        href={"/authentication/register"}
      >
        Register
      </Link>
      <Link
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        href={"/authentication/login"}
      >
        Login
      </Link>
    </main>
  );
}
