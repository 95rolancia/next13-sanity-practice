import useSWR from "swr";
import { HomeUser, SimpleUser } from "@/model/user";

async function updateBookmark(id: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(id: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = async (postId: string, bookmark: boolean) => {
    if (!user) return;

    const bookmarks = user.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((b) => b !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const toggleFollow = (id: string, follow: boolean) => {
    if (!user) return;

    return mutate(updateFollow(id, follow), {
      populateCache: false,
    });
  };

  return { user, isLoading, error, setBookmark, toggleFollow };
}
