import { gql } from "@apollo/client";

const GQL_FRAGMENT_SELLER_DETAILS = gql`
  fragment SellerDetails on Seller {
    id
    firstname
    lastname
    email
    status
    signupMethod
    country
    state
    city
    zipCode
    imageUrl
    imageName
  }
`;

export const GQL_SELLER_GET_CURRENT = gql`
  query {
    getCurrentSeller {
      ...SellerDetails
    }
  }
  ${GQL_FRAGMENT_SELLER_DETAILS}
`;
