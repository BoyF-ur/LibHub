import React, {useEffect, useState, useRef  } from "react";
import EmojiPicker from "emoji-picker-react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Post from "./Post";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axiosInstance from "../../utils/axiosInstance";

const Confession = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);



  const getPosts = async () => {
    try {
      const response = await axiosInstance.get("/get-posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Lỗi khi lấy bài đăng:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handlePost = async () => {
    if (!content.trim() && !image) return;

    const newPost = {
      content: content,
      image: image || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axiosInstance.post("/create-post", newPost);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/image-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(response.data.imageUrl);
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };
  const handleDeleteImage = async () => {
    if (!image) return;
    try {
      await axiosInstance.delete(`/delete-image?imageUrl=${encodeURIComponent(image)}`);
      fileInputRef.current.value = "";
      setImage(null); // Xóa ảnh khỏi state sau khi xóa thành công
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPost((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center gap-6 p-6 pb-20">
        {/* Chính giữa - Đăng bài */}
        <div className="max-w-xl flex-1 bg-white p-4 rounded-lg shadow-md overflow-auto">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex gap-2 mt-2 justify-end">
            <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200">
              <i className="fas fa-photo-video text-green-600"></i>
              <strong>Photo</strong>
            </label>
            <input type="file" id="file-upload" className="hidden" onChange={handleImageChange}   ref={fileInputRef} />
            {image && (
              <div className="relative mt-2">
                <img src={`http://localhost:8000${image}`} alt="Uploaded" className="w-full max-h-[500px] object-contain rounded-lg" />
                
                {/* Nút Xóa Ảnh */}
                <button 
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                  onClick={handleDeleteImage}
                >
                  ✖
                </button>
              </div>
            )}

            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <i className="fas fa-smile text-yellow-500"></i>
              <strong>Emoji</strong>
            </button>
          </div>

          {showEmojiPicker && (
            <div className="flex justify-end mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {image && <img src={image} alt="Preview" className="mt-2 w-full max-h-[500px] object-contain rounded-lg" />}

          <button className="w-full bg-black text-pornhub-200 text-lg py-2 rounded mt-2 hover:bg-gray-800 duration-300"
            onClick={handlePost}>
            <strong>Post</strong>
          </button>

          {/* Hiển thị danh sách bài đăng bằng component Post */}
          <div className="max-w-2xl mx-auto mt-5">
            {posts.map((item, index) => (
              <Post key={index} post={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Confession;
