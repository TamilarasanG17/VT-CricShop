import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/back.jpg';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="mt-20 absolute h-full inset-0 bg-gradient-to-b from-black/100 via-black/50 to-black/100"></div>

      <div className="relative text-center space-y-6 px-4 sm:px-8 lg:px-16">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-yellow-400">Welcome to</span>{' '}
          <span className="text-white">VT</span>{' '}
          <span className="text-yellow-400">Shop Zone</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-light text-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover <span className="text-yellow-400">exclusive deals</span>, premium{' '}
          <span className="text-blue-400">products</span>, and services tailored for you.
        </motion.p>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-sm sm:text-md md:text-lg italic text-shadow-md">
            "Your <span className="text-green-400">one-stop solution</span> for sports and lifestyle needs."
          </p>
          <p className="text-sm sm:text-md md:text-lg font-semibold">
            <span className="text-pink-400">Join</span> our community and{' '}
            <span className="text-red-400">elevate</span> your shopping experience.
          </p>
        </motion.div>

        <motion.button
          onClick={() => navigate('/products')}
          className="px-8 py-3 sm:px-10 sm:py-4 bg-yellow-400 text-black font-medium rounded-full shadow-lg hover:bg-yellow-300 hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          whileTap={{ scale: 1.1 }}
        >
          Explore Now
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
