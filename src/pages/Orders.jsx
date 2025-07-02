import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axios/axiosInstance";
import { ORDERS_BY_USER_ID } from "../api/apis";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";

const statusOrder = [
  "pending_payment",
  "paid",
  "pending_seller_confirmation",
  "seller_accepted",
  "shipped",
  "delivered",
];

const statusIconMap = {
  pending_payment: (
    <MdOutlinePendingActions className="text-yellow-500 text-2xl" />
  ),
  paid: <MdOutlinePendingActions className="text-yellow-500 text-2xl" />,
  pending_seller_confirmation: (
    <MdOutlinePendingActions className="text-yellow-500 text-2xl" />
  ),
  seller_accepted: (
    <MdOutlinePendingActions className="text-yellow-500 text-2xl" />
  ),
  shipped: <FaShippingFast className="text-blue-500 text-2xl" />,
  delivered: <BsBoxSeam className="text-green-600 text-2xl" />,
};

const statusColorMap = {
  pending_payment: "bg-yellow-100 border-yellow-300",
  paid: "bg-yellow-100 border-yellow-300",
  pending_seller_confirmation: "bg-yellow-100 border-yellow-300",
  seller_accepted: "bg-yellow-100 border-yellow-300",
  shipped: "bg-blue-100 border-blue-300",
  delivered: "bg-green-100 border-green-300",
};

const ProgressBar = ({ currentStatus }) => {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between w-full max-w-xs mx-auto mt-4">
      {statusOrder.map((step, idx) => {
        const isActive = idx <= currentIndex;
        return (
          <div key={idx} className="flex-1 relative last:flex-none">
            {/* Main segment */}
            <div
              className={`h-1 rounded-full transition-colors duration-300 ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {/* Connector to next segment */}
            {idx !== statusOrder.length - 1 && (
              <div
                className={`absolute top-0 left-1/2 right-0 h-1 rounded-full ${
                  idx < currentIndex ? "bg-green-500" : "bg-gray-300"
                }`}
                style={{ transform: "translateX(50%)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const userId = useSelector((state) => state.auth.user?._id);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`${ORDERS_BY_USER_ID}/${userId}`);
      if (res.status === 200 && res.data?.orders) {
        setOrders(res.data.orders.reverse());
        toast.success("Orders fetched successfully");
      } else {
        toast.error(res?.data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
      // console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-700">
        🛒 Your Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const statusColor = statusColorMap[order.status] || "bg-gray-100";
            return (
              <div
                key={order._id}
                className={`group transition hover:shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 bg-white border rounded-xl p-5`}
              >
                {/* Left - Book Info */}
                <div className="flex items-start gap-5 w-full md:w-2/3">
                  <img
                    src={
                      order.bookId?.coverImage?.imageUrl || "/placeholder.png"
                    }
                    alt={order.bookId?.title}
                    className="w-24 h-32 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {order.bookId?.title}
                    </h3>
                    <p className="text-gray-600 mt-1">₹{order.bookId?.price}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Seller:{" "}
                      {order.sellerId?.firstName +
                        " " +
                        order.sellerId?.lastName}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Order ID: {order._id}
                    </p>
                    {/* Progress Bar */}
                    <ProgressBar currentStatus={order.status} />
                  </div>
                </div>

                {/* Right - Status and Actions */}
                <div className="flex flex-col items-start md:items-end w-full md:w-1/3 gap-3">
                  <div
                    className={`flex items-center gap-2 text-sm font-medium text-gray-800 px-3 py-2 rounded-lg border ${statusColor}`}
                  >
                    <span>{statusIconMap[order.status]}</span>
                    <span className="capitalize">
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  {order.status === "pending_seller_confirmation" && (
                    <Link
                      to={`/seller/orders/${order._id}`}
                      className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Process Order
                    </Link>
                  )}

                  {(order.status === "shipped" ||
                    order.status === "delivered") &&
                    order.tracking?.trackingId && (
                      <Link
                        to={`/track-order/${order.tracking.trackingId}`}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                      >
                        Track Order
                      </Link>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
