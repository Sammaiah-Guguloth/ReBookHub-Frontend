import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axios/axiosInstance";
import { SEARCH_BOOKS_BY_QUERY } from "../api/apis";
import toast from "react-hot-toast";
import BooksContainer from "../components/BooksContainer";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await axiosInstance.get(SEARCH_BOOKS_BY_QUERY, {
          params: { query },
        });

        if (response.status === 200) {
          setBooks(response.data);
          toast.success("Books fetched successfully!");
        }
      } catch (error) {
        toast.error("Failed to fetch search results");
        // console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Results for: {query}</h2>
      {books.length > 0 ? (
        <div>
          <BooksContainer books={books} />
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default SearchResults;
