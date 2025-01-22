import { CategoryEntity } from "@/utils/entities";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

interface CategoryTableProps {
  categoryStats: CategoryEntity[];
}

export default function CategoryTable({ categoryStats }: CategoryTableProps) {
  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
      {categoryStats.map((category) => (
        <div
          key={category.id}
          className="flex flex-col justify-start items-center gap-2"
        >
          <img
            src={category.image}
            alt={category.name}
            className="inline h-20 w-20 mt-10 rounded-md"
          />

          <div className="text-center">{category.name}</div>

          {/* TODO: implement the function of the two buttons */}
          <div className="flex justify-center items-center gap-4 text-lg">
            <button
              className="hover:scale-125 transition"
              data-tooltip-id={`${category.id}-tooltip-edit`}
            >
              <FaEdit />
            </button>

            <button
              className="hover:scale-125 transition"
              data-tooltip-id={`${category.id}-tooltip-delete`}
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
  );
}
