import { CategoryEntity } from "@/utils/entities";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { Dispatch, SetStateAction } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { joinUrl } from "@/utils/strings";

interface CategoryTableProps {
  categoryStats: CategoryEntity[];
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
}

export default function CategoryTable({
  categoryStats,
  setToDeleteItemId,
}: CategoryTableProps) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
        {categoryStats.map((category) => (
          <div
            key={category.id}
            className="flex flex-col justify-start items-center gap-2"
          >
            <Link to={joinUrl(pathname, category.id)}>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="inline h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
              />
            </Link>

            <div className="text-center">{category.name}</div>

            <div className="flex justify-center items-center gap-4 text-lg">
              <Link
                className="hover:scale-125 transition"
                data-tooltip-id={`${category.id}-tooltip-edit`}
                to={joinUrl(pathname, category.id)}
              >
                <FaEdit />
              </Link>

              <button
                className="hover:scale-125 transition"
                data-tooltip-id={`${category.id}-tooltip-delete`}
                onClick={() => {
                  setToDeleteItemId(category.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>

            <CustomTooltip id={`${category.id}-tooltip-edit`} content="edit" />
            <CustomTooltip
              id={`${category.id}-tooltip-delete`}
              content="delete"
            />
          </div>
        ))}
      </div>
    </>
  );
}
