import React from 'react'
import categories from '../data/categories'
import { Link } from 'react-router-dom'

const Categories = () => {
  return (
    <div className='flex w-full gap-8 flex-wrap items-center p-4 justify-center border-2 rounded-md mb-6'>
      {
        categories.map((category , index) => (
          <div key={index} className='flex flex-col hover:scale-110 md:hover:scale-125 transition-all items-center justify-center'> 
              <Link to={`${category.link}`} className="text-decoration-none text-dark">
                <img className='h-14 md:h-16 aspect-square rounded-full object-cover self-center  hover:shadow-lg transition-all' src={category.imageUrl} alt={category.category}/>
                <h3 className='text-[0.8rem] text-center mt-2'>{category.category}</h3>
              </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Categories