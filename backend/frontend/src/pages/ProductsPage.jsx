import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://vt-cricshop-e657.onrender.com/api/products/${productId}`);
        setProduct({
          ...response.data,
          rating: response.data.rating || 0,
          reviews: response.data.reviews || [],
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [productId]);

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => index < filledStars);
  };

  const handleStarClick = (index) => {
    setNewRating(index + 1);
  };

  const handleReviewSubmit = async () => {
    if (!reviewerName || !newRating || !newReview) {
      alert('Please fill all fields');
      return;
    }

    const newReviewData = {
      name: reviewerName,
      rating: newRating,
      review: newReview,
    };

    try {
      await axios.post(`https://vt-cricshop-e657.onrender.com/api/products/${productId}/reviews`, newReviewData);
      setProduct((prevState) => ({
        ...prevState,
        reviews: [...prevState.reviews, newReviewData],
      }));
      setReviewerName('');
      setNewRating(0);
      setNewReview('');
      setIsReviewFormVisible(false);
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  const toggleReviewForm = () => {
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuyNow = () => {
    navigate(`/buy`, { state: { product } });
  };

  const handleAddToCart = () => {
    navigate('/cart', { state: { product } });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8">

        <div className="md:w-1/2 w-full mb-4 md:mb-0 transform transition-all duration-500 hover:scale-105">
          <img
            src={`https://vt-cricshop-e657.onrender.com${product.imageUrl}`}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg animate__animated animate__fadeIn"
          />
        </div>

        <div className="md:w-1/2 w-full md:ml-8 animate__animated animate__fadeIn">
          <div className="text-xl font-semibold text-gray-800">{product.name}</div>
          <div className="text-yellow-500 flex items-center mb-4">
            {renderStars(product.rating).map((isFilled, index) => (
              <FaStar
                key={index}
                onClick={() => handleStarClick(index)}
                className={`cursor-pointer ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`}
                size={24}
              />
            ))}
            ({product.rating} / 5)
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviews:</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg mb-4 shadow-lg transition-all hover:shadow-2xl transform hover:scale-105"
                >
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`${review.rating > i ? 'text-yellow-500' : 'text-gray-300'}`}
                          size={20}
                        />
                      ))}
                      ({review.rating} / 5)
                    </div>
                    <p className="text-gray-600">{review.review}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-600">No reviews yet.</p>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={toggleReviewForm}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Add Review
            </button>

            {isReviewFormVisible && (
              <div className="mt-4 p-6 bg-white shadow-xl rounded-lg animate__animated animate__fadeIn transition-all duration-500">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
                  placeholder="Your Name"
                />
                <div className="flex flex-col items-start mb-4">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        onClick={() => setNewRating(index + 1)}
                        className={`cursor-pointer ${newRating > index ? 'text-yellow-500' : 'text-gray-300'}`}
                        size={24}
                      />
                    ))}
                  </div>
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-lg w-full"
                    placeholder="Your Review"
                    rows="4"
                  />
                </div>
                <button
                  onClick={handleReviewSubmit}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 w-full md:w-auto transform hover:scale-105"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition-all duration-300 w-full md:w-auto transform hover:scale-105"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
