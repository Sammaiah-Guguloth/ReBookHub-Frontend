const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// USER API'S
export const SEND_OTP_URL = `/user/send-otp`;
export const REGISTER_URL = `/user/register`;
export const LOGIN_URL = `/user/login`;
export const USER_PROFILE_URL = `/user/profile`;
export const USER_LOGOUT_URL = `/user/logout`;

// BOOK API'S
export const ADD_BOOK_URL = "/book/add";
export const GET_BOOK_URL = "/book/book-by-id";
export const GET_ALL_BOOKS = "/book/all-books";
export const DELETE_BOOK = "/book/delete";
export const GET_MYBOOKS = "/book/my-books";
