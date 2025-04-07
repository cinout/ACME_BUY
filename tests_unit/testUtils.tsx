import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import { MemoryRouter } from "react-router-dom"; //  a lightweight router used for testing; doesn’t rely on a real browser environment
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://localhost:8000/api/graphql", //TODO: what to do when prod env?
    headers: {
      "Apollo-Require-Preflight": "true",
    },
    credentials: "include", // for cookies etc
  }),
  cache: new InMemoryCache(),
  connectToDevTools: false, // Suppress the DevTools message
});

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ApolloProvider client={client}>{ui}</ApolloProvider>
      </MemoryRouter>
    </Provider>
  );
}
