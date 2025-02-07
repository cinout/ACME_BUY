import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Toaster } from "react-hot-toast";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { connectApolloClientToVSCodeDevTools } from "@apollo/client-devtools-vscode";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

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

// TODO: we recommend wrapping this statement in a check for e.g. process.env.NODE_ENV === "development"
const devtoolsRegistration = connectApolloClientToVSCodeDevTools(
  client,
  "ws://localhost:7095" // the default port of the VSCode DevTools is 7095
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
