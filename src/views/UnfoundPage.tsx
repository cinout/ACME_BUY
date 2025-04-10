import image from "@/assets/images/404_error.svg";
import { iconGoLeftWithoutCircle } from "@/utils/icons";
import { Link } from "react-router-dom";
import logo from "@/assets/images/company_logo.png";
import { styleCompanyLogoPosition } from "@/utils/styles";

export default function UnfoundPage() {
  return (
    <div className="relative flex flex-col gap-y-8 items-center justify-center w-full h-full bg-aqua-forest-100 px-10">
      <Link className={styleCompanyLogoPosition} to="/">
        <img src={logo} className="h-full" />
      </Link>

      <img src={image} alt="illustraion" className="w-64" />

      <div className="text-2xl font-arsenal-spaced-1 text-aqua-forest-900">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist.
      </div>

      <Link
        to="/"
        className="group border-b border-aqua-forest-700 flex items-center gap-x-2 font-arsenal-spaced-1 text-aqua-forest-900 text-lg"
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
