import { CategoryEntity } from "@/utils/entities";
import HoverInfo from "@/views/shared_components/HoverInfo";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface CategoryTableProps {
  categoryStats: CategoryEntity[];
}

export default function CategoryTable({ categoryStats }: CategoryTableProps) {
  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
      {categoryStats.map((order) => (
        <div
          key={order.id}
          className="flex flex-col justify-start items-center gap-2"
        >
          <img
            src={order.image}
            alt={order.name}
            className="inline h-20 w-20 mt-10 rounded-md"
          />

          <div className="text-center">{order.name}</div>

          {/* TODO: implement the function of the two buttons */}
          <div className="flex justify-center items-center gap-4 text-lg">
            <HoverInfo content="edit">
              <button className="hover:scale-125 transition">
                <FaEdit />
              </button>
            </HoverInfo>

            <HoverInfo content="delete">
              <button className="hover:scale-125 transition">
                <FaTrashAlt />
              </button>
            </HoverInfo>
          </div>
        </div>
      ))}
    </div>
  );
}
