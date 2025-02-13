import { joinUrl, shortenMiddle } from "@/utils/strings";
import { MdEmail } from "react-icons/md";
import { IoIosRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import SellerStatusIndicator from "@/views/shared_components/SellerStatusIndicator";
import CustomTooltip from "@/views/shared_components/CustomTooltip";

interface SellerTableProps {
  sellerStats: SellerEntity[];
  updateSellerStatus: (
    sellerId: string,
    sellerStatus: SellerStatusEnum
  ) => void;
}

export default function SellerTable({
  sellerStats,
  updateSellerStatus,
}: SellerTableProps) {
  const { pathname } = useLocation();

  // TODO:[2] Show a functionality to filter/sort sellers
  // TODO:[3] Show a tab to highlight Pending Sellers, and show a red icon indicating the pending sellers
  // TODO:[1] Show a confirmation dialog when admin changes the seller status
  return (
    <>
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
              {shortenMiddle(seller.firstname + " " + seller.lastname, 40)}
            </div>

            {/* Shop */}
            <div className="text-xs -mt-1 text-center">
              <span className="font-semibold"> Shop: </span>
              {seller.shopName}
            </div>

            <div className="flex justify-center items-center gap-4 text-xl">
              <a
                className="text-sky-200 hover:scale-125 transition cursor-pointer"
                href={`mailto:${seller.email}`}
                data-tooltip-id={`${seller.id}-tooltip-contact`}
              >
                <MdEmail />
              </a>

              {seller.status === SellerStatusEnum.Active && (
                <button
                  className="text-sky-200 hover:scale-125 transition"
                  data-tooltip-id={`${seller.id}-tooltip-deactivated`}
                  onClick={() =>
                    updateSellerStatus(seller.id, SellerStatusEnum.Deactivated)
                  }
                >
                  <IoIosRemoveCircle />
                </button>
              )}

              {seller.status === SellerStatusEnum.Deactivated && (
                <button
                  className="text-sky-200 hover:scale-125 transition"
                  data-tooltip-id={`${seller.id}-tooltip-active`}
                  onClick={() =>
                    updateSellerStatus(seller.id, SellerStatusEnum.Active)
                  }
                >
                  <IoIosAddCircle />
                </button>
              )}

              {seller.status === SellerStatusEnum.Pending && (
                <>
                  <button
                    className="text-sky-200 hover:scale-125 transition"
                    data-tooltip-id={`${seller.id}-tooltip-active`}
                    onClick={() =>
                      updateSellerStatus(seller.id, SellerStatusEnum.Active)
                    }
                  >
                    <IoIosAddCircle />
                  </button>

                  <button
                    className="text-sky-200 hover:scale-125 transition"
                    data-tooltip-id={`${seller.id}-tooltip-deactivated`}
                    onClick={() =>
                      updateSellerStatus(
                        seller.id,
                        SellerStatusEnum.Deactivated
                      )
                    }
                  >
                    <IoIosRemoveCircle />
                  </button>
                </>
              )}
            </div>

            <CustomTooltip
              id={`${seller.id}-tooltip-contact`}
              content={`contact ${seller.email}`}
            />
            <CustomTooltip
              id={`${seller.id}-tooltip-deactivated`}
              content={"deactivate the seller"}
            />
            <CustomTooltip
              id={`${seller.id}-tooltip-active`}
              content={"activate the seller"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
