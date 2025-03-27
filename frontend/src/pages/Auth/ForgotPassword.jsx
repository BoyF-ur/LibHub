import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!validateEmail(email)) {
            setError("Invalid Email");
            return;
        }

        try {
            // 1️⃣ Kiểm tra email có tồn tại trong database không
            const checkResponse = await axiosInstance.post("/check-email", { email });
            if (!checkResponse.data.exists) {
                setError("Email không tồn tại trong hệ thống!");
                return;
            }

            // 2️⃣ Nếu email hợp lệ, gửi email reset password
            const response = await axiosInstance.post("/forgot-password", { email });
            setMessage(response.data.message);
        } catch (error) {
            setError("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/library_view.png')" }}
        >
            <div className="absolute top-4 left-4">
                <img src="/anhchot.png" alt="Logo-lib-hub" className="w-32 h-auto mb-1" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-lg font-bold mb-4">Quên mật khẩu?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="w-full p-2 border rounded mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-black text-yellow-400 font-bold py-2 rounded-md hover:bg-gray-900">
                        Gửi email
                    </button>
                </form>
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <p className="text-center text-sm mt-4">
                    <a href="/login" className="text-blue-600 hover:underline text-sm ml-auto">Quay lại đăng nhập</a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
