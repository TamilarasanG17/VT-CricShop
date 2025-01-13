import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BuyPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    doorNo: '',
    street: '',
    city: '',
    landmark: '',
    district: '',
    state: '',
    country: '',
    pincode: '',
    phone: '',
    paymentMethod: 'Cash',
  });
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    if (!productId && !product) {
      console.error('Product ID or product is missing');
      return;
    }
  
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://vt-cricshop-e657.onrender.com/api/products/${productId}`);
          setProduct(response.data.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [productId, product]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuy = async () => {
    Swal.fire({
      icon: 'success',
      title: 'Booking Confirmed!',
      text: 'Your purchase is successful. PDF will be downloaded shortly.',
      confirmButtonText: 'OK',
    }).then(() => {
      generatePDF();
      createOrder();
      navigate('/home')
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageHeight = doc.internal.pageSize.height;
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text('Purchase Confirmation', margin, 30);
 
    doc.setLineWidth(0.5);
    doc.line(margin, 35, doc.internal.pageSize.width - margin, 35);

    if (product?.imageUrl) {
      doc.addImage(`https://vt-cricshop-e657.onrender.com${product.imageUrl}`, 'JPEG', margin, 50, 50, 50);
    } else {
      doc.setFont('helvetica', 'italic');
      doc.text('Product image not available', margin, 60);
    }
 
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Product Details:', margin, 120);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    doc.text(`- Product Name: ${product?.name || 'N/A'}`, margin, 130);
 
    doc.line(margin, 140, doc.internal.pageSize.width - margin, 140);

    const addressLine = `
      Door No: ${userDetails.doorNo || 'N/A'}, 
      Street: ${userDetails.street || 'N/A'}, 
      City: ${userDetails.city || 'N/A'}, 
      Landmark: ${userDetails.landmark || 'N/A'}, 
      District: ${userDetails.district || 'N/A'}, 
      State: ${userDetails.state || 'N/A'}, 
      Country: ${userDetails.country || 'N/A'}, 
      Pincode: ${userDetails.pincode || 'N/A'}`;
  
    doc.setFont('helvetica', 'bold');
    doc.text('Address:', margin, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(addressLine, margin, 160);

    const rightColumnX = doc.internal.pageSize.width - margin - 100;
    
    doc.text(`Phone: ${userDetails.phone}`, rightColumnX, 180);
    doc.text(`Payment Method: ${userDetails.paymentMethod}`, rightColumnX, 190);

    const price = product?.price ? `Price: $${product.price}` : 'Price: N/A';
    doc.text(price, rightColumnX, 200);

    doc.setFontSize(10);
    doc.text(`Thank you for your purchase!`, margin, pageHeight - margin);
    doc.text(`For any inquiries, contact us at support@example.com`, margin, pageHeight - margin + 10);

    doc.save('PurchaseDetails.pdf');
  };
  

  const createOrder = async () => {
    try {
      const response = await axios.post('https://vt-cricshop-e657.onrender.com/api/products/orders', {
        userName: userDetails.name,
        address: `${userDetails.doorNo}, ${userDetails.street}, ${userDetails.city}, ${userDetails.district}, ${userDetails.state}, ${userDetails.country}, ${userDetails.pincode}`,
        phone: userDetails.phone,
        paymentMethod: userDetails.paymentMethod,
        productId: product._id,
      });

      if (response.data.status === 'success') {
        console.log('Order created successfully', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire('Error', 'Failed to complete purchase.', 'error');
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Buy Now</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="doorNo"
            placeholder="Door No"
            value={userDetails.doorNo}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={userDetails.street}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={userDetails.city}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (optional)"
            value={userDetails.landmark}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="district"
            placeholder="District"
            value={userDetails.district}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={userDetails.state}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={userDetails.country}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={userDetails.pincode}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-full"
        />
        <select
          name="paymentMethod"
          value={userDetails.paymentMethod}
          onChange={handleInputChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
        <button
          type="button"
          onClick={handleBuy}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Buy
        </button>
      </form>
    </div>
  );
};

export default BuyPage;
