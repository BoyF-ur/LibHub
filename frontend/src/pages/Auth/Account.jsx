import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../../components/layouts/Header";

const GetUser = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <header>
        <Navbar userInfo={userInfo} />
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {userInfo ? (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src={userInfo.avatar || "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/480137217_610834581657218_8602848122860045456_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFGo77VipukjL6R7nYirg7muRt7vkTEW5m5G3u-RMRbmeY9O7_aMmhnAMwmbRw3D1gM2lOwpYIGVFMEMPSPkwxl&_nc_ohc=NjnyFk854o0Q7kNvgFH2C7B&_nc_oc=Adh6fWus3bI6ToFkaldVhWD3eX6slAvX0_bucoOTp92jFEdWu6FA4fe645ghVP56d4JxXRbyu-Qk1HtP1ajQinyO&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AKwAV89BKQH_pUFZaxeFsnm&oh=00_AYCJTWra9GLMOc1FfVYbglGi1HAu5NHq-P30R1_b0EbxgQ&oe=67BF6D74"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {userInfo.name}
            </h2>
            <p className="text-gray-600 text-center mb-4">@{userInfo.fullName}</p>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Email:</span> {userInfo.email}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg">Loading user information...</p>
        )}
      </main>
    </>
  );
};

export default GetUser;
