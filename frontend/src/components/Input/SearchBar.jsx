import React from 'react'
import { IoMdClose } from "react-icons/io"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full max-w-3xl items-center mx-auto relative">
      <input
        type="text"
        placeholder="Title book, author, ISBN, ..."
        className="w-full h-3 p-6 pl-16 pr-12 rounded-full text-black focus:outline-none bg-gray-200 font-NunitoSans font-normal focus:bg-slate-100 focus:outline-pornhub-200 duration-75"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      {
        value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black absolute top-1/2 -translate-y-1/2 right-4" onClick={onClearSearch} />
      }
      {/* icon-search */}
      <button className="icon-search absolute top-1/2 -translate-y-1/2 flex justify-center items-center h-full w-12 hover:text-pornhub-200 transition-colors" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar