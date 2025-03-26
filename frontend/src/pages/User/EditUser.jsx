import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdAdd, MdUpdate, MdDeleteOutline } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify"

const EditUser = ({ 
    userInfo,
    type,
    onClose,
    getUserInfo,

}) => {

  const [fullName, setFullName] = useState(userInfo?.fullName || "");
  const [avatar, setAvatar] = useState(userInfo?.avatar || null);
  const [password, setPassword] = useState(userInfo?.password || "");
  const [MSSV, setMSSV] = useState(userInfo?.MSSV || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const updateUser = async () => {
    const userId = userInfo._id;
    try{
      let imageUrl = "";

      let postData = {
        fullName,
        password,
        MSSV,
        phoneNumber,
        avatar: userInfo.avatar || "",
      }

      if(typeof avatar === "object") {
        const imgUploadRes = await uploadImage(avatar);
        imageUrl = imgUploadRes.imageUrl || "";

        postData = {
          ...postData,
          avatar: imageUrl,
        };
      }

      const response = await axiosInstance.put("/edit-user", postData)
      if(response.data && response.data.user){
        toast.success("User updated successfully", {
          autoClose: 1000,
        });
        onClose();
      }

    }catch(error){
      if(error.response && 
        error.response.data && 
        error.response.data.message
      ){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred.Please try again!")
      }
    }
  }

  const handleAddOrUpdateClick = () => {

    if(!fullName || !password || !phoneNumber || !avatar || !MSSV){
      setError("All field are required!");
      return ;
    }
    setError("");

    if(type === "edit"){
      updateUser();
    } 
  }
  
  const handleDeleteAvatar = async () => {
    const deleteImgRes = await axiosInstance.delete("/delete-image", {
      query : {
        imageUrl : userInfo.avatar,
      },
    });

    if(deleteImgRes.data){
      const userId = userInfo._id;
      const postData = {
        fullName,
        password,
        MSSV,
        phoneNumber,
        avatar:"",
      };
      const response = await axiosInstance.put("/edit-user", postData);
      setAvatar(null);
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justufy-between">
        <h5 className="text-xl font-medium text-slate-700">
          EDIT ACCOUNT
        </h5>

        <div className="absolute top-4 right-0">
            <div className=" flex items-center gap-2 bg-white p-2 rounded-l-lg shadow-md">
              
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg"/> SAVE
                </button> 

              <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
                <MdClose className="text-xl text-gray-500 hover:text-pornhub-200" />
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
            )}
          </div>
        </div>
      
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <label className="input-label">Full Name</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Your Full Name"
          value={fullName}
          onChange={({target}) => setFullName(target.value)}
        />
          
        <ImageSelector
        image={avatar}
        setImage={setAvatar}
        handleDeleteImg={handleDeleteAvatar}
        />
        
        <div className="mb-4 relative group">
            <label className="input-label">Password</label>
            <input
              type={showPassword ? "text" : "password"} 
              className="w-full p-2 bg-slate-50 rounded-md"
              value={password}
              onChange={({target})=>{
              setPassword(target.value);
              }}
            />
            {/* Eye icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-9 right-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-50"
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">MSSV</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="MSSV"
           rows={1}
           value={MSSV}
           onChange={({ target }) => setMSSV(target.value)}
           />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">PHONE NUMBER</label>
          <textarea
           type="text"
           className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
           placeholder="Your Phone Number"
           rows={1}
           value={phoneNumber}
           onChange={({ target }) => setPhoneNumber(target.value)}
           />
        </div>
        
      </div>

      </div>
  )
}

export default EditUser