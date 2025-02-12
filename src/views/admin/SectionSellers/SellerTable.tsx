import { joinUrl, shortenEnd, shortenMiddle } from "@/utils/strings";
import { MdEmail } from "react-icons/md";
import { IoIosRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import SellerStatusIndicator from "@/views/shared_components/SellerStatusIndicator";
import CustomTooltip from "@/views/shared_components/CustomTooltip";

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
          <Link to={joinUrl(pathname, seller.id)}>
            <img
              src={seller.imageUrl}
              alt={seller.firstname}
              className="inline box-content h-20 w-20 mt-10 rounded-md hover:brightness-75 hover:outline hover:outline-white transition-all"
            />
          </Link>

          {/* Seller Name */}
          <div className="flex justify-center items-start gap-x-2">
            <SellerStatusIndicator
              status={seller.status}
              additionalStyle="w-3 h-3"
            />
            {shortenMiddle(seller.firstname, 40)}
          </div>

          {/* District */}
          <div className="text-xs -mt-1 text-center">
            <span className="font-semibold"> City: </span>
            {shortenEnd(seller.city, 40)}
          </div>

          <div className="flex justify-center items-center gap-4 text-xl">
            <a
              className="hover:scale-125 transition cursor-pointer"
              href={`mailto:${seller.email}`}
              data-tooltip-id={`${seller.id}-tooltip-contact`}
            >
              <MdEmail />
            </a>

            {/* TODO: implement the function of view information */}

            {/* <Link
              to={joinUrl(pathname, seller.id)}
              className="hover:scale-125 transition"
              data-tooltip-id={`${seller.id}-tooltip-info`}
            >
              <IoInformationCircle />
            </Link> */}

            {/* TODO: implement deactivate seller function */}
            {/* TODO: if user is deactived, then show activate button */}
            <button
              className="hover:scale-125 transition"
              data-tooltip-id={`${seller.id}-tooltip-deactivate`}
            >
              {seller.status === SellerStatusEnum.Active ? (
                <IoIosRemoveCircle />
              ) : seller.status === SellerStatusEnum.Deactivated ? (
                <IoIosAddCircle />
              ) : (
                <div />
              )}
            </button>
          </div>

          <CustomTooltip
            id={`${seller.id}-tooltip-contact`}
            content={`contact ${seller.email}`}
          />
          {/* <CustomTooltip
            id={`${seller.id}-tooltip-info`}
            content="detailed info"
          /> */}
          <CustomTooltip
            id={`${seller.id}-tooltip-deactivate`}
            content={
              seller.status === SellerStatusEnum.Active
                ? "deactivate the seller"
                : seller.status === SellerStatusEnum.Deactivated
                ? "activate the seller"
                : ""
            }
          />
        </div>
      ))}
    </div>
  );
}
