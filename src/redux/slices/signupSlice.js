import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isOtpSent: false,
  isRegistered: false,
  isLoading: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
    otpSent: (state) => {
      state.isOtpSent = true;
    },
    registrationSuccess: (state) => {
      state.isRegistered = true;
    },
    clearSignupState: (state) => {
      state.userData = null;
      state.isOtpSent = false;
      state.isRegistered = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  storeUserData,
  otpSent,
  registrationSuccess,
  clearSignupState,
  setLoading,
} = signupSlice.actions;
export default signupSlice.reducer;
