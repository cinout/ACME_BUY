import { ApolloError } from "@apollo/client";

// TODO: is this recommended?
export function getErrorMessage(err: ApolloError) {
  let errorMessage = "";
  if (err.graphQLErrors.length > 0) {
    errorMessage = err.graphQLErrors.map((e) => e.message).join("; ");
  } else if (err.networkError) {
    errorMessage = err.networkError.message;
  } else if (err.clientErrors.length > 0) {
    errorMessage = err.clientErrors.map((e) => e.message).join("; ");
  } else if (err.protocolErrors.length > 0) {
    errorMessage = err.protocolErrors.map((e) => e.message).join("; ");
  }
  return errorMessage;
}
