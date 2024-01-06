"use client";

import { ProfileUser } from "@/model/user";
import { FormEvent, useState } from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/useDebounce";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^[^a-zA-Z0-9]+$/.test(inputValue.charAt(0))) {
              setKeyword("");
            } else {
              setKeyword(inputValue);
            }
          }}
        />
      </form>
      {error && <p>Error!</p>}
      {isLoading && <GridLoader />}

      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}

      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
