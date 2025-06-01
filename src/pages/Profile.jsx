import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../components/Avatar';
import { GoPencil } from 'react-icons/go';
import { UPDATE_USER } from '../api/apis';
import axiosInstance from '../api/axios/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();
  
  const user = useSelector((state) => state.auth.user);
  const [editSection, setEditSection] = useState({
    personal: false,
    address: false,
  });

  const initialData = {...user};
  
  const [formData, setFormData] = useState({ ...user });
  const [isChanged, setIsChanged] = useState(false);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(formData) !== JSON.stringify(user);
    setIsChanged(changed);
  }, [formData, user]);

  const handleChange = (e, field, nested = null) => {
    const value = e.target.value;
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = async () => {
    const changedFields = {};
  
    for (const key in formData) {
      if (typeof formData[key] === 'object' && formData[key] !== null) {
        // Deep compare nested object (like address)
        for (const nestedKey in formData[key]) {
          if (
            !initialData[key] ||
            formData[key][nestedKey] !== initialData[key][nestedKey]
          ) {
            if (!changedFields[key]) changedFields[key] = {};
            changedFields[key][nestedKey] = formData[key][nestedKey];
          }
        }
      } else {
        if (formData[key] !== initialData[key]) {
          changedFields[key] = formData[key];
        }
      }
    }
  
    if (Object.keys(changedFields).length === 0) {
      alert('No changes detected.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put(UPDATE_USER, changedFields);
      if(response.status === 200) {
        toast.success('Profile updated successfully!');
        navigate("/login");
      }
      
    } catch (err) {
      console.error('Update failed:', err);
      toast.error(err.response?.data?.message || 'Something went wrong.');
    }
    finally {
      setLoading(false);
    }
  };
  

  const { firstName, lastName, email, phoneNumber, address } = formData;

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
        </div>

        {/* Personal Information */}
        <div className='flex flex-col md:flex-row justify-between items-start border-2 p-4 rounded-md w-full gap-4'>
          <div className='w-full'>
            <h4 className='text-xl mb-3'>Personal Information</h4>
            <div className='flex flex-col md:flex-row gap-8 ml-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>First Name</p>
                {editSection.personal ? (
                  <input value={firstName} onChange={(e) => handleChange(e, 'firstName')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{firstName}</p>
                )}

                <p className='text-gray-600'>Email address</p>
                <p className='font-semibold text-gray-800'>{email}</p> {/* Non-editable always */}
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Last Name</p>
                {editSection.personal ? (
                  <input value={lastName} onChange={(e) => handleChange(e, 'lastName')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{lastName}</p>
                )}

                <p className='text-gray-600'>Phone</p>
                {editSection.personal ? (
                  <input value={phoneNumber} onChange={(e) => handleChange(e, 'phoneNumber')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center border p-2 border-gray-300 rounded-md self-start'>
            <GoPencil />
            <button onClick={() => setEditSection(prev => ({ ...prev, personal: !prev.personal }))}>
              {editSection.personal ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Address */}
        <div className='flex flex-col md:flex-row justify-between items-start border-2 p-4 rounded-md w-full gap-4'>
          <div className='w-full'>
            <h4 className='text-xl mb-3'>Address</h4>
            <div className='flex flex-col md:flex-row gap-8 ml-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Street</p>
                {editSection.address ? (
                  <input value={address.street} onChange={(e) => handleChange(e, 'street', 'address')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{address.street}</p>
                )}

                <p className='text-gray-600'>City</p>
                {editSection.address ? (
                  <input value={address.city} onChange={(e) => handleChange(e, 'city', 'address')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{address.city}</p>
                )}

                <p className='text-gray-600'>Pincode</p>
                {editSection.address ? (
                  <input value={address.pincode} onChange={(e) => handleChange(e, 'pincode', 'address')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{address.pincode}</p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-gray-600'>Village</p>
                {editSection.address ? (
                  <input value={address.village} onChange={(e) => handleChange(e, 'village', 'address')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{address.village}</p>
                )}

                <p className='text-gray-600'>State</p>
                {editSection.address ? (
                  <input value={address.state} onChange={(e) => handleChange(e, 'state', 'address')} className='border p-1 rounded' />
                ) : (
                  <p className='font-semibold text-gray-800'>{address.state}</p>
                )}
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center border p-2 border-gray-300 rounded-md self-start'>
            <GoPencil />
            <button onClick={() => setEditSection(prev => ({ ...prev, address: !prev.address }))}>
              {editSection.address ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        {isChanged && (
          <div
            className={`w-full md:w-[65%] text-center bg-gray-700 text-white py-2 px-4 rounded-md  ${loading ? "cursor-progress" : "cursor-pointer"} hover:scale-105 transition-transform mb-8`}
            onClick={handleSave}
          >
            <button disabled={loading}>{`${loading ? "Updating..." : "Save Changes"}`}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
