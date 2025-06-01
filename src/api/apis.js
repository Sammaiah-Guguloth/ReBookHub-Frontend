const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// USER API'S
export const SEND_OTP_URL = `/user/send-otp`;
export const REGISTER_URL = `/user/register`;
export const LOGIN_URL = `/user/login`;
export const USER_PROFILE_URL = `/user/profile`;
export const USER_LOGOUT_URL = `/user/logout`;
export const UPDATE_USER = "/user/update";

// BOOK API'S
export const ADD_BOOK_URL = "/book/add";
export const GET_BOOK_BY_ID = "/book/book-by-id";
export const GET_ALL_BOOKS = "/book/all-books";
export const DELETE_BOOK = "/book/delete";
export const GET_MYBOOKS = "/book/my-books";
export const SEARCH_BOOKS_BY_QUERY = "/book/search";
export const GET_BOOKS_BY_GENRE = "/book/books-by-genre";

// Home feed API
export const GET_HOME_FEED = "/home/default-feed";

// Payment and orders API's
export const CREATE_ORDER = "/payments/create-order";
export const VERIFY_PAYMENT = "/payments/verify-payment";

export const GET_ORDER_BY_ID = "/orders/order-by-id";
export const ACCEPT_ORDER = "/orders/accept-order";
export const REJECT_ORDER = "/orders/reject";
export const ORDER_SHIPPED = "/orders/order-shipped";
export const TRACK_ORDER = "/mock-delivery/track-order";
export const ORDERS_BY_USER_ID = "/orders/orders-by-buyer";
export const SOLD_ORDERS_BY_USER_ID = "/orders/sold-orders";

// Analytics // at last /:bookId
export const UPDATE_VIEWS = "/analytics/update/views";
export const UPDATE_ATTEMPTED_PURCHASES =
  "/analytics/update/attempted-purchase";
