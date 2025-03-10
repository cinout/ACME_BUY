import { iconShoppingCart } from "@/utils/icons";
import { Link } from "react-router-dom";
import logoCircleOnly from "@/assets/images/company_logo_circleonly.png";
import { Tooltip } from "react-tooltip";

export default function Header() {
  return (
    <div className="flex flex-wrap justify-between items-center sm:px-20 h-20 bg-gradient-to-b from-white to-slate-100 w-full fixed z-50">
      <div className="flex items-center gap-x-2">
        <img src={logoCircleOnly} alt="logo" className="h-8" />
        <span className="text-aqua-forest-700 text-2xl font-arsenal-spaced-2 font-bold">
          Swap Sound Checkout
        </span>
      </div>
      <Link
        to="/cart"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[2rem]"
        data-tooltip-id={`tooltip-cart`}
      >
        {iconShoppingCart()}
      </Link>

      <Tooltip
        id={"tooltip-cart"}
        place="left"
        content={"Go back to shopping cart"}
        style={{
          borderRadius: "6px",
          backgroundColor: "#277453",
          fontSize: "0.8rem",
          padding: "2px 8px",
        }}
      />
    </div>
  );
}
