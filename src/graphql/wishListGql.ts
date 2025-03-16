import { gql } from "@apollo/client";
import { Entity } from ".";

export interface WishListEntity extends Entity {
  userId: string;
  productId: string;
}

export const GQL_FRAGMENT_WISHLIST_DETAILS = gql`
  fragment WishListDetails on WishList {
    id
    createdAt
    userId
    productId
  }
`;

/**
 * Mutation
 */
export const GQL_ADD_ITEM_TO_WISHLIST_BY_USER = gql`
  mutation addItemToWishListByUser($productId: ID!) {
    addItemToWishListByUser(productId: $productId) {
      ...WishListDetails
    }
  }
  ${GQL_FRAGMENT_WISHLIST_DETAILS}
`;

export const GQL_REMOVE_WISHLIST_ITEM_BY_USER = gql`
  mutation removeWishListItemByUser($id: ID!) {
    removeWishListItemByUser(id: $id)
  }
`;
