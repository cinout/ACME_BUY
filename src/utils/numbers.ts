import { OrderEntity } from "@/graphql/orderGql";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min); // Ensure the minimum value is inclusive
  max = Math.floor(max); // Ensure the maximum value is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const imageMaxSizeMB = 2;

const startYear = 1899;
const endYear = new Date().getFullYear();
const allYears = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => endYear - i
);
export const yearOptions = allYears.map((a) => ({
  id: a.toString(),
  value: a,
  display: a === 1899 ? "Before 1900" : a.toString(),
}));

export function calculateDiscountedPriceAndReturnString(
  price: number,
  discount: number
) {
  return ((price * (100 - discount)) / 100).toFixed(2);
}

export function calculateDiscountedPriceAndReturnNumber(
  price: number,
  discount: number
) {
  return (price * (100 - discount)) / 100;
}

export function calculateNonPendingOrderTotalPrice(orderDetails: OrderEntity) {
  const totalPrice = orderDetails?.items.reduce((acc, item) => {
    const { quantity, priceSnapshot, discountSnapshot } = item;

    return (
      acc +
      calculateDiscountedPriceAndReturnNumber(
        priceSnapshot!,
        discountSnapshot!
      ) *
        quantity
    );
  }, 0);

  return totalPrice;
}

export function calculatePendingOrderTotalPrice(orderDetails: OrderEntity) {
  const totalPrice = orderDetails?.items.reduce((acc, item) => {
    const { productId, quantity } = item;
    const product = orderDetails?.itemDetails?.find((a) => a.id === productId);
    if (product) {
      return (
        acc +
        calculateDiscountedPriceAndReturnNumber(
          product?.price,
          product?.discount
        ) *
          quantity
      );
    } else {
      return 0;
    }
  }, 0);

  return totalPrice;
}
