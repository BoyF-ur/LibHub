import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Account from "./pages/User/Account";
import Category from "./pages/Book/Category";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Book/Search";
import { getCookie } from "./utils/getCookie";
import BorrowedBooks from "./pages/Book/BorrowedBooks";
import Confession from "./pages/Confession/Confession";
import About from "./pages/About/About";

const App = () => {
    const isToken = getCookie("token"); 

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={isToken ? <Navigate to="/home" replace /> : <Login />} />
                    <Route path="/signup" element={isToken ? <Navigate to="/home" replace /> : <SignUp />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/category/:title" element={<Category />} />
                    <Route path="/book/:id" element={<BookDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/borrowed" element={<BorrowedBooks />} />
                    <Route path="/confession" element={<Confession />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;