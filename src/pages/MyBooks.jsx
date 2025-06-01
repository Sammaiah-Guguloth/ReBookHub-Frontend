import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios/axiosInstance';
import { GET_MYBOOKS } from '../api/apis';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import BooksContainer from '../components/BooksContainer';
import { FiAlertCircle } from 'react-icons/fi';
import { BsBook } from 'react-icons/bs';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(GET_MYBOOKS);

      if (response.status === 200) {
        setBooks(response.data.books);
        toast.success("Books fetched successfully");
      } else {
        setError("Failed to fetch books.");
        toast.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Server not available. Please try again later.");
      toast.error(error?.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Books</h2>

      {/* Loading spinner */}
      {loading && (
        <div className="w-full h-screen mx-auto flex items-center justify-center mt-10">
          <Spinner />
        </div>
      )}

      {/* Error message */}
      {!loading && error && (
        <div className="flex items-center justify-center gap-3 text-red-600 font-semibold bg-red-50 border border-red-200 px-4 py-3 rounded-md w-full max-w-md mx-auto">
          <FiAlertCircle className="text-xl" />
          <span>{error}</span>
        </div>
      )}

      {/* No books found */}
      {!loading && !error && books.length === 0 && (
        <div className="flex items-center justify-center gap-3 text-gray-600 font-medium bg-gray-100 border border-gray-200 px-4 py-3 rounded-md w-full max-w-md mx-auto">
          <BsBook className="text-xl" />
          <span>No books found.</span>
        </div>
      )}

      {/* Display books */}
      {!loading && !error && books.length > 0 && (
        <div>
          <BooksContainer books={books} />
        </div>
      )}
    </div>
  );
};

export default MyBooks;
