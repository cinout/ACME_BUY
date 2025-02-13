import { GenreEntity } from "@/utils/entities";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import { Dispatch, SetStateAction } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { joinUrl } from "@/utils/strings";

interface GenreTableProps {
  genreStats: GenreEntity[];
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
}

export default function GenreTable({
  genreStats,
  setToDeleteItemId,
}: GenreTableProps) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
        {genreStats.map((genre) => (
          <div
            key={genre.id}
            className="flex flex-col justify-start items-center gap-2"
          >
            <Link to={joinUrl(pathname, genre.id)}>
              <img
                src={genre.imageUrl}
                alt={genre.name}
                className="inline h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
              />
            </Link>

            <div className="text-center">{genre.name}</div>

            <div className="flex justify-center items-center gap-4 text-lg">
              <Link
                className="hover:scale-125 transition"
                data-tooltip-id={`${genre.id}-tooltip-edit`}
                to={joinUrl(pathname, genre.id)}
              >
                <FaEdit />
              </Link>

              <button
                className="hover:scale-125 transition"
                data-tooltip-id={`${genre.id}-tooltip-delete`}
                onClick={() => {
                  setToDeleteItemId(genre.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>

            <CustomTooltip id={`${genre.id}-tooltip-edit`} content="edit" />
            <CustomTooltip id={`${genre.id}-tooltip-delete`} content="delete" />
          </div>
        ))}
      </div>
    </>
  );
}
