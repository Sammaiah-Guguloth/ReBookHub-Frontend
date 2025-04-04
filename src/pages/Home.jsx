import React, { useRef } from 'react'
import NavBar from '../components/NavBar'
import HilightTextOrange from '../components/HilightTextOrange'
import Categories from '../components/Categories'
import useInViewAnimation from '../hooks/useInViewAnimation'


const Home = () => {

  const bannerRef = useRef(null);
  const categorieRef = useRef(null);
  const isInView = useInViewAnimation(bannerRef);
  const isInViewCategorie = useInViewAnimation(categorieRef);

  return (
    <div className='font-sans'>
      
      <div className='w-screen max-w-site flex flex-col justify-center  mt-10 lg:mt-14'>
          {/* Banner */}
          <div ref={bannerRef} className={`mx-auto w-full  max-h-max  lg:ml-10 mb-4 self-center ml-auto flex  justify-center relative ${isInView ? "animate-slideUp" : ""}`}>
              <img 
                className='w-[85vw] h-[37vw] object-cover  justify-self-center rounded-md shadow-xl'
                src='/images/book_tree_banner1.jpg' 
              />

              <div className='absolute  top-12 sm:top-1/3 sm:left-24 animate-slideUp'
                // style={{ animationDelay: '1s' }}
              >
                  <h3 className=' text-2xl  sm:text-4xl font-semibold text-primary' >
                    Welcome to 
                    <HilightTextOrange>ReBook Hub</HilightTextOrange>
                  </h3>
                  <span  className='font-monospace sm:ml-10  sm:text-lg text-gray-800'>
                    Where Books Find new Homes
                  </span>

                  
              </div>
          </div>

          {/* TrendingOffers */}
          <div className='w-full max-h-max ml-5 mt-5'>
            <h2 className='text-2xl  font-semibold mb-2'>Trending Offers</h2>
            <div className='w-full flex justify-center items-center border-2 rounded-lg h-[5rem] mb-5'> 
                Will be Added Soon
            </div>
          </div>

          {/* New Arrivals */}
          <div className='w-full max-h-max ml-5 mt-5'>
            <h2 className='text-2xl  font-semibold mb-2'>New Arrivals</h2>
            <div className='w-full flex justify-center items-center border-2 rounded-lg h-[5rem] mb-5'> 
                Will be Added Soon
              </div>
          </div>

          {/* Trendiing Books */}
          <div className='w-full max-h-max ml-5 mt-5'>
            <h2 className='text-2xl  font-semibold mb-2'>Trending Books</h2>
            <div className='w-full flex justify-center items-center border-2 rounded-lg h-[5rem] mb-5'> 
                Will be Added Soon
            </div>
          </div>

          {/* Categories */}
          <div ref={categorieRef} className={`w-full max-h-max ml-5 mt-5 ${isInViewCategorie ? "animate-slideUp" : ""}`}>
            <h2 className='text-2xl  font-semibold mb-3'>Categories</h2>
              <Categories />
          </div>
      </div>

      </div>
  )
}

export default Home