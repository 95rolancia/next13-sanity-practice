"use client";

import { ProfileUser } from "@/model/user";
import Btn from "./ui/Btn";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowBtn({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showBtn = loggedInUser && loggedInUser.username !== username;
  const following = !!(
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username)
  );

  const text = following ? "팔로우 취소" : "팔로우";

  return (
    <>
      {showBtn && (
        <div className="relative">
          {isUpdating && (
            <div className="z-20 absolute inset-0 flex justify-center items-center">
              <PulseLoader size={6} color="white" />
            </div>
          )}
          <Btn
            disabled={isUpdating}
            text={text}
            onClick={async () => {
              setIsFetching(true);
              await toggleFollow(user.id, following);
              setIsFetching(false);
              startTransition(() => {
                router.refresh();
              });
            }}
            red={following}
          />
        </div>
      )}
    </>
  );
}
