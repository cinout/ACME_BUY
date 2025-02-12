import { gql } from "@apollo/client";

const GQL_FRAGMENT_PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    id
    name
    brand
    categoryId
    sellerId
    stock
    price
    discount
    images
    rating
    description
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
    $brand: String!
    $images: [ImageWithID!]!
    $categoryId: ID!
    $stock: Int!
    $price: Float!
    $discount: Float!
    $description: String
  ) {
    createProduct(
      name: $name
      brand: $brand
      price: $price
      discount: $discount
      description: $description
      categoryId: $categoryId
      stock: $stock
      images: $images
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
