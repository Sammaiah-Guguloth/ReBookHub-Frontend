import React from 'react';

const Avatar = ({ firstName = '', lastName = '' }) => {
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  const getRandomColor = () => {
    const colors = [
      'bg-blue-500', 'bg-red-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`w-16 h-16 ${getRandomColor()} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
      {initials}
    </div>
  );
};

export default Avatar;
