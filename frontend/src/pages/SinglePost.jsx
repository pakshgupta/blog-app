import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Fetch current user from local storage

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://your-backend-api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setIsOwner(data.author.id === currentUser.id); // Check if the current user is the owner
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, currentUser.id]);

  const handleUpdate = () => {
    navigate(`/write/${id}`); // Navigate to WritePost page with post ID
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`https://your-backend-api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("Post deleted successfully");
          navigate('/'); // Redirect to home or another appropriate page
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="flex items-center">
        <img
          src={post.author.avatarUrl}
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="ml-3">
          <p className="text-lg font-medium text-gray-800">{post.author.name}</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      {isOwner && (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleUpdate}
            className="bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-800"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-800"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
