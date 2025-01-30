import { SellerEntity } from "@/utils/entities";
import { joinUrl } from "@/utils/strings";
import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface SellerListProps {
  sellerStats: SellerEntity[];
  setShowList?: React.Dispatch<SetStateAction<boolean>>;
}

// TODO: implement search User */}
// TODO: need to have a X button */}

const baseUrl = "/admin/chat";
export default function SellerList({
  sellerStats,
  setShowList,
}: SellerListProps) {
  const navigate = useNavigate();

  function handleClick(id: string) {
    if (setShowList) {
      setShowList(false);
    }
    void navigate(joinUrl(baseUrl, id));
  }

  // TODO: Sort them based on recent message

  return (
    <>
      {sellerStats.map((seller) => (
        <button
          key={seller.id}
          className="flex w-full p-2 items-center gap-x-1 lg:gap-x-3 text-xs lg:text-sm hover:bg-sky-100 rounded-md"
          onClick={() => handleClick(seller.id)}
        >
          <img
            src={seller?.image}
            alt={seller?.firstname}
            className="w-10 h-10 rounded-md shadow-xl"
          />
          <span className="hidden sm:block text-left">{seller?.firstname}</span>
        </button>
      ))}
    </>
  );
}
