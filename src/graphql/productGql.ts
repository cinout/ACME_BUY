import { gql } from "@apollo/client";
import { GenreEntity } from "./genreGql";
import { UserEntity } from "./userGql";
import { Entity } from ".";

/**
 * Selector Options
 */
export enum MediaFormatEnum {
  Box_Set = "Box Set",
  Cassette = "Cassette",
  CD = "CD",
  Digital = "Digital",
  DVD_BlueRay = "DVD & BlueRay",
  Vinyl_7 = "7'' Vinyl",
  Vinyl_10 = "10'' Vinyl",
  Vinyl_12 = "12'' Vinyl",
  Others = "Others",
}

export enum ReleaseYearRangeEnum {
  y2020s = "2020s",
  y2010s = "2010s",
  y2000s = "2000s",
  y1990s = "1990s",
  y1980s = "1980s",
  y1970s = "1970s",
  y1960s = "1960s",
  y1950s = "1950s",
  y1940s = "1940s",
  y1930s = "1930s",
  y1920s = "1920s",
  y1910s = "1910s",
  y1900s = "1900s",
  Earlier = "Earlier",
}

export enum GradingEnum {
  Mint = "Mint",
  Near_Mint = "Near Mint",
  Very_Good = "Very Good",
  Fair = "Fair",
  Poor = "Poor",
}

export enum ReleaseRegionEnum {
  North_America = "North America",
  South_America = "South America",
  Europe = "Europe",
  Oceania = "Oceania",
  Japan = "Japan",
  Asia = "Asia",
  Others = "Others",
}

export enum ProductStatusEnum {
  Active = "Active",
  Removed = "Removed",
}

export function translateYearToYearRangeEnum(year: number) {
  if (year < 1900) {
    return ReleaseYearRangeEnum.Earlier;
  } else if (year < 1910) {
    return ReleaseYearRangeEnum.y1900s;
  } else if (year < 1920) {
    return ReleaseYearRangeEnum.y1910s;
  } else if (year < 1930) {
    return ReleaseYearRangeEnum.y1920s;
  } else if (year < 1940) {
    return ReleaseYearRangeEnum.y1930s;
  } else if (year < 1950) {
    return ReleaseYearRangeEnum.y1940s;
  } else if (year < 1960) {
    return ReleaseYearRangeEnum.y1950s;
  } else if (year < 1970) {
    return ReleaseYearRangeEnum.y1960s;
  } else if (year < 1980) {
    return ReleaseYearRangeEnum.y1970s;
  } else if (year < 1990) {
    return ReleaseYearRangeEnum.y1980s;
  } else if (year < 2000) {
    return ReleaseYearRangeEnum.y1990s;
  } else if (year < 2010) {
    return ReleaseYearRangeEnum.y2000s;
  } else if (year < 2020) {
    return ReleaseYearRangeEnum.y2010s;
  } else if (year < 2030) {
    return ReleaseYearRangeEnum.y2020s;
  } else {
    throw Error("not available year range");
  }
}

export interface ProductEntity extends Entity {
  name: string;
  artist: string;
  stock: number;
  price: number;
  discount: number;
  description?: string;
  genreIds: string[];
  tracklist?: { title: string; indexDisplay: string }[];
  genres: GenreEntity[];
  userId: string;
  user?: UserEntity;
  images: { id: string; file: string; name: string }[];
  region: ReleaseRegionEnum;
  grading: GradingEnum;
  format: MediaFormatEnum;
  year: number;
  status: ProductStatusEnum;
}

export interface FormProductProps {
  id: string;
  name: string;
  artist: string;
  genreIds: string[];
  tracklist: { title: string; indexDisplay: string }[];
  stock: number;
  price: number;
  discount: number;
  description: string;
  images: { id: string; file: File | string; name: string }[];
  year: number;
  format: MediaFormatEnum;
  grading: GradingEnum;
  region: ReleaseRegionEnum;
}

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
  # $id the the productId
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
