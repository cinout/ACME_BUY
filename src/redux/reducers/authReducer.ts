import api from "@/utils/api";
import {
  RoleEnum,
  SellerSignupMethodEnum,
  SellerStatusEnum,
} from "@/utils/enums";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { AdminEntity, SellerEntity } from "@/utils/entities";

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

/**
 * Async Thunks
 */
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
      );
    }
  }
);

export const getUser = createAsyncThunk<unknown, void>(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const result = await api.get("auth/get-user");
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      );
    }
  }
);

export const logout = createAsyncThunk<unknown, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const result = await api.post("auth/logout");
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      );
    }
  }
);

interface CustomJwtPayload {
  exp: number;
  email: string;
  role: RoleEnum;
}

/**
 * Reusable functions
 */
function getUserBasicInfo() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const { exp, email, role } = jwtDecode<CustomJwtPayload>(accessToken);
    const expireTime = new Date(exp * 1000); // TODO: double check this code
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken"); // remove if expired
      return; // TODO: need to do anything else?
    } else {
      return { email, role };
    }
  }
}

function afterSignupOrLogin(
  state: WritableDraft<AuthState>,
  action: { payload: unknown }
) {
  const accessToken = (action.payload as { accessToken: string }).accessToken;
  localStorage.setItem("accessToken", accessToken);
  const info = getUserBasicInfo();
  if (info) {
    state.role = info.role;
  }
}

interface AuthState {
  role: RoleEnum | undefined;
  // userInfo: SellerEntity | AdminEntity | undefined; // TODO: customer as well
  updateUserRoleDoneOnFirstRender: boolean;
}

const initialState: AuthState = {
  role: undefined,
  // userInfo: undefined,
  updateUserRoleDoneOnFirstRender: false,
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
      state.updateUserRoleDoneOnFirstRender = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Login
      .addCase(adminLogin.fulfilled, (state, action) => {
        afterSignupOrLogin(state, action);
      })

      // Seller Signup
      .addCase(sellerSignup.fulfilled, (state, action) => {
        afterSignupOrLogin(state, action);
      })

      // Seller Login
      .addCase(sellerLogin.fulfilled, (state, action) => {
        afterSignupOrLogin(state, action);
      })

      // // Get User Info
      // .addCase(getUser.rejected, (state) => {
      //   // TODO: what if there is error getting user info? (probably redirect to a page asking to login as either seller/customer/admib)
      // })
      // .addCase(getUser.fulfilled, (state, action) => {
      //   const { userInfo, role } = action.payload as {
      //     userInfo: SellerEntity | AdminEntity;
      //     role: RoleEnum;
      //   };
      //   state.userInfo = userInfo;
      //   state.role = role;
      // })

      // Log Out
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");
        state.role = undefined;
        // state.userInfo = undefined;
      });
  },
});

export const { updateUserRole } = authReducer.actions;
export default authReducer.reducer;
