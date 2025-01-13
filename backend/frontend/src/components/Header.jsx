import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cricketIcon from '../assets/new.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (['/', '/login', '/verify-otp', '/forgot-password', '/verify-reset-otp', '/reset-password'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={cricketIcon}
            alt="Cricket Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
          />
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-wide">
            Cricket <span className="text-yellow-400">Shop</span>
          </h1>
        </div>

        <button
          className="sm:hidden flex items-center text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden sm:flex sm:space-x-6 text-sm sm:text-lg font-medium">
          <Link
            to="/home"
            className="block sm:inline-block hover:text-yellow-400 hover:underline transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block sm:inline-block hover:text-yellow-400 hover:underline transition duration-200"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block sm:inline-block hover:text-yellow-400 hover:underline transition duration-200"
          >
            Cart
          </Link>
        </div>
      </div>

      <div
        className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden fixed inset-0 bg-black bg-opacity-50 z-10`}
        onClick={() => setIsMenuOpen(false)} 
      >
        <div
          className="flex flex-col items-center justify-center space-y-6 bg-gradient-to-r from-blue-500 to-indigo-500 w-4/5 h-full text-white p-6"
          onClick={(e) => e.stopPropagation()} 
        >
          <Link
            to="/home"
            className="text-lg hover:text-yellow-400 hover:underline transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-lg hover:text-yellow-400 hover:underline transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-lg hover:text-yellow-400 hover:underline transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
