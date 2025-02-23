import { gql } from "@apollo/client";

const GQL_FRAGMENT_PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    name
    artist
    genreIds
    tracklist
    userId
    stock
    price
    discount
    images
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

// Home Page Queries with COUNT limit
export const GQL_PRODUCT_GET_NEWEST = gql`
  query getNewestProducts($count: Int!) {
    getNewestProducts(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_NEWEST_VINYLS = gql`
  query getNewVinyls($count: Int!) {
    getNewVinyls(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_NEWEST_CDS = gql`
  query getNewCDs($count: Int!) {
    getNewCDs(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_NEWEST_CASSETTES = gql`
  query getNewCassettes($count: Int!) {
    getNewCassettes(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_NEW_RELEASE = gql`
  query getNewReleases($count: Int!) {
    getNewReleases(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_OLD_RELEASE = gql`
  query getOldReleases($count: Int!) {
    getOldReleases(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_DISCOUNTED = gql`
  query getDiscounted($count: Int!) {
    getDiscounted(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

export const GQL_PRODUCT_GET_MINT = gql`
  query getMint($count: Int!) {
    getMint(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

// TODO:[1] need to include current product
export const GQL_PRODUCT_GET_SIMILAR = gql`
  query getSimilar($count: Int!) {
    getSimilar(count: $count) {
      ...ProductDetails
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

// Specific Product Query
export const GQL_PRODUCT_GET_BY_ID = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      id
      name
      artist
      genres {
        id
        name
      }
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
      description
      year
      format
      grading
      region
      tracklist
    }
  }
`;

/**
 * Create
 */
export const GQL_PRODUCT_CREATE = gql`
  mutation createProduct(
    $name: String!
    $artist: String!
    $images: [ImageWithID!]!
    $tracklist: [TrackList!]!
    $genreIds: [ID!]!
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
      genreIds: $genreIds
      tracklist: $tracklist
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
