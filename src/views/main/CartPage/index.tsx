import { iconCheckout } from "@/utils/icons";
import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap">
        {/* Left */}
        <span className="font-arsenal-spaced-1 text-2xl text-aqua-forest-800 font-bold">
          Your Cart
        </span>

        <div className="flex items-center gap-x-4 font-arsenal-spaced-1">
          {/* Total Price */}
          <div className="flex flex-col">
            <span className="text-aqua-forest-500 text-sm self-end">
              Subtotal
            </span>
            {/* TODO:[3] calculate real price*/}
            <span className="text-xl font-bold text-aqua-forest-700">$20</span>
          </div>

          {/* Go to checkout */}
          {/* TODO:[3] implement */}
          <Link
            to=""
            className="flex items-center gap-x-2 h-10 px-2 bg-aqua-forest-400 text-aqua-forest-50  shadow-md hover:brightness-110 transition"
          >
            {iconCheckout()}
            <span>Check out</span>
          </Link>
        </div>
      </div>

      {/* Contents */}
    </div>
  );
}
