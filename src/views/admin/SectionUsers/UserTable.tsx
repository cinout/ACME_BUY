import { joinUrl, shortenMiddle } from "@/utils/strings";
import { Link, useLocation } from "react-router-dom";
import UserStatusIndicator from "@/views/shared_components/UserStatusIndicator";
import CustomTooltip from "@/views/shared_components/CustomTooltip";
import {
  iconAddWithCircle,
  iconEmail,
  iconRemoveWithCircle,
} from "@/utils/icons";
import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import { UserEntity, UserStatusEnum } from "@/graphql/userGql";

interface UserTableProps {
  userStats: UserEntity[];
  updateUserStatus: (userId: string, userStatus: UserStatusEnum) => void;
}

export default function UserTable({
  userStats,
  updateUserStatus,
}: UserTableProps) {
  const { pathname } = useLocation();

  const { getImageRefMap, imageGridOnLoad } = useHookMultipleImageLoading(
    userStats.map((a) => a.id)
  );

  // TODO:[2] Show a functionality to sort users
  // TODO:[1] Show a confirmation dialog when admin changes the user status
  return (
    <>
      <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start ">
        {userStats.map((user) => (
          <div
            key={user.id}
            className="flex flex-col justify-start items-center gap-2"
          >
            <Link to={joinUrl(pathname, user.id)}>
              {imageGridOnLoad.get(user.id) ? (
                <div className="inline-flex justify-center items-center h-20 w-20 mt-10 rounded-md outline ">
                  <LoadingIndicator />
                </div>
              ) : (
                <img
                  src={user.imageUrl}
                  alt={user.firstname}
                  className="inline box-content h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
                  ref={(node) => {
                    const map = getImageRefMap();
                    map.set(user.id, node);
                    return () => {
                      // called when removing
                      map.delete(user.id);
                    };
                  }}
                />
              )}
            </Link>

            {/* User Name */}
            <div className="flex justify-center items-start gap-x-2">
              <UserStatusIndicator
                status={user.status}
                additionalStyle="w-3 h-3"
              />
              {shortenMiddle(user.firstname + " " + user.lastname, 40)}
            </div>

            {/* Shop */}
            {user.shopName && (
              <div className="text-xs -mt-1 text-center">
                <span className="font-semibold"> Shop: </span>
                {user.shopName}
              </div>
            )}

            <div className="flex justify-center items-center gap-4 text-xl">
              <a
                className="text-sky-200 hover:scale-125 transition cursor-pointer"
                href={`mailto:${user.email}`}
                data-tooltip-id={`${user.id}-tooltip-contact`}
              >
                {iconEmail()}
              </a>

              {user.status === UserStatusEnum.Active && (
                <button
                  className="text-sky-200 hover:scale-125 transition"
                  data-tooltip-id={`${user.id}-tooltip-deactivated`}
                  onClick={() =>
                    updateUserStatus(user.id, UserStatusEnum.Deactivated)
                  }
                >
                  {iconRemoveWithCircle()}
                </button>
              )}

              {user.status === UserStatusEnum.Deactivated && (
                <button
                  className="text-sky-200 hover:scale-125 transition"
                  data-tooltip-id={`${user.id}-tooltip-active`}
                  onClick={() =>
                    updateUserStatus(user.id, UserStatusEnum.Active)
                  }
                >
                  {iconAddWithCircle()}
                </button>
              )}

              {user.status === UserStatusEnum.Pending && (
                <>
                  <button
                    className="text-sky-200 hover:scale-125 transition"
                    data-tooltip-id={`${user.id}-tooltip-active`}
                    onClick={() =>
                      updateUserStatus(user.id, UserStatusEnum.Active)
                    }
                  >
                    {iconAddWithCircle()}
                  </button>

                  <button
                    className="text-sky-200 hover:scale-125 transition"
                    data-tooltip-id={`${user.id}-tooltip-deactivated`}
                    onClick={() =>
                      updateUserStatus(user.id, UserStatusEnum.Deactivated)
                    }
                  >
                    {iconRemoveWithCircle()}
                  </button>
                </>
              )}
            </div>

            <CustomTooltip
              id={`${user.id}-tooltip-contact`}
              content={`contact ${user.email}`}
            />
            <CustomTooltip
              id={`${user.id}-tooltip-deactivated`}
              content={"deactivate the user"}
            />
            <CustomTooltip
              id={`${user.id}-tooltip-active`}
              content={"activate the user"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
