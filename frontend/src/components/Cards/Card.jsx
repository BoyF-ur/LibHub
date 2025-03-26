import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  variant = 'category',
  title,
  description,
  imageUrl,
  linkCategory,
  author,
  id,
  withHoverEffect = false
}) => {
  //TODO: Add borrowedCount to the card
  //divied the card into two types: category and hotbook and book in category
  const isHotBook = variant === 'hotbook';
  const cardClass = withHoverEffect ? 'cursor-pointer px-5 py-5  md:w-[85%] m-auto hover:-translate-y-3 duration-300' : 'cursor-pointer px-5 py-5';

  //Function to check isHotBook / category
  const getLink = () => {
    if (isHotBook && id) {
      return `/book/${id}`; 
    }
    if (variant === 'category' && title) {
      return `/category/${title}`; 
    }
    return linkCategory || '#'; // Fallback
  };

  return (
    <Link to={getLink()}>
      <div className={`${cardClass}`}>
        <div className={`h-[430px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg duration-300 bg-gray-100 ${isHotBook ? 'border-2 border-yellow-400' : ''} relative`}>
          {/* Cover */}
          <div className="h-[65%] object-cover bg-black relative">
            <img
              src={imageUrl}
              alt="book-cover"
              className="w-full h-full"
              onError={(e) => (e.target.src = "./anhchot.png")} // Fallback image
            />
            {isHotBook && (
              <>
                <div className="absolute right-0 top-0 mt-5 mr-5 text-red-500 font-bold bg-gray-50 px-3 py-1 rounded-full">
                  🔥 Hot
                </div>
              </>
            )}
          </div>

          <div className="px-5 py-5">
            <div className="flex items-center justify-center font-extrabold text-xl text-black mb-2">
              {title}
            </div>
            {isHotBook ? (
              <p className="text-gray-700 text-base">Author: {author}</p>
            ) : (
              ''
            )}
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;