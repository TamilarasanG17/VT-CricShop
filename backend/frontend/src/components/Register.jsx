import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';
import { FaSpinner } from 'react-icons/fa';
import cricketIcon from '../assets/new.jpg'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 3000);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          navigate('/verify-otp', { state: { email: formData.email } });
        },
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Error during registration',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
        <div className="flex flex-col justify-center items-center text-white">
          <img src={cricketIcon} alt="Website Icon" className="w-16 h-16 mb-4" />
          <FaSpinner className="animate-spin text-5xl mb-4" />
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 px-2 sm:px-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full sm:w-96 animate__animated animate__fadeIn mx-2 sm:mx-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full p-2 sm:p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-white text-xl" />
              </div>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Do you have an account?{' '}
          <a
            href="#!"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
