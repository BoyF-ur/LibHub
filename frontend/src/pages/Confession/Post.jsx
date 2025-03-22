import React from "react";

const Post = ({ post }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-2">
        <img
          src="https://th.bing.com/th/id/OIP.uXx8Hh8ZcVsSHb-LR1twFAHaHa?rs=1&pid=ImgDetMain"
          alt="Avatar"
          className="w-10 h-10 rounded-full sm:hidden md:block vsm:hidden"
        />
        <div className="ml-2">
          <p className="text-lg font-semibold sm:text-[12px] lg:text-lg vsm:text-[10px]">Cuongdz</p>
          <p className="text-sm text-gray-500 sm:text-[10px] lg:text-sm vsm:text-[8px]">{post.time}</p>
        </div>
      </div>
      <p>
        {post.content.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      {post.image && (
        <img src={post.image} alt="Post" className="mt-2 w-full max-h-[500px] object-contain rounded-lg" />
      )}
    </div>
  );
};

export default Post;
