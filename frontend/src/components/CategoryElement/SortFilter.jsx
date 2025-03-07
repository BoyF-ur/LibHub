import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const SortFilter = ({ onFilterClick }) => {
  const [sortOption, setSortOption] = useState("Thứ tự theo giá: thấp đến cao");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex justify-between items-center border p-2 rounded-md bg-white max-w-fit max-h-fit vsm:w-[100px] lg:w-[772px]">
      <button
        className="flex items-center gap-1 text-black font-semibold"
        onClick={onFilterClick}
      >
        <FaFilter />
        Lọc
      </button>
    </div>
  );
};

export default SortFilter;
