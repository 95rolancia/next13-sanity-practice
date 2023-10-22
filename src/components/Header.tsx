import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="flex justify-between p-4 border-2 border-sky-400">
      <Link href="/">
        <h1 className="text-2xl font-bold">Instantgram</h1>
      </Link>
      <Navbar />
    </header>
  );
}
