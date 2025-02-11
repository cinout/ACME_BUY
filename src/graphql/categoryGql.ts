import { gql } from "@apollo/client";

const GQL_FRAGMENT_CATEGORY_DETAILS = gql`
  fragment CategoryDetails on Category {
    id
    name
    imageUrl
    imageName
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
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
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
