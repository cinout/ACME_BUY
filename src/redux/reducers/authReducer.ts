import api from "@/api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const admin_login = createAsyncThunk<
  unknown, // TODO: is this right?
  { email: string; password: string } // TODO: is this right?
>("auth/admin_login", async (info, thunkAPI) => {
  try {
    const result = await api.post("auth/admin-login", info, {
      withCredentials: true, // TODO: how to understand this
    });
    return thunkAPI.fulfillWithValue(result.data);
  } catch (e) {
    return thunkAPI.rejectWithValue((e as AxiosError).response?.data);
  }
});

export interface authState {
  userInfo: string;
  errorMessage: string;
  successMessage: string;
  showLoader: boolean;
}

const initialState: authState = {
  successMessage: "",
  errorMessage: "",
  showLoader: false,
  userInfo: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToastMsg: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.showLoader = false;
        const errorMessage = (action.payload as { error: string }).error; // "error" is a custom key, see src/controllers/authController.ts in backend
        state.errorMessage = errorMessage;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.showLoader = false;
        state.successMessage = (action.payload as { message: string }).message; // "message" is also a custom key
      });
  },
});

export const { clearToastMsg } = authReducer.actions;
export default authReducer.reducer;
