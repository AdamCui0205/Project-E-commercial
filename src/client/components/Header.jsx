import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onLoginClick, onRegisterClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function for handling login state change
    const handleLoginStateChange = (loggedIn) => {
        setIsLoggedIn(loggedIn);
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
                        <Link to="/post">Post</Link>
                        <Link to="/account">Account</Link>
                        <button onClick={() => handleLoginStateChange(false)}>Logout</button>
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
