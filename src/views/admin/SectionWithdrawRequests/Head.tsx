import HeadSearch from "@/views/shared_components/HeadSearch";

interface HeadProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Head({ searchValue, setSearchValue }: HeadProps) {
  return (
    <div className="flex justify-between flex-wrap items-center gap-3">
      {/* TODO: implement search function */}

      <HeadSearch
        placeholder="search requests ..."
        additionalStyle=""
        value={searchValue}
        onChangeValue={setSearchValue}
      />
    </div>
  );
}
