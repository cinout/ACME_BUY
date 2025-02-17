import { gql } from "@apollo/client";

// TODO:[2] each user should also have "rating", "wish list"
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
  }
`;

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
