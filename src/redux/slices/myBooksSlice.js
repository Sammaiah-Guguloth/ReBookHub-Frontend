import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axios/axiosInstance";
// import { GET_MYBOOKS } from "../../api/apis";

// export const fetchMyBooks = createAsyncThunk(
//   "/myBooks/fetchMyBooks",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(GET_MYBOOKS);
//       console.log("respnse : " , response);
//       return response.data.books;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message);
//     }
//   }
// );

const initialState = {
  loading: false,
  error: null,
  books: [],
};

const myBooksSlice = createSlice({
  initialState,
  name: "mybooks",
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addMyBook: (state, action) => {
      state.books.push(action.payload);
    },
    setMyBooks: (state, action) => {
      state.books = action.payload;
    },
  },

  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchMyBooks.pending, (state) => {
  //         state.loading = true;
  //         state.error = null;
  //       })
  //       .addCase(fetchMyBooks.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       })
  //       .addCase(fetchMyBooks.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.error = null;
  //         state.books = action.payload;
  //       });
  //   },
});

export const { setLoading, addMyBook, setMyBooks } = myBooksSlice.actions;
export default myBooksSlice.reducer;

// useEffect(() => {
//     const fetchBooks = async () => {
//       const result = await dispatch(fetchMyBooks());
//       if(result.type === "mybooks/fetchMyBooks/fulfilled") {
//         toast.success("Books fetched successfully");
//       }
//       else if(result.type === "mybooks/fetchMyBooks/rejected") {
//         toast.error(result.payload || "Couldn't fetch books");
//       }
//     }

//     fetchBooks();
//   } , []);
