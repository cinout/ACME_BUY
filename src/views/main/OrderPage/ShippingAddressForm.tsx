import FormInput from "@/views/shared_components/form/FormInput";
import FormSelect from "@/views/shared_components/form/FormSelect";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { useEffect } from "react";
import { useHookPrevious } from "@/customHooks/useHookPrevious";
import {
  VALID_EMAIL,
  VALID_NAME_PERSON,
  VALID_NAME_PERSON_ERROR_MSG,
} from "@/utils/strings";

interface FormProps {
  shippingCountry: string;
  shippingState: string;
  shippingCity: string;
  shippingPostCode: string;
  shippingAddress: string;
  contactFirstname: string;
  contactLastname: string;
  contactPhone: string;
  contactEmail: string;
}

const countryOptions = Country.getAllCountries().map((a) => ({
  id: a.name + " " + a.isoCode,
  value: a.isoCode,
  display: a.name,
}));

const cssGrid =
  "grid grid-cols-1 tn:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4";
const cssInputArea =
  "border border-aqua-forest-700 !bg-aqua-forest-50 !text-aqua-forest-900 !h-10";

export default function ShippingAddressForm() {
  /**
   * RHF
   */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>();

  const currentCountry = watch("shippingCountry");
  const currentState = watch("shippingState");
  const currentCity = watch("shippingCity");

  const prevCountry = useHookPrevious(currentCountry); // undefined on first render
  const prevState = useHookPrevious(currentState); // undefined on first render

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
      setValue("shippingState", "");
      setValue("shippingCity", "");
    }
  }, [currentCountry, prevCountry, setValue]);

  useEffect(() => {
    if (prevState && currentState !== prevState) {
      setValue("shippingCity", "");
    }
  }, [currentState, prevState, setValue]);

  return (
    <div className="max-w-[50rem]">
      <div className="font-bold text-xl font-lato my-6">Shipping Address</div>

      <div className={cssGrid}>
        <FormSelect
          showLabel={false}
          placeholder="Country/Region"
          registration={register("shippingCountry", {
            required: "Required",
          })}
          options={countryOptions}
          error={errors.shippingCountry}
          additionalStyleSelect={cssInputArea}
        />
        <FormSelect
          showLabel={false}
          placeholder="State/Province"
          registration={register("shippingState")}
          options={stateOptions}
          additionalStyleSelect={cssInputArea}
        />
        <FormSelect
          showLabel={false}
          placeholder="City"
          registration={register("shippingCity")}
          options={cityOptions}
          additionalStyleSelect={cssInputArea}
        />
        <FormInput
          type="text"
          placeholder="Postcode"
          registration={register("shippingPostCode", {
            required: "Required",
          })}
          showLabel={false}
          error={errors.shippingPostCode}
          additionalStyleInput={cssInputArea}
        />
      </div>

      {/* Address */}
      <FormInput
        type="text"
        placeholder="Address"
        showLabel={false}
        registration={register("shippingAddress", {
          required: "Required",
        })}
        additionalStyleWrapper="mt-6"
        error={errors.shippingAddress}
        additionalStyleInput={cssInputArea}
      />

      {/* Contact */}
      <div className="font-bold text-xl font-lato my-6">Contact</div>

      <div className={cssGrid}>
        <FormInput
          type="text"
          placeholder="First name"
          showLabel={false}
          registration={register("contactFirstname", {
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
          error={errors.contactFirstname}
          additionalStyleInput={cssInputArea}
        />
        <FormInput
          type="text"
          placeholder="Last name"
          showLabel={false}
          registration={register("contactLastname", {
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
          error={errors.contactLastname}
          additionalStyleInput={cssInputArea}
        />

        <FormInput
          type="tel"
          placeholder="Phone"
          showLabel={false}
          registration={register("contactPhone", {
            required: "Required",
          })}
          error={errors.contactPhone}
          additionalStyleInput={cssInputArea}
        />

        <FormInput
          placeholder="Email"
          type="email"
          registration={register("contactEmail", {
            required: "Required",
            pattern: {
              value: VALID_EMAIL,
              message: "Invalid email format",
            },
          })}
          error={errors.contactEmail}
          additionalStyleInput={cssInputArea}
          showLabel={false}
        />
      </div>
    </div>
  );
}
