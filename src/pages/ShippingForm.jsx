import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../api/axios/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { ORDER_SHIPPED } from '../api/apis';

const ShippingForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {orderId} = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      setIsLoading(true);
      
      const response = await axiosInstance.post(ORDER_SHIPPED , {
        orderId : orderId,
        trackingId :data.trackingId,
        courier : data.deliveryAgent,
      });
      
      if (response.status === 200) {
        toast.success("Shipping details sent successfully!");
        // navigate('/seller/orders');  // Redirect to the order list or another relevant page
      } else {
        toast.error("Failed to send shipping details.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred while submitting the shipping details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full flex items-center justify-center mt-28'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='w-screen max-w-site min-h-screen mb-5 overflow-hidden'>
      <h2 className='mt-5 text-center font-heading text-3xl font-[500] animate-slideUp'>
        Shipping Details
      </h2>

      <div className='flex flex-col lg:flex-row gap-8 mt-6 justify-center items-center w-[90%] mx-auto'>
        {/* Shipping Form */}
        <form onSubmit={handleSubmit(submitHandler)} className='flex self-start flex-col gap-3 w-full lg:w-[50%] animate-slideLeft'>
          {/* Delivery Agent */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='deliveryAgent'>Delivery Agent</label>
            <input
              {...register("deliveryAgent", { 
                required: "Delivery agent name is required", 
                maxLength: { value: 50, message: "Agent name too long" }
              })}
              className='border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700'
              type='text'
              id='deliveryAgent'
              name='deliveryAgent'
              placeholder='e.g., Delhivery, BlueDart, etc.'
            />
            {errors.deliveryAgent && <p className='text-red-500 text-sm'>{errors.deliveryAgent.message}</p>}
          </div>

          {/* Tracking ID */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='trackingId'>Tracking ID</label>
            <input
              {...register("trackingId", {
                required: "Tracking ID is required",
                pattern: { value: /^[A-Za-z0-9]+$/, message: "Tracking ID can only contain alphanumeric characters" }
              })}
              className='border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700'
              type='text'
              id='trackingId'
              name='trackingId'
              placeholder='Enter the tracking ID'
            />
            {errors.trackingId && <p className='text-red-500 text-sm'>{errors.trackingId.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='bg-primary text-white py-2 px-3 mt-4 w-full rounded-md hover:bg-primary-dark transition-all'
            >
              Submit Shipping Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
