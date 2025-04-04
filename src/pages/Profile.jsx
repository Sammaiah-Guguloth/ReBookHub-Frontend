import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import { GoPencil } from 'react-icons/go';

const Profile = () => {

  const {
    firstName , lastName , address, email , phoneNumber
  } = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);

  console.log("user : " , user);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <h2 className='text-center text-2xl font-semibold mt-3 mb-3 animate-slideUp'>My Profile</h2>
      <div className='w-full md:w-[90%] flex flex-col gap-6 items-center mx-auto px-4 animate-slideRight'>
        {/* Profile img and info */}
        <div className='flex flex-col md:flex-row justify-between items-center border-2 p-4 rounded-md w-full gap-4'>
          <div className='flex gap-5 justify-center items-center'>
            <Avatar firstName={firstName} lastName={lastName} />
            <div className='flex flex-col'>
              <h4 className='text-xl'>{firstName} {lastName}</h4>
              <p className='text-sm text-gray-600'>{address.village}</p>
              <p className='text-sm text-gray-600'>{`${address.city}, ${address.state}`}</p>
            </div>
          </div>
          <div className='flex gap-2 items-center border p-2 border-gray-300 rounded-md'>
            <GoPencil />
            <button>Edit</button>
          </div>
        </div>

        {/* Personal Information */}
        <div className='flex flex-col md:flex-row justify-between items-start border-2 p-4 rounded-md w-full gap-4'>
          <div className='w-full'>
            <h4 className='text-xl mb-3'>Personal Information</h4>
            <div className='flex flex-col md:flex-row gap-8 ml-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>First Name</p>
                <p className='font-semibold text-gray-800'>{firstName}</p>
                <p className='text-gray-600'>Email address</p>
                <p className='font-semibold text-gray-800'>{email}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Last Name</p>
                <p className='font-semibold text-gray-800'>{lastName}</p>
                <p className='text-gray-600'>Phone</p>
                <p className='font-semibold text-gray-800'>{phoneNumber}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center border p-2 border-gray-300 rounded-md self-start'>
            <GoPencil />
            <button>Edit</button>
          </div>
        </div>

        {/* Address */}
        <div className='flex flex-col md:flex-row justify-between items-start border-2 p-4 rounded-md w-full gap-4'>
          <div className='w-full'>
            <h4 className='text-xl mb-3'>Address</h4>
            <div className='flex flex-col md:flex-row gap-8 ml-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Street</p>
                <p className='font-semibold text-gray-800'>{address.street}</p>
                <p className='text-gray-600'>City</p>
                <p className='font-semibold text-gray-800'>{address.city}</p>
                <p className='text-gray-600'>Pincode</p>
                <p className='font-semibold text-gray-800'>{address.pincode}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Village</p>
                <p className='font-semibold text-gray-800'>{address.village}</p>
                <p className='text-gray-600'>State</p>
                <p className='font-semibold text-gray-800'>{address.state}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center border p-2 border-gray-300 rounded-md self-start'>
            <GoPencil />
            <button>Edit</button>
          </div>
        </div>

        <div className='w-full md:w-[65%] text-center bg-gray-700 text-white py-2 px-4 rounded-md cursor-pointer hover:scale-105 transition-transform mb-8'>
          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
