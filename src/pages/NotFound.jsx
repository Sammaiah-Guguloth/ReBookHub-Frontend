import React from 'react';
import { Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40 text-center animate-slideUp">
      <BiError className="text-red-500 text-8xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="bg-secondary px-5 py-3 rounded-md hover:scale-105 transition-all shadow-lg text-lg font-semibold animate-slideDown">Back to Home</Link>
    </div>
  );
};

export default NotFound;
