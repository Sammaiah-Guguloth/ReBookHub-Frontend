import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeData: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setHomeData, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;
