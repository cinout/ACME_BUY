import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { ProductEntity } from "@/graphql/productGql";
import {
  GQL_GET_CURRENT_USER_WISHLIST_DETAILS,
  UserEntity,
} from "@/graphql/userGql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GQL_REMOVE_WISHLIST_ITEM_BY_USER } from "@/graphql/wishListGql";
import DeleteConfirmDialog from "@/views/shared_components/DeleteConfirmDialog";
import useHookPageSwitch from "@/customHooks/useHookPageSwitch";
import WishListDisplay from "./WishListDisplay";
import Head from "./Head";
import Pagination from "@/views/shared_components/Pagination";

export default function SectionWishList() {
  /**
   * State
   */
  const [searchValue, setSearchValue] = useState("");

  /**
   * Page Hook
   */
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleItemsPerPageChange,
    start_index,
    end_index,
    itemsPerPageOptions,
  } = useHookPageSwitch();

  /**
   * GQL
   */
  const gqlGetCurrentUserWishListDetails = useQuery(
    GQL_GET_CURRENT_USER_WISHLIST_DETAILS
  );
  const userWishList = gqlGetCurrentUserWishListDetails.data
    ?.getCurrentUserWishListDetails as {
    wishListDetails: (ProductEntity & { user: UserEntity })[];
  };

  const wishListDetails = userWishList?.wishListDetails; // product details in a list

  /**
   * Hook
   */
  const userInfo = useHookGetUserInfo();

  // delete ID
  const [toDeleteItemId, setToDeleteItemId] = useState<string>("");
  const toDeleteWishListItem = userInfo?.wishList?.find(
    (a) => a.id === toDeleteItemId
  );
  const toDeleteProduct = wishListDetails?.find(
    (a) => a.id === toDeleteWishListItem?.productId
  );

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      <WishListDisplay
        userInfo={userInfo}
        wishList={userInfo?.wishList?.slice(start_index, end_index)}
        wishListDetails={wishListDetails}
        setToDeleteItemId={setToDeleteItemId}
      />

      {/* Pagination */}
      {/* TODO:[3] is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(
            (userInfo?.wishList?.length ?? 0) / itemsPerPage
          )}
          maxPageOptionsCount={5}
          backgroundTheme={"dark"}
        />
      </div>

      {toDeleteItemId && toDeleteProduct && (
        <DeleteConfirmDialog
          isOpen={!!toDeleteItemId}
          id={toDeleteItemId}
          name={toDeleteProduct.name}
          deletionQuery={GQL_REMOVE_WISHLIST_ITEM_BY_USER}
          setToDeleteItemId={setToDeleteItemId}
          gqlType="WishList"
        />
      )}
    </>
  );
}
