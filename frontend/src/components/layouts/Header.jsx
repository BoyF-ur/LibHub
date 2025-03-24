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
  handleClearSearch
}) => {
  const { checkAuth } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const isToken = getCookie('token');

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

  const FlyoutLink = ({ children, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const showFlyout = FlyoutContent && open;

    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit z-50"
      >
        <a href="/category/All" className="ct-top-menu-item flex items-center group">
          {children}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ml-2 transform transition-transform duration-300 group-hover:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <span style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }} />
        </a>
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
          <li className="ct-flyout-menu"><a href="/category/Technology">Technology Books</a></li>
          <li className="ct-flyout-menu"><a href="/category/Economy">Economy Books</a></li>
          <li className="ct-flyout-menu"><a href="/category/History">History Books</a></li>
          <li className="ct-flyout-menu"><a href="/category/Language">Language Books</a></li>
          <li className="ct-flyout-menu"><a href="/category/Psychology">Psychology Books</a></li>
          <li className="ct-flyout-menu"><a href="/category/Philosophy">Philosophy Books</a></li>
        </ul>
      </div>
    );
  };

  useEffect(() => {
    isToken && getUserInfo();
  }, []);

  return (
    <header className="font-KumbhSans z-40 mx-2">
      <nav
        className="flex justify-between items-center relative py-1 font-bold drop-shadow-sm bg-slate-50 h-[90px]"
      >
        <div className="flex justify-start lg:basis-1/12 lg:mx-auto">
          <a
            href="/home"
            className="inline-flex items-center justify-center w-auto h-auto relative"
          >
            <img
              className="lg:w-auto w-32 lg:h-auto"
              src="/lib-hub-logo.png"
              alt="Logo-lib-hub"
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
        <ul id="ct-top-menu" className="basis-5 lg:basis-5/12 hidden lg:flex lg:justify-center lg:items-center lg:gap-12 text-base whitespace-nowrap">
          <li><Link className="ct-top-menu-item" to="/home">Home</Link></li>
          <li><a className="ct-top-menu-item" href="/about" onClick={handleAboutClick}>About </a></li>
          <li>
            <FlyoutLink className="ct-top-menu-item" FlyoutContent={CategoryContent}>
              Category
            </FlyoutLink>
          </li>
          <li><a className="ct-top-menu-item" onClick={handleContactClick}>Contact Us</a></li>
          {Boolean(isToken) ? <ProfileInfo user={userInfo} /> : (<button className="ct-top-menu-item" onClick={onLogin}>Login</button>)}
        </ul>
        <div className="lg:hidden flex items-center cursor-pointer px-3 sm:px-8 ml-auto">
          <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="size-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </div>
        {/* Mobile Menu */}
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
              <a href="/home" className="w-full">
                <li className="ct-top-menu-expand-item">Home</li>
              </a>
              <a className="w-full" onClick={() => { handleAboutClick(); setIsMenuOpen(false); }}>
                <li className="ct-top-menu-expand-item">About</li>
              </a>
              <a href="/category/All" className="w-full">
                <li className="ct-top-menu-expand-item">Category</li>
              </a>
              <a className="w-full" onClick={() => { handleContactClick(); setIsMenuOpen(false); }}>
                <li className="ct-top-menu-expand-item">Contact Us</li>
              </a>
              <a href="/account" className="w-full">
                <li className="ct-top-menu-expand-item">View Profile</li>
              </a>
              {isToken ?
                <li className="list-none w-full text-center text-red-600 p-4 hover:bg-pornhub-300 hover:text-white transition-all rounded-xl cursor-pointer" onClick={(e) => {
                  e.stopPropagation();
                  alert("Log out successfully!");
                  logout();
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