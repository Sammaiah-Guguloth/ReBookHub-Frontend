import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios/axiosInstance";
import {
  CREATE_ORDER,
  GET_BOOK_BY_ID,
  UPDATE_ATTEMPTED_PURCHASES,
  VERIFY_PAYMENT,
} from "../api/apis";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Checkout = () => {
  // 1. === STATE & HOOKS ===
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null); // Order ID from backend
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 2. === FUNCTIONS ===
  const fetchBookDetails = async () => {
    try {
      const response = await axiosInstance.get(`${GET_BOOK_BY_ID}/${bookId}`);
      if (response.status === 200) {
        setBook(response.data.book);
        toast.success("Book fetched successfully");
      }
    } catch (error) {
      // console.error("Error while fetching book:", error);
      toast.error(error?.response?.data?.message || "Server error");
      navigate(-1);
    }
  };

  const createOrder = async (formData) => {
    try {
      const payload = {
        bookId: book._id,
        buyerId: user._id,
        sellerId: book.owner,
        buyerName: formData.fullName,
        buyerEmail: formData.email,
        buyerPhone: formData.phone,
        buyerAddress: formData.address,
        buyerCity: formData.city,
        buyerPostal: formData.postalCode,
      };

      const response = await axiosInstance.post(CREATE_ORDER, payload);
      if (response.status === 201) {
        setOrderId(response.data.order._id);
        return response.data;
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      throw error;
    }
  };

  const openRazorpay = (data, formData) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: book.price * 100,
      currency: "INR",
      name: "ReBook Hub",
      description: `Payment for ${book.title}`,
      image: "/logo.png",
      order_id: data.razorpayOrderId,
      handler: async function (response) {
        await verifyPayment(response, data.order._id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#7bf6a2",
      },
      modal: {
        ondismiss: function () {
          setLoading(false); // ✅ Reset loading if user closes the Razorpay popup
          toast.error("Payment popup was closed."); // Optional feedback to user
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (response, orderId) => {
    try {
      const verifyRes = await axiosInstance.post(VERIFY_PAYMENT, {
        orderId: orderId,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
      });

      if (verifyRes.status === 200) {
        toast.success("Payment successful and verified!");
        navigate("/payment-success");
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (err) {
      // console.error("Verification error:", err);
      toast.error("Error verifying payment.");
    } finally {
      setLoading(false);
    }
  };

  // 3. === useEffect ===
  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  // 4. === SUBMIT ===
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const orderData = await createOrder(formData);
      openRazorpay(orderData, formData);
    } catch (error) {
      setLoading(false);
      // console.error("Order creation error:", error);
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  // Updating the attempted purchases for analytics
  useEffect(() => {
    const updateAttemptedPurchases = async () => {
      try {
        const response = await axiosInstance.put(
          `${UPDATE_ATTEMPTED_PURCHASES}/${bookId}`
        );
        // console.log(bookId);
      } catch (error) {
        // console.log("Error while updating attempted purchases for anyalytics : " , error);
      }
    };

    updateAttemptedPurchases();
  }, []);

  // 5. === RENDER ===
  if (!book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto my-8 px-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12"
    >
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <div className="space-y-6">
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              required: true,
            },
            { label: "Address", name: "address", type: "text", required: true },
            { label: "City", name: "city", type: "text", required: true },
            {
              label: "Postal Code",
              name: "postalCode",
              type: "text",
              required: true,
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              required: true,
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              required: true,
            },
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type={type}
                {...register(name, { required: `${label} is required` })}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {errors[name] && (
                <p className="text-sm text-red-500">{errors[name].message}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Book Info + Logos */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="mt-10">
          <h3 className="text-2xl text-primary">{book.title}</h3>
          <p className="text-lg text-red-500 mt-1">Rs. {book.price}</p>
        </div>

        <div className="px-4 py-2 bg-gray-100 rounded-lg border flex flex-wrap items-center justify-center gap-4">
          <img
            src="/images/payment/razorpay.png"
            alt="Razorpay"
            className="h-8 bg-transparent"
          />
          <img src="/images/payment/upi.png" alt="UPI" className="h-8" />
          <img src="/images/payment/rupay.png" alt="Rupay" className="h-8" />
          <img src="/images/payment/card.png" alt="Card" className="h-8" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="material-icons"></span> Processing...
            </span>
          ) : (
            "Confirm Payment"
          )}
        </button>

        {/* Show message only when loading is true */}
        {loading && (
          <div className="mt-6 bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
            <p>
              <strong>
                Payment is being processed. Please do not refresh or navigate
                away from this page.
              </strong>
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default Checkout;
