import { useState } from "react";
import Pagination from "@/views/shared_components/Pagination";
import Head from "./Head";
import UserTable from "./UserTable";
import UserInfo from "./UserInfo";
import { Navigate, useParams } from "react-router-dom";
import { UserEntity, UserStatusEnum } from "@/graphql/userGql";
import { useMutation, useQuery } from "@apollo/client";
import {
  GQL_USER_GET_ALL,
  GQL_USER_UPDATE_STATUS_BY_ADMIN,
} from "@/graphql/userGql";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";

const itemsPerPageOptions = [10, 20, 30, 40];

// TODO:[3] need to provide filter/sort functionalities
export default function SectionUsers() {
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
  const [userStatusFilter, setUserStatusFilter] = useState<
    UserStatusEnum | "All"
  >("All");

  /**
   * Routing
   */
  const { userId } = useParams();

  /**
   * GQL
   */
  const [updateUserStatusByAdmin] = useMutation(
    GQL_USER_UPDATE_STATUS_BY_ADMIN,
    {
      onError: (err) => {
        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage);
      },
    }
  );
  const queryUsers = useQuery(GQL_USER_GET_ALL);
  if (queryUsers.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allUsers = queryUsers.data.getAllUsers as UserEntity[];
  const currentUser = allUsers.find((a) => a.id === userId);
  const allUsersByStatus = allUsers.filter(
    (a) => userStatusFilter === "All" || a.status === userStatusFilter
  );
  const numPendingUsers = allUsers.filter(
    (a) => a.status === UserStatusEnum.Pending
  ).length;

  function updateUserStatus(userId: string, targetStatus: UserStatusEnum) {
    void updateUserStatusByAdmin({
      variables: {
        id: userId,
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
  if (userId && !currentUser) {
    return <Navigate to="/admin/users" replace />;
  }

  return (
    <>
      <Head
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPageOptions={itemsPerPageOptions}
        userStatusFilter={userStatusFilter}
        setUserStatusFilter={setUserStatusFilter}
        numPendingUsers={numPendingUsers}
      />

      <UserTable
        userStats={allUsersByStatus.slice(start_index, end_index)}
        updateUserStatus={updateUserStatus}
      />

      {currentUser && (
        <UserInfo user={currentUser} updateUserStatus={updateUserStatus} />
      )}

      {/* Pagination */}
      {/* TODO:[3] is there a more efficient way to retrieve and display information according to current page? */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(allUsersByStatus.length / itemsPerPage)}
          maxPageOptionsCount={5}
          backgroundTheme={"dark"}
        />
      </div>
    </>
  );
}
