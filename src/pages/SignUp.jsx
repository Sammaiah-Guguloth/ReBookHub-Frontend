import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios/axiosInstance";
import { SEND_OTP_URL } from "../api/apis";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  storeUserData,
  otpSent,
} from "../redux/slices/signupSlice";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.signup.isLoading);

  const submitHandler = async (data) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post(SEND_OTP_URL, {
        email: data.email,
      });
      // console.log("respo : ", response);
      if (response.status === 200) {
        dispatch(otpSent(true));
        toast.success("OTP sent successfully");
        dispatch(storeUserData(data));

        navigate("/otp");
      } else {
        toast.error("Failed to send OTP to your email");
        // console.log(" req error while sending otp");
      }
    } catch (error) {
      // console.log("Error while sending otp : ", error);
      toast.error("Failed to send OTP to your email");
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

  return (
    <>
      <div className="w-screen max-w-site min-h-screen mb-5 overflow-hidden ">
        {/* Welcome message */}
        <h2 className="mt-5 text-center font-heading text-3xl font-[500] animate-slideUp ">
          Welcome to ReBook Hub
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 mt-6 justify-center items-center w-[90%] mx-auto ">
          {/* signup form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex self-start flex-col gap-3 w-full lg:w-[50%] animate-slideLeft"
          >
            {/* firstname & lastname */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="firstName">First Name</label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 2,
                      message: "First Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "First Name must be less than 30 characters",
                    },
                  })}
                  required
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="lastName">Last Name</label>
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Last Name must be less than 30 characters",
                    },
                  })}
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                required
                className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
              />
            </div>

            {/* password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                required
                className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                placeholder="Password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-3 right-4 transition-all"
              >
                {showPassword ? (
                  <IoMdEyeOff className="text-xl text-gray-800 transition-all" />
                ) : (
                  <IoMdEye className="text-xl text-gray-800 transition-all" />
                )}
              </div>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                // {...register("confirmPassword", {
                //   required: "Please confirm your password",
                //   validate: (value, { password }) => value === password || "Passwords do not match"
                // })  }

                className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                type={`${showConfirmPassword ? "text" : "password"}`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute bottom-3 right-4 transition-all"
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff className="text-xl text-gray-800 transition-all" />
                ) : (
                  <IoMdEye className="text-xl text-gray-800 transition-all" />
                )}
              </div>
            </div>

            {/* Phone number */}
            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
                type="text"
                name="phoneNumber"
                placeholder="Enter your 10-digit phone number"
                maxLength="10"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="street">Street</label>
                <input
                  {...register("street", {
                    required: "Street is required",
                    maxLength: {
                      value: 50,
                      message: "Street name is too long",
                    },
                  })}
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Street"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="village">Village</label>
                <input
                  {...register("village", {
                    required: "Village is required",
                    maxLength: {
                      value: 50,
                      message: "Village name is too long",
                    },
                  })}
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                  type="text"
                  id="village"
                  name="village"
                  placeholder="Village"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="city">City</label>
                <input
                  {...register("city", {
                    required: "City is required",
                    maxLength: { value: 50, message: "City name is too long" },
                  })}
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City or Town"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="pincode">Pincode</label>
                <input
                  {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Pincode must be a valid 6-digit number",
                    },
                  })}
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  maxLength="6"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="state">State</label>
              <input
                {...register("state", {
                  required: "State is required",
                })}
                className="border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700"
                type="text"
                id="state"
                name="state"
                placeholder="Telangana"
              />
            </div>

            {/* Sign up button */}
            <div>
              <button
                type="submit"
                className="bg-primary text-white py-2 px-3 mt-4 w-full rounded-md hover:bg-primary-dark transition-all"
              >
                Sign up
              </button>
              <p className="mt-2 text-sm">Already have an Account ?</p>
            </div>

            <Link
              to={"/login"}
              className="bg-secondary text-primary py-2 px-3 mt-5 w-full rounded-md hover:bg-primary-dark transition-all text-center"
            >
              Login
            </Link>
          </form>

          {/* girl_reading img */}
          <div className="w-full lg:w-[45%] flex justify-center items-center animate-slideRight">
            <img
              src="/images/girl_reading.webp"
              className="w-[70%] h-auto rounded-sm shadow-lg"
              alt="girl reading"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
