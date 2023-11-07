"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import ColorButton from "./ui/ColorButton";
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";

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
  const user = session?.user;

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {LINKS.map(({ path, icon, selectedIcon }) => (
          <li key={path}>
            <Link href={path}>{path === pathname ? selectedIcon : icon}</Link>
          </li>
        ))}

        {user && (
          <li>
            <Link href={`/user/${user.username}`}>
              <Avatar image={user.image} size="small" highlight />
            </Link>
          </li>
        )}
        {session ? (
          <li>
            <ColorButton text="Sign Out" onClick={() => signOut()} />
          </li>
        ) : (
          <li>
            <ColorButton text="Sign In" onClick={() => signIn()} />
          </li>
        )}
      </ul>
    </nav>
  );
}
