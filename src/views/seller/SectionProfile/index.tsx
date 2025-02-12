import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/authReducer";
import toast from "react-hot-toast";
import { useApolloClient, useQuery } from "@apollo/client";
import { GQL_SELLER_GET_CURRENT } from "@/graphql/sellerGql";
import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import { useForm } from "react-hook-form";
import FormInput from "@/views/shared_components/form/FormInput";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_PERSON,
  VALID_NAME_PERSON_ERROR_MSG,
} from "@/utils/strings";

interface SellerFormInputProps {
  firstname: string;
  lastname: string;
  image: { file: File | string; name: string };
  email: string;
  status: SellerStatusEnum;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export default function SectionProfile() {
  /**
   * GQL
   */
  const client = useApolloClient();
  const userInfo = client.readQuery({
    query: GQL_SELLER_GET_CURRENT,
  }).getCurrentSeller as SellerEntity;

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
  } = useForm<SellerFormInputProps>({
    defaultValues: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      status: userInfo.status,
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

  /**
   * Redux
   */
  const dispatch = useAppDispatch();

  /**
   * Functions
   */
  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        void client.clearStore(); // TODO: should I leave something in cache?
        // redirected to login page due to ProtectRoute
      })
      .catch((e) => {
        toast.error(e); // show error
      });
  }

  function onSubmit(data: SellerFormInputProps): void {
    // setShowLoader(true);
    // if (mode === "Create") {
    //   // Create Mode
    //   void createCategory({
    //     variables: { name: data.name, image: data.image },
    //   });
    // } else {
    //   // Edit Mode
    //   void updateCategory({
    //     variables: {
    //       id: editCategoryInfo!.id,
    //       input: {
    //         name: data.name,
    //         image: data.image,
    //       },
    //     },
    //   });
    // }
  }

  return (
    <div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white"
      >
        <FormInput
          registration={register("firstname", {
            required: "Required",
            maxLength: {
              value: 30,
              message: "Name must be at most 30 characters",
            },
            minLength: {
              value: 1,
              message: "Name must be at least 1 character",
            },
            pattern: {
              value: VALID_NAME_PERSON,
              message: VALID_NAME_PERSON_ERROR_MSG,
            },
          })}
          error={errors.firstname}
          additionalStyleContentWrapper="w-60"
        />

        <FormInput
          registration={register("lastname", {
            required: "Required",
            maxLength: {
              value: 30,
              message: "Name must be at most 30 characters",
            },
            minLength: {
              value: 1,
              message: "Name must be at least 1 character",
            },
            pattern: {
              value: VALID_NAME_PERSON,
              message: VALID_NAME_PERSON_ERROR_MSG,
            },
          })}
          error={errors.firstname}
          additionalStyleContentWrapper="w-60"
        />
      </form>

      <button className="bg-aqua-forest-200" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );

  // TODO: change password functionality
}
