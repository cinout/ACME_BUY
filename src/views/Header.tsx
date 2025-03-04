import circleLogo from "@/assets/images/company_logo_circleonly.png";
import { Link } from "react-router-dom";
import { RoleEnum } from "@/utils/enums";
import { useAppSelector } from "@/redux/hooks";
import { capFirstLetter } from "@/utils/strings";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { iconMenuHamburger } from "@/utils/icons";

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
  return (
    <div className="fixed top-4 left-4 right-4 xl:left-[calc(theme('spacing.dashbord-width')+1rem)] z-40 flex items-center justify-between rounded-lg box-border h-header-height bg-aqua-forest-200 font-arsenal-spaced-1">
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

      {/* Search Bar */}
      {/* TODO: implement this? */}
      <div className="inline-flex justify-start">
        <input
          placeholder="search ..."
          name="search"
          type="text"
          className={
            "h-[2.375rem] bg-sky-800 outline-none  rounded-full px-4 text-sky-100 w-40 lg:ml-10 sm:w-64"
          }
        />
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
