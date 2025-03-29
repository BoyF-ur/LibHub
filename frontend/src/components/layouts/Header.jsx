import React, { useState, useEffect, useRef } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../Input/SearchBar";
import useLogout from "../../utils/useLogout";
import { useNavigationScroll } from "../../utils/navigationScroll";
import { useAuthStore } from "../../pages/store/useAuthStore";
import { getCookie } from "../../utils/getCookie";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";


const Header = ({
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
  isToken,
  setIsToken
 }) => {
  
  const {checkAuth} = useAuthStore(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        rage.clear(); // Có thể là lỗi typo, cần kiểm tra lại
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useLogout();
  const { handleAboutClick, handleContactClick, handleScrollAfterNavigation } = useNavigationScroll();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    handleScrollAfterNavigation();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleScrollAfterNavigation]);

  const onLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      logout(); // Gọi hàm logout từ hook `useLogout`
      setIsToken(null); // Cập nhật state ngay lập tức
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Xóa token trong cookie
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const FlyoutLink = ({ children, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;

    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit z-50"
      >
        <Link to="/category/All" className="ct-top-menu-item flex items-center group">
          {children}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ml-2 transform transition-transform duration-300 group-hover:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <span
            style={{
              transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </Link>
        <AnimatePresence>
          {showFlyout && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 top-12 z-50"
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <FlyoutContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const CategoryContent = () => {
    return (
      <div className="h-auto w-[250px] bg-white shadow-xl font-NunitoSans rounded-md z-50">
        <ul className="font-normal text-base">
          <li className="ct-flyout-menu"><Link to="/category/Technology">Technology Books</Link></li>
          <li className="ct-flyout-menu"><Link to="/category/Economy">Economy Books</Link></li>
          <li className="ct-flyout-menu"><Link to="/category/History">History Books</Link></li>
          <li className="ct-flyout-menu"><Link to="/category/Language">Language Books</Link></li>
          <li className="ct-flyout-menu"><Link to="/category/Psychology">Psychology Books</Link></li>
          <li className="ct-flyout-menu"><Link to="/category/Philosophy">Philosophy Books</Link></li>
        </ul>
      </div>
    );
  };

  useEffect(() => {
    isToken && getUserInfo();
  }, [isToken]);

  return (
    <header className="font-KumbhSans z-40 mx-2">
      <nav
        className="flex justify-between items-center py-1 font-bold drop-shadow-sm bg-white h-[70px] z-50"
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center lg:basis-1/6 lg:mx-auto">
          <a
            href="#"
            className="inline-flex items-center justify-center w-auto h-auto relative"
          >
            <img
              className="lg:w-16 md:w-16 w-16 lg:h-auto"
              src="/anhchot.png"
              alt="Logo-lib-hub"
              style={{
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => { handleAboutClick(); setIsMenuOpen(false); }}
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="basis-1/2 lg:basis-5/12 relative md:flex flex-col items-center text-black text-center ml-4">
          <SearchBar 
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>

        {/* Menu */}
        <ul id="ct-top-menu" className="basis-5 lg:basis-5/12 hidden lg:flex lg:justify-center lg:items-center lg:gap-12 text-base whitespace-nowrap ">
          <li><Link className="ct-top-menu-item" to="/home">Home</Link></li>
          <li><Link className="ct-top-menu-item" to="/about">About </Link></li>
          <li>
            <FlyoutLink className="ct-top-menu-item" FlyoutContent={CategoryContent}>
              Books
            </FlyoutLink>
          </li>
          <li><Link className="ct-top-menu-item" to="/confession">Confession</Link></li>

          {/* Avatar with Dropdown */}
          {isToken ? <ProfileInfo user={userInfo} /> : (<a href="/login" className="ct-top-menu-item">Login</a>)}
        </ul>
        <div className="lg:hidden flex items-center cursor-pointer px-3 sm:px-8 ml-auto">
          <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="size-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="ct-top-menu-expand"
              style={{ padding: "1rem 0" }}
            >
              <Link to="/home" className="w-full">
                <li className="ct-top-menu-expand-item">
                  Home
                </li>
              </Link>
              <a className="w-full" onClick={() => { handleAboutClick(); setIsMenuOpen(false); }}>
                <li className="ct-top-menu-expand-item">About</li>
              </a>
              <Link to="/category/All" className="w-full">
                <li className="ct-top-menu-expand-item">
                  Books
                </li>
              </Link>
              <a className="w-full" onClick={() => { handleContactClick(); setIsMenuOpen(false); }}>
                <li className="ct-top-menu-expand-item">Contact Us</li>
              </a>
              <Link to="/account" className="w-full">
                <li className="ct-top-menu-expand-item">
                  View Profile
                </li>
              </Link>
              {isToken ?
                <li className="list-none w-full text-center text-red-600 p-4 hover:bg-pornhub-300 hover:text-white transition-all rounded-xl cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  alert("Log out successfully!");
                  handleLogout();
                }}>
                  Log Out
                </li> :
                <a href="/login" className="w-full">
                  <li className="list-none w-full text-center text-red-600 p-4 hover:bg-pornhub-300 hover:text-white transition-all rounded-xl cursor-pointer">
                    Log In
                  </li>
                </a>
              }
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
