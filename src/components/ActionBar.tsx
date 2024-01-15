"use client";

import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleBtn from "./ui/ToggleBtn";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
  onComment: (comment: Comment) => void;
  children?: React.ReactNode;
};

export default function ActionBar({ post, onComment, children }: Props) {
  const { id, likes, createdAt } = post;

  const { user, setBookmark } = useMe();
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  const handleBookmark = async (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const { setLike } = usePosts();
  const liked = user ? likes.includes(user.username) : false;
  const handleLike = async (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleBtn
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleBtn
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>

      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
