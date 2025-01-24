import { ReactNode } from "react";

export default function SignInOptionButton({
  children,
  additionalStyle,
  handleClick,
}: {
  children: ReactNode;
  additionalStyle?: string;
  handleClick?: () => void;
}) {
  return (
    <button
      className={`rounded-md text-sky-900 border-sky-900 border-2 px-3 py-0.5 flex justify-center items-center ${additionalStyle}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
