import { ProductEntity } from "@/utils/entities";
import { joinUrl } from "@/utils/strings";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { Dispatch, SetStateAction } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface ProductTableProps {
  productStats: ProductEntity[];
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
}

// TODO: provide functionality of filtering products

export default function ProductTable({
  productStats,
  setToDeleteItemId,
}: ProductTableProps) {
  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
      {productStats.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-start items-center gap-2"
        >
          <Link to={joinUrl(pathname, product.id)}>
            <img
              src={product.images?.[0]?.file}
              alt={product.name}
              className="inline h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
            />
          </Link>

          <div className="text-center">{product.name}</div>

          <div className="flex justify-center items-center gap-4 text-lg">
            {/* <button
              className="hover:scale-125 transition"
              data-tooltip-id={`${product.id}-tooltip-edit`}
            >
              <FaEdit />
            </button> */}

            <button
              className="hover:scale-125 transition"
              data-tooltip-id={`${product.id}-tooltip-delete`}
              onClick={() => {
                setToDeleteItemId(product.id);
              }}
            >
              <FaTrashAlt />
            </button>
          </div>

          {/* <CustomTooltip id={`${product.id}-tooltip-edit`} content="edit" /> */}
          <CustomTooltip id={`${product.id}-tooltip-delete`} content="delete" />
        </div>
      ))}
    </div>
  );
}
