interface HoverInfoProps {
  content: string;
  children: React.ReactNode;
  additionalStyle?: string;
}
export default function HoverInfo({
  content,
  children,
  additionalStyle,
}: HoverInfoProps) {
  // TODO: fix the rendering that may be cut by the parent div
  return (
    <div
      className={`group relative inline-flex justify-center items-center ${additionalStyle}`}
    >
      {children}
      <div className="z-[70] absolute top-[120%] px-2 rounded-md bg-black/50 text-white text-[0.7rem] hidden group-hover:flex w-max pointer-events-none">
        {content}
      </div>
    </div>
  );
}
