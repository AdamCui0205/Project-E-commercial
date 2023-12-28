import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Header.css';

const Header = ({ onLoginClick, onRegisterClick }) => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const handlePostClick = () => {
        navigate('/post-item');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="logot.png" alt="Cache Corner Logo" />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <nav className="nav-links">
                {isLoggedIn ? (
                    <>
                        <button onClick={handlePostClick}>Post</button>
                        <button onClick={handleAccountClick}>Account</button>

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
