import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const handleImageClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setUser(false);
    console.log("User logged out");
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Blog App</div>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-200">
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-white hover:text-gray-200">
                  SignIn
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/write" className="text-white hover:text-gray-200">
                  Post Blog
                </Link>
              </li>
              <li>
                <Link to="/all-blogs" className="text-white hover:text-gray-200">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link to="/post/:id" className="text-white hover:text-gray-200">
                  Your Posts
                </Link>
              </li>
              <li className="relative">
                <button onClick={handleImageClick}>
                  <img
                    src="./images/logo.jpg"
                    alt="User Logo"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                </button>
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className="absolute right-0 top-12 bg-slate-700 text-white py-1 px-4 rounded hover:bg-slate-800"
                  >
                    Logout
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
