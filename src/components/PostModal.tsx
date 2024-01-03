import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="z-50 fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-neutral-900/70"
    >
      <button onClick={() => onClose()} className="fixed top-0 right-0 p-8 text-white">
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
