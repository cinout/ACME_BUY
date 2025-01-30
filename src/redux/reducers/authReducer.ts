import api from "@/utils/api";
import { SellerSignupMethodEnum } from "@/utils/enums";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FormSellerSignupProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  agree: boolean;
  signupMethod: SellerSignupMethodEnum;
}

export interface FormSellerLoginProps {
  email: string;
  password: string;
}

export const admin_login = createAsyncThunk<
  unknown, // TODO: is this right?
  FormSellerLoginProps
>("auth/admin_login", async (info, thunkAPI) => {
  try {
    // TODO: shouldn't we use GET method?
    const result = await api.post("auth/admin-login", info);
    return thunkAPI.fulfillWithValue(result.data);
  } catch (e) {
    return thunkAPI.rejectWithValue(
      ((e as AxiosError).response?.data as { error: string }).error
    );
  }
});

// first type is return type, second type is input type
export const seller_signup = createAsyncThunk<unknown, FormSellerSignupProps>(
  "auth/seller_signup",
  async (info, thunkAPI) => {
    try {
      const result = await api.post("auth/seller-signup", info);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      ); // "error" is a custom key, see src/controllers/authController.ts in backend
    }
  }
);

export const seller_login = createAsyncThunk<unknown, FormSellerSignupProps>(
  "auth/seller_login",
  async (info, thunkAPI) => {
    try {
      const result = await api.post("auth/seller-login", info);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      ); // "error" is a custom key, see src/controllers/authController.ts in backend
    }
  }
);

interface AuthState {
  // userInfo: string;
  // errorMessage: string;
  // successMessage: string;
  showLoader: boolean;
}

const initialState: AuthState = {
  // successMessage: "",
  // errorMessage: "",
  showLoader: false,
  // userInfo: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // clearToastMsg: (state) => {
    //   state.errorMessage = "";
    //   state.successMessage = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(admin_login.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.showLoader = false;
        // state.errorMessage = action.payload;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.showLoader = false;
        // state.successMessage = action.payload;
      })

      // Seller Signup
      .addCase(seller_signup.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(seller_signup.rejected, (state, action) => {
        state.showLoader = false;
        // state.errorMessage = action.payload;
      })
      .addCase(seller_signup.fulfilled, (state, action) => {
        state.showLoader = false;
        // state.successMessage = action.payload;
      })

      // Seller Login
      .addCase(seller_login.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.showLoader = false;
        // state.errorMessage = action.payload;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.showLoader = false;
        // state.successMessage = action.payload;
      });
  },
});

// export const { clearToastMsg } = authReducer.actions;
export default authReducer.reducer;
