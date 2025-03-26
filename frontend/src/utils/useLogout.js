import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    // // localStorage.clear();
    const res = await axiosInstance.post("/logout");
    
    navigate("/home");
  };

  return logout;
};


export default useLogout;