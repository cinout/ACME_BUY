import { gql } from "@apollo/client";

const GQL_FRAGMENT_PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    name
    artist
    genreId
    sellerId
    stock
    price
    discount
    images
    rating
    description
    year
    format
    grading
    region
  }
`;

export const GQL_PRODUCT_GET_ALL_BY_SELLER = gql`
  query {
    getAllProductsBySeller {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_CREATE = gql`
  mutation createProduct(
    $name: String!
    $artist: String!
    $images: [ImageWithID!]!
    $genreId: ID!
    $stock: Int!
    $price: Float!
    $discount: Float!
    $description: String
    $year: Int!
    $format: String!
    $grading: String!
    $region: String!
  ) {
    createProduct(
      name: $name
      artist: $artist
      price: $price
      discount: $discount
      description: $description
      genreId: $genreId
      stock: $stock
      images: $images
      year: $year
      format: $format
      grading: $grading
      region: $region
    ) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_UPDATE = gql`
  mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_DELETE = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
