import { joinUrl, shortenEnd, shortenMiddle } from "@/utils/strings";
import { MdEmail } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import HoverInfo from "@/views/shared_components/HoverInfo";
import { IoIosRemoveCircle } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { SellerEntity } from "@/utils/entities";

// TODO: all these Props should be in one particular folder

interface SellerTableProps {
  sellerStats: SellerEntity[];
}

export default function SellerTable({ sellerStats }: SellerTableProps) {
  const { pathname } = useLocation();

  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 w-full text-sm text-left mt-5 text-white content-start items-start ">
      {sellerStats.map((seller) => (
        <div
          key={seller.id}
          className="flex flex-col justify-start items-center gap-2"
        >
          <img
            src={seller.image}
            alt={seller.name}
            className="inline h-20 w-20 mt-10 rounded-md"
          />

          {/* Company Name */}
          <div className="text-center">{shortenMiddle(seller.name, 40)}</div>

          {/* District */}
          <div className="text-xs -mt-1 text-center">
            <span className="font-semibold"> City: </span>
            {shortenEnd(seller.city, 40)}
          </div>

          <div className="flex justify-center items-center gap-4 text-xl">
            <HoverInfo content={`contact ${seller.email}`}>
              <a
                className="hover:scale-125 transition cursor-pointer"
                href={`mailto:${seller.email}`}
              >
                <MdEmail />
              </a>
            </HoverInfo>

            {/* TODO: implement the function of view information */}
            <HoverInfo content="detailed info">
              <Link
                to={joinUrl(pathname, seller.id)}
                className="hover:scale-125 transition"
              >
                <IoInformationCircle />
              </Link>
            </HoverInfo>

            {/* TODO: implement deactivate seller function */}
            <HoverInfo content="deactivate the seller">
              <button className="hover:scale-125 transition">
                <IoIosRemoveCircle />
              </button>
            </HoverInfo>
          </div>
        </div>
      ))}
    </div>
  );
}
