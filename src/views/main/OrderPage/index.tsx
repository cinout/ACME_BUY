import ShippingAddressForm from "./ShippingAddressForm";
import OrderSummary from "./OrderSummary";
import Header from "./Header";
import { GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID } from "@/graphql/orderGql";
import { OrderEntity } from "@/utils/entities";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function OrderPage() {
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
      skip: !orderId,
      variables: { id: orderId },
    }
  );
  const orderDetails = gqlQueryOrder.data
    ?.getOrderAndProductDetailsByOrderId as OrderEntity;

  return (
    <div className="relative">
      {/* Header */}
      <Header />

      <hr />

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] absolute top-20 left-0 w-full">
        {/* Left: Payment and Address */}
        <div className="p-4 w-full flex flex-col items-center">
          <ShippingAddressForm />
        </div>

        {/* Right: order summary */}
        <OrderSummary orderDetails={orderDetails} orderId={orderId} />
      </div>
    </div>
  );
}
