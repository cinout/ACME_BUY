import { IoMenuSharp } from "react-icons/io5";
import circleLogo from "@/assets/images/company_logo_circleonly.png";
import imgAdmin from "@/assets/images/admin.png";
import { Link } from "react-router-dom";
import { Input } from "@headlessui/react";
import { faker } from "@faker-js/faker";
import { RoleEnum } from "@/utils/enums";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const dummyName = faker.person.fullName();

export default function Header({
  showSidebar,
  setShowSidebar,
  menuButtonRef,
}: Props) {
  return (
    // <div className="">

    <div className="fixed top-4 left-4 right-4 xl:left-[calc(theme('spacing.dashbord-width')+1rem)] z-40 flex items-center justify-between rounded-lg box-border  h-header-height bg-aqua-forest-500 ">
      {/* Logo & Menu Button */}
      {/* TODO: what to do with the Link */}
      <div className="xl:hidden inline-flex items-center justify-center">
        <Link
          to="/"
          className="w-[2.7rem] h-[2.7rem] ml-4 flex justify-center items-center"
        >
          <img
            src={circleLogo}
            alt="logo"
            className="box-content border-2 border-transparent rounded-full hover:border-white transition duration-200"
          />
        </Link>

        <button
          ref={menuButtonRef}
          onClick={() => setShowSidebar((isopen) => !isopen)}
          className={`box-content font-bold p-1 mx-2 sm:mx-6 text-[1.875rem] border-2 rounded-full hover:bg-aqua-forest-500 hover:border-white transition duration-200 ${
            showSidebar
              ? "bg-aqua-forest-500 border-white text-white"
              : "text-aqua-forest-700 bg-aqua-forest-400 border-transparent"
          }`}
        >
          <IoMenuSharp />
        </button>
      </div>

      {/* Search Bar */}
      {/* TODO: what is this for? */}
      <div className="inline-flex justify-start">
        <Input
          placeholder="search ..."
          name="search"
          type="text"
          className={
            "h-[2.375rem] bg-sky-800 outline-none  rounded-full px-4 text-sky-100 w-40 lg:ml-10 sm:w-64"
          }
        />
      </div>

      {/* TODO: retrieve user image/role/name from server */}
      <div className="inline-flex justify-end items-center gap-3 mr-2 min-w-[3.25rem]">
        {/* name & role */}
        <div className="hidden tn:flex flex-col items-end justify-center text-sky-100 leading-tight ">
          <span>
            <em>{dummyName}</em>
          </span>
          <span>
            <b>{RoleEnum.Seller}</b>
          </span>
        </div>

        {/* image */}
        {/* TODO: by click or hover on the user image, some feature should happen */}
        <button>
          <img
            src={imgAdmin}
            alt="user image"
            className="h-[3rem] w-[3rem] border-2 border-white/20 rounded-full hover:bg-aqua-forest-500 hover:border-white transition duration-200"
          />
        </button>
      </div>
    </div>

    // </div>
  );
}
