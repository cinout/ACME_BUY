import { Input } from "@headlessui/react";

interface HeadProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Head({ searchValue, setSearchValue }: HeadProps) {
  return (
    <div className="flex justify-between flex-wrap items-center gap-3">
      {/* TODO: implement search function */}
      <Input
        placeholder="search requests ..."
        name="search"
        type="text"
        className={
          "py-2 bg-transparent border-b-[1px] border-sky-200 px-2 text-sky-100 w-36 sm:w-64 ml-4 outline-none"
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
