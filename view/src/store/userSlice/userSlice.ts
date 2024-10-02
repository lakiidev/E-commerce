import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, logout, register } from "../../controller/auth";
import axios from "axios";
export interface InitialState {
  isLoadingUser: boolean;
  isLoggedIn: boolean;
  user:
    | undefined
    | {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
  error: string | null;
}

const initialState: InitialState = {
  isLoadingUser: false,
  isLoggedIn: false,
  user: undefined,
  error: null,
};

export interface LoginErrorPayload {
  message: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}
interface LoginResponse {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  isLoggedIn: boolean;
}

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLogin",
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();
      return {
        cart: response.cart,
        isLoggedIn: true,
        user: response.user,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginErrorPayload }
>("auth/login", async (credentials: LoginCredentials, thunkAPI) => {
  try {
    const response = await login(credentials);
    return {
      user: response,
      isLoggedIn: true,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      let errorMessage = "An unexpected error occurred";
      if (error.response?.status === 401) {
        errorMessage = error.response.data.message || "Authentication failed";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error occurred";
      }
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
    return thunkAPI.rejectWithValue({ message: "An unknown error occurred" });
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await logout();
    return {
      isLoggedIn: false,
      user: undefined,
    };
  } catch (error) {
    throw error;
  }
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      return {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.message || "An unexpected error occurred";
        return thunkAPI.rejectWithValue({ message: errorMessage });
      }
      return thunkAPI.rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoadingUser = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        const { isLoggedIn } = action.payload;
        state.isLoggedIn = isLoggedIn;
        const { user } = action.payload;
        Object.assign(state, user);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        const { isLoggedIn } = action.payload;
        state.isLoggedIn = isLoggedIn;
        const { user } = action.payload;
        Object.assign(state, user);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.isLoggedIn = true;
        // state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error =
          (action.payload as LoginErrorPayload)?.message ||
          "An unexpected error occurred";
        state.isLoggedIn = false;
        state.isLoadingUser = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error =
          (action.payload as LoginErrorPayload)?.message ||
          "An unexpected error occurred";
        state.isLoggedIn = false;
        state.isLoadingUser = false;
      });
  },
});

export default userSlice.reducer;
