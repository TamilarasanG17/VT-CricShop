import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; 
import Swal from 'sweetalert2'; // Import SweetAlert
import 'animate.css'; 
import './pages.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://vt-cricshop-e657.onrender.com/api/products');
        console.log(response.data); 
        setProducts(response.data.data || []);
        setFilteredProducts(response.data.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.type === type));
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('https://vt-cricshop-e657.onrender.com/api/cart', { productId });
      // Use SweetAlert to show success message
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-green-700 animate__animated animate__fadeInDown">
        Our Exclusive Products
      </h1>
      <div className="mb-6 flex justify-center flex-wrap gap-6 sm:gap-8 animate__animated animate__fadeInLeft">
        {['All', 'Bat', 'Ball', 'Stumps', 'Helmet', 'Pad'].map((type) => (
          <button
            key={type}
            className={`py-2 px-5 rounded-full text-xs sm:text-sm transition-all font-medium ${
              filter === type
                ? 'bg-green-600 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-green-400 hover:text-white'
            } hover:scale-105 animate__animated animate__fadeIn animate__delay-1s`}
            onClick={() => handleFilterChange(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 animate__animated animate__fadeInUp">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl animate__animated animate__zoomIn"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <img
                  src={`https://vt-cricshop-e657.onrender.com${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-40 sm:h-56 lg:h-64 object-cover" // Reduced image size
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-2 text-sm sm:text-base">
                  {product.name}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-gray-500 text-xs sm:text-sm mb-3">{product.description}</p>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 flex items-center">
                    {Array.from({ length: product.rating }, (_, i) => (
                      <FaHeart key={i} className="text-yellow-400" /> 
                    ))}
                  </span>
                  <span className="ml-2 text-gray-400 text-xs sm:text-sm">
                    {product.rating} / 5
                  </span>
                </div>
                <p className="text-green-700 font-bold text-sm sm:text-base">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 text-sm sm:text-base font-semibold hover:from-green-600 hover:to-green-700 transition-all animate__animated animate__pulse"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      <button
        className="mt-8 bg-blue-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-bold text-sm sm:text-base hover:bg-blue-600 transition-all shadow-md block mx-auto animate__animated animate__bounceIn"
        onClick={() => navigate('/cart')}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Products;
