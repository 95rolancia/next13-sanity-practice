"use client";

import { ProfileUser } from "@/model/user";
import Btn from "./ui/Btn";
import useMe from "@/hooks/me";

type Props = {
  user: ProfileUser;
};

export default function FollowBtn({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showBtn = loggedInUser && loggedInUser.username !== username;
  const following = !!(
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username)
  );

  console.log(loggedInUser);

  const text = following ? "팔로우 취소" : "팔로우";

  return (
    <>
      {showBtn && (
        <Btn
          text={text}
          onClick={() => {
            toggleFollow(user.id, following);
          }}
          red={following}
        />
      )}
    </>
  );
}
