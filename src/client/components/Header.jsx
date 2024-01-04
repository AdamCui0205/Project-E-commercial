// App.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Header.css';
import '../styles/ProductCard.css'; // Add a new CSS file for styling product cards
import ProductCard from './ProductCard.jsx'
import LoginModal from './LoginModal';

import RegisterModal from './RegisterModal';

const App = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
  

  useEffect(() => {
    // Fetch products from the server
    fetch('https://cache-corner.onrender.com/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Products:', data);
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handlePostClick = () => {
    navigate('/post-item');
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    // Open the login modal
    setLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    // Open the registration modal
    setRegisterModalOpen(true);
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick}>
          <img src="logot.png" alt="Cache Corner Logo" style={{ cursor: 'pointer' }} />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <nav className="nav-links">
          <button onClick={handleShopClick}>Shop</button>
          {isLoggedIn ? (
            <>
              <button onClick={handlePostClick}>Post</button>
              <button onClick={handleAccountClick}>Account</button>
              <button onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleRegisterClick}>Signup</button>
              <button onClick={handleLoginClick}>Login</button>
            </>
          )}
        </nav>
      </header>
      <div className="product-list">
        {filteredProducts.map((product) => {
          return ProductCard(product);
        })}
      </div>
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
      {/* Render the LoginModal component */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
};

export default App;