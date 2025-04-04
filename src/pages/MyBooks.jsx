import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { setLoading, setMyBooks } from '../redux/slices/myBooksSlice';
import axiosInstance from '../api/axios/axiosInstance';
import { GET_MYBOOKS } from '../api/apis';
import Spinner from "../components/Spinner"
import Book from '../components/Book';

const MyBooks = () => {

  const dispatch = useDispatch();
  const {loading , books , error} = useSelector((state) => state.mybooks);

  console.log("books ; " , books);

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance(GET_MYBOOKS);
        console.log("resp : " , response );
        dispatch(setLoading(false));
        if(response.status === 200){
          dispatch(setMyBooks(response.data));
          toast.success("Books fetched successfully");
         }
         else {
          
          toast.error("Error fetching books");
         }
      }
      catch(error) {
        console.log("error while fetching mybooks : " , error);
        toast.error(error?.response?.response?.message);
      }
    }
    fetchBooks();
  } , []);

  console.log("myBooks : " , books)

  // if(loading) {
  //   return <>
  //     <Spinner />
  //   </>
  // }

  return (
    <div>
        {
          temp.map((book , index) => (
            <div key={index}>
                <Book book = {book} />
             </div>
          ))
        }
    </div>
  )
}

export default MyBooks