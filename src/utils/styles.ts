import { ThinStar } from "@smastrom/react-rating";

/**
 * Form
 */
export const styleFormErrorMessage =
  "text-sm italic mt-2 text-rose-300 bg-black/70 px-2 w-fit";
export const styleFormTypeArea =
  "rounded-md outline-none bg-sky-50 text-sky-900 px-4 placeholder:text-slate-400 placeholder:italic placeholder:text-sm";
export const styleFormLabel = "font-semibold block mb-0.5 text-sky-200";
/**
 * Form - Image
 */
export const styleImagePreview =
  "w-full aspect-square object-contain border border-sky-50 rounded-2xl shadow-2xl group-hover:brightness-[30%]";

export const styleImageUploadIndicator =
  "group flex flex-col justify-center items-center w-28 h-28 bg-sky-50 rounded-2xl text-sky-700 gap-y-2 hover:brightness-75 transition";

/**
 * Dialog Buttons
 */
export const styleCancelButton =
  "text-white cursor-pointer w-fit bg-sky-900 px-3 py-1 rounded-full border-2 border-sky-100 not-disabled:hover:bg-sky-800 not-disabled:hover:scale-105 transition disabled:cursor-not-allowed disabled:bg-slate-300 shadow-2xl h-9";

export const styleSubmitButton =
  "text-white px-3 py-1 w-fit rounded-full border-2 border-sky-100 bg-aqua-forest-600 not-disabled:hover:brightness-110 not-disabled:hover:scale-105 transition shadow-2xl disabled:cursor-not-allowed disabled:bg-slate-300 h-9";

export const styleSecondSubmitButton =
  "text-white px-3 py-1 w-fit rounded-full border-2 border-sky-100 bg-aqua-forest-600 not-disabled:hover:brightness-110 not-disabled:hover:scale-105 transition shadow-2xl disabled:cursor-not-allowed disabled:bg-slate-300 h-9";

/**
 * Rating
 */
export const ratingStyle = {
  itemShapes: ThinStar,
  activeFillColor: "#f59e0b",
  inactiveFillColor: "#ffedd5",
};

/**
 * Login/Signup Page
 */

export const styleLoginDialog =
  "w-[21.875rem] max-w-full text-white bg-gradient-to-tr from-aqua-forest-500/70 to-sky-500/70 rounded-lg p-6 shadow-xl";
export const styleLoginTitle = "text-xl mb-1 text-shadow-dark text-center";
export const styleLoginSubmitButton =
  "h-8 bg-aqua-forest-500 rounded-md p-1 w-full mt-4 font-black block hover:bg-aqua-forest-600 transition duration-200";
