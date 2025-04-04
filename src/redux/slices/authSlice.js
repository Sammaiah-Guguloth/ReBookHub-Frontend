import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios/axiosInstance";
import { USER_PROFILE_URL, USER_LOGOUT_URL } from "../../api/apis";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(USER_PROFILE_URL, {
        withCredentials: true,
      });
      // console.log("response in slice : ", response);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "/auth/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        USER_LOGOUT_URL,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        return true; // Return a success response
      }

      return rejectWithValue("Logout failed");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Network Error");
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  isLogOutSuccess: false,
  error: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })

      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
        state.user = null;
        state.isLogOutSuccess = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload || "Failed to Log out";
      });
  },
});

export const { setUser, setIsLoading, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
