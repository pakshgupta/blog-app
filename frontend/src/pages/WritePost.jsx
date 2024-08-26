import React, { useState } from 'react';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    // Create a new post object
    const newPost = {
      id: Date.now(), // For simplicity, we're using Date.now() as an ID.
      title,
      description,
      imageUrl: URL.createObjectURL(image),
      author: {
        name: "John Doe", // Replace with actual user's name.
        avatarUrl: "https://via.placeholder.com/40", // Replace with actual user's avatar.
      },
      date: new Date().toLocaleDateString(),
    };

    console.log("Post created:", newPost);

    // Reset form fields
    setTitle('');
    setDescription('');
    setImage(null);
    setPreview(null);

    // You can now send `newPost` to your server or state management
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your post title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter a brief description"
            rows="5"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>
        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
          </div>
        )}
        <button
          type="submit"
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition-colors duration-300"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default WritePost;
