import React from "react";

const CardMember = ({ name, role, imageUrl, quote, linktoFacebook, linktoIntasgram, linktoEmail, tagline }) => {
  return (
    <div className="max-w-3xl mx-auto px-8 py-9 bg-white rounded-3xl border border-solid border-gray-150 relative">

      {/* Tagline */}
      <div className="absolute top-4 right-4 bg-orange-100 text-orange-800 text-sm font-medium italic px-4 py-1 rounded-full shadow-sm mb-0">
        #{tagline}
      </div>

      <div className="flex flex-col items-start">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-orange-400">
          <img
            src={imageUrl}
            alt="member-image"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "./public/Lib-hub.svg")} // Fallback image
          />
        </div>

        {/* Role button*/}
        <div className="inline-block px-3 py-2 bg-white rounded-full border border-gray-200 mt-4">
          <p className="text-sm font-medium text-gray-800">{role}</p>
        </div>

        {/* Name and Description */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-black mb-0">{name}</h1>
          <p className="text-xl text-black mt-2">
            {quote}
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-6">
          <a href={linktoFacebook} className="ct-effect-icon">
            <i className="fab fa-facebook-f fa-lg "></i>
          </a>
          <a href={linktoIntasgram} className="ct-effect-icon">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href={linktoEmail} className="ct-effect-icon">
            <i className="fa-solid fa-envelope fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardMember;