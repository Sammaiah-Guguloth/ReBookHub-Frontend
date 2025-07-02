import React, { useEffect, useRef } from "react";
import HilightTextOrange from "../components/HilightTextOrange";
import useInViewAnimation from "../hooks/useInViewAnimation";
import axiosInstance from "../api/axios/axiosInstance";
import { GET_HOME_FEED } from "../api/apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setHomeData, setError, setLoading } from "../redux/slices/homeSlice";
import Spinner from "../components/Spinner";
import BooksContainer from "../components/BooksContainer";
import GenreCarousel from "../components/GenreSection";
import Footer from "../components/Footer";
import TypewriterText from "../components/TypewriterText";

const Home = () => {
  const bannerRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const isInView = useInViewAnimation(bannerRef);
  const isNewArrivalInView = useInViewAnimation(newArrivalsRef);

  const { homeData, loading } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(GET_HOME_FEED);

      if (response.status === 200) {
        toast.success("Feed fetched successfully");
        dispatch(setHomeData(response.data));
      }
    } catch (error) {
      dispatch(setError(error));
      // console.log("error while fetching home feed: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!homeData) {
      fetchFeed();
    }
  }, []);

  // if (loading) {
  //   return (
  //     <div className='flex w-full justify-center mt-32'>
  //       <Spinner />
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content */}
      <div className="flex-grow font-sans">
        {/* Content Wrapper */}
        <div className="w-full  max-w-screen-xl mx-auto flex flex-col justify-center items-center mt-10 lg:mt-14">
          {/* Banner */}
          <div
            ref={bannerRef}
            className={`w-full mb-4 relative flex justify-center ${
              isInView ? "animate-slideUp" : ""
            }`}
          >
            <img
              className="w-[85vw] max-h-[500px] h-[37vw] object-cover rounded-md shadow-xl"
              src="/images/book_tree_banner1.webp"
              alt="Banner"
            />

            <div className="absolute top-12 sm:top-1/3 sm:left-24 animate-slideUp">
              <h3 className="text-xl sm:text-5xl font-semibold text-primary">
                Welcome to <TypewriterText text="ReBook Hub" />
              </h3>

              <span className="font-monospace sm:ml-10 sm:text-lg text-gray-800">
                Where Books Find New Homes
              </span>
            </div>
          </div>

          {/* New Arrivals */}
          <div
            className={`w-full max-h-max ml-5 mt-5 ${
              isNewArrivalInView ? "animate-slideUp" : ""
            } `}
            ref={newArrivalsRef}
          >
            <h2 className="text-2xl font-semibold mb-2">New Arrivals</h2>
            <BooksContainer books={homeData?.recentBooks} />
          </div>

          {/* Trending Books */}
          <div id="trending_books" className="w-full max-h-max ml-5 mt-5">
            <h2 className="text-2xl font-semibold mb-2">Trending Books</h2>
            <BooksContainer books={homeData?.popularBooks} />
          </div>

          {/* Genre Carousel */}
          <div className="w-full h-auto  mt-4 mb-5">
            <h2 className="text-2xl font-semibold mb-2">Explore</h2>
            <GenreCarousel />
          </div>

          {/* Trending Genres */}
          {homeData?.trendingGenres.map(
            (genre, index) =>
              genre.books.length > 0 && (
                <div className="w-full max-h-max ml-5 mt-5" key={index}>
                  <h2 className="text-2xl font-semibold mb-2">
                    {genre?.genre}
                  </h2>
                  <BooksContainer books={genre?.books} />
                </div>
              )
          )}
        </div>
      </div>

      {/* Full-Width Footer */}
      <Footer />
    </div>
  );
};

export default Home;
