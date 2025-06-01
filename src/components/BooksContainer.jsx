import React from 'react';
import BookCard from './BookCard';

const BooksContainer = ({ books }) => {
  console.log(books);

  return (
    <div className="w-full px-2 sm:px-4 mb-5">
      {/* Display books */}
      {books?.length > 0 && (
        <div className="w-full flex flex-wrap justify-center  gap-4 md:gap-8 lg:gap-11 mt-6 sm:mt-8">
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              price={book.price}
              description={book.description}
              trueImages={book.trueImages}
              coverImage={book.coverImage}
              rating={book.rating}
              language={book.language}
              author={book.author}
              publication={book.publication}
              genre={book.genre}
              isAvailable={book.isAvailable}
              id={book._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksContainer;
