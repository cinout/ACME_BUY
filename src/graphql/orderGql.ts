import { gql } from "@apollo/client";

const GQL_FRAGMENT_ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    items # including id, quantity and so on
    userId
    status
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
