import api from "@/utils/api";
import { RoleEnum, SellerSignupMethodEnum } from "@/utils/enums";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
export interface FormSellerSignupProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  agree: boolean;
  signupMethod: SellerSignupMethodEnum;
}

export interface FormAdminLoginProps {
  email: string;
  password: string;
}
export interface FormSellerLoginProps {
  email: string;
  password: string;
}

export const admin_login = createAsyncThunk<unknown, FormAdminLoginProps>(
  "auth/admin_login",
  async (info, thunkAPI) => {
    try {
      const result = await api.post("auth/admin-login", info);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      );
    }
  }
);

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

export const seller_login = createAsyncThunk<unknown, FormSellerLoginProps>(
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

// TODO: update second "unknown"
export const get_user = createAsyncThunk<unknown, void>(
  "auth/get_user",
  async (_, thunkAPI) => {
    try {
      const result = await api.get("auth/get-user");
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      ); // "error" is a custom key, see src/controllers/authController.ts in backend
    }
  }
);

interface CustomJwtPayload {
  exp: number;
  email: string;
  role: RoleEnum;
}

function get_user_basic_info() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const { exp, email, role } = jwtDecode<CustomJwtPayload>(accessToken);
    const expireTime = new Date(exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return; // TODO: how to use it?
    } else {
      return { email, role };
    }
  }
}

interface AuthState {
  showLoader: boolean;
  role: RoleEnum | undefined;
  userInfo: unknown; // TODO: better type for it?
}

const initialState: AuthState = {
  showLoader: false,
  role: undefined,
  userInfo: undefined,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserRole: (state) => {
      const info = get_user_basic_info();
      if (info) {
        state.role = info.role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(admin_login.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(admin_login.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.showLoader = false;
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken); // TODO: securer way to handle it?
        const info = get_user_basic_info();
        if (info) {
          state.role = info.role;
        }
      })

      // Seller Signup
      .addCase(seller_signup.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(seller_signup.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(seller_signup.fulfilled, (state, action) => {
        state.showLoader = false;
        // TODO: think of a safer option
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken); // TODO: you need to remove from localStorage when user log out
        const info = get_user_basic_info();
        if (info) {
          state.role = info.role;
        }
      })

      // Seller Login
      .addCase(seller_login.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(seller_login.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.showLoader = false;
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken);
        const info = get_user_basic_info();
        if (info) {
          state.role = info.role;
        }
      })

      // Get User Info
      .addCase(get_user.pending, (state) => {
        // state.showLoader = true;
      })
      .addCase(get_user.rejected, (state) => {
        // TODO: what is there is error getting user info?
        // state.showLoader = false;
      })
      .addCase(get_user.fulfilled, (state, action) => {
        state.userInfo = (action.payload as { userInfo: unknown }).userInfo;
      });
  },
});

export const { updateUserRole } = authReducer.actions;
export default authReducer.reducer;
