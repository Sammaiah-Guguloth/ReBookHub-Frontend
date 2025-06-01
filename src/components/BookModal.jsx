import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios/axiosInstance';
import { UPDATE_VIEWS } from '../api/apis';

const BookModal = ({ book, onClose }) => {
  const modalRef = useRef(null);

  if (!book) return null;

  const allImages = [book.coverImage, ...(book.trueImages || [])];
  const [selectedImage, setSelectedImage] = useState(book.coverImage?.imageUrl);

  useEffect(() => {
    setSelectedImage(book.coverImage?.imageUrl);
  }, [book]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // updating the analytics
  const updateViews = async () => {
    const bookId = book.id;
    if (!bookId) return;

    try {
      const response = await axiosInstance.put(`${UPDATE_VIEWS}/${bookId}`);
      console.log(response);
    } catch (error) {
      console.log("Error while updatign the views for analytics : ", error);
    }
  };

  useEffect(() => {
    updateViews();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full lg:w-[90%] lg:max-h-[90vh] overflow-y-auto relative p-6 shadow-xl"
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Book Content */}
        <div className="flex flex-col md:flex-row gap-10 p-4">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            {/* Main Image */}
            <div className="w-[294px] h-[451px] flex items-center justify-center bg-gray-100 rounded overflow-hidden">
              <img
                src={selectedImage}
                alt={book.title}
                className="w-full h-full object-contain rounded transition-opacity duration-300 ease-in-out"
                key={selectedImage}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img.imageUrl}
                  alt={`Book preview ${index + 1}`}
                  className={`w-16 h-20 object-cover rounded border-2 cursor-pointer transition-all duration-200 ${
                    selectedImage === img.imageUrl
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                />
              ))}
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col gap-5 mt-4">
            <h2 className="text-4xl text-primary">{book.title}</h2>
            <h4 className="text-sm -mt-2 ml-1">{book.author}</h4>

            <div className="flex gap-10 items-center">
              <p className="text-2xl text-[#ea0606] font-semibold">
                Rs. {book.price}
              </p>
              <p>
                {book.isAvailable ? (
                  <span className="text-validated-green text-lg font-semibold">Available</span>
                ) : (
                  <span className="text-lg font-semibold text-red-900">Sold Out</span>
                )}
              </p>
            </div>

            <div className="text-[12px] mt-1 text-gray-600 flex gap-8 w-full px-2">
              <span>⭐ {book.rating || 'N/A'}</span>
              <span className="bg-gray-400 px-4 text-xs rounded-md text-white font-semibold">
                {book.genre || 'General'}
              </span>
            </div>

            <p className="text-gray-700 text-md">{book.description}</p>

            {book.isAvailable && (
              <Link
                to={`/checkout/${book.id}`}
                className="bg-gray-600 text-white self-center px-24 py-2 rounded-md font-semibold hover:scale-105 transition-all text-center"
              >
                BUY NOW
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
