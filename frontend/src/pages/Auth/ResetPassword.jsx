import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        try {
            const response = await axiosInstance.post(`/reset-password/${token}`, { password });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError("Token không hợp lệ hoặc đã hết hạn!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-lg font-bold mb-4">Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        className="w-full p-2 border rounded mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Đặt lại mật khẩu</button>
                </form>
                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
