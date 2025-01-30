interface HeadSearchProps {
  placeholder?: string;
  additionalStyle?: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export default function HeadSearch({
  placeholder,
  additionalStyle,
  value,
  onChangeValue,
}: HeadSearchProps) {
  return (
    <input
      placeholder={placeholder}
      name="search"
      type="text"
      className={`bg-transparent border-b-[1px] border-sky-200 px-2 text-sky-100 w-36 sm:w-64 outline-none ${additionalStyle}`}
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
}
