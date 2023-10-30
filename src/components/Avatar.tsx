type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/* provider에서 제공하는 이미지이므로 최적화가 힘듦 그래서 <img /> 사용 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rem]"
        alt="user image"
        src={image ?? ""}
        referrerPolicy="no-referrer" // 엑스박스 이미지 없애줌
      />
    </div>
  );
}
