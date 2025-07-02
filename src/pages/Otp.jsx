import React, { useState } from "react";
import {
  setLoading,
  registrationSuccess,
  clearSignupState,
} from "../redux/slices/signupSlice";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_URL } from "../api/apis";
import axiosInstance from "../api/axios/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.signup.userData);
  const isLoading = useSelector((state) => state.signup.isLoading);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length > 1) return; // Prevent entering more than one digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if not empty
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    const userInfo = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      otp: otpCode,
      address: {
        street: userData.street,
        village: userData.village,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
      },
    };

    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post(REGISTER_URL, userInfo);

      if (response.status === 201) {
        toast.success("User registered successfully");
        dispatch(registrationSuccess());
        navigate("/login");
        dispatch(clearSignupState());
      }
    } catch (error) {
      // console.log("Error : " , error);
      const response = error.response;
      if (response.status === 401) {
        toast.error("Invalid OTP");
      } else if (response.status === 400) {
        toast.error("Validation Errors");
        navigate("/signup");
      } else if (response.status === 409) {
        toast.error("User already exists");
      } else if (response.status === 500) {
        toast.error(" Server Error");
      } else {
        toast.error("Couldn't register the user right now");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full flex items-center justify-center mt-28">
          <Spinner />
        </div>
      </>
    );
  }
  const isOtpComplete = otp.every((value) => value !== ""); // Check if all boxes are filled

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-[400px] transition-transform">
          <h2 className="text-2xl font-heading mb-6 text-center">
            Verify Your Email
          </h2>

          <p className="text-center mb-4 text-gray-700">
            Enter the 6-digit code sent to your email.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-secondary transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className={`py-2 bg-secondary px-4 mt-6 w-full rounded-md transition-all 
                        ${
                          isOtpComplete
                            ? "bg-validated-green text-white hover:scale-105"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
              disabled={!isOtpComplete}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
