import React from "react";

const CardCategory = ({id, title, description, imageUrl, linkCategory}) => {
  return (
    <div className="cursor-pointer p-4 md:w-[85%] m-auto hover:-translate-y-3 duration-300">
      <a href={linkCategory}>
        <div className="h-[430px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg duration-300 bg-gray-50">
          {/* Cover book */}
          <div className="h-[63%] object-cover bg-black">
            <img 
            src={imageUrl} 
            alt="book-cover" 
            className="w-full h-full"
            onError={(e) => (e.target.src = "./public/Lib-hub.svg")} // Fallback image
            /> 
          </div>
          
          <div className="px-5 py-5">
            <div className="flex items-center justify-center font-extrabold text-xl text-black mb-2 ">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

  export default CardCategory;
