import { gql } from "@apollo/client";

export const GQL_AUTH_LOG_OUT = gql`
  mutation {
    logout
  }
`;
