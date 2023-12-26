import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    </>
                ) : (
                    <>
                        <Link to="/register">Signup</Link>
                        <Link to="/login"> Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;