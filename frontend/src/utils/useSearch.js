import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export const useSearch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allBooks, setAllBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');


  const getAllBooks = async () => {
    try {
      const response = await axiosInstance.get("/get-all-book");
      if (response.data && response.data.stories) {
        setAllBooks(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  }

  const onSearchBook = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: {
          query,
        },
      });
      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllBooks(response.data.stories);
      }
    } catch (error) {
      setError("An unexpected error occurred.Please try again!")
    }
  }

  const handleClearSearch = () => {
    setFilterType("");
    getAllBooks();
  }

  return {
    handleClearSearch,
    onSearchBook,
    setSearchQuery,
    searchQuery,
  };
};
