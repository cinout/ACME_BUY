import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { email: string; name: string } | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    // TODO: modify this
    setUser: (
      state,
      action: PayloadAction<{
        user: { email: string; name: string };
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // TODO: modify this
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;
export default userReducer.reducer;
