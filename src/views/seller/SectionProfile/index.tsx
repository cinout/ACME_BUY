import toast from "react-hot-toast";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  GQL_SELLER_GET_CURRENT,
  GQL_SELLER_UPDATE_CURRENT,
} from "@/graphql/sellerGql";
import { SellerEntity } from "@/utils/entities";
import { useForm } from "react-hook-form";
import FormSingleImage from "@/views/shared_components/form/FormSingleImages";
import { imageMaxSizeMB } from "@/utils/numbers";
import { ChangeEvent, useState } from "react";
import SellerStatusIndicator from "@/views/shared_components/SellerStatusIndicator";
import { SellerFormInputProps, SellerProfileEdit } from "./SellerProfileEdit";
import { getErrorMessage } from "@/graphql";
import { Country, State } from "country-state-city";
import { GQL_AUTH_LOG_OUT } from "@/graphql/authGql";
import { useAppDispatch } from "@/redux/hooks";
import { afterLogout } from "@/redux/reducers/authReducer";
import { iconEmail, iconLocation } from "@/utils/icons";

export default function SectionProfile() {
  /**
   * Redux
   */
  const dispatch = useAppDispatch();

  /**
   * States
   */
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /**
   * GQL
   */
  const client = useApolloClient();
  const [gqlAuthLogOut] = useMutation(GQL_AUTH_LOG_OUT, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      dispatch(afterLogout());
      void client.clearStore(); // TODO: should I leave something in cache?
      // redirected to login page due to ProtectRoute
    },
  });
  const userInfo = client.readQuery({
    query: GQL_SELLER_GET_CURRENT,
  }).getCurrentSeller as SellerEntity;
  const userCity = userInfo.city ? userInfo.city + ", " : "";
  const userState = userInfo.state
    ? State.getStateByCodeAndCountry(userInfo.state, userInfo.country)?.name +
      ", "
    : "";
  const userCountry = userInfo.country
    ? Country.getCountryByCode(userInfo.country)?.name
    : "";
  const userAddress = userCity + userState + userCountry;

  /**
   * RHF
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    setValue,
    clearErrors,
  } = useForm<SellerFormInputProps>({
    defaultValues: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      shopName: userInfo.shopName,
      country: userInfo.country,
      state: userInfo.state,
      city: userInfo.city,
      zipCode: userInfo.zipCode,
      image: {
        file: userInfo.imageUrl,
        name: userInfo.imageName,
      },
    },
  });
  const uploadedImage = watch("image");
  const [updateSeller] = useMutation(GQL_SELLER_UPDATE_CURRENT, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      handleCancelEditProfile();

      // manually update the defaulValue, as the defaulValue is only initialized once
      reset({
        firstname: watch("firstname"),
        lastname: watch("lastname"),
        shopName: watch("shopName"),
        country: watch("country"),
        state: watch("state"),
        city: watch("city"),
        zipCode: watch("zipCode"),
        image: watch("image"),
      });
    },
  });

  /**
   * Functions
   */
  function handleLogout() {
    void gqlAuthLogOut();
  }

  function onSubmit(data: SellerFormInputProps): void {
    setShowLoader(true);
    void updateSeller({
      variables: {
        input: {
          firstname: data.firstname,
          lastname: data.lastname,
          shopName: data.shopName,
          country: data.country,
          state: data.state,
          city: data.city,
          zipCode: data.zipCode,
          image: data.image,
        },
      },
    });
  }

  function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue(
        "image",
        { file, name: file.name },
        { shouldValidate: true, shouldDirty: true }
      );
    }
  }

  function handleRemoveImage() {
    setValue("image", { file: null, name: null }, { shouldDirty: true });
    clearErrors("image");
  }

  function handleCancelEditProfile() {
    setEditProfileMode(false);
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap gap-8 justify-center w-full">
        <FormSingleImage
          registration={register("image", {
            validate: {
              required: (image) => !!image.file || "Image is required.",
              fileType: (image) =>
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                typeof image.file === "string" ||
                image.file?.type.startsWith("image/") ||
                "Only image files are allowed",
              fileSize: (image) =>
                typeof image.file === "string" ||
                (image.file?.size ?? 0) < imageMaxSizeMB * 1024 * 1024 ||
                `Image must be smaller than ${imageMaxSizeMB}MB`,
            },
          })}
          label="Profile Image"
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
          // uploadedImage={{
          //   file: "http://coverartarchive.org/release/c9bb08ea-a797-43a9-b068-3876b77f8500/34857843791.jpg",
          //   name: "hoho",
          // }}
          uploadedImage={uploadedImage}
          error={errors.image}
          hideImageName={true}
          showLabel={false}
          disabled={!editProfileMode} // TODO: update when changing password is implement
        />

        <div className="flex flex-col justify-between text-white">
          <div>
            <div className="font-bold flex items-center flex-wrap">
              {userInfo.firstname + " " + userInfo.lastname}
              <SellerStatusIndicator
                status={userInfo.status}
                additionalStyle="mx-2"
              />
              <span className="font-light">({userInfo.status})</span>
            </div>
            <div className="font-light">{userInfo.shopName}</div>
          </div>

          <div>
            <div className="text-sm font-light">
              {iconEmail("inline mr-2")}
              {userInfo.email}
            </div>
            <div className="text-sm font-light">
              {iconLocation("inline mr-1")} {userAddress}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {/* // TODO: update when changing password is implement */}
        {!editProfileMode && (
          <>
            <button
              className={`w-fit px-1 py-[0.1rem] text-sm font-medium rounded-md  not-disabled:hover:scale-105 transition bg-sky-200 text-sky-800`}
              onClick={() => {
                setEditProfileMode(true);
              }}
            >
              Edit Profile
            </button>

            <button className="w-fit px-1 py-[0.1rem] text-sm font-medium rounded-md bg-rose-200 text-rose-800 hover:scale-105 transition">
              Change Password
            </button>

            <button
              className="w-fit px-1 py-[0.1rem] text-sm font-medium rounded-md bg-aqua-forest-200 text-aqua-forest-800 hover:scale-105 transition"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        )}
      </div>

      {/* // TODO: update when changing password is implement */}
      {editProfileMode && (
        <SellerProfileEdit
          register={register}
          errors={errors}
          watch={watch}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isDirty={isDirty}
          handleCancelEditProfile={handleCancelEditProfile}
          setValue={setValue}
          showLoader={showLoader}
        />
      )}
    </>
  );

  // TODO: change password functionality
}
