import { iconFacebook, iconInstagram, iconTwitter } from "@/utils/icons";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const styleIcon =
  "hover:scale-110 transition bg-aqua-forest-50 flex justify-center items-center w-5 h-5 rounded-full text-aqua-forest-800";

// TODO:[2] implement links to these pages
export default function Footer() {
  return (
    <div className="bg-aqua-forest-800 flex flex-col text-aqua-forest-50 p-8 gap-y-8">
      <div className="flex flex-wrap justify-around font-arsenal-spaced-1 gap-8">
        {/* First Column */}
        <div className="flex flex-col gap-y-[0.1rem]">
          <span className="font-bold text-lg mb-6">Extra Menu</span>
          <Link to="">Gift Vouchers</Link>
          <Link to="">Accessories</Link>
          <Link to="">Sell Your Records</Link>
          <Link to="">Wish List</Link>
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-y-[0.1rem]">
          <span className="font-bold text-lg mb-6">Information</span>
          <Link to="">About Us</Link>
          <Link to="">Help Center</Link>
          <Link to="">Shipping & Return</Link>
          <Link to="">Privacy Policy</Link>
        </div>

        {/* Last Column */}
        <div className="flex flex-col gap-y-[0.1rem]">
          <span className="font-bold text-lg mb-6">Community</span>
          <Link to="">Blog & Articles</Link>

          <div className="flex items-center gap-x-2">
            <span>Follow Us:</span>
            <Link to="" className={styleIcon}>
              {iconInstagram()}
            </Link>
            <Link to="" className={styleIcon}>
              {iconFacebook()}
            </Link>
            <Link to="" className={styleIcon}>
              {iconTwitter()}
            </Link>
          </div>

          <div className="max-w-80">
            <input
              type="email"
              placeholder="Email Address"
              className="text-aqua-forest-800 h-8 w-56 outline-none px-2"
            />
            <button className="h-8 bg-aqua-forest-200 text-aqua-forest-800 px-2">
              Subscribe
            </button>
            <div className="text-xs">
              Subscribe to our weekly newsletter to receive first-hand notice of
              new arrivals.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-sm font-arsenal-spaced-1">
        Copyright © {currentYear} Swap Sound. Design by Haitian He.
      </div>
    </div>
  );
}
