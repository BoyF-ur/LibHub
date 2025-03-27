import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import useLogout from '../../utils/useLogout';
import axiosInstance from '../../utils/axiosInstance';


const ProfileInfo = ({user}) => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const logout = useLogout();
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);

  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);  
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getUserInfo();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-50" ref={dropdownRef}>
      {userInfo &&
      <button onClick={handleDropdownToggle} className=''>
        <img className="w-[52px] h-[52px] p-1 rounded-full object-cover translate-y-1" 
        src={userInfo.avatar} 
        alt="User Avatar" 
        />
      </button>
      }

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 100, y: 15 }}
              style={{ translateX: "-30%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute shadow-lg top-0 z-100 rounded-lg bg-white"
            >
              <button className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => {navigate("/account")}}>View Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                logout();
              }}>
                Logout
              </button>
              </motion.div>
            </div>
          )}
        </div>
    )
}

export default ProfileInfo