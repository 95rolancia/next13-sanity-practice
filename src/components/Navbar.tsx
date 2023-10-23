"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import ColorButton from "./ui/ColorButton";
import { signOut, useSession } from "next-auth/react";

const LINKS = [
  {
    path: "/",
    icon: <HomeIcon />,
    selectedIcon: <HomeFillIcon />,
  },
  {
    path: "/search",
    icon: <SearchIcon />,
    selectedIcon: <SearchFillIcon />,
  },
  {
    path: "/new",
    icon: <NewIcon />,
    selectedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  console.log(pathname);

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {LINKS.map(({ path, icon, selectedIcon }) => (
          <li key={path}>
            <Link href={path}>{path === pathname ? selectedIcon : icon}</Link>
          </li>
        ))}

        {session ? (
          <ColorButton text="Sign Out" onClick={() => signOut()} />
        ) : (
          <ColorButton
            text="Sign In"
            onClick={() => router.push(`/auth/signin?callbackUrl=${location.href}`)}
          />
        )}
      </ul>
    </nav>
  );
}
