import { gql } from "@apollo/client";

export const GQL_FRAGMENT_PRODUCT_DETAILS = gql`
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
    status
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
export const GQL_PRODUCT_GET_LOW_PRICE = gql`
  query getLowPrice($count: Int!) {
    getLowPrice(count: $count) {
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

export const GQL_PRODUCT_GET_BY_USER_ID = gql`
  query getProductByUserId($id: ID!) {
    getProductByUserId(id: $id) {
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
export const GQL_PRODUCT_GET_PRODUCT_AND_RELATED_DETAILS_BY_ID = gql`
  query getProductAndRelatedDetailsById($id: ID!) {
    getProductAndRelatedDetailsById(id: $id) {
      ...ProductDetails
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
    }
  }
  ${GQL_FRAGMENT_PRODUCT_DETAILS}
`;

// paginated collection-level query
export const GQL_PRODUCT_GET_COLLECTION = gql`
  query getCollection(
    $take: Int! # number of items in a page
    $skip: Int! # number of items to skip, default value is 0
    $sorting: String # sorting method, default value is "featured"
    $filters: FilterOptions # an object
  ) {
    getCollection(
      take: $take
      skip: $skip
      sorting: $sorting
      filters: $filters
    ) {
      products {
        ...ProductDetails
      }
      count
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
