import { gql } from "@apollo/client";

const GQL_FRAGMENT_CATEGORY_DETAILS = gql`
  fragment CategoryDetails on Category {
    id
    name
    imageUrl
  }
`;

export const GQL_CATEGORIES_GET_ALL = gql`
  query {
    getAllCategories {
      ...CategoryDetails
    }
  }
  ${GQL_FRAGMENT_CATEGORY_DETAILS}
`;

export const GQL_CATEGORY_CREATE = gql`
  mutation createCategory($name: String!, $image: Upload!) {
    createCategory(name: $name, image: $image) {
      ...CategoryDetails
    }
  }
  ${GQL_FRAGMENT_CATEGORY_DETAILS}
`;

export const GQL_CATEGORY_UPDATE = gql`
  mutation updateCategory($id: ID!, $name: String!, $image: Upload!) {
    updateCategory(id: $id, name: $name, image: $image) {
      ...CategoryDetails
    }
  }
  ${GQL_FRAGMENT_CATEGORY_DETAILS}
`;

export const GQL_CATEGORY_DELETE = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
