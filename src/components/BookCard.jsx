import React, { useState } from 'react';
import BookModal from './BookModal';

const BookCard = ({
  title,
  price,
  description,
  trueImages,
  coverImage,
  rating,
  language,
  author,
  publication,
  genre,
  isAvailable,
  id,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const bookDetails = {
    title,
    price,
    description,
    trueImages,
    coverImage,
    rating,
    language,
    author,
    publication,
    genre,
    isAvailable,
    id,
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group relative w-[180px] sm:w-[250px] h-[300px] sm:h-[365px] rounded-[14px] overflow-hidden flex flex-col items-center justify-center z-30 transition-all duration-300 transform shadow-[10px_10px_30px_#bebebe,-10px_-10px_30px_#ffffff] hover:shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:scale-105 cursor-pointer"
      >
        {/* Glass background */}
        <div className="absolute top-[5px] left-[5px] w-[170px] sm:w-[240px] h-[290px] sm:h-[355px] bg-white/95 backdrop-blur-[24px] rounded-[10px] overflow-hidden outline outline-2 outline-white z-[2]" />

        {/* Animated blob */}
        <div className="absolute top-1/2 left-1/2 w-[140px] sm:w-[180px] h-[140px] sm:h-[180px] rounded-full bg-[#08080831] group-hover:bg-red-500 opacity-100 blur-[12px] z-[1] animate-blobBounce transition-colors duration-300" />

        {/* Book content */}
        <div className="z-10 relative px-2 pt-3 text-center text-black overflow-hidden w-full">
          {coverImage?.imageUrl && (
            <img
              src={coverImage.imageUrl}
              alt={title}
              className="w-[100px] sm:w-[125.831px] h-[155px] sm:h-[195px] object-cover mx-auto rounded shadow mb-2 sm:mb-3"
            />
          )}
          <h2 className="text-base sm:text-[1.3rem] font-semibold truncate">{title}</h2>
          <p className="text-xs sm:text-sm text-gray-600">{author}</p>
          <p className="text-[10px] sm:text-[11px] text-gray-500">{language}</p>

          {/* Rating & Genre */}
          <div className="text-xs sm:text-[12px] mt-1 text-gray-600 flex justify-between w-full px-2">
            <span>⭐ {rating || 'N/A'}</span>
            <span className="bg-gray-400 px-2 sm:px-4 text-xs rounded-md text-white font-semibold">
              {genre || 'General'}
            </span>
          </div>

          {/* Price and Availability */}
          <div className="flex justify-between mt-2 w-full px-3 sm:px-5 gap-3 sm:gap-10">
            <span className="text-xs sm:text-sm text-red-600 font-semibold">₹ {price}</span>
            {isAvailable ? (
              <span className="text-xs sm:text-sm font-semibold text-validated-green">Available</span>
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-red-900">Sold Out</span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BookModal book={bookDetails} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default BookCard;
