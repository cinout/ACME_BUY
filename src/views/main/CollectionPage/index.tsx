import {
  GQL_PRODUCT_GET_COLLECTION,
  ProductEntity,
} from "@/graphql/productGql";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { albumCoverImageLarge, capFirstLetter } from "@/utils/strings";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import FilterSection from "./FilterSection";
import { iconCrossClose } from "@/utils/icons";
import Pagination from "@/views/shared_components/Pagination";
import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import { useEffect, useMemo, useRef } from "react";
import {
  sortingOptions,
  useHookQueryParams,
} from "@/customHooks/useHookQueryParams";

const styleContentPadding = "px-2 sm:px-4 lg:px-8";
const cssPlaceholderContainer = "w-full aspect-square bg-aqua-forest-50";

const ITEMS_PER_PAGE = 40;

export default function CollectionPage() {
  /**
   * GQL [1]
   */

  const {
    filterOptions,
    searchParams,
    setSearchParams,
    currentPage,
    currentQuery,
    finalSorting,
    genreOptions,
    filtersWithOptions,
    allGenres,
  } = useHookQueryParams();

  /**
   * GQL [2]
   */
  // Products
  const gqlProductCollection = useQuery(GQL_PRODUCT_GET_COLLECTION, {
    variables: {
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      sorting: finalSorting,
      filters: {
        ...filterOptions,
        genre:
          filterOptions.genre &&
          genreOptions?.find((a) => a.displayValue === filterOptions.genre)?.id,
        query: currentQuery,
      },
    },
    skip: !allGenres,
  });
  const paginatedResult = gqlProductCollection.data?.getCollection as {
    products: ProductEntity[];
    count: number;
  };
  const totalCount = paginatedResult?.count;
  const currentPageProducts = paginatedResult?.products;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  /**
   * Effect:
   * if filter value changes, set page to 1
   * */
  // In STRICT MODE, this may have error
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      // First time: skip
      hasMounted.current = true;
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    setSearchParams(newParams);
  }, [
    filterOptions.genre,
    filterOptions.format,
    filterOptions.year,
    filterOptions.grading,
    filterOptions.region,
    currentQuery,
  ]);

  /**
   * Hooks
   */
  const imageIds = useMemo(() => {
    return currentPageProducts?.map((a) => a.id) || [];
  }, [currentPageProducts]);

  const { getImageRefMap, imageGridOnLoad } =
    useHookMultipleImageLoading(imageIds);

  return (
    <>
      {/* Filters: Small Screen */}
      <div className="block sm:hidden font-arsenal-spaced-1 text-aqua-forest-700 mb-6">
        <FilterSection
          filterOptions={filterOptions}
          filtersWithOptions={filtersWithOptions}
        />
      </div>

      <div className="flex">
        {/* Left: Filters (Large Screen) */}
        <div className="hidden sm:block   w-[11rem] font-arsenal-spaced-1 text-aqua-forest-700">
          <FilterSection
            filterOptions={filterOptions}
            filtersWithOptions={filtersWithOptions}
          />
        </div>

        {/* Right: Sorting + Content */}
        <div className="flex-1 ">
          {/* Sort by */}
          <div
            className={`${styleContentPadding} flex items-center gap-x-2 font-lato mb-4`}
          >
            <label htmlFor="sorting">Sort by</label>
            <select
              name="sorting"
              id="sorting"
              className="cursor-pointer border-b border-sky-700 text-sky-700 outline-none w-fit px-2"
              value={finalSorting}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("sorting", e.target.value);
                setSearchParams(newParams);
              }}
            >
              {sortingOptions.map(({ id, displayValue }) => (
                <option key={id} value={id}>
                  {displayValue}
                </option>
              ))}
            </select>
          </div>

          {/* Current Filters */}
          <div
            className={`${styleContentPadding} flex flex-wrap gap-2 my-3 font-lato`}
          >
            {[["query", currentQuery]]
              .concat(Object.entries(filterOptions))
              .map(([title, value]) => (
                <div
                  key={title}
                  className={`bg-sky-800 text-sky-100 py-1 px-2 rounded-[0.24rem] ${
                    value ? "inline-flex items-center gap-1" : "hidden"
                  }`}
                >
                  <span className="font-bold"> {capFirstLetter(title)}: </span>
                  <span>{value}</span>
                  <button
                    className="ml-2 text-xl bg-sky-100 text-sky-800 rounded-sm hover:scale-105 transition"
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.delete(title!); // Remove the parameter
                      setSearchParams(newParams); // Update the URL
                    }}
                  >
                    {iconCrossClose()}
                  </button>
                </div>
              ))}
          </div>

          {/* Contents */}
          {totalCount === 0 ? (
            <div className="flex justify-center mt-12 font-arsenal-spaced-1 text-aqua-forest-800">
              No matching product.
            </div>
          ) : (
            <>
              <div className="my-4 text-sm font-lato italic text-sky-700 flex justify-end">
                found {totalCount} {totalCount === 1 ? "product" : "products"}{" "}
                ...
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 text-center">
                {currentPageProducts?.map((product) => (
                  <div
                    key={product.id}
                    className={`w-full py-3 flex flex-col items-center ${styleContentPadding}`}
                  >
                    {imageGridOnLoad.get(product.id) ? (
                      <div className={cssPlaceholderContainer} />
                    ) : (
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full max-w-96 aspect-square"
                      >
                        <img
                          src={albumCoverImageLarge(product.images[0]?.file)}
                          alt={product.name}
                          className="w-full max-w-96 aspect-square object-contain hover:scale-[102%] transition duration-300"
                          ref={(node) => {
                            const map = getImageRefMap();
                            map.set(product.id, node);
                            return () => {
                              // called when removing
                              map.delete(product.id);
                            };
                          }}
                        />
                      </Link>
                    )}

                    <Link
                      className={`font-arsenal-spaced-1 text-aqua-forest-800 hover:underline`}
                      to={`/product/${product.id}`}
                    >
                      {product.name}
                    </Link>

                    <span className="font-lato text-aqua-forest-500 text-sm">
                      {product.artist}
                    </span>
                    <span className="text-aqua-forest-700 font-arsenal-spaced-1 text-lg mt-1">
                      $
                      {calculateDiscountedPriceAndReturnString(
                        product.price,
                        product.discount
                      )}
                    </span>

                    {product.stock === 0 && (
                      <span className="text-rose-700 font-arsenal-spaced-1 text-sm bg-rose-100">
                        Out of stock!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!!totalCount && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={(page: number) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("page", page.toString());
                setSearchParams(newParams);
              }}
              totalPages={totalPages}
              maxPageOptionsCount={5}
              backgroundTheme={"light"}
            />
          )}
        </div>
      </div>
    </>
  );
}
