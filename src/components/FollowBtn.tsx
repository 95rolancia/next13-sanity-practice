"use client";

import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Btn from "./ui/Btn";

type Props = {
  user: ProfileUser;
};

export default function FollowBtn({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");

  const showBtn = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? "팔로우취소" : "팔로우";

  return (
    <>
      {showBtn && (
        <Btn text={text} onClick={() => {}} red={text === "팔로우취소"} />
      )}
    </>
  );
}
