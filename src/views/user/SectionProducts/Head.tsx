import HeadSearch from "@/views/shared_components/HeadSearch";
import HeadShowCount from "@/views/shared_components/HeadShowCount";
import ButtonCreateNew from "@/views/shared_components/ButtonCreateNew";
import { Link, useLocation } from "react-router-dom";
import { joinUrl } from "@/utils/strings";

interface HeadProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  handleItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions: number[];
}

export default function Head({
  searchValue,
  setSearchValue,
  itemsPerPage,
  handleItemsPerPageChange,
  itemsPerPageOptions,
}: HeadProps) {
  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center items-end content-end gap-y-4 md:gap-y-0">
      {/* TODO: implement search function */}
      <HeadSearch
        placeholder="search products ..."
        additionalStyle="md:justify-self-start"
        value={searchValue}
        onChangeValue={setSearchValue}
      />

      <Link to={joinUrl(pathname, "new")}>
        <ButtonCreateNew content="New Product" />
      </Link>

      <HeadShowCount
        itemsPerPage={itemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        handleItemsPerPageChange={handleItemsPerPageChange}
        additionalStyle="md:justify-self-end"
      />
    </div>
  );
}
