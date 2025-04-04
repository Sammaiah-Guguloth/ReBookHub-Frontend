import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice";
import authReducer from "./slices/authSlice";
import myBooksSlice from "./slices/myBooksSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    mybooks: myBooksSlice,
  },
});

export default store;
