import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";
import Avatar from "./Avatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log(comments);

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <div className="flex items-center p-2">
          <Avatar image={userImage} highlight size="medium" />
          <span className="text-grar-900 font-bold ml-2">{username}</span>
        </div>
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, idx) => (
                <li key={idx} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{username}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentForm />
      </div>
    </section>
  );
}
