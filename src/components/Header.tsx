import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="flex justify-between p-4 border-b border-sky-400 sticky top-0 bg-white z-10">
      <Link href="/">
        <h1 className="text-2xl font-bold">Instantgram</h1>
      </Link>
      <Navbar />
    </header>
  );
}
