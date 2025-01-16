import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,

  // TODO: how to understand
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // TODO: how to understand this syntax
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
