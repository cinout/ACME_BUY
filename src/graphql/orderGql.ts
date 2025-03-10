import { gql } from "@apollo/client";
import { GQL_FRAGMENT_PRODUCT_DETAILS } from "./productGql";
import { GQL_FRAGMENT_USER_DETAILS } from "./userGql";

const GQL_FRAGMENT_ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    items # including id, quantity and so on
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
