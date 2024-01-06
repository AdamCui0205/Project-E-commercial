import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Header.css';

const Header = ({ onLoginClick, onRegisterClick, setShowPost, setUserId }) => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const [cartCount, setCartCount] = useState(0);

    const handlePostClick = () => {
        setShowPost(true)
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

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleAddToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
        <header className="header">
            <div className="logo-container" onClick={handleLogoClick}>
                <img src="logot.png" alt="Cache Corner Logo" style={{ cursor: 'pointer' }} />
            </div>

            <nav className="nav-links">
                <button onClick={handleShopClick}>Shop</button>
                {isLoggedIn ? (
                    <>
                        <button onClick={handlePostClick}>Post</button>
                        <button onClick={handleAccountClick}>Account</button>
                        <button onClick={handleCartClick}>
                            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={onRegisterClick}>Signup</button>
                        <button onClick={onLoginClick}>Login</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;