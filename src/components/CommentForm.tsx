"use client";

import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const submitComment = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      className="flex items-center px-3 order-t border-neutral-300 p-3"
      onSubmit={submitComment}
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-nome p-3"
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
