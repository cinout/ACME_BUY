import { IoMdAdd } from "react-icons/io";

interface ButtonCreateNewProps {
  content: string;
  onClick?: () => void;
}
export default function ButtonCreateNew({
  content,
  onClick,
}: ButtonCreateNewProps) {
  return (
    <button
      className="flex justify-center items-center gap-x-1  text-white h-7 w-32 rounded-md text-sm font-bold px-2 box-content border-2 hover:w-36 bg-sky-700 hover:bg-sky-900 transition-all"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <IoMdAdd />
      <span>{content}</span>
    </button>
  );
}
