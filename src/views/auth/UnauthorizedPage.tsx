import image from "@/assets/images/401_Unauthorized.svg";
import { iconGoLeftWithoutCircle } from "@/utils/icons";
import { Link } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";
import { styleCompanyLogoPosition } from "@/utils/styles";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex flex-col gap-y-8 items-center justify-center w-full h-full bg-sky-200 px-10">
      <Link className={styleCompanyLogoPosition} to="/">
        <img src={logo} className="h-full" />
      </Link>

      <img src={image} alt="illustration" className="w-64" />

      <div className="text-2xl font-arsenal-spaced-1 text-sky-900">
        You&apos;ve reached an unauthorized page.
      </div>

      <Link
        to="/"
        className="group border-b border-sky-700 flex items-center gap-x-2 font-arsenal-spaced-1 text-sky-900 text-lg"
        replace
      >
        {iconGoLeftWithoutCircle(
          "inline group-hover:-translate-x-2 transition"
        )}{" "}
        Get me home
      </Link>
    </div>
  );
}
