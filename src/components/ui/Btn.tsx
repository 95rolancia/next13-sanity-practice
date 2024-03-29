"use client";

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};

export default function Btn({ text, onClick, red, disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      } ${disabled && "opacity-80 text-transparent"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
