import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstace from "../api/axios/axiosInstance"
import { GET_BOOKS_BY_GENRE } from '../api/apis';
import toast from 'react-hot-toast';
import BooksContainer from '../components/BooksContainer';
import Spinner from '../components/Spinner';

const BooksByGenre = () => {

    let {genre} = useParams();

    const [currentGenre , setCurrentGenre] = useState(genre);

    const [loading , setLoading] = useState(false);
    const [books , setBooks] = useState([]);
    const navigate = useNavigate();

    const allGenres = [
      "Romance", "Thriller", "Science Fiction", "Fantasy", "Mystery", "Horror", "Non-fiction", "Biography", "Self-help", "Historical", "Adventure", "Comics", "Poetry", "Drama", "Philosophy", "Technology", "Art", "Business", "Education", "Spirituality", "Health & Fitness", "Politics", "Travel", "Cookbooks", "Children", "Religious", "Sports", "Other"
    ];

    // const goToGenre = (genre) => {
    //   navigate(`/books/${encodeURIComponent(genre)}`);
    // };



    
    useEffect(() => {
      const fetchBooksByGenre = async () => {
        try {
          setBooks([]);
          setLoading(true);
          const response = await axiosInstace.get(`${GET_BOOKS_BY_GENRE}/${currentGenre}`);
          console.log(response);
          if(response.status === 200) {
            toast.success("Books fetched successfully");
            setBooks(response.data.books);

          }
        }
        catch(error) {
          console.log("Error while fetching Books by genre : " , error);
          toast.error(error.response?.data?.message || "Server Error");
        }
        finally {
          setLoading(false);
        }
      }

      fetchBooksByGenre();
    } , [currentGenre]);

      // if (loading) {
      //   return (
      //     <div className='flex w-full justify-center mt-32 '>
      //       <Spinner />
      //     </div>
      //   );
      // }


    return (
      
        <div className="p-4 flex flex-col gap-3 items-center">

        <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl transition-all duration-500">
          {allGenres.map((genre, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentGenre(genre)}
              className="bg-gray-100 hover:bg-blue-100 text-sm px-4 py-1 rounded-full border border-gray-300 animate-slideDown transition-all duration-500 whitespace-nowrap"
            >
              {genre}
            </button>
          ))}
        </div>

          {
            loading ? (
              <div className='flex w-full justify-center mt-32 '>
                  <Spinner />
              </div>
            ) :  (
                <>
                  <h2 className="text-xl font-bold mb-2 mt-2">Books of Genre : {currentGenre}</h2>
                  <div>
                    {
                      books.length > 0 ? <BooksContainer books={books} /> : <p>
                        No books found
                      </p>
                    }
                  </div>
                </>
            )
          }
          
          
          {/* {books.length > 0 ? (
            
          ) : (
            <p>No books found.</p>
          )} */}

        </div>
    );
}

export default BooksByGenre