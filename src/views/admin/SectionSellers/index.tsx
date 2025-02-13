import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import SellerTable from "./SellerTable";
import SellerInfo from "./SellerInfo";
import { Navigate, useParams } from "react-router-dom";
import { SellerEntity } from "@/utils/entities";
import { useMutation, useQuery } from "@apollo/client";
import {
  GQL_SELLER_GET_ALL,
  GQL_SELLER_UPDATE_STATUS_BY_ADMIN,
} from "@/graphql/sellerGql";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";
import { SellerStatusEnum } from "@/utils/enums";

const itemsPerPageOptions = [10, 20, 30, 40];

// TODO: need to provide filter/sort functionalities
// TODO: only show activated and deactivated sellers, pending sellers are in Seller Request tab
export default function SectionSellers() {
  /**
   * State
   */
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]!); // show #orders per page
  const start_index = (currentPage - 1) * itemsPerPage;
  const end_index = currentPage * itemsPerPage;
  // search value
  const [searchValue, setSearchValue] = useState("");
  // filter
  const [sellerStatusFilter, setSellerStatusFilter] = useState<
    SellerStatusEnum | "All"
  >("All");

  /**
   * Routing
   */
  const { sellerId } = useParams();

  /**
   * GQL
   */
  const [updateSellerStatusByAdmin] = useMutation(
    GQL_SELLER_UPDATE_STATUS_BY_ADMIN,
    {
      onError: (err) => {
        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage);
      },
    }
  );
  const querySellers = useQuery(GQL_SELLER_GET_ALL);
  if (querySellers.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allSellers = querySellers.data.getAllSellers as SellerEntity[];
  const currentSeller = allSellers.find((a) => a.id === sellerId);
  const allSellersByStatus = allSellers.filter(
    (a) => sellerStatusFilter === "All" || a.status === sellerStatusFilter
  );
  const numPendingSellers = allSellers.filter(
    (a) => a.status === SellerStatusEnum.Pending
  ).length;

  function updateSellerStatus(
    sellerId: string,
    targetStatus: SellerStatusEnum
  ) {
    void updateSellerStatusByAdmin({
      variables: {
        id: sellerId,
        status: targetStatus,
      },
    });
  }

  function handleItemsPerPageChange(value: number) {
    setItemsPerPage(value); // set value
    setCurrentPage(1); // default to page 1
    // setDetailShown([]); // hide all shown details
  }

  // redirect if wrong id
  if (sellerId && !currentSeller) {
    return <Navigate to="/admin/sellers" replace />;
  }

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
        sellerStatusFilter={sellerStatusFilter}
        setSellerStatusFilter={setSellerStatusFilter}
        numPendingSellers={numPendingSellers}
      />

      <SellerTable
        sellerStats={allSellersByStatus.slice(start_index, end_index)}
        updateSellerStatus={updateSellerStatus}
      />

      {currentSeller && (
        <SellerInfo
          seller={currentSeller}
          updateSellerStatus={updateSellerStatus}
        />
      )}

      {/* Pagination */}
      {/* TODO: is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(allSellersByStatus.length / itemsPerPage)}
          maxPageOptionsCount={5}
        />
      </div>
    </>
  );
}
