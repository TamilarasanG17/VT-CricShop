import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'animate.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://vt-cricshop-e657.onrender.com/api/auth/verify-otp', { email, otp });
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified!',
        text: res.data.message,
        showConfirmButton: false,
        timer: 1500,
        didClose: () => {
          navigate('/home');
        }
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.response?.data?.message || 'An error occurred during OTP verification.',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 px-2 sm:px-4">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full sm:w-96 animate__animated animate__fadeIn mx-2 sm:mx-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center text-gray-800 mb-6">OTP Verification</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Verify OTP
          </button>
        </form>

        <p className="mt-4 text-center">
          <a
            href="#!"
            onClick={() => navigate('/login')}
            className="text-blue-500 font-semibold hover:underline"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
