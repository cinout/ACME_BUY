import api from "@/utils/api";
import { RoleEnum, UserSignupMethodEnum } from "@/graphql/userGql";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export interface FormUserSignupProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  agree: boolean;
  signupMethod: UserSignupMethodEnum;
}

export interface FormUserLoginProps {
  email: string;
  password: string;
}

/**
 * Async Thunks
 */

// first type is return type, second type is input type
export const userSignup = createAsyncThunk<unknown, FormUserSignupProps>(
  "auth/userSignup",
  async (info, thunkAPI) => {
    try {
      const result = await api.post("auth/user-signup", info); // TODO:[1] try using .post<ReturnType>() to set the type for result. This is equivalent to type assert, so use with caution
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      ); // "error" is a custom key, see src/controllers/authController.ts in backend
    }
  }
);

export const userLogin = createAsyncThunk<unknown, FormUserLoginProps>(
  "auth/userLogin",
  async (info, thunkAPI) => {
    try {
      const result = await api.post("auth/user-login", info);
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

// export const logout = createAsyncThunk<unknown, void>(
//   "auth/logout",
//   async (_, thunkAPI) => {
//     try {
//       const result = await api.post("auth/logout");
//       return thunkAPI.fulfillWithValue(result.data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(
//         ((e as AxiosError).response?.data as { error: string }).error
//       );
//     }
//   }
// );

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
    afterLogout: (state) => {
      localStorage.removeItem("accessToken");
      state.role = undefined;
      // state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Signup
      .addCase(userSignup.fulfilled, (state, action) => {
        afterSignupOrLogin(state, action);
      })

      // User Login
      .addCase(userLogin.fulfilled, (state, action) => {
        afterSignupOrLogin(state, action);
      });
    // TODO:[2] what if there is error getting user info? (probably redirect to a page asking to login as either
  },
});

export const { updateUserRole, afterLogout } = authReducer.actions;
export default authReducer.reducer;
