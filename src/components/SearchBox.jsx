import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 overflow-hidden w-[50px] h-[40px] hover:md:w-[270px] hover:w-[200px] bg-[#787879] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300 ">
        <div className="flex text-center items-center justify-center fill-white">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          placeholder="Search..."
        />
      </div>
    </form>
  );
};

export default SearchBox;
