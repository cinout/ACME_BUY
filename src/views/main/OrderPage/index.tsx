import ShippingAddressForm, { checkHasError } from "./ShippingAddressForm";
import OrderSummary from "./OrderSummary";
import Header from "./Header";
import { GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID } from "@/graphql/orderGql";
import { OrderEntity } from "@/utils/entities";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useHookGetUserInfo } from "@/customHooks/useHookGetUserInfo";
import LoadingPage from "@/views/LoadingPage";
import { OrderStatusEnum } from "@/utils/enums";
import { useEffect, useState } from "react";
import { useHookPrevious } from "@/customHooks/useHookPrevious";

interface Props {
  orderId: string;
  orderDetails: OrderEntity;
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<
    ApolloQueryResult<{ getOrderAndProductDetailsByOrderId: OrderEntity }>
  >;
}

function Content({ orderId, orderDetails, refetch }: Props) {
  const hasError = checkHasError(orderDetails);

  // monitor price change
  const [priceChanged, setPriceChanged] = useState<string[]>([]); // store the id of product
  const currentPrices = orderDetails.itemDetails?.map((a) => ({
    id: a.id,
    price: a.price,
    discount: a.discount,
  }));
  const previousPrices = useHookPrevious(currentPrices);
  useEffect(() => {
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

    if (priceUpdatedProducts.length > 0) {
      setPriceChanged(priceUpdatedProducts);
    }
  }, [currentPrices, previousPrices]);

  return (
    <div className="relative">
      <Header />

      <hr />

      <div className="mt-20 flex flex-col md:flex-row">
        {/* Left: Payment and Address */}
        <div className="flex-1 p-4 md:h-[calc(100vh-5rem)] overflow-y-auto inline-flex flex-col items-center">
          <ShippingAddressForm
            orderId={orderId}
            orderDetails={orderDetails}
            hasError={hasError}
            refetch={refetch}
            priceChanged={priceChanged}
          />
        </div>

        {/* Right: order summary */}
        <OrderSummary
          orderDetails={orderDetails}
          orderId={orderId}
          priceChanged={priceChanged}
        />
      </div>
    </div>
  );
}

export default function OrderPage() {
  /**
   * State
   */
  // to avoid being redirected to "/user/orders" if order changes from pending to paid
  const [startAsAPendingOrder, setStartAsAPendingOrder] = useState(false);

  /**
   * Redux
   */
  const { role, updateUserRoleDoneOnFirstRender } = useAppSelector(
    (state) => state.auth
  );

  /**
   * Hooks
   */
  const userInfo = useHookGetUserInfo();

  /**
   * Routing
   */
  const { orderId } = useParams();

  /**
   * GQL
   */
  const gqlQueryOrder = useQuery(
    GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID,
    {
      skip: !orderId || !userInfo,
      variables: { id: orderId },
    }
  );
  const orderDetails = gqlQueryOrder.data
    ?.getOrderAndProductDetailsByOrderId as OrderEntity;

  /**
   * Effect
   */
  useEffect(() => {
    if (orderDetails?.status === OrderStatusEnum.Pending) {
      setStartAsAPendingOrder(true);
    }
  }, [orderDetails?.status]);

  if (!orderId) {
    <Navigate replace to="/" />;
  } else {
    if (!updateUserRoleDoneOnFirstRender) {
      // If user is not hydrated yet
      return <LoadingPage />;
    } else {
      // user is hydrated
      if (!role) {
        // If user is not logged in
        return <Navigate replace to="/login" />;
      } else {
        // user is logged in
        if (gqlQueryOrder.error) {
          // query has error (such as the order does not belong to the user)
          return <Navigate to="/unauthorized" replace />;
        } else if (gqlQueryOrder.data) {
          // query is successful

          if (
            orderDetails.status === OrderStatusEnum.Pending ||
            startAsAPendingOrder
          ) {
            const refetch = gqlQueryOrder.refetch;
            return (
              <Content
                orderId={orderId}
                orderDetails={orderDetails}
                refetch={refetch}
              />
            );
          } else {
            // order is not Pending
            return <Navigate replace to="/user/orders" />;
          }
        } else {
          // query is not dispatched yet or is loading
          return <LoadingPage />;
        }
      }
    }
  }
}
