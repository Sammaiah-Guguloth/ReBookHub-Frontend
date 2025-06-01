import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
      <p className="text-lg mb-6">Your payment was successful and the order is being processed.</p>
      <Link
        to="/"
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
