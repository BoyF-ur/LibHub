import React from "react";

// Custom Previous Arrow
const PrevArrow = ({ sliderRef }) => {
  // Function to handle click event and check if sliderRef is not null
  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    } else {
      console.error("Slider ref is null, cannot call slickPrev");
    }
  };

  return (
    <button
      onClick={handlePrevClick}
      className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-gray-200 text-pornhub-200 hover:bg-pornhub-300 hover:text-white duration-200 w-14 h-14 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

// Custom Next Arrow
const NextArrow = ({ sliderRef }) => {
  // Function to handle click event and check if sliderRef is not null
  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    } else {
      console.error("Slider ref is null, cannot call slickNext");
    }
  };

  return (
    <button
      onClick={handleNextClick}
      className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-gray-200 text-pornhub-200 hover:bg-pornhub-300 hover:text-white duration-200 w-14 h-14 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

export { PrevArrow, NextArrow };