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

export const adminLogin = createAsyncThunk<unknown, FormAdminLoginProps>(
  "auth/adminLogin",
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
export const sellerSignup = createAsyncThunk<unknown, FormSellerSignupProps>(
  "auth/sellerSignup",
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

export const sellerLogin = createAsyncThunk<unknown, FormSellerLoginProps>(
  "auth/sellerLogin",
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
export const getUser = createAsyncThunk<unknown, void>(
  "auth/getUser",
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

function getUserBasicInfo() {
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

// TODO: should I move this to GQL as well?
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserRole: (state) => {
      const info = getUserBasicInfo();
      if (info) {
        state.role = info.role;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.showLoader = false;
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken); // TODO: securer way to handle it?
        const info = getUserBasicInfo();
        if (info) {
          state.role = info.role;
        }
      })

      // Seller Signup
      .addCase(sellerSignup.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(sellerSignup.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(sellerSignup.fulfilled, (state, action) => {
        state.showLoader = false;
        // TODO: think of a safer option
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken); // TODO: you need to remove from localStorage when user log out
        const info = getUserBasicInfo();
        if (info) {
          state.role = info.role;
        }
      })

      // Seller Login
      .addCase(sellerLogin.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(sellerLogin.rejected, (state) => {
        state.showLoader = false;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.showLoader = false;
        const accessToken = (action.payload as { accessToken: string })
          .accessToken;
        localStorage.setItem("accessToken", accessToken);
        const info = getUserBasicInfo();
        if (info) {
          state.role = info.role;
        }
      })

      // Get User Info
      .addCase(getUser.pending, (state) => {
        // state.showLoader = true;
      })
      .addCase(getUser.rejected, (state) => {
        // TODO: what is there is error getting user info?
        // state.showLoader = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo = (action.payload as { userInfo: unknown }).userInfo;
      });
  },
});

export const { updateUserRole } = authReducer.actions;
export default authReducer.reducer;
