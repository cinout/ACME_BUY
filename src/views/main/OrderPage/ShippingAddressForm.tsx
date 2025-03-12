import FormInput from "@/views/shared_components/form/FormInput";
import FormSelect from "@/views/shared_components/form/FormSelect";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import { ChangeEvent, useEffect, useState } from "react";
import { useHookPrevious } from "@/customHooks/useHookPrevious";
import {
  VALID_EMAIL,
  VALID_NAME_PERSON,
  VALID_NAME_PERSON_ERROR_MSG,
} from "@/utils/strings";
import paymentLogos from "@/assets/images/payment.png";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import {
  GQL_ON_ORDER_COMPLETED,
  GQL_UPDATE_ORDER,
  OrderEntity,
  OrderStatusEnum,
} from "@/graphql/orderGql";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import { useNavigate } from "react-router-dom";

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

  cardNumber: string;
  cardExpirationDate: string;
  cardCVV: string;
  cardHolder: string;
}

const countryOptions = Country.getAllCountries().map((a) => ({
  id: a.name + " " + a.isoCode,
  value: a.isoCode,
  display: a.name,
}));

// Luhn Algorithm for card number validation
const isValidCardNumber = (number: string) => {
  const sanitized = number.replace(/\D/g, ""); // Remove non-numeric chars
  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]!);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "") // Only numbers are allowed (\D/g removes non-digits).
    .replace(/(\d{4})/g, "$1 ") // Adds spaces every 4 digits
    .trim()
    .slice(0, 19);
const formatExpiry = (value: string) =>
  value
    .replace(/\D/g, "") // Only numbers are allowed.
    .replace(/(\d{2})(\d{2})/, "$1/$2") // Automatically inserts a / after MM
    .slice(0, 5); // Restricts length to 5 characters, including /
const formatCVV = (value: string) => value.replace(/\D/g, "").slice(0, 4);
const formatPhone = (value: string) => value.replace(/\D/g, "");

const cssGrid =
  "grid grid-cols-1 tn:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4";
const cssInputArea =
  "border border-aqua-forest-700 !bg-aqua-forest-50 !text-aqua-forest-900 !h-10";
const cssLabel = "!text-aqua-forest-600";

export function checkHasError(order: OrderEntity) {
  const hasError = order?.items.some((item) => {
    const { productId, quantity } = item;
    const product = order.itemDetails?.find((a) => a.id === productId);

    return !product || quantity > product?.stock;
  });
  return hasError;
}

interface Props {
  orderId: string | undefined;
  hasError: boolean;
  orderDetails: OrderEntity;
  priceChanged: string[];
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<
    ApolloQueryResult<{ getOrderAndProductDetailsByOrderId: OrderEntity }>
  >;
}

