import React from "react";

// Custom Previous Arrow
function PrevArrow(props) {
  const { className, onClick } = props;
  return (
      <div
        className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 `}
        onClick={onClick}
      >
      <button className="rounded-full bg-gray-100 text-pornhub-200 hover:bg-pornhub-200 hover:text-white duration-200 size-14">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 m-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      </div>
  );
}

// Custom Next Arrow
function NextArrow(props) {
  const { className, onClick } = props; 
  return (
    <div
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2`}
      onClick={onClick}
    >
    <button className="rounded-full bg-gray-100 text-pornhub-200 hover:bg-pornhub-200 hover:text-white duration-200 size-14">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 m-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
   
    </button> 
    </div>
  );
}

export { PrevArrow, NextArrow };