import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import {
  fetchUser,
  setIsLoading,
  setIsLoggedIn,
} from "../redux/slices/authSlice";

const UserProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isLoading, isLoggedIn, isLogOutSuccess } = useSelector(
    (state) => state.auth
  );
  // const [checkingAuth, setCheckingAuth] = useState(true); // New state to manage authentication check

  // useEffect(() => {
  //     const verifyUser = async () => {
  //         try {
  //             dispatch(setIsLoading(true));
  //             const result = await dispatch(fetchUser());

  //             if (result.meta.requestStatus === "fulfilled") {
  //                 dispatch(setIsLoggedIn(true));
  //             } else {
  //                 toast.error(result.payload || "Authentication failed. Please login.");
  //             }
  //         } catch (error) {
  //             console.error("Error while authenticating:", error);
  //         } finally {
  //             dispatch(setIsLoading(false));
  //             setCheckingAuth(false); // Mark that authentication check is done
  //         }
  //     };

  //     if (!isLoggedIn && !isLogOutSuccess) {
  //         verifyUser();
  //     } else {
  //         setCheckingAuth(false); // No need to verify if already logged in
  //     }
  // }, [dispatch, isLoggedIn , isLogOutSuccess]);

  // if (isLoading || checkingAuth) {
  //     return (
  //         <>
  //             <NavBar />
  //             <div className='w-full flex items-center justify-center mt-28'>
  //                 <Spinner />
  //             </div>
  //         </>
  //     );
  // }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;
