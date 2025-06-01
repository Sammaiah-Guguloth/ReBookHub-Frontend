import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios/axiosInstance";
import { TRACK_ORDER } from "../api/apis";
import { toast } from "react-hot-toast";
import { FaTruck, FaBoxOpen, FaCheckCircle, FaShippingFast, FaClock } from "react-icons/fa";

const TrackOrder = () => {
  const { trackingId } = useParams();
  const [shipment, setShipment] = useState(null);

  const fetchTrackingInfo = async () => {
    try {
      const res = await axiosInstance.get(`${TRACK_ORDER}/${trackingId}`);
      if (res.status === 200 && res.data?.shipment) {
        setShipment(res.data.shipment);
        toast.success("Fetched Tracking Details Successfully");
      } else {
        toast.error("Invalid tracking ID or shipment not found");
      }
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      toast.error("Failed to fetch tracking info");
    }
  };

  useEffect(() => {
    fetchTrackingInfo();
  }, [trackingId]);

  const getIcon = (message) => {
    if (message.toLowerCase().includes("order placed")) return <FaClock />;
    if (message.toLowerCase().includes("shipped")) return <FaShippingFast />;
    if (message.toLowerCase().includes("out for delivery")) return <FaTruck />;
    if (message.toLowerCase().includes("delivered")) return <FaCheckCircle />;
    return <FaBoxOpen />;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Shipment Tracking</h2>

        {Array.isArray(shipment?.checkpoints) ? (
  <div className="relative">
    {/* Vertical dotted line */}
    <div className="absolute left-5 top-0 bottom-0 w-px border-l-2 border-dotted border-gray-300 z-0"></div>

    <div className="space-y-10">
      {shipment.checkpoints.map((checkpoint, index) => (
        <div key={index} className="flex items-start relative z-10">
          {/* Circle with icon */}
          <div className="relative z-10">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md">
              {getIcon(checkpoint.message)}
            </div>
          </div>

          {/* Text content */}
          <div className="ml-6">
            <h4 className="text-lg font-semibold text-gray-800">{checkpoint.message}</h4>
            <p className="text-sm text-gray-500">{checkpoint.location}</p>
            <p className="text-sm text-gray-500">{new Date(checkpoint.time).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p className="text-center text-gray-500">No tracking updates found.</p>
)}

      </div>
    </div>
  );
};

export default TrackOrder;
