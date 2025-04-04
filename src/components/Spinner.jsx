import React from 'react';

const Spinner = () => {
  const spans = Array.from({ length: 8 });

  return (

    <>
        <div className="relative w-16 h-16 flex justify-center items-center rounded-full -ml-[75px]">
        {spans.map((_, index) => (
            <span
            key={index}
            className="absolute top-1/2 w-9 h-[7px] bg-white shadow-[2px_2px_3px_0px_black] animate-dominos"
            style={{
                left: `${80 - index * 10}px`,
                animationDelay: `${index * 0.125}s`,
            }}
            />
        ))}
        </div>
    </>
  );
};

export default Spinner;
