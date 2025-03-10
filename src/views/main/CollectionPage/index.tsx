import { GQL_PRODUCT_GET_COLLECTION } from "@/graphql/productGql";
import { GenreEntity, ProductEntity } from "@/utils/entities";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { albumCoverImageLarge, capFirstLetter } from "@/utils/strings";
import { useQuery } from "@apollo/client";
import { Link, useSearchParams } from "react-router-dom";
import FilterSection from "./FilterSection";
import { GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import {
  GradingEnum,
  MediaFormatEnum,
  ReleaseRegionEnum,
  ReleaseYearRangeEnum,
} from "@/utils/enums";
import { iconCrossClose } from "@/utils/icons";
import Pagination from "@/views/shared_components/Pagination";
import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";

const styleContentPadding = "px-2 sm:px-4 lg:px-8";
const cssPlaceholderContainer = "w-full aspect-square bg-aqua-forest-50";
const sortingOptions = [
  // default
  { id: "featured", displayValue: "Featured" },
  // recently added
  { id: "added-desc", displayValue: "Added, new to old" },
  { id: "added-asc", displayValue: "Added, old to new" },
  // release year
  { id: "year-desc", displayValue: "Release Year, new to old" },
  { id: "year-asc", displayValue: "Release Year, old to new" },
  // price
  { id: "price-desc", displayValue: "Price, high to low" },
  { id: "price-asc", displayValue: "Price, low to high" },
  // title of the album
  { id: "name-desc", displayValue: "Name, Z to A" },
  { id: "name-asc", displayValue: "Name, A to Z" },
];
const ITEMS_PER_PAGE = 40;

export default function CollectionPage() {
  /**
   * GQL [1]
   */
  // Genre
  const gqlGenresGetAll = useQuery(GQL_GENRES_GET_ALL);
  const allGenres = gqlGenresGetAll.data?.getAllGenres as GenreEntity[];
  // Create a shallow copy and sort the copy
  const sortedGenres =
    allGenres && allGenres.length > 0
      ? allGenres.slice().sort((a, b) => a.name.localeCompare(b.name))
      : [];

  /**
   * Calculated Values
   */
  const filtersWithOptions: {
    title: "genre" | "format" | "year" | "grading" | "region";
    options: {
      id: string;
      displayValue: string;
    }[];
  }[] = [
    {
      title: "genre",
      options: sortedGenres?.map((a) => ({
        id: a.id,
        displayValue: a.name,
      })),
    },
    {
      title: "format",
      options: Object.values(MediaFormatEnum).map((a) => ({
        id: a,
        displayValue: a,
      })),
    },
    {
      title: "year",
      options: Object.values(ReleaseYearRangeEnum).map((a) => ({
        id: a,
        displayValue: a,
      })),
    },
    {
      title: "grading",
      options: Object.values(GradingEnum).map((a) => ({
        id: a,
        displayValue: a,
      })),
    },
    {
      title: "region",
      options: Object.values(ReleaseRegionEnum).map((a) => ({
        id: a,
        displayValue: a,
      })),
    },
  ];
  const genreOptions = filtersWithOptions.find(
    (a) => a.title === "genre"
  )?.options;

  /**
   * Routing
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const genreInUrl = searchParams.get("genre");
  const formatInUrl = searchParams.get("format");
  const yearInUrl = searchParams.get("year");
  const gradingInUrl = searchParams.get("grading");
  const regionInUrl = searchParams.get("region");
  const sortingInUrl = searchParams.get("sorting");
  const pageInUrl = Number(searchParams.get("page"));

  // handle invalid url param values
  const finalGenre =
    genreOptions &&
    genreInUrl &&
    genreOptions?.map((a) => a.displayValue).includes(genreInUrl)
      ? genreInUrl
      : null;
  const finalFormat =
    formatInUrl &&
    Object.values(MediaFormatEnum).includes(formatInUrl as MediaFormatEnum)
      ? formatInUrl
      : null;
  const finalYear =
    yearInUrl &&
    Object.values(ReleaseYearRangeEnum).includes(
      yearInUrl as ReleaseYearRangeEnum
    )
      ? yearInUrl
      : null;
  const finalGrading =
    gradingInUrl &&
    Object.values(GradingEnum).includes(gradingInUrl as GradingEnum)
      ? gradingInUrl
      : null;
  const finalRegion =
    regionInUrl &&
    Object.values(ReleaseRegionEnum).includes(regionInUrl as ReleaseRegionEnum)
      ? regionInUrl
      : null;
  const finalSorting =
    sortingInUrl && sortingOptions.map((a) => a.id).includes(sortingInUrl)
      ? sortingInUrl
      : "featured";
  const currentPage =
    Number.isInteger(pageInUrl) && pageInUrl > 0 ? pageInUrl : 1;

  const filterOptions = {
    genre: finalGenre,
    format: finalFormat,
    year: finalYear,
    grading: finalGrading,
    region: finalRegion,
  };

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
   * Hooks
   */
  const { getImageRefMap, imageGridOnLoad } = useHookMultipleImageLoading(
    currentPageProducts?.map((a) => a.id) || []
  );

  return (
    <>
      <div className="block sm:hidden font-arsenal-spaced-1 text-aqua-forest-700 mb-6">
        <FilterSection
          filterOptions={filterOptions}
          filtersWithOptions={filtersWithOptions}
        />
      </div>
      <div className="flex">
        {/* Left: Filters */}
        <div className="hidden sm:block w-[11rem] font-arsenal-spaced-1 text-aqua-forest-700">
          <FilterSection
            filterOptions={filterOptions}
            filtersWithOptions={filtersWithOptions}
          />
        </div>

        {/* Right: Sorting + Content */}
        <div className="flex-1">
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
            {Object.entries(filterOptions).map(([title, value]) => (
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
                    newParams.delete(title); // Remove the parameter
                    setSearchParams(newParams); // Update the URL
                  }}
                >
                  {iconCrossClose()}
                </button>
              </div>
            ))}
          </div>

          {/* Contents */}
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
                  className="font-arsenal-spaced-1 text-aqua-forest-800 hover:underline"
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
