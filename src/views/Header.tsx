import circleLogo from "@/assets/images/company_logo_circleonly.svg";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { capFirstLetter } from "@/utils/strings";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { iconMenuHamburger } from "@/utils/icons";
import { RoleEnum } from "@/graphql/userGql";
import { navOptions } from "./allNavs";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function Header({
  showSidebar,
  setShowSidebar,
  menuButtonRef,
}: Props) {
  const { role } = useAppSelector((state) => state.auth);
  const userInfo = useHookGetUserInfo();
  const panelOptions = navOptions.filter((a) => {
    if (role === RoleEnum.User) {
      return (
        a.accessRoles.includes(RoleEnum.User) &&
        a.accessUserStatus?.includes(userInfo!.status)
      );
    } else if (role === RoleEnum.Admin) {
      return a.accessRoles.includes(RoleEnum.Admin);
    }
    return false;
  });
  const { pathname } = useLocation();

  const sectionName = panelOptions.find((a) =>
    pathname.startsWith(a.goto)
  )?.name;

  return (
    <div className="fixed top-0 md:top-4 left-0 md:left-4 right-0 md:right-4 xl:left-[calc(theme('spacing.dashbord-width')+1rem)] z-40 flex items-center justify-between rounded-none md:rounded-lg box-border h-header-height bg-aqua-forest-200 font-arsenal-spaced-1">
      {/* Logo & Menu Button */}
      <div className="xl:hidden inline-flex items-center justify-center">
        <Link
          to="/"
          className="w-[2.6rem] h-[2.6rem] ml-4 flex justify-center items-center"
        >
          <img
            src={circleLogo}
            alt="logo"
            className="box-content border-2 border-transparent hover:brightness-90 transition duration-200"
          />
        </Link>

        <button
          ref={menuButtonRef}
          onClick={() => setShowSidebar((isopen) => !isopen)}
          className={`box-content font-bold p-1 mx-2 sm:mx-6 text-[1.875rem] border-2 rounded-full hover:bg-aqua-forest-400  transition duration-200 ${
            showSidebar
              ? "bg-aqua-forest-400 border-white text-white"
              : "text-aqua-forest-700 bg-aqua-forest-300 border-transparent"
          }`}
        >
          {iconMenuHamburger()}
        </button>
      </div>

      {/* Section Title */}
      <div className="w-48 sm:w-64 flex justify-center xl:justify-start xl:ml-10 font-bold text-aqua-forest-800 text-2xl">
        {sectionName}
      </div>

      <div className="inline-flex justify-end items-center gap-3 mr-2 min-w-[3.25rem]">
        {/* name & role */}
        <div className="hidden tn:flex flex-col items-end justify-center text-aqua-forest-800 leading-tight ">
          <span>
            <em>{capFirstLetter(userInfo?.firstname)}</em>
          </span>
          <span>
            <b>{role}</b>
          </span>
        </div>

        {/* TODO: see video Section 33 */}
        <Link to={role === RoleEnum.User ? "/user/profile" : "/admin/profile"}>
          <div className="w-[3rem]">
            <img
              src={userInfo?.imageUrl}
              alt="user image"
              className="h-[3rem] w-[3rem] border-2 border-white/20 rounded-full hover:bg-aqua-forest-500 hover:border-white transition duration-200"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
