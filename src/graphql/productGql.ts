import { gql } from "@apollo/client";

const GQL_FRAGMENT_PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    name
    artist
    genreId
    userId
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

/**
 * GET (Query)
 */
export const GQL_PRODUCT_GET_ALL_BY_USER = gql`
  query {
    getAllProductsByUser {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_NEWEST = gql`
  query getNewestProducts($count: Int!) {
    getNewestProducts(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

/**
 * Create
 */
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

/**
 * Update
 */
export const GQL_PRODUCT_UPDATE = gql`
  mutation updateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

/**
 * Delete
 */
export const GQL_PRODUCT_DELETE = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
