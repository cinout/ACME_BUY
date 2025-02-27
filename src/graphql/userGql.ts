import { gql } from "@apollo/client";

const GQL_FRAGMENT_USER_DETAILS = gql`
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
    wishList
    cart
  }
`;

/**
 * Queries
 */
export const GQL_USER_GET_CURRENT = gql`
  query {
    getCurrentUser {
      ...UserDetails
    }
  }
  ${GQL_FRAGMENT_USER_DETAILS}
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
