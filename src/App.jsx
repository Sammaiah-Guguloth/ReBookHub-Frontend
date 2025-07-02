import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Otp from "./pages/Otp";
import OtpProtectedRoute from "./components/OtpProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Spinner from "./components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/slices/authSlice";
import Profile from "./pages/Profile";
import MyBooks from "./pages/MyBooks";
import SoldBooks from "./pages/SoldBooks";
import AddBook from "./pages/AddBook";
import Checkout from "./pages/Checkout";
import SearchResults from "./pages/SearchResults";
import PaymentSuccess from "./pages/PaymentSuccess";
import SellerOrderPage from "./pages/SellerOrderPage";
import ShippingForm from "./pages/ShippingForm";
import TrackOrder from "./pages/TrackOrder";
import Orders from "./pages/Orders";
import HowItWorks from "./pages/HowItWorks";
import BooksByGenre from "./pages/BooksByGenre";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center mt-32 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="font-sans w-full">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<HowItWorks />} />

        <Route
          path="/otp"
          element={
            <OtpProtectedRoute>
              <Otp />
            </OtpProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <Dashboard />
            </UserProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="my-books" element={<MyBooks />} />
          <Route path="sold-books" element={<SoldBooks />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/search" element={<SearchResults />} />

        <Route path="/books/:genre" element={<BooksByGenre />} />

        <Route
          path="/checkout/:bookId"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/seller/orders/:orderId" element={<SellerOrderPage />} />

        <Route
          path="/seller/orders/:orderId/shipping"
          element={<ShippingForm />}
        />

        <Route path="/track-order/:trackingId" element={<TrackOrder />} />
      </Routes>
    </div>
  );
};

export default App;
