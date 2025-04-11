import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";
import {
  navOptions,
  NavOptionsProps,
} from "@/views/shared_components/private_section/allNavs";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useApolloClient, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { GQL_AUTH_LOG_OUT } from "@/graphql/authGql";
import { getErrorMessage } from "@/graphql";
import { afterLogout } from "@/redux/reducers/authReducer";
import { iconLogout } from "@/utils/icons";
import groupBy from "lodash/groupBy";
import { capFirstLetter } from "@/utils/strings";
import { RoleEnum } from "@/graphql/userGql";

function NavOption({
  item,
  setShowSidebar,
  largeScreen,
}: {
  item: NavOptionsProps;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  largeScreen: boolean;
}) {
  return (
    <NavLink
      to={item.goto}
      className={({ isActive }) =>
        `${
          largeScreen ? "py-2" : "py-[0.4rem]"
        } group block pl-5 hover:bg-aqua-forest-500 hover:text-aqua-forest-200 transition-all duration-0 ${
          isActive
            ? "bg-aqua-forest-500 text-aqua-forest-200 shadow-aqua-forest-200"
            : "text-aqua-forest-600"
        }`
      }
      onClick={() => setShowSidebar && setShowSidebar(false)}
    >
      <div className="duration-200 group-hover:translate-x-1 flex items-center">
        <span className="mr-2 text-2xl">{item.icon}</span>
        <span>{item.name}</span>
      </div>
    </NavLink>
  );
}

function MenuContent({
  panelOptions,
  setShowSidebar,
  role,
  largeScreen,
}: {
  panelOptions: NavOptionsProps[];
  pathname: string;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  role: RoleEnum | undefined;
  largeScreen: boolean;
}) {
  /**
   * Redux
   */
  const dispatch = useAppDispatch();

  /**
   * GQL
   */
  const client = useApolloClient();

  const [gqlAuthLogOut] = useMutation(GQL_AUTH_LOG_OUT, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      dispatch(afterLogout());
      void client.clearStore(); // TODO:[1] should I leave something in cache?
      // redirected to login page due to ProtectRoute
    },
  });

  /**
   * Functions
   */
  function handleLogout() {
    void gqlAuthLogOut();
  }

  const groupedByRole =
    role === RoleEnum.User && groupBy(panelOptions, "asRole");

  return (
    <>
      <div className="mt-4">
        {role === RoleEnum.User
          ? Object.entries(groupedByRole).map(([roleName, navOptions]) => (
              <div key={roleName}>
                <div className="mt-2 mb-1 pl-4 font-semibold text-aqua-forest-700">
                  {capFirstLetter(roleName)}
                </div>
                {(navOptions as NavOptionsProps[]).map((item) => (
                  <NavOption
                    key={item.name}
                    item={item}
                    setShowSidebar={setShowSidebar}
                    largeScreen={largeScreen}
                  />
                ))}
                {/* <hr className="bg-aqua-forest-600 text-aqua-forest-600" /> */}
              </div>
            ))
          : panelOptions.map((item) => (
              <NavOption
                key={item.name}
                item={item}
                setShowSidebar={setShowSidebar}
                largeScreen={largeScreen}
              />
            ))}
      </div>

      <button
        className="absolute bottom-6 left-0 pl-5 flex items-center text-aqua-forest-900 hover:bg-aqua-forest-500 hover:text-aqua-forest-200 transition-all duration-100 hover:translate-y-[0.0625rem] w-full"
        onClick={handleLogout}
      >
        {iconLogout("text-2xl m-2")}
        <span>Logout</span>
      </button>
    </>
  );
}

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  menuButtonRef,
}: SidebarProps) {
  const { role } = useAppSelector((state) => state.auth);
  const userInfo = useHookGetUserInfo();

  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        menuButtonRef.current &&
        !(
          menuRef.current.contains(event.target as Node) ||
          menuButtonRef.current.contains(event.target as Node)
        )
      ) {
        setShowSidebar(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuButtonRef, setShowSidebar]);

  return (
    <>
      {/* Large Screen */}
      <div className="box-border fixed top-0 left-0 h-full w-dashbord-width bg-aqua-forest-200 z-50 hidden xl:block shadow-2xl font-arsenal-spaced-2">
        <Link
          to="/"
          className="flex justify-center mt-6 mb-12 hover:brightness-90 transition"
        >
          <img src={logo} alt="company logo" className="w-[12.5rem]" />
        </Link>

        <MenuContent
          panelOptions={panelOptions}
          pathname={pathname}
          role={role}
          largeScreen={true}
        />
      </div>

      {/* Smaller Screen */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className={`flex flex-col flex-1 xl:hidden fixed z-50 md:rounded-lg top-header-height md:top-[calc(theme('spacing.header-height')+1rem)] left-0 md:left-4 w-dashbord-width h-[34rem] bg-aqua-forest-200 font-arsenal-spaced-2`}
            ref={menuRef}
            initial={{ translateY: "-0.625rem", opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              transition: { duration: 0.1 },
            }}
            exit={{
              // translateY: "-0.625rem",
              opacity: 0,
              transition: { duration: 0.1 },
            }}
          >
            <MenuContent
              panelOptions={panelOptions}
              pathname={pathname}
              setShowSidebar={setShowSidebar}
              role={role}
              largeScreen={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
