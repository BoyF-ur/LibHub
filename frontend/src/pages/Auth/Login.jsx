import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop-blur-[2px]"
      style={{ backgroundImage: "url('/library_view.png')" }} // ✅ Đường dẫn ảnh đúng
    >
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src="/Lib-hub.svg" alt="Logo" className="w-32 h-16" /> {/* ✅ Đường dẫn đúng */}
      </div>

      <div className="bg-white bg-opacity-80 rounded-2xl p-8 shadow-lg w-96">
        {/* Title */}
        <h2 className="text-center text-xl font-bold mb-1">Login</h2>
        <p className="text-center text-lg text-gray-900 font-bold mb-4">
          Welcome back!
        </p>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-md hover:ring-2 hover:ring-black"
            />
          </div>

          <div className="mb-4 relative group">
            <label className="block text-gray-800 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"} // ✅ Toggle mật khẩu
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md hover:ring-2 hover:ring-black"
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

          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-gray-800 text-sm">
              Remember me!
            </label>
          </div>

          <button type="submit" onClick={() => navigate("/home")} className="w-full bg-black text-yellow-400 font-bold py-2 rounded-md hover:bg-gray-900">
            Login
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-800 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 font-medium underline underline-offset-2">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
