"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import { AuthUser } from "@/model/user";
import Image from "next/image";
import Avatar from "./Avatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Btn from "./ui/Btn";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <Avatar image={user.image} />
      <form className="w-full flex flex-col mt-2 rounded-sm">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
          )}

          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>이미지를 드래그해서 넣어주세요</p>
            </div>
          )}

          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300 p-2"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="내용을 적어주세요"
        ></textarea>
        <Btn text="작성" onClick={() => {}} />
      </form>
    </section>
  );
}
