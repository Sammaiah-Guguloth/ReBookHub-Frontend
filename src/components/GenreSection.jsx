import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HilightTextOrange from './HilightTextOrange';
import KeyButton from './KeyButton';

const featuredGenres = [
  {
    name: 'Romance',
    tagline: 'Fall in love with every page.',
    image: "/images/genres/romance.jpg",
  },
  {
    name: 'Thriller',
    tagline: 'Twists, turns, and heart-pounding suspense.',
    image: "/images/genres/thriller.jpg",
  },
  {
    name: 'Fantasy',
    tagline: 'Enter worlds beyond imagination.',
    image: "/images/genres/fantasy.jpg"
  },
  {
    name: 'Science Fiction',
    tagline: 'Where the future unfolds.',
    image: "/images/genres/science_fiction.jpg"
  },
  {
    name: 'Mystery',
    tagline: 'Every clue leads to another question.',
    image: "/images/genres/mystery.jpg"
  },
];

const allGenres = [
  "Romance", "Thriller", "Science Fiction", "Fantasy", "Mystery", "Horror", "Non-fiction", "Biography", "Self-help", "Historical", "Adventure", "Comics", "Poetry", "Drama", "Philosophy", "Technology", "Art", "Business", "Education", "Spirituality", "Health & Fitness", "Politics", "Travel", "Cookbooks", "Children", "Religious", "Sports", "Other"
];

export default function GenreCarousel() {
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredGenres.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToGenre = (genre) => {
    navigate(`/books/${encodeURIComponent(genre)}`);
  };

  return (
    <div className="w-full px-4 py-8 flex flex-col items-center">
      {/* Carousel Container */}
      <div className="w-full max-w-5xl aspect-[16/9] relative overflow-hidden rounded-xl shadow-md animate-slideUp">
        {featuredGenres.map((genre, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${genre.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-full h-full bg-black/40 flex items-center justify-center text-center text-white px-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-7xl font-semibold"><HilightTextOrange>{genre.name}</HilightTextOrange></h2>
                <p className="text-xs sm:text-base mt-2">{genre.tagline}</p>
                <button
                  onClick={() => goToGenre(genre.name)}
                  className="mt-4 px-4 py-1.5 text-sm rounded-full hover:bg-white transition-all border-b-2 bg-transparent text-white hover:text-black "
                >
                  Explore {genre.name}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute z-40  bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-4 animate-slideLeft">
          {featuredGenres.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index ? 'bg-white scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Explore All Genres Button */}
      <div className="mt-6 text-center mx-auto animate-slideRight">
        <KeyButton>
          <button
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Hide Genres' : 'Explore All Genres'}
          </button>
        </KeyButton>
      </div>

      {/* All Genres Capsule View */}
      {showAll && (
        <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-4xl transition-all duration-500">
          {allGenres.map((genre, idx) => (
            <button
              key={idx}
              onClick={() => goToGenre(genre)}
              className="bg-gray-100 hover:bg-blue-100 text-sm px-4 py-1 rounded-full border border-gray-300 animate-slideDown transition-all duration-500 whitespace-nowrap"
            >
              {genre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
