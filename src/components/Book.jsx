import React from 'react'

const Book = ({book}) => {
  return (
    <div className='w-[200px] h-[300px] flex items-center justify-center'>
        
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>

    </div>
  )
}

export default Book