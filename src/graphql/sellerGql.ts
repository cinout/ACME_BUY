import { gql } from "@apollo/client";

const GQL_FRAGMENT_SELLER_DETAILS = gql`
  fragment SellerDetails on Seller {
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

export const GQL_SELLER_UPDATE_CURRENT = gql`
  mutation updateCurrentSeller($input: UpdateSellerInput!) {
    updateCurrentSeller(input: $input) {
      ...SellerDetails
    }
  }
  ${GQL_FRAGMENT_SELLER_DETAILS}
`;
