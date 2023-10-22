"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";

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

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {LINKS.map(({ path, icon, selectedIcon }) => (
          <li key={path}>
            <Link href={path}>{path === pathname ? selectedIcon : icon}</Link>
          </li>
        ))}
        <li>
          <button className="border-2 p-1">로그인</button>
        </li>
      </ul>
    </nav>
  );
}
