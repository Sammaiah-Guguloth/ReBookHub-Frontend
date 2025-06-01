import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/signupSlice";
import authReducer from "./slices/authSlice";
import myBooksReducer from "./slices/myBooksSlice";
import homeReducer from "./slices/homeSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    mybooks: myBooksReducer,
    home: homeReducer,
  },
});

export default store;
