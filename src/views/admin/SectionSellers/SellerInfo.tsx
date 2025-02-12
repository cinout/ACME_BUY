import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import { capFirstLetter } from "@/utils/strings";
import PopupDialog from "@/views/shared_components/PopupDialog";
import PopupDialogButtons from "@/views/shared_components/PopupDialogButtons";
import SellerStatusIndicator from "@/views/shared_components/SellerStatusIndicator";
import { useNavigate } from "react-router-dom";

interface AttributeDisplayProps {
  name: string;
  value: string;
}

function AttributeDisplay({ name, value }: AttributeDisplayProps) {
  return (
    <div className="flex justify-start gap-1 sm:gap-2 flex-wrap">
      <strong className="text-sky-200">{capFirstLetter(name)}: </strong>
      <span>{value}</span>
    </div>
  );
}
interface SellerInfoProps {
  seller: SellerEntity;
  updateSellerStatus: (
    sellerId: string,
    sellerStatus: SellerStatusEnum
  ) => void;
}

export default function SellerInfo({
  seller,
  updateSellerStatus,
}: SellerInfoProps) {
  const navigate = useNavigate();

  function onCloseDialog() {
    void navigate(-1);
  }

  return (
    <PopupDialog
      isOpen={true}
      onClose={onCloseDialog}
      additionalStyle="w-full md:w-4/5 lg:w-2/3 xl:w-1/2"
      // additionalStyle="w-full md:w-4/5 lg:w-2/3 xl:w-1/2 p-4 md:p-6 xl:p-8"
      header="Seller Info"
    >
      {/* Top */}
      <div className="flex justify-around items-center w-full gap-x-12 gap-y-6 flex-wrap text-sm md:text-base">
        {/* Left */}
        <div className="flex flex-col items-center gap-4 w-40">
          {/* TODO:[1] to redirect to seller's page when click on image */}
          <img
            src={seller.imageUrl}
            alt={seller.firstname}
            className="w-24 sm:w-32 lg:w-40 aspect-square rounded-2xl shadow-2xl"
          />

          <div className="flex justify-center items-center gap-x-3">
            <SellerStatusIndicator status={seller.status} />
            {seller.status}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-1 text-wrap">
          <AttributeDisplay
            name="name"
            value={seller.firstname + " " + seller.lastname}
          />
          <AttributeDisplay name="shop" value={seller.shopName} />
          <AttributeDisplay name="email" value={seller.email} />
          <AttributeDisplay name="country" value={seller.country} />
          <AttributeDisplay name="state" value={seller.state} />
          <AttributeDisplay name="city" value={seller.city} />
          <AttributeDisplay name="zip code" value={seller.zipCode} />
          {/* TODO: add other fields */}
          {/* <AttributeDisplay
            name="requested"
            value={seller.createdAt.toDateString()}
          /> */}
        </div>
      </div>

      {/* TODO:[1] should show products */}

      {/* <div className="flex flex-col justify-center items-center w-full mt-8 text-sm md:text-base"> */}
      {/* <strong className="text-sky-200 mb-2">Owned Shops:</strong> */}

      {/* {seller.shops && seller.shops.length > 0 ? (
          <div className="bg-white/75 p-3 rounded-xl flex justify-start gap-2 overflow-x-auto">
            {seller.shops?.map((shop) => (
              <Fragment key={shop.id}>
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="rounded-md w-14 h-14 cursor-pointer"
                  data-tooltip-id={`${shop.id}-tooltip-info`}
                />

                <CustomTooltip
                  id={`${shop.id}-tooltip-info`}
                  content={shop.name}
                />
              </Fragment>
            ))}
          </div>
        ) : (
          <div>The seller hasn&apos;t created any shop yet.</div>
        )} */}
      {/* </div> */}

      {/* Buttons */}
      <PopupDialogButtons
        onCancel={onCloseDialog}
        submitText={
          seller.status === SellerStatusEnum.Deactivated
            ? "Activate"
            : "Deactivate"
        }
        additionalStyleForSubmit={
          seller.status === SellerStatusEnum.Deactivated
            ? "bg-active-600"
            : "bg-deactivated-600"
        }
        onSubmit={() =>
          updateSellerStatus(
            seller.id,
            seller.status === SellerStatusEnum.Deactivated
              ? SellerStatusEnum.Active
              : SellerStatusEnum.Deactivated
          )
        }
        showSecondarySubmitButton={seller.status === SellerStatusEnum.Pending}
        secondarySubmitText="Activate"
        onSecondarySubmit={() =>
          updateSellerStatus(seller.id, SellerStatusEnum.Active)
        }
        additionalStyleForSecondarySubmit="bg-active-600"
      />
    </PopupDialog>
  );
}
