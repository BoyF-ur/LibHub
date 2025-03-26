import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Book/Search";
import { getCookie } from "./utils/getCookie";
import BorrowedBooks from "./pages/Book/BorrowedBooks";
import GameCard from "./components/Cards/GameCard"
import Header from "./components/layouts/Header";
import axiosInstance from "./utils/axiosInstance";
import Confession from "./pages/Confession/Confession";
import About from "./pages/About/About";

const App = () => {
    const [isToken, setIsToken] = useState(getCookie("token")); 
    const [searchQuery, setSearchQuery] = useState('');
    const [allBooks, setAllBooks] = useState([]);
    const [filterType, setFilterType] = useState('');

    console.log(isToken);

    const getAllBooks = async () => {
        try{
            const response = await axiosInstance.get("/get-all-book");
            if(response.data && response.data.stories){
                setAllBooks(response.data.stories);
            }
        }catch(error){
            console.log("An unexpected error occurred. Please try again");
        }
    }

    const onSearchBook = async (query) => {
        try{
          const response = await axiosInstance.get("/search", {
            params:{
              query,
            },
          });
          if(response.data && response.data.stories){
            setFilterType("search");
            setAllBooks(response.data.stories);
          }
      }catch(error){
          setError("An unexpected error occurred.Please try again!")
        }
    }

    const handleClearSearch = () => {
        setFilterType("");
        getAllBooks();
    }

    useEffect(() => {
        setIsToken(getCookie("token"));
      }, []);

    return (
        <div>
            <Router>
            {window.location.pathname !== "/login" && window.location.pathname !== "/signup" && (
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearchNote={onSearchBook}
                    handleClearSearch={handleClearSearch}
                />
                )}
                {isToken && <GameCard id="game-frame"/>}
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={isToken ? <Navigate to="/home" replace /> : <Login setIsToken={setIsToken}/>} />
                    <Route path="/signup" element={ <SignUp setIsToken={setIsToken}/>} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/category/:title" element={<Category />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/borrowed" element={<BorrowedBooks />} />
                    <Route path="/confession" element={<Confession isToken={isToken}/>} />
                </Routes>

            </Router>
        </div>
    );
};

const Root = () => {
    return (
      <Navigate to="/home"/>
    )
  }

export default App;