import React from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const Post = ({ post }) => {
  console.log(post.userCreate.avatar);
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4 relative">
      {/* Nút thao tác bài đăng */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit size={18} />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FaTrash size={18} />
        </button>
        <button className="text-green-500 hover:text-green-700">
          <FaCheck size={18} />
        </button>
      </div>

      {/* Thông tin người đăng */}
      <div className="flex items-center mb-2">
        <img
          src={post.userCreate.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full sm:hidden md:block vsm:hidden"
        />
        <div className="ml-2">
          <p className="text-lg font-semibold sm:text-[12px] lg:text-lg vsm:text-[10px]">
            {post.userCreate.fullName}
          </p>
          <p className="text-sm text-gray-500 sm:text-[10px] lg:text-sm vsm:text-[8px]">
            {new Date(post.updatedAt).toLocaleDateString()}{" "}
            {new Date(post.updatedAt).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Nội dung bài đăng */}
      <p>
        {post.content.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      {/* Hình ảnh bài đăng (nếu có) */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-2 w-full max-h-[500px] object-contain rounded-lg"
        />
      )}
    </div>
  );
};

export default Post;
