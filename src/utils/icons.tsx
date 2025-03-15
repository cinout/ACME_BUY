import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { CiDeliveryTruck, CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {
  FaEdit,
  FaTrashAlt,
  FaGoogle,
  FaInstagram,
  FaFacebook,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaRegHeart,
  FaHeart,
  FaEye,
} from "react-icons/fa";
import { FaPeopleGroup, FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";

import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

import {
  IoIosLogOut,
  IoMdArrowDropdownCircle,
  IoMdArrowDropupCircle,
  IoIosAddCircle,
  IoIosRemoveCircle,
  IoMdAdd,
  IoMdRemove,
  IoIosSearch,
} from "react-icons/io";
import {
  IoChatboxEllipsesOutline,
  IoMenuSharp,
  IoArrowBackCircle,
  IoCloseOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import {
  MdOutlinePayment,
  MdOutlineSupportAgent,
  MdImageNotSupported,
  MdEmail,
} from "react-icons/md";
import { TbVinyl } from "react-icons/tb";

/**
 * General
 */
// https://react-icons.github.io/react-icons/search/#q=IoMenuSharp
export const iconMenuHamburger = (style?: string) => (
  <IoMenuSharp className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoMdArrowDropdownCircle
export const iconMoneyStack = (style?: string) => (
  <GiMoneyStack className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaEdit
export const iconEdit = (style?: string) => <FaEdit className={style} />;
// https://react-icons.github.io/react-icons/search/#q=MdImageNotSupported
export const iconImageNotSupported = (style?: string) => (
  <MdImageNotSupported className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=MdEmail
export const iconEmail = (style?: string) => <MdEmail className={style} />;
// https://react-icons.github.io/react-icons/search/#q=FaLocationDot
export const iconLocation = (style?: string) => (
  <FaLocationDot className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoIosSearch
export const iconSearchMagnifier = (style?: string) => (
  <IoIosSearch className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=CiShoppingCart
export const iconShoppingCart = (style?: string) => (
  <CiShoppingCart className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoBagCheckOutline
export const iconCheckout = (style?: string) => (
  <IoBagCheckOutline className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaRegHeart
export const iconLoveEmpty = (style?: string) => (
  <FaRegHeart className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaHeart
export const iconLoveFilled = (style?: string) => <FaHeart className={style} />;

// https://react-icons.github.io/react-icons/search/#q=HiOutlinePlus
export const iconPlusSimple = (style?: string) => (
  <HiOutlinePlus className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=HiOutlineMinus
export const iconMinusSimple = (style?: string) => (
  <HiOutlineMinus className={style} />
);
export const iconView = (style?: string) => <FaEye className={style} />;

/**
 * Add and Remove
 */
// https://react-icons.github.io/react-icons/search/#q=IoIosAddCircle
export const iconAddWithCircle = (style?: string) => (
  <IoIosAddCircle className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=ioiosremovecircle
export const iconRemoveWithCircle = (style?: string) => (
  <IoIosRemoveCircle className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoMdAdd
export const iconAddWithoutCircle = (style?: string) => (
  <IoMdAdd className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoMdRemove
export const iconMinusWithoutCircle = (style?: string) => (
  <IoMdRemove className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaTrashAlt
export const iconTrashCan = (style?: string) => (
  <FaTrashAlt className={style} />
);

/**
 * Open and Close
 */
// https://react-icons.github.io/react-icons/search/#q=IoCloseOutline
export const iconCrossClose = (style?: string) => (
  <IoCloseOutline className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoIosLogOut
export const iconLogout = (style?: string) => <IoIosLogOut className={style} />;

/**
 * Direction
 */
// https://react-icons.github.io/react-icons/search/#q=FaChevronCircleLeft
export const iconLeftPagination = (style?: string) => (
  <FaChevronCircleLeft className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaChevronCircleRight
export const iconRightPagination = (style?: string) => (
  <FaChevronCircleRight className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoMdArrowDropupCircle
export const iconUpWithCircle = (style?: string) => (
  <IoMdArrowDropupCircle className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoMdArrowDropdownCircle
export const iconDownWithCircle = (style?: string) => (
  <IoMdArrowDropdownCircle className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoArrowBackCircle
export const iconGoLeftWithCircle = (style?: string) => (
  <IoArrowBackCircle className={style} />
);
export const iconGoRightWithoutCircle = (style?: string) => (
  <GoArrowRight className={style} />
);
export const iconGoLeftWithoutCircle = (style?: string) => (
  <GoArrowLeft className={style} />
);

/**
 * Company Logo
 */
// https://react-icons.github.io/react-icons/search/#q=FaGoogle
export const iconGoogle = (style?: string) => <FaGoogle className={style} />;
// https://react-icons.github.io/react-icons/search/#q=FaFacebook
export const iconFacebook = (style?: string) => (
  <FaFacebook className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaInstagram
export const iconInstagram = (style?: string) => (
  <FaInstagram className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaXTwitter
export const iconTwitter = (style?: string) => <FaXTwitter className={style} />;

/**
 * Dashboard Section Icons
 */
// https://react-icons.github.io/react-icons/search/#q=AiOutlineDashboard
export const iconDashboard = (style?: string) => (
  <AiOutlineDashboard className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=CiDeliveryTruck
export const iconDelivery = (style?: string) => (
  <CiDeliveryTruck className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=BiCategory
export const iconCategory = (style?: string) => (
  <BiCategory className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=FaPeopleGroup
export const iconUsers = (style?: string) => (
  <FaPeopleGroup className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=MdOutlinePayment
export const iconPayment = (style?: string) => (
  <MdOutlinePayment className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=IoChatboxEllipsesOutline
export const iconChat = (style?: string) => (
  <IoChatboxEllipsesOutline className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=CgProfile
export const iconProfile = (style?: string) => <CgProfile className={style} />;
// https://react-icons.github.io/react-icons/search/#q=MdOutlineSupportAgent
export const iconSupportTeam = (style?: string) => (
  <MdOutlineSupportAgent className={style} />
);
// https://react-icons.github.io/react-icons/search/#q=TbVinyl
export const iconProducts = (style?: string) => <TbVinyl className={style} />;
