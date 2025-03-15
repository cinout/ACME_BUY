import { gql } from "@apollo/client";
import { ProductEntity } from "./productGql";
import { UserEntity } from "./userGql";
import { Entity } from ".";

export enum OrderStatusEnum {
  Pending = "Pending",
  Paid = "Paid",
  Shipped = "Shipped",
  Completed = "Completed",
  Canceled = "Canceled",
}

export interface OrderEntity extends Entity {
  items: {
    productId: string;
    quantity: number;
    priceSnapshot?: number;
    discountSnapshot?: number;
  }[];
  itemDetails?: (ProductEntity & { user: UserEntity })[];
  userId: string;
  status: OrderStatusEnum;
  shippingCountry?: string;
  shippingState?: string;
  shippingCity?: string;
  shippingPostCode?: string;
  shippingAddress?: string;
  contactFirstname?: string;
  contactLastname?: string;
  contactPhone?: string;
  contactEmail?: string;
}

const GQL_FRAGMENT_ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    createdAt
    updatedAt
    items # including id, quantity, priceSnapshot, discountSnapshot
    userId
    status
    shippingCountry
    shippingState
    shippingCity
    shippingPostCode
    shippingAddress
    contactFirstname
    contactLastname
    contactPhone
    contactEmail
  }
`;

/**
 * Query
 */
export const GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_ORDER_ID = gql`
  query getOrderAndProductDetailsByOrderId($id: ID!) {
    getOrderAndProductDetailsByOrderId(id: $id) {
      ...OrderDetails
      itemDetails {
        id
        name
        artist
        userId
        user {
          id
          shopName
        }
        stock
        price
        discount
        images
      }
    }
  }
  ${GQL_FRAGMENT_ORDER_DETAILS}
`;

// for role as a customer
export const GQL_GET_ORDER_AND_PRODUCT_DETAILS_BY_CUSTOMER_ID = gql`
  query {
    getOrderAndProductDetailsByCustomerId {
      ...OrderDetails
      itemDetails {
        id
        name
        artist
        userId
        user {
          id
          shopName
        }
        stock
        price
        discount
        images
      }
    }
  }
  ${GQL_FRAGMENT_ORDER_DETAILS}
`;

/**
 * Mutate
 */
export const GQL_ORDER_INITIATE = gql`
  mutation initiateOrder($items: [OrderItems!]!) {
    initiateOrder(items: $items) {
      id
      items
    }
  }
`;
export const GQL_UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: UpdateOrdertInput!) {
    updateOrder(id: $id, input: $input) {
      ...OrderDetails
    }
  }
  ${GQL_FRAGMENT_ORDER_DETAILS}
`;

export const GQL_ON_ORDER_COMPLETED = gql`
  mutation onOrderCompleted($id: ID!) {
    onOrderCompleted(id: $id) {
      products {
        id
        stock
      }
      user {
        id
        cart
      }
    }
  }
`;

/**
 * Delete
 */
export const GQL_DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
