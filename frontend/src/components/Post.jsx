import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {post.description}
          </p>
          <div className="flex items-center mt-4">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
