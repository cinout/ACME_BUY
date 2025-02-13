import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import GenreTable from "./GenreTable";
import { GenreEntity } from "@/utils/entities";
import { useQuery } from "@apollo/client";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import { GQL_GENRES_GET_ALL, GQL_GENRE_DELETE } from "@/graphql/genreGql";
import DeleteConfirmDialog from "../../shared_components/DeleteConfirmDialog";
import { useParams } from "react-router-dom";
import GenreDialog from "./GenreDialog";

const itemsPerPageOptions = [10, 20, 30, 40];

export default function SectionGenre() {
  /**
   * State
   */
  // search value
  const [searchValue, setSearchValue] = useState("");
  // delete ID
  const [toDeleteItemId, setToDeleteItemId] = useState<string>("");
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;

  /**
   * Route
   */
  const { genreId } = useParams();

  /**
   * GQL
   */
  const gql_result = useQuery(GQL_GENRES_GET_ALL);
  if (gql_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allGenres = gql_result.data.getAllGenres as GenreEntity[];
  const toDeleteGenre = allGenres.find((a) => a.id == toDeleteItemId);
  const validGenre = allGenres.find((a) => a.id == genreId);

  /**
   * Functions
   */
  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
  }

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <GenreTable
        genreStats={allGenres.slice(start_index, end_index)}
        setToDeleteItemId={setToDeleteItemId}
      />

      {toDeleteItemId && toDeleteGenre && (
        <DeleteConfirmDialog
          isOpen={!!toDeleteItemId}
          id={toDeleteGenre.id}
          name={toDeleteGenre.name}
          deletionQuery={GQL_GENRE_DELETE}
          setToDeleteItemId={setToDeleteItemId}
          gqlType="Genre"
        />
      )}

      {(genreId === "new" || !!validGenre) && (
        <GenreDialog
          isOpen={genreId === "new" || !!validGenre}
          mode={genreId === "new" ? "Create" : "Edit"}
          editGenreInfo={validGenre}
          submitText={genreId === "new" ? "Create" : "Update"}
        />
      )}

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(allGenres.length / itemsPerPage)}
          maxPageOptionsCount={5}
        />
      </div>
    </>
  );
}
