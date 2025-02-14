import logo from "@/assets/images/company_logo.png";
import { PropagateLoader } from "react-spinners";

export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-y-20 items-center justify-center w-full h-full bg-aqua-forest-200 ">
      <img src={logo} alt="company logo" className="w-72" />

      <PropagateLoader color="#488062" size={6} />
    </div>
  ); // TODO:: improve UI
}
