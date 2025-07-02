import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios/axiosInstance";
import { TRACK_ORDER } from "../api/apis";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  MdInventory,
  MdLocalShipping,
  MdLocationOn,
  MdDoneAll,
  MdAccessTime,
} from "react-icons/md";

const lightGradients = [
  "from-pink-100 to-pink-200",
  "from-green-100 to-green-200",
  "from-yellow-100 to-yellow-200",
  "from-blue-100 to-blue-200",
  "from-purple-100 to-purple-200",
];

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
    const msg = message.toLowerCase();
    if (msg.includes("order placed")) return <MdAccessTime size={26} />;
    if (msg.includes("shipped")) return <MdLocalShipping size={26} />;
    if (msg.includes("out for delivery")) return <MdLocationOn size={26} />;
    if (msg.includes("delivered")) return <MdDoneAll size={26} />;
    return <MdInventory size={26} />;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-700">
          Shipment Tracking
        </h2>

        {/* Vertical center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-dotted border-gray-300 z-0" />

        {Array.isArray(shipment?.checkpoints) ? (
          <div className="space-y-16 relative z-10">
            {shipment.checkpoints.map((checkpoint, index) => {
              const alignLeft = index % 2 === 0;
              const gradient = lightGradients[index % lightGradients.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 ${
                    alignLeft
                      ? "md:flex-row"
                      : "md:flex-row-reverse md:justify-end"
                  }`}
                >
                  {/* Connector dot */}
                  <div className="hidden md:block w-1/2 h-full relative">
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        alignLeft ? "right-0" : "left-0"
                      }`}
                    >
                      <div className="w-6 h-6 bg-white border-4 border-sky-400 rounded-full shadow-md z-20" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className={`w-full md:w-1/2 bg-white rounded-xl border border-gray-200 shadow-lg p-6 ${
                      alignLeft ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 text-gray-800 bg-gradient-to-r ${gradient} rounded-lg p-4 shadow-sm`}
                    >
                      <div className="text-sky-700">{getIcon(checkpoint.message)}</div>
                      <h4 className="text-base font-semibold">
                        {checkpoint.message}
                      </h4>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <p><strong>Location:</strong> {checkpoint.location}</p>
                      <p><strong>Time:</strong> {new Date(checkpoint.time).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No tracking updates found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
