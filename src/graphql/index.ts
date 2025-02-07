import { ApolloError } from "@apollo/client";

// TODO: is this way to handle error recommended?
export function getErrorMessage(err: ApolloError) {
  let errorMessage = "";
  if (err.graphQLErrors.length > 0) {
    errorMessage = err.graphQLErrors.map((e) => e.message).join("; ");
  } else if (err.networkError) {
    // Arrived when server is down

    errorMessage = err.networkError.message;
  } else if (err.clientErrors.length > 0) {
    errorMessage = err.clientErrors.map((e) => e.message).join("; ");
  } else if (err.protocolErrors.length > 0) {
    errorMessage = err.protocolErrors.map((e) => e.message).join("; ");
  }
  return errorMessage;
}
