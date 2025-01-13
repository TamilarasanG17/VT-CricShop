import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Header from './components/Header';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductsPage';
import BuyPage from './pages/Buy';
import Register from './components/Register';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOTP';
import ForgotPassword from './components/Forgetpassword';
import VerifyResetOTP from './components/VerifyResetOTP';
import ResetPassword from './components/ResetPassword';

const App = () => {
  return (
   <Router>
      <Header />
      <Routes>
        <Route path='/' element={< Register/>} />
        <Route path='/login' element={< Login/>} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/products/:productId' element = {<ProductPage/>} />
        <Route path='/buy' element={<BuyPage />}  />
        <Route path="/buy/:productId" component={BuyPage} />
      </Routes>
    </Router>
  );
};

export default App;
