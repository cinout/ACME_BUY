import {
  GQL_GET_CURRENT_USER_CART_DETAILS,
  GQL_USER_UPDATE_CURRENT,
  UserEntity,
} from "@/graphql/userGql";
import {
  iconCheckout,
  iconMinusSimple,
  iconPlusSimple,
  iconTrashCan,
} from "@/utils/icons";
import {
  ApolloQueryResult,
  OperationVariables,
  QueryResult,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import groupBy from "lodash/groupBy";
import { albumCoverImageSmall, translateAddress } from "@/utils/strings";
import {
  calculateDiscountedPriceAndReturnNumber,
  calculateDiscountedPriceAndReturnString,
} from "@/utils/numbers";
import { ChangeEvent, useEffect } from "react";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import { GQL_ORDER_INITIATE } from "@/graphql/orderGql";
import { ProductEntity } from "@/graphql/productGql";

function processQuery(
  gqlGetCurrentUserCartDetails: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | QueryResult<any, OperationVariables>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ApolloQueryResult<any>,
  userInfo: UserEntity | null
) {
  const cartAndcartDetails = gqlGetCurrentUserCartDetails.data
    ?.getCurrentUserCartDetails as UserEntity & {
    cartDetails: ProductEntity[];
  };
  // merge quantity into product
  const mergedCartDetail = cartAndcartDetails?.cart?.map((cartItem) => {
    const product = cartAndcartDetails.cartDetails.find(
      (a) => a.id === cartItem.productId
    )!;
    return { ...product, quantity: cartItem.quantity };
  });
  const cartDetailGroupedByShop = groupBy(
    mergedCartDetail?.sort((a, b) => a.id.localeCompare(b.id)),
    "userId"
  );
  const totalPrice = mergedCartDetail?.reduce(
    (acc, item) =>
      acc +
      calculateDiscountedPriceAndReturnNumber(item.price, item.discount) *
        item.quantity,
    0
  );
  const hasError = mergedCartDetail?.some((a) => a.quantity > a.stock);
  const disabled =
    hasError || !userInfo || cartAndcartDetails?.cart?.length === 0;

  return {
    cartAndcartDetails,
    disabled,
    hasError,
    totalPrice,
    cartDetailGroupedByShop,
  };
}

export default function CartPage() {
  /**
   * Hook
   */
  const userInfo = useHookGetUserInfo();
  const skip = !userInfo;

  /**
   * Routing
   */
  const navigate = useNavigate();

  /**
   * GQL
   */
  // query
  const gqlGetCurrentUserCartDetails = useQuery(
    GQL_GET_CURRENT_USER_CART_DETAILS,
    {
      // TODO:[2] why is this queries when skip is true?
      skip: skip,
      // fetchPolicy: "standby", // Ensures Apollo does not automatically fetch. Ensures Apollo doesn't start the query unless explicitly told to.
      // fetchPolicy: "network-only", // Ensures no cached results appear
    }
  );
  // mutation
  const [updateUser] = useMutation(GQL_USER_UPDATE_CURRENT, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      // each time user modifies their cart, refetch
      void gqlGetCurrentUserCartDetails.refetch();
    },
  });
  const [initiateOrder] = useMutation(GQL_ORDER_INITIATE, {
    onError: (err) => {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: (data) => {
      // redirect to order page
      const { id } = data.initiateOrder;
      void navigate(`/order/${id}`);
    },
  });

  /**
   * Calculated
   */
  const {
    cartAndcartDetails,
    disabled,
    hasError,
    totalPrice,
    cartDetailGroupedByShop,
  } = processQuery(gqlGetCurrentUserCartDetails, userInfo);

  /**
   * Effect
   */
  // refetch cart when navigate back to this page
  useEffect(() => {
    void gqlGetCurrentUserCartDetails.refetch();
  }, [gqlGetCurrentUserCartDetails]);

  /**
   * Functions
   */
  function onChangeInput(
    e: ChangeEvent<HTMLInputElement>,
    stock: number,
    productId: string
  ) {
    const inputValue = parseInt(e.target.value || "0", 10);
    const updatedValue = Math.max(1, Math.min(inputValue, stock)); // ensure value does not exceed Max
    void updateUser({
      variables: {
        input: {
          cart: cartAndcartDetails?.cart
            ?.filter((a) => a.productId !== productId)
            .concat({
              productId,
              quantity: updatedValue,
            }),
        },
      },
    });
  }

  function onClickReduceQuantity(productId: string) {
    const targetProduct = cartAndcartDetails?.cart?.find(
      (a) => a.productId === productId
    );
    if (targetProduct) {
      void updateUser({
        variables: {
          input: {
            cart: cartAndcartDetails?.cart
              ?.filter((a) => a.productId !== productId)
              .concat({
                productId,
                quantity: targetProduct.quantity - 1,
              }),
          },
        },
      });
    }
  }

  function onClickIncreaseQuantity(productId: string) {
    const targetProduct = cartAndcartDetails?.cart?.find(
      (a) => a.productId === productId
    );

    if (targetProduct) {
      void updateUser({
        variables: {
          input: {
            cart: cartAndcartDetails?.cart
              ?.filter((a) => a.productId !== productId)
              .concat({
                productId,
                quantity: targetProduct.quantity + 1,
              }),
          },
        },
      });
    }
  }

  function handleDeleteProduct(productId: string) {
    void updateUser({
      variables: {
        input: {
          cart: cartAndcartDetails?.cart?.filter(
            (a) => a.productId !== productId
          ),
        },
      },
    });
  }

  function handleClickCheckoutButton() {
    // check stock again
    gqlGetCurrentUserCartDetails
      .refetch()
      .then((query) => {
        const { hasError } = processQuery(query, userInfo);
        if (!hasError) {
          // TODO:[3]  create an order Id and redirect
          void initiateOrder({
            variables: {
              items: cartAndcartDetails.cart,
            },
          });
        }
      })
      .catch((e) => {
        const errorMessage = getErrorMessage(e);
        toast.error(errorMessage);
      });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap">
        {/* Left */}
        <span className="font-arsenal-spaced-1 text-2xl text-aqua-forest-800 font-bold">
          Your Cart
        </span>

        <div className="flex flex-col gap-y-1 items-end">
          <div className="flex items-center gap-x-4 font-arsenal-spaced-1">
            {/* Total Price */}
            <div className="flex flex-col">
              <span className="text-aqua-forest-500 text-sm self-end">
                Subtotal
              </span>
              <span className="text-xl font-bold text-aqua-forest-700">
                ${totalPrice?.toFixed(2)}
              </span>
            </div>

            {/* Go to checkout */}
            <button
              // to={disabled ? "#" : ""}
              className={`flex items-center gap-x-2 h-10 px-2 text-aqua-forest-50 shadow-md transition ${
                disabled
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-aqua-forest-400 hover:brightness-110"
              }`}
              onClick={handleClickCheckoutButton}
              disabled={disabled}
            >
              {iconCheckout()}
              <span>Check out</span>
            </button>
          </div>

          {hasError && (
            <span className="bg-rose-800 text-white px-1 text-sm font-arsenal-spaced-1">
              Fix quantity errors before checking out
            </span>
          )}
        </div>
      </div>

      {/* Contents */}
      {userInfo ? (
        <div className="flex flex-col gap-y-6 mt-10">
          {cartAndcartDetails?.cart?.length === 0 ? (
            <div className="text-center mt-10"> Your cart is empty.</div>
          ) : (
            Object.entries(cartDetailGroupedByShop)?.map(
              ([shopId, productsFromShop]) => {
                const shopDetails = productsFromShop[0]!.user! as UserEntity;
                return (
                  <div
                    key={shopId}
                    className="bg-aqua-forest-50 py-2 px-2 md:px-4"
                  >
                    {/* Header - Shop Information */}
                    <div className="flex flex-wrap items-center gap-x-2 mb-4 font-lato">
                      <span>Shop:</span>
                      <Link
                        to={`/shop/${shopId}`}
                        className="underline font-light"
                      >
                        {shopDetails?.shopName}
                      </Link>
                      {/* <img
                    src={shopDetails?.imageUrl}
                    alt={shopDetails?.shopName}
                    className="h-5 w-5 rounded-full"
                  /> */}
                      <span className="italic text-sm ml-6">Ship from:</span>
                      <span className="italic text-sm font-light">
                        {translateAddress(
                          shopDetails?.city,
                          shopDetails?.state,
                          shopDetails?.country
                        )}
                      </span>
                    </div>

                    {(
                      productsFromShop as (ProductEntity & {
                        quantity: number;
                      })[]
                    )?.map((product) => {
                      const { quantity } = cartAndcartDetails?.cart?.find(
                        (a) => a.productId === product.id
                      ) ?? { quantity: 0, error: null };
                      return (
                        <div
                          key={product.id}
                          className="grid grid-cols-1 sm:grid-cols-[5fr_2fr_1fr] last:border-0 border-b gap-y-2 border-aqua-forest-600 py-2"
                        >
                          {/* Left Part */}
                          <div className="flex flex-wrap self-center justify-self-start">
                            <Link
                              to={`/product/${product.id}`}
                              className="w-20 h-20"
                            >
                              <img
                                src={albumCoverImageSmall(
                                  product.images?.[0]?.file
                                )}
                                alt={product.name}
                                className="w-20 h-20 object-contain"
                              />
                            </Link>
                            <div className="flex flex-col ml-2 max-w-96">
                              {/* Name */}

                              <Link
                                to={`/product/${product.id}`}
                                className="hover:underline"
                              >
                                <span className="text-sm font-arsenal-spaced-1">
                                  {product.name}
                                </span>
                              </Link>

                              {/* Artist */}
                              <span className="text-xs font-lato text-aqua-forest-500">
                                {product.artist}
                              </span>

                              {/* Price */}
                              <div className="mt-2 flex gap-x-2 items-center">
                                <span
                                  className={` text-aqua-forest-700 font-arsenal-spaced-1 ${
                                    product.discount > 0 && "line-through"
                                  }`}
                                >
                                  ${product.price}
                                </span>
                                {product.discount > 0 && (
                                  <>
                                    <div className="bg-rose-300 text-sm text-rose-800 px-1 font-lato">
                                      {product.discount}% off
                                    </div>

                                    <span className=" text-rose-900 font-arsenal-spaced-1">
                                      $
                                      {calculateDiscountedPriceAndReturnString(
                                        product.price,
                                        product.discount
                                      )}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Part */}
                          <div className="self-center justify-self-start flex flex-col gap-y-1 font-arsenal-spaced-1">
                            <span className="text-sm"> Quantity:</span>
                            {/* quantity selector */}
                            <div className="flex">
                              <button
                                className="bg-aqua-forest-100 text-aqua-forest-950 text-lg w-10 h-10 flex justify-center items-center group not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200"
                                disabled={product.stock === 0 || quantity === 1}
                                onClick={() =>
                                  onClickReduceQuantity(product.id)
                                }
                              >
                                {iconMinusSimple(
                                  `group-hover:scale-125 transition`
                                )}
                              </button>
                              {
                                <input
                                  type="number"
                                  min={0}
                                  max={product.stock}
                                  step={1}
                                  className="w-20 h-10 bg-aqua-forest-50 text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none outline-none disabled:bg-slate-100"
                                  disabled={product.stock === 0}
                                  value={quantity}
                                  onChange={(e) =>
                                    onChangeInput(e, product.stock, product.id)
                                  }
                                />
                              }
                              <button
                                className="bg-aqua-forest-100 text-aqua-forest-950 text-lg w-10 h-10 flex justify-center items-center group not-disabled:hover:bg-aqua-forest-300 transition disabled:bg-slate-200"
                                disabled={
                                  product.stock === 0 ||
                                  (typeof quantity === "number" &&
                                    quantity >= product.stock)
                                }
                                onClick={() =>
                                  onClickIncreaseQuantity(product.id)
                                }
                              >
                                {iconPlusSimple(
                                  "group-hover:scale-125 transition"
                                )}
                              </button>
                            </div>

                            {quantity > product.stock && (
                              <div className="bg-rose-800 px-1 text-white text-sm">
                                {product.stock === 0
                                  ? "Out of stock, please remove the item"
                                  : "Stock reduced, adjust your quantity"}
                              </div>
                            )}

                            {/* stock information */}
                            <div className="text-sm">
                              {product.stock > 0 ? (
                                <span>Stock: {product.stock}</span>
                              ) : (
                                <span className="text-rose-500">
                                  Out of stock!
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Total Price part */}
                          <div className="self-center justify-self-start sm:justify-self-end flex gap-2 items-center">
                            <span className="font-arsenal-spaced-1 font-bold">
                              $
                              {(
                                calculateDiscountedPriceAndReturnNumber(
                                  product.price,
                                  product.discount
                                ) * quantity
                              ).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="group text-sky-700 h-8 w-8 transition flex justify-center items-center text-lg rounded-md"
                            >
                              {iconTrashCan("group-hover:scale-110 transition")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )
          )}
        </div>
      ) : (
        <div className="mt-10 font-arsenal-spaced-1 text-center">
          Please{" "}
          <Link to="/login" className="underline text-aqua-forest-700">
            Log in
          </Link>{" "}
          to access your shopping cart.
        </div>
      )}
    </div>
  );
}
