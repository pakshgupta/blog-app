import React from "react";
import Post from "../components/Post.jsx";


const post = {
  id: 1,
  imageUrl: "https://via.placeholder.com/400x300",
  title: "My Awesome Blog Post",
  description:
    "This is a brief glimpse of the blog post content. It should give the reader an idea of what the post is about.",
  author: {
    name: "John Doe",
    avatarUrl: "https://via.placeholder.com/40",
  },
  date: "August 19, 2024",
};

const Posts = () => {
    console.log(post)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <Post post={post}/>
   
    </div>
  );
};

export default Posts;
