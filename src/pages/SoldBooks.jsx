import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axios/axiosInstance';
import { SOLD_ORDERS_BY_USER_ID } from '../api/apis';
import { Link } from 'react-router-dom';
import { MdOutlinePendingActions } from 'react-icons/md';
import { FaShippingFast } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';

const statusIconMap = {
  pending_seller_confirmation: <MdOutlinePendingActions className="text-yellow-500 text-xl" />,
  shipped: <FaShippingFast className="text-blue-500 text-xl" />,
  delivered: <BsBoxSeam className="text-green-600 text-xl" />,
};

const SoldBooks = () => {
  const userId = useSelector((state) => state.auth.user?._id);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchSoldOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${SOLD_ORDERS_BY_USER_ID}/${userId}`);

      if (response.status === 200) {
        setOrders(response.data.orders.reverse());
        toast.success("Sold orders fetched successfully");
      } else {
        toast.error(response?.data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching sold orders:", error);
      toast.error(error?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchSoldOrders();
  }, [userId]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sold Books</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No sold orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow rounded-2xl p-4 gap-4"
            >
              {/* Left: Book Info */}
              <div className="flex items-start gap-4 w-full md:w-2/3">
                <img
                  src={order.bookId?.coverImage?.imageUrl || '/placeholder.png'}
                  alt={order.bookId?.title}
                  className="w-24 h-32 object-cover rounded-md shadow"
                />
                <div>
                  <h3 className="text-lg font-semibold">{order.bookId?.title}</h3>
                  <p className="text-gray-600 mt-1">₹{order.bookId?.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Buyer: {order.buyer?.name} | {order.buyer?.city}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Order ID: {order._id}</p>
                </div>
              </div>

              {/* Right: Status + Actions */}
              <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-1/3">
                <div className="flex items-center gap-2">
                  {statusIconMap[order.status]}
                  <span className="capitalize text-sm font-medium text-gray-700">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {order.status === 'pending_seller_confirmation' && (
                  <Link
                    to={`/seller/orders/${order._id}`}
                    className="text-sm text-white bg-orange-600 hover:bg-orange-700 px-4 py-1.5 rounded-md transition"
                  >
                    Process Order
                  </Link>
                )}

                {order.status === 'shipped' && order.tracking?.trackingId && (
                  <Link
                    to={`/track-order/${order.tracking.trackingId}`}
                    className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition"
                  >
                    Track Order
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldBooks;
