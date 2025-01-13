import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://vt-cricshop-e657.onrender.com/api/cart');

        if (Array.isArray(response.data.data)) {
          setCartItems(response.data.data);
        } else {
          setError('Error: Invalid cart data');
        }
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1 > 0 ? item.quantity - 1 : 1,
          }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        Swal.fire('Deleted!', 'Your item has been removed.', 'success');
      }
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    Swal.fire('Proceeding to checkout');
  };

  const handleClearCart = (e) => {
    e.preventDefault();
    setCartItems([]);
    Swal.fire('Cart cleared', '', 'success');
  };

  if (loading) {
    return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-bold text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out duration-300"
            >
              <div className="flex items-center space-x-4 w-full mb-4 md:mb-0">
                {item.productId && item.productId._id ? (
                  <Link to={`/products/${item.productId._id}`} className="flex-shrink-0">
                    {`http://localhost:5000${item.productId.imageUrl}` ? (
                      <img
                        src={`https://vt-cricshop-e657.onrender.com${item.productId.imageUrl}`}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 flex items-center justify-center rounded-lg">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500 text-sm">No Product</span>
                  </div>
                )}

                <div className="flex flex-col w-full">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name || 'Unnamed Product'}</h2>
                  <p className="text-gray-600 text-sm">{item.description || 'No description available'}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, 'decrease')}
                        className="text-lg sm:text-xl text-gray-700 hover:text-gray-900 p-1 sm:p-2 bg-gray-200 rounded-md"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-lg sm:text-xl font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 'increase')}
                        className="text-lg sm:text-xl text-gray-700 hover:text-gray-900 p-1 sm:p-2 bg-gray-200 rounded-md"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="text-lg sm:text-xl font-semibold text-green-600">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteItem(item._id)}
                className="mt-2 md:mt-0 ml-4 text-red-500 hover:text-red-700 p-2 bg-gray-100 rounded-md"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 p-4 bg-green-600 text-white rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Total: ₹{calculateTotal()}</h2>
          <div className="flex justify-center space-x-6 mt-4">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition duration-300 text-sm sm:text-base"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
