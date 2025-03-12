import { capFirstLetter } from "@/utils/strings";
import PopupDialog from "@/views/shared_components/PopupDialog";
import PopupDialogButtons from "@/views/shared_components/PopupDialogButtons";
import UserStatusIndicator from "@/views/shared_components/UserStatusIndicator";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { UserEntity, UserStatusEnum } from "@/graphql/userGql";

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
interface UserInfoProps {
  user: UserEntity;
  updateUserStatus: (userId: string, userStatus: UserStatusEnum) => void;
}

export default function UserInfo({ user, updateUserStatus }: UserInfoProps) {
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
      header="User Info"
    >
      {/* Top */}
      <div className="flex justify-around items-center w-full gap-x-12 gap-y-6 flex-wrap text-sm md:text-base">
        {/* Left */}
        <div className="flex flex-col items-center gap-4 w-40">
          {/* TODO:[1] to redirect to user's page when click on image */}
          <img
            src={user.imageUrl}
            alt={user.firstname}
            className="w-24 sm:w-32 lg:w-40 aspect-square rounded-2xl shadow-2xl"
          />

          <div className="flex justify-center items-center gap-x-3">
            <UserStatusIndicator status={user.status} />
            {user.status}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-1 text-wrap">
          <AttributeDisplay
            name="name"
            value={user.firstname + " " + user.lastname}
          />
          <AttributeDisplay name="shop" value={user?.shopName ?? ""} />
          <AttributeDisplay name="email" value={user.email} />
          <AttributeDisplay
            name="country"
            value={
              user.country
                ? Country.getCountryByCode(user.country)?.name ?? ""
                : ""
            }
          />
          <AttributeDisplay
            name="state"
            value={
              user.state
                ? State.getStateByCodeAndCountry(user.state, user.country)
                    ?.name ?? ""
                : ""
            }
          />
          <AttributeDisplay name="city" value={user.city} />
          <AttributeDisplay name="zip code" value={user.zipCode} />
          {/* TODO:[1] add other fields: Request Date*/}
          {/* <AttributeDisplay
            name="requested"
            value={user.createdAt.toDateString()}
          /> */}
        </div>
      </div>

      {/* TODO:[1] should show products */}

      {/* <div className="flex flex-col justify-center items-center w-full mt-8 text-sm md:text-base"> */}
      {/* <strong className="text-sky-200 mb-2">Owned Shops:</strong> */}

      {/* {user.shops && user.shops.length > 0 ? (
          <div className="bg-white/75 p-3 rounded-xl flex justify-start gap-2 overflow-x-auto">
            {user.shops?.map((shop) => (
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
          <div>The user hasn&apos;t created any shop yet.</div>
        )} */}
      {/* </div> */}

      {/* Buttons */}
      <PopupDialogButtons
        onCancel={onCloseDialog}
        submitText={
          user.status === UserStatusEnum.Deactivated ? "Activate" : "Deactivate"
        }
        additionalStyleForSubmit={
          user.status === UserStatusEnum.Deactivated
            ? "bg-active-600"
            : "bg-deactivated-600"
        }
        onSubmit={() =>
          updateUserStatus(
            user.id,
            user.status === UserStatusEnum.Deactivated
              ? UserStatusEnum.Active
              : UserStatusEnum.Deactivated
          )
        }
        showSecondarySubmitButton={user.status === UserStatusEnum.Pending}
        secondarySubmitText="Activate"
        onSecondarySubmit={() =>
          updateUserStatus(user.id, UserStatusEnum.Active)
        }
        additionalStyleForSecondarySubmit="bg-active-600"
      />
    </PopupDialog>
  );
}
