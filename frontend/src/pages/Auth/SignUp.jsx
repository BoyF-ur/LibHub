// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async(e) => {
    e.preventDefault();
    
    if(!name){
        setError("Please enter your full name.");
        return;
    }

    if(!validateEmail(email)){
      setError("Invalid Email");
      return;
    }

    if(!password){
      setError("Please enter password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/signup", {
        fullName: name,
        email:email,
        password:password,
      });
      if(response.data && response.data.accessToken) {
        console.log(response.data.accessToken)
        localStorage.setItem("token", response.data.accsessToken);
        navigate("/login");
      }
    } catch(error){
      if(error.response && 
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. Please try again.");
      }
    }

  };

    return(
        <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop-blur-[2px]"
        style={{ backgroundImage: "url('/library_view.png')" }} // ✅ Đường dẫn ảnh đúng
      >
        {/* Logo */}
        <div className="absolute top-4 left-4">
        <a href="/home">
          <img src="public/lib-hub-logo.png" alt="Logo-lib-hub" className="w-32 h-16" /> {/* ✅ Đường dẫn đúng */}
        </a>
        </div>
  
        <div className="bg-white bg-opacity-80 rounded-2xl p-8 shadow-lg w-96">
          {/* Title */}
          <h2 className="text-center text-xl font-bold mb-1">Sign Up</h2>
  
          {/* Form */}
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-2 rounded-md hover:ring-2 hover:ring-black"
                value={name}
                onChange={({target})=>{
                setName(target.value);
              }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-2 rounded-md hover:ring-2 hover:ring-black"
                value={email}
                onChange={({target})=>{
                setEmail(target.value);
              }}
              />
            </div>
  
            <div className="mb-4 relative group">
              <label className="block text-gray-800 font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"} // ✅ Toggle mật khẩu
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md hover:ring-2 hover:ring-black"
                value={password}
                onChange={({target})=>{
                setPassword(target.value);
            }}
              />
              {/* Eye icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // ✅ Đúng cách
                className="absolute inset-y-9 right-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-50"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>

            <br />
            
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="w-full bg-black text-yellow-400 font-bold py-2 rounded-md hover:bg-gray-900">
              Sign Up
            </button>
          </form>
  
          {/* Sign up link */}
          <p className="text-center text-sm text-gray-800 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 font-medium underline underline-offset-2">
              Login!
            </a>
          </p>
        </div>
      </div>
    )
}

export default SignUp;