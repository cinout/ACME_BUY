import { gql } from "@apollo/client";
import { Entity } from ".";
import { WishListEntity } from "./wishListGql";
import { ProductEntity } from "./productGql";

export enum RoleEnum {
  Admin = "Admin",
  User = "User",
}

export enum UserStatusEnum {
  Pending = "Pending",
  Deactivated = "Deactivated",
  Active = "Active",
}

export enum UserSignupMethodEnum {
  Default = "Default",
  Google = "Google",
  Facebook = "Facebook",
}

export interface UserEntity extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  country: string;
  state: string; // equivalent to province / region
  city: string;
  zipCode: string;

  status: UserStatusEnum;
  signupMethod: UserSignupMethodEnum;
  shopName?: string;
  role: RoleEnum;

  imageUrl?: string;
  imageName?: string;
  rating: number; // TODO:[3] implement rating
  wishList?: WishListEntity[];
  wishListDetails?: (ProductEntity & { user: UserEntity })[];
  cart?: { productId: string; quantity: number }[];
}

export const GQL_FRAGMENT_USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    firstname
    lastname
    email
    status
    signupMethod
    shopName
    country
    state
    city
    zipCode
    imageUrl
    imageName
    role
    rating
    wishList {
      id
      userId
      productId
      createdAt
    }
    cart
  }
`;

/**
 * Queries
 */
// get current user's basic details
export const GQL_USER_GET_CURRENT = gql`
  query {
    getCurrentUser {
      ...UserDetails
    }
  }
  ${GQL_FRAGMENT_USER_DETAILS}
`;

// get current user's wishList details
export const GQL_GET_CURRENT_USER_WISHLIST_DETAILS = gql`
  query {
    getCurrentUserWishListDetails {
      id
      wishListDetails {
        id
        name
        artist
        userId
        user {
          id
          shopName
          imageUrl
          country
          state
          city
          rating
        }
        stock
        price
        discount
        images
        year
        format
        grading
        region
        status
      }
    }
  }
`;

export const GQL_USER_GET_ALL = gql`
  query {
    getAllUsers {
      ...UserDetails
    }
  }
  ${GQL_FRAGMENT_USER_DETAILS}
`;

export const GQL_GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      ...UserDetails
    }
  }
  ${GQL_FRAGMENT_USER_DETAILS}
`;

export const GQL_GET_CURRENT_USER_CART_DETAILS = gql`
  query {
    getCurrentUserCartDetails {
      cart
      cartDetails {
        id
        name
        artist
        userId
        user {
          id
          shopName
          imageUrl
          country
          state
          city
          rating
        }
        stock
        price
        discount
        images
        year
        format
        grading
        region
      }
    }
  }
`;

/**
 * Mutation
 */
export const GQL_USER_UPDATE_CURRENT = gql`
  mutation updateCurrentUser($input: UpdateUserInput!) {
    updateCurrentUser(input: $input) {
      ...UserDetails
    }
  }
  ${GQL_FRAGMENT_USER_DETAILS}
`;

export const GQL_USER_UPDATE_STATUS_BY_ADMIN = gql`
  mutation updateUserStatusByAdmin($id: ID!, $status: UserStatusEnum!) {
    updateUserStatusByAdmin(id: $id, status: $status) {
      id
      status
    }
  }
`;
