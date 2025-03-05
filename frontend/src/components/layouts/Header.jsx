  import React, { useState, useEffect, useRef } from "react";
  import ProfileInfo from "../Cards/ProfileInfo";
  import { useNavigate } from "react-router-dom";
  import { AnimatePresence, motion } from "framer-motion";
  

  const Header = ({ userInfo, scrollToFooter, scrollToAbout}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
      setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const isToken = localStorage.getItem("token");
    const onLogin = () => {
      navigate("/login");
    }

    {/* Flyout Category */}

    const FlyoutLink = ({ children, href, FlyoutContent }) => {
      const [open, setOpen] = useState(false);
    
      const showFlyout = FlyoutContent && open;
    
      return (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="relative w-fit h-fit"
        >
          <a href="/category" className="ct-top-menu-item flex items-center group">
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 ml-2 transform transition-transform duration-300 group-hover:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <span
              style={{
                transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
              }}
  
            />
          </a>
          <AnimatePresence >
            {showFlyout && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                style={{ translateX: "-50%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute left-1/2 top-12"
              >
                <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                
                <FlyoutContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };
    // box content flyout
    const CategoryContent = () => {
      return (    
        <div className="h-auto w-[250px] bg-white shadow-xl font-NunitoSans rounded-md">
          <ul className="font-normal text-base">
            <li className="ct-flyout-menu"><a href="#">Technology Books</a></li>
            <li className="ct-flyout-menu"><a href="#">Economy Books</a></li>
            <li className="ct-flyout-menu"><a href="#">History Books</a></li>
            <li className="ct-flyout-menu"><a href="#">Language Books</a></li>
            <li className="ct-flyout-menu"><a href="#">Psychology Books</a></li>
            <li className="ct-flyout-menu"><a href="#">Philosophy Books</a></li>
          </ul>
        </div>
      );
    }

    return (
      <header className="font-KumbhSans z-50 mx-2 ">
        <nav className="flex justify-between items-center relative py-1 font-bold drop-shadow-sm bg-slate-50 h-[90px]">
          {/* Logo */}
          <div className="basis-1/12 mx-auto">
            <a href="#" className="inline-flex items-center justify-center w-auto h-auto relative">
              <img className="lg:w-auto w-32 lg:h-auto " src="public/lib-hub-logo.png" alt="Logo-lib-hub"/>
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative flex flex-col items-center text-black text-center basis-5/12">
            <fieldset className="w-full max-w-3xl items-center mx-auto">  
              <div className="relative w-full">
                  <button className="icon-search absolute top-1/2 -translate-y-1/2 flex justify-center items-center h-full w-16 hover:text-pornhub-200 hover:transition-colors ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>        
                  </button>
                  <input type="text" placeholder="Tittle book, author, ISBN, ..." className="w-full h-3 p-6 pl-16 rounded-full text-black focus:outline-none bg-gray-200 font-NunitoSans font-normal " />
              </div>
            </fieldset>                    
          </div>

          {/* Menu */}
          <ul id="ct-top-menu" className="basis-5/12 sm:ml-2 lg:flex lg:justify-center lg:items-center lg:gap-12 text-base whitespace-nowrap ">
            <li><a className="ct-top-menu-item" href="/home">Home</a></li>
            <li><a className="ct-top-menu-item" onClick={scrollToAbout}>About</a></li>
            <li>
              <FlyoutLink className="ct-top-menu-item" FlyoutContent={CategoryContent}>
                  Category
              </FlyoutLink>
            </li>
            <li><a className="ct-top-menu-item" onClick ={scrollToFooter}>Contact Us</a></li>
            
            {/* Avatar with Dropdown */}
            {isToken ? <ProfileInfo userInfo={userInfo}/> : (<button className="ct-top-menu-item" onClick={onLogin}>Login</button>)}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center cursor-pointer px-3 sm:px-8 ml-auto">
            <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </div>
        </nav>
      </header>

    );
  };


  export default Header;
