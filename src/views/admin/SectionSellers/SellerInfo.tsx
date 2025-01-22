import { SellerEntity } from "@/utils/entities";
import { capFirstLetter } from "@/utils/strings";
import AdminDialog from "@/views/shared_components/AdminDialog";
import HoverInfo from "@/views/shared_components/HoverInfo";
import { useNavigate } from "react-router-dom";

interface SellerInfoProps {
  seller: SellerEntity;
}
interface AttributeDisplayProps {
  name: string;
  value: string;
}

function AttributeDisplay({ name, value }: AttributeDisplayProps) {
  return (
    <div className="flex justify-start gap-2">
      <strong className="text-sky-200">{capFirstLetter(name)}: </strong>
      <span>{value}</span>
    </div>
  );
}

export default function SellerInfo({ seller }: SellerInfoProps) {
  const navigate = useNavigate();

  function onCloseDialog() {
    void navigate(-1);
  }

  return (
    <AdminDialog isOpen={true} onClose={onCloseDialog} additionalStyle="w-1/2">
      {/* Top */}
      <div className="flex justify-around items-center w-full gap-12">
        {/* Left */}
        <img
          src={seller.image}
          alt={seller.name}
          className="aspect-square rounded-2xl w-40"
        />

        {/* Right */}
        <div className="flex flex-col gap-1">
          <AttributeDisplay name="name" value={seller.name} />
          <AttributeDisplay name="email" value={seller.email} />
          <AttributeDisplay name="country" value={seller.country} />
          <AttributeDisplay name="state" value={seller.state} />
          <AttributeDisplay name="city" value={seller.city} />
          <AttributeDisplay name="zip code" value={seller.zipCode} />
        </div>
      </div>

      {/* Bottom: Shops */}
      <div className="flex flex-col justify-center items-center w-full">
        <strong className="text-sky-200 mb-2">Owned Shops:</strong>

        <div className="bg-white/75 p-3 rounded-xl flex justify-start gap-2 overflow-x-auto">
          {/* TODO: click on the image should lead to the shop page */}
          {seller.shops?.map((shop) => (
            <HoverInfo
              key={shop.id}
              content={shop.name}
              additionalStyle="w-14 h-14"
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="rounded-md w-14 h-14 cursor-pointer"
              />
            </HoverInfo>
          ))}
        </div>
      </div>
      {/* Leave Button */}
    </AdminDialog>
  );
}
