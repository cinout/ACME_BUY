import { ProductEntity } from "@/utils/entities";
import { albumCoverImageSmall, joinUrl } from "@/utils/strings";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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

  const imagesRef = useRef<Map<string, HTMLImageElement | null>>(null);
  function getImageRefMap() {
    if (!imagesRef.current) {
      // Initialize the Map on first usage.
      imagesRef.current = new Map();
    }
    return imagesRef.current;
  }

  const [imageGridOnLoad, setImageGridOnLoad] = useState<Map<string, boolean>>(
    new Map(productStats.map((product) => [product.id, false]))
  ); // loading state checker

  useEffect(() => {
    const map = getImageRefMap();

    productStats.forEach((product) => {
      const imageRef = map.get(product.id);

      if (imageRef) {
        setImageGridOnLoad((prevMap) => {
          const newMap = new Map(prevMap); // Create a new Map instance
          newMap.set(product.id, true); // Update the value
          return newMap; // Return the new map to trigger re-render
        });

        const handleLoad = () => {
          setImageGridOnLoad((prevMap) => {
            const newMap = new Map(prevMap); // Create a new Map instance
            newMap.set(product.id, false); // Update the value
            return newMap; // Return the new map to trigger re-render
          });
        };

        const handleError = () => {
          setImageGridOnLoad((prevMap) => {
            const newMap = new Map(prevMap); // Create a new Map instance
            newMap.set(product.id, false); // Update the value
            return newMap; // Return the new map to trigger re-render
          });
        };

        // Attach event listeners
        imageRef.onload = handleLoad;
        imageRef.onerror = handleError;
      }
    });
  }, [productStats]);

  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start">
      {productStats.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-start items-center gap-2"
        >
          <Link to={joinUrl(pathname, product.id)}>
            {/* TODO:[2] show stand-in effect when loading image */}
            {imageGridOnLoad.get(product.id) ? (
              <div className="inline-flex justify-center items-center h-20 w-20 mt-10 rounded-md outline ">
                <LoadingIndicator />
              </div>
            ) : (
              <img
                src={albumCoverImageSmall(product.images?.[0]?.file)}
                alt={product.name}
                className="inline h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
                ref={(node) => {
                  const map = getImageRefMap();
                  map.set(product.id, node);
                  return () => {
                    // called when removing
                    map.delete(product.id);
                  };
                }}
              />
            )}
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
