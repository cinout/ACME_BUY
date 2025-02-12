import { SellerStatusEnum } from "@/utils/enums";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
  VALID_NAME_PERSON,
  VALID_NAME_PERSON_ERROR_MSG,
} from "@/utils/strings";
import FormInput from "@/views/shared_components/form/FormInput";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Country, State, City } from "country-state-city";
import FormSelect from "@/views/shared_components/form/FormSelect";
import AdminDialogButtons from "@/views/shared_components/AdminDialogButtons";
import { useEffect } from "react";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import { usePrevious } from "@/customHooks/usePrevious";

export interface SellerFormInputProps {
  firstname: string;
  lastname: string;
  shopName: string;
  image: { file: File | string | null; name: string | null };
  email: string;
  status: SellerStatusEnum;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

interface SellerProfileEditProps {
  register: UseFormRegister<SellerFormInputProps>;
  watch: UseFormWatch<SellerFormInputProps>;
  errors: FieldErrors<SellerFormInputProps>;
  handleSubmit: UseFormHandleSubmit<SellerFormInputProps, undefined>;
  handleCancelEditProfile: () => void;
  onSubmit: (data: SellerFormInputProps) => void;
  isDirty: boolean;
  showLoader: boolean;
  setValue: UseFormSetValue<SellerFormInputProps>;
}

const countryOptions = Country.getAllCountries().map((a) => ({
  id: a.name + " " + a.isoCode,
  value: a.isoCode,
  display: a.name,
}));

export function SellerProfileEdit({
  register,
  errors,
  watch,
  handleSubmit,
  onSubmit,
  isDirty,
  handleCancelEditProfile,
  setValue,
  showLoader,
}: SellerProfileEditProps) {
  /**
   * RHF
   */
  const currentCountry = watch("country");
  const currentState = watch("state");
  const currentCity = watch("city");

  const prevCountry = usePrevious(currentCountry); // undefined on first render
  const prevState = usePrevious(currentState); // undefined on first render

  const stateOptions = State.getStatesOfCountry(currentCountry).map((a) => ({
    id: a.name + " " + a.isoCode,
    value: a.isoCode,
    display: a.name,
  }));
  const cityOptions = City.getCitiesOfState(currentCountry, currentState).map(
    (a) => ({
      id: a.name,
      value: a.name,
      display: a.name,
    })
  );

  useEffect(() => {
    if (prevCountry && currentCountry !== prevCountry) {
      setValue("state", "");
      setValue("city", "");
    }
  }, [currentCountry, prevCountry, setValue]);

  useEffect(() => {
    if (prevState && currentState !== prevState) {
      setValue("city", "");
    }
  }, [currentState, prevState, setValue]);

  return (
    <>
      {/* Form */}
      <div
        // className="text-white flex flex-col items-start gap-y-2 mt-8"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center  text-white mt-8"
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
          currentValue={watch("firstname")}
          label="Fist Name"
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
          error={errors.lastname}
          additionalStyleContentWrapper="w-60"
          currentValue={watch("lastname")}
          label="Last Name"
        />

        <FormInput
          registration={register("shopName", {
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
              value: VALID_NAME_GENERAL,
              message: VALID_NAME_GENERAL_ERROR_MSG,
            },
          })}
          error={errors.shopName}
          additionalStyleContentWrapper="w-60"
          currentValue={watch("shopName")}
          label="Shop Name"
        />

        <FormSelect
          registration={register("country", {
            required: "Required",
          })}
          error={errors.country}
          options={countryOptions}
          additionalStyleContentWrapper="w-60"
          currentValue={currentCountry}
        />

        <FormSelect
          registration={register("state", {})}
          error={errors.state}
          options={stateOptions}
          additionalStyleContentWrapper="w-60"
          currentValue={currentState}
          label="State/Province/Region"
        />

        <FormSelect
          registration={register("city", {})}
          error={errors.city}
          options={cityOptions}
          additionalStyleContentWrapper="w-60"
          currentValue={currentCity}
        />

        <FormInput
          registration={register("zipCode", {
            required: "Required",
            maxLength: {
              value: 30,
              message: "At most 30 characters",
            },
            minLength: {
              value: 1,
              message: "At least 1 character",
            },
          })}
          error={errors.zipCode}
          additionalStyleContentWrapper="w-60"
          currentValue={watch("zipCode")}
        />
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-10">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="flex justify-center">
          <AdminDialogButtons
            submitText="Update"
            additionalStyleForWrapper="gap-x-20"
            isDirty={isDirty}
            onCancel={handleCancelEditProfile}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      )}
    </>
  );
}
