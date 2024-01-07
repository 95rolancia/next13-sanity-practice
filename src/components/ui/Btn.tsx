"use client";

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
};

export default function Btn({ text, onClick, red }: Props) {
  return (
    <button
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
