import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/Header";

const Category = () => {

    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState(null);

    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user");
            if(response.data && response.data.user){
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/home");
            }
        }
    };

    useEffect(() => {
        getUserInfo();  
        return () => {
            
        }

        },[]
    )

  return (
    <>
        <header>
            <Navbar userInfo={userInfo}/>
        </header>
    </>
  )
}

export default Category