export default function ShippingAddressForm({
  orderId,
  hasError,
  refetch,
  orderDetails,
  priceChanged,
}: Props) {
  /**
   *  State
   */
  const [showLoader, setShowLoader] = useState(false);

  /**
   * Routing
   */
  const navigate = useNavigate();

  /**
   * Hooks
   */
  const userInfo = useHookGetUserInfo();

  /**
   * GQL
   */
  const [onOrderCompleted] = useMutation(GQL_ON_ORDER_COMPLETED, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      // TODO:[3] being redirected to order success page
      void navigate(`/orderSuccess/${orderId}`, {
        replace: true,
      });
    },
  });
  const [updateOrder] = useMutation(GQL_UPDATE_ORDER, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      void onOrderCompleted({
        variables: {
          id: orderId,
        },
      });
    },
  });

  /**
   * RHF
   */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormProps>();

  const currentCountry = watch("shippingCountry");
  const currentState = watch("shippingState");

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

  // set initialValues of Form when userInfo is loaded
  useEffect(() => {
    if (userInfo) {
      reset({
        shippingCountry: userInfo.country,
        shippingState: userInfo.state,
        shippingCity: userInfo.city,
        shippingPostCode: userInfo.zipCode,
        contactFirstname: userInfo.firstname,
        contactLastname: userInfo.lastname,
        contactEmail: userInfo.email,
      });
    }
  }, [reset, userInfo]);

  // upon changes of countries and cities
  useEffect(() => {
    if (prevCountry && currentCountry !== prevCountry) {
      setValue("shippingState", "", {
        shouldValidate: isSubmitted,
        shouldDirty: true,
      });
      setValue("shippingCity", "", {
        shouldValidate: isSubmitted,
        shouldDirty: true,
      });
    }
  }, [currentCountry, prevCountry, setValue]);

  useEffect(() => {
    if (prevState && currentState !== prevState) {
      setValue("shippingCity", "", {
        shouldValidate: isSubmitted,
        shouldDirty: true,
      });
    }
  }, [currentState, prevState, setValue]);

  function onSubmit(data: FormProps) {
    setShowLoader(true);
    // TODO:[1] actually implement card payment??

    // check stock again (use same logic as cart page)
    // TODO:[3] check price change before payment in order page

    refetch()
      .then((query) => {
        // check if stock is reduce below required quantity
        const hasError = checkHasError(
          query.data?.getOrderAndProductDetailsByOrderId as OrderEntity
        );

        // check if price has changed
        const previousPrices = orderDetails.itemDetails?.map((a) => ({
          id: a.id,
          price: a.price,
          discount: a.discount,
        }));
        const currentPrices = (
          query.data?.getOrderAndProductDetailsByOrderId as OrderEntity
        ).itemDetails?.map((a) => ({
          id: a.id,
          price: a.price,
          discount: a.discount,
        }));
        const priceUpdatedProducts = [];
        if (previousPrices && currentPrices) {
          for (const { id, price, discount } of currentPrices) {
            const { price: previousPrice, discount: previousDiscount } =
              previousPrices.find((a) => a.id === id)!;
            if (price !== previousPrice || discount !== previousDiscount) {
              priceUpdatedProducts.push(id);
            }
          }
        }

        if (hasError || priceUpdatedProducts.length > 0) {
          setShowLoader(false);
        } else {
          // if stock is not changed, update the order as Paid
          setTimeout(() => {
            void updateOrder({
              variables: {
                id: orderId,
                input: {
                  contactEmail: data.contactEmail,
                  contactFirstname: data.contactFirstname,
                  contactLastname: data.contactLastname,
                  contactPhone: data.contactPhone,
                  shippingAddress: data.shippingAddress,
                  shippingCity: data.shippingCity,
                  shippingCountry: data.shippingCountry,
                  shippingPostCode: data.shippingPostCode,
                  shippingState: data.shippingState,
                  status: OrderStatusEnum.Paid, // change to Paid
                  items: orderDetails?.items.map((item) => {
                    const product = orderDetails?.itemDetails?.find(
                      (a) => a.id === item.productId
                    );

                    return {
                      ...item,
                      priceSnapshot: product!.price,
                      discountSnapshot: product!.discount,
                    };
                  }),
                },
              },
            });
          }, 2000);
        }
      })
      .catch((e) => {
        setShowLoader(false);
        const errorMessage = getErrorMessage(e);
        toast.error(errorMessage);
      });
  }

  return (
    <div className="max-w-[50rem]">
      <div className="font-bold text-xl font-lato my-6">Shipping Address</div>
      <div className={cssGrid}>
        <FormSelect
          showLabel={true}
          placeholder="Country/Region"
          registration={register("shippingCountry", {
            required: "Required",
          })}
          options={countryOptions}
          error={errors.shippingCountry}
          additionalStyleSelect={cssInputArea}
          additionalStyleLabel={cssLabel}
          label="Country/Region"
          disabled={showLoader}
          currentValue={currentCountry}
        />
        <FormSelect
          showLabel={true}
          placeholder="State/Province"
          registration={register("shippingState")}
          options={stateOptions}
          additionalStyleSelect={cssInputArea}
          additionalStyleLabel={cssLabel}
          label="State/Province"
          disabled={showLoader}
          currentValue={currentState}
        />
        <FormSelect
          showLabel={true}
          placeholder="City"
          registration={register("shippingCity")}
          options={cityOptions}
          additionalStyleSelect={cssInputArea}
          additionalStyleLabel={cssLabel}
          label="City"
          disabled={showLoader}
          currentValue={watch("shippingCity")}
        />
        <FormInput
          type="text"
          placeholder="Postcode"
          registration={register("shippingPostCode", {
            required: "Required",
          })}
          showLabel={true}
          error={errors.shippingPostCode}
          additionalStyleInput={cssInputArea}
          additionalStyleLabel={cssLabel}
          label="Postcode"
          disabled={showLoader}
          currentValue={watch("shippingPostCode")}
        />
      </div>
      {/* Address */}
      <FormInput
        type="text"
        placeholder="Address"
        showLabel={true}
        registration={register("shippingAddress", {
          required: "Required",
        })}
        additionalStyleWrapper="mt-6"
        error={errors.shippingAddress}
        additionalStyleInput={cssInputArea}
        additionalStyleLabel={cssLabel}
        label="Address"
        disabled={showLoader}
        currentValue={watch("shippingAddress")}
      />
      {/* Contact */}
      <div className="font-bold text-xl font-lato my-6">Contact</div>
      <div className={cssGrid}>
        <FormInput
          type="text"
          placeholder="First name"
          showLabel={true}
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
          additionalStyleLabel={cssLabel}
          label="First name"
          disabled={showLoader}
          currentValue={watch("contactFirstname")}
        />
        <FormInput
          type="text"
          placeholder="Last name"
          showLabel={true}
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
          additionalStyleLabel={cssLabel}
          label="Last name"
          disabled={showLoader}
          currentValue={watch("contactLastname")}
        />

        <FormInput
          type="tel"
          placeholder="Phone"
          showLabel={true}
          registration={register("contactPhone", {
            required: "Required",
            onChange: (e) => {
              setValue("contactPhone", formatPhone(e.target.value), {
                shouldValidate: isSubmitted,
                shouldDirty: true,
              });
            },
          })}
          error={errors.contactPhone}
          additionalStyleInput={cssInputArea}
          additionalStyleLabel={cssLabel}
          label="Phone"
          disabled={showLoader}
          currentValue={watch("contactPhone")}
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
          showLabel={true}
          additionalStyleLabel={cssLabel}
          label="Email"
          disabled={showLoader}
          currentValue={watch("contactEmail")}
        />
      </div>

      {/* Payment */}
      <div className="font-bold text-xl font-lato mt-6">Payment</div>
      <div className="mb-6 font-lato text-sm text-sky-800 font-light">
        All transactions are secure and encrypted. Your payment details are not
        stored in our system.
      </div>

      <div className="w-full rounded-xl border border-slate-500">
        <div className="flex justify-between items-center px-10 h-12">
          <span className="font-semibold">Credit Card</span>
          <img src={paymentLogos} alt="payment options" className="h-6" />
        </div>

        <hr />

        <div className={`${cssGrid} p-4 bg-slate-100 rounded-xl`}>
          <FormInput
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            showLabel={true}
            registration={register("cardNumber", {
              required: "Required",
              validate: (value) =>
                isValidCardNumber(value) || "Invalid card number",
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                setValue("cardNumber", formatCardNumber(inputValue), {
                  shouldValidate: isSubmitted,
                  shouldDirty: true,
                });
              },
            })}
            error={errors.cardNumber}
            additionalStyleInput={cssInputArea}
            additionalStyleLabel={cssLabel}
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={showLoader}
            currentValue={watch("cardNumber")}
          />

          <FormInput
            label="Card Holder Name"
            type="text"
            placeholder="Card Holder Name"
            showLabel={true}
            registration={register("cardHolder", {
              required: "Required",
              minLength: {
                value: 1,
                message: "Name must be at least 1 character",
              },
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only letters and spaces allowed",
              },
            })}
            error={errors.cardHolder}
            additionalStyleInput={cssInputArea}
            additionalStyleLabel={cssLabel}
            disabled={showLoader}
            currentValue={watch("cardHolder")}
          />

          <FormInput
            label="Expiration Date"
            type="text"
            placeholder="MM/YY"
            showLabel={true}
            registration={register("cardExpirationDate", {
              required: "Required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Invalid expiration date",
              },
              validate: (value) => {
                const [month, year] = value.split("/").map(Number);
                const now = new Date();
                const currentYear = now.getFullYear() % 100; // Get last 2 digits
                const currentMonth = now.getMonth() + 1;
                if (!year || !month) {
                  return "Invalid expiration date";
                } else {
                  return (
                    year > currentYear ||
                    (year === currentYear && month >= currentMonth) ||
                    "Card expired"
                  );
                }
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                setValue("cardExpirationDate", formatExpiry(inputValue), {
                  shouldValidate: isSubmitted,
                  shouldDirty: true,
                });
              },
            })}
            error={errors.cardExpirationDate}
            additionalStyleInput={cssInputArea}
            additionalStyleLabel={cssLabel}
            disabled={showLoader}
            currentValue={watch("cardExpirationDate")}
          />

          <FormInput
            label="Security Code (CVV)"
            type="text"
            placeholder="123"
            showLabel={true}
            registration={register("cardCVV", {
              required: "Required",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "Invalid CVV",
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                setValue("cardCVV", formatCVV(inputValue), {
                  shouldValidate: isSubmitted,
                  shouldDirty: true,
                });
              },
            })}
            error={errors.cardCVV}
            additionalStyleInput={cssInputArea}
            additionalStyleLabel={cssLabel}
            disabled={showLoader}
            currentValue={watch("cardCVV")}
          />
        </div>
      </div>
      {/* PayNow */}
      <div className="my-12 ">
        <button
          className="w-full bg-sky-800 disabled:bg-slate-400 font-bold text-white h-10 rounded-md not-disabled:hover:brightness-110 transition"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSubmit(onSubmit)}
          disabled={showLoader || hasError || priceChanged.length > 0}
        >
          {showLoader ? <LoadingIndicator /> : "Pay Now"}
        </button>
        {hasError && (
          <div className="text-sm text-rose-600 font-lato">
            Some product&apos;s stock has been reduced. Please go back to your
            cart, adjust your required quantity, and create a new order.
          </div>
        )}
        {priceChanged.length > 0 && (
          <div className="text-sm text-rose-600 font-lato">
            Some product&apos;s price has been updated, please leave this page
            and create a new order.
          </div>
        )}
      </div>
    </div>
  );
}
