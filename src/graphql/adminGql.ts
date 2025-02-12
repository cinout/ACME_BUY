import { gql } from "@apollo/client";

const GQL_FRAGMENT_ADMIN_DETAILS = gql`
  fragment AdminDetails on Admin {
    id
    firstname
    lastname
    email
    imageUrl
    imageName
  }
`;

export const GQL_ADMIN_GET_CURRENT = gql`
  query {
    getCurrentAdmin {
      ...AdminDetails
    }
  }
  ${GQL_FRAGMENT_ADMIN_DETAILS}
`;
