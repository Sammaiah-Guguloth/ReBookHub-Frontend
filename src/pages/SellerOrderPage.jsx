import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ACCEPT_ORDER, GET_ORDER_BY_ID, REJECT_ORDER } from "../api/apis";
import axiosInstance from "../api/axios/axiosInstance";
import toast from "react-hot-toast";

export default function SellerOrderPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState("upi"); 
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`${GET_ORDER_BY_ID}/${orderId}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error("Error fetching order", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const onAccept = async (data) => {
    setIsSubmitting(true); // Set submitting to true when submission starts

    try {
      const payload = {
        orderId,
        payoutMethod,
        payoutName: data.payoutName,
        payoutContactId: data.payoutContactId,
      };

      // If UPI is selected, send UPI details
      if (payoutMethod === "upi") {
        payload.payoutUpi = data.payoutUpi;
      } else {
        // If Bank is selected (but disabled), we handle the fields as well for future updates
        payload.payoutAccountNumber = data.payoutAccountNumber;
        payload.payoutIfsc = data.payoutIfsc;
      }

      console.log("came");

      const response = await axiosInstance.post(ACCEPT_ORDER, payload);
      console.log("response : ", response);
      toast.success("Order accepted successfully");
      navigate("/dashboard/sold-books"); // Navigate to the orders page
    } catch (err) {
      console.error("Error accepting order", err);
      toast.error(err?.response?.data?.message || "Failed to accept order");
    } finally {
      setIsSubmitting(false); // Set submitting to false when done
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true); 
    try {
      await axiosInstance.post(REJECT_ORDER, { orderId });
      toast.success("Order rejected");
      // navigate("/dashboard/your-orders");
    } catch (err) {
      console.error("Error rejecting order", err);
      toast.error("Failed to reject order");  
    } finally {
      setIsSubmitting(false); // Set submitting to false when done
    }
  };

  if (loading) return <div className="p-4">Loading order...</div>;
  if (!order) return <div className="p-4">Order not found</div>;

  const { bookId, buyer } = order;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Warning Message */}
      {isSubmitting && (
        <div className="mt-6 bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
          <strong>Warning:</strong> Please do not refresh or go back until the network request is completed.
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4">Order Review</h1>

      {/* Book Details */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex gap-10 flex-wrap">
        <div>
          <img
            src={bookId?.coverImage?.imageUrl}
            alt={bookId?.title}
            className="w-[125.831px] h-[195px] object-cover mx-auto rounded shadow mb-3"
          />
        </div>
        <div>
          <h2 className="text-4xl text-primary">{bookId?.title}</h2>
          <p>{bookId?.author}</p>
          <p>₹{bookId?.price}</p>
        </div>
      </div>

      {/* Buyer Info */}
      <div className="bg-gray-50 border p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Buyer Details</h3>
        <p><strong>Name:</strong> {buyer?.name}</p>
        <p><strong>Phone:</strong> {buyer?.phone}</p>
        <p><strong>Email:</strong> {buyer?.email}</p>
        <p><strong>Address:</strong> {buyer?.address}, {buyer?.city} - {buyer?.postal}</p>
      </div>

      {/* Action Buttons or Payout Form */}
      {!showPayoutForm ? (
        <div className="flex gap-4">
          <button
            onClick={() => setShowPayoutForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={isSubmitting}
          >
            Proceed to Accept Order
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={isSubmitting}
          >
            Reject Order
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onAccept)} className="bg-gray-100 p-4 rounded mb-6 mt-4">
          <h3 className="font-semibold mb-2">Payout Details</h3>

          <div className="mb-3">
            <label className="block mb-1">Method</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              disabled={isSubmitting}
            >
              <option value="upi">UPI</option>
              <option value="bank" disabled>Bank (coming soon)</option>
            </select>
            <p className="text-sm  mt-1 text-red-400">
              Bank transfers will be supported in future updates.
            </p>
          </div>

          <div className="mb-2">
            <input
              placeholder="Full Name"
              {...register("payoutName", { required: true })}
              className="border px-2 py-1 w-full rounded"
              disabled={isSubmitting}
            />
            {errors.payoutName && <p className="text-red-600 text-sm">Name is required</p>}
          </div>

          {payoutMethod === "upi" ? (
            <div className="mb-2">
              <input
                placeholder="UPI ID"
                {...register("payoutUpi", { required: true })}
                className="border px-2 py-1 w-full rounded"
                disabled={isSubmitting}
              />
              {errors.payoutUpi && <p className="text-red-600 text-sm">UPI ID is required</p>}
            </div>
          ) : (
            <>
              <div className="mb-2">
                <input
                  placeholder="Account Number"
                  {...register("payoutAccountNumber")}
                  disabled
                  className="border px-2 py-1 w-full rounded"
                />
              </div>
              <div className="mb-2">
                <input
                  placeholder="IFSC Code"
                  {...register("payoutIfsc")}
                  disabled
                  className="border px-2 py-1 w-full rounded"
                />
              </div>
            </>
          )}

          <div className="mb-2">
            <input
              placeholder="Contact ID"
              {...register("payoutContactId", { required: true })}
              className="border px-2 py-1 w-full rounded"
              disabled={isSubmitting}
            />
            {errors.payoutContactId && (
              <p className="text-red-600 text-sm">Contact ID is required</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className={`${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700" } transition-all  text-white px-4 py-2 rounded`}
              disabled={isSubmitting}
            >
              Confirm Order
            </button>
            <button
              type="button"
              onClick={() => setShowPayoutForm(false)}
              className={`${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700  hover:bg-gray-900" } transition-all text-white px-4 py-2 rounded`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
