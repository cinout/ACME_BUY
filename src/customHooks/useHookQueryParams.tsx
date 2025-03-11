import { GenreEntity } from "@/utils/entities";
import {
  GradingEnum,
  MediaFormatEnum,
  ReleaseRegionEnum,
  ReleaseYearRangeEnum,
} from "@/utils/enums";
import { useSearchParams } from "react-router-dom";

export const sortingOptions = [
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

// Get the previous value
export function useHookQueryParams(allGenres: GenreEntity[]) {
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
  const currentQuery = searchParams.get("query");

  const filterOptions = {
    genre: finalGenre,
    format: finalFormat,
    year: finalYear,
    grading: finalGrading,
    region: finalRegion,
  };

  return {
    searchParams,
    setSearchParams,
    filterOptions,
    currentPage,
    currentQuery,
    finalSorting,
    genreOptions,
    filtersWithOptions,
  };
}
