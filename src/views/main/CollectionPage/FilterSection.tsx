import FilterByCategory from "./FilterByCategory";

interface Props {
  filterOptions: {
    genre: string | null;
    format: string | null;
    year: string | null;
    grading: string | null;
    region: string | null;
  };

  filtersWithOptions: {
    title: "genre" | "format" | "year" | "grading" | "region";
    options: {
      id: string;
      displayValue: string;
    }[];
  }[];
}

export default function FilterSection({
  filterOptions,
  filtersWithOptions,
}: Props) {
  return (
    <>
      <div className="text-xl font-bold">Filters</div>

      {filtersWithOptions.map((a) => (
        <FilterByCategory
          title={a.title}
          options={a.options}
          filterOptions={filterOptions}
          key={a.title}
        />
      ))}
    </>
  );
}
