import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdOutlinePendingActions, MdAssignmentTurnedIn } from 'react-icons/md';
import { RiRefund2Fill } from 'react-icons/ri';
import { BsBoxSeam } from 'react-icons/bs';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axios/axiosInstance';
import { ORDERS_BY_USER_ID } from '../api/apis';

const statusIconMap = {
  pending_payment: <MdOutlinePendingActions className="text-yellow-500 text-xl" />,
  paid: <FaRegMoneyBillAlt className="text-green-600 text-xl" />,
  pending_seller_confirmation: <MdOutlinePendingActions className="text-yellow-400 text-xl" />,
  seller_accepted: <MdAssignmentTurnedIn className="text-green-500 text-xl" />,
  shipped: <FaShippingFast className="text-blue-500 text-xl" />,
  delivered: <BsBoxSeam className="text-green-700 text-xl" />,
  rejected: <RiRefund2Fill className="text-red-500 text-xl" />,
  refunded: <RiRefund2Fill className="text-red-500 text-xl" />,
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
        toast.success('Orders fetched successfully');
      } else {
        toast.error(res?.data?.message || 'Failed to fetch orders');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {
          orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow rounded-2xl p-4 gap-4"
            >
              {/* Left: Book Details */}
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
                    Seller : {order.sellerId?.firstName + " " + order?.sellerId?.lastName} | {order.sellerId?.address?.city +  "  " + order.sellerId?.address?.state}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Order ID: {order._id}</p>
                </div>
              </div>

              {/* Right: Status + Action */}
              <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-1/3">
                <div className="flex items-center gap-2">
                  {statusIconMap[order.status]}
                  <span className="capitalize text-sm font-medium text-gray-700">{order.status.replace(/_/g, ' ')}</span>
                </div>
                {order.tracking?.trackingId && (
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

export default Orders;
